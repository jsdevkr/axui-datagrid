"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const DataGridLoader = props => {
    if (!props.loading) {
        return null;
    }
    return (React.createElement("div", { className: "axui-datagrid-loader" },
        React.createElement("div", { "data-loader-spinner": "" }),
        React.createElement("div", { "data-loader-text": "" }, "Loading")));
};
exports.default = DataGridLoader;
//# sourceMappingURL=DataGridLoader.js.map