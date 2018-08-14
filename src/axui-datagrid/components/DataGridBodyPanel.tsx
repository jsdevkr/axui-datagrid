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
}
interface IState {}

class DataGridBodyPanel extends React.Component<IProps, IState> {
  state = {};

  render() {
    const {
      footSumColumns,
      filteredList = [],
      asideColGroup = [],
      leftHeaderColGroup = [],
      visibleHeaderColGroup = [],

      asideBodyRowData = { rows: [{ cols: [] }] },
      leftBodyRowData = { rows: [{ cols: [] }] },
      visibleBodyRowData = { rows: [{ cols: [] }] },
      panelName,
      containerStyle = {},
      panelScrollConfig = {},
      panelLeft = 0,
      panelTop = 0,
      styles = {},
    } = this.props;

    const {
      frozenPanelWidth = 0,
      asidePanelWidth = 0,
      frozenPanelHeight = 0,
      bodyTrHeight = 0,
    } = styles;

    const { sRowIndex, eRowIndex, frozenRowIndex } = panelScrollConfig;

    // aside-header가 필요하지 않은지 확인
    if (
      (panelName === 'top-aside-body-scroll' &&
        (asidePanelWidth === 0 || frozenPanelHeight === 0)) ||
      (panelName === 'top-left-body-scroll' &&
        (frozenPanelWidth === 0 || frozenPanelHeight === 0)) ||
      (panelName === 'top-body-scroll' && frozenPanelHeight === 0) ||
      (panelName === 'aside-body-scroll' && asidePanelWidth === 0) ||
      (panelName === 'left-body-scroll' && frozenPanelWidth === 0)
    ) {
      return null;
    }

    let panelColGroup: types.DataGridCol[] = [];
    let panelBodyRow: types.DataGridColumnTableMap = { rows: [{ cols: [] }] };
    let panelPaddingLeft: number = 0;

    switch (panelName) {
      case 'top-aside-body-scroll':
      case 'aside-body-scroll':
        panelColGroup = asideColGroup;
        panelBodyRow = asideBodyRowData;
        break;
      case 'top-left-body-scroll':
      case 'left-body-scroll':
        panelColGroup = leftHeaderColGroup;
        panelBodyRow = leftBodyRowData;
        break;
      case 'top-body-scroll':
      case 'body-scroll':
      default:
        panelColGroup = visibleHeaderColGroup;
        // headerColGroup;
        panelBodyRow = visibleBodyRowData;
        panelPaddingLeft = panelColGroup[0]
          ? (panelColGroup[0]._sx || 0) - frozenPanelWidth
          : 0;
    }

    const panelStyle = {
      left: panelLeft,
      top: panelTop,
      paddingTop: (sRowIndex - frozenRowIndex) * bodyTrHeight,
      paddingLeft: panelPaddingLeft,
    };

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
                              ci={ci}
                              col={col}
                              value={filteredList[li][col.key || '']}
                            />
                          );
                        })}
                        <td />
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
