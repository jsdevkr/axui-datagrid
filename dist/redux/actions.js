"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const TYPES = __importStar(require("./actionTypes"));
const util_1 = require("../util");
function INIT(props, options) {
    let Obj_data = util_1.propsConverterForData(props.data);
    return {
        type: TYPES.INIT,
        receivedList: Obj_data.receivedList,
        page: Obj_data.page,
        options,
    };
}
exports.INIT = INIT;
function SET_DATA(data, options) {
    let Obj_data = util_1.propsConverterForData(data);
    return {
        type: TYPES.SET_DATA,
        receivedList: Obj_data.receivedList,
        page: Obj_data.page,
        options,
    };
}
exports.SET_DATA = SET_DATA;
function SORT(colGroup, options, colIndex) {
    return {
        type: TYPES.SORT,
        colGroup,
        options,
        colIndex,
    };
}
exports.SORT = SORT;
function FILTER(colGroup, options, colIndex, filterInfo) {
    return {
        type: TYPES.FILTER,
        colGroup,
        options,
        colIndex,
        filterInfo,
    };
}
exports.FILTER = FILTER;
function UPDATE(colGroup, options, row, col, value) {
    return {
        type: TYPES.UPDATE,
        colGroup,
        options,
        row,
        col,
        value,
    };
}
exports.UPDATE = UPDATE;
