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
var DataGridLoader = /** @class */ (function (_super) {
    __extends(DataGridLoader, _super);
    function DataGridLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataGridLoader.prototype.render = function () {
        if (!this.props.loading) {
            return null;
        }
        return (React.createElement("div", { className: "axui-datagrid-loader" },
            React.createElement("div", { "data-loader-spinner": "" }),
            React.createElement("div", { "data-loader-text": "" }, "Loading")));
    };
    return DataGridLoader;
}(React.PureComponent));
exports.default = DataGridLoader;
