interface iAXDatagridProps {
  height: string;
  style: any;
  columns: any;
  data: any;
  options: any;
}

interface iSelection {
  x?: number;
  y?: number;
}

interface iColumns {
  key?: string;
  width?: number;
  label?: string;
  align?: string;
  formatter?: Function | string;
  columns?: iColumns[];
}

interface iFormatterData {
  list: any;
  item: any;
  index: number;
  key: string;
  value: any;
  options: any;
}

interface iEditingCell {
  row?: number;
  col?: number;
  editor?: any;
}


interface iGridRootProps {
  store_receivedList: any;
  store_deletedList: any;
  store_list: any;
  store_page: any;
  store_sortInfo: any;
  store_filterInfo: any;
  height: string;
  style: any;
  columns: iColumns[];
  data: any;
  options: any;
  init: Function;
  setData: Function;
  sort: Function;
  filter: Function;
  update: Function;
}

interface iGridRootState {
  mounted: boolean;
  scrollLeft: number;
  scrollTop: number;
  dragging: boolean; // 사용자가 드래깅 중인 경우 (style.userSelect=none 처리)

  selectionStartOffset: iSelection;
  selectionEndOffset: iSelection;
  selectionMinOffset: iSelection;
  selectionMaxOffset: iSelection;
  selectionRows: any;
  selectionCols: any;
  focusedRow: number;
  focusedCol: number;
  isInlineEditing: boolean;
  inlineEditingCell: iEditingCell;
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
  styles: {
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
    frozenRowHeight: number;
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
  };
  options: any;
}

interface iGridRootMoving {
  active: boolean;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}


interface iGridHeaderProps {
  getRootBounding: Function;
  mounted: boolean;
  optionsHeader: any;
  styles: any;
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

interface iGridHeaderState {
  columnResizing: boolean;
  columnResizerLeft: number;
}


interface iGridBodyProps {
  mounted: boolean;
  columnFormatter: any;
  options: any;
  styles: any;
  CTInnerWidth: number;
  CTInnerHeight: number;
  frozenColumnIndex: number;
  colGroup: any;
  asideColGroup: any;
  leftHeaderColGroup: any;
  headerColGroup: any;
  bodyTable: any;
  asideBodyRowData: any;
  asideBodyGroupingData: any;
  leftBodyRowData: any;
  leftBodyGroupingData: any;
  bodyRowData: any;
  bodyGroupingData: any;
  list: any;
  scrollLeft: number;
  scrollTop: number;
  selectionRows: any;
  selectionCols: any;
  focusedRow: number;
  focusedCol: number;
  isInlineEditing: boolean;
  inlineEditingCell: iEditingCell;
  onMouseDownBody: Function;
  onDoubleClickCell: Function;
  updateEditInput: Function;
}

interface iGridBodyState {
  /* empty */
}

interface iGridBodyPanelStyle {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}


interface iGridPageProps {
  mounted: boolean;
  styles: any;
  pageButtonsContainerWidth: number;
  pageButtons: any;
  pageButtonHeight: number;
  onClickPageButton: Function
}

interface iGridPageState {
  /* empty */
}


interface iGridScrollProps {
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

interface iGridScrollState {
  /* empty */
}


interface iGridSelectorProps {
  selecting: boolean;
  selectionMinOffset: iSelection;
  selectionMaxOffset: iSelection;
}

interface iGridSelectorState {
  /* empty */
}


interface iGridColumnFilterOption{
  value: string;
  text: string;
  checked: boolean;
  checkAll?: boolean;
}
interface iGridColumnFilterProps {
  isColumnFilter: any;
  filterInfo: any;
  colGroup: any;
  options: any;
  frozenColumnIndex: number;
  scrollLeft: number;
  styles: any;
  list: any;
  onChangeColumnFilter: Function;
}

interface iGridColumnFilterState {
}

interface iGridColumnFilterOptionProps {
  options: iGridColumnFilterOption[];
  onChange: Function;
}

interface iGridColumnFilterOptionState {
  mounted: boolean;
  scrollTop: number;
  clientHeight: number;
  scrollHeight: number;
  optionItemHeight: number;
}

interface iGridBodyPanelProps {
  styles: any;
  options: any;
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
  panelScrollConfig: {
    sRowIndex: number;
    eRowIndex: number;
  };
  panelLeft?: number;
  panelTop?: number;
  panelPaddingLeft?: number;
}

interface iGridBodyPanelState {

}

interface iGridBodyCellProps {
  columnHeight: number;
  columnPadding: number;
  columnBorderWidth: number;
  bodyAlign: string;
  focusedRow: number;
  focusedCol: number;
  selectionRows: any;
  selectionCols: any;
  columnFormatter: any;
  isInlineEditing: any;
  inlineEditingCell: any;

  list: any;
  li: number;
  colGroup: any;
  col: any;
  ci: number;
  value: any;

  onEditInput: Function;
  onDoubleClickCell: Function;
}

interface iGridBodyCellState {

}