import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

// 액션타입
const CREATE = 'devpage/CREATE';
const REMOVE = 'counter/REMOVE';

// 액션 생성자
export const create = createAction(CREATE); // color
export const remove = createAction(REMOVE);

// 초기 상태를 정의
const initialState = Map({
  name: "",
  test: ""
});

export default handleActions({
  [CREATE]: (state, action) => {
    const name = state.get('name');
    return state.set('name', "이름생김");
  },
  [REMOVE]: (state, action) => {
    const name = state.get('name');
    return state.set('name', "");
  }
}, initialState);