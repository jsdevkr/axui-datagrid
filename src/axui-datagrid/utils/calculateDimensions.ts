import setColGroupWidth from './setColGroupWidth';
import {
  IDataGridState,
  IDataGridStyles,
  IDataGridCol,
} from '../common/@types';

function calculateDimensions(
  containerDOM: HTMLDivElement | undefined | null,
  state: IDataGridState,
  toBeFilteredList?: any[],
): {
  scrollLeft: number;
  scrollTop: number;
  styles: IDataGridStyles;
  colGroup: IDataGridCol[];
  leftHeaderColGroup: IDataGridCol[];
  headerColGroup: IDataGridCol[];
} {
  const {
    filteredList = [],
    colGroup = [],
    headerTable,
    footSumColumns,
    options = {},
    styles = {},
    height = 0,
    width = 0,
  } = state;

  let { scrollLeft = 0, scrollTop = 0 } = state;

  let list: any[] = toBeFilteredList || filteredList;

  const {
    header: optionsHeader = {},
    scroller: optionsScroller = {},
    page: optionsPage = {},
    frozenColumnIndex = 0,
    frozenRowIndex = 0,
  } = options;

  const {
    display: optionsHeaderDisplay = true,
    columnHeight: optionsHeaderColumnHeight = 0,
  } = optionsHeader;
  const {
    height: optionsPageHeight = 0,
    buttonsContainerWidth: optionsPageButtonsContainerWidth = 0,
  } = optionsPage;
  const {
    size: optionsScrollerSize = 0,
    disabledVerticalScroll: optionsScrollerDisabledVerticalScroll,
    padding: optionsScrollerPadding = 0,
    arrowSize: optionsScrollerArrowSize = 0,
    barMinSize: optionsScrollerBarMinSize = 0,
  } = optionsScroller;

  const headerTableRowsLength = headerTable ? headerTable.rows.length || 0 : 0;
  const dataLength = list ? list.length : 0;

  let currentStyles: IDataGridStyles = { ...styles };
  let currentColGroup: IDataGridCol[] = [];
  let currentHeaderColGroup: IDataGridCol[] = [];

  currentStyles.calculatedHeight = null; // props에의해 정해진 height가 아닌 내부에서 계산된 높이를 사용하고 싶은 경우 숫자로 값 지정

  currentStyles.CTInnerWidth = currentStyles.elWidth = width;
  currentStyles.CTInnerHeight = currentStyles.elHeight = height;

  currentStyles.rightPanelWidth = 0;
  currentStyles.pageHeight = 0;
  currentStyles.asidePanelWidth = currentStyles.asidePanelWidth || 0;
  currentStyles.bodyTrHeight = currentStyles.bodyTrHeight || 0;
  currentStyles.horizontalScrollerHeight =
    currentStyles.horizontalScrollerHeight || 0;
  currentStyles.pageButtonsContainerWidth =
    currentStyles.pageButtonsContainerWidth || 0;

  currentColGroup = setColGroupWidth(
    colGroup,
    {
      width:
        currentStyles.elWidth -
        currentStyles.asidePanelWidth +
        optionsScrollerSize,
    },
    options,
  );
  currentHeaderColGroup = currentColGroup.slice(frozenColumnIndex);

  currentStyles.frozenPanelWidth = ((_colGroup, endIndex) => {
    let width = 0;
    for (let i = 0, l = endIndex; i < l; i++) {
      if (_colGroup[i]) {
        width += _colGroup[i]._width || 0;
      }
    }
    return width;
  })(currentColGroup, frozenColumnIndex);

  currentStyles.headerHeight = optionsHeaderDisplay
    ? headerTableRowsLength * optionsHeaderColumnHeight
    : 0;

  currentStyles.frozenPanelHeight = frozenRowIndex * currentStyles.bodyTrHeight;

  currentStyles.footSumHeight =
    (footSumColumns ? footSumColumns.length : 0) * currentStyles.bodyTrHeight;

  currentStyles.pageHeight = optionsPageHeight;
  currentStyles.pageButtonsContainerWidth = optionsPageButtonsContainerWidth;

  currentStyles.verticalScrollerWidth = 0;
  if (
    currentStyles.elHeight -
      currentStyles.headerHeight -
      optionsPageHeight -
      currentStyles.footSumHeight <
    dataLength * currentStyles.bodyTrHeight
  ) {
    currentStyles.verticalScrollerWidth = optionsScrollerSize;
  }

  currentStyles.horizontalScrollerHeight = (() => {
    if (currentColGroup) {
      let totalColGroupWidth: number = currentColGroup.reduce(
        (prev: number, curr) => {
          return prev + (curr._width || 0);
        },
        0,
      );

      // aside 빼고, 수직 스크롤이 있으면 또 빼고 비교
      let bodyWidth =
        currentStyles.elWidth -
        currentStyles.asidePanelWidth -
        currentStyles.verticalScrollerWidth;
      return totalColGroupWidth > bodyWidth ? optionsScrollerSize : 0;
    } else {
      return 0;
    }
  })();

  // scroll content width
  currentStyles.scrollContentWidth = currentHeaderColGroup.reduce(
    (prev: number, curr) => {
      return prev + (curr._width || 0);
    },
    0,
  );

  currentStyles.scrollContentContainerWidth =
    currentStyles.CTInnerWidth -
    currentStyles.asidePanelWidth -
    currentStyles.frozenPanelWidth -
    currentStyles.rightPanelWidth -
    currentStyles.verticalScrollerWidth;

  if (
    currentStyles.horizontalScrollerHeight > 0 &&
    currentStyles.elHeight -
      currentStyles.headerHeight -
      currentStyles.pageHeight -
      currentStyles.footSumHeight -
      currentStyles.horizontalScrollerHeight <
      dataLength * currentStyles.bodyTrHeight
  ) {
    currentStyles.verticalScrollerWidth = optionsScrollerSize;
  }

  currentStyles.CTInnerHeight =
    currentStyles.elHeight - currentStyles.pageHeight;

  // get bodyHeight
  currentStyles.bodyHeight =
    currentStyles.CTInnerHeight - currentStyles.headerHeight;

  // 스크롤컨텐츠의 컨테이너 높이.
  currentStyles.scrollContentContainerHeight =
    currentStyles.bodyHeight -
    currentStyles.frozenPanelHeight -
    currentStyles.footSumHeight;

  currentStyles.scrollContentHeight =
    currentStyles.bodyTrHeight *
    (dataLength > frozenRowIndex ? dataLength - frozenRowIndex : 0);

  if (optionsScrollerDisabledVerticalScroll) {
    currentStyles.calculatedHeight =
      dataLength * currentStyles.bodyTrHeight +
      currentStyles.headerHeight +
      currentStyles.pageHeight;

    currentStyles.bodyHeight =
      currentStyles.calculatedHeight -
      currentStyles.headerHeight -
      currentStyles.pageHeight;

    currentStyles.verticalScrollerWidth = 0;

    currentStyles.CTInnerWidth = currentStyles.elWidth;

    currentStyles.scrollContentContainerWidth =
      currentStyles.CTInnerWidth -
      currentStyles.asidePanelWidth -
      currentStyles.frozenPanelWidth -
      currentStyles.rightPanelWidth;

    currentStyles.scrollContentContainerHeight =
      currentStyles.scrollContentHeight;
  }

  currentStyles.verticalScrollerHeight =
    currentStyles.elHeight -
    currentStyles.pageHeight -
    optionsScrollerPadding * 2 -
    optionsScrollerArrowSize;

  currentStyles.horizontalScrollerWidth =
    currentStyles.elWidth -
    currentStyles.verticalScrollerWidth -
    currentStyles.pageButtonsContainerWidth -
    optionsScrollerPadding * 2 -
    optionsScrollerArrowSize;

  currentStyles.scrollerPadding = optionsScrollerPadding;
  currentStyles.scrollerArrowSize = optionsScrollerArrowSize;
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
    colGroup: currentColGroup,
    leftHeaderColGroup: currentColGroup.slice(0, frozenColumnIndex),
    headerColGroup: currentHeaderColGroup,
  };
}

export default calculateDimensions;
