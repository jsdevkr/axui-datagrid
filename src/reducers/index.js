import * as types from '../actions/ActionType';
import {List, Map} from 'immutable';
import { combineReducers } from 'redux';

// 초기 상태
const initialState = Map({
  receivedList: List([]),
  list: List([]),
  page: Map({})
});


// 리듀서 함수 정의
function data(state = initialState, action) {
  // 레퍼런스 생성
  const counters = state.get('counters');
  const processor = {
    [types.INIT_DATA]: () => {

    }
  };

  if(action.type in processor){
    return processor[action.type]();
  }else{
    return state
  }
}

export default combineReducers({
  data
});