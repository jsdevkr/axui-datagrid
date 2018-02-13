
interface iAXDataGridBodyProps {
  mounted: boolean;
  columnFormatter: any;
  options: iAXDataGridOption;
  styles: iAXDataGridStyle;
  CTInnerWidth: number;
  CTInnerHeight: number;
  frozenColumnIndex: number;
  colGroup: any[];
  asideColGroup: any[];
  leftHeaderColGroup: any[];
  headerColGroup: any[];
  bodyTable: any;
  asideBodyRowData: any;
  asideBodyGroupingData: any;
  leftBodyRowData: any;
  leftBodyGroupingData: any;
  bodyRowData: any;
  bodyGroupingData: any;
  list: any[];
  scrollLeft: number;
  scrollTop: number;
  selectionRows: object;
  selectionCols: object;
  focusedRow: number;
  focusedCol: number;
  isInlineEditing: boolean;
  inlineEditingCell: iAXDataGridEditingCell;
  onMouseDownBody: Function;
  onDoubleClickCell: Function;
  updateEditInput: Function;
}

interface iAXDataGridBodyState {
  /* empty */
}

interface iAXDataGridBodyPanelStyle {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

interface iAXDataGridBodyPanelScrollConfig {
  frozenRowIndex?: number;
  sRowIndex: number;
  eRowIndex: number;
}

interface iAXDataGridBodyPanelProps {
  styles: iAXDataGridStyle;
  options: iAXDataGridOption;
  colGroup: any;
  selectionRows: any;
  selectionCols: any;
  focusedRow: any;
  focusedCol: any;
  columnFormatter: any;
  onDoubleClickCell: any;
  updateEditInput: any;
  isInlineEditing: any;
  inlineEditingCell: any;

  list: any;
  panelName: string;
  panelColGroup: any;
  panelBodyRow: any;
  panelGroupRow: any;
  panelScrollConfig: iAXDataGridBodyPanelScrollConfig;
  panelLeft?: number;
  panelTop?: number;
  panelPaddingLeft?: number;
}

interface iAXDataGridBodyPanelState {

}

interface iAXDataGridBodyCellProps {
  columnHeight: number;
  columnPadding: number;
  columnBorderWidth: number;
  bodyAlign: string;
  focusedRow: number;
  focusedCol: number;
  selectionRows: any;
  selectionCols: any;
  columnFormatter: any;
  isInlineEditing: boolean;
  inlineEditingCell: any;

  list: any;
  li: number;
  colGroup: any[];
  col: any;
  ci: number;
  value: any;

  onEditInput: Function;
  onDoubleClickCell: Function;
}

interface iAXDataGridBodyCellState {

}
