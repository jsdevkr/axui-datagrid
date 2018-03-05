"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const constant_1 = require("../_inc/constant");
const isString_1 = __importDefault(require("lodash-es/isString"));
const isFunction_1 = __importDefault(require("lodash-es/isFunction"));
class GridBodyCell extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.inlineEditingCell !== prevProps.inlineEditingCell) {
            if (this.editInput) {
                this.editInput.select();
            }
        }
    }
    getFieldSpan(_colGroup, _col, _item, _itemIdx) {
        const { list, columnFormatter } = this.props;
        const getLabel = function (_colGroup, _col, _item, _itemIdx) {
            let formatterData = {
                list: list,
                item: _item,
                index: _itemIdx,
                key: _col.key,
                value: _item[_col.key]
            };
            let label;
            if (isString_1.default(_col.formatter) && _col.formatter in columnFormatter) {
                label = columnFormatter[_col.formatter](formatterData);
            }
            else if (isFunction_1.default(_col.formatter)) {
                label = _col.formatter(formatterData);
            }
            else {
                label = _item[_col.key];
            }
            return label;
        };
        let lineHeight = (this.props.columnHeight - this.props.columnPadding * 2 - this.props.columnBorderWidth);
        let colAlign = this.props.bodyAlign || _col.align;
        let label;
        if (_col.key === '__line_number__') {
            label = _itemIdx + 1;
        }
        else if (_col.key === '__row_selector__') {
            label = react_1.default.createElement("div", { className: classnames_1.default('axd-check-box'), style: { maxHeight: (_col.width - 10) + 'px', minHeight: (_col.width - 10) + 'px' } });
        }
        else {
            label = getLabel(_colGroup, _col, _item, _itemIdx);
        }
        let spanStyle = {
            height: (this.props.columnHeight - this.props.columnBorderWidth) + 'px',
            lineHeight: lineHeight + 'px',
            textAlign: colAlign
        };
        return (react_1.default.createElement("span", { "data-span": _col.columnAttr || '', "data-pos": _col.colIndex + ',' + _col.rowIndex + ',' + _itemIdx, style: spanStyle }, label || ' '));
    }
    render() {
        const { columnHeight, columnBorderWidth, focusedRow, focusedCol, selectionRows, selectionCols, isInlineEditing, inlineEditingCell, onDoubleClickCell, list, li, colGroup, col, ci, value, onEditInput } = this.props;
        let cellHeight = columnHeight * col.rowspan;
        let tdClassNames = {
            ['axd-line-number']: (col.columnAttr === 'lineNumber'),
            ['axd-row-selector']: (col.columnAttr === 'rowSelector')
        };
        if (col.columnAttr === 'lineNumber') {
            if (focusedRow === li) {
                tdClassNames['focused'] = true;
            }
            if (selectionRows[li]) {
                tdClassNames['selected'] = true;
            }
        }
        else if (col.columnAttr === 'rowSelector') {
        }
        else {
            if (selectionRows[li] && selectionCols[col.colIndex]) {
                tdClassNames['selected'] = true;
            }
            if (focusedRow === li && focusedCol == col.colIndex) {
                tdClassNames['focused'] = true;
            }
        }
        if (isInlineEditing && inlineEditingCell.row === li && inlineEditingCell.col === col.colIndex) {
            return (react_1.default.createElement("td", { key: ci, colSpan: col.colspan, rowSpan: col.rowspan, className: classnames_1.default(tdClassNames), style: { height: cellHeight, minHeight: '1px' } },
                react_1.default.createElement("input", { type: 'text', ref: input => {
                        this.editInput = input;
                    }, onBlur: e => {
                        onEditInput(constant_1.E_NAME.BLUR, e);
                    }, onKeyDown: e => {
                        onEditInput(constant_1.E_NAME.KEY_DOWN, e);
                    }, "data-inline-edit": true, defaultValue: value })));
        }
        else {
            return (react_1.default.createElement("td", { key: ci, colSpan: col.colspan, rowSpan: col.rowspan, className: classnames_1.default(tdClassNames), style: { height: cellHeight, minHeight: '1px' }, onDoubleClick: e => {
                    onDoubleClickCell(e, col, li);
                } }, this.getFieldSpan(colGroup, col, list.get(li), li)));
        }
    }
}
exports.GridBodyCell = GridBodyCell;
//# sourceMappingURL=GridBodyCell.js.map