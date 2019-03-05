"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
const DataGridBodyCell_1 = require("./DataGridBodyCell");
const DataGridTableColGroup_1 = require("./DataGridTableColGroup");
const TableBody = ({ sRowIndex, eRowIndex, data, bodyRow }) => (React.createElement("tbody", null, utils_1.arrayFromRange(sRowIndex, eRowIndex).map(li => {
    const item = data[li];
    const trClassNames = {
        ['odded-line']: li % 2 !== 0,
    };
    if (item) {
        return bodyRow.rows.map((row, ri) => (React.createElement("tr", { key: ri, className: utils_1.classNames(trClassNames) },
            row.cols.map((col, ci) => (React.createElement(DataGridBodyCell_1.default, { key: ci, li: li, ci: ci, col: col, value: data[li][col.key || ''] }))),
            React.createElement("td", null))));
    }
    return null;
})));
const DataGridBodyPanel = props => {
    const { data = [], asideColGroup = [], leftHeaderColGroup = [], visibleHeaderColGroup = [], asideBodyRowData = { rows: [{ cols: [] }] }, leftBodyRowData = { rows: [{ cols: [] }] }, visibleBodyRowData = { rows: [{ cols: [] }] }, panelName, containerStyle = {}, panelScrollConfig = {}, panelLeft = 0, panelTop = 0, styles = {}, } = props;
    const { frozenPanelWidth = 0, asidePanelWidth = 0, frozenPanelHeight = 0, bodyTrHeight = 0, } = styles;
    const { sRowIndex = 0, eRowIndex = 0, frozenRowIndex = 0, } = panelScrollConfig;
    // aside-header가 필요하지 않은지 확인
    if ((panelName === 'top-aside-body-scroll' &&
        (asidePanelWidth === 0 || frozenPanelHeight === 0)) ||
        (panelName === 'top-left-body-scroll' &&
            (frozenPanelWidth === 0 || frozenPanelHeight === 0)) ||
        (panelName === 'top-body-scroll' && frozenPanelHeight === 0) ||
        (panelName === 'aside-body-scroll' && asidePanelWidth === 0) ||
        (panelName === 'left-body-scroll' && frozenPanelWidth === 0)) {
        return null;
    }
    let panelColGroup = [];
    let panelBodyRow = { rows: [{ cols: [] }] };
    let panelPaddingLeft = 0;
    switch (panelName) {
        case 'top-aside-body-scroll':
        case 'aside-body-scroll':
            panelColGroup = asideColGroup;
            panelBodyRow = asideBodyRowData;
            break;
        case 'top-left-body-scroll':
        case 'left-body-scroll':
            panelColGroup = leftHeaderColGroup;
            panelBodyRow = leftBodyRowData;
            break;
        case 'top-body-scroll':
        case 'body-scroll':
        default:
            panelColGroup = visibleHeaderColGroup;
            // headerColGroup;
            panelBodyRow = visibleBodyRowData;
            panelPaddingLeft = panelColGroup[0]
                ? (panelColGroup[0]._sx || 0) - frozenPanelWidth
                : 0;
    }
    const panelStyle = {
        left: panelLeft,
        top: panelTop,
        paddingTop: (sRowIndex - frozenRowIndex) * bodyTrHeight,
        paddingLeft: panelPaddingLeft,
    };
    return (React.createElement("div", { "data-scroll-container": `${panelName}-container`, style: containerStyle },
        React.createElement("div", { "data-panel": panelName, style: panelStyle },
            React.createElement("table", { style: { height: '100%' } },
                React.createElement(DataGridTableColGroup_1.default, { panelColGroup: panelColGroup }),
                React.createElement(TableBody, { sRowIndex: sRowIndex, eRowIndex: eRowIndex, data: data, bodyRow: panelBodyRow })))));
};
exports.default = hoc_1.connectStore(DataGridBodyPanel);
