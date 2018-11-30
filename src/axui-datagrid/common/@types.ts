export interface IPosition {
  x?: number;
  y?: number;
}

export interface IRect extends IPosition {
  width: number;
  height?: number;
}

export interface ICol {
  key?: string;
  label?: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right' | string;
  colSpan?: number;
  rowSpan?: number;
}

export interface IDataGridEditingCell {
  rowIndex?: number;
  colIndex?: number;
  editor?: any;
}

export interface IDataGridFormatterData {
  data?: any;
  item?: any;
  index?: number;
  key?: string;
  value?: any;
  options?: any;
}

export interface IDataGridCollectorData {
  data?: any;
  key?: string;
  value?: any;
  options?: any;
}

export interface IonEventParam {
  e: React.MouseEvent<any> | React.KeyboardEvent<any>;
  eventName: string;
}

export interface IonRightClickParam {
  e: React.MouseEvent<any>;
  item: any;
  value: any;
  focusedRow?: number;
  focusedCol?: number;
}

export interface IonScrollEndFunctionParam {
  endOfScrollTop?: boolean;
  endOfScrollLeft?: boolean;
}

export interface IonChangeSelectedParam {
  filteredList?: any[];
}

export interface IonChangeSelectionParam {
  rows?: number[];
  cols?: number[];
}

export interface IDataGridFormatter {
  [key: string]: formatterFunction;
}

export interface IDataGridCollector {
  [key: string]: collectorFunction;
}

export interface IDataGridCol extends ICol {
  colIndex?: number;
  rowIndex?: number;
  formatter?: formatterFunction | string;
  collector?: collectorFunction | string;
  editor?: editorFunction | string | { type?: string };
  _ex?: number;
  _sx?: number;
  _width?: number;
  columnAttr?: string;
}

export interface IDataGridColumn extends ICol {
  colIndex?: number;
  rowIndex?: number;
  formatter?: formatterFunction | string;
  collector?: collectorFunction | string;
  editor?: editorFunction | string | { type?: string };
  hidden?: boolean;
  columns?: IDataGridColumn[];
  depth?: number;
  columnAttr?: string;
}

export interface IDataGridColumnKeys {
  selected?: string;
  modified?: string;
  deleted?: string;
  disableSelection?: string;
}

export interface IDataGridMoving {
  active?: boolean;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

export type formatterFunction = (formatterData: IDataGridFormatterData) => any;

export type collectorFunction = (formatterData: IDataGridCollectorData) => any;

export type editorFunction = (editorData: IDataGridFormatterData) => void;

export type userCallBackFunction = (param?: any) => void;

export interface IDataGridColumnTableMapRow {
  cols: IDataGridColumn[];
}

export interface IDataGridColumnTableMap {
  rows: IDataGridColumnTableMapRow[];
}

export type DataGridColumnDivideTable = {
  asideData: IDataGridColumnTableMap;
  asideColGroup: any[];
  asidePanelWidth: number;
  leftData: IDataGridColumnTableMap;
  rightData: IDataGridColumnTableMap;
};

export interface IDataGridOptionHeader {
  display?: boolean;
  align?: 'left' | 'center' | 'right' | undefined;
  columnHeight?: number;
  columnPadding?: number;
  columnBorderWidth?: number;
  selector?: boolean;
  sortable?: boolean;
  enableFilter?: boolean;
  clickAction?: 'select' | 'sort' | undefined;
  filterIconClassName?: string;
}

export interface IDataGridOptionBody {
  align?: 'left' | 'center' | 'right' | undefined;
  columnHeight?: number;
  columnPadding?: number;
  columnBorderWidth?: number;
  grouping?: boolean;
  mergeCells?: boolean;
}

export interface IDataGridOptionPageButton {
  className: string;
  onClick: string | userCallBackFunction;
  width?: number;
}

export interface IDataGridOptionPage {
  buttonsContainerWidth?: number;
  buttons?: IDataGridOptionPageButton[];
  buttonHeight?: number;
  height?: number;
}

export interface IDataGridOptionScroller {
  size?: number;
  arrowSize?: number;
  barMinSize?: number;
  padding?: number;
  disabledVerticalScroll?: boolean;
}

export interface IDataGridOptions {
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
  header?: IDataGridOptionHeader;
  body?: IDataGridOptionBody;
  page?: IDataGridOptionPage;
  scroller?: IDataGridOptionScroller;
  columnKeys?: IDataGridColumnKeys;
  footSum?: boolean;
  bodyLoaderHeight?: number;
}

export interface IDataGridStyles {
  calculatedHeight?: number | null;
  asidePanelWidth?: number;
  frozenPanelWidth?: number;
  bodyTrHeight?: number;
  elWidth?: number;
  elHeight?: number;
  CTInnerWidth?: number;
  CTInnerHeight?: number;
  rightPanelWidth?: number;
  headerHeight?: number;
  bodyHeight?: number;
  frozenPanelHeight?: number;
  footSumHeight?: number;
  pageHeight?: number;
  verticalScrollerWidth?: number;
  horizontalScrollerHeight?: number;
  scrollContentContainerHeight?: number;
  scrollContentHeight?: number;
  scrollContentContainerWidth?: number;
  scrollContentWidth?: number;
  verticalScrollerHeight?: number;
  verticalScrollBarHeight?: number;
  horizontalScrollerWidth?: number;
  horizontalScrollBarWidth?: number;
  scrollerPadding?: number;
  scrollerArrowSize?: number;
  pageButtonsContainerWidth?: number;
}

export interface IDataGridState {
  mounted?: boolean;
  loading?: boolean;
  loadingData?: boolean;
  calculatedStyles?: boolean;

  data?: any[];
  filteredList?: any[];
  listSelectedAll?: boolean;
  selectedRowIndex?: number;
  selectedRowIndexSelected?: boolean;
  sortInfo?: {};
  filterInfo?: {};
  height?: number;

  onBeforeEvent?: (param: IonEventParam) => void;
  onAfterEvent?: (param: IonEventParam) => void;
  onScrollEnd?: (param: IonScrollEndFunctionParam) => void;
  onRightClick?: (param: IonRightClickParam) => void;

  selection?: IDataGridSelection;
  rowSelector?: IDataGridRowSelector;

  isInlineEditing?: boolean;
  inlineEditingCell?: IDataGridEditingCell;

  columnResizing?: boolean;
  columnResizerLeft?: number;

  isColumnFilter?: boolean | number;
  scrollLeft?: number;
  scrollTop?: number;
  endOfScrollTop?: boolean;
  endOfScrollLeft?: boolean;
  selectionRows?: {};
  selectionCols?: {};
  focusedRow?: number;
  focusedCol?: number;

  selectionStartOffset?: IPosition;
  selectionEndOffset?: IPosition;
  selectionMinOffset?: IPosition;
  selectionMaxOffset?: IPosition;

  selectionSRow?: number;
  selectionSCol?: number;
  selectionERow?: number;
  selectionECol?: number;

  printStartColIndex?: number;
  printEndColIndex?: number;

  colGroup?: IDataGridCol[];
  colGroupMap?: {};
  asideColGroup?: IDataGridCol[];
  leftHeaderColGroup?: IDataGridCol[];
  headerColGroup?: IDataGridCol[];
  bodyGrouping?: IDataGridCol[];
  headerTable?: IDataGridColumnTableMap;
  asideHeaderData?: IDataGridColumnTableMap;
  leftHeaderData?: IDataGridColumnTableMap;
  headerData?: IDataGridColumnTableMap;
  bodyRowTable?: IDataGridColumnTableMap;
  asideBodyRowData?: IDataGridColumnTableMap;
  leftBodyRowData?: IDataGridColumnTableMap;
  bodyRowData?: IDataGridColumnTableMap;
  bodyRowMap?: {};
  bodyGroupingTable?: IDataGridColumnTableMap;
  asideBodyGroupingData?: IDataGridColumnTableMap;
  leftBodyGroupingData?: IDataGridColumnTableMap;
  bodyGroupingData?: IDataGridColumnTableMap;
  bodyGroupingMap?: {};
  footSumColumns?: IDataGridColumn[][];
  footSumTable?: IDataGridColumnTableMap;
  leftFootSumData?: IDataGridColumnTableMap;
  footSumData?: IDataGridColumnTableMap;
  styles?: IDataGridStyles;
  options?: IDataGridOptions;

  visibleHeaderColGroup?: IDataGridCol[];
  visibleBodyRowData?: IDataGridColumnTableMap;
  visibleBodyGroupingData?: IDataGridColumnTableMap;
  visibleFootSumData?: IDataGridColumnTableMap;

  propColumns?: string;
  propOptions?: string;

  predefinedFormatter?: IDataGridFormatter;
  predefinedCollector?: IDataGridCollector;
  rootObject?: any;
  setRootState?: (state: IDataGridRootState) => void;
  getRootState?: () => any;
  // getRootNode?: () => HTMLDivElement;
  // getClipBoardNode?: () => HTMLTextAreaElement;
  rootNode?: React.RefObject<HTMLDivElement>;
  clipBoardNode?: React.RefObject<HTMLTextAreaElement>;
} // footSum의 출력레이아웃 // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 왼쪽 // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 오른쪽

export interface IDataGridRowSelector {
  show: boolean;
  rowKey: string;
  selectedRowKeys?: string[];
  onChange?: (param: IonChangeSelectedParam) => void;
}
export interface IDataGridSelection {
  rows?: number[];
  cols?: number[];
  onChange?: (param: IonChangeSelectionParam) => void;
}

export interface IDataGrid {
  data?: any[];
  columns: IDataGridColumn[];
  footSum?: IDataGridColumn[][];
  height?: number;
  style?: any;
  options?: IDataGridOptions;
  onBeforeEvent?: (param: IonEventParam) => void;
  onAfterEvent?: (param: IonEventParam) => void;
  onScrollEnd?: (param: IonScrollEndFunctionParam) => void;
  loading?: boolean;
  loadingData?: boolean;
  rowSelector?: IDataGridRowSelector;
  selection?: IDataGridSelection;
  onRightClick?: (param: IonRightClickParam) => void;
}

export interface IDataGridRootState {
  mounted?: boolean;
  calculatedHeight?: number;
}

export type DataGridDispatchParam = { [key: string]: any };
