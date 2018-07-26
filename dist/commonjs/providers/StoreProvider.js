"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
var stores_1 = require("../stores");
var utils_1 = require("../utils");
var formatter_1 = require("../functions/formatter");
var store = {
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
    columnResizing: false,
    columnResizerLeft: 0,
    mounted: false,
    loading: false,
    loadingData: false,
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
    styles: {},
    predefinedFormatter: {},
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
            var _a = _this.state, _b = _a.filteredList, filteredList = _b === void 0 ? [] : _b, _c = _a.scrollLeft, scrollLeft = _c === void 0 ? 0 : _c, _d = _a.scrollTop, scrollTop = _d === void 0 ? 0 : _d, _e = _a.options, options = _e === void 0 ? {} : _e, _f = _a.styles, styles = _f === void 0 ? {} : _f, _g = _a.headerColGroup, headerColGroup = _g === void 0 ? [] : _g, _h = _a.bodyRowData, bodyRowData = _h === void 0 ? { rows: [{ cols: [] }] } : _h, _j = _a.bodyGroupingData, bodyGroupingData = _j === void 0 ? { rows: [{ cols: [] }] } : _j, onScrollEnd = _a.onScrollEnd, onChangeSelected = _a.onChangeSelected, sortInfo = _a.sortInfo;
            var _k = options.frozenColumnIndex, frozenColumnIndex = _k === void 0 ? 0 : _k;
            var CTInnerWidth = styles.CTInnerWidth;
            var _scrollLeft = newState.scrollLeft, _scrollTop = newState.scrollTop, _l = newState.styles, _styles = _l === void 0 ? {} : _l, _filteredList = newState.filteredList, _sortInfo = newState.sortInfo;
            if (typeof _scrollLeft !== 'undefined' ||
                typeof _scrollTop !== 'undefined') {
                var _m = __assign({}, styles, _styles), _o = _m.CTInnerWidth, _CTInnerWidth = _o === void 0 ? 0 : _o, _p = _m.frozenPanelWidth, _frozenPanelWidth = _p === void 0 ? 0 : _p, _q = _m.asidePanelWidth, _asidePanelWidth = _q === void 0 ? 0 : _q, _r = _m.rightPanelWidth, _rightPanelWidth = _r === void 0 ? 0 : _r, _s = _m.scrollContentWidth, scrollWidth = _s === void 0 ? 0 : _s, _t = _m.scrollContentHeight, scrollHeight = _t === void 0 ? 0 : _t, _u = _m.scrollContentContainerWidth, clientWidth = _u === void 0 ? 0 : _u, _v = _m.scrollContentContainerHeight, clientHeight = _v === void 0 ? 0 : _v;
                var endOfScrollTop = false;
                var endOfScrollLeft = false;
                if (typeof _scrollLeft !== 'undefined' && _scrollLeft !== scrollLeft) {
                    if (CTInnerWidth !== _CTInnerWidth || scrollLeft !== _scrollLeft) {
                        var _w = utils_1.getPositionPrintColGroup(headerColGroup, Math.abs(_scrollLeft) + _frozenPanelWidth, Math.abs(_scrollLeft) +
                            _frozenPanelWidth +
                            (_CTInnerWidth -
                                _asidePanelWidth -
                                _frozenPanelWidth -
                                _rightPanelWidth)), printStartColIndex = _w.printStartColIndex, printEndColIndex = _w.printEndColIndex;
                        newState.printStartColIndex = printStartColIndex;
                        newState.printEndColIndex = printEndColIndex;
                        newState.visibleHeaderColGroup = headerColGroup.slice(printStartColIndex, printEndColIndex + 1);
                        newState.visibleBodyRowData = utils_1.getTableByStartEndColumnIndex(bodyRowData, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
                        newState.visibleBodyGroupingData = utils_1.getTableByStartEndColumnIndex(bodyGroupingData, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
                    }
                    if (clientWidth >= scrollWidth + _scrollLeft) {
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
                newState.styles = utils_1.calculateDimensions(utils_1.getNode(_this.state.getRootNode), _this.state, _filteredList).styles;
            }
            if (_filteredList && _filteredList !== filteredList && onChangeSelected) {
                onChangeSelected({
                    data: _filteredList,
                });
            }
            if (_sortInfo && _sortInfo !== sortInfo && onChangeSelected) {
                onChangeSelected({
                    data: filteredList,
                });
            }
            _this.setState(newState);
        };
        _this.dispatch = function (dispatchType, param) {
            var _a = _this.state, _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.listSelectedAll, listSelectedAll = _c === void 0 ? false : _c, _d = _a.scrollLeft, scrollLeft = _d === void 0 ? 0 : _d, _e = _a.colGroup, colGroup = _e === void 0 ? [] : _e, getRootNode = _a.getRootNode, _f = _a.focusedRow, focusedRow = _f === void 0 ? 0 : _f, _g = _a.sortInfo, sortInfo = _g === void 0 ? {} : _g, _h = _a.options, options = _h === void 0 ? {} : _h;
            var _j = options.columnKeys, optionColumnKeys = _j === void 0 ? {} : _j;
            var rootNode = utils_1.getNode(getRootNode);
            var _k = _this.state.filteredList, filteredList = _k === void 0 ? [] : _k;
            var proc = (_l = {},
                _l[stores_1.DispatchTypes.FILTER] = function () {
                    var colIndex = param.colIndex, filterInfo = param.filterInfo;
                    var checkAll = filterInfo[colIndex] === false
                        ? true
                        : filterInfo[colIndex].__check_all__;
                    if (checkAll) {
                        filteredList =
                            data &&
                                data.filter(function (n) {
                                    return !n[optionColumnKeys.deleted || '__deleted__'];
                                });
                    }
                    else {
                        filteredList = data.filter(function (n) {
                            if (n) {
                                var value = n[colGroup[colIndex].key || ''];
                                if (n[optionColumnKeys.deleted || '__deleted__']) {
                                    return false;
                                }
                                if (typeof value === 'undefined') {
                                    if (!filterInfo[colIndex].__UNDEFINED__) {
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
                    });
                },
                _l[stores_1.DispatchTypes.SORT] = function () {
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
                    }
                },
                _l[stores_1.DispatchTypes.UPDATE] = function () {
                    var row = param.row, colIndex = param.colIndex, value = param.value, eventWhichKey = param.eventWhichKey;
                    var key = colGroup[colIndex].key;
                    var focusRow = focusedRow;
                    if (key) {
                        filteredList[row][key] = value;
                        // update filteredList
                    }
                    if (eventWhichKey) {
                        switch (eventWhichKey) {
                            case stores_1.KeyCodes.UP_ARROW:
                                focusRow = focusedRow < 1 ? 0 : focusedRow - 1;
                                break;
                            case stores_1.KeyCodes.DOWN_ARROW:
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
                    if (rootNode) {
                        rootNode.focus();
                    }
                    var _a;
                },
                _l[stores_1.DispatchTypes.RESIZE_COL] = function () {
                    var col = param.col, newWidth = param.newWidth;
                    var newState = __assign({}, _this.state);
                    if (newState.colGroup) {
                        newState.colGroup[col.colIndex]._width = newState.colGroup[col.colIndex].width = newWidth;
                    }
                    var _a = utils_1.calculateDimensions(rootNode, newState), styles = _a.styles, leftHeaderColGroup = _a.leftHeaderColGroup, headerColGroup = _a.headerColGroup;
                    _this.setStoreState({
                        scrollLeft: scrollLeft,
                        colGroup: colGroup,
                        leftHeaderColGroup: leftHeaderColGroup,
                        headerColGroup: headerColGroup,
                        styles: styles,
                        columnResizing: false,
                    });
                },
                _l[stores_1.DispatchTypes.SELECT] = function () {
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
                        rowSelected = !filteredList[rowIndex].__selected__;
                    }
                    if (!rowSelected) {
                        selectedAll = false;
                    }
                    filteredList[rowIndex].__selected__ = rowSelected;
                    _this.setStoreState({
                        listSelectedAll: selectedAll,
                        selectedRowIndex: rowIndex,
                        selectedRowIndexSelected: rowSelected,
                        filteredList: __spread(filteredList),
                    });
                },
                _l[stores_1.DispatchTypes.SELECT_ALL] = function () {
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
                        filteredList[i].__selected__ = selectedAll;
                    }
                    _this.setStoreState({
                        listSelectedAll: selectedAll,
                        filteredList: __spread(filteredList),
                    });
                },
                _l);
            proc[dispatchType]();
            var _l;
        };
        return _this;
    }
    StoreProvider.getDerivedStateFromProps = function (newProps, prevState) {
        /*
          초기에만 값을 수신하여 랜더링 하고, 그 후엔 setState로 제어 되는 항목.
          newProps.styles === prevState.styles &&
          newProps.printStartColIndex === prevState.printStartColIndex &&
          newProps.printEndColIndex === prevState.printEndColIndex &&
          newProps.visibleHeaderColGroup === prevState.visibleHeaderColGroup &&
          newProps.visibleBodyRowData === prevState.visibleBodyRowData &&
          newProps.visibleBodyGroupingData === prevState.visibleBodyGroupingData
         */
        if (newProps.mounted === prevState.mounted &&
            newProps.loading === prevState.loading &&
            newProps.loadingData === prevState.loadingData &&
            newProps.setRootState === prevState.setRootState &&
            newProps.getRootState === prevState.getRootState &&
            newProps.getRootNode === prevState.getRootNode &&
            newProps.getClipBoardNode === prevState.getClipBoardNode &&
            newProps.rootObject === prevState.rootObject &&
            newProps.data === prevState.data &&
            newProps.options === prevState.options &&
            newProps.height === prevState.height &&
            newProps.onBeforeEvent === prevState.onBeforeEvent &&
            newProps.onAfterEvent === prevState.onAfterEvent &&
            newProps.onScrollEnd === prevState.onScrollEnd &&
            newProps.onChangeSelected === prevState.onChangeSelected &&
            newProps.headerTable === prevState.headerTable &&
            newProps.bodyRowTable === prevState.bodyRowTable &&
            newProps.bodyRowMap === prevState.bodyRowMap &&
            newProps.asideHeaderData === prevState.asideHeaderData &&
            newProps.leftHeaderData === prevState.leftHeaderData &&
            newProps.headerData === prevState.headerData &&
            newProps.asideColGroup === prevState.asideColGroup &&
            newProps.asideBodyRowData === prevState.asideBodyRowData &&
            newProps.leftBodyRowData === prevState.leftBodyRowData &&
            newProps.bodyRowData === prevState.bodyRowData &&
            newProps.colGroup === prevState.colGroup &&
            newProps.colGroupMap === prevState.colGroupMap &&
            newProps.leftHeaderColGroup === prevState.leftHeaderColGroup &&
            newProps.headerColGroup === prevState.headerColGroup) {
            return null;
        }
        else {
            var scrollTop = prevState.scrollTop;
            var filteredList = prevState.filteredList || [];
            var styles = prevState.styles || {};
            var data = newProps.data, _a = newProps.styles, _styles = _a === void 0 ? {} : _a, _b = newProps.options, _options = _b === void 0 ? {} : _b;
            // 데이터를 정리하는 과정. data > filteredList
            if (data && newProps.data !== prevState.data) {
                // sort 되었다고 판단됨. filteredList를 sort 해주어야 함.
                var _c = prevState.options, options = _c === void 0 ? {} : _c;
                var _d = options.columnKeys, optionColumnKeys_1 = _d === void 0 ? {} : _d;
                filteredList = data.filter(function (n) {
                    return !n[optionColumnKeys_1.deleted || '__deleted__'];
                });
                // 정렬 오브젝트가 있다면 정렬 프로세스 적용하여 새로운 데이터 정렬
                if (prevState.sortInfo && Object.keys(prevState.sortInfo).length) {
                }
            }
            // 데이터 길이에 따라 스타일이 조정되어야 하므로
            // 현재 스타일을 props.styles과 데이터 길이에 따라 계산된 스타일을 머지해 준다.
            styles = __assign({}, _styles, utils_1.getStylesAboutFilteredList(filteredList, _options, _styles));
            // loadingData 상태값이 true 이면
            // 컨텐츠 스크롤 위치를 맨 끝으로 보내도록 함.
            if (newProps.loadingData &&
                newProps.loadingData !== prevState.loadingData) {
                var focusRow = filteredList.length - 1;
                var _e = styles.bodyTrHeight, bodyTrHeight = _e === void 0 ? 0 : _e, _f = styles.scrollContentWidth, scrollContentWidth = _f === void 0 ? 0 : _f, _g = styles.scrollContentHeight, scrollContentHeight = _g === void 0 ? 0 : _g, _h = styles.scrollContentContainerWidth, scrollContentContainerWidth = _h === void 0 ? 0 : _h, _j = styles.scrollContentContainerHeight, scrollContentContainerHeight = _j === void 0 ? 0 : _j;
                scrollTop = utils_1.getScrollPosition(0, -focusRow * bodyTrHeight, {
                    scrollWidth: scrollContentWidth,
                    scrollHeight: scrollContentHeight,
                    clientWidth: scrollContentContainerWidth,
                    clientHeight: scrollContentContainerHeight,
                }).scrollTop;
            }
            return __assign({}, prevState, {
                scrollTop: scrollTop,
                mounted: newProps.mounted,
                loading: newProps.loading,
                loadingData: newProps.loadingData,
                setRootState: newProps.setRootState,
                getRootState: newProps.getRootState,
                getRootNode: newProps.getRootNode,
                getClipBoardNode: newProps.getClipBoardNode,
                rootObject: newProps.rootObject,
                data: newProps.data,
                filteredList: filteredList,
                options: newProps.options,
                height: newProps.height,
                onBeforeEvent: newProps.onBeforeEvent,
                onAfterEvent: newProps.onAfterEvent,
                onScrollEnd: newProps.onScrollEnd,
                onChangeSelected: newProps.onChangeSelected,
                headerTable: newProps.headerTable,
                bodyRowTable: newProps.bodyRowTable,
                bodyRowMap: newProps.bodyRowMap,
                asideHeaderData: newProps.asideHeaderData,
                leftHeaderData: newProps.leftHeaderData,
                headerData: newProps.headerData,
                asideColGroup: newProps.asideColGroup,
                asideBodyRowData: newProps.asideBodyRowData,
                leftBodyRowData: newProps.leftBodyRowData,
                bodyRowData: newProps.bodyRowData,
                colGroup: newProps.colGroup,
                colGroupMap: newProps.colGroupMap,
                leftHeaderColGroup: newProps.leftHeaderColGroup,
                headerColGroup: newProps.headerColGroup,
                styles: styles,
                printStartColIndex: newProps.printStartColIndex,
                printEndColIndex: newProps.printEndColIndex,
                visibleHeaderColGroup: newProps.visibleHeaderColGroup,
                visibleBodyRowData: newProps.visibleBodyRowData,
                visibleBodyGroupingData: newProps.visibleBodyGroupingData,
            });
        }
    };
    StoreProvider.prototype.componentDidMount = function () {
        this.throttledUpdateDimensions = utils_1.throttle(this.updateDimensions.bind(this), 100);
        window.addEventListener('resize', this.throttledUpdateDimensions);
    };
    StoreProvider.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.throttledUpdateDimensions);
    };
    StoreProvider.prototype.updateDimensions = function () {
        var _a = this.state, _b = _a.scrollLeft, scrollLeft = _b === void 0 ? 0 : _b, _c = _a.scrollTop, scrollTop = _c === void 0 ? 0 : _c;
        var styles = utils_1.calculateDimensions(utils_1.getNode(this.state.getRootNode), this.state).styles;
        var _d = styles.scrollContentWidth, scrollContentWidth = _d === void 0 ? 0 : _d, _e = styles.scrollContentHeight, scrollContentHeight = _e === void 0 ? 0 : _e, _f = styles.scrollContentContainerWidth, scrollContentContainerWidth = _f === void 0 ? 0 : _f, _g = styles.scrollContentContainerHeight, scrollContentContainerHeight = _g === void 0 ? 0 : _g;
        var _h = utils_1.getScrollPosition(scrollLeft, scrollTop, {
            scrollWidth: scrollContentWidth,
            scrollHeight: scrollContentHeight,
            clientWidth: scrollContentContainerWidth,
            clientHeight: scrollContentContainerHeight,
        }), _j = _h.scrollLeft, newScrollLeft = _j === void 0 ? 0 : _j, _k = _h.scrollTop, newScrollTop = _k === void 0 ? 0 : _k;
        this.setStoreState({
            styles: styles,
            scrollLeft: newScrollLeft,
            scrollTop: newScrollTop,
        });
    };
    StoreProvider.prototype.render = function () {
        return (React.createElement(Provider, { value: __assign({}, this.state, {
                predefinedFormatter: __assign({}, formatter_1.default),
                setStoreState: this.setStoreState,
                dispatch: this.dispatch,
            }) }, this.props.children));
    };
    return StoreProvider;
}(React.Component));
exports.default = { Provider: StoreProvider, Consumer: Consumer };
//# sourceMappingURL=StoreProvider.js.map