import * as TYPES from './actionTypes';
import { propsConverterForData } from '../util';
export function INIT(props, options) {
    let Obj_data = propsConverterForData(props.data);
    return {
        type: TYPES.INIT,
        receivedList: Obj_data.receivedList,
        page: Obj_data.page,
        options
    };
}
export function SET_DATA(data, options) {
    let Obj_data = propsConverterForData(data);
    return {
        type: TYPES.SET_DATA,
        receivedList: Obj_data.receivedList,
        page: Obj_data.page,
        options
    };
}
export function SORT(colGroup, options, colIndex) {
    return {
        type: TYPES.SORT,
        colGroup,
        options,
        colIndex
    };
}
export function FILTER(colGroup, options, colIndex, filterInfo) {
    return {
        type: TYPES.FILTER,
        colGroup,
        options,
        colIndex,
        filterInfo
    };
}
export function UPDATE(colGroup, options, row, col, value) {
    return {
        type: TYPES.UPDATE,
        colGroup,
        options,
        row,
        col,
        value
    };
}
