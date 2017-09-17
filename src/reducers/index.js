import * as act from '../actions';
import {List, Map} from 'immutable';
import {combineReducers} from 'redux';

// 초기 상태
const initialState = Map({
  receivedList: List([]),
  deletedList: List([]),
  list: List([]),
  page: Map({})
});


// 리듀서 함수 정의
const data = (state = initialState, action) => {
  // 레퍼런스 생성
  // const receivedList = state.get('receivedList');
  const processor = {
    [act.INIT_DATA]: () => {
      // console.log("call init", receivedList, action);

      state.set('receivedList', List(action.list));
      state.set('page', Map(action.page));
      return state;
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