"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var DataGridBodyLoader = function (props) {
    var loadingData = props.loadingData, bodyLoaderHeight = props.bodyLoaderHeight;
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
//# sourceMappingURL=DataGridBodyLoader.js.map