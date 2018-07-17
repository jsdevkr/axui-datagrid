"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
class DataGridLoader extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
    }
    render() {
        const { loading } = this.props;
        if (!loading) {
            return null;
        }
        return (React.createElement("div", { className: "axui-datagrid-loader" },
            React.createElement("div", { "data-loader-spinner": "" }),
            React.createElement("div", { "data-loader-text": "" }, "Loading")));
    }
}
exports.default = hoc_1.connectStore(DataGridLoader);
//# sourceMappingURL=DataGridLoader.js.map