import getPathValue from './getPathValue';
import { getOuterWidth, getOuterHeight } from './getWidthHeight';
import { types } from '../stores';
import setColGroupWidth from './setColGroupWidth';

function calculateDimensions(
  containerDOM: HTMLDivElement,
  state: types.DataGridState,
) {
  const {
    filteredList,
    colGroup,
    headerTable,
    footSumColumns,
    options,
    styles,
  } = state;

  const optionsHeader = options ? options.header : {};
  const optionsScroller = options ? options.scroller : {};
  const optionsPage = options ? options.page : {};
  const frozenColumnIndex = getPathValue(options, ['frozenColumnIndex'], 0);
  const frozenRowIndex = getPathValue(options, ['frozenRowIndex'], 0);
  const optionsHeaderDisplay = getPathValue(optionsHeader, ['display'], true);
  const optionsHeaderColumnHeight = getPathValue(optionsHeader, [
    'columnHeight',
  ]);
  const optionsPageHeight = getPathValue(optionsPage, ['height'], 0);
  const optionsPageButtonsContainerWidth = getPathValue(optionsPage, [
    'buttonsContainerWidth',
  ]);
  const optionsScrollerSize = getPathValue(optionsScroller, ['size'], 0);
  const optionsScrollerDisabledVerticalScroll = getPathValue(optionsScroller, [
    'disabledVerticalScroll',
  ]);
  const optionsScrollerPadding = getPathValue(optionsScroller, ['padding'], 0);
  const optionsScrollerArrowSize = getPathValue(
    optionsScroller,
    ['arrowSize'],
    0,
  );
  const optionsScrollerBarMinSize = getPathValue(
    optionsScroller,
    ['barMinSize'],
    0,
  );

  const headerTableRowsLength = headerTable ? headerTable.rows.length || 0 : 0;
  const dataLength = filteredList ? filteredList.length : 0;

  let currentStyles: types.DataGridStyles = { ...styles };
  let currentColGroup: types.DataGridCol[] = [];
  let currentHeaderColGroup: types.DataGridCol[] = [];

  currentStyles.calculatedHeight = null; // props에의해 정해진 height가 아닌 내부에서 계산된 높이를 사용하고 싶은 경우 숫자로 값 지정
  currentStyles.CTInnerWidth = currentStyles.elWidth = getOuterWidth(
    containerDOM,
  );
  currentStyles.CTInnerHeight = currentStyles.elHeight = getOuterHeight(
    containerDOM,
  );

  currentStyles.rightPanelWidth = 0;
  currentStyles.pageHeight = 0;

  if (colGroup && options) {
    currentColGroup = setColGroupWidth(
      colGroup,
      {
        width:
          currentStyles.elWidth -
          (currentStyles.asidePanelWidth || 0 + optionsScrollerSize),
      },
      options,
    );
    currentHeaderColGroup = currentColGroup.slice(frozenColumnIndex);
  }

  currentStyles.frozenPanelWidth = ((_colGroup, endIndex) => {
    let width = 0;
    for (let i = 0, l = endIndex; i < l; i++) {
      if (_colGroup[i]) {
        width += _colGroup[i]._width || 0;
      }
    }
    return width;
  })(currentColGroup || [], frozenColumnIndex);

  currentStyles.headerHeight = optionsHeaderDisplay
    ? headerTableRowsLength * optionsHeaderColumnHeight
    : 0;

  currentStyles.frozenPanelHeight =
    frozenRowIndex * (currentStyles.bodyTrHeight || 0);

  currentStyles.footSumHeight =
    (footSumColumns ? footSumColumns.length : 0) *
    (currentStyles.bodyTrHeight || 0);

  currentStyles.pageHeight = optionsPageHeight;
  currentStyles.pageButtonsContainerWidth = optionsPageButtonsContainerWidth;

  currentStyles.verticalScrollerWidth =
    currentStyles.elHeight -
    currentStyles.headerHeight -
    optionsPageHeight -
    (currentStyles.footSumHeight <
    dataLength * (currentStyles.bodyTrHeight || 0)
      ? optionsScrollerSize
      : 0);

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
        (currentStyles.asidePanelWidth || 0) -
        currentStyles.verticalScrollerWidth;
      return totalColGroupWidth > bodyWidth ? optionsScrollerSize : 0;
    } else {
      return 0;
    }
  })();

  currentStyles.scrollContentWidth = currentHeaderColGroup.reduce(
    (prev: number, curr) => {
      return prev + (curr._width || 0);
    },
    0,
  );

  currentStyles.scrollContentContainerWidth =
    currentStyles.CTInnerWidth -
    (currentStyles.asidePanelWidth || 0) -
    currentStyles.frozenPanelWidth -
    currentStyles.rightPanelWidth -
    currentStyles.verticalScrollerWidth;

  if (Number(currentStyles.horizontalScrollerHeight) > 0) {
    currentStyles.verticalScrollerWidth =
      currentStyles.elHeight -
      currentStyles.headerHeight -
      (currentStyles.pageHeight || 0) -
      currentStyles.footSumHeight -
      ((currentStyles.horizontalScrollerHeight || 0) <
      dataLength * (currentStyles.bodyTrHeight || 0)
        ? optionsScrollerSize
        : 0);
  }

  currentStyles.CTInnerHeight =
    currentStyles.elHeight - (currentStyles.pageHeight || 0);

  // get bodyHeight
  currentStyles.bodyHeight =
    currentStyles.CTInnerHeight - currentStyles.headerHeight;

  // 스크롤컨텐츠의 컨테이너 높이.
  currentStyles.scrollContentContainerHeight =
    currentStyles.bodyHeight -
    currentStyles.frozenPanelHeight -
    currentStyles.footSumHeight;

  currentStyles.scrollContentHeight =
    (currentStyles.bodyTrHeight || 0) *
    (dataLength > frozenRowIndex ? dataLength - frozenRowIndex : 0);

  if (optionsScrollerDisabledVerticalScroll) {
    currentStyles.calculatedHeight =
      dataLength * (currentStyles.bodyTrHeight || 0) +
      currentStyles.headerHeight +
      (currentStyles.pageHeight || 0);

    currentStyles.bodyHeight =
      currentStyles.calculatedHeight -
      currentStyles.headerHeight -
      (currentStyles.pageHeight || 0);

    currentStyles.verticalScrollerWidth = 0;

    currentStyles.CTInnerWidth = currentStyles.elWidth;

    currentStyles.scrollContentContainerWidth =
      currentStyles.CTInnerWidth -
      (currentStyles.asidePanelWidth || 0) -
      currentStyles.frozenPanelWidth -
      currentStyles.rightPanelWidth;

    currentStyles.scrollContentContainerHeight =
      currentStyles.scrollContentHeight;
  }

  currentStyles.verticalScrollerHeight =
    currentStyles.elHeight -
    (currentStyles.pageHeight || 0) -
    optionsScrollerPadding * 2 -
    optionsScrollerArrowSize;

  currentStyles.horizontalScrollerWidth =
    currentStyles.elWidth -
    currentStyles.verticalScrollerWidth -
    (currentStyles.pageButtonsContainerWidth || 0) -
    optionsScrollerPadding * 2 -
    optionsScrollerArrowSize;

  currentStyles.scrollerPadding = optionsScrollerPadding;
  currentStyles.scrollerArrowSize = optionsScrollerArrowSize;
  currentStyles.verticalScrollBarHeight = currentStyles.scrollContentHeight
    ? currentStyles.scrollContentContainerHeight *
      currentStyles.verticalScrollerHeight /
      currentStyles.scrollContentHeight
    : 0;

  if (optionsScrollerBarMinSize > currentStyles.verticalScrollBarHeight) {
    currentStyles.verticalScrollBarHeight = optionsScrollerBarMinSize;
  }

  currentStyles.horizontalScrollBarWidth = currentStyles.scrollContentWidth
    ? currentStyles.scrollContentContainerWidth *
      currentStyles.horizontalScrollerWidth /
      currentStyles.scrollContentWidth
    : 0;

  if (optionsScrollerBarMinSize > currentStyles.horizontalScrollBarWidth) {
    currentStyles.horizontalScrollBarWidth = optionsScrollerBarMinSize;
  }

  return {
    styles: currentStyles,
    colGroup: currentColGroup,
    leftHeaderColGroup: currentColGroup.slice(0, frozenColumnIndex),
    headerColGroup: currentHeaderColGroup,
  };
}

export default calculateDimensions;
