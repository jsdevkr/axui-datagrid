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
        var _a = this.props, _b = _a.col, _c = _b.key, key = _c === void 0 ? '' : _c, _d = _b.label, label = _d === void 0 ? '' : _d, lineHeight = _a.lineHeight, optionsHeader = _a.optionsHeader, listSelectedAll = _a.listSelectedAll;
        switch (key) {
            case '_row_selector_':
                if (optionsHeader.selector) {
                    return (React.createElement("div", { className: "axui-datagrid-check-box", "data-checked": listSelectedAll, style: {
                            maxHeight: lineHeight + 'px',
                            minHeight: lineHeight + 'px',
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
        var _a = this.props, _b = _a.listSelectedAll, listSelectedAll = _b === void 0 ? false : _b, options = _a.options, _c = _a.options, _d = (_c === void 0 ? {} : _c).header, _e = _d === void 0 ? {} : _d, _f = _e.columnHeight, optionsHeaderColumnHeight = _f === void 0 ? 0 : _f, _g = _e.columnPadding, optionsHeaderColumnPadding = _g === void 0 ? 0 : _g, _h = _e.columnBorderWidth, optionsHeaderColumnBorderWidth = _h === void 0 ? 0 : _h, _j = _e.align, headerAlign = _j === void 0 ? 'left' : _j, _k = _a.focusedCol, focusedCol = _k === void 0 ? -1 : _k, selectionCols = _a.selectionCols, _l = _a.sortInfo, sortInfo = _l === void 0 ? {} : _l, bodyRow = _a.bodyRow, ri = _a.ri, col = _a.col, _m = _a.col, _o = _m === void 0 ? {} : _m, _p = _o.align, colAlign = _p === void 0 ? '' : _p, _q = _o.colIndex, colIndex = _q === void 0 ? 0 : _q, _r = _o.key, colKey = _r === void 0 ? '' : _r, _s = _o.rowSpan, colRowSpan = _s === void 0 ? 1 : _s, _t = _o.colSpan, colCowSpan = _t === void 0 ? 1 : _t, onClick = _a.onClick;
        var optionsHeader = options.header || {};
        var lineHeight = optionsHeaderColumnHeight -
            optionsHeaderColumnPadding * 2 -
            optionsHeaderColumnBorderWidth;
        var classNames = ['axui-datagrid-header-column'];
        if (col.columnAttr === 'lineNumber') {
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
            React.createElement("span", { "data-span": true, "data-align": colAlign || headerAlign, style: {
                    height: optionsHeaderColumnHeight - optionsHeaderColumnBorderWidth + 'px',
                    lineHeight: lineHeight + 'px',
                } },
                React.createElement(CellSorter, { show: colKey && sortInfo[colKey], colIndex: colIndex, orderBy: sortInfo[colKey] ? sortInfo[colKey].orderBy : '' }),
                React.createElement(CellLabel, { col: col, lineHeight: lineHeight, optionsHeader: optionsHeader, listSelectedAll: listSelectedAll }))));
    };
    return DatagridHeaderCell;
}(React.PureComponent));
exports.default = DatagridHeaderCell;
