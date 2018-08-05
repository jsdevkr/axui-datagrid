import * as React from 'react';
import { types, DispatchTypes } from '../stores';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import {
  getMousePosition,
  arrayFromRange,
  findParentNode,
  getNode,
} from '../utils';
import DataGridHeaderCell from './DataGridHeaderCell';

interface IProps extends IDataGridStore {
  panelName: string;
  style?: any;
}
interface IState {}

class DataGridHeaderPanel extends React.Component<IProps, IState> {
  state = {};

  onClick = (e: any, col: types.DataGridCol) => {
    const {
      filteredList = [],
      colGroup = [],
      scrollLeft = 0,
      focusedCol = 0,
      isColumnFilter = false,
      options = {},
      styles = {},
      setStoreState,
      dispatch,
    } = this.props;

    const { header: optionsHeader = {} } = options;
    const { key, colIndex = 0 } = col;
    const { asidePanelWidth = 0 } = styles;

    if (e.target.getAttribute('data-filter')) {
      const closeEvent = (ee: any) => {
        const { isColumnFilter: _isColumnFilter } = this.props;
        if (
          ee.target &&
          ee.target.getAttribute &&
          '' + _isColumnFilter === ee.target.getAttribute('data-filter-index')
        ) {
          return false;
        }

        let downedElement: any = false;

        if (ee.target) {
          downedElement = findParentNode(ee.target, element => {
            return element && element.getAttribute
              ? element.getAttribute('data-column-filter') === 'true'
              : false;
          });
        }

        if (downedElement === false) {
          ee.preventDefault();

          setStoreState({
            isColumnFilter: false,
          });

          document.removeEventListener('mouseup', closeEvent);
          document.removeEventListener('mouseleave', closeEvent);
          document.removeEventListener('keydown', keyDown);
        }

        return;
      };
      const keyDown = (ee: any) => {
        if (ee.which === 27) {
          closeEvent(ee);
        }
      };

      if (isColumnFilter === colIndex) {
        setStoreState({
          isColumnFilter: false,
        });

        document.removeEventListener('mouseup', closeEvent);
        document.removeEventListener('mouseleave', closeEvent);
        document.removeEventListener('keydown', keyDown);
      } else {
        let columnFilterLeft: number =
          asidePanelWidth + (colGroup[colIndex]._sx || 0) - 2 + scrollLeft;

        setStoreState({
          scrollLeft:
            columnFilterLeft < 0 ? scrollLeft - columnFilterLeft : scrollLeft,
          isColumnFilter: colIndex,
        });

        document.removeEventListener('mouseup', closeEvent);
        document.removeEventListener('mouseleave', closeEvent);
        document.removeEventListener('keydown', keyDown);

        document.addEventListener('mouseup', closeEvent);
        document.addEventListener('mouseleave', closeEvent);
        document.addEventListener('keydown', keyDown);
      }
    } else {
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
              filteredList.forEach((item, i) => {
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
          dispatch(DispatchTypes.SELECT_ALL, {});
          break;
        default:
          {
            if (optionsHeader.clickAction === 'select') {
              state.selectionRows = (() => {
                let rows = {};
                filteredList.forEach((item, i) => {
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
              dispatch(DispatchTypes.SORT, { colIndex });
            }
          }
          break;
      }

      if (key === '_line_number_') {
      } else {
      }
    }
  };

  onMouseDownColumnResizer = (e: any, col: types.DataGridCol) => {
    e.preventDefault();

    const { setStoreState, getRootNode, dispatch } = this.props;

    const rootNode = getNode(getRootNode);
    const { x: rootX = 0 } =
      rootNode && (rootNode.getBoundingClientRect() as any);
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

      if (typeof newWidth !== 'undefined') {
        dispatch(DispatchTypes.RESIZE_COL, {
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
      styles = {},
    } = this.props;

    // aside-header가 필요하지 않은지 확인
    if (
      panelName === 'aside-header' &&
      styles &&
      styles.asidePanelWidth === 0
    ) {
      return null;
    }

    // left-header가 필요하지 않은지 확인
    if (
      panelName === 'left-header' &&
      options &&
      options.frozenColumnIndex === 0
    ) {
      return null;
    }

    const { header: optionsHeader = {} } = options;
    const {
      columnHeight: optionsHeaderColumnHeight = 0,
      columnBorderWidth: optionsHeaderColumnBorderWidth = 0,
    } = optionsHeader;
    const colGroup: types.DataGridCol[] = (() => {
      switch (panelName) {
        case 'aside-header':
          return asideColGroup;
        case 'left-header':
          return leftHeaderColGroup;
        default:
          return headerColGroup;
      }
    })();
    const bodyRow: types.DataGridColumnTableMap = (() => {
      switch (panelName) {
        case 'aside-header':
          return asideHeaderData;
        case 'left-header':
          return leftHeaderData;
        default:
          return headerData;
      }
    })();

    return (
      <div data-panel={panelName} style={style}>
        <table style={{ height: '100%' }}>
          <colgroup>
            {colGroup.map((col, ci) => (
              <col key={ci} style={{ width: col._width + 'px' }} />
            ))}
            <col />
          </colgroup>
          <tbody>
            {bodyRow.rows.map((row, ri) => (
              <tr key={ri} className="">
                {row.cols.map((col, ci) => (
                  <DataGridHeaderCell
                    key={ci}
                    bodyRow={bodyRow}
                    ri={ri}
                    col={col}
                    onClick={this.onClick}
                  />
                ))}
                <td />
              </tr>
            ))}
          </tbody>
        </table>

        {(() => {
          if (panelName === 'aside-header') {
            return null;
          }
          let resizerHeight =
            optionsHeaderColumnHeight * bodyRow.rows.length -
            optionsHeaderColumnBorderWidth;

          let resizer: any,
            resizerLeft = 0,
            resizerWidth = 4;

          return colGroup.map((col, ci) => {
            if (col.colIndex !== null && typeof col.colIndex !== 'undefined') {
              let prevResizerLeft = resizerLeft;
              resizerLeft += col._width || 0;
              resizer = (
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
                  onMouseDown={e => this.onMouseDownColumnResizer(e, col)}
                />
              );
            }
            return resizer;
          });
        })()}
      </div>
    );
  }
}

export default connectStore(DataGridHeaderPanel);
