import {isArray, isObject} from "underscore";
import { propsConverterForData } from "../_inc/utils";

/* 그리드 초기화 :  */
export const INIT = 'INIT';

export function init(props, options) {
  let Obj_data = propsConverterForData(props.data);

  return {
    type: INIT,
    height: props.height,
    columns: props.columns,
    receivedList: Obj_data.receivedList,
    page: Obj_data.page,
    options: options
  }
}

export const DID_MOUNT = 'DID_MOUNT';
export function didMount(props, containerDOM) {
  return {
    type: DID_MOUNT,
    containerDOM: containerDOM
  }
}

export const SET_COLUMNS = 'SET_COLUMNS';
export function setColumns(columns) {
  return {
    type: SET_COLUMNS,
    columns: columns
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

/* 컨테이너의 크기가 변경되어 엘리먼트의 크기를 조정해야 할 때 */
export const ALIGN = 'ALIGN';
export function align(props, containerDOM) {
  return {
    type: ALIGN,
    containerDOM: containerDOM
  }
}

export const CHANGE_OPTIONS = 'CHANGE_OPTIONS';
export function changeOptions(containerDOM, options) {
  return {
    type: CHANGE_OPTIONS,
    containerDOM: containerDOM,
    options: options
  }
}