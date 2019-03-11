import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { getMousePosition, arrayFromRange } from '../utils';
import DataGridHeaderCell from './DataGridHeaderCell';
import DataGridTableColGroup from './DataGridTableColGroup';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from '../common/@enums';

class TableBody extends React.PureComponent<{
  bodyRow: IDataGrid.IColumnTableMap;
  listSelectedAll: boolean;
  options: IDataGrid.IOptions;
  focusedCol: number;
  selectionCols: {};
  sortInfo: {};
  onClick: (e: any, col: IDataGrid.ICol) => void;
}> {
  render() {
    const {
      bodyRow,
      listSelectedAll,
      options,
      focusedCol,
      selectionCols,
      sortInfo,
      onClick,
    } = this.props;

    return (
      <tbody>
        {bodyRow.rows.map((row, ri) => (
          <tr key={ri}>
            {row.cols.map((col, ci) => (
              <DataGridHeaderCell
                key={ci}
                listSelectedAll={listSelectedAll}
                options={options}
                focusedCol={focusedCol}
                selectionCols={selectionCols}
                sortInfo={sortInfo}
                bodyRow={bodyRow}
                ri={ri}
                col={col}
                onClick={onClick}
              />
            ))}
            <td />
          </tr>
        ))}
      </tbody>
    );
  }
}

class ColumnResizer extends React.PureComponent<{
  colGroup: IDataGrid.ICol[];
  resizerHeight: number;
  onMouseDownColumnResizer: (
    e: React.SyntheticEvent<Element>,
    col: IDataGrid.ICol,
  ) => void;
  onDoubleClickColumnResizer: (
    e: React.SyntheticEvent<Element>,
    col: IDataGrid.ICol,
  ) => void;
}> {
  render() {
    const {
      colGroup,
      resizerHeight,
      onMouseDownColumnResizer,
      onDoubleClickColumnResizer,
    } = this.props;
    let resizerLeft = 0;
    let resizerWidth = 4;

    return (
      <>
        {colGroup.map((col, ci) => {
          if (col.colIndex !== null && typeof col.colIndex !== 'undefined') {
            let prevResizerLeft = resizerLeft;
            resizerLeft += col._width || 0;
            return (
              <div
                key={ci}
                data-column-resizer={col.colIndex}
                data-prev-left={prevResizerLeft}
                data-left={resizerLeft}
                style={{
                  width: resizerWidth,
                  height: resizerHeight + 'px',
                  left: resizerLeft - resizerWidth / 2 + 'px',
                }}
                onMouseDown={e => onMouseDownColumnResizer(e, col)}
                onDoubleClick={e => onDoubleClickColumnResizer(e, col)}
              />
            );
          } else {
            return null;
          }
        })}
      </>
    );
  }
}

interface IDataGridHeaderPanel extends IDataGridStore {
  panelName: string;
  style?: any;
}
class DataGridHeaderPanel extends React.Component<IDataGridHeaderPanel> {
  onHandleClick = (e: any, col: IDataGrid.ICol) => {
    const {
      data = [],
      colGroup = [],
      focusedCol = 0,
      options = {},
      setStoreState,
      dispatch,
    } = this.props;
    const { header: optionsHeader = {} } = options;
    const { key, colIndex = 0 } = col;

    let state = {
      dragging: false,
      selectionRows: {},
      selectionCols: {},
      focusedRow: 0,
      focusedCol: focusedCol,
    };

    switch (key) {
      case '_line_number_':
        {
          state.selectionRows = (() => {
            let rows = {};
            data.forEach((item, i) => {
              rows[i] = true;
            });
            return rows;
          })();

          state.selectionCols = (() => {
            let cols = {};
            colGroup.forEach(_col => {
              cols[_col.colIndex || 0] = true;
            });
            return cols;
          })();
          state.focusedCol = 0;
          setStoreState(state);
        }
        break;
      case '_row_selector_':
        dispatch(DataGridEnums.DispatchTypes.SELECT_ALL, {});
        break;
      default:
        {
          if (optionsHeader.clickAction === 'select') {
            state.selectionRows = (() => {
              let rows = {};
              data.forEach((item, i) => {
                rows[i] = true;
              });
              return rows;
            })();

            if (e.shiftKey) {
              state.selectionCols = (() => {
                let cols = {};
                arrayFromRange(
                  Math.min(focusedCol, colIndex),
                  Math.max(focusedCol, colIndex) + 1,
                ).forEach(i => {
                  cols[i] = true;
                });
                return cols;
              })();
            } else {
              state.selectionCols = {
                [colIndex]: true,
              };
              state.focusedCol = colIndex;
            }
            setStoreState(state);
          } else if (
            optionsHeader.clickAction === 'sort' &&
            optionsHeader.sortable
          ) {
            dispatch(DataGridEnums.DispatchTypes.SORT, { colIndex });
          }
        }
        break;
    }

    if (key === '_line_number_') {
    } else {
    }
  };
  onMouseDownColumnResizer = (e: any, col: IDataGrid.ICol) => {
    e.preventDefault();

    const { setStoreState, rootNode, dispatch } = this.props;

    const { x: rootX = 0 } =
      rootNode &&
      rootNode.current &&
      (rootNode.current.getBoundingClientRect() as any);
    const resizer = e.target;
    const prevLeft = Number(resizer.getAttribute('data-prev-left'));
    const currLeft = Number(resizer.getAttribute('data-left'));

    let newWidth: number = 0;
    let startMousePosition = getMousePosition(e).x;
    const onMouseMove = (ee: any) => {
      const { x } = getMousePosition(ee);
      let newLeft = currLeft + x - startMousePosition;
      if (newLeft < prevLeft) {
        newLeft = prevLeft;
      }
      newWidth = newLeft - prevLeft;

      setStoreState({
        columnResizing: true,
        columnResizerLeft: x - rootX + 1,
      });
    };

    const offEvent = (ee: any) => {
      ee.preventDefault();
      startMousePosition = null;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', offEvent);
      document.removeEventListener('mouseleave', offEvent);

      // 움직이지 않고 클릭만 했음에도, newWidth=0 으로 설정되어
      // 컬럼의 크기가 0으로 줄어들어 안보이는 경우가 있어
      // newWidth !== 0 을 추가
      if (typeof newWidth !== 'undefined' && newWidth !== 0) {
        dispatch(DataGridEnums.DispatchTypes.RESIZE_COL, {
          col,
          newWidth,
        });
      } else {
        setStoreState({
          columnResizing: false,
        });
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', offEvent);
    document.addEventListener('mouseleave', offEvent);
  };
  onDoubleClickColumnResizer = (e: any, col: IDataGrid.ICol) => {
    e.preventDefault();

    const { dispatch, autofitColGroup } = this.props;

    if (autofitColGroup && autofitColGroup[Number(col.colIndex)]) {
      const newWidth = autofitColGroup[Number(col.colIndex)].tdWidth;
      dispatch(DataGridEnums.DispatchTypes.RESIZE_COL, {
        col,
        newWidth,
      });
    }
  };
  render() {
    const {
      panelName,
      style,
      asideColGroup = [],
      asideHeaderData = { rows: [{ cols: [] }] },
      leftHeaderColGroup = [],
      leftHeaderData = { rows: [{ cols: [] }] },
      headerColGroup = [],
      headerData = { rows: [{ cols: [] }] },
      options = {},

      listSelectedAll = false,
      focusedCol = -1,
      selectionCols = {},
      sortInfo = {},
    } = this.props;

    const { header: optionsHeader = {} } = options;
    const {
      columnHeight: optionsHeaderColumnHeight = 0,
      columnBorderWidth: optionsHeaderColumnBorderWidth = 0,
    } = optionsHeader;

    const colGroup: IDataGrid.ICol[] = (() => {
      switch (panelName) {
        case DataGridEnums.PanelNames.ASIDE_HEADER:
          return asideColGroup;
        case DataGridEnums.PanelNames.LEFT_HEADER:
          return leftHeaderColGroup;
        default:
          return headerColGroup;
      }
    })();
    const bodyRow: IDataGrid.IColumnTableMap = (() => {
      switch (panelName) {
        case DataGridEnums.PanelNames.ASIDE_HEADER:
          return asideHeaderData;
        case DataGridEnums.PanelNames.LEFT_HEADER:
          return leftHeaderData;
        default:
          return headerData;
      }
    })();
    const resizerHeight =
      optionsHeaderColumnHeight * bodyRow.rows.length -
      optionsHeaderColumnBorderWidth;

    return (
      <div data-panel={panelName} style={style}>
        <table style={{ height: '100%' }}>
          <DataGridTableColGroup panelColGroup={colGroup} />
          <TableBody
            listSelectedAll={listSelectedAll}
            options={options}
            focusedCol={focusedCol}
            selectionCols={selectionCols}
            sortInfo={sortInfo}
            bodyRow={bodyRow}
            onClick={this.onHandleClick}
          />
        </table>

        {panelName !== DataGridEnums.PanelNames.ASIDE_HEADER && (
          <ColumnResizer
            colGroup={colGroup}
            resizerHeight={resizerHeight}
            onMouseDownColumnResizer={this.onMouseDownColumnResizer}
            onDoubleClickColumnResizer={this.onDoubleClickColumnResizer}
          />
        )}
      </div>
    );
  }
}

export default connectStore(DataGridHeaderPanel);
