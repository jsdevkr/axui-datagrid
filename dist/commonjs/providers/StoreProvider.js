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
        _this.setStoreState = function (newState, callback) {
            var _a = _this.state, _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.scrollLeft, scrollLeft = _c === void 0 ? 0 : _c, _d = _a.scrollTop, scrollTop = _d === void 0 ? 0 : _d, _e = _a.options, options = _e === void 0 ? {} : _e, _f = _a.styles, styles = _f === void 0 ? {} : _f, _g = _a.headerColGroup, headerColGroup = _g === void 0 ? [] : _g, _h = _a.bodyRowData, bodyRowData = _h === void 0 ? { rows: [{ cols: [] }] } : _h, _j = _a.footSumData, footSumData = _j === void 0 ? { rows: [{ cols: [] }] } : _j, onScroll = _a.onScroll, onScrollEnd = _a.onScrollEnd, onChangeScrollSize = _a.onChangeScrollSize, onChangeSelection = _a.onChangeSelection, onChangeSelectedRow = _a.onChangeSelectedRow;
            var _k = options.frozenRowIndex, frozenRowIndex = _k === void 0 ? 0 : _k;
            var _l = styles.bodyHeight, bodyHeight = _l === void 0 ? 0 : _l, _m = styles.bodyTrHeight, bodyTrHeight = _m === void 0 ? 0 : _m;
            var _scrollLeft = newState.scrollLeft, _scrollTop = newState.scrollTop;
            if (!newState.styles) {
                newState.styles = __assign({}, styles);
            }
            if (typeof _scrollLeft !== 'undefined' ||
                typeof _scrollTop !== 'undefined') {
                var _o = newState.styles, _p = _o.scrollContentWidth, scrollWidth = _p === void 0 ? 0 : _p, _q = _o.scrollContentHeight, scrollHeight = _q === void 0 ? 0 : _q, _r = _o.scrollContentContainerWidth, clientWidth = _r === void 0 ? 0 : _r, _s = _o.scrollContentContainerHeight, clientHeight = _s === void 0 ? 0 : _s;
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
                        if (clientWidth >= scrollWidth + _scrollLeft) {
                            endOfScrollLeft = true;
                        }
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
            // if (_filteredList && filteredList.length !== _filteredList.length) {
            //   const dimensions = calculateDimensions(newState, {
            //     headerTable: newState.headerTable || this.state.headerTable,
            //     colGroup: newState.colGroup || this.state.colGroup,
            //     headerColGroup: newState.headerColGroup || this.state.headerColGroup,
            //     bodyRowTable: newState.bodyRowTable || this.state.bodyRowTable,
            //     footSumColumns: newState.footSumColumns || this.state.footSumColumns,
            //     filteredList: _filteredList,
            //     options: newState.options || this.state.options,
            //   });
            //   newState.styles = dimensions.styles;
            //   newState.scrollLeft = dimensions.scrollLeft;
            //   newState.scrollTop = dimensions.scrollTop;
            // }
            _this.setState(function () { return newState; }, callback);
        };
        _this.dispatch = function (dispatchType, param) {
            var _a;
            var _b = _this.state, _c = _b.data, data = _c === void 0 ? [] : _c, _d = _b.listSelectedAll, listSelectedAll = _d === void 0 ? false : _d, _e = _b.colGroup, colGroup = _e === void 0 ? [] : _e, rootNode = _b.rootNode, _f = _b.focusedRow, focusedRow = _f === void 0 ? -1 : _f, _g = _b.sortInfo, sortInfo = _g === void 0 ? {} : _g, _h = _b.options, options = _h === void 0 ? {} : _h, selectedRowKeys = _b.selectedRowKeys, selectionSRow = _b.selectionSRow, selectionSCol = _b.selectionSCol, selectionERow = _b.selectionERow, selectionECol = _b.selectionECol, selectionRows = _b.selectionRows, selectionCols = _b.selectionCols, selection = _b.selection, onChangeSelectedRow = _b.onChangeSelectedRow;
            switch (dispatchType) {
                case _enums_1.DataGridEnums.DispatchTypes.FILTER:
                    {
                        // const { colIndex, filterInfo } = param;
                        // const checkAll =
                        //   filterInfo[colIndex] === false
                        //     ? true
                        //     : filterInfo[colIndex]._check_all_;
                        // if (checkAll) {
                        //   filteredList =
                        //     data &&
                        //     data.filter((n: any) => {
                        //       return (
                        //         typeof n === 'undefined' ||
                        //         !n[optionColumnKeys.deleted || '_deleted_']
                        //       );
                        //     });
                        // } else {
                        //   filteredList = data.filter((n: any) => {
                        //     if (n) {
                        //       const value = n && n[colGroup[colIndex].key || ''];
                        //       if (
                        //         typeof n === 'undefined' ||
                        //         n[optionColumnKeys.deleted || '_deleted_']
                        //       ) {
                        //         return false;
                        //       }
                        //       if (typeof value === 'undefined') {
                        //         if (!filterInfo[colIndex]._UNDEFINED_) {
                        //           return false;
                        //         }
                        //       } else {
                        //         if (!filterInfo[colIndex][value]) {
                        //           return false;
                        //         }
                        //       }
                        //       return true;
                        //     }
                        //     return false;
                        //   });
                        // }
                        // this.setStoreState({
                        //   filteredList,
                        //   filterInfo,
                        //   scrollTop: 0,
                        // });
                        // if (onChangeSelected) {
                        //   onChangeSelected({
                        //     filteredList,
                        //   });
                        // }
                    }
                    break;
                case _enums_1.DataGridEnums.DispatchTypes.SORT:
                    {
                        var colIndex = param.colIndex;
                        if (typeof colIndex === 'undefined') {
                            return;
                        }
                        var _j = colGroup[colIndex].key, colKey = _j === void 0 ? '' : _j;
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
                        var sortedList = data.sort(function (a, b) {
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
                            data: sortedList,
                            isInlineEditing: false,
                            inlineEditingCell: {},
                        });
                        if (onChangeSelectedRow) {
                            onChangeSelectedRow({
                                data: sortedList,
                            });
                        }
                    }
                    break;
                case _enums_1.DataGridEnums.DispatchTypes.UPDATE:
                    {
                        var row = param.row, colIndex = param.colIndex, value = param.value, eventWhichKey = param.eventWhichKey, _k = param.keepEditing, keepEditing = _k === void 0 ? false : _k;
                        var key = colGroup[colIndex].key;
                        var focusRow = focusedRow;
                        if (key) {
                            data[row][key] = value;
                            // update filteredList
                        }
                        if (eventWhichKey) {
                            switch (eventWhichKey) {
                                case _enums_1.DataGridEnums.KeyCodes.UP_ARROW:
                                    focusRow = focusedRow < 1 ? 0 : focusedRow - 1;
                                    break;
                                case _enums_1.DataGridEnums.KeyCodes.DOWN_ARROW:
                                    focusRow =
                                        focusedRow + 1 >= data.length
                                            ? data.length - 1
                                            : focusedRow + 1;
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (!keepEditing) {
                            _this.setStoreState({
                                data: __spread(data),
                                isInlineEditing: false,
                                inlineEditingCell: {},
                                selectionRows: (_a = {},
                                    _a[focusRow] = true,
                                    _a),
                                focusedRow: focusRow,
                            });
                            if (onChangeSelectedRow) {
                                onChangeSelectedRow({
                                    data: data,
                                });
                            }
                            if (rootNode && rootNode.current) {
                                rootNode.current.focus();
                            }
                        }
                        else {
                            _this.setStoreState({
                                data: __spread(data),
                            });
                        }
                    }
                    break;
                case _enums_1.DataGridEnums.DispatchTypes.RESIZE_COL:
                    {
                        var col = param.col, newWidth = param.newWidth;
                        var _colGroup = __spread((_this.state.colGroup || []));
                        _colGroup[col.colIndex]._width = _colGroup[col.colIndex].width = newWidth;
                        _this.setStoreState({
                            colGroup: _colGroup,
                            columnResizing: false,
                        });
                    }
                    break;
                case _enums_1.DataGridEnums.DispatchTypes.SELECT:
                    {
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
                            rowSelected = !data[rowIndex]._selected_;
                        }
                        if (!rowSelected) {
                            selectedAll = false;
                        }
                        data[rowIndex]._selected_ = rowSelected;
                        _this.setStoreState({
                            listSelectedAll: selectedAll,
                            selectedRowIndex: rowIndex,
                            selectedRowIndexSelected: rowSelected,
                            data: __spread(data),
                        });
                        if (onChangeSelectedRow) {
                            onChangeSelectedRow({
                                data: data,
                            });
                        }
                    }
                    break;
                case _enums_1.DataGridEnums.DispatchTypes.SELECT_ALL:
                    {
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
                        for (var i = 0, l = data.length; i < l; i++) {
                            data[i]._selected_ = selectedAll;
                        }
                        _this.setStoreState({
                            listSelectedAll: selectedAll,
                            data: __spread(data),
                        });
                        if (onChangeSelectedRow) {
                            onChangeSelectedRow({
                                data: data,
                            });
                        }
                    }
                    break;
                case _enums_1.DataGridEnums.DispatchTypes.CHANGE_SELECTION:
                    {
                        var sRow = param.sRow, sCol = param.sCol, eRow = param.eRow, eCol = param.eCol, fRow = param.focusedRow, fCol = param.focusedCol;
                        if (selectionSRow !== sRow ||
                            selectionSCol !== sCol ||
                            selectionERow !== eRow ||
                            selectionECol !== eCol) {
                            // console.log(sRow, sCol, eRow, eCol);
                            _this.setStoreState({
                                selectionSRow: sRow,
                                selectionSCol: sCol,
                                selectionERow: eRow,
                                selectionECol: eCol,
                            });
                        }
                    }
                    break;
                default:
                    break;
            }
        };
        return _this;
    }
    StoreProvider.getDerivedStateFromProps = function (nProps, nState) {
        // console.log('getDerivedStateFromProps ~~');
        // console.log('nProps.colGroup === nState.colGroup', nState.colGroup);
        if (nProps.loading === nState.loading &&
            nProps.loadingData === nState.loadingData &&
            nProps.data === nState.data &&
            nProps.selection === nState.selection &&
            nProps.selectedRowKeys === nState.selectedRowKeys &&
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
            nProps.onScroll === nState.onScroll &&
            nProps.onScrollEnd === nState.onScrollEnd &&
            nProps.onChangeScrollSize === nState.onChangeScrollSize &&
            nProps.onChangeSelection === nState.onChangeSelection &&
            nProps.onChangeSelectedRow === nState.onChangeSelectedRow &&
            nProps.onRightClick === nState.onRightClick) {
            return null;
        }
        else {
            // store state | 현재 state복제
            var _a = nProps.options, options = _a === void 0 ? {} : _a;
            var _b = options.frozenColumnIndex, frozenColumnIndex = _b === void 0 ? 0 : _b, optionsBody = options.body; // 옵션은 외부에서 받은 값을 사용하고 state에서 값을 수정하면 안됨.
            var storeState_1 = __assign({}, nState);
            storeState_1.pScrollTop = nProps.scrollTop;
            storeState_1.loading = nProps.loading;
            storeState_1.loadingData = nProps.loadingData;
            storeState_1.width = nProps.width;
            storeState_1.height = nProps.height;
            storeState_1.selection = nProps.selection;
            storeState_1.selectedRowKeys = nProps.selectedRowKeys;
            storeState_1.options = nProps.options;
            storeState_1.status = nProps.status;
            storeState_1.rootNode = nProps.rootNode;
            storeState_1.clipBoardNode = nProps.clipBoardNode;
            storeState_1.rootObject = nProps.rootObject;
            storeState_1.onBeforeEvent = nProps.onBeforeEvent;
            storeState_1.onScroll = nProps.onScroll;
            storeState_1.onScrollEnd = nProps.onScrollEnd;
            storeState_1.onChangeScrollSize = nProps.onChangeScrollSize;
            storeState_1.onChangeSelection = nProps.onChangeSelection;
            storeState_1.onChangeSelectedRow = nProps.onChangeSelectedRow;
            storeState_1.onRightClick = nProps.onRightClick;
            ///
            storeState_1.headerTable = nProps.headerTable;
            storeState_1.bodyRowTable = nProps.bodyRowTable;
            storeState_1.bodyRowMap = nProps.bodyRowMap;
            storeState_1.asideHeaderData = nProps.asideHeaderData;
            storeState_1.leftHeaderData = nProps.leftHeaderData;
            storeState_1.headerData = nProps.headerData;
            storeState_1.asideBodyRowData = nProps.asideBodyRowData;
            storeState_1.leftBodyRowData = nProps.leftBodyRowData;
            storeState_1.bodyRowData = nProps.bodyRowData;
            storeState_1.colGroupMap = nProps.colGroupMap;
            storeState_1.asideColGroup = nProps.asideColGroup;
            storeState_1.autofitColGroup = nProps.autofitColGroup;
            storeState_1.colGroup = nProps.colGroup;
            storeState_1.footSumColumns = nProps.footSumColumns;
            storeState_1.footSumTable = nProps.footSumTable;
            storeState_1.leftFootSumData = nProps.leftFootSumData;
            storeState_1.footSumData = nProps.footSumData;
            var _c = (storeState_1.options || {}).frozenColumnIndex, PfrozenColumnIndex = _c === void 0 ? 0 : _c;
            var changed = {
                colGroup: false,
                frozenColumnIndex: false,
                styles: false,
                visibleColGroup: false,
                data: false,
            };
            // 다른 조건식 안에서 변경하여 처리할 수 있는 변수들 언더바(_)로 시작함.
            var _d = storeState_1.colGroup, _colGroup = _d === void 0 ? [] : _d, _leftHeaderColGroup = storeState_1.leftHeaderColGroup, _headerColGroup = storeState_1.headerColGroup, _styles = storeState_1.styles, _e = storeState_1.scrollLeft, _scrollLeft = _e === void 0 ? 0 : _e, _f = storeState_1.scrollTop, _scrollTop = _f === void 0 ? 0 : _f;
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
            // case of change datalength
            if (nProps.data !== nState.data) {
                changed.data = true;
                storeState_1.data = nProps.data;
            }
            if (changed.data ||
                changed.colGroup ||
                changed.frozenColumnIndex ||
                !storeState_1.styles ||
                nProps.width !== nState.width ||
                nProps.height !== nState.height) {
                // 스타일 초기화 안되어 있거나 크기를 다시 결정해야 하는 경우.
                var dimensions = utils_1.calculateDimensions(storeState_1, {
                    headerTable: nProps.headerTable,
                    colGroup: _colGroup,
                    headerColGroup: _headerColGroup,
                    bodyRowTable: nProps.bodyRowTable,
                    footSumColumns: nProps.footSumColumns,
                    data: nProps.data,
                    options: nProps.options,
                });
                _styles = dimensions.styles;
                _scrollLeft = dimensions.scrollLeft;
                _scrollTop = dimensions.scrollTop;
                changed.styles = true;
            }
            if (changed.data ||
                nProps.scrollTop !== nState.pScrollTop ||
                nProps.scrollLeft !== nState.pScrollLeft) {
                // console.log('change scrollTop, left by prop', nProps.scrollTop, nProps.scrollLeft);
                var _g = _styles || {}, _h = _g.scrollContentWidth, scrollContentWidth = _h === void 0 ? 0 : _h, _j = _g.scrollContentHeight, scrollContentHeight = _j === void 0 ? 0 : _j, _k = _g.scrollContentContainerWidth, scrollContentContainerWidth = _k === void 0 ? 0 : _k, _l = _g.scrollContentContainerHeight, scrollContentContainerHeight = _l === void 0 ? 0 : _l;
                var _m = utils_1.getScrollPosition(_scrollLeft || 0, _scrollTop || 0, {
                    scrollWidth: scrollContentWidth,
                    scrollHeight: scrollContentHeight,
                    clientWidth: scrollContentContainerWidth,
                    clientHeight: scrollContentContainerHeight,
                }), _o = _m.scrollLeft, currScrollLeft = _o === void 0 ? 0 : _o, _p = _m.scrollTop, currScrollTop = _p === void 0 ? 0 : _p, endOfScrollTop = _m.endOfScrollTop;
                _scrollLeft = currScrollLeft;
                _scrollTop = currScrollTop;
            }
            if (nProps.selection !== nState.selection) {
                storeState_1.selection = nProps.selection;
                var _q = nProps.selection || {}, _r = _q.rows, rows = _r === void 0 ? [] : _r, _s = _q.cols, cols = _s === void 0 ? [] : _s, _t = _q.focusedRow, focusedRow = _t === void 0 ? -1 : _t, _u = _q.focusedCol, focusedCol = _u === void 0 ? -1 : _u;
                storeState_1.selectionRows = {};
                storeState_1.selectionCols = {};
                rows.forEach(function (n) {
                    storeState_1.selectionRows[n] = true;
                });
                cols.forEach(function (n) {
                    storeState_1.selectionCols[n] = true;
                });
                storeState_1.focusedRow = focusedRow;
                storeState_1.focusedCol = focusedCol;
            }
            // 스타일 정의가 되어 있지 않은 경우 : 그리드가 한번도 그려진 적이 없는 상태.
            if (changed.colGroup ||
                changed.frozenColumnIndex ||
                !storeState_1.styles ||
                nProps.width !== nState.width) {
                var visibleData = utils_1.getVisibleColGroup(_headerColGroup, {
                    scrollLeft: _scrollLeft,
                    bodyRowData: storeState_1.bodyRowData,
                    footSumData: storeState_1.footSumData,
                    styles: _styles,
                    options: storeState_1.options,
                });
                storeState_1.visibleHeaderColGroup = visibleData.visibleHeaderColGroup;
                storeState_1.visibleBodyRowData = visibleData.visibleBodyRowData;
                storeState_1.visibleFootSumData = visibleData.visibleFootSumData;
                storeState_1.printStartColIndex = visibleData.printStartColIndex;
                storeState_1.printEndColIndex = visibleData.printEndColIndex;
                changed.colGroup = true;
            }
            // scrollTop prop 저장
            storeState_1.pScrollTop = nProps.scrollTop;
            storeState_1.pScrollLeft = nProps.scrollLeft;
            // 언더바로 시작하는 변수를 상태에 전달하기 위해 주입.
            storeState_1.colGroup = _colGroup;
            storeState_1.leftHeaderColGroup = _leftHeaderColGroup;
            storeState_1.headerColGroup = _headerColGroup;
            storeState_1.styles = _styles;
            storeState_1.scrollLeft = _scrollLeft;
            storeState_1.scrollTop = _scrollTop;
            return storeState_1;
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
        var onScroll = this.props.onScroll;
        var _a = this.state, _b = _a.scrollLeft, scrollLeft = _b === void 0 ? 0 : _b, _c = _a.scrollTop, scrollTop = _c === void 0 ? 0 : _c, _d = _a.options, _e = (_d === void 0 ? {} : _d).frozenRowIndex, frozenRowIndex = _e === void 0 ? 0 : _e, _f = _a.styles, _g = _f === void 0 ? {} : _f, _h = _g.scrollContentContainerHeight, scrollContentContainerHeight = _h === void 0 ? 0 : _h, _j = _g.scrollContentHeight, scrollContentHeight = _j === void 0 ? 0 : _j, _k = _g.scrollContentContainerWidth, scrollContentContainerWidth = _k === void 0 ? 0 : _k, _l = _g.scrollContentWidth, scrollContentWidth = _l === void 0 ? 0 : _l, _m = _g.bodyTrHeight, bodyTrHeight = _m === void 0 ? 0 : _m, _o = _g.bodyHeight, bodyHeight = _o === void 0 ? 0 : _o, onChangeSelection = _a.onChangeSelection;
        // detect change scrollContent
        if (pState.styles) {
            var _p = pState.styles, _scrollContentHeight = _p.scrollContentHeight, _scrollContentWidth = _p.scrollContentWidth;
            if (scrollContentHeight !== _scrollContentHeight ||
                scrollContentWidth !== _scrollContentWidth) {
                this.props.onChangeScrollSize &&
                    this.props.onChangeScrollSize({
                        scrollContentContainerHeight: scrollContentContainerHeight,
                        scrollContentHeight: scrollContentHeight,
                        scrollContentContainerWidth: scrollContentContainerWidth,
                        scrollContentWidth: scrollContentWidth,
                        bodyTrHeight: bodyTrHeight,
                    });
            }
        }
        // detect change scrollTop
        if (pState.scrollTop !== this.state.scrollTop) {
            if (onScroll) {
                var sRowIndex = Math.floor(-scrollTop / (bodyTrHeight || 1)) + frozenRowIndex;
                var eRowIndex = sRowIndex + Math.ceil(bodyHeight / (bodyTrHeight || 1)) + 1;
                onScroll({
                    scrollLeft: Number(scrollLeft),
                    scrollTop: Number(scrollTop),
                    sRowIndex: sRowIndex,
                    eRowIndex: eRowIndex,
                });
            }
        }
        // detect change selection
        if (onChangeSelection &&
            (pState.focusedRow !== this.state.focusedRow ||
                pState.focusedCol !== this.state.focusedCol ||
                pState.selectionSRow !== this.state.selectionSRow ||
                pState.selectionERow !== this.state.selectionERow ||
                pState.selectionSCol !== this.state.selectionSCol ||
                pState.selectionECol !== this.state.selectionECol)) {
            var _q = this.state, _r = _q.selectionRows, selectionRows = _r === void 0 ? [] : _r, _s = _q.selectionCols, selectionCols = _s === void 0 ? [] : _s, _t = _q.focusedRow, focusedRow = _t === void 0 ? -1 : _t, _u = _q.focusedCol, focusedCol = _u === void 0 ? -1 : _u;
            onChangeSelection({
                rows: Object.keys(selectionRows).map(function (n) { return Number(n); }),
                cols: Object.keys(selectionCols).map(function (n) { return Number(n); }),
                focusedRow: focusedRow,
                focusedCol: focusedCol,
            });
        }
    };
    StoreProvider.prototype.componentWillUnmount = function () {
        // console.log('store unMount');
    };
    return StoreProvider;
}(React.Component));
exports.default = { Provider: StoreProvider, Consumer: Consumer };
