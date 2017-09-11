import * as types from './ActionType';

export const initData = (list = []) => ({
  type: types.INIT_DATA,
  list
});