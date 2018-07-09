"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
const DatagridHeaderCell = ({ options = {}, focusedCol, selectionCols, sortInfo, bodyRow, ri, col, onClick, }) => {
    const { header: optionsHeader = {} } = options;
    const { columnHeight: optionsHeaderColumnHeight = 0, columnPadding: optionsHeaderColumnPadding = 0, columnBorderWidth: optionsHeaderColumnBorderWidth = 0, align: headerAlign = '', } = optionsHeader;
    const colAlign = col.align || headerAlign || '';
    let lineHeight = optionsHeaderColumnHeight -
        optionsHeaderColumnPadding * 2 -
        optionsHeaderColumnBorderWidth;
    let label, sorter;
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
    let cellHeight = optionsHeaderColumnHeight * (col.rowSpan || 1) -
        optionsHeaderColumnBorderWidth;
    let tdClassNames = {
        ['axui-datagrid-header-column']: true,
        ['axui-datagrid-header-corner']: col.columnAttr === 'lineNumber',
        ['focused']: (focusedCol || 0) > -1 &&
            col.colIndex === focusedCol &&
            bodyRow.rows.length - 1 === ri + (col.rowSpan || 1) - 1,
        ['selected']: selectionCols &&
            selectionCols[col.colIndex || 0] &&
            bodyRow.rows.length - 1 === ri + (col.rowSpan || 1) - 1,
    };
    return (React.createElement("td", { colSpan: col.colSpan, rowSpan: col.rowSpan, className: utils_1.classNames(tdClassNames), style: { height: cellHeight, minHeight: '1px' }, onClick: (e) => {
            onClick(e, col);
        } },
        React.createElement("span", { "data-span": true, "data-align": colAlign, style: {
                height: optionsHeaderColumnHeight - optionsHeaderColumnBorderWidth + 'px',
                lineHeight: lineHeight + 'px',
            } },
            sorter,
            label || ' '),
        optionsHeader.enableFilter && col.key && (col.colIndex || 0) > -1 ? (React.createElement("span", { "data-filter": "true", "data-filter-index": col.colIndex })) : null));
};
exports.default = hoc_1.connectStore(DatagridHeaderCell);
//# sourceMappingURL=DataGridHeaderCell.js.map