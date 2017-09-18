/* 그리드 데이터 초기화 :  */
export const INIT_DATA = 'INIT_DATA';
export function initData(receivedList = [], page = {}) {
  return {
    type: INIT_DATA,
    receivedList,
    page,
  }
}

/* 그리드 스크롤 업데이트 */
export const UPDATE_SCROLL = 'UPDATE_SCROLL';
export function updateScroll(scrollLeft = 0, scrollTop = 0) {
  return {
    type: UPDATE_SCROLL,
    scrollLeft,
    scrollTop,
  }
}