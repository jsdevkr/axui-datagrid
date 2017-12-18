import * as TYPES from '../_inc/actionTypes';
import { List, Record, Map } from 'immutable';
import { isObject } from 'lodash';

export interface State {
  receivedList: any;
  deletedList: any;
  list: any;
  page: object;
  sortInfo: object;
  filterInfo: any;
}

const stateRecord = Record({
  receivedList: List([]),
  deletedList: List([]),
  list: List([]),
  page: {},
  sortInfo: {},
  filterInfo: Map({})
});

// 초기 상태
const initialState = new stateRecord();

// 리듀서 함수 정의
export const gridReducer = (state = initialState, action) => {
  const processor = {
    [TYPES.INIT]: () => { // 그리드 데이터 초기화

      let list; // 그리드에 표현할 목록

      // todo : colGroup으로 sortInfo 생성

      // 전달받은 리스트 중에 출력할 리스트를 필터링
      list = action.receivedList.filter(item => (item ? !item[ action.options.columnKeys.deleted ] : false));

      return state
        .set('receivedList', List(action.receivedList))
        .set('list', List(list))
        .set('page', isObject(action.page) ? (action.page) : false);
    },

    [TYPES.SET_DATA]: () => {
      // 전달받은 리스트 중에 출력할 리스트를 필터링
      let list = action.receivedList.filter(item => (item ? !item[ action.options.columnKeys.deleted ] : false));

      return state
        .set('receivedList', List(action.receivedList))
        .set('list', List(list))
        .set('page', isObject(action.page) ? (action.page) : false)
    },

    [TYPES.SORT]: () => {
      let sortInfo = {}, seq: number = 0, sortOrder;
      let sortInfoArray = [];
      let colGroup = action.colGroup;
      const sortInfoState = state.get('sortInfo');
      const getValueByKey = function (_item, _key) {
        return _item[ _key ] || '';
      };

      for (let k in sortInfoState) {
        sortInfo[ k ] = sortInfoState[ k ];
        seq++;
      }

      if (sortInfo[ colGroup[ action.colIndex ].key ]) {
        if (sortInfo[ colGroup[ action.colIndex ].key ].orderBy === 'desc') {
          sortInfo[ colGroup[ action.colIndex ].key ].orderBy = 'asc';
        } else if (sortInfo[ colGroup[ action.colIndex ].key ].orderBy === 'asc') {
          delete sortInfo[ colGroup[ action.colIndex ].key ];
        }
      } else {
        sortInfo[ colGroup[ action.colIndex ].key ] = {
          seq: seq++,
          orderBy: 'desc'
        };
      }

      for (let k in sortInfo) {
        sortInfoArray[ sortInfo[ k ].seq ] = {key: k, order: sortInfo[ k ].orderBy};
      }
      sortInfoArray = sortInfoArray.filter(o => typeof o !== 'undefined');

      let i = 0, l = sortInfoArray.length, _a_val, _b_val;
      let sorted = state.get('receivedList').sort(
        (a, b) => {
          for (i = 0; i < l; i++) {
            _a_val = getValueByKey(a, sortInfoArray[ i ].key);
            _b_val = getValueByKey(b, sortInfoArray[ i ].key);

            if (typeof _a_val !== typeof _b_val) {
              _a_val = '' + _a_val;
              _b_val = '' + _b_val;
            }
            if (_a_val < _b_val) {
              return (sortInfoArray[ i ].order === 'asc') ? -1 : 1;
            } else if (_a_val > _b_val) {
              return (sortInfoArray[ i ].order === 'asc') ? 1 : -1;
            }
          }
        }
      ).filter(item => (item ? !item[ action.options.columnKeys.deleted ] : false));

      return state
        .set('sortInfo', sortInfo)
        .set('list', sorted);
    },

    [TYPES.FILTER]: () => {
      let filterOptions = List(action.data.filterOptions);
      let filterInfo = state.get('filterInfo').toJS();

      if (action.data.isCheckAll) {
        if (action.data.checked) {
          filterInfo[ action.colIndex ] = false;
        } else {
          let filter = {};
          filterOptions.forEach(O => {
            filter[ O[ 'value' ] ] = false;
          });
          filterInfo[ action.colIndex ] = filter;
        }
      }
      else {

        let filter = {};
        let isAllChecked = true;


        if (action.colIndex in filterInfo) {
          filterOptions.forEach(O => {
            if (O[ 'value' ] !== '__check_all__') {
              if (O[ 'value' ] === action.data.value) {
                filter[ O[ 'value' ] ] = action.data.checked;
              } else {
                filter[ O[ 'value' ] ] = filterInfo[ action.colIndex ][ O[ 'value' ] ]
              }
              if(!filter[ O[ 'value' ] ]) isAllChecked = false;
            }
          });
        }
        else {
          filterOptions.forEach(O => {
            if (O[ 'value' ] !== '__check_all__') {
              if (O[ 'value' ] === action.data.value) {
                filter[ O[ 'value' ] ] = action.data.checked;
              } else {
                filter[ O[ 'value' ] ] = true;
              }
              if(!filter[ O[ 'value' ] ]) isAllChecked = false;
            }
          });
        }

        filter[ '__check_all__' ] = isAllChecked;

        filterInfo[ action.colIndex ] = filter;
      }

      return state
        .set('filterInfo', Map(filterInfo));
    }
  };

  if (action.type in processor) {
    return processor[ action.type ]();
  } else {
    return state;
  }
};