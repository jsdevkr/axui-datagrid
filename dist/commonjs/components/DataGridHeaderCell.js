"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var CellLabel = function (_a) {
    var col = _a.col, lineHeight = _a.lineHeight, optionsHeader = _a.optionsHeader, listSelectedAll = _a.listSelectedAll;
    var _b = col.key, key = _b === void 0 ? '' : _b, _c = col.label, label = _c === void 0 ? '' : _c;
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
var CellSorter = function (_a) {
    var show = _a.show, colIndex = _a.colIndex, orderBy = _a.orderBy;
    return show ? React.createElement("span", { "data-sorter": colIndex, "data-sorter-order": orderBy }) : null;
};
var CellFilter = function (_a) {
    var show = _a.show, colIndex = _a.colIndex, isFiltered = _a.isFiltered;
    return show ? React.createElement("span", { "data-filter": isFiltered, "data-filter-index": colIndex }) : null;
};
var DatagridHeaderCell = function (_a) {
    var _b = _a.listSelectedAll, listSelectedAll = _b === void 0 ? false : _b, _c = _a.options, options = _c === void 0 ? {} : _c, _d = _a.focusedCol, focusedCol = _d === void 0 ? -1 : _d, selectionCols = _a.selectionCols, _e = _a.sortInfo, sortInfo = _e === void 0 ? {} : _e, bodyRow = _a.bodyRow, ri = _a.ri, col = _a.col, onClick = _a.onClick;
    var _f;
    var _g = options.header, optionsHeader = _g === void 0 ? {} : _g;
    var _h = optionsHeader.columnHeight, optionsHeaderColumnHeight = _h === void 0 ? 0 : _h, _j = optionsHeader.columnPadding, optionsHeaderColumnPadding = _j === void 0 ? 0 : _j, _k = optionsHeader.columnBorderWidth, optionsHeaderColumnBorderWidth = _k === void 0 ? 0 : _k, _l = optionsHeader.align, headerAlign = _l === void 0 ? '' : _l;
    var _m = col.align, colAlign = _m === void 0 ? headerAlign || '' : _m, _o = col.colIndex, colIndex = _o === void 0 ? 0 : _o, _p = col.key, colKey = _p === void 0 ? '' : _p, _q = col.rowSpan, colRowSpan = _q === void 0 ? 1 : _q, _r = col.colSpan, colCowSpan = _r === void 0 ? 1 : _r;
    var lineHeight = optionsHeaderColumnHeight -
        optionsHeaderColumnPadding * 2 -
        optionsHeaderColumnBorderWidth;
    return (React.createElement("td", { colSpan: colCowSpan, rowSpan: colRowSpan, className: utils_1.classNames((_f = {},
            _f['axui-datagrid-header-column'] = true,
            _f['axui-datagrid-header-corner'] = col.columnAttr === 'lineNumber',
            _f['focused'] = focusedCol > -1 &&
                colIndex === focusedCol &&
                bodyRow.rows.length - 1 === ri + colRowSpan - 1,
            _f['selected'] = selectionCols &&
                selectionCols[colIndex] &&
                bodyRow.rows.length - 1 === ri + colRowSpan - 1,
            _f)), style: {
            height: optionsHeaderColumnHeight * colRowSpan -
                optionsHeaderColumnBorderWidth,
            minHeight: '1px',
        }, onClick: function (e) {
            onClick(e, col);
        } },
        React.createElement("span", { "data-span": true, "data-align": colAlign, style: {
                height: optionsHeaderColumnHeight - optionsHeaderColumnBorderWidth + 'px',
                lineHeight: lineHeight + 'px',
            } },
            React.createElement(CellSorter, { show: colKey && sortInfo[colKey], colIndex: colIndex, orderBy: sortInfo[colKey] ? sortInfo[colKey].orderBy : '' }),
            React.createElement(CellLabel, { col: col, lineHeight: lineHeight, optionsHeader: optionsHeader, listSelectedAll: listSelectedAll }))));
};
exports.default = hoc_1.connectStore(DatagridHeaderCell);
