export type DataGridSelection = {
  x?: number;
  y?: number;
};

export type DataGridColumns = {
  key?: string;
  width?: number;
  label?: string;
  align?: string;
  formatter?: () => void | string;
  colSpan?: number;
  rowSpan?: number;
  rowIndex?: number;
  colIndex?: number;
  hidden?: boolean;
  columns?: DataGridColumns[];
};

export type DataGridOptionHeader = {
  display?: boolean;
  align?: boolean | string;
  columnHeight?: number;
  columnPadding?: number;
  columnBorderWidth?: number;
  selector?: boolean;
  sortable?: boolean;
  enableFilter?: boolean;
  clickAction?: string;
};

export type DataGridOptionBody = {
  align?: string;
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

export type DataGridOption = {
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
  page?: {
    buttonsContainerWidth?: number;
    buttons?: DataGridOptionPageButton[];
    buttonHeight?: number;
    height?: number;
  };
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
};

export type DataGridStyle = {
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
};

export type DataGridFormatterData = {
  list: any;
  item: any;
  index: number;
  key: string;
  value: any;
  options: DataGridOption;
};

export type DataGridEditingCell = {
  row?: number;
  col?: number;
  editor?: any;
};

