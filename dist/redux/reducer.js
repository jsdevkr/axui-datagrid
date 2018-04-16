"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const TYPES = __importStar(require("./actionTypes"));
const immutable_1 = require("immutable");
const lodash_1 = require("lodash");
const stateRecord = immutable_1.Record({
    receivedList: immutable_1.List([]),
    deletedList: immutable_1.List([]),
    list: immutable_1.List([]),
    page: {},
    sortInfo: {},
    filterInfo: immutable_1.Map({}),
});
// 초기 상태
const initialState = new stateRecord();
// 리듀서 함수 정의
exports.gridReducer = (state = initialState, action) => {
    const processor = {
        [TYPES.INIT]: () => {
            // 그리드 데이터 초기화
            let list; // 그리드에 표현할 목록
            // 전달받은 리스트 중에 출력할 리스트를 필터링
            list = action.receivedList.filter(item => (item ? !item[action.options.columnKeys.deleted] : false));
            return state
                .set('receivedList', immutable_1.List(action.receivedList))
                .set('deletedList', immutable_1.List([]))
                .set('list', immutable_1.List(list))
                .set('page', lodash_1.isObject(action.page) ? action.page : false)
                .set('sortInfo', {})
                .set('filterInfo', immutable_1.Map({}));
        },
        [TYPES.SET_DATA]: () => {
            // 전달받은 리스트 중에 출력할 리스트를 필터링
            let list = action.receivedList.filter(item => (item ? !item[action.options.columnKeys.deleted] : false));
            return state
                .set('receivedList', immutable_1.List(action.receivedList))
                .set('list', immutable_1.List(list))
                .set('page', lodash_1.isObject(action.page) ? action.page : false);
        },
        [TYPES.SORT]: () => {
            let sortInfo = {}, seq = 0;
            let sortInfoArray = [];
            let colGroup = action.colGroup;
            const sortInfoState = state.get('sortInfo');
            const getValueByKey = function (_item, _key) {
                return _item[_key] || '';
            };
            for (let k in sortInfoState) {
                sortInfo[k] = sortInfoState[k];
                seq++;
            }
            if (sortInfo[colGroup[action.colIndex].key]) {
                if (sortInfo[colGroup[action.colIndex].key].orderBy === 'desc') {
                    sortInfo[colGroup[action.colIndex].key].orderBy = 'asc';
                }
                else if (sortInfo[colGroup[action.colIndex].key].orderBy === 'asc') {
                    delete sortInfo[colGroup[action.colIndex].key];
                }
            }
            else {
                sortInfo[colGroup[action.colIndex].key] = {
                    seq: seq++,
                    orderBy: 'desc',
                };
            }
            for (let k in sortInfo) {
                sortInfoArray[sortInfo[k].seq] = { key: k, order: sortInfo[k].orderBy };
            }
            sortInfoArray = sortInfoArray.filter(o => typeof o !== 'undefined');
            let i = 0, l = sortInfoArray.length, _a_val, _b_val;
            let sorted = state.get('list').sort((a, b) => {
                for (i = 0; i < l; i++) {
                    _a_val = getValueByKey(a, sortInfoArray[i].key);
                    _b_val = getValueByKey(b, sortInfoArray[i].key);
                    if (typeof _a_val !== typeof _b_val) {
                        _a_val = '' + _a_val;
                        _b_val = '' + _b_val;
                    }
                    if (_a_val < _b_val) {
                        return sortInfoArray[i].order === 'asc' ? -1 : 1;
                    }
                    else if (_a_val > _b_val) {
                        return sortInfoArray[i].order === 'asc' ? 1 : -1;
                    }
                }
            });
            return state.set('sortInfo', sortInfo).set('list', sorted);
        },
        [TYPES.FILTER]: () => {
            const checkAll = action.filterInfo[action.colIndex] === false
                ? true
                : action.filterInfo[action.colIndex]['__check_all__'];
            let list;
            if (checkAll) {
                list = state
                    .get('receivedList')
                    .filter(item => (item ? !item[action.options.columnKeys.deleted] : false));
            }
            else {
                list = state.get('receivedList').filter(item => {
                    if (item) {
                        if (item[action.options.columnKeys.deleted])
                            return false;
                        let value = item[action.colGroup[action.colIndex].key];
                        if (typeof value === 'undefined') {
                            if (!action.filterInfo[action.colIndex]['__UNDEFINED__']) {
                                return false;
                            }
                        }
                        else {
                            if (!action.filterInfo[action.colIndex][value]) {
                                return false;
                            }
                        }
                        return true;
                    }
                    return false;
                });
            }
            return state
                .set('list', immutable_1.List(list))
                .set('filterInfo', immutable_1.Map(action.filterInfo));
        },
        [TYPES.UPDATE]: () => {
            let list = state.get('list');
            list.update(action.row, item => {
                item[action.colGroup[action.col].key] = action.value;
                return item;
            });
            return state.set('list', immutable_1.List(list));
        },
    };
    if (action.type in processor) {
        return processor[action.type]();
    }
    else {
        return state;
    }
};
