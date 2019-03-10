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
var DataGridBodyBottomCell_1 = require("./DataGridBodyBottomCell");
var DataGridTableColGroup_1 = require("./DataGridTableColGroup");
var _enums_1 = require("../common/@enums");
var TableBody = /** @class */ (function (_super) {
    __extends(TableBody, _super);
    function TableBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableBody.prototype.render = function () {
        var _a = this.props, data = _a.data, options = _a.options, predefinedFormatter = _a.predefinedFormatter, predefinedCollector = _a.predefinedCollector;
        return (React.createElement("tbody", null, this.props.bodyRow.rows.map(function (row, ri) {
            return (React.createElement("tr", { key: ri, className: '' },
                row.cols.map(function (col, ci) {
                    return (React.createElement(DataGridBodyBottomCell_1.default, { key: ci, ci: ci, col: col, data: data, options: options, predefinedFormatter: predefinedFormatter, predefinedCollector: predefinedCollector }));
                }),
                React.createElement("td", null)));
        })));
    };
    return TableBody;
}(React.PureComponent));
var DataGridBodyBottomPanel = /** @class */ (function (_super) {
    __extends(DataGridBodyBottomPanel, _super);
    function DataGridBodyBottomPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataGridBodyBottomPanel.prototype.render = function () {
        var _a = this.props, _b = _a.asideColGroup, asideColGroup = _b === void 0 ? [] : _b, _c = _a.leftHeaderColGroup, leftHeaderColGroup = _c === void 0 ? [] : _c, _d = _a.visibleHeaderColGroup, visibleHeaderColGroup = _d === void 0 ? [] : _d, _e = _a.asideBodyRowData, asideBodyRowData = _e === void 0 ? { rows: [{ cols: [] }] } : _e, _f = _a.leftFootSumData, leftFootSumData = _f === void 0 ? { rows: [{ cols: [] }] } : _f, _g = _a.visibleFootSumData, visibleFootSumData = _g === void 0 ? { rows: [{ cols: [] }] } : _g, panelName = _a.panelName, _h = _a.containerStyle, containerStyle = _h === void 0 ? {} : _h, _j = _a.panelLeft, panelLeft = _j === void 0 ? 0 : _j, _k = _a.panelTop, panelTop = _k === void 0 ? 0 : _k, _l = _a.styles, _m = _l === void 0 ? {} : _l, _o = _m.frozenPanelWidth, frozenPanelWidth = _o === void 0 ? 0 : _o, _p = _m.asidePanelWidth, asidePanelWidth = _p === void 0 ? 0 : _p, data = _a.data, options = _a.options, predefinedFormatter = _a.predefinedFormatter, predefinedCollector = _a.predefinedCollector;
        var panelColGroup = [];
        var panelBodyRow = { rows: [{ cols: [] }] };
        var panelPaddingLeft = 0;
        switch (panelName) {
            case _enums_1.DataGridEnums.PanelNames.BOTTOM_ASIDE_BODY_SCROLL:
                panelColGroup = asideColGroup;
                panelBodyRow = asideBodyRowData;
                break;
            case _enums_1.DataGridEnums.PanelNames.BOTTOM_LEFT_BODY_SCROLL:
                panelColGroup = leftHeaderColGroup;
                panelBodyRow = leftFootSumData;
                break;
            case _enums_1.DataGridEnums.PanelNames.BOTTOM_BODY_SCROLL:
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
                    React.createElement(TableBody, { bodyRow: panelBodyRow, data: data || [], options: options || {}, predefinedFormatter: predefinedFormatter, predefinedCollector: predefinedCollector })))));
    };
    return DataGridBodyBottomPanel;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridBodyBottomPanel);
