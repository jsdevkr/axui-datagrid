"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class DataGridLoader extends React.PureComponent {
    render() {
        if (!this.props.loading) {
            return null;
        }
        return (React.createElement("div", { className: "axui-datagrid-loader" },
            React.createElement("div", { "data-loader-spinner": "" }),
            React.createElement("div", { "data-loader-text": "" }, "Loading")));
    }
}
exports.default = DataGridLoader;
