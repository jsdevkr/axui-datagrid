"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
const CellLabelBottom_1 = require("./CellLabelBottom");
const DataGridBodyBottomCell = props => {
    const { data = [], col = {}, ci, options = {}, predefinedFormatter = {}, predefinedCollector = {}, } = props;
    const { body: optionsBody = {} } = options;
    const { columnHeight = 0, columnPadding = 0, columnBorderWidth = 0, align: bodyAlign = 'left', } = optionsBody;
    const { rowSpan: colRowSpan = 0, colIndex: colColIndex = 0, align: colAlign = bodyAlign || '', columnAttr = '', colSpan = 1, rowSpan = 1, } = col;
    const tdClassNames = {
        ['axui-datagrid-line-number']: columnAttr === 'lineNumber',
        ['axui-datagrid-row-selector']: columnAttr === 'rowSelector',
    };
    const lineHeight = columnHeight - columnPadding * 2 - columnBorderWidth;
    return (React.createElement("td", { key: ci, colSpan: colSpan, rowSpan: rowSpan, className: utils_1.classNames(tdClassNames), style: { height: columnHeight * colRowSpan, minHeight: '1px' } },
        React.createElement(CellLabelBottom_1.default, { columnHeight: columnHeight, lineHeight: lineHeight, columnBorderWidth: columnBorderWidth, colAlign: colAlign, col: col, list: data, predefinedFormatter: predefinedFormatter, predefinedCollector: predefinedCollector })));
};
exports.default = hoc_1.connectStore(DataGridBodyBottomCell);
