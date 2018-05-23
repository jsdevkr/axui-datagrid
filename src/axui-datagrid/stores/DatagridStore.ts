export type AXUIDatagridSelection = {
  x?: number;
  y?: number;
};

export type AXUIDatagridColumns = {
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
  columns?: AXUIDatagridColumns[];
};

export type AXUIDatagridOptionHeader = {
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

export type AXUIDatagridOptionBody = {
  align?: string;
  columnHeight?: number;
  columnPadding?: number;
  columnBorderWidth?: number;
  grouping?: boolean;
  mergeCells?: boolean;
};

export type AXUIDatagridOptionPageButton = {
  className: string;
  onClick: string | Function;
  width?: number;
};

export type AXUIDatagridOption = {
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
  header?: AXUIDatagridOptionHeader;
  body?: AXUIDatagridOptionBody;
  page?: {
    buttonsContainerWidth?: number;
    buttons?: AXUIDatagridOptionPageButton[];
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

export type AXUIDatagridStyle = {
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

export type AXUIDatagridFormatterData = {
  list: any;
  item: any;
  index: number;
  key: string;
  value: any;
  options: AXUIDatagridOption;
};

export type AXUIDatagridEditingCell = {
  row?: number;
  col?: number;
  editor?: any;
};

export type AXUIDatagrid = {
  height?: number;
  autoHeight?: boolean;
  columns?: AXUIDatagridColumns[];
  data?: any[];
  options?: AXUIDatagridOption;
  onBeforeEvent?: () => void;
  onAfterEvent?: () => void;
};
