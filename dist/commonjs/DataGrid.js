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
        _this.state = {
            mounted: false,
            autofit: false,
            doneAutofit: false,
            autofitAsideWidth: 100,
            autofitColGroup: [],
            headerTable: { rows: [] },
            bodyRowTable: { rows: [] },
            bodyRowMap: {},
            asideHeaderData: { rows: [] },
            leftHeaderData: { rows: [] },
            headerData: { rows: [] },
            asideBodyRowData: { rows: [] },
            leftBodyRowData: { rows: [] },
            bodyRowData: { rows: [] },
            colGroupMap: {},
            asideColGroup: [],
            colGroup: [],
            footSumColumns: [],
            footSumTable: { rows: [] },
            leftFootSumData: { rows: [] },
            footSumData: { rows: [] },
        };
        _this.getOptions = function (options) {
            // todo
            // options.lineNumberColumnWidth = autofitAsideWidth;
            return __assign({}, DataGrid.defaultOptions, options, { header: __assign({}, DataGrid.defaultOptions.header, options.header), body: __assign({}, DataGrid.defaultOptions.body, options.body), page: __assign({}, DataGrid.defaultOptions.page, options.page), scroller: __assign({}, DataGrid.defaultOptions.scroller, options.scroller), columnKeys: __assign({}, DataGrid.defaultOptions.columnKeys, options.columnKeys) });
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
        _this.getColumnData = function (columns, footSum, options) {
            var _a = options.frozenColumnIndex, frozenColumnIndex = _a === void 0 ? 0 : _a;
            var _b = _this.state, autofit = _b.autofit, doneAutofit = _b.doneAutofit, autofitColGroup = _b.autofitColGroup;
            var data = {};
            data.headerTable = utils_1.makeHeaderTable(columns, options);
            data.bodyRowTable = utils_1.makeBodyRowTable(columns, options);
            data.bodyRowMap = utils_1.makeBodyRowMap(data.bodyRowTable || { rows: [] }, options);
            // header를 위한 divide
            var headerDividedObj = utils_1.divideTableByFrozenColumnIndex(data.headerTable || { rows: [] }, frozenColumnIndex, options);
            // body를 위한 divide
            var bodyDividedObj = utils_1.divideTableByFrozenColumnIndex(data.bodyRowTable || { rows: [] }, frozenColumnIndex, options);
            data.asideHeaderData = headerDividedObj.asideData;
            data.leftHeaderData = headerDividedObj.leftData;
            data.headerData = headerDividedObj.rightData;
            data.asideBodyRowData = bodyDividedObj.asideData;
            data.leftBodyRowData = bodyDividedObj.leftData;
            data.bodyRowData = bodyDividedObj.rightData;
            // colGroupMap, colGroup을 만들고 틀고정 값을 기준으로 나누어 left와 나머지에 저장
            data.colGroupMap = {};
            if (data.headerTable) {
                data.headerTable.rows.forEach(function (row, ridx) {
                    row.cols.forEach(function (col, cidx) {
                        if (data.colGroupMap) {
                            var colWidth = col.width; // columns로부터 전달받은 너비값.
                            if (autofit && doneAutofit && autofitColGroup) {
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
                            data.colGroupMap[col.colIndex || 0] = currentCol;
                        }
                    });
                });
            }
            data.asideColGroup = headerDividedObj.asideColGroup;
            data.colGroup = Object.values(data.colGroupMap);
            // colGroup이 정의되면 footSum
            data.footSumColumns = __spread(footSum);
            data.footSumTable = utils_1.makeFootSumTable(footSum, data.colGroup, options);
            var footSumDividedObj = utils_1.divideTableByFrozenColumnIndex(data.footSumTable || { rows: [] }, frozenColumnIndex, options);
            data.leftFootSumData = footSumDividedObj.leftData;
            data.footSumData = footSumDividedObj.rightData;
            return data;
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
        var _a = this.props, columns = _a.columns, _b = _a.footSum, footSum = _b === void 0 ? [] : _b, _c = _a.options, options = _c === void 0 ? {} : _c;
        var newOptions = this.getOptions(options);
        var columnData = this.getColumnData(columns, footSum, newOptions);
        this.setState(__assign({ mounted: true }, columnData, { options: newOptions }));
    };
    DataGrid.prototype.componentDidUpdate = function (prevProps) {
        var _columns = prevProps.columns, _footSum = prevProps.footSum, _options = prevProps.options;
        var _a = this.props, columns = _a.columns, footSum = _a.footSum, options = _a.options;
        if (_columns !== columns || _footSum !== footSum || _options !== options) {
            var newOptions = this.getOptions(options || {});
            var columnData = this.getColumnData(columns, footSum || [], newOptions);
            this.setState(__assign({}, columnData, { options: newOptions, doneAutofit: false }));
        }
    };
    // shouldComponentUpdate(prevProps: IProps) {
    //   if (
    //     prevProps.data === this.props.data &&
    //     prevProps.columns === this.props.columns &&
    //     prevProps.footSum === this.props.footSum &&
    //     prevProps.width === this.props.width &&
    //     prevProps.height === this.props.height &&
    //     prevProps.style === this.props.style &&
    //     prevProps.options === this.props.options &&
    //     prevProps.status === this.props.status &&
    //     prevProps.loading === this.props.loading &&
    //     prevProps.loadingData === this.props.loadingData &&
    //     prevProps.selectedRowKeys === this.props.selectedRowKeys &&
    //     prevProps.selection === this.props.selection &&
    //     prevProps.scrollLeft === this.props.scrollLeft &&
    //     prevProps.scrollTop === this.props.scrollTop &&
    //     prevProps.onBeforeEvent === this.props.onBeforeEvent &&
    //     prevProps.onScroll === this.props.onScroll &&
    //     prevProps.onScrollEnd === this.props.onScrollEnd &&
    //     prevProps.onChangeScrollSize === this.props.onChangeScrollSize &&
    //     prevProps.onChangeSelection === this.props.onChangeSelection &&
    //     prevProps.onChangeSelectedRow === this.props.onChangeSelectedRow &&
    //     prevProps.onRightClick === this.props.onRightClick
    //   ) {
    //     return false;
    //   }
    //   return true;
    // }
    DataGrid.prototype.render = function () {
        var _a = this.state, mounted = _a.mounted, doneAutofit = _a.doneAutofit, autofitAsideWidth = _a.autofitAsideWidth, autofitColGroup = _a.autofitColGroup, headerTable = _a.headerTable, bodyRowTable = _a.bodyRowTable, bodyRowMap = _a.bodyRowMap, asideHeaderData = _a.asideHeaderData, leftHeaderData = _a.leftHeaderData, headerData = _a.headerData, asideBodyRowData = _a.asideBodyRowData, leftBodyRowData = _a.leftBodyRowData, bodyRowData = _a.bodyRowData, colGroupMap = _a.colGroupMap, asideColGroup = _a.asideColGroup, colGroup = _a.colGroup, footSumColumns = _a.footSumColumns, footSumTable = _a.footSumTable, leftFootSumData = _a.leftFootSumData, footSumData = _a.footSumData, options = _a.options;
        var _b = this.props, _c = _b.loading, loading = _c === void 0 ? false : _c, _d = _b.loadingData, loadingData = _d === void 0 ? false : _d, _e = _b.data, data = _e === void 0 ? [] : _e, width = _b.width, _f = _b.height, height = _f === void 0 ? DataGrid.defaultHeight : _f, selectedRowKeys = _b.selectedRowKeys, selection = _b.selection, status = _b.status, scrollLeft = _b.scrollLeft, scrollTop = _b.scrollTop, onBeforeEvent = _b.onBeforeEvent, onScroll = _b.onScroll, onScrollEnd = _b.onScrollEnd, onChangeScrollSize = _b.onChangeScrollSize, onChangeSelection = _b.onChangeSelection, onChangeSelectedRow = _b.onChangeSelectedRow, onRightClick = _b.onRightClick, _g = _b.style, style = _g === void 0 ? {} : _g;
        var gridRootStyle = __assign({
            height: height,
            width: width,
        }, style);
        var providerProps = {
            loading: loading,
            loadingData: loadingData,
            data: data,
            width: width,
            height: height,
            selectedRowKeys: selectedRowKeys,
            selection: selection,
            status: status,
            scrollLeft: scrollLeft,
            scrollTop: scrollTop ? -Number(scrollTop) : 0,
            autofitColGroup: autofitColGroup,
            headerTable: headerTable,
            bodyRowTable: bodyRowTable,
            bodyRowMap: bodyRowMap,
            asideHeaderData: asideHeaderData,
            leftHeaderData: leftHeaderData,
            headerData: headerData,
            asideBodyRowData: asideBodyRowData,
            leftBodyRowData: leftBodyRowData,
            bodyRowData: bodyRowData,
            colGroupMap: colGroupMap,
            asideColGroup: asideColGroup,
            colGroup: colGroup,
            footSumColumns: footSumColumns,
            footSumTable: footSumTable,
            leftFootSumData: leftFootSumData,
            footSumData: footSumData,
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
            options: options,
        };
        return (React.createElement(providers_1.DataGridStore.Provider, __assign({}, providerProps),
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
