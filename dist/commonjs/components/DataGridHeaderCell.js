"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var DatagridHeaderCell = function (_a) {
    var _b = _a.options, options = _b === void 0 ? {} : _b, focusedCol = _a.focusedCol, selectionCols = _a.selectionCols, sortInfo = _a.sortInfo, bodyRow = _a.bodyRow, ri = _a.ri, col = _a.col, onClick = _a.onClick;
    var _c = options.header, optionsHeader = _c === void 0 ? {} : _c;
    var _d = optionsHeader.columnHeight, optionsHeaderColumnHeight = _d === void 0 ? 0 : _d, _e = optionsHeader.columnPadding, optionsHeaderColumnPadding = _e === void 0 ? 0 : _e, _f = optionsHeader.columnBorderWidth, optionsHeaderColumnBorderWidth = _f === void 0 ? 0 : _f, _g = optionsHeader.align, headerAlign = _g === void 0 ? '' : _g;
    var colAlign = col.align || headerAlign || '';
    var lineHeight = optionsHeaderColumnHeight -
        optionsHeaderColumnPadding * 2 -
        optionsHeaderColumnBorderWidth;
    var label, sorter;
    if (col.key === '__row_selector__') {
        if (optionsHeader.selector) {
            label = (React.createElement("div", { className: "axui-datagrid-check-box", style: {
                    maxHeight: lineHeight + 'px',
                    minHeight: lineHeight + 'px',
                } }));
        }
    }
    else {
        label = col.label;
    }
    if (col.key &&
        col.colIndex !== null &&
        typeof col.colIndex !== 'undefined' &&
        sortInfo &&
        sortInfo[col.key]) {
        sorter = (React.createElement("span", { "data-sorter": col.colIndex, "data-sorter-order": sortInfo[col.key].orderBy }));
    }
    var cellHeight = optionsHeaderColumnHeight * (col.rowSpan || 1) -
        optionsHeaderColumnBorderWidth;
    var tdClassNames = (_h = {},
        _h['axui-datagrid-header-column'] = true,
        _h['axui-datagrid-header-corner'] = col.columnAttr === 'lineNumber',
        _h['focused'] = (focusedCol || 0) > -1 &&
            col.colIndex === focusedCol &&
            bodyRow.rows.length - 1 === ri + (col.rowSpan || 1) - 1,
        _h['selected'] = selectionCols &&
            selectionCols[col.colIndex || 0] &&
            bodyRow.rows.length - 1 === ri + (col.rowSpan || 1) - 1,
        _h);
    return (React.createElement("td", { colSpan: col.colSpan, rowSpan: col.rowSpan, className: utils_1.classNames(tdClassNames), style: { height: cellHeight, minHeight: '1px' }, onClick: function (e) {
            onClick(e, col);
        } },
        React.createElement("span", { "data-span": true, "data-align": colAlign, style: {
                height: optionsHeaderColumnHeight - optionsHeaderColumnBorderWidth + 'px',
                lineHeight: lineHeight + 'px',
            } },
            sorter,
            label || ' '),
        optionsHeader.enableFilter && col.key && (col.colIndex || 0) > -1 ? (React.createElement("span", { "data-filter": "true", "data-filter-index": col.colIndex })) : null));
    var _h;
};
exports.default = hoc_1.connectStore(DatagridHeaderCell);
//# sourceMappingURL=DataGridHeaderCell.js.map