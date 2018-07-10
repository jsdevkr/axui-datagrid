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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hoc_1 = require("../hoc");
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
    DataGridHeader.prototype.render = function () {
        var _a = this.props, _b = _a.scrollLeft, scrollLeft = _b === void 0 ? 0 : _b, columnResizing = _a.columnResizing, columnResizerLeft = _a.columnResizerLeft, _c = _a.styles, styles = _c === void 0 ? {} : _c;
        var _d = styles.CTInnerWidth, CTInnerWidth = _d === void 0 ? 0 : _d, _e = styles.headerHeight, headerHeight = _e === void 0 ? 0 : _e, _f = styles.asidePanelWidth, asidePanelWidth = _f === void 0 ? 0 : _f, _g = styles.frozenPanelWidth, frozenPanelWidth = _g === void 0 ? 0 : _g, _h = styles.rightPanelWidth, rightPanelWidth = _h === void 0 ? 0 : _h;
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
            width: CTInnerWidth - asidePanelWidth - frozenPanelWidth - rightPanelWidth,
            height: headerHeight,
        };
        var headerScrollStyle = {
            height: headerHeight,
            left: scrollLeft,
        };
        return (React.createElement("div", { className: 'axui-datagrid-header', style: { height: headerHeight } },
            React.createElement(DataGridHeaderPanel_1.default, { panelName: "aside-header", style: asideHeaderPanelStyle }),
            React.createElement(DataGridHeaderPanel_1.default, { panelName: "left-header", style: leftHeaderPanelStyle }),
            React.createElement("div", { "data-scroll-container": "header-scroll-container", style: headerPanelStyle },
                React.createElement(DataGridHeaderPanel_1.default, { panelName: "header-scroll", style: headerScrollStyle })),
            React.createElement(DataGridHeaderColumnResizer_1.default, { columnResizing: columnResizing, columnResizerLeft: columnResizerLeft })));
    };
    return DataGridHeader;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridHeader);
//# sourceMappingURL=DataGridHeader.js.map