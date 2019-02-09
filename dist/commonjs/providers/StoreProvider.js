"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../utils");
var formatter_1 = require("../functions/formatter");
var collector_1 = require("../functions/collector");
var _enums_1 = require("../common/@enums");
var store = {
    // 데이터 그리드 내부에서 사용하는 상태의 기본형.
    sortInfo: {},
    isColumnFilter: false,
    scrollLeft: 0,
    scrollTop: 0,
    selectionRows: {},
    selectionCols: {},
    focusedRow: -1,
    focusedCol: -1,
    selectionStartOffset: {},
    selectionEndOffset: {},
    selectionMinOffset: {},
    selectionMaxOffset: {},
    selectionSRow: -1,
    selectionSCol: -1,
    selectionERow: -1,
    selectionECol: -1,
    columnResizing: false,
    columnResizerLeft: 0,
    loading: false,
    loadingData: false,
    width: 0,
    height: 0,
    data: [],
    filteredList: [],
    listSelectedAll: false,
    colGroup: [],
    asideColGroup: [],
    leftHeaderColGroup: [],
    headerColGroup: [],
    asideHeaderData: { rows: [{ cols: [] }] },
    leftHeaderData: { rows: [{ cols: [] }] },
    headerData: { rows: [{ cols: [] }] },
    asideBodyRowData: { rows: [{ cols: [] }] },
    leftBodyRowData: { rows: [{ cols: [] }] },
    bodyRowData: { rows: [{ cols: [] }] },
    asideBodyGroupingData: { rows: [{ cols: [] }] },
    leftBodyGroupingData: { rows: [{ cols: [] }] },
    bodyGroupingData: { rows: [{ cols: [] }] },
    colGroupMap: {},
    bodyRowMap: {},
    bodyGroupingMap: {},
    options: {},
    status: '',
    styles: undefined,
    predefinedFormatter: {},
    predefinedCollector: {},
    setStoreState: function () { },
    dispatch: function () { },
};
var _a = React.createContext(store), Provider = _a.Provider, Consumer = _a.Consumer;
var StoreProvider = /** @class */ (function (_super) {
    __extends(StoreProvider, _super);
    function StoreProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = store;
        // state 가 업데이트 되기 전.
        _this.setStoreState = function (newState) {
            var _a = _this.state, _b = _a.filteredList, filteredList = _b === void 0 ? [] : _b, _c = _a.scrollLeft, scrollLeft = _c === void 0 ? 0 : _c, _d = _a.scrollTop, scrollTop = _d === void 0 ? 0 : _d, _e = _a.options, options = _e === void 0 ? {} : _e, _f = _a.styles, styles = _f === void 0 ? {} : _f, _g = _a.headerColGroup, headerColGroup = _g === void 0 ? [] : _g, _h = _a.bodyRowData, bodyRowData = _h === void 0 ? { rows: [{ cols: [] }] } : _h, _j = _a.footSumData, footSumData = _j === void 0 ? { rows: [{ cols: [] }] } : _j, onScrollEnd = _a.onScrollEnd;
            var _scrollLeft = newState.scrollLeft, _scrollTop = newState.scrollTop, _filteredList = newState.filteredList;
            if (!newState.styles) {
                newState.styles = __assign({}, styles);
            }
            if (typeof _scrollLeft !== 'undefined' ||
                typeof _scrollTop !== 'undefined') {
                var _k = newState.styles, _l = _k.scrollContentWidth, scrollWidth = _l === void 0 ? 0 : _l, _m = _k.scrollContentHeight, scrollHeight = _m === void 0 ? 0 : _m, _o = _k.scrollContentContainerWidth, clientWidth = _o === void 0 ? 0 : _o, _p = _k.scrollContentContainerHeight, clientHeight = _p === void 0 ? 0 : _p;
                var endOfScrollTop = false;
                var endOfScrollLeft = false;
                if (typeof _scrollLeft !== 'undefined') {
                    if (scrollLeft !== _scrollLeft) {
                        var visibleData = utils_1.getVisibleColGroup(headerColGroup, {
                            scrollLeft: _scrollLeft,
                            bodyRowData: bodyRowData,
                            footSumData: footSumData,
                            styles: newState.styles,
                            options: options,
                        });
                        newState.visibleHeaderColGroup = visibleData.visibleHeaderColGroup;
                        newState.visibleBodyRowData = visibleData.visibleBodyRowData;
                        newState.visibleFootSumData = visibleData.visibleFootSumData;
                        newState.printStartColIndex = visibleData.printStartColIndex;
                        newState.printEndColIndex = visibleData.printEndColIndex;
                    }
                    if (_scrollLeft !== scrollLeft &&
                        clientWidth >= scrollWidth + _scrollLeft) {
                        endOfScrollLeft = true;
                    }
                }
                if (typeof _scrollTop !== 'undefined' && _scrollTop !== scrollTop) {
                    if (clientHeight >= scrollHeight + _scrollTop) {
                        endOfScrollTop = true;
                    }
                }
                if ((endOfScrollTop || endOfScrollLeft) && onScrollEnd) {
                    onScrollEnd({
                        endOfScrollTop: endOfScrollTop,
                        endOfScrollLeft: endOfScrollLeft,
                    });
                }
            }
            if (_filteredList && filteredList.length !== _filteredList.length) {
                var dimensions = utils_1.calculateDimensions(newState, {
                    headerTable: newState.headerTable || _this.state.headerTable,
                    colGroup: newState.colGroup || _this.state.colGroup,
                    headerColGroup: newState.headerColGroup || _this.state.headerColGroup,
                    bodyRowTable: newState.bodyRowTable || _this.state.bodyRowTable,
                    footSumColumns: newState.footSumColumns || _this.state.footSumColumns,
                    filteredList: _filteredList,
                    options: newState.options || _this.state.options,
                });
                newState.styles = dimensions.styles;
                newState.scrollLeft = dimensions.scrollLeft;
                newState.scrollTop = dimensions.scrollTop;
            }
            _this.setState(newState);
        };
        _this.dispatch = function (dispatchType, param) {
            var _a;
            var _b = _this.state, _c = _b.data, data = _c === void 0 ? [] : _c, _d = _b.listSelectedAll, listSelectedAll = _d === void 0 ? false : _d, _e = _b.scrollLeft, scrollLeft = _e === void 0 ? 0 : _e, _f = _b.colGroup, colGroup = _f === void 0 ? [] : _f, rootNode = _b.rootNode, _g = _b.focusedRow, focusedRow = _g === void 0 ? 0 : _g, _h = _b.sortInfo, sortInfo = _h === void 0 ? {} : _h, _j = _b.options, options = _j === void 0 ? {} : _j, rowSelector = _b.rowSelector, selectionSRow = _b.selectionSRow, selectionSCol = _b.selectionSCol, selectionERow = _b.selectionERow, selectionECol = _b.selectionECol, selectionRows = _b.selectionRows, selectionCols = _b.selectionCols, selection = _b.selection;
            var onChangeSelected = rowSelector && rowSelector.onChange;
            var _k = options.columnKeys, optionColumnKeys = _k === void 0 ? {} : _k;
            var _l = _this.state.filteredList, filteredList = _l === void 0 ? [] : _l;
            var proc = (_a = {},
                _a[_enums_1.DataGridEnums.DispatchTypes.FILTER] = function () {
                    var colIndex = param.colIndex, filterInfo = param.filterInfo;
                    var checkAll = filterInfo[colIndex] === false
                        ? true
                        : filterInfo[colIndex]._check_all_;
                    if (checkAll) {
                        filteredList =
                            data &&
                                data.filter(function (n) {
                                    return !n[optionColumnKeys.deleted || '_deleted_'];
                                });
                    }
                    else {
                        filteredList = data.filter(function (n) {
                            if (n) {
                                var value = n[colGroup[colIndex].key || ''];
                                if (n[optionColumnKeys.deleted || '_deleted_']) {
                                    return false;
                                }
                                if (typeof value === 'undefined') {
                                    if (!filterInfo[colIndex]._UNDEFINED_) {
                                        return false;
                                    }
                                }
                                else {
                                    if (!filterInfo[colIndex][value]) {
                                        return false;
                                    }
                                }
                                return true;
                            }
                            return false;
                        });
                    }
                    _this.setStoreState({
                        filteredList: filteredList,
                        filterInfo: filterInfo,
                        scrollTop: 0,
                    });
                    if (onChangeSelected) {
                        onChangeSelected({
                            filteredList: filteredList,
                        });
                    }
                },
                _a[_enums_1.DataGridEnums.DispatchTypes.SORT] = function () {
                    var colIndex = param.colIndex;
                    if (typeof colIndex !== 'undefined') {
                        var _a = colGroup[colIndex].key, colKey = _a === void 0 ? '' : _a;
                        var currentSortInfo = {};
                        var seq = 0;
                        var sortInfoArray_1 = [];
                        var getValueByKey_1 = function (_item, _key) {
                            return _item[_key] || '';
                        };
                        for (var k in sortInfo) {
                            if (sortInfo[k]) {
                                currentSortInfo[k] = sortInfo[k];
                                seq++;
                            }
                        }
                        if (currentSortInfo[colKey]) {
                            if (currentSortInfo[colKey].orderBy === 'desc') {
                                currentSortInfo[colKey].orderBy = 'asc';
                            }
                            else if (currentSortInfo[colKey].orderBy === 'asc') {
                                delete currentSortInfo[colKey];
                            }
                        }
                        else {
                            currentSortInfo[colKey] = {
                                seq: seq++,
                                orderBy: 'desc',
                            };
                        }
                        for (var k in currentSortInfo) {
                            if (currentSortInfo[k]) {
                                sortInfoArray_1[currentSortInfo[k].seq] = {
                                    key: k,
                                    order: currentSortInfo[k].orderBy,
                                };
                            }
                        }
                        sortInfoArray_1 = sortInfoArray_1.filter(function (o) { return typeof o !== 'undefined'; });
                        var i_1 = 0, l_1 = sortInfoArray_1.length, aValue_1, bValue_1;
                        var sortedList = filteredList.sort(function (a, b) {
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
                        _this.setStoreState({
                            sortInfo: __assign({}, currentSortInfo),
                            filteredList: sortedList,
                            isInlineEditing: false,
                            inlineEditingCell: {},
                        });
                        if (onChangeSelected) {
                            onChangeSelected({
                                filteredList: filteredList,
                            });
                        }
                    }
                },
                _a[_enums_1.DataGridEnums.DispatchTypes.UPDATE] = function () {
                    var _a;
                    var row = param.row, colIndex = param.colIndex, value = param.value, eventWhichKey = param.eventWhichKey;
                    var key = colGroup[colIndex].key;
                    var focusRow = focusedRow;
                    if (key) {
                        filteredList[row][key] = value;
                        // update filteredList
                    }
                    if (eventWhichKey) {
                        switch (eventWhichKey) {
                            case _enums_1.DataGridEnums.KeyCodes.UP_ARROW:
                                focusRow = focusedRow < 1 ? 0 : focusedRow - 1;
                                break;
                            case _enums_1.DataGridEnums.KeyCodes.DOWN_ARROW:
                                focusRow =
                                    focusedRow + 1 >= filteredList.length
                                        ? filteredList.length - 1
                                        : focusedRow + 1;
                                break;
                            default:
                                break;
                        }
                    }
                    _this.setStoreState({
                        filteredList: __spread(filteredList),
                        isInlineEditing: false,
                        inlineEditingCell: {},
                        selectionRows: (_a = {},
                            _a[focusRow] = true,
                            _a),
                        focusedRow: focusRow,
                    });
                    if (onChangeSelected) {
                        onChangeSelected({
                            filteredList: filteredList,
                        });
                    }
                    if (rootNode && rootNode.current) {
                        rootNode.current.focus();
                    }
                },
                _a[_enums_1.DataGridEnums.DispatchTypes.RESIZE_COL] = function () {
                    var col = param.col, newWidth = param.newWidth;
                    var _a = _this.state, _b = _a.styles, styles = _b === void 0 ? {} : _b, _c = _a.options, options = _c === void 0 ? {} : _c;
                    var _colGroup = __spread((_this.state.colGroup || []));
                    _colGroup[col.colIndex]._width = _colGroup[col.colIndex].width = newWidth;
                    _this.setStoreState({
                        colGroup: _colGroup,
                        columnResizing: false,
                    });
                },
                _a[_enums_1.DataGridEnums.DispatchTypes.SELECT] = function () {
                    var rowIndex = param.rowIndex, checked = param.checked;
                    var rowSelected = false;
                    var selectedAll = listSelectedAll;
                    if (checked === true) {
                        rowSelected = true;
                    }
                    else if (checked === false) {
                        rowSelected = false;
                    }
                    else {
                        rowSelected = !filteredList[rowIndex]._selected_;
                    }
                    if (!rowSelected) {
                        selectedAll = false;
                    }
                    filteredList[rowIndex]._selected_ = rowSelected;
                    _this.setStoreState({
                        listSelectedAll: selectedAll,
                        selectedRowIndex: rowIndex,
                        selectedRowIndexSelected: rowSelected,
                        filteredList: __spread(filteredList),
                    });
                    if (onChangeSelected) {
                        onChangeSelected({
                            filteredList: filteredList,
                        });
                    }
                },
                _a[_enums_1.DataGridEnums.DispatchTypes.SELECT_ALL] = function () {
                    var checked = param.checked;
                    var selectedAll = listSelectedAll;
                    if (checked === true) {
                        selectedAll = true;
                    }
                    else if (checked === false) {
                        selectedAll = false;
                    }
                    else {
                        selectedAll = !selectedAll;
                    }
                    for (var i = 0, l = filteredList.length; i < l; i++) {
                        filteredList[i]._selected_ = selectedAll;
                    }
                    _this.setStoreState({
                        listSelectedAll: selectedAll,
                        filteredList: __spread(filteredList),
                    });
                    if (onChangeSelected) {
                        onChangeSelected({
                            filteredList: filteredList,
                        });
                    }
                },
                _a[_enums_1.DataGridEnums.DispatchTypes.CHANGE_SELECTION] = function () {
                    var sRow = param.sRow, sCol = param.sCol, eRow = param.eRow, eCol = param.eCol;
                    if (selectionSRow !== sRow ||
                        selectionSCol !== sCol ||
                        selectionERow !== eRow ||
                        selectionECol !== eCol) {
                        // console.log(sRow, sCol, eRow, eCol);
                        if (selection &&
                            selection.onChange &&
                            selectionRows &&
                            selectionCols) {
                            selection.onChange({
                                rows: Object.keys(selectionRows).map(function (n) { return Number(n); }),
                                cols: Object.keys(selectionCols).map(function (n) { return Number(n); }),
                            });
                        }
                        _this.setStoreState({
                            selectionSRow: sRow,
                            selectionSCol: sCol,
                            selectionERow: eRow,
                            selectionECol: eCol,
                        });
                    }
                },
                _a);
            proc[dispatchType]();
        };
        return _this;
    }
    StoreProvider.getDerivedStateFromProps = function (nProps, nState) {
        // console.log('getDerivedStateFromProps ~~');
        if (nProps.loading === nState.loading &&
            nProps.loadingData === nState.loadingData &&
            nProps.data === nState.data &&
            nProps.selection === nState.selection &&
            nProps.rowSelector === nState.rowSelector &&
            nProps.width === nState.width &&
            nProps.height === nState.height &&
            nProps.scrollLeft === nState.scrollLeft &&
            nProps.scrollTop === nState.scrollTop &&
            nProps.columnHeight === nState.columnHeight &&
            nProps.options === nState.options &&
            nProps.status === nState.status &&
            //
            nProps.headerColGroup === nState.headerColGroup &&
            nProps.headerTable === nState.headerTable &&
            nProps.headerData === nState.headerData &&
            nProps.asideHeaderData === nState.asideHeaderData &&
            nProps.leftHeaderData === nState.leftHeaderData &&
            //
            nProps.bodyRowTable === nState.bodyRowTable &&
            nProps.bodyRowData === nState.bodyRowData &&
            nProps.bodyRowMap === nState.bodyRowMap &&
            //
            nProps.asideBodyRowData === nState.asideBodyRowData &&
            nProps.leftBodyRowData === nState.leftBodyRowData &&
            //
            nProps.colGroup === nState.colGroup &&
            nProps.colGroupMap === nState.colGroupMap &&
            nProps.asideColGroup === nState.asideColGroup &&
            nProps.leftHeaderColGroup === nState.leftHeaderColGroup &&
            //
            nProps.rootNode === nState.rootNode &&
            nProps.clipBoardNode === nState.clipBoardNode &&
            //
            nProps.rootObject === nState.rootObject &&
            nProps.onBeforeEvent === nState.onBeforeEvent &&
            nProps.onAfterEvent === nState.onAfterEvent &&
            nProps.onScrollEnd === nState.onScrollEnd &&
            nProps.onRightClick === nState.onRightClick) {
            return null;
        }
        else {
            // console.log(`run StoreProvider`);
            // store state | 현재 state복제
            var _a = nProps.options, options = _a === void 0 ? {} : _a;
            var _b = options.frozenColumnIndex, frozenColumnIndex = _b === void 0 ? 0 : _b, optionsBody = options.body; // 옵션은 외부에서 받은 값을 사용하고 state에서 값을 수정하면 안됨.
            var storeState = __assign({}, nState);
            storeState.loading = nProps.loading;
            storeState.loadingData = nProps.loadingData;
            storeState.data = nProps.data;
            storeState.width = nProps.width;
            storeState.height = nProps.height;
            storeState.selection = nProps.selection;
            storeState.rowSelector = nProps.rowSelector;
            storeState.options = nProps.options;
            storeState.status = nProps.status;
            storeState.rootNode = nProps.rootNode;
            storeState.clipBoardNode = nProps.clipBoardNode;
            storeState.rootObject = nProps.rootObject;
            storeState.onBeforeEvent = nProps.onBeforeEvent;
            storeState.onAfterEvent = nProps.onAfterEvent;
            storeState.onScrollEnd = nProps.onScrollEnd;
            storeState.onRightClick = nProps.onRightClick;
            ///
            storeState.headerTable = nProps.headerTable;
            storeState.bodyRowTable = nProps.bodyRowTable;
            storeState.bodyRowMap = nProps.bodyRowMap;
            storeState.asideHeaderData = nProps.asideHeaderData;
            storeState.leftHeaderData = nProps.leftHeaderData;
            storeState.headerData = nProps.headerData;
            storeState.asideBodyRowData = nProps.asideBodyRowData;
            storeState.leftBodyRowData = nProps.leftBodyRowData;
            storeState.bodyRowData = nProps.bodyRowData;
            storeState.colGroupMap = nProps.colGroupMap;
            storeState.asideColGroup = nProps.asideColGroup;
            storeState.colGroup = nProps.colGroup;
            storeState.footSumColumns = nProps.footSumColumns;
            storeState.footSumTable = nProps.footSumTable;
            storeState.leftFootSumData = nProps.leftFootSumData;
            storeState.footSumData = nProps.footSumData;
            // nProps의 scrollLeft, scrollTop 변경 되는 경우 나중에 고려
            var _c = (storeState.options || {}).frozenColumnIndex, PfrozenColumnIndex = _c === void 0 ? 0 : _c;
            var changed = {
                colGroup: false,
                frozenColumnIndex: false,
                filteredList: false,
                styles: false,
                visibleColGroup: false,
            };
            // 다른 조건식 안에서 변경하여 처리할 수 있는 변수들 언더바(_)로 시작함.
            var _d = storeState.colGroup, _colGroup = _d === void 0 ? [] : _d, _leftHeaderColGroup = storeState.leftHeaderColGroup, _headerColGroup = storeState.headerColGroup, _filteredList = storeState.filteredList, _styles = storeState.styles, _e = storeState.scrollLeft, _scrollLeft = _e === void 0 ? 0 : _e, _f = storeState.scrollTop, _scrollTop = _f === void 0 ? 0 : _f;
            // colGroup들의 너비합을 모르거나 변경된 경우.
            // colGroup > width 연산
            if (nProps.colGroup !== nState.colGroup ||
                nProps.options !== nState.options) {
                _colGroup = utils_1.setColGroupWidth(nProps.colGroup || [], { width: nProps.width || 0 }, nProps.options);
                changed.colGroup = true;
            }
            if (changed.colGroup || frozenColumnIndex !== PfrozenColumnIndex) {
                _leftHeaderColGroup = _colGroup.slice(0, frozenColumnIndex);
                _headerColGroup = _colGroup.slice(frozenColumnIndex);
                changed.frozenColumnIndex = true;
            }
            // 데이터가 변경됨.
            if (nProps.data !== nState.data) {
                // 전달받은 data를 filteredList로 치환.
                _filteredList = utils_1.getFilteredList(nProps.data || [], {
                    colGroup: _colGroup,
                    sorter: nState.sortInfo,
                    options: nProps.options,
                });
                changed.filteredList = true;
            }
            if (changed.colGroup ||
                changed.frozenColumnIndex ||
                changed.filteredList ||
                !storeState.styles ||
                nProps.width !== nState.width ||
                nProps.height !== nState.height) {
                // 스타일 초기화 안되어 있음.
                var dimensions = utils_1.calculateDimensions(storeState, {
                    headerTable: nProps.headerTable,
                    colGroup: _colGroup,
                    headerColGroup: _headerColGroup,
                    bodyRowTable: nProps.bodyRowTable,
                    footSumColumns: nProps.footSumColumns,
                    filteredList: _filteredList,
                    options: nProps.options,
                });
                _styles = dimensions.styles;
                _scrollLeft = dimensions.scrollLeft;
                _scrollTop = dimensions.scrollTop;
                changed.styles = true;
            }
            // 스타일 정의가 되어 있지 않은 경우 : 그리드가 한번도 그려진 적이 없는 상태.
            if (changed.colGroup ||
                changed.frozenColumnIndex ||
                !storeState.styles ||
                nProps.width !== nState.width) {
                var visibleData = utils_1.getVisibleColGroup(_headerColGroup, {
                    scrollLeft: _scrollLeft,
                    bodyRowData: storeState.bodyRowData,
                    footSumData: storeState.footSumData,
                    styles: _styles,
                    options: storeState.options,
                });
                storeState.visibleHeaderColGroup = visibleData.visibleHeaderColGroup;
                storeState.visibleBodyRowData = visibleData.visibleBodyRowData;
                storeState.visibleFootSumData = visibleData.visibleFootSumData;
                storeState.printStartColIndex = visibleData.printStartColIndex;
                storeState.printEndColIndex = visibleData.printEndColIndex;
                changed.colGroup = true;
            }
            // 언더바로 시작하는 변수를 상태에 전달하기 위해 주입.
            storeState.colGroup = _colGroup;
            storeState.leftHeaderColGroup = _leftHeaderColGroup;
            storeState.headerColGroup = _headerColGroup;
            storeState.filteredList = _filteredList;
            storeState.styles = _styles;
            storeState.scrollLeft = _scrollLeft;
            storeState.scrollTop = _scrollTop;
            return storeState;
        }
    };
    StoreProvider.prototype.render = function () {
        return (React.createElement(Provider, { value: __assign({}, this.state, {
                predefinedFormatter: __assign({}, formatter_1.default),
                predefinedCollector: __assign({}, collector_1.default),
                setStoreState: this.setStoreState,
                dispatch: this.dispatch,
            }) }, this.props.children));
    };
    StoreProvider.prototype.componentDidMount = function () {
        // console.log('store did mount');
    };
    StoreProvider.prototype.componentDidUpdate = function (pProps, pState) {
        // console.log('store did update');
    };
    StoreProvider.prototype.componentWillUnmount = function () {
        // console.log('store unMount');
    };
    return StoreProvider;
}(React.Component));
exports.default = { Provider: StoreProvider, Consumer: Consumer };
