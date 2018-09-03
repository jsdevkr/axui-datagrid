"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const DataGridBodyBottomCell_1 = require("./DataGridBodyBottomCell");
const DataGridTableColGroup_1 = require("./DataGridTableColGroup");
const TableBody = ({ bodyRow }) => (React.createElement("tbody", null, bodyRow.rows.map((row, ri) => {
    return (React.createElement("tr", { key: ri, className: '' },
        row.cols.map((col, ci) => {
            return (React.createElement(DataGridBodyBottomCell_1.default, { key: ci, ci: ci, col: col, value: '' }));
        }),
        React.createElement("td", null)));
})));
const DataGridBodyBottomPanel = props => {
    const { asideColGroup = [], leftHeaderColGroup = [], visibleHeaderColGroup = [], asideBodyRowData = { rows: [{ cols: [] }] }, leftFootSumData = { rows: [{ cols: [] }] }, visibleFootSumData = { rows: [{ cols: [] }] }, panelName, containerStyle = {}, panelLeft = 0, panelTop = 0, styles = {}, } = props;
    const { frozenPanelWidth = 0, asidePanelWidth = 0, bodyTrHeight = 0, } = styles;
    // aside또는 left가 필요 없는 상황
    if ((panelName === 'bottom-aside-body-scroll' && asidePanelWidth === 0) ||
        (panelName === 'bottom-left-body-scroll' && frozenPanelWidth === 0)) {
        return null;
    }
    let panelColGroup = [];
    let panelBodyRow = { rows: [{ cols: [] }] };
    let panelPaddingLeft = 0;
    switch (panelName) {
        case 'bottom-aside-body-scroll':
            panelColGroup = asideColGroup;
            panelBodyRow = asideBodyRowData;
            break;
        case 'bottom-left-body-scroll':
            panelColGroup = leftHeaderColGroup;
            panelBodyRow = leftFootSumData;
            break;
        case 'bottom-body-scroll':
        default:
            panelColGroup = visibleHeaderColGroup;
            panelBodyRow = visibleFootSumData;
            panelPaddingLeft = panelColGroup[0]
                ? (panelColGroup[0]._sx || 0) - frozenPanelWidth
                : 0;
    }
    const panelStyle = {
        left: panelLeft,
        top: panelTop,
        paddingTop: 0,
        paddingLeft: panelPaddingLeft,
    };
    return (React.createElement("div", { "data-scroll-container": `${panelName}-container`, style: containerStyle },
        React.createElement("div", { "data-panel": panelName, style: panelStyle },
            React.createElement("table", { style: { height: '100%' } },
                React.createElement(DataGridTableColGroup_1.default, { panelColGroup: panelColGroup }),
                React.createElement(TableBody, { bodyRow: panelBodyRow })))));
};
exports.default = hoc_1.connectStore(DataGridBodyBottomPanel);
//# sourceMappingURL=DataGridBodyBottomPanel.js.map