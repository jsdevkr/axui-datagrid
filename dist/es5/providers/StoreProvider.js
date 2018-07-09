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
var containers_1 = require("../containers");
var utils_1 = require("../utils");
var formatter_1 = require("../functions/formatter");
var store = {
    mounted: false,
    dragging: false,
    data: [],
    filteredList: [],
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
    StoreProvider.getDerivedStateFromProps = function (props, prevState) {
        // 만일 속성별 컨트롤을 하겠다면 여기에서.
        if (props.mounted === prevState.mounted &&
            props.setRootState === prevState.setRootState &&
            props.getRootState === prevState.getRootState &&
            props.getRootNode === prevState.getRootNode &&
            props.rootObject === prevState.rootObject &&
            props.data === prevState.data &&
            props.height === prevState.height &&
            props.columns === prevState.propColumns &&
            props.options === prevState.propOptions &&
            props.onBeforeEvent === prevState.onBeforeEvent &&
            props.onAfterEvent === prevState.onAfterEvent &&
            prevState.calculatedStyles === true) {
            return null;
        }
        // 불필요한 렌더를 막으려면 렌더링이 필요한 상활을 잘 파악 해서 처리 헤야합니다.
        // console.log('run getDerivedStateFromProps');
        var _a = prevState.options, options = _a === void 0 ? containers_1.DataGrid.defaultOptions : _a, _b = prevState.styles, styles = _b === void 0 ? containers_1.DataGrid.defaultStyles : _b;
        var _c = options.columnKeys, optionColumnKeys = _c === void 0 ? {} : _c;
        var changeState = false;
        var newState = __assign({}, prevState);
        var currentOptions = __assign({}, options);
        var currentStyles = __assign({}, styles);
        newState.mounted = true;
        if (props.setRootState && props.setRootState !== prevState.setRootState) {
            newState.setRootState = props.setRootState;
        }
        if (props.getRootState && props.getRootState !== prevState.getRootState) {
            newState.getRootState = props.getRootState;
        }
        if (props.getRootNode && props.getRootNode !== prevState.getRootNode) {
            newState.getRootNode = props.getRootNode;
        }
        if (props.data !== prevState.data) {
            changeState = true;
            newState.data = props.data || [];
            newState.filteredList =
                newState.data &&
                    newState.data.filter(function (n) {
                        return !n[optionColumnKeys.deleted || '__deleted__'];
                    });
        }
        if (props.height !== prevState.height) {
            changeState = true;
            newState.height = props.height;
        }
        if (props.options !== prevState.propOptions) {
            changeState = true;
            newState.propOptions = props.options;
            newState.options = currentOptions = utils_1.mergeAll(true, __assign({}, containers_1.DataGrid.defaultOptions), props.options);
        }
        if (props.rootObject !== prevState.rootObject) {
            changeState = true;
            newState.rootObject = props.rootObject;
        }
        if (props.columns !== prevState.propColumns ||
            props.options !== prevState.propOptions) {
            changeState = true;
            var _d = currentOptions.frozenColumnIndex, frozenColumnIndex = _d === void 0 ? containers_1.DataGrid.defaultOptions.frozenColumnIndex : _d, _e = currentOptions.body, optionsBody = _e === void 0 ? containers_1.DataGrid.defaultBody : _e;
            var _f = optionsBody.columnHeight, columnHeight = _f === void 0 ? 0 : _f;
            var headerDividedObj = void 0, bodyDividedObj = void 0;
            // convert colGroup
            newState.headerTable = utils_1.makeHeaderTable(props.columns, currentOptions);
            newState.bodyRowTable = utils_1.makeBodyRowTable(props.columns, currentOptions);
            newState.bodyRowMap = utils_1.makeBodyRowMap(newState.bodyRowTable, currentOptions);
            // header를 위한 divide
            headerDividedObj = utils_1.divideTableByFrozenColumnIndex(newState.headerTable, frozenColumnIndex || 0, currentOptions);
            // body를 위한 divide
            bodyDividedObj = utils_1.divideTableByFrozenColumnIndex(newState.bodyRowTable, frozenColumnIndex || 0, currentOptions);
            newState.asideHeaderData = headerDividedObj.asideData;
            newState.leftHeaderData = headerDividedObj.leftData;
            newState.headerData = headerDividedObj.rightData;
            newState.asideColGroup = headerDividedObj.asideColGroup;
            newState.asideBodyRowData = bodyDividedObj.asideData;
            newState.leftBodyRowData = bodyDividedObj.leftData;
            newState.bodyRowData = bodyDividedObj.rightData;
            // colGroupMap, colGroup을 만들고 틀고정 값을 기준으로 나누어 left와 나머지에 저장
            newState.colGroup = [];
            newState.colGroupMap = {};
            newState.headerTable.rows.forEach(function (row, ridx) {
                row.cols.forEach(function (col, cidx) {
                    if (newState.colGroupMap && newState.colGroup) {
                        var currentCol = {
                            key: col.key,
                            label: col.label,
                            width: col.width,
                            align: col.align,
                            colSpan: col.colSpan,
                            rowSpan: col.rowSpan,
                            colIndex: col.colIndex,
                            rowIndex: col.rowIndex,
                            formatter: col.formatter,
                            editor: col.editor,
                        };
                        newState.colGroupMap[col.colIndex || 0] = currentCol;
                        // todo : colGroupMap에 colGroup의 참조가 있는데. 문제가 없는지 확인 필요.
                        newState.colGroup.push(currentCol);
                    }
                });
            });
            newState.leftHeaderColGroup = newState.colGroup.slice(0, frozenColumnIndex);
            newState.headerColGroup = newState.colGroup.slice(frozenColumnIndex);
            // grouping과 footsum 나중에 구현.
            /*
            newState.bodyGrouping = [];
            newState.bodyGroupingTable = {};
            newState.asideBodyGroupingData = {};
            newState.leftBodyGroupingData = {};
            newState.bodyGroupingData = {};
            newState.bodyGroupingMap = {};
      
            newState.footSumColumns = [];
            newState.footSumTable = {};
            newState.leftFootSumData = {};
            newState.footSumData = {};
            */
            // styles
            currentStyles.asidePanelWidth = headerDividedObj.asidePanelWidth;
            currentStyles.bodyTrHeight =
                newState.bodyRowTable.rows.length * columnHeight;
            newState.propColumns = props.columns;
            newState.styles = currentStyles;
            newState.calculatedStyles = false;
        }
        if (props.mounted && !newState.calculatedStyles) {
            changeState = true;
            newState.calculatedStyles = true;
            var calculatedObject = utils_1.calculateDimensions(utils_1.getNode(newState.getRootNode), newState);
            newState.styles = calculatedObject.styles;
            newState.colGroup = calculatedObject.colGroup;
            newState.leftHeaderColGroup = calculatedObject.leftHeaderColGroup;
            newState.headerColGroup = calculatedObject.headerColGroup;
            var _g = newState.styles, _h = _g.CTInnerWidth, _CTInnerWidth = _h === void 0 ? 0 : _h, _j = _g.frozenPanelWidth, _frozenPanelWidth = _j === void 0 ? 0 : _j, _k = _g.asidePanelWidth, _asidePanelWidth = _k === void 0 ? 0 : _k, _l = _g.rightPanelWidth, _rightPanelWidth = _l === void 0 ? 0 : _l;
            var _m = utils_1.getPositionPrintColGroup(newState.headerColGroup, Math.abs(newState.scrollLeft || 0) + _frozenPanelWidth, Math.abs(newState.scrollLeft || 0) +
                _frozenPanelWidth +
                (_CTInnerWidth -
                    _asidePanelWidth -
                    _frozenPanelWidth -
                    _rightPanelWidth)), printStartColIndex = _m.printStartColIndex, printEndColIndex = _m.printEndColIndex;
            var _o = (newState.options || {}).frozenColumnIndex, frozenColumnIndex = _o === void 0 ? 0 : _o;
            newState.printStartColIndex = printStartColIndex;
            newState.printEndColIndex = printEndColIndex;
            newState.visibleHeaderColGroup = newState.headerColGroup.slice(printStartColIndex, printEndColIndex + 1);
            newState.visibleBodyRowData = utils_1.getTableByStartEndColumnIndex(newState.bodyRowData || { rows: [{ cols: [] }] }, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
            newState.visibleBodyGroupingData = utils_1.getTableByStartEndColumnIndex(newState.bodyGroupingData || { rows: [{ cols: [] }] }, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
        }
        return changeState ? newState : null;
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