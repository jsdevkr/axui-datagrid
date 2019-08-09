import { IDataGrid } from '../common/@types';

export interface ICalculateDimensionsParam {
  headerTable?: IDataGrid.IColumnTableMap;
  colGroup?: IDataGrid.ICol[];
  headerColGroup?: IDataGrid.ICol[];
  bodyRowTable?: IDataGrid.IColumnTableMap;
  footSumColumns?: IDataGrid.IColumn[][];
  dataLength?: number;
  options?: IDataGrid.IOptions;
}

export default function calculateDimensions(
  storeState: IDataGrid.IStoreState,
  {
    headerTable = { rows: [] },
    colGroup = [],
    headerColGroup = [],
    bodyRowTable = { rows: [] },
    footSumColumns,
    dataLength = 0,
    options = {},
  }: ICalculateDimensionsParam,
): {
  scrollLeft: number;
  scrollTop: number;
  styles: IDataGrid.IStyles;
} {
  const { width = 0, height = 0 } = storeState;
  let { scrollLeft = 0, scrollTop = 0 } = storeState;
  const {
    header: optionsHeader = {},
    body: optionsBody = {},
    scroller: optionsScroller = {},
    page: optionsPage = {},
    frozenColumnIndex = 0,
    frozenRowIndex = 0,
    lineNumberColumnWidth = 0,
    rowSelectorColumnWidth = 0,
    showLineNumber,
    showRowSelector,
  } = options;
  const {
    display: optionsHeaderDisplay = true,
    columnHeight: optionsHeaderColumnHeight = 0,
  } = optionsHeader;
  const { columnHeight: optionsBodyColumnHeight = 0 } = optionsBody;
  const { height: optionsPageHeight = 0 } = optionsPage;
  const headerTableRowsLength = headerTable.rows.length;
  const bodyTablsRowsLength = bodyRowTable.rows.length;

  let {
    theme: optionsScrollerTheme = 'default',
    width: optionsScrollerWidth = 0,
    height: optionsScrollerHeight = 0,
    padding: optionsScrollerPadding = 0,
    arrowSize: optionsScrollerArrowSize = 0,
    barMinSize: optionsScrollerBarMinSize = 0,
    horizontalScrollerWidth = 0,
  } = optionsScroller;

  if (optionsScrollerTheme === 'solid') {
    optionsScrollerArrowSize = 0;
  }

  let currentStyles: IDataGrid.IStyles = {};

  currentStyles.elWidth = width;
  currentStyles.elHeight = height;
  currentStyles.rightPanelWidth = 0;
  currentStyles.pageHeight = 0;
  currentStyles.asidePanelWidth =
    (showLineNumber ? lineNumberColumnWidth : 0) +
    (showRowSelector ? rowSelectorColumnWidth : 0);
  currentStyles.bodyTrHeight = bodyTablsRowsLength * optionsBodyColumnHeight;
  currentStyles.horizontalScrollerHeight = 0;

  currentStyles.frozenPanelWidth = ((_colGroup, endIndex) => {
    let width = 0;
    for (let i = 0, l = endIndex; i < l; i++) {
      if (_colGroup[i]) {
        width += _colGroup[i]._width || 0;
      }
    }
    return width;
  })(colGroup, frozenColumnIndex);

  currentStyles.headerHeight = optionsHeaderDisplay
    ? headerTableRowsLength * optionsHeaderColumnHeight
    : 0;

  currentStyles.frozenPanelHeight = frozenRowIndex * currentStyles.bodyTrHeight;

  currentStyles.footSumHeight =
    (footSumColumns ? footSumColumns.length : 0) * currentStyles.bodyTrHeight;

  currentStyles.pageHeight = optionsPageHeight;
  // currentStyles.pageButtonsContainerWidth = optionsPageButtonsContainerWidth;

  currentStyles.verticalScrollerWidth = 0;
  if (
    currentStyles.elHeight -
      currentStyles.headerHeight -
      optionsPageHeight -
      currentStyles.footSumHeight <
    dataLength * currentStyles.bodyTrHeight
  ) {
    currentStyles.verticalScrollerWidth = optionsScrollerWidth;
  }

  currentStyles.horizontalScrollerHeight = (() => {
    if (colGroup) {
      let totalColGroupWidth: number = colGroup.reduce((prev: number, curr) => {
        return prev + (curr._width || 0);
      }, 0);

      // aside 빼고, 수직 스크롤이 있으면 또 빼고 비교
      let bodyWidth =
        currentStyles.elWidth -
        currentStyles.asidePanelWidth -
        (optionsScrollerTheme === 'default'
          ? currentStyles.verticalScrollerWidth
          : 0);
      return totalColGroupWidth > bodyWidth ? optionsScrollerHeight : 0;
    } else {
      return 0;
    }
  })();

  // scroll content width
  currentStyles.scrollContentWidth = headerColGroup.reduce(
    (prev: number, curr) => {
      return prev + (curr._width || 0);
    },
    0,
  );

  currentStyles.scrollContentContainerWidth =
    currentStyles.elWidth -
    currentStyles.asidePanelWidth -
    currentStyles.frozenPanelWidth -
    currentStyles.rightPanelWidth;

  if (
    currentStyles.horizontalScrollerHeight > 0 &&
    currentStyles.elHeight -
      currentStyles.headerHeight -
      currentStyles.pageHeight -
      currentStyles.footSumHeight -
      currentStyles.horizontalScrollerHeight <
      dataLength * currentStyles.bodyTrHeight
  ) {
    currentStyles.verticalScrollerWidth = optionsScrollerWidth;
  }

  // get bodyHeight
  currentStyles.bodyHeight =
    currentStyles.elHeight -
    currentStyles.headerHeight -
    currentStyles.pageHeight;

  // 스크롤컨텐츠의 컨테이너 높이.
  currentStyles.scrollContentContainerHeight =
    currentStyles.bodyHeight -
    currentStyles.frozenPanelHeight -
    currentStyles.footSumHeight;

  currentStyles.scrollContentHeight =
    currentStyles.bodyTrHeight *
    (dataLength > frozenRowIndex ? dataLength - frozenRowIndex : 0);

  currentStyles.verticalScrollerHeight =
    currentStyles.elHeight -
    currentStyles.headerHeight -
    currentStyles.pageHeight -
    optionsScrollerPadding * 2 -
    optionsScrollerArrowSize;

  currentStyles.horizontalScrollerWidth =
    (horizontalScrollerWidth / 100) * currentStyles.elWidth;
  currentStyles.scrollerPadding = optionsScrollerPadding;
  currentStyles.scrollerArrowSize = optionsScrollerArrowSize;

  // console.log(
  //   `optionsScrollerPadding : ${optionsScrollerPadding}, optionsScrollerArrowSize: ${optionsScrollerArrowSize}`,
  // );

  currentStyles.verticalScrollBarHeight = currentStyles.scrollContentHeight
    ? (currentStyles.scrollContentContainerHeight *
        currentStyles.verticalScrollerHeight) /
      currentStyles.scrollContentHeight
    : 0;

  if (optionsScrollerBarMinSize > currentStyles.verticalScrollBarHeight) {
    currentStyles.verticalScrollBarHeight = optionsScrollerBarMinSize;
  }

  currentStyles.horizontalScrollBarWidth = currentStyles.scrollContentWidth
    ? (currentStyles.scrollContentContainerWidth *
        currentStyles.horizontalScrollerWidth) /
      currentStyles.scrollContentWidth
    : 0;

  if (optionsScrollerBarMinSize > currentStyles.horizontalScrollBarWidth) {
    currentStyles.horizontalScrollBarWidth = optionsScrollerBarMinSize;
  }

  // scrollLeft, scrollTop의 위치가 맞지 않으면 조정.

  if (
    scrollLeft !== 0 &&
    currentStyles.scrollContentWidth +
      scrollLeft +
      currentStyles.scrollerArrowSize <
      currentStyles.scrollContentContainerWidth
  ) {
    scrollLeft =
      currentStyles.scrollContentContainerWidth -
      currentStyles.scrollContentWidth -
      currentStyles.scrollerArrowSize;
    if (scrollLeft > 0) {
      scrollLeft = 0;
    }
  }
  if (
    scrollTop !== 0 &&
    currentStyles.scrollContentHeight +
      scrollTop +
      currentStyles.scrollerArrowSize <
      currentStyles.scrollContentContainerHeight
  ) {
    scrollTop =
      currentStyles.scrollContentContainerHeight -
      currentStyles.scrollContentHeight -
      currentStyles.scrollerArrowSize;
    if (scrollTop > 0) {
      scrollTop = 0;
    }
  }

  return {
    scrollLeft,
    scrollTop,
    styles: currentStyles,
  };
}
