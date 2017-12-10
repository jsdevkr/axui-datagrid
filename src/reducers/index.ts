import * as act from '../actions';
import { List, Map, Record } from 'immutable';
import { isObject } from 'lodash';

export interface State {
  receivedList: any;
  deletedList: any;
  list: any;
  page: object;
  sortInfo: object;
}

// 초기 상태
const stateRecord = Record({
  receivedList: List([]),
  deletedList: List([]),
  list: List([]),
  page: {},
  sortInfo: Map({})
});

const initialState = new stateRecord();

// 리듀서 함수 정의
export const gridReducer = (state = initialState, action) => {
  const processor = {
    [act.INIT]: () => { // 그리드 데이터 초기화

      let list; // 그리드에 표현할 목록

      // 전달받은 리스트 중에 출력할 리스트를 필터링
      list = action.receivedList.filter(function (item) {
        if (item) {
          if (item[ action.options.columnKeys.deleted ]) {
            return false;
          } else {
            return true;
          }
        }
        return false;
      });

      return state
        .set('receivedList', List(action.receivedList))
        .set('list', List(list))
        .set('page', isObject(action.page) ? (action.page) : false);
    },

    [act.SET_DATA]: () => {
      // 전달받은 리스트 중에 출력할 리스트를 필터링
      let list = action.receivedList.filter(function (item) {
        if (item) {
          if (item[ action.options.columnKeys.deleted ]) {
            return false;
          } else {
            return true;
          }
        }
        return false;
      });

      return state
        .set('receivedList', List(action.receivedList))
        .set('list', List(list))
        .set('page', isObject(action.page) ? (action.page) : false)
    },

    [act.SORT]: () => {
      let sortInfo = {}, seq: number = 0, sortOrder;
      let colGroup = List(action.colGroup);

      state.get('sortInfo').forEach((col, ci) => {
        sortInfo[ ci ] = col;
        seq++;
      });

      colGroup.forEach((col, ci) => {
        console.log(col);
        if (col['colIndex'] === action.colIndex) {
          if (typeof col['sort'] === 'undefined') {
            sortOrder = 'desc';
          }
          else if (col['sort'] === 'desc') {
            sortOrder = 'asc';
          } else {
            sortOrder = undefined;
          }
        }
        col['sort'] = sortOrder;
      });
      
      
      

      for (var i = 0, l = action.colGroup.length; i < l; i++) {

        if (typeof this.colGroup[ i ].sort !== "undefined") {
          if (!sortInfo[ this.colGroup[ i ].key ]) {
            sortInfo[ this.colGroup[ i ].key ] = {
              seq: seq++,
              orderBy: this.colGroup[ i ].sort
            };
          }
        }
      }


      let sorted = state.get('list').sort(
        (a, b) => {
          if (a[ 'title' ] < b[ 'title' ]) {
            return -1;
          }
          if (a[ 'title' ] > b[ 'title' ]) {
            return 1;
          }
          if (a[ 'title' ] === b[ 'title' ]) {
            return 0;
          }
        }
      );

      return state
        .set('list', sorted);
    }
  };

  if (action.type in processor) {
    return processor[ action.type ]();
  } else {
    return state;
  }
};