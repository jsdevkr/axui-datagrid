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
var utils_1 = require("../utils");
var DataGridPage = /** @class */ (function (_super) {
    __extends(DataGridPage, _super);
    function DataGridPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataGridPage.prototype.shouldComponentUpdate = function (prevProps) {
        var _a = this.props.styles, _b = _a === void 0 ? {} : _a, _c = _b.pageHeight, pageHeight = _c === void 0 ? 0 : _c, _d = _b.horizontalScrollerWidth, horizontalScrollerWidth = _d === void 0 ? 0 : _d;
        var _e = prevProps.styles, _f = _e === void 0 ? {} : _e, _g = _f.pageHeight, _pageHeight = _g === void 0 ? 0 : _g, _h = _f.horizontalScrollerWidth, _horizontalScrollerWidth = _h === void 0 ? 0 : _h;
        if (this.props.data !== prevProps.data ||
            this.props.status !== prevProps.status ||
            pageHeight !== _pageHeight ||
            horizontalScrollerWidth !== _horizontalScrollerWidth) {
            return true;
        }
        return false;
    };
    DataGridPage.prototype.render = function () {
        var _a = this.props, _b = _a.styles, _c = _b === void 0 ? {} : _b, _d = _c.pageHeight, pageHeight = _d === void 0 ? 0 : _d, _e = _c.horizontalScrollerWidth, horizontalScrollerWidth = _e === void 0 ? 0 : _e, status = _a.status, _f = _a.data, data = _f === void 0 ? [] : _f;
        return (React.createElement("div", { className: "axui-datagrid-page", style: { height: pageHeight } },
            React.createElement("div", { className: "axui-datagrid-page-status" }, status ? status : "Total " + utils_1.formatCurrency(data.length) + " Items"),
            React.createElement("div", { style: { width: horizontalScrollerWidth } })));
    };
    return DataGridPage;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridPage);
