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
var DataGridBodyBottomPanel = /** @class */ (function (_super) {
    __extends(DataGridBodyBottomPanel, _super);
    function DataGridBodyBottomPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        return _this;
    }
    DataGridBodyBottomPanel.prototype.render = function () {
        var _a = this.props, _b = _a.filteredList, filteredList = _b === void 0 ? [] : _b, _c = _a.asideColGroup, asideColGroup = _c === void 0 ? [] : _c, _d = _a.leftHeaderColGroup, leftHeaderColGroup = _d === void 0 ? [] : _d, _e = _a.visibleHeaderColGroup, visibleHeaderColGroup = _e === void 0 ? [] : _e, _f = _a.asideBodyRowData, asideBodyRowData = _f === void 0 ? { rows: [{ cols: [] }] } : _f, footSumColumns = _a.footSumColumns, _g = _a.leftFootSumData, leftFootSumData = _g === void 0 ? { rows: [{ cols: [] }] } : _g, _h = _a.visibleFootSumData, visibleFootSumData = _h === void 0 ? { rows: [{ cols: [] }] } : _h, panelName = _a.panelName, _j = _a.containerStyle, containerStyle = _j === void 0 ? {} : _j, _k = _a.panelLeft, panelLeft = _k === void 0 ? 0 : _k, _l = _a.panelTop, panelTop = _l === void 0 ? 0 : _l, _m = _a.styles, styles = _m === void 0 ? {} : _m;
        var _o = styles.frozenPanelWidth, frozenPanelWidth = _o === void 0 ? 0 : _o, _p = styles.asidePanelWidth, asidePanelWidth = _p === void 0 ? 0 : _p, _q = styles.bodyTrHeight, bodyTrHeight = _q === void 0 ? 0 : _q;
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
    return DataGridBodyBottomPanel;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridBodyBottomPanel);
//# sourceMappingURL=DataGridBodyBottomPanel.js.map