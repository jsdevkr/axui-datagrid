"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
class DataGridPage extends React.Component {
    shouldComponentUpdate(prevProps) {
        const { styles: { pageHeight = 0, horizontalScrollerWidth = 0 } = {}, } = this.props;
        const { styles: { pageHeight: _pageHeight = 0, horizontalScrollerWidth: _horizontalScrollerWidth = 0, } = {}, } = prevProps;
        if (this.props.data !== prevProps.data ||
            this.props.status !== prevProps.status ||
            pageHeight !== _pageHeight ||
            horizontalScrollerWidth !== _horizontalScrollerWidth) {
            return true;
        }
        return false;
    }
    render() {
        const { styles: { pageHeight = 0, horizontalScrollerWidth = 0 } = {}, status, data = [], } = this.props;
        return (React.createElement("div", { className: "axui-datagrid-page", style: { height: pageHeight } },
            React.createElement("div", { className: "axui-datagrid-page-status" }, status ? status : `Total ${utils_1.formatCurrency(data.length)} Items`),
            React.createElement("div", { style: { width: horizontalScrollerWidth } })));
    }
}
exports.default = hoc_1.connectStore(DataGridPage);
