import {isArray, isObject} from "underscore";

/* 그리드 초기화 :  */
export const INIT = 'INIT';

export function init(props) {
  return {
    type: INIT,
    receivedList: props.data || [],
    page: props.page || {},
    scroller: props.scroller,
    columnKeys: props.columnKeys
  }
}

/* 그리드 데이터 변경 */
export const SET_DATA= 'SET_DATA';
export function setData(data) {
  let receivedList = [], page = {};
  if (isArray(data)) {
    receivedList = data;
  }
  else if (isObject(data)) {
    receivedList = data.list || [];
    page = data.page || {};
  }

  return {
    type: SET_DATA,
    receivedList: receivedList,
    page: page
  }
}

/* 그리드 스크롤 업데이트 */
export const UPDATE_SCROLL = 'UPDATE_SCROLL';

export function updateScroll(scrollLeft, scrollTop) {
  return {
    type: UPDATE_SCROLL,
    scrollLeft,
    scrollTop,
  }
}