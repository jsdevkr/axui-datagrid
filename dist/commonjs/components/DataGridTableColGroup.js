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
var DataGridTableColGroup = /** @class */ (function (_super) {
    __extends(DataGridTableColGroup, _super);
    function DataGridTableColGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataGridTableColGroup.prototype.render = function () {
        return (React.createElement("colgroup", null,
            this.props.panelColGroup.map(function (col, ci) { return (React.createElement("col", { key: ci, style: { width: col._width + 'px' } })); }),
            React.createElement("col", null)));
    };
    return DataGridTableColGroup;
}(React.PureComponent));
exports.default = DataGridTableColGroup;
