"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var GridHeaderCell_1 = require("./GridHeaderCell");
var GridHeaderPanel = /** @class */ (function (_super) {
    __extends(GridHeaderPanel, _super);
    function GridHeaderPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    GridHeaderPanel.prototype.render = function () {
        var _a = this.props, panelName = _a.panelName, colGroup = _a.colGroup, bodyRow = _a.bodyRow, style = _a.style, optionsHeader = _a.optionsHeader, focusedCol = _a.focusedCol, selectionCols = _a.selectionCols, onClickHeader = _a.onClickHeader, sortInfo = _a.sortInfo, onMouseDownColumnResizer = _a.onMouseDownColumnResizer;
        return (React.createElement("div", { "data-panel": panelName, style: style }, React.createElement("table", { style: { height: '100%' } }, React.createElement("colgroup", null, colGroup.map(function (col, ci) { return (React.createElement("col", { key: ci, style: { width: col._width + 'px' } })); }), React.createElement("col", null)), React.createElement("tbody", null, bodyRow.rows.map(function (row, ri) {
            return (React.createElement("tr", { key: ri, className: "" }, row.cols.map(function (col, ci) { return (React.createElement(GridHeaderCell_1.GridHeaderCell, { key: ci, bodyRow: bodyRow, optionsHeader: optionsHeader, focusedCol: focusedCol, selectionCols: selectionCols, onClickHeader: onClickHeader, sortInfo: sortInfo, ri: ri, col: col })); }), React.createElement("td", null, "\u00A0")));
        }))), (function () {
            if (panelName === 'aside-header')
                return null;
            var resizerHeight = optionsHeader.columnHeight * bodyRow.rows.length -
                optionsHeader.columnBorderWidth;
            var resizer, resizerLeft = 0, resizerWidth = 4;
            return colGroup.map(function (col, ci) {
                if (col.colIndex !== null && typeof col.colIndex !== 'undefined') {
                    var prevResizerLeft = resizerLeft;
                    resizerLeft += col._width;
                    resizer = (React.createElement("div", { key: ci, "data-column-resizer": col.colIndex, "data-prev-left": prevResizerLeft, "data-left": resizerLeft, style: {
                            width: resizerWidth,
                            height: resizerHeight + 'px',
                            left: resizerLeft - resizerWidth / 2 + 'px',
                        }, onMouseDown: function (e) { return onMouseDownColumnResizer(e, col); } }));
                }
                return resizer;
            });
        })()));
    };
    return GridHeaderPanel;
}(React.Component));
exports.GridHeaderPanel = GridHeaderPanel;
//# sourceMappingURL=GridHeaderPanel.js.map