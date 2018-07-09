"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const DataGridHeaderColumnResizer = ({ columnResizing = false, columnResizerLeft = 0, }) => columnResizing ? (React.createElement("div", { "data-column-resizer-track": true },
    React.createElement("div", { "data-column-resizing": true, style: { left: columnResizerLeft } }))) : null;
exports.default = DataGridHeaderColumnResizer;
//# sourceMappingURL=DataGridHeaderColumnResizer.js.map