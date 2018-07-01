import * as React from 'react';
import { types } from '../stores';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import DataGridHeaderCell from './DataGridHeaderCell';

interface IProps extends IDataGridStore {
  panelName: string;
  style?: any;
}
interface IState {}

class DataGridHeaderPanel extends React.Component<IProps, IState> {
  state = {};

  onClick = (e: any) => {};

  onMouseDownColumnResizer = (e: any, col: types.DataGridCol) => {
    /*
    e.preventDefault();

    const resizer = e.target;
    const prevLeft = Number(resizer.getAttribute('data-prev-left'));
    const currLeft = Number(resizer.getAttribute('data-left'));
    const { x: rootX } = this.props.getRootBounding();

    let newWidth;
    let startMousePosition = UTIL.getMousePosition(e).x;

    const onMouseMove = ee => {
      const { x, y } = UTIL.getMousePosition(ee);
      let newLeft = currLeft + x - startMousePosition;
      if (newLeft < prevLeft) {
        newLeft = prevLeft;
      }
      newWidth = newLeft - prevLeft;

      this.setState({
        columnResizing: true,
        columnResizerLeft: x - rootX + 1,
      });
    };

    const offEvent = ee => {
      ee.preventDefault();
      startMousePosition = null;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', offEvent);
      document.removeEventListener('mouseleave', offEvent);

      this.setState({
        columnResizing: false,
      });

      if (typeof newWidth !== 'undefined')
        this.props.onResizeColumnResizer(e, col, newWidth);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', offEvent);
    document.addEventListener('mouseleave', offEvent);
    */
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
                <td>&nbsp;</td>
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
