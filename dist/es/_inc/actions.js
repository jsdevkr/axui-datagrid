"use strict";
exports.__esModule = true;
var TYPES = require("./actionTypes");
var utils_1 = require("../_inc/utils");
function INIT(props, options) {
    var Obj_data = utils_1.propsConverterForData(props.data);
    return {
        type: TYPES.INIT,
        receivedList: Obj_data.receivedList,
        page: Obj_data.page,
        options: options
    };
}
exports.INIT = INIT;
function SET_DATA(data, options) {
    var Obj_data = utils_1.propsConverterForData(data);
    return {
        type: TYPES.SET_DATA,
        receivedList: Obj_data.receivedList,
        page: Obj_data.page,
        options: options
    };
}
exports.SET_DATA = SET_DATA;
function SORT(colGroup, options, colIndex) {
    return {
        type: TYPES.SORT,
        colGroup: colGroup,
        options: options,
        colIndex: colIndex
    };
}
exports.SORT = SORT;
function FILTER(colGroup, options, colIndex, filterInfo) {
    return {
        type: TYPES.FILTER,
        colGroup: colGroup,
        options: options,
        colIndex: colIndex,
        filterInfo: filterInfo
    };
}
exports.FILTER = FILTER;
function UPDATE(colGroup, options, row, col, value) {
    return {
        type: TYPES.UPDATE,
        colGroup: colGroup,
        options: options,
        row: row,
        col: col,
        value: value
    };
}
exports.UPDATE = UPDATE;
