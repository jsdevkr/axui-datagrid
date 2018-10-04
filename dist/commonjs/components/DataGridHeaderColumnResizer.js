"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var DataGridHeaderColumnResizer = function (_a) {
    var _b = _a.columnResizing, columnResizing = _b === void 0 ? false : _b, _c = _a.columnResizerLeft, columnResizerLeft = _c === void 0 ? 0 : _c;
    return columnResizing ? (React.createElement("div", { "data-column-resizer-track": true },
        React.createElement("div", { "data-column-resizing": true, style: { left: columnResizerLeft } }))) : null;
};
exports.default = DataGridHeaderColumnResizer;
