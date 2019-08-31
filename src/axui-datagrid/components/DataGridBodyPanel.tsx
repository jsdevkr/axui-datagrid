import * as React from "react";
import { IDataGridStore } from "../providers/StoreProvider";
import { connectStore } from "../hoc";
import { arrayFromRange, getDataItem } from "../utils";
import { IDataGrid } from "../common/@types";
import { DataGridEnums } from "../common/@enums";
import DataGridBodyCell from "./DataGridBodyCell";
import DataGridTableColGroup from "./DataGridTableColGroup";

class TableBody extends React.PureComponent<{
  colGroup: IDataGrid.ICol[];
  sRowIndex: number;
  eRowIndex: number;
  data: IDataGrid.IData;
  dataLength: number;
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
  printStartColIndex?: number;
  printEndColIndex?: number;
  scrollLeft?: number;
  scrollTop?: number;
  styles?: IDataGrid.IStyles;
}> {
  render() {
    const {
      colGroup,
      sRowIndex,
      eRowIndex,
      data,
      dataLength,
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
      printStartColIndex,
      printEndColIndex,
      scrollLeft,
      scrollTop,
      styles
    } = this.props;

    const changedTrClassName = {
      C: "added-line",
      U: "updated-line",
      D: "deleted-line",
      E: "error-line"
    };

    return (
      <tbody>
        {arrayFromRange(sRowIndex, eRowIndex).map(li => {
          const item = getDataItem(data, li);
          if (dataLength > li && item) {
            return bodyRow.rows.map((row, ri) => (
              <tr
                key={ri}
                className={`${li % 2 !== 0 ? "odded-line" : ""} ${
                  changedTrClassName[item.type || ""]
                    ? changedTrClassName[item.type || ""]
                    : ""
                }`}
              >
                {row.cols.map((col, ci) => (
                  <DataGridBodyCell
                    colGroup={colGroup}
                    key={ci}
                    li={li}
                    ci={ci}
                    col={col}
                    value={item.value[col.key || ""] || ""}
                    data={data}
                    selected={item.selected}
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
                    printStartColIndex={printStartColIndex}
                    printEndColIndex={printEndColIndex}
                    scrollLeft={scrollLeft}
                    scrollTop={scrollTop}
                    styles={styles}
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
      data = {},
      dataLength = 0,
      asideColGroup = [],
      leftHeaderColGroup = [],
      visibleHeaderColGroup = [],
      colGroup = [],
      asideBodyRowData = { rows: [{ cols: [] }] },
      leftBodyRowData = { rows: [{ cols: [] }] },
      visibleBodyRowData = { rows: [{ cols: [] }] },
      panelName,
      containerStyle = {},
      panelScrollConfig: {
        sRowIndex = 0,
        eRowIndex = 0,
        frozenRowIndex = 0
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

      printStartColIndex,
      printEndColIndex,
      scrollLeft,
      scrollTop,
      styles
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

    const paddingTop = (sRowIndex - frozenRowIndex) * bodyTrHeight;
    const panelStyle = {
      left: panelLeft + panelPaddingLeft,
      top: panelTop + paddingTop
    };

    return (
      <div
        data-scroll-container={`${panelName}-container`}
        style={containerStyle}
      >
        <div data-panel={panelName} style={panelStyle}>
          <table style={{ height: "100%" }}>
            <DataGridTableColGroup panelColGroup={panelColGroup} />
            <TableBody
              colGroup={colGroup}
              sRowIndex={sRowIndex}
              eRowIndex={eRowIndex}
              data={data}
              dataLength={dataLength}
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
              printStartColIndex={printStartColIndex}
              printEndColIndex={printEndColIndex}
              scrollLeft={scrollLeft}
              scrollTop={scrollTop}
              styles={styles}
            />
          </table>
        </div>
      </div>
    );
  }
}

export default connectStore(DataGridBodyPanel);
