
interface iAXDataGridScrollProps {
  mounted: boolean;
  bodyHeight: number;
  pageHeight: number;
  verticalScrollerHeight: number;
  verticalScrollerWidth: number;
  horizontalScrollerWidth: number;
  horizontalScrollerHeight: number;
  verticalScrollBarHeight: number;
  horizontalScrollBarWidth: number;
  scrollerArrowSize: number;
  scrollerPadding: number;
  scrollBarLeft: number;
  scrollBarTop: number;
  onMouseDownScrollBar: Function;
  onClickScrollTrack: Function;
  onClickScrollArrow: Function;
}

interface iAXDataGridScrollState {
  /* empty */
}
