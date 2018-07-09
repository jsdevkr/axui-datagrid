"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const DataGridHeaderPanel_1 = require("./DataGridHeaderPanel");
const DataGridHeaderColumnResizer_1 = require("./DataGridHeaderColumnResizer");
class DataGridHeader extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            columnResizing: false,
            columnResizerLeft: 0,
        };
    }
    render() {
        const { scrollLeft = 0, columnResizing, columnResizerLeft, styles = {}, } = this.props;
        const { CTInnerWidth = 0, headerHeight = 0, asidePanelWidth = 0, frozenPanelWidth = 0, rightPanelWidth = 0, } = styles;
        let asideHeaderPanelStyle = {
            left: 0,
            width: asidePanelWidth,
            height: headerHeight,
        };
        let leftHeaderPanelStyle = {
            left: asidePanelWidth,
            width: frozenPanelWidth,
            height: headerHeight,
        };
        let headerPanelStyle = {
            left: frozenPanelWidth + asidePanelWidth,
            width: CTInnerWidth - asidePanelWidth - frozenPanelWidth - rightPanelWidth,
            height: headerHeight,
        };
        let headerScrollStyle = {
            height: headerHeight,
            left: scrollLeft,
        };
        return (React.createElement("div", { className: 'axui-datagrid-header', style: { height: headerHeight } },
            React.createElement(DataGridHeaderPanel_1.default, { panelName: "aside-header", style: asideHeaderPanelStyle }),
            React.createElement(DataGridHeaderPanel_1.default, { panelName: "left-header", style: leftHeaderPanelStyle }),
            React.createElement("div", { "data-scroll-container": "header-scroll-container", style: headerPanelStyle },
                React.createElement(DataGridHeaderPanel_1.default, { panelName: "header-scroll", style: headerScrollStyle })),
            React.createElement(DataGridHeaderColumnResizer_1.default, { columnResizing: columnResizing, columnResizerLeft: columnResizerLeft })));
    }
}
exports.default = hoc_1.connectStore(DataGridHeader);
//# sourceMappingURL=DataGridHeader.js.map