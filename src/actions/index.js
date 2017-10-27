import {isArray, isObject} from "underscore";
import { propsConverterForData } from "../_inc/utils";

/* 그리드 초기화 :  */
export const INIT = 'INIT';

export function init(props, options) {
  let Obj_data = propsConverterForData(props.data);

  return {
    type: INIT,
    receivedList: Obj_data.receivedList,
    page: Obj_data.page,
    options: options
  }
}

/* 그리드 데이터 변경 */
export const SET_DATA= 'SET_DATA';
export function setData(data, options) {
  let Obj_data = propsConverterForData(data);

  return {
    type: SET_DATA,
    receivedList: Obj_data.receivedList,
    page: Obj_data.page,
    options: options
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