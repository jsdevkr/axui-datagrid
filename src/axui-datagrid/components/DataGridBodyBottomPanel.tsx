import * as React from 'react';
import { types } from '../stores';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { arrayFromRange, classNames as CX } from '../utils';
import DataGridBodyBottomCell from './DataGridBodyBottomCell';

interface IProps extends IDataGridStore {
  panelName: string;
  style?: any;
  containerStyle?: any;
  panelLeft?: number;
  panelTop?: number;
}
interface IState {}

class DataGridBodyBottomPanel extends React.Component<IProps, IState> {
  state = {};

  render() {
    const {
      filteredList = [],
      asideColGroup = [],
      leftHeaderColGroup = [],
      visibleHeaderColGroup = [],

      asideBodyRowData = { rows: [{ cols: [] }] },
      footSumColumns,
      leftFootSumData = { rows: [{ cols: [] }] },
      footSumData = { rows: [{ cols: [] }] },
      panelName,
      containerStyle = {},
      panelLeft = 0,
      panelTop = 0,
      styles = {},
    } = this.props;

    const {
      frozenPanelWidth = 0,
      asidePanelWidth = 0,
      bodyTrHeight = 0,
    } = styles;

    // aside또는 left가 필요 없는 상황
    if (
      (panelName === 'bottom-aside-body-scroll' && asidePanelWidth === 0) ||
      (panelName === 'bottom-left-body-scroll' && frozenPanelWidth === 0)
    ) {
      return null;
    }

    let panelColGroup: types.DataGridCol[] = [];
    let panelBodyRow: types.DataGridColumnTableMap = { rows: [{ cols: [] }] };
    let panelPaddingLeft: number = 0;

    switch (panelName) {
      case 'bottom-aside-body-scroll':
        panelColGroup = asideColGroup;
        panelBodyRow = asideBodyRowData;
        break;
      case 'bottom-left-body-scroll':
        panelColGroup = leftHeaderColGroup;
        panelBodyRow = leftFootSumData;
        break;
      case 'bottom-body-scroll':
      default:
        panelColGroup = visibleHeaderColGroup;
        panelBodyRow = footSumData;
        panelPaddingLeft = panelColGroup[0]
          ? (panelColGroup[0]._sx || 0) - frozenPanelWidth
          : 0;
    }

    const panelStyle = {
      left: panelLeft,
      top: panelTop,
      paddingTop: 0,
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
              {panelBodyRow.rows.map((row, ri) => {
                return (
                  <tr key={ri} className={''}>
                    {row.cols.map((col, ci) => {
                      return (
                        <DataGridBodyBottomCell
                          key={ci}
                          ci={ci}
                          col={col}
                          value={''}
                        />
                      );
                    })}
                    <td />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connectStore(DataGridBodyBottomPanel);
