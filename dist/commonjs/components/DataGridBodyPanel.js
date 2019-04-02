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
var _enums_1 = require("../common/@enums");
var DataGridBodyCell_1 = require("./DataGridBodyCell");
var DataGridTableColGroup_1 = require("./DataGridTableColGroup");
var TableBody = /** @class */ (function (_super) {
    __extends(TableBody, _super);
    function TableBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableBody.prototype.render = function () {
        var _a = this.props, sRowIndex = _a.sRowIndex, eRowIndex = _a.eRowIndex, data = _a.data, bodyRow = _a.bodyRow, setStoreState = _a.setStoreState, dispatch = _a.dispatch, focusedRow = _a.focusedRow, focusedCol = _a.focusedCol, selectionRows = _a.selectionRows, selectionCols = _a.selectionCols, options = _a.options, isInlineEditing = _a.isInlineEditing, inlineEditingCell = _a.inlineEditingCell, predefinedFormatter = _a.predefinedFormatter;
        return (React.createElement("tbody", null, utils_1.arrayFromRange(sRowIndex, eRowIndex).map(function (li) {
            if (data[li]) {
                return bodyRow.rows.map(function (row, ri) { return (React.createElement("tr", { key: ri, className: "" + (li % 2 !== 0 ? 'odded-line' : '') },
                    row.cols.map(function (col, ci) { return (React.createElement(DataGridBodyCell_1.default, { key: ci, li: li, ci: ci, col: col, data: data, selected: data[li]._selected_, setStoreState: setStoreState, dispatch: dispatch, focusedRow: focusedRow, focusedCol: focusedCol, selectionRows: selectionRows, selectionCols: selectionCols, options: options, isInlineEditing: isInlineEditing, inlineEditingCell: inlineEditingCell, predefinedFormatter: predefinedFormatter })); }),
                    React.createElement("td", null))); });
            }
            return null;
        })));
    };
    return TableBody;
}(React.PureComponent));
var DataGridBodyPanel = /** @class */ (function (_super) {
    __extends(DataGridBodyPanel, _super);
    function DataGridBodyPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataGridBodyPanel.prototype.render = function () {
        var _a = this.props, _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.asideColGroup, asideColGroup = _c === void 0 ? [] : _c, _d = _a.leftHeaderColGroup, leftHeaderColGroup = _d === void 0 ? [] : _d, _e = _a.visibleHeaderColGroup, visibleHeaderColGroup = _e === void 0 ? [] : _e, _f = _a.asideBodyRowData, asideBodyRowData = _f === void 0 ? { rows: [{ cols: [] }] } : _f, _g = _a.leftBodyRowData, leftBodyRowData = _g === void 0 ? { rows: [{ cols: [] }] } : _g, _h = _a.visibleBodyRowData, visibleBodyRowData = _h === void 0 ? { rows: [{ cols: [] }] } : _h, panelName = _a.panelName, _j = _a.containerStyle, containerStyle = _j === void 0 ? {} : _j, _k = _a.panelScrollConfig, _l = _k === void 0 ? {} : _k, _m = _l.sRowIndex, sRowIndex = _m === void 0 ? 0 : _m, _o = _l.eRowIndex, eRowIndex = _o === void 0 ? 0 : _o, _p = _l.frozenRowIndex, frozenRowIndex = _p === void 0 ? 0 : _p, _q = _a.panelLeft, panelLeft = _q === void 0 ? 0 : _q, _r = _a.panelTop, panelTop = _r === void 0 ? 0 : _r, _s = _a.styles, _t = _s === void 0 ? {} : _s, _u = _t.frozenPanelWidth, frozenPanelWidth = _u === void 0 ? 0 : _u, _v = _t.bodyTrHeight, bodyTrHeight = _v === void 0 ? 0 : _v, focusedRow = _a.focusedRow, focusedCol = _a.focusedCol, selectionRows = _a.selectionRows, selectionCols = _a.selectionCols, options = _a.options, isInlineEditing = _a.isInlineEditing, inlineEditingCell = _a.inlineEditingCell, predefinedFormatter = _a.predefinedFormatter, setStoreState = _a.setStoreState, dispatch = _a.dispatch;
        var panelColGroup;
        var panelBodyRow;
        var panelPaddingLeft = 0;
        switch (panelName) {
            case _enums_1.DataGridEnums.PanelNames.TOP_ASIDE_BODY_SCROLL:
            case _enums_1.DataGridEnums.PanelNames.ASIDE_BODY_SCROLL:
                panelColGroup = asideColGroup;
                panelBodyRow = asideBodyRowData;
                break;
            case _enums_1.DataGridEnums.PanelNames.TOP_LEFT_BODY_SCROLL:
            case _enums_1.DataGridEnums.PanelNames.LEFT_BODY_SCROLL:
                panelColGroup = leftHeaderColGroup;
                panelBodyRow = leftBodyRowData;
                break;
            case _enums_1.DataGridEnums.PanelNames.TOP_BODY_SCROLL:
            case _enums_1.DataGridEnums.PanelNames.BODY_SCROLL:
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
                    React.createElement(TableBody, { sRowIndex: sRowIndex, eRowIndex: eRowIndex, data: data, bodyRow: panelBodyRow, setStoreState: setStoreState, dispatch: dispatch, focusedRow: focusedRow || 0, focusedCol: focusedCol || 0, selectionRows: selectionRows || {}, selectionCols: selectionCols || {}, options: options || {}, isInlineEditing: !!isInlineEditing, inlineEditingCell: inlineEditingCell || {}, predefinedFormatter: predefinedFormatter })))));
    };
    return DataGridBodyPanel;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridBodyPanel);
