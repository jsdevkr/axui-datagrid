'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('../actions');

var act = _interopRequireWildcard(_actions);

var _immutable = require('immutable');

var _underscore = require('underscore');

var _utils = require('../_inc/utils');

var UTIL = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// import {mouseEventNames} from '../_inc/preference';


// 초기 상태
var initialState = (0, _immutable.Map)({
  receivedList: (0, _immutable.List)([]),
  deletedList: (0, _immutable.List)([]),
  list: (0, _immutable.List)([]),
  page: (0, _immutable.Map)({}),
  sortInfo: (0, _immutable.Map)({}),
  selectedRowList: {},
  selectedColumns: {},
  focusedPosition: {
    r: 0, c: 0
  }
});

// 리듀서 함수 정의
var grid = function grid() {
  var _processor;

  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var processor = (_processor = {}, _defineProperty(_processor, act.INIT, function () {
    // 그리드 데이터 초기화

    var page = (0, _underscore.isObject)(action.page) ? action.page : action.options.page.paging,
        currentPage = page.currentPage,
        pageSize = page.pageSize,
        list = action.receivedList.filter(function (item) {
      if (item) {
        if (item[action.options.columnKeys.deleted]) {
          return false;
        } else {
          return true;
        }
      }
      return false;
    }).slice(currentPage, pageSize);


    return state.set('receivedList', (0, _immutable.List)(action.receivedList)).set('list', (0, _immutable.List)(list)).set('page', (0, _immutable.Map)(page));
  }), _defineProperty(_processor, act.SET_DATA, function () {
    var page = (0, _underscore.isObject)(action.page) ? action.page : action.options.page.paging,
        currentPage = page.currentPage,
        pageSize = page.pageSize,
        list = action.receivedList.filter(function (item) {
      if (item) {
        if (item[action.options.columnKeys.deleted]) {
          return false;
        } else {
          return true;
        }
      }
      return false;
    }).slice(currentPage, pageSize);


    return state.set('receivedList', (0, _immutable.List)(action.receivedList)).set('list', (0, _immutable.List)(list)).set('page', (0, _immutable.Map)(page));
  }), _processor);

  if (action.type in processor) {
    return processor[action.type]();
  } else {
    return state;
  }
};

exports.default = grid;