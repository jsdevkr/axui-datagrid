"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var _makeData_1 = require("./_makeData");
function propsToState(props, state) {
    var dividedObj;
    // state 계산영역 시작
    state.headerTable = _makeData_1.makeHeaderTable(props.columns, state.options);
    state.bodyRowTable = _makeData_1.makeBodyRowTable(props.columns, state.options);
    state.bodyRowMap = _makeData_1.makeBodyRowMap(state.bodyRowTable, state.options);
    dividedObj = _makeData_1.divideTableByFrozenColumnIndex(state.headerTable, state.options.frozenColumnIndex, state.options);
    state.asideHeaderData = dividedObj.asideData;
    state.asideColGroup = dividedObj.asideColGroup; // asideColGroup은 header, bodyRow 에서 공통으로 사용 한번만 구하면 그만이지만 편의상 header에서 처리하기로 한다.
    state.leftHeaderData = dividedObj.leftData;
    state.headerData = dividedObj.rightData;
    state.styles.asidePanelWidth = dividedObj.asidePanelWidth;
    dividedObj = _makeData_1.divideTableByFrozenColumnIndex(state.bodyRowTable, state.options.frozenColumnIndex, state.options);
    state.asideBodyRowData = dividedObj.asideData;
    state.leftBodyRowData = dividedObj.leftData;
    state.bodyRowData = dividedObj.rightData;
    // 한줄의 높이 계산 (한줄이 여러줄로 구성되었다면 높이를 늘려야 하니까);
    state.styles.bodyTrHeight =
        state.bodyRowTable.rows.length * state.options.body.columnHeight;
    state.colGroupMap = {};
    state.headerTable.rows.forEach(function (row, r) {
        row.cols.forEach(function (col, c) {
            state.colGroupMap[col.colIndex] = lodash_1.assignWith({}, col);
        });
    });
    state.colGroup = [];
    lodash_1.each(state.colGroupMap, function (v, k) {
        state.colGroup.push(v);
    });
    state.leftHeaderColGroup = state.colGroup.slice(0, state.options.frozenColumnIndex);
    state.headerColGroup = state.colGroup.slice(state.options.frozenColumnIndex);
    // footSum
    state.footSumColumns = [];
    state.footSumTable = {};
    if (lodash_1.isArray(state.options.footSum)) {
        state.footSumColumns = state.options.footSum;
        state.footSumTable = _makeData_1.makeFootSumTable(state.footSumColumns, state.colGroup, state.options);
        dividedObj = _makeData_1.divideTableByFrozenColumnIndex(state.footSumTable, state.options.frozenColumnIndex, state.options);
        state.leftFootSumData = dividedObj.leftData;
        state.footSumData = dividedObj.rightData;
    }
    // grouping info
    if (state.options.body.grouping) {
        if ('by' in state.options.body.grouping &&
            'columns' in state.options.body.grouping) {
            state.bodyGrouping = {
                by: state.options.body.grouping.by,
                columns: state.options.body.grouping.columns,
            };
            state.bodyGroupingTable = _makeData_1.makeBodyGroupingTable(state.bodyGrouping.columns, state.colGroup, state.options);
            state.sortInfo = (function () {
                var sortInfo = {};
                for (var k = 0, kl = state.bodyGrouping.by.length; k < kl; k++) {
                    sortInfo[state.bodyGrouping.by[k]] = {
                        orderBy: 'asc',
                        seq: k,
                        fixed: true,
                    };
                    for (var c = 0, cl = state.colGroup.length; c < cl; c++) {
                        if (state.colGroup[c].key === state.bodyGrouping.by[k]) {
                            state.colGroup[c].sort = 'asc';
                            state.colGroup[c].sortFixed = true;
                        }
                    }
                }
                return sortInfo;
            })();
            dividedObj = _makeData_1.divideTableByFrozenColumnIndex(state.bodyGroupingTable, state.options.frozenColumnIndex, state.options);
            state.asideBodyGroupingData = dividedObj.asideData;
            state.leftBodyGroupingData = dividedObj.leftData;
            state.bodyGroupingData = dividedObj.rightData;
            state.bodyGroupingMap = _makeData_1.makeBodyRowMap(state.bodyGroupingTable, state.options);
        }
        else {
            state.options.body.grouping = false;
        }
    }
    return state;
}
exports.propsToState = propsToState;
/**
 * @method
 * @param data
 * @return {{receivedList: Array, page: {}}}
 */
function propsConverterForData(data) {
    var Obj_return = {
        receivedList: [],
        page: false,
    };
    if (lodash_1.isArray(data)) {
        Obj_return.receivedList = data;
    }
    else if (lodash_1.isObject(data)) {
        Obj_return.receivedList = data.list || [];
        Obj_return.page = data.page || {};
    }
    return Obj_return;
}
exports.propsConverterForData = propsConverterForData;
//# sourceMappingURL=_props.js.map