"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var DataGridBodyCell_1 = require("./DataGridBodyCell");
var DataGridTableColGroup_1 = require("./DataGridTableColGroup");
var TableBody = function (_a) {
    var sRowIndex = _a.sRowIndex, eRowIndex = _a.eRowIndex, filteredList = _a.filteredList, bodyRow = _a.bodyRow;
    return (React.createElement("tbody", null, utils_1.arrayFromRange(sRowIndex, eRowIndex).map(function (li) {
        var _a;
        var item = filteredList[li];
        var trClassNames = (_a = {},
            _a['odded-line'] = li % 2 !== 0,
            _a);
        if (item) {
            return bodyRow.rows.map(function (row, ri) { return (React.createElement("tr", { key: ri, className: utils_1.classNames(trClassNames) },
                row.cols.map(function (col, ci) { return (React.createElement(DataGridBodyCell_1.default, { key: ci, li: li, ci: ci, col: col, value: filteredList[li][col.key || ''] })); }),
                React.createElement("td", null))); });
        }
        return null;
    })));
};
var DataGridBodyPanel = function (props) {
    var _a = props.filteredList, filteredList = _a === void 0 ? [] : _a, _b = props.asideColGroup, asideColGroup = _b === void 0 ? [] : _b, _c = props.leftHeaderColGroup, leftHeaderColGroup = _c === void 0 ? [] : _c, _d = props.visibleHeaderColGroup, visibleHeaderColGroup = _d === void 0 ? [] : _d, _e = props.asideBodyRowData, asideBodyRowData = _e === void 0 ? { rows: [{ cols: [] }] } : _e, _f = props.leftBodyRowData, leftBodyRowData = _f === void 0 ? { rows: [{ cols: [] }] } : _f, _g = props.visibleBodyRowData, visibleBodyRowData = _g === void 0 ? { rows: [{ cols: [] }] } : _g, panelName = props.panelName, _h = props.containerStyle, containerStyle = _h === void 0 ? {} : _h, _j = props.panelScrollConfig, panelScrollConfig = _j === void 0 ? {} : _j, _k = props.panelLeft, panelLeft = _k === void 0 ? 0 : _k, _l = props.panelTop, panelTop = _l === void 0 ? 0 : _l, _m = props.styles, styles = _m === void 0 ? {} : _m;
    var _o = styles.frozenPanelWidth, frozenPanelWidth = _o === void 0 ? 0 : _o, _p = styles.asidePanelWidth, asidePanelWidth = _p === void 0 ? 0 : _p, _q = styles.frozenPanelHeight, frozenPanelHeight = _q === void 0 ? 0 : _q, _r = styles.bodyTrHeight, bodyTrHeight = _r === void 0 ? 0 : _r;
    var sRowIndex = panelScrollConfig.sRowIndex, eRowIndex = panelScrollConfig.eRowIndex, frozenRowIndex = panelScrollConfig.frozenRowIndex;
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
    var panelColGroup = [];
    var panelBodyRow = { rows: [{ cols: [] }] };
    var panelPaddingLeft = 0;
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
    var panelStyle = {
        left: panelLeft,
        top: panelTop,
        paddingTop: (sRowIndex - frozenRowIndex) * bodyTrHeight,
        paddingLeft: panelPaddingLeft,
    };
    return (React.createElement("div", { "data-scroll-container": panelName + "-container", style: containerStyle },
        React.createElement("div", { "data-panel": panelName, style: panelStyle },
            React.createElement("table", { style: { height: '100%' } },
                React.createElement(DataGridTableColGroup_1.default, { panelColGroup: panelColGroup }),
                React.createElement(TableBody, { sRowIndex: sRowIndex, eRowIndex: eRowIndex, filteredList: filteredList, bodyRow: panelBodyRow })))));
};
exports.default = hoc_1.connectStore(DataGridBodyPanel);
