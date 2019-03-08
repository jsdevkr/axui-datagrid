"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var DataGridBodyCell_1 = require("./DataGridBodyCell");
var DataGridTableColGroup_1 = require("./DataGridTableColGroup");
var TableBody = function (_a) {
    var sRowIndex = _a.sRowIndex, eRowIndex = _a.eRowIndex, data = _a.data, bodyRow = _a.bodyRow;
    return (React.createElement("tbody", null, utils_1.arrayFromRange(sRowIndex, eRowIndex).map(function (li) {
        var _a;
        var item = data[li];
        var trClassNames = (_a = {},
            _a['odded-line'] = li % 2 !== 0,
            _a);
        if (item) {
            return bodyRow.rows.map(function (row, ri) { return (React.createElement("tr", { key: ri, className: utils_1.classNames(trClassNames) },
                row.cols.map(function (col, ci) { return (React.createElement(DataGridBodyCell_1.default, { key: ci, li: li, ci: ci, col: col, value: data[li][col.key || ''] })); }),
                React.createElement("td", null))); });
        }
        return null;
    })));
};
var DataGridBodyPanel = /** @class */ (function (_super) {
    __extends(DataGridBodyPanel, _super);
    function DataGridBodyPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataGridBodyPanel.prototype.render = function () {
        var _a = this.props, _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.asideColGroup, asideColGroup = _c === void 0 ? [] : _c, _d = _a.leftHeaderColGroup, leftHeaderColGroup = _d === void 0 ? [] : _d, _e = _a.visibleHeaderColGroup, visibleHeaderColGroup = _e === void 0 ? [] : _e, _f = _a.asideBodyRowData, asideBodyRowData = _f === void 0 ? { rows: [{ cols: [] }] } : _f, _g = _a.leftBodyRowData, leftBodyRowData = _g === void 0 ? { rows: [{ cols: [] }] } : _g, _h = _a.visibleBodyRowData, visibleBodyRowData = _h === void 0 ? { rows: [{ cols: [] }] } : _h, panelName = _a.panelName, _j = _a.containerStyle, containerStyle = _j === void 0 ? {} : _j, _k = _a.panelScrollConfig, panelScrollConfig = _k === void 0 ? {} : _k, _l = _a.panelLeft, panelLeft = _l === void 0 ? 0 : _l, _m = _a.panelTop, panelTop = _m === void 0 ? 0 : _m, _o = _a.styles, styles = _o === void 0 ? {} : _o;
        var _p = styles.frozenPanelWidth, frozenPanelWidth = _p === void 0 ? 0 : _p, _q = styles.asidePanelWidth, asidePanelWidth = _q === void 0 ? 0 : _q, _r = styles.frozenPanelHeight, frozenPanelHeight = _r === void 0 ? 0 : _r, _s = styles.bodyTrHeight, bodyTrHeight = _s === void 0 ? 0 : _s;
        var _t = panelScrollConfig.sRowIndex, sRowIndex = _t === void 0 ? 0 : _t, _u = panelScrollConfig.eRowIndex, eRowIndex = _u === void 0 ? 0 : _u, _v = panelScrollConfig.frozenRowIndex, frozenRowIndex = _v === void 0 ? 0 : _v;
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
                    React.createElement(TableBody, { sRowIndex: sRowIndex, eRowIndex: eRowIndex, data: data, bodyRow: panelBodyRow })))));
    };
    return DataGridBodyPanel;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridBodyPanel);
