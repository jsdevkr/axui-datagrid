import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { arrayFromRange } from '../utils';
import DataGridBodyCell from './DataGridBodyCell';
import DataGridTableColGroup from './DataGridTableColGroup';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from '../common/@enums';

class TableBody extends React.PureComponent<{
  sRowIndex: number;
  eRowIndex: number;
  data: any[];
  bodyRow: IDataGrid.IColumnTableMap;
  setStoreState: IDataGrid.setStoreState;
  dispatch: IDataGrid.dispatch;
  focusedRow: number;
  focusedCol: number;
  selectionRows: {};
  selectionCols: {};
  options: IDataGrid.IOptions;
  isInlineEditing: boolean;
  inlineEditingCell: IDataGrid.IEditingCell;
  predefinedFormatter?: IDataGrid.IFormatter;
}> {
  render() {
    const {
      sRowIndex,
      eRowIndex,
      data,
      bodyRow,
      setStoreState,
      dispatch,
      focusedRow,
      focusedCol,
      selectionRows,
      selectionCols,
      options,
      isInlineEditing,
      inlineEditingCell,
      predefinedFormatter,
    } = this.props;

    return (
      <tbody>
        {arrayFromRange(sRowIndex, eRowIndex).map(li => {
          if (data[li]) {
            return bodyRow.rows.map((row, ri) => (
              <tr key={ri} className={`${li % 2 !== 0 && 'odded-line'}`}>
                {row.cols.map((col, ci) => (
                  <DataGridBodyCell
                    key={ci}
                    li={li}
                    ci={ci}
                    col={col}
                    data={data}
                    selected={data[li]._selected_}
                    setStoreState={setStoreState}
                    dispatch={dispatch}
                    focusedRow={focusedRow}
                    focusedCol={focusedCol}
                    selectionRows={selectionRows}
                    selectionCols={selectionCols}
                    options={options}
                    isInlineEditing={isInlineEditing}
                    inlineEditingCell={inlineEditingCell}
                    predefinedFormatter={predefinedFormatter}
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
  }
}

interface IProps extends IDataGridStore {
  panelName: DataGridEnums.PanelNames;
  style?: any;
  containerStyle?: any;
  panelScrollConfig?: IDataGrid.IScrollConfig;
  panelLeft?: number;
  panelTop?: number;
}

class DataGridBodyPanel extends React.Component<IProps> {
  render() {
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
      panelScrollConfig: {
        sRowIndex = 0,
        eRowIndex = 0,
        frozenRowIndex = 0,
      } = {},
      panelLeft = 0,
      panelTop = 0,
      styles: { frozenPanelWidth = 0, bodyTrHeight = 0 } = {},

      focusedRow,
      focusedCol,
      selectionRows,
      selectionCols,
      options,
      isInlineEditing,
      inlineEditingCell,
      predefinedFormatter,
      setStoreState,
      dispatch,
    } = this.props;

    let panelColGroup: IDataGrid.ICol[];
    let panelBodyRow: IDataGrid.IColumnTableMap;
    let panelPaddingLeft: number = 0;

    switch (panelName) {
      case DataGridEnums.PanelNames.TOP_ASIDE_BODY_SCROLL:
      case DataGridEnums.PanelNames.ASIDE_BODY_SCROLL:
        panelColGroup = asideColGroup;
        panelBodyRow = asideBodyRowData;
        break;
      case DataGridEnums.PanelNames.TOP_LEFT_BODY_SCROLL:
      case DataGridEnums.PanelNames.LEFT_BODY_SCROLL:
        panelColGroup = leftHeaderColGroup;
        panelBodyRow = leftBodyRowData;
        break;
      case DataGridEnums.PanelNames.TOP_BODY_SCROLL:
      case DataGridEnums.PanelNames.BODY_SCROLL:
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
              setStoreState={setStoreState}
              dispatch={dispatch}
              focusedRow={focusedRow || 0}
              focusedCol={focusedCol || 0}
              selectionRows={selectionRows || {}}
              selectionCols={selectionCols || {}}
              options={options || {}}
              isInlineEditing={!!isInlineEditing}
              inlineEditingCell={inlineEditingCell || {}}
              predefinedFormatter={predefinedFormatter}
            />
          </table>
        </div>
      </div>
    );
  }
}

export default connectStore(DataGridBodyPanel);
