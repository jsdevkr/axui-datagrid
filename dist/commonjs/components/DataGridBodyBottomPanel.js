"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hoc_1 = require("../hoc");
var DataGridBodyBottomCell_1 = require("./DataGridBodyBottomCell");
var DataGridTableColGroup_1 = require("./DataGridTableColGroup");
var TableBody = function (_a) {
    var bodyRow = _a.bodyRow;
    return (React.createElement("tbody", null, bodyRow.rows.map(function (row, ri) {
        return (React.createElement("tr", { key: ri, className: '' },
            row.cols.map(function (col, ci) {
                return (React.createElement(DataGridBodyBottomCell_1.default, { key: ci, ci: ci, col: col, value: '' }));
            }),
            React.createElement("td", null)));
    })));
};
var DataGridBodyBottomPanel = function (props) {
    var _a = props.asideColGroup, asideColGroup = _a === void 0 ? [] : _a, _b = props.leftHeaderColGroup, leftHeaderColGroup = _b === void 0 ? [] : _b, _c = props.visibleHeaderColGroup, visibleHeaderColGroup = _c === void 0 ? [] : _c, _d = props.asideBodyRowData, asideBodyRowData = _d === void 0 ? { rows: [{ cols: [] }] } : _d, _e = props.leftFootSumData, leftFootSumData = _e === void 0 ? { rows: [{ cols: [] }] } : _e, _f = props.visibleFootSumData, visibleFootSumData = _f === void 0 ? { rows: [{ cols: [] }] } : _f, panelName = props.panelName, _g = props.containerStyle, containerStyle = _g === void 0 ? {} : _g, _h = props.panelLeft, panelLeft = _h === void 0 ? 0 : _h, _j = props.panelTop, panelTop = _j === void 0 ? 0 : _j, _k = props.styles, styles = _k === void 0 ? {} : _k;
    var _l = styles.frozenPanelWidth, frozenPanelWidth = _l === void 0 ? 0 : _l, _m = styles.asidePanelWidth, asidePanelWidth = _m === void 0 ? 0 : _m, _o = styles.bodyTrHeight, bodyTrHeight = _o === void 0 ? 0 : _o;
    // aside또는 left가 필요 없는 상황
    if ((panelName === 'bottom-aside-body-scroll' && asidePanelWidth === 0) ||
        (panelName === 'bottom-left-body-scroll' && frozenPanelWidth === 0)) {
        return null;
    }
    var panelColGroup = [];
    var panelBodyRow = { rows: [{ cols: [] }] };
    var panelPaddingLeft = 0;
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
    var panelStyle = {
        left: panelLeft,
        top: panelTop,
        paddingTop: 0,
        paddingLeft: panelPaddingLeft,
    };
    return (React.createElement("div", { "data-scroll-container": panelName + "-container", style: containerStyle },
        React.createElement("div", { "data-panel": panelName, style: panelStyle },
            React.createElement("table", { style: { height: '100%' } },
                React.createElement(DataGridTableColGroup_1.default, { panelColGroup: panelColGroup }),
                React.createElement(TableBody, { bodyRow: panelBodyRow })))));
};
exports.default = hoc_1.connectStore(DataGridBodyBottomPanel);
//# sourceMappingURL=DataGridBodyBottomPanel.js.map