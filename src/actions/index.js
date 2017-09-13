export const INIT_DATA = 'INIT_DATA';

export function initData(list = [], receivedList = [], page = {}) {
  return {
    type: INIT_DATA,
    list,
    receivedList,
    page
  }
}