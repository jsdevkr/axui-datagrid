import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

// 액션타입
const INIT_DATA = 'ax6ui-react-grid/INIT_DATA';

// 액션 생성자
export const initData = createAction(INIT_DATA);

// 초기 상태를 정의
const initialState = Map({
  receivedList: List([]),
  list: List([]),
  page: Map({})
});

export default handleActions({
  [INIT_DATA]: (state, action) => {
    const name = state.get('name');
    return state.set('name', "이름생김");
  }
}, initialState);