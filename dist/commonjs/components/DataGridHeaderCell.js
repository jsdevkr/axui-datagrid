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
var CellLabel = /** @class */ (function (_super) {
    __extends(CellLabel, _super);
    function CellLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CellLabel.prototype.render = function () {
        var _a = this.props, _b = _a.col, _c = _b.key, key = _c === void 0 ? '' : _c, _d = _b.label, label = _d === void 0 ? '' : _d, rowSelectorSize = _a.rowSelectorSize, optionsHeader = _a.optionsHeader, listSelectedAll = _a.listSelectedAll;
        switch (key) {
            case '_row_selector_':
                if (optionsHeader.selector) {
                    return (React.createElement("div", { className: "axui-datagrid-check-box", "data-checked": listSelectedAll, style: {
                            width: rowSelectorSize + 'px',
                            height: rowSelectorSize + 'px',
                        } }));
                }
                else {
                    return null;
                }
            default:
                return React.createElement(React.Fragment, null, label);
        }
    };
    return CellLabel;
}(React.PureComponent));
var CellSorter = /** @class */ (function (_super) {
    __extends(CellSorter, _super);
    function CellSorter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CellSorter.prototype.render = function () {
        var _a = this.props, show = _a.show, colIndex = _a.colIndex, orderBy = _a.orderBy;
        return show ? (React.createElement("span", { "data-sorter": colIndex, "data-sorter-order": orderBy })) : null;
    };
    return CellSorter;
}(React.PureComponent));
var DatagridHeaderCell = /** @class */ (function (_super) {
    __extends(DatagridHeaderCell, _super);
    function DatagridHeaderCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatagridHeaderCell.prototype.render = function () {
        var _a = this.props, _b = _a.listSelectedAll, listSelectedAll = _b === void 0 ? false : _b, options = _a.options, _c = _a.options, _d = _c === void 0 ? {} : _c, _e = _d.rowSelectorSize, rowSelectorSize = _e === void 0 ? 0 : _e, _f = _d.header, _g = _f === void 0 ? {} : _f, _h = _g.columnHeight, optionsHeaderColumnHeight = _h === void 0 ? 0 : _h, _j = _g.columnPadding, optionsHeaderColumnPadding = _j === void 0 ? 0 : _j, _k = _g.columnBorderWidth, optionsHeaderColumnBorderWidth = _k === void 0 ? 0 : _k, _l = _g.align, headerAlign = _l === void 0 ? 'left' : _l, _m = _a.focusedCol, focusedCol = _m === void 0 ? -1 : _m, selectionCols = _a.selectionCols, _o = _a.sortInfo, sortInfo = _o === void 0 ? {} : _o, bodyRow = _a.bodyRow, ri = _a.ri, col = _a.col, _p = _a.col, _q = _p === void 0 ? {} : _p, _r = _q.align, colAlign = _r === void 0 ? '' : _r, _s = _q.colIndex, colIndex = _s === void 0 ? 0 : _s, _t = _q.key, colKey = _t === void 0 ? '' : _t, _u = _q.rowSpan, colRowSpan = _u === void 0 ? 1 : _u, _v = _q.colSpan, colCowSpan = _v === void 0 ? 1 : _v, _w = _q.columnAttr, columnAttr = _w === void 0 ? '' : _w, onClick = _a.onClick;
        var optionsHeader = options.header || {};
        var lineHeight = optionsHeaderColumnHeight -
            optionsHeaderColumnPadding * 2 -
            optionsHeaderColumnBorderWidth;
        var classNames = ['axui-datagrid-header-column'];
        if (columnAttr === 'lineNumber') {
            classNames.push('axui-datagrid-header-corner');
        }
        if (focusedCol > -1 &&
            colIndex === focusedCol &&
            bodyRow.rows.length - 1 === ri + colRowSpan - 1) {
            classNames.push('focused');
        }
        if (selectionCols &&
            selectionCols[colIndex] &&
            bodyRow.rows.length - 1 === ri + colRowSpan - 1) {
            classNames.push('selected');
        }
        return (React.createElement("td", { colSpan: colCowSpan, rowSpan: colRowSpan, className: classNames.join(' '), style: {
                height: optionsHeaderColumnHeight * colRowSpan -
                    optionsHeaderColumnBorderWidth,
                minHeight: '1px',
            }, onClick: function (e) {
                onClick(e, col);
            } },
            React.createElement("span", { "data-span": columnAttr, "data-align": colAlign || headerAlign, style: {
                    height: optionsHeaderColumnHeight - optionsHeaderColumnBorderWidth + 'px',
                    lineHeight: lineHeight + 'px',
                } },
                React.createElement(CellSorter, { show: colKey && sortInfo[colKey], colIndex: colIndex, orderBy: sortInfo[colKey] ? sortInfo[colKey].orderBy : '' }),
                React.createElement(CellLabel, { col: col, lineHeight: lineHeight, rowSelectorSize: rowSelectorSize, optionsHeader: optionsHeader, listSelectedAll: listSelectedAll }))));
    };
    return DatagridHeaderCell;
}(React.PureComponent));
exports.default = DatagridHeaderCell;
