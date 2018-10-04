"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const DataGridBodyLoader = props => {
    const { loadingData, bodyLoaderHeight } = props;
    if (!loadingData) {
        return null;
    }
    return (React.createElement("div", { className: "axui-datagrid-body-loader", style: {
            height: bodyLoaderHeight,
        } },
        React.createElement("div", { "data-loader-spinner": "" }),
        React.createElement("div", { "data-loader-text": "" }, "Loading")));
};
exports.default = DataGridBodyLoader;
