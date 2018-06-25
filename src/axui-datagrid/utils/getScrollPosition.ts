export function getScrollPosition(
  scrollLeft: number,
  scrollTop: number,
  {
    scrollWidth,
    scrollHeight,
    clientWidth,
    clientHeight,
  }: {
    scrollWidth: number;
    scrollHeight: number;
    clientWidth: number;
    clientHeight: number;
  },
) {
  let endScroll = false;

  if (clientHeight > scrollHeight) {
    scrollTop = 0;
  } else if (scrollTop > 0) {
    scrollTop = 0;
    endScroll = true;
  } else if (clientHeight > scrollHeight + scrollTop) {
    // scrollHeight
    scrollTop = clientHeight - scrollHeight;
    endScroll = true;
  }

  if (clientWidth > scrollWidth) {
    scrollLeft = 0;
  } else if (scrollLeft > 0) {
    scrollLeft = 0;
    endScroll = true;
  } else if (clientWidth > scrollWidth + scrollLeft) {
    // scrollHeight
    scrollLeft = clientWidth - scrollWidth;
    endScroll = true;
  }

  return {
    scrollLeft,
    scrollTop,
    endScroll,
  };
}

export default getScrollPosition;
