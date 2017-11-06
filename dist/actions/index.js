"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_DATA = exports.INIT = undefined;
exports.init = init;
exports.setData = setData;

var _underscore = require("underscore");

var _utils = require("../_inc/utils");

/* 그리드 초기화 :  */
var INIT = exports.INIT = 'INIT';

function init(props, options) {
  var Obj_data = (0, _utils.propsConverterForData)(props.data);

  return {
    type: INIT,
    receivedList: Obj_data.receivedList,
    page: Obj_data.page,
    options: options
  };
}

/* 그리드 데이터 변경 */
var SET_DATA = exports.SET_DATA = 'SET_DATA';
function setData(data, options) {
  var Obj_data = (0, _utils.propsConverterForData)(data);

  return {
    type: SET_DATA,
    receivedList: Obj_data.receivedList,
    page: Obj_data.page,
    options: options
  };
}