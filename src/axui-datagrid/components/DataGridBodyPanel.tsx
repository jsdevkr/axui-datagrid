import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { arrayFromRange, classNames as CX } from '../utils';
import DataGridBodyCell from './DataGridBodyCell';
import DataGridTableColGroup from './DataGridTableColGroup';
import { IDataGrid } from '../common/@types';

const TableBody: React.SFC<{
  sRowIndex: number;
  eRowIndex: number;
  data: any[];
  bodyRow: IDataGrid.IColumnTableMap;
}> = ({ sRowIndex, eRowIndex, data, bodyRow }) => (
  <tbody>
    {arrayFromRange(sRowIndex, eRowIndex).map(li => {
      const item = data[li];
      const trClassNames = {
        ['odded-line']: li % 2 !== 0,
      };
      if (item) {
        return bodyRow.rows.map((row, ri) => (
          <tr key={ri} className={CX(trClassNames)}>
            {row.cols.map((col, ci) => (
              <DataGridBodyCell
                key={ci}
                li={li}
                ci={ci}
                col={col}
                value={data[li][col.key || '']}
              />
            ))}
            <td />
          </tr>
        ));
      }
      return null;
    })}
  </tbody>
);

interface IProps extends IDataGridStore {
  panelName: string;
  style?: any;
  containerStyle?: any;
  panelScrollConfig?: any;
  panelLeft?: number;
  panelTop?: number;
}
const DataGridBodyPanel: React.SFC<IProps> = props => {
  const {
    data = [],
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
  } = props;
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

  let panelColGroup: IDataGrid.ICol[] = [];
  let panelBodyRow: IDataGrid.IColumnTableMap = { rows: [{ cols: [] }] };
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
          <DataGridTableColGroup panelColGroup={panelColGroup} />
          <TableBody
            sRowIndex={sRowIndex}
            eRowIndex={eRowIndex}
            data={data}
            bodyRow={panelBodyRow}
          />
        </table>
      </div>
    </div>
  );
};

export default connectStore(DataGridBodyPanel);
