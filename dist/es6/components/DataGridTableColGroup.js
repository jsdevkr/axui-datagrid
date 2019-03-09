"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class DataGridTableColGroup extends React.PureComponent {
    render() {
        return (React.createElement("colgroup", null,
            this.props.panelColGroup.map((col, ci) => (React.createElement("col", { key: ci, style: { width: col._width + 'px' } }))),
            React.createElement("col", null)));
    }
}
exports.default = DataGridTableColGroup;
