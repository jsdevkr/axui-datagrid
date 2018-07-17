"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
var DataGridBodyPanel = /** @class */ (function (_super) {
    __extends(DataGridBodyPanel, _super);
    function DataGridBodyPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        return _this;
    }
    DataGridBodyPanel.prototype.render = function () {
        var _a = this.props, _b = _a.filteredList, filteredList = _b === void 0 ? [] : _b, _c = _a.asideColGroup, asideColGroup = _c === void 0 ? [] : _c, _d = _a.leftHeaderColGroup, leftHeaderColGroup = _d === void 0 ? [] : _d, _e = _a.headerColGroup, headerColGroup = _e === void 0 ? [] : _e, _f = _a.visibleHeaderColGroup, visibleHeaderColGroup = _f === void 0 ? [] : _f, _g = _a.asideBodyRowData, asideBodyRowData = _g === void 0 ? { rows: [{ cols: [] }] } : _g, _h = _a.leftBodyRowData, leftBodyRowData = _h === void 0 ? { rows: [{ cols: [] }] } : _h, _j = _a.bodyRowData, bodyRowData = _j === void 0 ? { rows: [{ cols: [] }] } : _j, _k = _a.visibleBodyRowData, visibleBodyRowData = _k === void 0 ? { rows: [{ cols: [] }] } : _k, _l = _a.visibleBodyGroupingData, visibleBodyGroupingData = _l === void 0 ? { rows: [{ cols: [] }] } : _l, panelName = _a.panelName, _m = _a.containerStyle, containerStyle = _m === void 0 ? {} : _m, _o = _a.panelScrollConfig, panelScrollConfig = _o === void 0 ? {} : _o, _p = _a.panelLeft, panelLeft = _p === void 0 ? 0 : _p, _q = _a.panelTop, panelTop = _q === void 0 ? 0 : _q, _r = _a.printStartColIndex, printStartColIndex = _r === void 0 ? 0 : _r, _s = _a.printEndColIndex, printEndColIndex = _s === void 0 ? 0 : _s, _t = _a.styles, styles = _t === void 0 ? {} : _t;
        var _u = styles.frozenPanelWidth, frozenPanelWidth = _u === void 0 ? 0 : _u, _v = styles.asidePanelWidth, asidePanelWidth = _v === void 0 ? 0 : _v, _w = styles.frozenPanelHeight, frozenPanelHeight = _w === void 0 ? 0 : _w, _x = styles.bodyTrHeight, bodyTrHeight = _x === void 0 ? 0 : _x;
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
        if (panelName === 'aside-body-scroll-container') {
            // console.log(panelName);
        }
        return (React.createElement("div", { "data-scroll-container": panelName + "-container", style: containerStyle },
            React.createElement("div", { "data-panel": panelName, style: panelStyle },
                React.createElement("table", { style: { height: '100%' } },
                    React.createElement("colgroup", null,
                        panelColGroup.map(function (col, ci) { return (React.createElement("col", { key: ci, style: { width: col._width + 'px' } })); }),
                        React.createElement("col", null)),
                    React.createElement("tbody", null, utils_1.arrayFromRange(sRowIndex, eRowIndex).map(function (li) {
                        var item = filteredList[li];
                        var trClassNames = (_a = {},
                            _a['odded-line'] = li % 2 !== 0,
                            _a);
                        if (item) {
                            return panelBodyRow.rows.map(function (row, ri) {
                                return (React.createElement("tr", { key: ri, className: utils_1.classNames(trClassNames) },
                                    row.cols.map(function (col, ci) {
                                        return (React.createElement(DataGridBodyCell_1.default, { key: ci, li: li, ci: ci, col: col, value: filteredList[li][col.key || ''] }));
                                    }),
                                    React.createElement("td", null)));
                            });
                        }
                        return null;
                        var _a;
                    }))))));
    };
    return DataGridBodyPanel;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridBodyPanel);
//# sourceMappingURL=DataGridBodyPanel.js.map