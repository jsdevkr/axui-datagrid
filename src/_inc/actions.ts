import { isArray, isObject } from 'lodash';
import * as TYPES from './actionTypes';
import { propsConverterForData } from '../_inc/utils';

export function INIT(props: any, options: any) {
  let Obj_data = propsConverterForData(props.data);
  return {
    type: TYPES.INIT,
    receivedList: Obj_data.receivedList,
    page: Obj_data.page,
    options
  };
}

export function SET_DATA(data: any, options: any) {
  let Obj_data = propsConverterForData(data);
  return {
    type: TYPES.SET_DATA,
    receivedList: Obj_data.receivedList,
    page: Obj_data.page,
    options
  };
}

export function SORT(colGroup: any, options: any, colIndex: number) {
  return {
    type: TYPES.SORT,
    colGroup,
    options,
    colIndex
  };
}

export function FILTER(colGroup: any, options: any, colIndex: number, filterInfo: any) {
  return {
    type: TYPES.FILTER,
    colGroup,
    options,
    colIndex,
    filterInfo
  };
}

export function UPDATE() {
  return {
    type: TYPES.UPDATE
  }
}