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
var providers_1 = require("./providers");
var components_1 = require("./components");
var utils_1 = require("./utils");
var DataGridAutofitHelper_1 = require("./components/DataGridAutofitHelper");
var DataGrid = /** @class */ (function (_super) {
    __extends(DataGrid, _super);
    function DataGrid(props) {
        var _this = _super.call(this, props) || this;
        _this.rootObject = {};
        _this.scrollLeft = 0;
        _this.scrollTop = 0;
        _this.state = {
            mounted: false,
            autofit: false,
            doneAutofit: false,
            autofitAsideWidth: 100,
            autofitColGroup: [],
        };
        _this.getOptions = function (options) {
            return __assign({}, DataGrid.defaultOptions, options, { header: __assign({}, DataGrid.defaultOptions.header, options.header), body: __assign({}, DataGrid.defaultOptions.body, options.body), page: __assign({}, DataGrid.defaultOptions.page, options.page), scroller: __assign({}, DataGrid.defaultOptions.scroller, options.scroller), columnKeys: __assign({}, DataGrid.defaultOptions.columnKeys, options.columnKeys) });
        };
        _this.getProviderProps = function (storeProps) {
            var _a = _this.state, autofit = _a.autofit, doneAutofit = _a.doneAutofit, autofitAsideWidth = _a.autofitAsideWidth, autofitColGroup = _a.autofitColGroup;
            var _b = _this.props, _c = _b.columns, columns = _c === void 0 ? [] : _c, footSum = _b.footSum;
            var _d = storeProps.options, options = _d === void 0 ? {} : _d;
            var _e = options.frozenColumnIndex, frozenColumnIndex = _e === void 0 ? DataGrid.defaultOptions.frozenColumnIndex || 0 : _e, _f = options.body, optionsBody = _f === void 0 ? __assign({}, DataGrid.defaultBody) : _f;
            var _g = optionsBody.columnHeight, columnHeight = _g === void 0 ? 0 : _g;
            if (autofit && doneAutofit) {
                options.lineNumberColumnWidth = autofitAsideWidth;
            }
            // StoreProvider에 전달해야 하는 상태를 newState에 담는 작업을 시작합니다.
            var newStoreProps = __assign({}, storeProps);
            // options.showRowSelector 체크
            if (newStoreProps.rowSelector) {
                if (typeof newStoreProps.rowSelector.show === 'undefined') {
                    newStoreProps.rowSelector.show = true;
                }
                if (newStoreProps.options && newStoreProps.rowSelector.show) {
                    newStoreProps.options.showRowSelector = true;
                }
            }
            if (doneAutofit) {
                newStoreProps.autofitColGroup = autofitColGroup;
            }
            // convert colGroup
            newStoreProps.headerTable = utils_1.makeHeaderTable(columns, options);
            newStoreProps.bodyRowTable = utils_1.makeBodyRowTable(columns, options);
            newStoreProps.bodyRowMap = utils_1.makeBodyRowMap(newStoreProps.bodyRowTable || { rows: [] }, options);
            // header를 위한 divide
            var headerDividedObj = utils_1.divideTableByFrozenColumnIndex(newStoreProps.headerTable || { rows: [] }, frozenColumnIndex, options);
            // body를 위한 divide
            var bodyDividedObj = utils_1.divideTableByFrozenColumnIndex(newStoreProps.bodyRowTable || { rows: [] }, frozenColumnIndex, options);
            newStoreProps.asideHeaderData = headerDividedObj.asideData;
            newStoreProps.leftHeaderData = headerDividedObj.leftData;
            newStoreProps.headerData = headerDividedObj.rightData;
            newStoreProps.asideBodyRowData = bodyDividedObj.asideData;
            newStoreProps.leftBodyRowData = bodyDividedObj.leftData;
            newStoreProps.bodyRowData = bodyDividedObj.rightData;
            // colGroupMap, colGroup을 만들고 틀고정 값을 기준으로 나누어 left와 나머지에 저장
            newStoreProps.colGroupMap = {};
            if (newStoreProps.headerTable) {
                newStoreProps.headerTable.rows.forEach(function (row, ridx) {
                    row.cols.forEach(function (col, cidx) {
                        if (newStoreProps.colGroupMap) {
                            var colWidth = col.width; // columns로부터 전달받은 너비값.
                            if (autofit && doneAutofit) {
                                if (utils_1.isNumber(col.colIndex) &&
                                    autofitColGroup[Number(col.colIndex)]) {
                                    colWidth = autofitColGroup[Number(col.colIndex)].width;
                                }
                            }
                            var currentCol = {
                                key: col.key,
                                label: col.label,
                                width: colWidth,
                                align: col.align,
                                colSpan: col.colSpan,
                                rowSpan: col.rowSpan,
                                colIndex: col.colIndex,
                                rowIndex: col.rowIndex,
                                formatter: col.formatter,
                                editor: col.editor,
                            };
                            newStoreProps.colGroupMap[col.colIndex || 0] = currentCol;
                        }
                    });
                });
            }
            newStoreProps.asideColGroup = headerDividedObj.asideColGroup;
            newStoreProps.colGroup = Object.values(newStoreProps.colGroupMap);
            // console.log(autofitColGroup, newStoreProps.colGroup);
            // colGroup이 정의되면 footSum
            if (footSum) {
                newStoreProps.footSumColumns = __spread(footSum);
                newStoreProps.footSumTable = utils_1.makeFootSumTable(footSum, newStoreProps.colGroup, options);
                var footSumDividedObj = utils_1.divideTableByFrozenColumnIndex(newStoreProps.footSumTable || { rows: [] }, frozenColumnIndex, options);
                newStoreProps.leftFootSumData = footSumDividedObj.leftData;
                newStoreProps.footSumData = footSumDividedObj.rightData;
            }
            // provider props에서 styles 속성 제외 styles는 내부 state에 의해 관리 되도록 변경
            return newStoreProps;
        };
        _this.applyAutofit = function (params) {
            var autofit = !!(_this.props.options && _this.props.options.autofitColumns);
            _this.setState({
                autofit: autofit,
                doneAutofit: true,
                autofitAsideWidth: params.asideWidth,
                autofitColGroup: params.colGroup,
            });
            // render가 다시되고 > getProviderProps이 다시 실행됨 (getProviderProps에서 doneAutofit인지 판단하여 autofitColGroup의 width값을 colGroup에 넣어주면 됨.)
        };
        _this.rootNode = React.createRef();
        _this.clipBoardNode = React.createRef();
        return _this;
        // console.log(
        //   `${new Date().toLocaleTimeString()}:${new Date().getMilliseconds()}`,
        //   'datagrid constructor',
        // );
    }
    DataGrid.prototype.componentDidMount = function () {
        this.setState({
            mounted: true,
        });
    };
    DataGrid.prototype.componentDidUpdate = function (prevProps) {
        var autofitColumns = prevProps.options && prevProps.options.autofitColumns;
        var _autofitColumns = this.props.options && this.props.options.autofitColumns;
        var columnChanged = prevProps.columns !== this.props.columns;
        if (autofitColumns !== _autofitColumns || columnChanged) {
            this.setState({ doneAutofit: false });
        }
    };
    DataGrid.prototype.render = function () {
        var _a = this.state, mounted = _a.mounted, doneAutofit = _a.doneAutofit;
        var _b = this.props, _c = _b.data, data = _c === void 0 ? [] : _c, status = _b.status, _d = _b.options, options = _d === void 0 ? {} : _d, _e = _b.style, style = _e === void 0 ? {} : _e, onBeforeEvent = _b.onBeforeEvent, onScroll = _b.onScroll, onScrollEnd = _b.onScrollEnd, onChangeScrollSize = _b.onChangeScrollSize, onChangeSelection = _b.onChangeSelection, onChangeSelectedRow = _b.onChangeSelectedRow, onRightClick = _b.onRightClick, _f = _b.height, height = _f === void 0 ? DataGrid.defaultHeight : _f, width = _b.width, _g = _b.loading, loading = _g === void 0 ? false : _g, _h = _b.loadingData, loadingData = _h === void 0 ? false : _h, selection = _b.selection, rowSelector = _b.rowSelector, scrollLeft = _b.scrollLeft, scrollTop = _b.scrollTop;
        var gridRootStyle = __assign({
            height: height,
            width: width,
        }, style);
        return (React.createElement(providers_1.DataGridStore.Provider, __assign({}, this.getProviderProps({
            loading: loading,
            loadingData: loadingData,
            data: data,
            width: width,
            height: height,
            selection: selection,
            rowSelector: rowSelector,
            status: status,
            options: this.getOptions(options),
            scrollLeft: scrollLeft,
            scrollTop: scrollTop ? -Number(scrollTop) : 0,
            rootNode: this.rootNode,
            clipBoardNode: this.clipBoardNode,
            rootObject: this.rootObject,
            onBeforeEvent: onBeforeEvent,
            onScroll: onScroll,
            onScrollEnd: onScrollEnd,
            onChangeScrollSize: onChangeScrollSize,
            onChangeSelection: onChangeSelection,
            onChangeSelectedRow: onChangeSelectedRow,
            onRightClick: onRightClick,
        })),
            React.createElement("div", { tabIndex: -1, ref: this.rootNode, className: "axui-datagrid", style: gridRootStyle },
                React.createElement("div", { className: "axui-datagrid-clip-board" },
                    React.createElement("textarea", { ref: this.clipBoardNode })),
                mounted && (React.createElement(components_1.DataGridEvents, null,
                    React.createElement(components_1.DataGridHeader, null),
                    React.createElement(components_1.DataGridBody, null),
                    React.createElement(components_1.DataGridPage, null),
                    React.createElement(components_1.DataGridScroll, null),
                    React.createElement(components_1.DataGridLoader, { loading: loading }))),
                !doneAutofit && (React.createElement(DataGridAutofitHelper_1.default, { applyAutofit: this.applyAutofit })))));
    };
    DataGrid.defaultHeight = 400;
    DataGrid.defaultColumnKeys = {
        selected: '_selected_',
        modified: '_modified_',
        deleted: '_deleted_',
        disableSelection: '_disable_selection_',
    };
    DataGrid.defaultHeader = {
        display: true,
        align: 'left',
        columnHeight: 24,
        columnPadding: 3,
        columnBorderWidth: 1,
        selector: true,
        sortable: true,
        clickAction: 'sort',
    };
    DataGrid.defaultBody = {
        align: 'left',
        columnHeight: 24,
        columnPadding: 3,
        columnBorderWidth: 1,
        grouping: false,
        mergeCells: false,
    };
    // static defaultPageButtons: IDataGrid.IOptionPageButton[] = [
    //   { className: 'datagridIcon-first', onClick: 'PAGE_FIRST' },
    //   { className: 'datagridIcon-prev', onClick: 'PAGE_PREV' },
    //   { className: 'datagridIcon-back', onClick: 'PAGE_BACK' },
    //   { className: 'datagridIcon-play', onClick: 'PAGE_PLAY' },
    //   { className: 'datagridIcon-next', onClick: 'PAGE_NEXT' },
    //   { className: 'datagridIcon-last', onClick: 'PAGE_LAST' },
    // ];
    DataGrid.defaultPage = {
        height: 20,
    };
    DataGrid.defaultScroller = {
        theme: 'default',
        width: 14,
        height: 14,
        arrowSize: 14,
        barMinSize: 12,
        padding: 3,
        horizontalScrollerWidth: 30,
    };
    DataGrid.defaultOptions = {
        frozenColumnIndex: 0,
        frozenRowIndex: 0,
        showLineNumber: true,
        multipleSelect: true,
        columnMinWidth: 100,
        lineNumberColumnWidth: 60,
        rowSelectorColumnWidth: 28,
        remoteSort: false,
        header: DataGrid.defaultHeader,
        body: DataGrid.defaultBody,
        page: DataGrid.defaultPage,
        scroller: DataGrid.defaultScroller,
        columnKeys: DataGrid.defaultColumnKeys,
        bodyLoaderHeight: 100,
        autofitColumns: false,
        autofitColumnWidthMin: 50,
        autofitColumnWidthMax: 300,
    };
    DataGrid.defaultStyles = {
        asidePanelWidth: 0,
        frozenPanelWidth: 0,
        bodyTrHeight: 0,
        elWidth: 0,
        elHeight: 0,
        rightPanelWidth: 0,
        headerHeight: 0,
        bodyHeight: 0,
        frozenPanelHeight: 0,
        footSumHeight: 0,
        pageHeight: 0,
        verticalScrollerWidth: 0,
        horizontalScrollerHeight: 0,
        scrollContentContainerHeight: 0,
        scrollContentHeight: 0,
        scrollContentContainerWidth: 0,
        scrollContentWidth: 0,
        verticalScrollerHeight: 0,
        verticalScrollBarHeight: 0,
        horizontalScrollerWidth: 0,
        horizontalScrollBarWidth: 0,
        scrollerPadding: 0,
        scrollerArrowSize: 0,
    };
    DataGrid.defaultThrottleWait = 100;
    return DataGrid;
}(React.Component));
exports.default = DataGrid;
