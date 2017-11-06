import * as act from '../actions';
import {List, Map, fromJS} from 'immutable';
import {each, extend, extendOwn, isArray, isNumber, isObject, isString} from "underscore";
// import {mouseEventNames} from '../_inc/preference';
import * as UTIL from '../_inc/utils';

// 초기 상태
const initialState = Map({
  receivedList: List([]),
  deletedList: List([]),
  list: List([]),
  page: Map({}),
  sortInfo: Map({}),
  selectedRowList: {},
  selectedColumns: {},
  focusedPosition: {
    r: 0, c: 0
  }
});

// 리듀서 함수 정의
const grid = (state = initialState, action) => {
  const processor = {
    [act.INIT]: () => { // 그리드 데이터 초기화

      let page = isObject(action.page) ? action.page : action.options.page.paging,
        {currentPage, pageSize} = page,
        // 전달받은 리스트 중에 출력할 리스트를 필터링
        list = action.receivedList.filter(function (item) {
          if (item) {
            if (item[action.options.columnKeys.deleted]) {
              return false;
            } else {
              return true;
            }
          }
          return false;
        }).slice(currentPage * pageSize, currentPage * pageSize + pageSize);

      return state
        .set('receivedList', List(action.receivedList))
        .set('list', List(list))
        .set('page', Map(page));

    },

    [act.SET_DATA]: () => {

      let page = isObject(action.page) ? action.page : action.options.page.paging,
        {currentPage, pageSize} = page,
        // 전달받은 리스트 중에 출력할 리스트를 필터링
        list = action.receivedList.filter(function (item) {
          if (item) {
            if (item[action.options.columnKeys.deleted]) {
              return false;
            } else {
              return true;
            }
          }
          return false;
        }).slice(currentPage * pageSize, currentPage * pageSize + pageSize);

      return state
        .set('receivedList', List(action.receivedList))
        .set('list', List(list))
        .set('page', Map(page))
    }
  };

  if (action.type in processor) {
    return processor[action.type]();
  } else {
    return state;
  }
};

export default grid;