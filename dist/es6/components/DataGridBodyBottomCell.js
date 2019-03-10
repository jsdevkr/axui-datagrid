"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const CellLabelBottom_1 = require("./CellLabelBottom");
class DataGridBodyBottomCell extends React.PureComponent {
    render() {
        const { data = [], col = {}, col: { rowSpan: colRowSpan = 0, align: colAlign = '', columnAttr = '', colSpan = 1, rowSpan = 1, } = {}, ci, options: { body: { columnHeight = 0, columnPadding = 0, columnBorderWidth = 0, align: bodyAlign = 'left', } = {}, } = {}, predefinedFormatter = {}, predefinedCollector = {}, } = this.props;
        const lineHeight = columnHeight - columnPadding * 2 - columnBorderWidth;
        return (React.createElement("td", { key: ci, colSpan: colSpan, rowSpan: rowSpan, className: `${columnAttr === 'lineNumber' &&
                'axui-datagrid-line-number'} ${columnAttr === 'rowSelector' &&
                'axui-datagrid-row-selector'}`, style: { height: columnHeight * colRowSpan, minHeight: '1px' } },
            React.createElement(CellLabelBottom_1.default, { columnHeight: columnHeight, lineHeight: lineHeight, columnBorderWidth: columnBorderWidth, colAlign: colAlign || bodyAlign, col: col, data: data, predefinedFormatter: predefinedFormatter, predefinedCollector: predefinedCollector })));
    }
}
exports.default = DataGridBodyBottomCell;
