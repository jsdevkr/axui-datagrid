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
var DataGridBodyLoader = /** @class */ (function (_super) {
    __extends(DataGridBodyLoader, _super);
    function DataGridBodyLoader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        return _this;
    }
    DataGridBodyLoader.prototype.render = function () {
        var _a = this.props, loadingData = _a.loadingData, _b = _a.options, options = _b === void 0 ? {} : _b;
        var _c = options.bodyLoaderHeight, bodyLoaderHeight = _c === void 0 ? 0 : _c;
        if (!loadingData) {
            return null;
        }
        var loaderStyle = {
            height: bodyLoaderHeight,
        };
        return (React.createElement("div", { className: "axui-datagrid-body-loader", style: loaderStyle },
            React.createElement("div", { "data-loader-spinner": "" }),
            React.createElement("div", { "data-loader-text": "" }, "Loading")));
    };
    return DataGridBodyLoader;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridBodyLoader);
//# sourceMappingURL=DataGridBodyLoader.js.map