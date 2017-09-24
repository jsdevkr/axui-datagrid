import {isArray, isObject} from "underscore";
import { propsConverterForData } from "../_inc/utils";

/* 그리드 초기화 :  */
export const INIT = 'INIT';

export function init(props) {
  let Obj_data = propsConverterForData(props.data);
  return {
    type: INIT,
    height: props.height,
    columns: props.columns,
    receivedList: Obj_data.receivedList,
    page: Obj_data.page,
    options: props.options
  }
}

export const DID_MOUNT = 'DID_MOUNT';
export function didMount(props, containerDOM) {
  return {
    type: DID_MOUNT,
    containerDOM: containerDOM
  }
}

/* 그리드 데이터 변경 */
export const SET_DATA= 'SET_DATA';
export function setData(data) {
  let Obj_data = propsConverterForData(data);

  return {
    type: SET_DATA,
    receivedList: Obj_data.receivedList,
    page: Obj_data.page,
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