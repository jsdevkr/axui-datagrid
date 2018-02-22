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
  colspan?: number;
  rowspan?: number;
  rowIndex?: number;
  colIndex?: number;
  hidden?: boolean;
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

interface iAXDataGridProps {
  height: string;
  style: any;
  columns: iAXDataGridColumns[];
  data: any;
  options: iAXDataGridOption;
  onBeforeEvent?: Function;
  onAfterEvent?: Function;
}