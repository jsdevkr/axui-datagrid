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
var DataGridBodyLoader = /** @class */ (function (_super) {
    __extends(DataGridBodyLoader, _super);
    function DataGridBodyLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataGridBodyLoader.prototype.render = function () {
        var _a = this.props, loadingData = _a.loadingData, bodyLoaderHeight = _a.bodyLoaderHeight;
        if (!loadingData) {
            return null;
        }
        return (React.createElement("div", { className: "axui-datagrid-body-loader", style: {
                height: bodyLoaderHeight,
            } },
            React.createElement("div", { "data-loader-spinner": "" }),
            React.createElement("div", { "data-loader-text": "" }, "Loading")));
    };
    return DataGridBodyLoader;
}(React.PureComponent));
exports.default = DataGridBodyLoader;
