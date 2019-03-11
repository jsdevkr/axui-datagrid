"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const _enums_1 = require("../common/@enums");
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
    shouldComponentUpdate(pProps) {
        const { scrollLeft = 0, columnResizing, columnResizerLeft, styles: { elWidth = 0, headerHeight = 0, asidePanelWidth = 0, frozenPanelWidth = 0, rightPanelWidth = 0, } = {}, } = this.props;
        const { scrollLeft: _scrollLeft = 0, columnResizing: _columnResizing, columnResizerLeft: _columnResizerLeft, styles: { elWidth: _elWidth = 0, headerHeight: _headerHeight = 0, asidePanelWidth: _asidePanelWidth = 0, frozenPanelWidth: _frozenPanelWidth = 0, rightPanelWidth: _rightPanelWidth = 0, } = {}, } = pProps;
        if (scrollLeft !== _scrollLeft ||
            columnResizing !== _columnResizing ||
            columnResizerLeft !== _columnResizerLeft ||
            elWidth !== _elWidth ||
            headerHeight !== _headerHeight ||
            asidePanelWidth !== _asidePanelWidth ||
            frozenPanelWidth !== _frozenPanelWidth ||
            rightPanelWidth !== _rightPanelWidth) {
            return true;
        }
        return false;
    }
    render() {
        const { scrollLeft = 0, columnResizing, columnResizerLeft, styles: { elWidth = 0, headerHeight = 0, asidePanelWidth = 0, frozenPanelWidth = 0, rightPanelWidth = 0, } = {}, } = this.props;
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
            width: elWidth - asidePanelWidth - frozenPanelWidth - rightPanelWidth,
            height: headerHeight,
        };
        let headerScrollStyle = {
            height: headerHeight,
            left: scrollLeft,
        };
        return (React.createElement("div", { className: 'axui-datagrid-header', style: { height: headerHeight } },
            asidePanelWidth !== 0 && (React.createElement(DataGridHeaderPanel_1.default, { panelName: _enums_1.DataGridEnums.PanelNames.ASIDE_HEADER, style: asideHeaderPanelStyle })),
            frozenPanelWidth !== 0 && (React.createElement(DataGridHeaderPanel_1.default, { panelName: _enums_1.DataGridEnums.PanelNames.LEFT_HEADER, style: leftHeaderPanelStyle })),
            React.createElement("div", { "data-scroll-container": "header-scroll-container", style: headerPanelStyle },
                React.createElement(DataGridHeaderPanel_1.default, { panelName: _enums_1.DataGridEnums.PanelNames.HEADER_SCROLL, style: headerScrollStyle })),
            columnResizing && (React.createElement(DataGridHeaderColumnResizer_1.default, { columnResizing: columnResizing, columnResizerLeft: columnResizerLeft }))));
    }
}
exports.default = hoc_1.connectStore(DataGridHeader);
