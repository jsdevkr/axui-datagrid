import * as act from '../actions';
import {List, Map} from 'immutable';
import {combineReducers} from 'redux';

// 초기 상태
const initialState = Map({
  receivedList: List([]),
  deletedList: List([]),
  list: List([]),
  page: Map({}),
  sortInfo: Map({}),
  scrollLeft: 0,
  scrollTop: 0,
  columns: List([]),
  colGroup: List([]),
  footSumColumns: List([]),
  bodyGrouping: List([]),
  focusedColumn: Map({}), // 그리드 바디의 포커스된 셀 정보
  selectedColumn: Map({}), // 그리드 바디의 선택된 셀 정보
  isInlineEditing: false,
  inlineEditing: Map({}),
  listIndexMap: Map({}), // tree데이터 사용시 데이터 인덱싱 맵
  headerTable: Map({}),
  leftHeaderData: Map({}),
  headerData: Map({}),
  rightHeaderData: Map({}),
  bodyRowTable: Map({}),
  leftBodyRowData: Map({}),
  bodyRowData: Map({}),
  rightBodyRowData: Map({}),
  bodyRowMap: Map({}),
  bodyGroupingTable: Map({}),
  leftBodyGroupingData: Map({}),
  bodyGroupingData: Map({}),
  rightBodyGroupingData: Map({}),
  bodyGroupingMap: Map({}),
  footSumTable: Map({}), // footSum의 출력레이아웃
  leftFootSumData: Map({}), // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 왼쪽
  footSumData: Map({}), // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 오른쪽
});

/*
this.xvar = {
  bodyTrHeight: 0, // 한줄의 높이
  scrollContentWidth: 0, // 스크롤 될 내용물의 너비 (스크롤 될 내용물 : panel['body-scroll'] 안에 컬럼이 있는)
  scrollContentHeight: 0, // 스크롤 된 내용물의 높이
  scrollTimer: null
};
*/

// 리듀서 함수 정의
const data = (state = initialState, action) => {

  const processor = {
    [act.INIT_DATA]: () => { // 그리드 데이터 초기화
      return state
        .set('receivedList', List(action.receivedList))
        .set('page', Map(action.page));
    },
    [act.UPDATE_SCROLL]: (state = initialState, action) => {
      return state
        .set('scrollLeft', action.scrollLeft)
        .set('scrollTop', action.scrollTop);
    }
  };

  if (action.type in processor) {
    return processor[action.type]();
  } else {
    return state
  }
};

export default combineReducers({
  data
});