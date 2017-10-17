import {isArray, isObject} from "underscore";
import { propsConverterForData } from "../_inc/utils";

/* 그리드 초기화 :  */
export const INIT = 'INIT';

export function init(props, options) {
  let Obj_data = propsConverterForData(props.data);

  return {
    type: INIT,
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


/* 컨테이너의 크기가 변경되어 엘리먼트의 크기를 조정해야 할 때 */
export const ALIGN = 'ALIGN';
export function align(props, containerDOM) {
  return {
    type: ALIGN,
    containerDOM: containerDOM
  }
}


export const UPDATE_PROPS = 'UPDATE_PROPS';
export function updateProps(props, containerDOM, options) {
  return {
    type: UPDATE_PROPS,
    containerDOM: containerDOM,
    height: props.height,
    columns: props.columns,
    options: options
  }
}