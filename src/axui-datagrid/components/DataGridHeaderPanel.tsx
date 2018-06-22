import * as React from 'react';
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
