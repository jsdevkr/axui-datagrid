"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
const CellLabel = ({ col, lineHeight, optionsHeader, listSelectedAll }) => {
    const { key = '', label = '' } = col;
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
const CellSorter = ({ show, colIndex, orderBy }) => show ? React.createElement("span", { "data-sorter": colIndex, "data-sorter-order": orderBy }) : null;
const CellFilter = ({ show, colIndex, isFiltered }) => show ? React.createElement("span", { "data-filter": isFiltered, "data-filter-index": colIndex }) : null;
const DatagridHeaderCell = ({ listSelectedAll = false, options = {}, focusedCol = -1, selectionCols, sortInfo = {}, bodyRow, ri, col, onClick, filterInfo = {}, }) => {
    const { header: optionsHeader = {} } = options;
    const { columnHeight: optionsHeaderColumnHeight = 0, columnPadding: optionsHeaderColumnPadding = 0, columnBorderWidth: optionsHeaderColumnBorderWidth = 0, align: headerAlign = '', } = optionsHeader;
    const { align: colAlign = headerAlign || '', colIndex = 0, key: colKey = '', rowSpan: colRowSpan = 1, colSpan: colCowSpan = 1, } = col;
    const lineHeight = optionsHeaderColumnHeight -
        optionsHeaderColumnPadding * 2 -
        optionsHeaderColumnBorderWidth;
    return (React.createElement("td", { colSpan: colCowSpan, rowSpan: colRowSpan, className: utils_1.classNames({
            ['axui-datagrid-header-column']: true,
            ['axui-datagrid-header-corner']: col.columnAttr === 'lineNumber',
            ['focused']: focusedCol > -1 &&
                colIndex === focusedCol &&
                bodyRow.rows.length - 1 === ri + colRowSpan - 1,
            ['selected']: selectionCols &&
                selectionCols[colIndex] &&
                bodyRow.rows.length - 1 === ri + colRowSpan - 1,
        }), style: {
            height: optionsHeaderColumnHeight * colRowSpan -
                optionsHeaderColumnBorderWidth,
            minHeight: '1px',
        }, onClick: (e) => {
            onClick(e, col);
        } },
        React.createElement("span", { "data-span": true, "data-align": colAlign, style: {
                height: optionsHeaderColumnHeight - optionsHeaderColumnBorderWidth + 'px',
                lineHeight: lineHeight + 'px',
            } },
            React.createElement(CellSorter, { show: colKey && sortInfo[colKey], colIndex: colIndex, orderBy: sortInfo[colKey] ? sortInfo[colKey].orderBy : '' }),
            React.createElement(CellLabel, { col: col, lineHeight: lineHeight, optionsHeader: optionsHeader, listSelectedAll: listSelectedAll })),
        React.createElement(CellFilter, { show: (optionsHeader.enableFilter && colKey && colIndex > -1), colIndex: colIndex, isFiltered: !!filterInfo[colIndex] })));
};
exports.default = hoc_1.connectStore(DatagridHeaderCell);
