"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
class GridHeaderCell extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { bodyRow, optionsHeader, focusedCol, selectionCols, sortInfo, ri, col, onClickHeader } = this.props;
        let lineHeight = (optionsHeader.columnHeight - optionsHeader.columnPadding * 2 - optionsHeader.columnBorderWidth);
        let colAlign = optionsHeader.align || col.align;
        let label, sorter, filter;
        if (col.key === '__checkbox_header__') {
            if (optionsHeader.selector) {
                label = react_1.default.createElement("div", { "data-checkbox": true, style: {
                        maxHeight: (col.width - 10) + 'px',
                        minHeight: (col.width - 10) + 'px'
                    } });
            }
        }
        else {
            label = col.label;
        }
        if (col.key && col.colIndex !== null && typeof col.colIndex !== 'undefined' && sortInfo[col.key]) {
            sorter = react_1.default.createElement("span", { "data-sorter": col.colIndex, "data-sorter-order": sortInfo[col.key].orderBy });
        }
        let cellHeight = optionsHeader.columnHeight * col.rowspan - optionsHeader.columnBorderWidth;
        let tdClassNames = {
            ['axd-header-column']: true,
            ['axd-header-corner']: (col.columnAttr === 'lineNumber'),
            ['focused']: (focusedCol > -1 && col.colIndex === focusedCol && bodyRow.rows.length - 1 === ri + col.rowspan - 1),
            ['selected']: (selectionCols[col.colIndex] && bodyRow.rows.length - 1 === ri + col.rowspan - 1)
        };
        return (react_1.default.createElement("td", { colSpan: col.colspan, rowSpan: col.rowspan, className: classnames_1.default(tdClassNames), onClick: (e) => onClickHeader(e, col.colIndex, col.columnAttr), style: { height: cellHeight, minHeight: '1px' } },
            react_1.default.createElement("span", { "data-span": true, "data-align": colAlign, style: {
                    height: (optionsHeader.columnHeight - optionsHeader.columnBorderWidth) + 'px',
                    lineHeight: lineHeight + 'px'
                } },
                sorter,
                label || ' '),
            (optionsHeader.enableFilter && col.key && col.colIndex > -1) ? react_1.default.createElement("span", { "data-filter": 'true', "data-filter-index": col.colIndex }) : null));
    }
}
exports.GridHeaderCell = GridHeaderCell;
//# sourceMappingURL=GridHeaderCell.js.map