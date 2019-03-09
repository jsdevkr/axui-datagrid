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
var utils_1 = require("../utils");
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
var CellFilter = function (_a) {
    var show = _a.show, colIndex = _a.colIndex, isFiltered = _a.isFiltered;
    return show ? React.createElement("span", { "data-filter": isFiltered, "data-filter-index": colIndex }) : null;
};
var DatagridHeaderCell = /** @class */ (function (_super) {
    __extends(DatagridHeaderCell, _super);
    function DatagridHeaderCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatagridHeaderCell.prototype.render = function () {
        var _a;
        var _b = this.props, _c = _b.listSelectedAll, listSelectedAll = _c === void 0 ? false : _c, options = _b.options, _d = _b.options, _e = (_d === void 0 ? {} : _d).header, _f = _e === void 0 ? {} : _e, _g = _f.columnHeight, optionsHeaderColumnHeight = _g === void 0 ? 0 : _g, _h = _f.columnPadding, optionsHeaderColumnPadding = _h === void 0 ? 0 : _h, _j = _f.columnBorderWidth, optionsHeaderColumnBorderWidth = _j === void 0 ? 0 : _j, _k = _f.align, headerAlign = _k === void 0 ? 'left' : _k, _l = _b.focusedCol, focusedCol = _l === void 0 ? -1 : _l, selectionCols = _b.selectionCols, _m = _b.sortInfo, sortInfo = _m === void 0 ? {} : _m, bodyRow = _b.bodyRow, ri = _b.ri, col = _b.col, _o = _b.col, _p = _o === void 0 ? {} : _o, _q = _p.align, colAlign = _q === void 0 ? '' : _q, _r = _p.colIndex, colIndex = _r === void 0 ? 0 : _r, _s = _p.key, colKey = _s === void 0 ? '' : _s, _t = _p.rowSpan, colRowSpan = _t === void 0 ? 1 : _t, _u = _p.colSpan, colCowSpan = _u === void 0 ? 1 : _u, onClick = _b.onClick;
        var optionsHeader = options.header || {};
        var lineHeight = optionsHeaderColumnHeight -
            optionsHeaderColumnPadding * 2 -
            optionsHeaderColumnBorderWidth;
        return (React.createElement("td", { colSpan: colCowSpan, rowSpan: colRowSpan, className: utils_1.classNames((_a = {},
                _a['axui-datagrid-header-column'] = true,
                _a['axui-datagrid-header-corner'] = col.columnAttr === 'lineNumber',
                _a['focused'] = focusedCol > -1 &&
                    colIndex === focusedCol &&
                    bodyRow.rows.length - 1 === ri + colRowSpan - 1,
                _a['selected'] = selectionCols &&
                    selectionCols[colIndex] &&
                    bodyRow.rows.length - 1 === ri + colRowSpan - 1,
                _a)), style: {
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
