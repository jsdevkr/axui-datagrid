"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
class DataGridBodyLoader extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
    }
    render() {
        const { loadingData, options = {} } = this.props;
        const { bodyLoaderHeight = 0 } = options;
        if (!loadingData) {
            return null;
        }
        const loaderStyle = {
            height: bodyLoaderHeight,
        };
        return (React.createElement("div", { className: "axui-datagrid-body-loader", style: loaderStyle },
            React.createElement("div", { "data-loader-spinner": "" }),
            React.createElement("div", { "data-loader-text": "" }, "Loading")));
    }
}
exports.default = hoc_1.connectStore(DataGridBodyLoader);
//# sourceMappingURL=DataGridBodyLoader.js.map