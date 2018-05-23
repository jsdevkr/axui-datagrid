"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TYPES = require("./actionTypes");
var immutable_1 = require("immutable");
var lodash_1 = require("lodash");
var stateRecord = immutable_1.Record({
    receivedList: immutable_1.List([]),
    deletedList: immutable_1.List([]),
    list: immutable_1.List([]),
    page: {},
    sortInfo: {},
    filterInfo: immutable_1.Map({}),
});
// 초기 상태
var initialState = new stateRecord();
// 리듀서 함수 정의
exports.gridReducer = function (state, action) {
    if (state === void 0) {
        state = initialState;
    }
    var processor = (_a = {},
        _a[TYPES.INIT] = function () {
            // 그리드 데이터 초기화
            var list; // 그리드에 표현할 목록
            // 전달받은 리스트 중에 출력할 리스트를 필터링
            list = action.receivedList.filter(function (item) { return (item ? !item[action.options.columnKeys.deleted] : false); });
            return state
                .set('receivedList', immutable_1.List(action.receivedList))
                .set('deletedList', immutable_1.List([]))
                .set('list', immutable_1.List(list))
                .set('page', lodash_1.isObject(action.page) ? action.page : false)
                .set('sortInfo', {})
                .set('filterInfo', immutable_1.Map({}));
        },
        _a[TYPES.SET_DATA] = function () {
            // 전달받은 리스트 중에 출력할 리스트를 필터링
            var list = action.receivedList.filter(function (item) { return (item ? !item[action.options.columnKeys.deleted] : false); });
            return state
                .set('receivedList', immutable_1.List(action.receivedList))
                .set('list', immutable_1.List(list))
                .set('page', lodash_1.isObject(action.page) ? action.page : false);
        },
        _a[TYPES.SORT] = function () {
            var sortInfo = {}, seq = 0;
            var sortInfoArray = [];
            var colGroup = action.colGroup;
            var sortInfoState = state.get('sortInfo');
            var getValueByKey = function (_item, _key) {
                return _item[_key] || '';
            };
            for (var k in sortInfoState) {
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
            for (var k in sortInfo) {
                sortInfoArray[sortInfo[k].seq] = { key: k, order: sortInfo[k].orderBy };
            }
            sortInfoArray = sortInfoArray.filter(function (o) { return typeof o !== 'undefined'; });
            var i = 0, l = sortInfoArray.length, _a_val, _b_val;
            var sorted = state.get('list').sort(function (a, b) {
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
        _a[TYPES.FILTER] = function () {
            var checkAll = action.filterInfo[action.colIndex] === false
                ? true
                : action.filterInfo[action.colIndex]['__check_all__'];
            var list;
            if (checkAll) {
                list = state
                    .get('receivedList')
                    .filter(function (item) { return (item ? !item[action.options.columnKeys.deleted] : false); });
            }
            else {
                list = state.get('receivedList').filter(function (item) {
                    if (item) {
                        if (item[action.options.columnKeys.deleted])
                            return false;
                        var value = item[action.colGroup[action.colIndex].key];
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
        _a[TYPES.UPDATE] = function () {
            var list = state.get('list');
            list.update(action.row, function (item) {
                item[action.colGroup[action.col].key] = action.value;
                return item;
            });
            return state.set('list', immutable_1.List(list));
        },
        _a);
    if (action.type in processor) {
        return processor[action.type]();
    }
    else {
        return state;
    }
    var _a;
};
//# sourceMappingURL=reducer.js.map