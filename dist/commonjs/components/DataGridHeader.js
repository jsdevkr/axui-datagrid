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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hoc_1 = require("../hoc");
var _enums_1 = require("../common/@enums");
var DataGridHeaderPanel_1 = require("./DataGridHeaderPanel");
var DataGridHeaderColumnResizer_1 = require("./DataGridHeaderColumnResizer");
var DataGridHeader = /** @class */ (function (_super) {
    __extends(DataGridHeader, _super);
    function DataGridHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            columnResizing: false,
            columnResizerLeft: 0,
        };
        return _this;
    }
    DataGridHeader.prototype.shouldComponentUpdate = function (pProps) {
        var _a = this.props, _b = _a.scrollLeft, scrollLeft = _b === void 0 ? 0 : _b, columnResizing = _a.columnResizing, columnResizerLeft = _a.columnResizerLeft, _c = _a.styles, _d = _c === void 0 ? {} : _c, _e = _d.elWidth, elWidth = _e === void 0 ? 0 : _e, _f = _d.headerHeight, headerHeight = _f === void 0 ? 0 : _f, _g = _d.asidePanelWidth, asidePanelWidth = _g === void 0 ? 0 : _g, _h = _d.frozenPanelWidth, frozenPanelWidth = _h === void 0 ? 0 : _h, _j = _d.rightPanelWidth, rightPanelWidth = _j === void 0 ? 0 : _j;
        var _k = pProps.scrollLeft, _scrollLeft = _k === void 0 ? 0 : _k, _columnResizing = pProps.columnResizing, _columnResizerLeft = pProps.columnResizerLeft, _l = pProps.styles, _m = _l === void 0 ? {} : _l, _o = _m.elWidth, _elWidth = _o === void 0 ? 0 : _o, _p = _m.headerHeight, _headerHeight = _p === void 0 ? 0 : _p, _q = _m.asidePanelWidth, _asidePanelWidth = _q === void 0 ? 0 : _q, _r = _m.frozenPanelWidth, _frozenPanelWidth = _r === void 0 ? 0 : _r, _s = _m.rightPanelWidth, _rightPanelWidth = _s === void 0 ? 0 : _s;
        if (scrollLeft !== _scrollLeft ||
            columnResizing !== _columnResizing ||
            columnResizerLeft !== _columnResizerLeft ||
            elWidth !== _elWidth ||
            headerHeight !== _headerHeight ||
            asidePanelWidth !== _asidePanelWidth ||
            frozenPanelWidth !== _frozenPanelWidth ||
            rightPanelWidth !== _rightPanelWidth) {
            return true;
        }
        return false;
    };
    DataGridHeader.prototype.render = function () {
        var _a = this.props, _b = _a.scrollLeft, scrollLeft = _b === void 0 ? 0 : _b, columnResizing = _a.columnResizing, columnResizerLeft = _a.columnResizerLeft, _c = _a.styles, _d = _c === void 0 ? {} : _c, _e = _d.elWidth, elWidth = _e === void 0 ? 0 : _e, _f = _d.headerHeight, headerHeight = _f === void 0 ? 0 : _f, _g = _d.asidePanelWidth, asidePanelWidth = _g === void 0 ? 0 : _g, _h = _d.frozenPanelWidth, frozenPanelWidth = _h === void 0 ? 0 : _h, _j = _d.rightPanelWidth, rightPanelWidth = _j === void 0 ? 0 : _j;
        var asideHeaderPanelStyle = {
            left: 0,
            width: asidePanelWidth,
            height: headerHeight,
        };
        var leftHeaderPanelStyle = {
            left: asidePanelWidth,
            width: frozenPanelWidth,
            height: headerHeight,
        };
        var headerPanelStyle = {
            left: frozenPanelWidth + asidePanelWidth,
            width: elWidth - asidePanelWidth - frozenPanelWidth - rightPanelWidth,
            height: headerHeight,
        };
        var headerScrollStyle = {
            height: headerHeight,
            left: scrollLeft,
        };
        return (React.createElement("div", { className: 'axui-datagrid-header', style: { height: headerHeight } },
            asidePanelWidth !== 0 && (React.createElement(DataGridHeaderPanel_1.default, { panelName: _enums_1.DataGridEnums.PanelNames.ASIDE_HEADER, style: asideHeaderPanelStyle })),
            frozenPanelWidth !== 0 && (React.createElement(DataGridHeaderPanel_1.default, { panelName: _enums_1.DataGridEnums.PanelNames.LEFT_HEADER, style: leftHeaderPanelStyle })),
            React.createElement("div", { "data-scroll-container": "header-scroll-container", style: headerPanelStyle },
                React.createElement(DataGridHeaderPanel_1.default, { panelName: _enums_1.DataGridEnums.PanelNames.HEADER_SCROLL, style: headerScrollStyle })),
            columnResizing && (React.createElement(DataGridHeaderColumnResizer_1.default, { columnResizing: columnResizing, columnResizerLeft: columnResizerLeft }))));
    };
    return DataGridHeader;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridHeader);
