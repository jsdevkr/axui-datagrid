import * as act from '../actions';
import {List, Map} from 'immutable';
import {combineReducers} from 'redux';

// 초기 상태
const initialState = Map({
  receivedList: List([]),
  deletedList: List([]),
  list: List([]),
  page: Map({}),
  scrollLeft: 0,
  scrollTop: 0
});


// 리듀서 함수 정의
const data = (state = initialState, action) => {

  const processor = {
    [act.INIT_DATA]: () => { // 그리드 데이터 초기화

      state = state
        .set('receivedList', List(action.receivedList))
        .set('page', Map(action.page));

      console.log(state.toJS());

      return state;
    },
    [act.UPDATE_SCROLL]: () => {

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