import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import DataGridBodyBottomCell from './DataGridBodyBottomCell';
import DataGridTableColGroup from './DataGridTableColGroup';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from 'axui-datagrid/common/@enums';

class TableBody extends React.PureComponent<{
  bodyRow: IDataGrid.IColumnTableMap;
  data: any[];
  options: IDataGrid.IOptions;
  predefinedFormatter?: {};
  predefinedCollector?: {};
}> {
  render() {
    const {
      data,
      options,
      predefinedFormatter,
      predefinedCollector,
    } = this.props;
    return (
      <tbody>
        {this.props.bodyRow.rows.map((row, ri) => {
          return (
            <tr key={ri} className={''}>
              {row.cols.map((col, ci) => {
                return (
                  <DataGridBodyBottomCell
                    key={ci}
                    ci={ci}
                    col={col}
                    data={data}
                    options={options}
                    predefinedFormatter={predefinedFormatter}
                    predefinedCollector={predefinedCollector}
                  />
                );
              })}
              <td />
            </tr>
          );
        })}
      </tbody>
    );
  }
}

interface IProps extends IDataGridStore {
  panelName: DataGridEnums.PanelNames;
  style?: any;
  containerStyle?: any;
  panelLeft?: number;
  panelTop?: number;
}
class DataGridBodyBottomPanel extends React.Component<IProps> {
  render() {
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
      styles: { frozenPanelWidth = 0, asidePanelWidth = 0 } = {},
      data,
      options,
      predefinedFormatter,
      predefinedCollector,
    } = this.props;

    let panelColGroup: IDataGrid.ICol[] = [];
    let panelBodyRow: IDataGrid.IColumnTableMap = { rows: [{ cols: [] }] };
    let panelPaddingLeft: number = 0;

    switch (panelName) {
      case DataGridEnums.PanelNames.BOTTOM_ASIDE_BODY_SCROLL:
        panelColGroup = asideColGroup;
        panelBodyRow = asideBodyRowData;
        break;
      case DataGridEnums.PanelNames.BOTTOM_LEFT_BODY_SCROLL:
        panelColGroup = leftHeaderColGroup;
        panelBodyRow = leftFootSumData;
        break;
      case DataGridEnums.PanelNames.BOTTOM_BODY_SCROLL:
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
            <TableBody
              bodyRow={panelBodyRow}
              data={data || []}
              options={options || {}}
              predefinedFormatter={predefinedFormatter}
              predefinedCollector={predefinedCollector}
            />
          </table>
        </div>
      </div>
    );
  }
}

export default connectStore(DataGridBodyBottomPanel);
