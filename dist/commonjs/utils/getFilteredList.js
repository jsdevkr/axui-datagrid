"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getFilteredList(data, _a) {
    var colGroup = _a.colGroup, filter = _a.filter, sorter = _a.sorter, options = _a.options;
    var _b = (options || {}).columnKeys, optionColumnKeys = _b === void 0 ? {} : _b;
    var filteredList = [];
    if (filter) {
        var colIndex_1 = filter.colIndex, info_1 = filter.info;
        var checkAll = info_1[colIndex_1] === false ? true : info_1[colIndex_1]._check_all_;
        if (checkAll) {
            filteredList =
                data &&
                    data.filter(function (n) {
                        return (typeof n === 'undefined' ||
                            !n[optionColumnKeys.deleted || '_deleted_']);
                    });
        }
        else {
            filteredList = data.filter(function (n) {
                if (n) {
                    var value = n && n[colGroup[colIndex_1].key || ''];
                    if (typeof n === 'undefined' ||
                        n[optionColumnKeys.deleted || '_deleted_']) {
                        return false;
                    }
                    if (typeof value === 'undefined') {
                        if (!info_1[colIndex_1]._UNDEFINED_) {
                            return false;
                        }
                    }
                    else {
                        if (!info_1[colIndex_1][value]) {
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            });
        }
    }
    else {
        filteredList = data.filter(function (n) {
            return (typeof n === 'undefined' || !n[optionColumnKeys.deleted || '_deleted_']);
        });
    }
    // 정렬 오브젝트가 있다면 정렬 프로세스 적용하여 새로운 데이터 정렬
    if (sorter && Object.keys(sorter).length) {
        var sortInfoArray_1 = [];
        for (var k in sorter) {
            if (sorter[k]) {
                sortInfoArray_1[sorter[k].seq] = {
                    key: k,
                    order: sorter[k].orderBy,
                };
            }
        }
        sortInfoArray_1 = sortInfoArray_1.filter(function (o) { return typeof o !== 'undefined'; });
        var i_1 = 0, l_1 = sortInfoArray_1.length, aValue_1, bValue_1;
        var getValueByKey_1 = function (_item, _key) {
            return _item[_key] || '';
        };
        filteredList = filteredList.sort(function (a, b) {
            for (i_1 = 0; i_1 < l_1; i_1++) {
                aValue_1 = getValueByKey_1(a, sortInfoArray_1[i_1].key);
                bValue_1 = getValueByKey_1(b, sortInfoArray_1[i_1].key);
                if (typeof aValue_1 !== typeof bValue_1) {
                    aValue_1 = '' + aValue_1;
                    bValue_1 = '' + bValue_1;
                }
                if (aValue_1 < bValue_1) {
                    return sortInfoArray_1[i_1].order === 'asc' ? -1 : 1;
                }
                else if (aValue_1 > bValue_1) {
                    return sortInfoArray_1[i_1].order === 'asc' ? 1 : -1;
                }
            }
        });
    }
    return filteredList;
}
exports.default = getFilteredList;
