"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class DataGridHeaderColumnResizer extends React.PureComponent {
    render() {
        const { columnResizing = false, columnResizerLeft = 0 } = this.props;
        return columnResizing ? (React.createElement("div", { "data-column-resizer-track": true },
            React.createElement("div", { "data-column-resizing": true, style: { left: columnResizerLeft } }))) : null;
    }
}
exports.default = DataGridHeaderColumnResizer;
