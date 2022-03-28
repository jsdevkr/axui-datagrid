import { IDataGrid } from '../common/@types';
import getScrollPosition from './getScrollPosition';

interface IGetScrollLeftOptions {
  colGroup: IDataGrid.ICol[];
  sColIndex: number;
  eColIndex: number;
  frozenColumnIndex: number;
  frozenPanelWidth: number;
  verticalScrollerWidth: number;
  rightPanelWidth: number;
  scrollContentWidth: number;
  scrollContentHeight: number;
  scrollContentContainerWidth: number;
  scrollContentContainerHeight: number;
  scrollTop: number;
  scrollLeft: number;
}
const getAvailScrollLeft = (
  colIndex: number,
  {
    frozenColumnIndex,
    sColIndex,
    frozenPanelWidth,
    colGroup,
    eColIndex,
    verticalScrollerWidth,
    rightPanelWidth,
    scrollContentWidth,
    scrollContentHeight,
    scrollContentContainerWidth,
    scrollContentContainerHeight,
    scrollTop,
    scrollLeft,
  }: IGetScrollLeftOptions,
): number | undefined => {
  let _scrollLeft: number | undefined = undefined;

  if (frozenColumnIndex > colIndex) {
    return;
  }

  if (sColIndex >= colIndex - frozenColumnIndex) {
    _scrollLeft = -(colGroup[colIndex]._sx as number) + frozenPanelWidth;
  } else if (eColIndex <= colIndex - frozenColumnIndex) {
    // 끝점 계산
    _scrollLeft =
      scrollContentContainerWidth -
      (colGroup[colIndex]._ex as number) +
      frozenPanelWidth -
      verticalScrollerWidth -
      rightPanelWidth;
  }

  if (typeof _scrollLeft !== 'undefined') {
    _scrollLeft = getScrollPosition(_scrollLeft as number, scrollTop, {
      scrollWidth: scrollContentWidth,
      scrollHeight: scrollContentHeight,
      clientWidth: scrollContentContainerWidth,
      clientHeight: scrollContentContainerHeight,
    }).scrollLeft;
  } else {
    _scrollLeft = scrollLeft;
  }

  return _scrollLeft;
};

export default getAvailScrollLeft;
