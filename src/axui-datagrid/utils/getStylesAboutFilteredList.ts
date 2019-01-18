import { IDataGrid } from '../common/@types';

function getStylesAboutFilteredList(
  _list: any[],
  options: IDataGrid.IOptions,
  styles: IDataGrid.IStyles,
) {
  const {
    elHeight = 0,
    headerHeight = 0,
    footSumHeight = 0,
    bodyTrHeight = 0,
    horizontalScrollerHeight = 0,
    pageHeight = 0,
    scrollContentContainerHeight = 0,
    verticalScrollerHeight = 0,
    CTInnerWidth = 0,
    asidePanelWidth = 0,
    frozenPanelWidth = 0,
    rightPanelWidth = 0,
  } = styles;
  const {
    scroller: optionsScroller = {},
    page: optionsPage = {},
    frozenRowIndex = 0,
  } = options;
  const { height: optionsPageHeight = 0 } = optionsPage;
  const {
    size: optionsScrollerSize = 0,
    barMinSize: optionsScrollerBarMinSize = 0,
  } = optionsScroller;

  const dataLength = _list ? _list.length : 0;

  let currentStyles: IDataGrid.IStyles = {};

  currentStyles.frozenPanelHeight = frozenRowIndex * bodyTrHeight;

  currentStyles.scrollContentHeight =
    bodyTrHeight *
    (dataLength > frozenRowIndex ? dataLength - frozenRowIndex : 0);

  currentStyles.verticalScrollerWidth = 0;
  if (
    elHeight - headerHeight - optionsPageHeight - footSumHeight <
    dataLength * bodyTrHeight
  ) {
    currentStyles.verticalScrollerWidth = optionsScrollerSize;
  }
  currentStyles.verticalScrollBarHeight = currentStyles.scrollContentHeight
    ? (scrollContentContainerHeight * verticalScrollerHeight) /
      currentStyles.scrollContentHeight
    : 0;

  if (optionsScrollerBarMinSize > currentStyles.verticalScrollBarHeight) {
    currentStyles.verticalScrollBarHeight = optionsScrollerBarMinSize;
  }

  currentStyles.scrollContentContainerWidth =
    CTInnerWidth -
    asidePanelWidth -
    frozenPanelWidth -
    rightPanelWidth -
    currentStyles.verticalScrollerWidth;

  if (
    horizontalScrollerHeight > 0 &&
    elHeight -
      headerHeight -
      pageHeight -
      footSumHeight -
      horizontalScrollerHeight <
      dataLength * bodyTrHeight
  ) {
    currentStyles.verticalScrollerWidth = optionsScrollerSize;
  }

  currentStyles.scrollContentHeight =
    bodyTrHeight *
    (dataLength > frozenRowIndex ? dataLength - frozenRowIndex : 0);

  return currentStyles;
}

export default getStylesAboutFilteredList;
