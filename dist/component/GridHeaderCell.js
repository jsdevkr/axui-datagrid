"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
class GridHeaderCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { bodyRow, optionsHeader, focusedCol, selectionCols, sortInfo, ri, col, onClickHeader, } = this.props;
        let lineHeight = optionsHeader.columnHeight -
            optionsHeader.columnPadding * 2 -
            optionsHeader.columnBorderWidth;
        let colAlign = optionsHeader.align || col.align;
        let label, sorter, filter;
        if (col.key === '__checkbox_header__') {
            if (optionsHeader.selector) {
                label = (React.createElement("div", { "data-checkbox": true, style: {
                        maxHeight: col.width - 10 + 'px',
                        minHeight: col.width - 10 + 'px',
                    } }));
            }
        }
        else {
            label = col.label;
        }
        if (col.key &&
            col.colIndex !== null &&
            typeof col.colIndex !== 'undefined' &&
            sortInfo[col.key]) {
            sorter = (React.createElement("span", { "data-sorter": col.colIndex, "data-sorter-order": sortInfo[col.key].orderBy }));
        }
        let cellHeight = optionsHeader.columnHeight * col.rowspan -
            optionsHeader.columnBorderWidth;
        let tdClassNames = {
            ['axd-header-column']: true,
            ['axd-header-corner']: col.columnAttr === 'lineNumber',
            ['focused']: focusedCol > -1 &&
                col.colIndex === focusedCol &&
                bodyRow.rows.length - 1 === ri + col.rowspan - 1,
            ['selected']: selectionCols[col.colIndex] &&
                bodyRow.rows.length - 1 === ri + col.rowspan - 1,
        };
        return (React.createElement("td", { colSpan: col.colspan, rowSpan: col.rowspan, className: classnames_1.default(tdClassNames), onClick: e => onClickHeader(e, col.colIndex, col.columnAttr), style: { height: cellHeight, minHeight: '1px' } },
            React.createElement("span", { "data-span": true, "data-align": colAlign, style: {
                    height: optionsHeader.columnHeight -
                        optionsHeader.columnBorderWidth +
                        'px',
                    lineHeight: lineHeight + 'px',
                } },
                sorter,
                label || ' '),
            optionsHeader.enableFilter && col.key && col.colIndex > -1 ? (React.createElement("span", { "data-filter": "true", "data-filter-index": col.colIndex })) : null));
    }
}
exports.GridHeaderCell = GridHeaderCell;
