import getScrollPosition from './getScrollPosition';

export function getScrollPositionByScrollBar(
  scrollBarLeft: number,
  scrollBarTop: number,
  {
    horizontalScrollerWidth,
    verticalScrollerHeight,
    horizontalScrollBarWidth,
    verticalScrollBarHeight,
    scrollContentWidth,
    scrollContentHeight,
    scrollContentContainerWidth,
    scrollContentContainerHeight,
    BW = horizontalScrollerWidth - horizontalScrollBarWidth,
    BH = verticalScrollerHeight - verticalScrollBarHeight,
    SW = scrollContentWidth - scrollContentContainerWidth,
    SH = scrollContentHeight - scrollContentContainerHeight,
  }: any,
) {
  let {
    scrollLeft,
    scrollTop,
    endOfScrollLeft,
    endOfScrollTop,
  } = getScrollPosition(-scrollBarLeft * SW / BW, -scrollBarTop * SH / BH, {
    scrollWidth: scrollContentWidth,
    scrollHeight: scrollContentHeight,
    clientWidth: scrollContentContainerWidth,
    clientHeight: scrollContentContainerHeight,
  });

  return {
    scrollLeft,
    scrollTop,
    endOfScrollLeft,
    endOfScrollTop,
  };
}

export default getScrollPositionByScrollBar;
