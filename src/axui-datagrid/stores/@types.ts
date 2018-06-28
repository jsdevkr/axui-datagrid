import * as intfs from './@interfaces';

export type ColTextAlign = 'left' | 'center' | 'right' | string;

export type DataGridSelection = intfs.IPosition;

export type DataGridRect = intfs.IRect;

export type DataGridEditingCell = intfs.IDataGridEditingCell;

export type DataGridFormatterData = intfs.IDataGridFormatterData;

export type DataGridFormatter = intfs.IDataGridFormatter;

export type formatterFunction = intfs.formatterFunction;

export type DataGridCol = intfs.IDataGridCol;

export type DataGridColumn = intfs.IDataGridColumn;

export type DataGridColumnKeys = intfs.IDataGridColumnKeys;

export type DataGridMoving = intfs.IDataGridMoving;

export type DataGridColumnTableMapRow = {
  cols: DataGridColumn[];
};

export type DataGridColumnTableMap = {
  rows: DataGridColumnTableMapRow[];
};

export type DataGridColumnDivideTable = {
  asideData: DataGridColumnTableMap;
  asideColGroup: any[];
  asidePanelWidth: number;
  leftData: DataGridColumnTableMap;
  rightData: DataGridColumnTableMap;
};

export type DataGridOptionHeader = {
  display?: boolean;
  align?: ColTextAlign;
  columnHeight?: number;
  columnPadding?: number;
  columnBorderWidth?: number;
  selector?: boolean;
  sortable?: boolean;
  enableFilter?: boolean;
  clickAction?: string;
};

export type DataGridOptionBody = {
  align?: ColTextAlign;
  columnHeight?: number;
  columnPadding?: number;
  columnBorderWidth?: number;
  grouping?: boolean;
  mergeCells?: boolean;
};

export type DataGridOptionPageButton = {
  className: string;
  onClick: string | Function;
  width?: number;
};

export type DataGridOptionPage = {
  buttonsContainerWidth?: number;
  buttons?: DataGridOptionPageButton[];
  buttonHeight?: number;
  height?: number;
};

export type DataGridOptionScroller = {
  size?: number;
  arrowSize?: number;
  barMinSize?: number;
  padding?: number;
  disabledVerticalScroll?: boolean;
};

export type DataGridOptions = {
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
  header?: DataGridOptionHeader;
  body?: DataGridOptionBody;
  page?: DataGridOptionPage;
  scroller?: DataGridOptionScroller;
  columnKeys?: DataGridColumnKeys;
  footSum?: boolean;
};

export type DataGridStyles = {
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
};

export type DataGridRootState = {
  mounted?: boolean;
  calculatedHeight?: number;
  dimensionsRootNode?: { width?: number; height?: number };
};

export type DataGridState = {
  mounted?: boolean;
  rootNode?: any;
  calculatedStyles?: boolean;
  dragging?: boolean;
  data?: any[];
  filteredList?: any[];
  sortInfo?: {};
  height?: number;
  columnsString?: string;
  styleString?: string;
  optionsString?: string;
  onBeforeEvent?: () => void;
  onAfterEvent?: () => void; // 원본과 비교를 위한 JSON.stringify 값
  isInlineEditing?: boolean;
  inlineEditingCell?: intfs.IDataGridEditingCell;
  isColumnFilter?: boolean;
  scrollLeft?: number;
  scrollTop?: number;
  selectionRows?: {};
  selectionCols?: {};
  focusedRow?: number;
  focusedCol?: number;

  selectionStartOffset?: intfs.IPosition;
  selectionEndOffset?: intfs.IPosition;
  selectionMinOffset?: intfs.IPosition;
  selectionMaxOffset?: intfs.IPosition;

  colGroup?: DataGridCol[];
  colGroupMap?: {};
  asideColGroup?: DataGridCol[];
  leftHeaderColGroup?: DataGridCol[];
  headerColGroup?: DataGridCol[];
  bodyGrouping?: DataGridCol[];
  headerTable?: DataGridColumnTableMap;
  asideHeaderData?: DataGridColumnTableMap;
  leftHeaderData?: DataGridColumnTableMap;
  headerData?: DataGridColumnTableMap;
  bodyRowTable?: DataGridColumnTableMap;
  asideBodyRowData?: DataGridColumnTableMap;
  leftBodyRowData?: DataGridColumnTableMap;
  bodyRowData?: DataGridColumnTableMap;
  bodyRowMap?: {};
  bodyGroupingTable?: DataGridColumnTableMap;
  asideBodyGroupingData?: DataGridColumnTableMap;
  leftBodyGroupingData?: DataGridColumnTableMap;
  bodyGroupingData?: DataGridColumnTableMap;
  bodyGroupingMap?: {};
  footSumColumns?: DataGridColumn[];
  footSumTable?: {};
  leftFootSumData?: {};
  footSumData?: {};
  styles?: DataGridStyles;
  options?: DataGridOptions;
  predefinedFormatter?: DataGridFormatter;
  rootObject?: any;
  setRootState?: (state: DataGridRootState) => void;
  getRootState?: () => any;
  getRootNode?: () => HTMLDivElement | undefined;
}; // footSum의 출력레이아웃 // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 왼쪽 // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 오른쪽

export type DataGrid = {
  data?: any[];
  columns: DataGridColumn[];
  height?: number;
  style?: any;
  options?: DataGridOptions;

  onBeforeEvent?: () => void;
  onAfterEvent?: () => void;
};
