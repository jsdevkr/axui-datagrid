"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
const DatagridHeaderCell = ({ listSelectedAll = false, options = {}, focusedCol = -1, selectionCols, sortInfo, bodyRow, ri, col, onClick, filterInfo = {}, }) => {
    const { header: optionsHeader = {} } = options;
    const { columnHeight: optionsHeaderColumnHeight = 0, columnPadding: optionsHeaderColumnPadding = 0, columnBorderWidth: optionsHeaderColumnBorderWidth = 0, align: headerAlign = '', } = optionsHeader;
    const { align: colAlign = headerAlign || '', colIndex = 0, key: colKey = '', label: colLabel = '', rowSpan: colRowSpan = 1, colSpan: colCowSpan = 1, } = col;
    let lineHeight = optionsHeaderColumnHeight -
        optionsHeaderColumnPadding * 2 -
        optionsHeaderColumnBorderWidth;
    let label, sorter, filter;
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
    let cellHeight = optionsHeaderColumnHeight * colRowSpan - optionsHeaderColumnBorderWidth;
    let tdClassNames = {
        ['axui-datagrid-header-column']: true,
        ['axui-datagrid-header-corner']: col.columnAttr === 'lineNumber',
        ['focused']: focusedCol > -1 &&
            col.colIndex === focusedCol &&
            bodyRow.rows.length - 1 === ri + colRowSpan - 1,
        ['selected']: selectionCols &&
            selectionCols[colIndex] &&
            bodyRow.rows.length - 1 === ri + colRowSpan - 1,
    };
    return (React.createElement("td", { colSpan: colCowSpan, rowSpan: colRowSpan, className: utils_1.classNames(tdClassNames), style: { height: cellHeight, minHeight: '1px' }, onClick: (e) => {
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