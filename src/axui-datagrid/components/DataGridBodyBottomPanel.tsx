import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import DataGridBodyBottomCell from './DataGridBodyBottomCell';
import DataGridTableColGroup from './DataGridTableColGroup';
import { IDataGridColumnTableMap, IDataGridCol } from '../common/@types';

const TableBody: React.SFC<{
  bodyRow: IDataGridColumnTableMap;
}> = ({ bodyRow }) => (
  <tbody>
    {bodyRow.rows.map((row, ri) => {
      return (
        <tr key={ri} className={''}>
          {row.cols.map((col, ci) => {
            return (
              <DataGridBodyBottomCell key={ci} ci={ci} col={col} value={''} />
            );
          })}
          <td />
        </tr>
      );
    })}
  </tbody>
);

interface IProps extends IDataGridStore {
  panelName: string;
  style?: any;
  containerStyle?: any;
  panelLeft?: number;
  panelTop?: number;
}
const DataGridBodyBottomPanel: React.SFC<IProps> = props => {
  const {
    asideColGroup = [],
    leftHeaderColGroup = [],
    visibleHeaderColGroup = [],
    asideBodyRowData = { rows: [{ cols: [] }] },
    leftFootSumData = { rows: [{ cols: [] }] },
    visibleFootSumData = { rows: [{ cols: [] }] },
    panelName,
    containerStyle = {},
    panelLeft = 0,
    panelTop = 0,
    styles = {},
  } = props;
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

  let panelColGroup: IDataGridCol[] = [];
  let panelBodyRow: IDataGridColumnTableMap = { rows: [{ cols: [] }] };
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
      panelBodyRow = visibleFootSumData;
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
          <DataGridTableColGroup panelColGroup={panelColGroup} />
          <TableBody bodyRow={panelBodyRow} />
        </table>
      </div>
    </div>
  );
};

export default connectStore(DataGridBodyBottomPanel);
