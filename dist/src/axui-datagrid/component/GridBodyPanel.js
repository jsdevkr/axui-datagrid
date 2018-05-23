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
var immutable_1 = require("immutable");
var constant_1 = require("../_inc/constant");
var GridBodyCell_1 = require("./GridBodyCell");
var classnames_1 = require("classnames");
var GridBodyPanel = /** @class */ (function (_super) {
    __extends(GridBodyPanel, _super);
    function GridBodyPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        _this.onEditInput = _this.onEditInput.bind(_this);
        return _this;
    }
    GridBodyPanel.prototype.onEditInput = function (E_TYPE, e) {
        var _a = this.props, updateEditInput = _a.updateEditInput, inlineEditingCell = _a.inlineEditingCell;
        var proc = (_b = {},
            _b[constant_1.E_NAME.BLUR] = function () {
                updateEditInput('cancel');
            },
            _b[constant_1.E_NAME.KEY_DOWN] = function () {
                if (e.which === constant_1.KEY_CODE.ESC) {
                    updateEditInput('cancel');
                }
                else if (e.which === constant_1.KEY_CODE.RETURN) {
                    updateEditInput('update', inlineEditingCell.row, inlineEditingCell.col, e.target.value);
                }
            },
            _b);
        proc[E_TYPE]();
        var _b;
    };
    GridBodyPanel.prototype.render = function () {
        var _this = this;
        var _a = this.props, styles = _a.styles, options = _a.options, colGroup = _a.colGroup, selectionRows = _a.selectionRows, selectionCols = _a.selectionCols, focusedRow = _a.focusedRow, focusedCol = _a.focusedCol, columnFormatter = _a.columnFormatter, onDoubleClickCell = _a.onDoubleClickCell, isInlineEditing = _a.isInlineEditing, inlineEditingCell = _a.inlineEditingCell, list = _a.list, panelBodyRow = _a.panelBodyRow, panelColGroup = _a.panelColGroup, panelGroupRow = _a.panelGroupRow, panelName = _a.panelName, panelScrollConfig = _a.panelScrollConfig, _b = _a.panelLeft, panelLeft = _b === void 0 ? 0 : _b, _c = _a.panelTop, panelTop = _c === void 0 ? 0 : _c, _d = _a.panelPaddingLeft, panelPaddingLeft = _d === void 0 ? 0 : _d;
        var sRowIndex = panelScrollConfig.sRowIndex, eRowIndex = panelScrollConfig.eRowIndex, frozenRowIndex = panelScrollConfig.frozenRowIndex;
        var panelStyle = {
            left: panelLeft,
            top: panelTop,
            paddingTop: (sRowIndex - frozenRowIndex) * styles.bodyTrHeight,
            paddingLeft: panelPaddingLeft ? panelPaddingLeft : 0,
        };
        return (React.createElement("div", { "data-panel": panelName, style: panelStyle },
            React.createElement("table", { style: { height: '100%' } },
                React.createElement("colgroup", null,
                    panelColGroup.map(function (col, ci) { return (React.createElement("col", { key: ci, style: { width: col._width + 'px' } })); }),
                    React.createElement("col", null)),
                React.createElement("tbody", null, immutable_1.Range(sRowIndex, eRowIndex).map(function (li) {
                    var item = list.get(li);
                    var trClassNames = (_a = {},
                        _a['odded-line'] = li % 2,
                        _a);
                    if (item) {
                        return panelBodyRow.rows.map(function (row, ri) {
                            return (React.createElement("tr", { key: ri, className: classnames_1.default(trClassNames) },
                                row.cols.map(function (col, ci) {
                                    return (React.createElement(GridBodyCell_1.GridBodyCell, { key: ci, columnHeight: options.body.columnHeight, columnPadding: options.body.columnPadding, columnBorderWidth: options.body.columnBorderWidth, bodyAlign: options.body.align, focusedRow: focusedRow, focusedCol: focusedCol, selectionRows: selectionRows, selectionCols: selectionCols, columnFormatter: columnFormatter, isInlineEditing: isInlineEditing, inlineEditingCell: inlineEditingCell, list: list, li: li, colGroup: colGroup, col: col, ci: ci, value: item[col.key], onEditInput: _this.onEditInput, onDoubleClickCell: onDoubleClickCell }));
                                }),
                                React.createElement("td", null, "\u00A0")));
                        });
                    }
                    var _a;
                })))));
    };
    return GridBodyPanel;
}(React.Component));
exports.GridBodyPanel = GridBodyPanel;
//# sourceMappingURL=GridBodyPanel.js.map