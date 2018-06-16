import { isNumber, getPathValue } from './etc';
import { types } from '../stores';

/**
 *
 * @param element
 * @return {number}
 */
export function getInnerWidth(element: any): number {
  const cs: any = window.getComputedStyle(element);
  return (
    element.offsetWidth -
    (parseFloat(cs.paddingLeft) +
      parseFloat(cs.paddingRight) +
      parseFloat(cs.borderLeftWidth) +
      parseFloat(cs.borderRightWidth))
  );
}

/**
 *
 * @param element
 * @return {number}
 */
export function getInnerHeight(element: any): number {
  const cs: any = window.getComputedStyle(element);
  return (
    element.offsetHeight -
    (parseFloat(cs.paddingTop) +
      parseFloat(cs.paddingBottom) +
      parseFloat(cs.borderTopWidth) +
      parseFloat(cs.borderBottomWidth))
  );
}

/**
 *
 * @param element
 * @return {number}
 */
export function getOuterWidth(element: HTMLElement): number {
  return element.offsetWidth;
}

/**
 *
 * @param element
 * @return {number}
 */
export function getOuterHeight(element: HTMLElement): number {
  return element.offsetHeight;
}

/**
 * 그리드 colGroup의 width 값을 처리 하는 함수. 왜? '*', '%'로 된 값은 상대적인 값이기 때문에. 컨테이너의 너비에 따라 재계산이 필요합니다.
 * @param {DataGridCol[]} colGroup
 * @param {DataGridRect} container
 * @param {DataGridOptions} options
 * @return {DataGridCol[]}
 */
export function setColGroupWidth(
  colGroup: types.DataGridCol[],
  container: types.DataGridRect,
  options: types.DataGridOptions,
) {
  const columnMinWidth = options.columnMinWidth || 0;
  let totalWidth = 0;
  let computedWidth: number;
  let autoWidthColGroupIndexes: number[] = [];
  let i: number;
  let l: number;

  colGroup.forEach((col, ci) => {
    if (isNumber(col.width)) {
      totalWidth += col._width = Number(col.width);
    } else if (col.width === '*') {
      autoWidthColGroupIndexes.push(ci);
    } else if (
      ('' + col.width).substring(('' + col.width).length - 1) === '%'
    ) {
      totalWidth += col._width =
        container.width *
        Number(('' + col.width).substring(0, ('' + col.width).length - 1)) /
        100;
    }
  });

  if (autoWidthColGroupIndexes.length > 0) {
    computedWidth =
      (container.width - totalWidth) / autoWidthColGroupIndexes.length;
    for (i = 0, l = autoWidthColGroupIndexes.length; i < l; i++) {
      colGroup[autoWidthColGroupIndexes[i]]._width =
        computedWidth < columnMinWidth ? columnMinWidth : computedWidth;
    }
  }
  // 컬럼의 시작위치와 끝위치 계산

  for (i = 0; i < colGroup.length; i++) {
    if (i === 0) {
      colGroup[i]._sx = 0;
    } else {
      colGroup[i]._sx = colGroup[i - 1]._ex;
    }
    colGroup[i]._ex = (colGroup[i]._sx || 0) + (colGroup[i]._width || 0);
  }

  return colGroup;
}

export function calculateDimensions(
  containerDOM: HTMLDivElement,
  state: types.DataGridState,
) {
  const {
    data,
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
  const dataLength = data ? data.length : 0;

  let currentStyle: types.DataGridStyles = { ...styles };
  let currentColGroup: types.DataGridCol[] = [];
  let currentHeaderColGroup: types.DataGridCol[] = [];

  currentStyle.calculatedHeight = null; // props에의해 정해진 height가 아닌 내부에서 계산된 높이를 사용하고 싶은 경우 숫자로 값 지정
  currentStyle.CTInnerWidth = currentStyle.elWidth = getOuterWidth(
    containerDOM,
  );
  currentStyle.CTInnerHeight = currentStyle.elHeight = getOuterHeight(
    containerDOM,
  );
  currentStyle.rightPanelWidth = 0;
  currentStyle.pageHeight = 0;

  if (colGroup && options) {
    currentColGroup = setColGroupWidth(
      colGroup,
      {
        width:
          currentStyle.elWidth -
          (currentStyle.asidePanelWidth || 0 + optionsScrollerSize),
      },
      options,
    );
    currentHeaderColGroup = currentColGroup.slice(frozenColumnIndex);
  }

  currentStyle.frozenPanelWidth = ((_colGroup, endIndex) => {
    let width = 0;
    for (let i = 0, l = endIndex; i < l; i++) {
      if (_colGroup[i]) {
        width += _colGroup[i]._width || 0;
      }
    }
    return width;
  })(currentColGroup || [], frozenColumnIndex);

  currentStyle.headerHeight = optionsHeaderDisplay
    ? headerTableRowsLength * optionsHeaderColumnHeight
    : 0;

  currentStyle.frozenPanelHeight =
    frozenRowIndex * (currentStyle.bodyTrHeight || 0);

  currentStyle.footSumHeight =
    (footSumColumns ? footSumColumns.length : 0) *
    (currentStyle.bodyTrHeight || 0);

  currentStyle.pageHeight = optionsPageHeight;
  currentStyle.pageButtonsContainerWidth = optionsPageButtonsContainerWidth;

  currentStyle.verticalScrollerWidth =
    currentStyle.elHeight -
    currentStyle.headerHeight -
    optionsPageHeight -
    (currentStyle.footSumHeight < dataLength * (currentStyle.bodyTrHeight || 0)
      ? optionsScrollerSize
      : 0);

  currentStyle.horizontalScrollerHeight = (() => {
    if (currentColGroup) {
      let totalColGroupWidth: number = currentColGroup.reduce(
        (prev: any, curr) => {
          return (prev._width || prev) + (curr._width || 0);
        },
      ) as number;

      // aside 빼고, 수직 스크롤이 있으면 또 빼고 비교
      let bodyWidth =
        currentStyle.elWidth -
        (currentStyle.asidePanelWidth || 0) -
        currentStyle.verticalScrollerWidth;
      return totalColGroupWidth > bodyWidth ? optionsScrollerSize : 0;
    } else {
      return 0;
    }
  })();

  currentStyle.scrollContentWidth = currentHeaderColGroup.reduce(
    (prev: any, curr) => {
      return (prev._width || prev) + curr._width;
    },
  ) as number;

  currentStyle.scrollContentContainerWidth =
    currentStyle.CTInnerWidth -
    (currentStyle.asidePanelWidth || 0) -
    currentStyle.frozenPanelWidth -
    currentStyle.rightPanelWidth -
    currentStyle.verticalScrollerWidth;

  if (Number(currentStyle.horizontalScrollerHeight) > 0) {
    currentStyle.verticalScrollerWidth =
      currentStyle.elHeight -
      currentStyle.headerHeight -
      (currentStyle.pageHeight || 0) -
      currentStyle.footSumHeight -
      ((currentStyle.horizontalScrollerHeight || 0) <
      dataLength * (currentStyle.bodyTrHeight || 0)
        ? optionsScrollerSize
        : 0);
  }

  currentStyle.CTInnerHeight =
    currentStyle.elHeight - (currentStyle.pageHeight || 0);

  // get bodyHeight
  currentStyle.bodyHeight =
    currentStyle.CTInnerHeight - currentStyle.headerHeight;

  // 스크롤컨텐츠의 컨테이너 높이.
  currentStyle.scrollContentContainerHeight =
    currentStyle.bodyHeight -
    currentStyle.frozenPanelHeight -
    currentStyle.footSumHeight;

  currentStyle.scrollContentHeight =
    (currentStyle.bodyTrHeight || 0) *
    (dataLength > frozenRowIndex ? dataLength - frozenRowIndex : 0);

  if (optionsScrollerDisabledVerticalScroll) {
    currentStyle.calculatedHeight =
      dataLength * (currentStyle.bodyTrHeight || 0) +
      currentStyle.headerHeight +
      (currentStyle.pageHeight || 0);

    currentStyle.bodyHeight =
      currentStyle.calculatedHeight -
      currentStyle.headerHeight -
      (currentStyle.pageHeight || 0);

    currentStyle.verticalScrollerWidth = 0;

    currentStyle.CTInnerWidth = currentStyle.elWidth;

    currentStyle.scrollContentContainerWidth =
      currentStyle.CTInnerWidth -
      (currentStyle.asidePanelWidth || 0) -
      currentStyle.frozenPanelWidth -
      currentStyle.rightPanelWidth;

    currentStyle.scrollContentContainerHeight =
      currentStyle.scrollContentHeight;
  }

  currentStyle.verticalScrollerHeight =
    currentStyle.elHeight -
    (currentStyle.pageHeight || 0) -
    optionsScrollerPadding * 2 -
    optionsScrollerArrowSize;

  currentStyle.horizontalScrollerWidth =
    currentStyle.elWidth -
    currentStyle.verticalScrollerWidth -
    (currentStyle.pageButtonsContainerWidth || 0) -
    optionsScrollerPadding * 2 -
    optionsScrollerArrowSize;

  currentStyle.scrollerPadding = optionsScrollerPadding;
  currentStyle.scrollerArrowSize = optionsScrollerArrowSize;
  currentStyle.verticalScrollBarHeight = currentStyle.scrollContentHeight
    ? currentStyle.scrollContentContainerHeight *
      currentStyle.verticalScrollerHeight /
      currentStyle.scrollContentHeight
    : 0;

  if (optionsScrollerBarMinSize > currentStyle.verticalScrollBarHeight) {
    currentStyle.verticalScrollBarHeight = optionsScrollerBarMinSize;
  }

  currentStyle.horizontalScrollBarWidth = currentStyle.scrollContentWidth
    ? currentStyle.scrollContentContainerWidth *
      currentStyle.horizontalScrollerWidth /
      currentStyle.scrollContentWidth
    : 0;

  if (optionsScrollerBarMinSize > currentStyle.horizontalScrollBarWidth) {
    currentStyle.horizontalScrollBarWidth = optionsScrollerBarMinSize;
  }

  return {
    styles: styles,
    colGroup: currentColGroup,
    leftHeaderColGroup: currentColGroup.slice(0, frozenColumnIndex),
    headerColGroup: currentHeaderColGroup,
  };
}
