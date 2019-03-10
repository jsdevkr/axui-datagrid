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
var DataGridHeaderColumnResizer = /** @class */ (function (_super) {
    __extends(DataGridHeaderColumnResizer, _super);
    function DataGridHeaderColumnResizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataGridHeaderColumnResizer.prototype.render = function () {
        var _a = this.props, _b = _a.columnResizing, columnResizing = _b === void 0 ? false : _b, _c = _a.columnResizerLeft, columnResizerLeft = _c === void 0 ? 0 : _c;
        return columnResizing ? (React.createElement("div", { "data-column-resizer-track": true },
            React.createElement("div", { "data-column-resizing": true, style: { left: columnResizerLeft } }))) : null;
    };
    return DataGridHeaderColumnResizer;
}(React.PureComponent));
exports.default = DataGridHeaderColumnResizer;
