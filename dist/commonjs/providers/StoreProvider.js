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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var stores_1 = require("../stores");
var utils_1 = require("../utils");
var formatter_1 = require("../functions/formatter");
var store = {
    dragging: false,
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
    data: [],
    filteredList: [],
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
            var _a = _this.state, _b = _a.filteredList, filteredList = _b === void 0 ? [] : _b, _c = _a.scrollLeft, scrollLeft = _c === void 0 ? 0 : _c, _d = _a.options, options = _d === void 0 ? {} : _d, _e = _a.styles, styles = _e === void 0 ? {} : _e, _f = _a.headerColGroup, headerColGroup = _f === void 0 ? [] : _f, _g = _a.bodyRowData, bodyRowData = _g === void 0 ? { rows: [{ cols: [] }] } : _g, _h = _a.bodyGroupingData, bodyGroupingData = _h === void 0 ? { rows: [{ cols: [] }] } : _h;
            var _j = options.frozenColumnIndex, frozenColumnIndex = _j === void 0 ? 0 : _j;
            var CTInnerWidth = styles.CTInnerWidth;
            var _scrollLeft = newState.scrollLeft, _k = newState.styles, _styles = _k === void 0 ? {} : _k, _filteredList = newState.filteredList;
            if (typeof _scrollLeft !== 'undefined') {
                var _l = __assign({}, styles, _styles), _m = _l.CTInnerWidth, _CTInnerWidth = _m === void 0 ? 0 : _m, _o = _l.frozenPanelWidth, _frozenPanelWidth = _o === void 0 ? 0 : _o, _p = _l.asidePanelWidth, _asidePanelWidth = _p === void 0 ? 0 : _p, _q = _l.rightPanelWidth, _rightPanelWidth = _q === void 0 ? 0 : _q;
                if (CTInnerWidth !== _CTInnerWidth || scrollLeft !== _scrollLeft) {
                    var _r = utils_1.getPositionPrintColGroup(headerColGroup, Math.abs(_scrollLeft) + _frozenPanelWidth, Math.abs(_scrollLeft) +
                        _frozenPanelWidth +
                        (_CTInnerWidth -
                            _asidePanelWidth -
                            _frozenPanelWidth -
                            _rightPanelWidth)), printStartColIndex = _r.printStartColIndex, printEndColIndex = _r.printEndColIndex;
                    newState.printStartColIndex = printStartColIndex;
                    newState.printEndColIndex = printEndColIndex;
                    newState.visibleHeaderColGroup = headerColGroup.slice(printStartColIndex, printEndColIndex + 1);
                    newState.visibleBodyRowData = utils_1.getTableByStartEndColumnIndex(bodyRowData, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
                    newState.visibleBodyGroupingData = utils_1.getTableByStartEndColumnIndex(bodyGroupingData, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
                }
            }
            if (_filteredList && filteredList.length !== _filteredList.length) {
                newState.styles = utils_1.calculateDimensions(utils_1.getNode(_this.state.getRootNode), _this.state, _filteredList).styles;
            }
            _this.setState(newState);
        };
        _this.dispatch = function (dispatchType, param) {
            var _a = _this.state, _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.scrollLeft, scrollLeft = _c === void 0 ? 0 : _c, _d = _a.colGroup, colGroup = _d === void 0 ? [] : _d, getRootNode = _a.getRootNode, _e = _a.focusedRow, focusedRow = _e === void 0 ? 0 : _e, _f = _a.sortInfo, sortInfo = _f === void 0 ? {} : _f, _g = _a.options, options = _g === void 0 ? {} : _g;
            var _h = options.columnKeys, optionColumnKeys = _h === void 0 ? {} : _h;
            var rootNode = utils_1.getNode(getRootNode);
            var _j = _this.state.filteredList, filteredList = _j === void 0 ? [] : _j;
            var proc = (_k = {},
                _k[stores_1.DispatchTypes.FILTER] = function () {
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
                _k[stores_1.DispatchTypes.SORT] = function () {
                    var colIndex = param.colIndex;
                    var _a = colGroup[colIndex].key, colKey = _a === void 0 ? '' : _a;
                    var currentSortInfo = {};
                    var seq = 0;
                    var sortInfoArray = [];
                    var getValueByKey = function (_item, _key) {
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
                            sortInfoArray[currentSortInfo[k].seq] = {
                                key: k,
                                order: currentSortInfo[k].orderBy,
                            };
                        }
                    }
                    sortInfoArray = sortInfoArray.filter(function (o) { return typeof o !== 'undefined'; });
                    var i = 0, l = sortInfoArray.length, aValue, bValue;
                    var sortedList = filteredList.sort(function (a, b) {
                        for (i = 0; i < l; i++) {
                            aValue = getValueByKey(a, sortInfoArray[i].key);
                            bValue = getValueByKey(b, sortInfoArray[i].key);
                            if (typeof aValue !== typeof bValue) {
                                aValue = '' + aValue;
                                bValue = '' + bValue;
                            }
                            if (aValue < bValue) {
                                return sortInfoArray[i].order === 'asc' ? -1 : 1;
                            }
                            else if (aValue > bValue) {
                                return sortInfoArray[i].order === 'asc' ? 1 : -1;
                            }
                        }
                    });
                    _this.setStoreState({
                        sortInfo: currentSortInfo,
                        filteredList: sortedList,
                        isInlineEditing: false,
                        inlineEditingCell: {},
                    });
                },
                _k[stores_1.DispatchTypes.UPDATE] = function () {
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
                _k[stores_1.DispatchTypes.RESIZE_COL] = function () {
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
                _k);
            proc[dispatchType]();
            var _k;
        };
        return _this;
    }
    StoreProvider.getDerivedStateFromProps = function (newProps, prevState) {
        if (newProps.mounted === prevState.mounted &&
            newProps.setRootState === prevState.setRootState &&
            newProps.getRootState === prevState.getRootState &&
            newProps.getRootNode === prevState.getRootNode &&
            newProps.getClipBoardNode === prevState.getClipBoardNode &&
            newProps.rootObject === prevState.rootObject &&
            newProps.data === prevState.data &&
            newProps.filteredList === prevState.filteredList &&
            newProps.options === prevState.options &&
            newProps.height === prevState.height &&
            newProps.onBeforeEvent === prevState.onBeforeEvent &&
            newProps.onAfterEvent === prevState.onAfterEvent &&
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
            newProps.headerColGroup === prevState.headerColGroup &&
            newProps.styles === prevState.styles &&
            newProps.printStartColIndex === prevState.printStartColIndex &&
            newProps.printEndColIndex === prevState.printEndColIndex &&
            newProps.visibleHeaderColGroup === prevState.visibleHeaderColGroup &&
            newProps.visibleBodyRowData === prevState.visibleBodyRowData &&
            newProps.visibleBodyGroupingData === prevState.visibleBodyGroupingData) {
            return null;
        }
        else {
            return __assign({}, prevState, {
                mounted: newProps.mounted,
                setRootState: newProps.setRootState,
                getRootState: newProps.getRootState,
                getRootNode: newProps.getRootNode,
                getClipBoardNode: newProps.getClipBoardNode,
                rootObject: newProps.rootObject,
                data: newProps.data,
                filteredList: newProps.filteredList,
                options: newProps.options,
                height: newProps.height,
                onBeforeEvent: newProps.onBeforeEvent,
                onAfterEvent: newProps.onAfterEvent,
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
                styles: newProps.styles,
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