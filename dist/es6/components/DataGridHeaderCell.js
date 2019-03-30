"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class CellLabel extends React.PureComponent {
    render() {
        const { col: { key = '', label = '' }, rowSelectorSize, optionsHeader, listSelectedAll, } = this.props;
        switch (key) {
            case '_row_selector_':
                if (optionsHeader.selector) {
                    return (React.createElement("div", { className: "axui-datagrid-check-box", "data-checked": listSelectedAll, style: {
                            width: rowSelectorSize + 'px',
                            height: rowSelectorSize + 'px',
                        } }));
                }
                else {
                    return null;
                }
            default:
                return React.createElement(React.Fragment, null, label);
        }
    }
}
class CellSorter extends React.PureComponent {
    render() {
        const { show, colIndex, orderBy } = this.props;
        return show ? (React.createElement("span", { "data-sorter": colIndex, "data-sorter-order": orderBy })) : null;
    }
}
class DatagridHeaderCell extends React.PureComponent {
    render() {
        const { listSelectedAll = false, options, options: { rowSelectorSize = 0, header: { columnHeight: optionsHeaderColumnHeight = 0, columnPadding: optionsHeaderColumnPadding = 0, columnBorderWidth: optionsHeaderColumnBorderWidth = 0, align: headerAlign = 'left', } = {}, } = {}, focusedCol = -1, selectionCols, sortInfo = {}, bodyRow, ri, col, col: { align: colAlign = '', colIndex = 0, key: colKey = '', rowSpan: colRowSpan = 1, colSpan: colCowSpan = 1, columnAttr = '', } = {}, onClick, } = this.props;
        const optionsHeader = options.header || {};
        const lineHeight = optionsHeaderColumnHeight -
            optionsHeaderColumnPadding * 2 -
            optionsHeaderColumnBorderWidth;
        const classNames = ['axui-datagrid-header-column'];
        if (columnAttr === 'lineNumber') {
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
            }, onClick: (e) => {
                onClick(e, col);
            } },
            React.createElement("span", { "data-span": columnAttr, "data-align": colAlign || headerAlign, style: {
                    height: optionsHeaderColumnHeight - optionsHeaderColumnBorderWidth + 'px',
                    lineHeight: lineHeight + 'px',
                } },
                React.createElement(CellSorter, { show: colKey && sortInfo[colKey], colIndex: colIndex, orderBy: sortInfo[colKey] ? sortInfo[colKey].orderBy : '' }),
                React.createElement(CellLabel, { col: col, lineHeight: lineHeight, rowSelectorSize: rowSelectorSize, optionsHeader: optionsHeader, listSelectedAll: listSelectedAll }))));
    }
}
exports.default = DatagridHeaderCell;
