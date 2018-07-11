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
var ReactDOM = require("react-dom");
var providers_1 = require("../providers");
var components_1 = require("../components");
var utils_1 = require("../utils");
var DataGrid = /** @class */ (function (_super) {
    __extends(DataGrid, _super);
    function DataGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootObject = {};
        _this.rootNode = null;
        _this.clipBoardNode = null;
        _this.state = {
            mounted: false,
            calculatedHeight: undefined,
        };
        _this.setRootNode = function (element) {
            _this.rootNode = ReactDOM.findDOMNode(element);
        };
        _this.setClipBoardNode = function (element) {
            _this.clipBoardNode = ReactDOM.findDOMNode(element);
        };
        /**
         * You must execute setRootState only once in the child component.
         * otherwise you will fall into a trap.
         * @param {DataGridRootState} state
         */
        _this.setRootState = function (state) {
            _this.setState(state);
        };
        _this.getRootState = function () {
            return _this.state;
        };
        _this.getRootNode = function () {
            return _this.rootNode;
        };
        _this.getClipBoardNode = function () {
            return _this.clipBoardNode;
        };
        _this.onFireEvent = function () { };
        return _this;
    }
    DataGrid.prototype.componentDidMount = function () {
        this.setState({
            mounted: true,
        });
    };
    DataGrid.prototype.render = function () {
        var mounted = this.state.mounted;
        var _a = this.props, _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.columns, columns = _c === void 0 ? [] : _c, _d = _a.options, options = _d === void 0 ? {} : _d, _e = _a.style, style = _e === void 0 ? {} : _e, onBeforeEvent = _a.onBeforeEvent, onAfterEvent = _a.onAfterEvent, _f = _a.height, height = _f === void 0 ? DataGrid.defaultHeight : _f;
        var providerProps = {
            mounted: mounted,
            setRootState: this.setRootState,
            getRootState: this.getRootState,
            getRootNode: this.getRootNode,
            getClipBoardNode: this.getClipBoardNode,
            rootObject: this.rootObject,
            data: data,
            columns: columns,
            height: height,
            options: options,
            onBeforeEvent: onBeforeEvent,
            onAfterEvent: onAfterEvent,
        };
        var gridRootStyle = utils_1.mergeAll({
            height: this.state.calculatedHeight || height,
        }, style);
        return (React.createElement(providers_1.DataGridStore.Provider, __assign({}, providerProps),
            React.createElement(components_1.DataGridEvents, { ref: this.setRootNode, style: gridRootStyle, onFireEvent: this.onFireEvent },
                React.createElement("div", { className: 'axui-datagrid-clip-board' },
                    React.createElement("textarea", { ref: this.setClipBoardNode })),
                mounted ? (React.createElement(React.Fragment, null,
                    React.createElement(components_1.DataGridHeader, null),
                    React.createElement(components_1.DataGridBody, null),
                    React.createElement(components_1.DataGridPage, null),
                    React.createElement(components_1.DataGridScroll, null),
                    React.createElement(components_1.DataGridColumnFilter, null))) : null)));
    };
    DataGrid.defaultHeight = 400;
    DataGrid.defaultColumnKeys = {
        selected: '__selected__',
        modified: '__modified__',
        deleted: '__deleted__',
        disableSelection: '__disable_selection__',
    };
    DataGrid.defaultHeader = {
        display: true,
        align: 'left',
        columnHeight: 24,
        columnPadding: 3,
        columnBorderWidth: 1,
        selector: true,
        sortable: true,
        enableFilter: true,
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
    DataGrid.defaultPageButtons = [
        { className: 'datagridIcon-first', onClick: 'PAGE_FIRST' },
        { className: 'datagridIcon-prev', onClick: 'PAGE_PREV' },
        { className: 'datagridIcon-back', onClick: 'PAGE_BACK' },
        { className: 'datagridIcon-play', onClick: 'PAGE_PLAY' },
        { className: 'datagridIcon-next', onClick: 'PAGE_NEXT' },
        { className: 'datagridIcon-last', onClick: 'PAGE_LAST' },
    ];
    DataGrid.defaultPage = {
        buttonsContainerWidth: 150,
        buttons: DataGrid.defaultPageButtons,
        buttonHeight: 16,
        height: 20,
    };
    DataGrid.defaultScroller = {
        size: 14,
        arrowSize: 14,
        barMinSize: 12,
        padding: 3,
        disabledVerticalScroll: false,
    };
    DataGrid.defaultOptions = {
        frozenColumnIndex: 0,
        frozenRowIndex: 0,
        showLineNumber: true,
        showRowSelector: false,
        multipleSelect: true,
        columnMinWidth: 100,
        lineNumberColumnWidth: 60,
        rowSelectorColumnWidth: 28,
        remoteSort: false,
        asidePanelWidth: 0,
        header: DataGrid.defaultHeader,
        body: DataGrid.defaultBody,
        page: DataGrid.defaultPage,
        scroller: DataGrid.defaultScroller,
        columnKeys: DataGrid.defaultColumnKeys,
    };
    DataGrid.defaultStyles = {
        calculatedHeight: null,
        asidePanelWidth: 0,
        frozenPanelWidth: 0,
        bodyTrHeight: 0,
        elWidth: 0,
        elHeight: 0,
        CTInnerWidth: 0,
        CTInnerHeight: 0,
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
        pageButtonsContainerWidth: 0,
    };
    DataGrid.defaultThrottleWait = 100;
    return DataGrid;
}(React.Component));
exports.default = DataGrid;
//# sourceMappingURL=DataGrid.js.map