"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var DataGridLoader = function (props) {
    if (!props.loading) {
        return null;
    }
    return (React.createElement("div", { className: "axui-datagrid-loader" },
        React.createElement("div", { "data-loader-spinner": "" }),
        React.createElement("div", { "data-loader-text": "" }, "Loading")));
};
exports.default = DataGridLoader;
