import * as React from 'react';
import { types } from '../stores';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { arrayFromRange, classNames as CX } from '../utils';
import DataGridBodyCell from './DataGridBodyCell';

interface IProps extends IDataGridStore {
  panelName: string;
  style?: any;
  containerStyle?: any;
  panelScrollConfig?: any;
  panelLeft?: number;
  panelTop?: number;
  panelPaddingLeft?: number;
}
interface IState {}

class DataGridBodyPanel extends React.Component<IProps, IState> {
  state = {};

  render() {
    const {
      filteredList = [],
      asideColGroup = [],
      leftHeaderColGroup = [],
      headerColGroup = [],
      asideBodyRowData = { rows: [{ cols: [] }] },
      leftBodyRowData = { rows: [{ cols: [] }] },
      bodyRowData = { rows: [{ cols: [] }] },
      selectionRows,
      selectionCols,
      focusedRow,
      focusedCol,

      panelName,
      containerStyle = {},
      panelScrollConfig = {},
      panelLeft = 0,
      panelTop = 0,
      panelPaddingLeft = 0,

      styles = {},
      options = {},
    } = this.props;

    const { sRowIndex, eRowIndex, frozenRowIndex } = panelScrollConfig;
    const { bodyTrHeight = 0 } = styles;
    const panelStyle = {
      left: panelLeft,
      top: panelTop,
      paddingTop: (sRowIndex - frozenRowIndex) * bodyTrHeight,
      paddingLeft: panelPaddingLeft,
    };

    const panelColGroup: types.DataGridCol[] = (() => {
      switch (panelName) {
        case 'top-aside-body-scroll':
        case 'aside-body-scroll-container':
          return asideColGroup;
        case 'top-left-body-scroll-container':
        case 'left-body-scroll-container':
          return leftHeaderColGroup;
        case 'top-body-scroll-container':
        case 'body-scroll':
        default:
          return headerColGroup;
      }
    })();

    const panelBodyRow = (() => {
      switch (panelName) {
        case 'top-aside-body-scroll':
        case 'aside-body-scroll-container':
          return asideBodyRowData;
        case 'top-left-body-scroll-container':
        case 'left-body-scroll-container':
          return leftBodyRowData;
        case 'top-body-scroll-container':
        case 'body-scroll':
        default:
          return bodyRowData;
      }
    })();

    return (
      <div
        data-scroll-container={`${panelName}-container`}
        style={containerStyle}
      >
        <div data-panel={panelName} style={panelStyle}>
          <table style={{ height: '100%' }}>
            <colgroup>
              {panelColGroup.map((col, ci) => (
                <col key={ci} style={{ width: col._width + 'px' }} />
              ))}
              <col />
            </colgroup>
            <tbody>
              {arrayFromRange(sRowIndex, eRowIndex).map(li => {
                const item = filteredList[li];
                const trClassNames = {
                  ['odded-line']: li % 2 !== 0,
                };
                if (item) {
                  return panelBodyRow.rows.map((row, ri) => {
                    return (
                      <tr key={ri} className={CX(trClassNames)}>
                        {row.cols.map((col, ci) => {
                          return (
                            <DataGridBodyCell
                              key={ci}
                              li={li}
                              col={col}
                              ci={ci}
                              value={filteredList[li][col.key || '']}
                            />
                          );
                        })}
                        <td>&nbsp;</td>
                      </tr>
                    );
                  });
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connectStore(DataGridBodyPanel);
