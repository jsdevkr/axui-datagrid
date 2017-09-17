export const INIT_DATA = 'INIT_DATA';

export function initData(list = [], page = {}) {
  return {
    type: INIT_DATA,
    list,
    page
  }
}