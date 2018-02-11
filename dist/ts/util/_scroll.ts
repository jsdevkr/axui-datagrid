
/**
 *
 * @param scrollLeft
 * @param scrollTop
 * @param scrollWidth
 * @param scrollHeight
 * @param clientWidth
 * @param clientHeight
 * @return {{scrollLeft: *, scrollTop: *, eventBreak: boolean}}
 */
export function getScrollPosition( scrollLeft: number, scrollTop: number, { scrollWidth, scrollHeight, clientWidth, clientHeight } ) {
  let endScroll = false;

  if ( clientHeight > scrollHeight ) {
    scrollTop = 0;
  }
  else if ( scrollTop > 0 ) {
    scrollTop = 0;
    endScroll = true;
  } else if ( clientHeight > scrollHeight + scrollTop ) {
    // scrollHeight
    scrollTop = clientHeight - scrollHeight;
    endScroll = true;
  }

  if ( clientWidth > scrollWidth ) {
    scrollLeft = 0;
  }
  else if ( scrollLeft > 0 ) {
    scrollLeft = 0;
    endScroll = true;
  } else if ( clientWidth > scrollWidth + scrollLeft ) {
    // scrollHeight
    scrollLeft = clientWidth - scrollWidth;
    endScroll = true;
  }

  return {
    scrollLeft, scrollTop, endScroll
  }
}

/**
 *
 * @param {number} scrollBarLeft
 * @param {number} scrollBarTop
 * @param {any} horizontalScrollerWidth
 * @param {any} verticalScrollerHeight
 * @param {any} horizontalScrollBarWidth
 * @param {any} verticalScrollBarHeight
 * @param {any} scrollContentWidth
 * @param {any} scrollContentHeight
 * @param {any} scrollContentContainerWidth
 * @param {any} scrollContentContainerHeight
 * @param {any} BW
 * @param {any} BH
 * @param {any} SW
 * @param {any} SH
 * @return {{scrollLeft: number; scrollTop: number}}
 */
export function getScrollPositionByScrollBar( scrollBarLeft: number, scrollBarTop: number, {
  horizontalScrollerWidth, verticalScrollerHeight, horizontalScrollBarWidth, verticalScrollBarHeight,
  scrollContentWidth, scrollContentHeight,
  scrollContentContainerWidth, scrollContentContainerHeight,
  BW = horizontalScrollerWidth - horizontalScrollBarWidth,
  BH = verticalScrollerHeight - verticalScrollBarHeight,
  SW = scrollContentWidth - scrollContentContainerWidth,
  SH = scrollContentHeight - scrollContentContainerHeight
} ) {

  let { scrollLeft, scrollTop } = getScrollPosition( -scrollBarLeft * SW / BW, -scrollBarTop * SH / BH, {
    scrollWidth: scrollContentWidth,
    scrollHeight: scrollContentHeight,
    clientWidth: scrollContentContainerWidth,
    clientHeight: scrollContentContainerHeight
  } );

  return {
    scrollLeft,
    scrollTop
  }
}