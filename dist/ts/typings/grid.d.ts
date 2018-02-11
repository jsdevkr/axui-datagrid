interface iAXDataGridSelection {
  x?: number;
  y?: number;
}

interface iAXDataGridColumns {
  key?: string;
  width?: number;
  label?: string;
  align?: string;
  formatter?: Function | string;
  columns?: iAXDataGridColumns[];
}

interface iAXDataGridOptionHeader{
  display?: boolean;
  align?: boolean;
  columnHeight?: number;
  columnPadding?: number;
  columnBorderWidth?: number;
  selector?: boolean;
  sortable?: boolean;
  enableFilter?: boolean;
  clickAction?: string;
}

interface iAXDataGridOptionBody{
  align?: string;
  columnHeight?: number;
  columnPadding?: number;
  columnBorderWidth?: number;
  grouping?: boolean;
  mergeCells?: boolean;
}

interface iAXDataGridOptionPageButton {
  className: string;
  onClick: string | Function;
  width?: number;
}

interface iAXDataGridOption {
  frozenColumnIndex?: number;
  frozenRowIndex?: number;
  showLineNumber?: boolean;
  showRowSelector?: boolean;
  multipleSelect?: boolean;
  columnMinWidth?: number;
  lineNumberColumnWidth?: number;
  rowSelectorColumnWidth?: number;
  remoteSort?: boolean;
  asidePanelWidth?: number;
  header?: iAXDataGridOptionHeader;
  body?: iAXDataGridOptionBody;
  page?: {
    buttonsContainerWidth?: number;
    buttons?: iAXDataGridOptionPageButton[];
    buttonHeight?: number;
    height?: number;
  },
  scroller?: {
    size?: number;
    arrowSize?: number;
    barMinSize?: number;
    padding?: number;
    disabledVerticalScroll?: boolean;
  };
  columnKeys?: {
    selected?: string;
    modified?: string;
    deleted?: string;
    disableSelection?: string;
  };
  footSum?: boolean;
}

interface iAXDataGridStyle {
  calculatedHeight: number;
  asidePanelWidth: number;
  frozenPanelWidth: number;
  bodyTrHeight: number;
  elWidth: number;
  elHeight: number;
  CTInnerWidth: number;
  CTInnerHeight: number;
  rightPanelWidth: number;
  headerHeight: number;
  bodyHeight: number;
  frozenPanelHeight: number;
  footSumHeight: number;
  pageHeight: number;
  verticalScrollerWidth: number;
  horizontalScrollerHeight: number;
  scrollContentContainerHeight: number;
  scrollContentHeight: number;
  scrollContentContainerWidth: number;
  scrollContentWidth: number;
  verticalScrollerHeight: number;
  verticalScrollBarHeight: number;
  horizontalScrollerWidth: number;
  horizontalScrollBarWidth: number;
  scrollerPadding: number;
  scrollerArrowSize: number;
  pageButtonsContainerWidth: number;
}

interface iAXDataGridFormatterData {
  list: any;
  item: any;
  index: number;
  key: string;
  value: any;
  options: iAXDataGridOption;
}

interface iAXDataGridEditingCell {
  row?: number;
  col?: number;
  editor?: any;
}

interface iAXDataGridRootProps {
  store_receivedList: any;
  store_deletedList: any;
  store_list: any;
  store_page: any;
  store_sortInfo: any;
  store_filterInfo: any;
  height: string;
  style: any;
  columns: iAXDataGridColumns[];
  data: any;
  options: iAXDataGridOption;
  init: Function;
  setData: Function;
  sort: Function;
  filter: Function;
  update: Function;
}

interface iAXDataGridRootState {
  mounted: boolean;
  scrollLeft: number;
  scrollTop: number;
  dragging: boolean; // 사용자가 드래깅 중인 경우 (style.userSelect=none 처리)

  selectionStartOffset: iAXDataGridSelection;
  selectionEndOffset: iAXDataGridSelection;
  selectionMinOffset: iAXDataGridSelection;
  selectionMaxOffset: iAXDataGridSelection;
  selectionRows: object;
  selectionCols: object;
  focusedRow: number;
  focusedCol: number;
  isInlineEditing: boolean;
  inlineEditingCell: iAXDataGridEditingCell;
  isColumnFilter: number | boolean;
  colGroup: any;
  colGroupMap: object;
  asideColGroup: any;
  leftHeaderColGroup: any;
  headerColGroup: any;
  bodyGrouping: any;
  headerTable: object;
  asideHeaderData: object;
  leftHeaderData: object;
  headerData: object;
  bodyRowTable: object;
  asideBodyRowData: object;
  leftBodyRowData: object;
  bodyRowData: object;
  bodyRowMap: object;
  bodyGroupingTable: object;
  asideBodyGroupingData: object;
  leftBodyGroupingData: object;
  bodyGroupingData: object;
  bodyGroupingMap: object;
  footSumColumns: any;
  footSumTable: object; // footSum의 출력레이아웃
  leftFootSumData: object; // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 왼쪽
  footSumData: object; // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 오른쪽
  styles: iAXDataGridStyle;
  options: iAXDataGridOption;
}

interface iAXDataGridRootMoving {
  active: boolean;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

interface iAXDataGridHeaderProps {
  getRootBounding: Function;
  mounted: boolean;
  optionsHeader: iAXDataGridOptionHeader;
  styles: iAXDataGridStyle;
  frozenColumnIndex: number;
  colGroup: any;
  asideColGroup: any;
  leftHeaderColGroup: any;
  headerColGroup: any;
  asideHeaderData: any;
  leftHeaderData: any;
  headerData: any;
  scrollLeft: number;
  selectionCols: any;
  focusedCol: number;
  sortInfo: any;
  onResizeColumnResizer: Function;
  onClickHeader: Function;
}

interface iAXDataGridHeaderState {
  columnResizing: boolean;
  columnResizerLeft: number;
}

interface iAXDataGridHeaderPanelProps {
  panelName: string;
  colGroup: any;
  bodyRow: any;
  style: {
    width?: number;
    height: number;
    left?: number;
  };
  optionsHeader: iAXDataGridOptionHeader;
  focusedCol: number;
  selectionCols: object;
  onClickHeader: Function;
  sortInfo: any;
  onMouseDownColumnResizer: Function;
}

interface iAXDataGridHeaderPanelState {

}

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

interface iAXDataGridPageProps {
  mounted: boolean;
  styles: iAXDataGridStyle;
  pageButtonsContainerWidth: number;
  pageButtons: iAXDataGridOptionPageButton[];
  pageButtonHeight: number;
  onClickPageButton: Function
}

interface iAXDataGridPageState {
  /* empty */
}

interface iAXDataGridScrollProps {
  mounted: boolean;
  bodyHeight: number;
  pageHeight: number;
  verticalScrollerHeight: number;
  verticalScrollerWidth: number;
  horizontalScrollerWidth: number;
  horizontalScrollerHeight: number;
  verticalScrollBarHeight: number;
  horizontalScrollBarWidth: number;
  scrollerArrowSize: number;
  scrollerPadding: number;
  scrollBarLeft: number;
  scrollBarTop: number;
  onMouseDownScrollBar: Function;
  onClickScrollTrack: Function;
  onClickScrollArrow: Function;
}

interface iAXDataGridScrollState {
  /* empty */
}

interface iAXDataGridSelectorProps {
  selecting: boolean;
  selectionMinOffset: iAXDataGridSelection;
  selectionMaxOffset: iAXDataGridSelection;
}

interface iAXDataGridSelectorState {
  /* empty */
}

interface iAXDataGridColumnFilterOption {
  value: string;
  text: string;
  checked: boolean;
  checkAll?: boolean;
}

interface iAXDataGridColumnFilterProps {
  isColumnFilter: number | boolean;
  filterInfo: any;
  colGroup: any;
  options: any;
  frozenColumnIndex: number;
  scrollLeft: number;
  styles: iAXDataGridStyle;
  list: any;
  onChangeColumnFilter: Function;
}

interface iAXDataGridColumnFilterState {
}

interface iAXDataGridColumnFilterOptionProps {
  options: iAXDataGridColumnFilterOption[];
  onChange: Function;
}

interface iAXDataGridColumnFilterOptionState {
  mounted: boolean;
  scrollTop: number;
  clientHeight: number;
  scrollHeight: number;
  optionItemHeight: number;
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

interface iAXDataGridProps {
  height: string;
  style: any;
  columns: iAXDataGridColumns[];
  data: any;
  options: iAXDataGridOption;
}