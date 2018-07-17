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
var DataGridLoader = /** @class */ (function (_super) {
    __extends(DataGridLoader, _super);
    function DataGridLoader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        return _this;
    }
    DataGridLoader.prototype.render = function () {
        var loading = this.props.loading;
        if (!loading) {
            return null;
        }
        return (React.createElement("div", { className: "axui-datagrid-loader" },
            React.createElement("div", { "data-loader-spinner": "" }),
            React.createElement("div", { "data-loader-text": "" }, "Loading")));
    };
    return DataGridLoader;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridLoader);
//# sourceMappingURL=DataGridLoader.js.map