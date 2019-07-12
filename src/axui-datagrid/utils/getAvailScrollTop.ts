import getScrollPosition from './getScrollPosition';

interface IGetScrollTopOptions {
  frozenRowIndex: number;
  sRowIndex: number;
  eRowIndex: number;
  scrollTop: number;
  scrollLeft: number;
  scrollContentWidth: number;
  scrollContentHeight: number;
  scrollContentContainerWidth: number;
  scrollContentContainerHeight: number;
  bodyTrHeight: number;
  pRowSize: number;
}

const getAvailScrollTop = (
  rowIndex: number,
  {
    frozenRowIndex,
    sRowIndex,
    eRowIndex,
    scrollTop,
    scrollLeft,
    scrollContentWidth,
    scrollContentHeight,
    scrollContentContainerWidth,
    scrollContentContainerHeight,
    bodyTrHeight,
    pRowSize,
  }: IGetScrollTopOptions,
): number | undefined => {
  let _scrollTop: number | undefined = undefined;

  if (frozenRowIndex >= rowIndex) {
    return;
  }

  if (sRowIndex >= rowIndex) {
    _scrollTop = -(rowIndex - frozenRowIndex) * bodyTrHeight;
  } else if (eRowIndex <= rowIndex) {
    _scrollTop =
      -rowIndex * bodyTrHeight + (pRowSize * bodyTrHeight - bodyTrHeight);
  }

  if (typeof _scrollTop !== 'undefined') {
    _scrollTop = getScrollPosition(scrollLeft, _scrollTop, {
      scrollWidth: scrollContentWidth,
      scrollHeight: scrollContentHeight,
      clientWidth: scrollContentContainerWidth,
      clientHeight: scrollContentContainerHeight,
    }).scrollTop;
  } else {
    _scrollTop = scrollTop;
  }

  return _scrollTop;
};

export default getAvailScrollTop;
