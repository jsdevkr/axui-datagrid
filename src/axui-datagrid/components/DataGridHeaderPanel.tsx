import * as React from 'react';
import { getPathValue } from '../utils';
import { types } from '../stores';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import DataGridHeaderCell from './DataGridHeaderCell';

interface IProps extends IDataGridStore {
  panelName: string;
  style?: any;
  onMouseDownColumnResizer: (e: any, col: types.DataGridCol) => void;
}
interface IState {}

class DataGridHeaderPanel extends React.Component<IProps, IState> {
  state = {};

  render() {
    const {
      panelName,
      style,
      onMouseDownColumnResizer,
      asideColGroup,
      asideHeaderData,
      leftHeaderColGroup,
      leftHeaderData,
      headerColGroup,
      headerData,
      options,
    } = this.props;

    const optionsHeader = getPathValue(options, ['header']);

    const colGroup: types.DataGridCol[] = (() => {
      switch (panelName) {
        case 'aside-header':
          return asideColGroup || [];
        case 'left-header':
          return leftHeaderColGroup || [];
        default:
          return headerColGroup || [];
      }
    })();
    const bodyRow: types.DataGridColumnTableMap = (() => {
      switch (panelName) {
        case 'aside-header':
          return asideHeaderData || { rows: [{ cols: [] }] };
        case 'left-header':
          return leftHeaderData || { rows: [{ cols: [] }] };
        default:
          return headerData || { rows: [{ cols: [] }] };
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
            optionsHeader.columnHeight * bodyRow.rows.length -
            optionsHeader.columnBorderWidth;

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
                  onMouseDown={e => onMouseDownColumnResizer(e, col)}
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
