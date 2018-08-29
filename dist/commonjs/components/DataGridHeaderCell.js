"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var DatagridHeaderCell = function (_a) {
    var _b = _a.listSelectedAll, listSelectedAll = _b === void 0 ? false : _b, _c = _a.options, options = _c === void 0 ? {} : _c, _d = _a.focusedCol, focusedCol = _d === void 0 ? -1 : _d, selectionCols = _a.selectionCols, sortInfo = _a.sortInfo, bodyRow = _a.bodyRow, ri = _a.ri, col = _a.col, onClick = _a.onClick, _e = _a.filterInfo, filterInfo = _e === void 0 ? {} : _e;
    var _f;
    var _g = options.header, optionsHeader = _g === void 0 ? {} : _g;
    var _h = optionsHeader.columnHeight, optionsHeaderColumnHeight = _h === void 0 ? 0 : _h, _j = optionsHeader.columnPadding, optionsHeaderColumnPadding = _j === void 0 ? 0 : _j, _k = optionsHeader.columnBorderWidth, optionsHeaderColumnBorderWidth = _k === void 0 ? 0 : _k, _l = optionsHeader.align, headerAlign = _l === void 0 ? '' : _l;
    var _m = col.align, colAlign = _m === void 0 ? headerAlign || '' : _m, _o = col.colIndex, colIndex = _o === void 0 ? 0 : _o, _p = col.key, colKey = _p === void 0 ? '' : _p, _q = col.label, colLabel = _q === void 0 ? '' : _q, _r = col.rowSpan, colRowSpan = _r === void 0 ? 1 : _r, _s = col.colSpan, colCowSpan = _s === void 0 ? 1 : _s;
    var lineHeight = optionsHeaderColumnHeight -
        optionsHeaderColumnPadding * 2 -
        optionsHeaderColumnBorderWidth;
    var label, sorter, filter;
    if (col.key === '_row_selector_') {
        if (optionsHeader.selector) {
            label = (React.createElement("div", { className: "axui-datagrid-check-box", "data-checked": listSelectedAll, style: {
                    maxHeight: lineHeight + 'px',
                    minHeight: lineHeight + 'px',
                } }));
        }
    }
    else {
        label = colLabel;
    }
    if (colKey && sortInfo && sortInfo[colKey]) {
        sorter = (React.createElement("span", { "data-sorter": colIndex, "data-sorter-order": sortInfo[colKey].orderBy }));
    }
    if (optionsHeader.enableFilter && colKey && colIndex > -1) {
        filter = (React.createElement("span", { "data-filter": !!filterInfo[colIndex], "data-filter-index": colIndex }));
    }
    var cellHeight = optionsHeaderColumnHeight * colRowSpan - optionsHeaderColumnBorderWidth;
    var tdClassNames = (_f = {},
        _f['axui-datagrid-header-column'] = true,
        _f['axui-datagrid-header-corner'] = col.columnAttr === 'lineNumber',
        _f['focused'] = focusedCol > -1 &&
            col.colIndex === focusedCol &&
            bodyRow.rows.length - 1 === ri + colRowSpan - 1,
        _f['selected'] = selectionCols &&
            selectionCols[colIndex] &&
            bodyRow.rows.length - 1 === ri + colRowSpan - 1,
        _f);
    return (React.createElement("td", { colSpan: colCowSpan, rowSpan: colRowSpan, className: utils_1.classNames(tdClassNames), style: { height: cellHeight, minHeight: '1px' }, onClick: function (e) {
            onClick(e, col);
        } },
        React.createElement("span", { "data-span": true, "data-align": colAlign, style: {
                height: optionsHeaderColumnHeight - optionsHeaderColumnBorderWidth + 'px',
                lineHeight: lineHeight + 'px',
            } },
            sorter,
            label || ' '),
        filter));
};
exports.default = hoc_1.connectStore(DatagridHeaderCell);
//# sourceMappingURL=DataGridHeaderCell.js.map