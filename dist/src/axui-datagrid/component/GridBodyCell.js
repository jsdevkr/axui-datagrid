"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var constant_1 = require("../_inc/constant");
var lodash_1 = require("lodash");
var GridBodyCell = /** @class */ (function (_super) {
    __extends(GridBodyCell, _super);
    function GridBodyCell(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    GridBodyCell.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.inlineEditingCell !== prevProps.inlineEditingCell) {
            if (this.editInput) {
                this.editInput.select();
            }
        }
    };
    GridBodyCell.prototype.getFieldSpan = function (_colGroup, _col, _item, _itemIdx) {
        var _a = this.props, list = _a.list, columnFormatter = _a.columnFormatter;
        var getLabel = function (_colGroup, _col, _item, _itemIdx) {
            var formatterData = {
                list: list,
                item: _item,
                index: _itemIdx,
                key: _col.key,
                value: _item[_col.key],
            };
            var label;
            if (lodash_1.isString(_col.formatter) && _col.formatter in columnFormatter) {
                label = columnFormatter[_col.formatter](formatterData);
            }
            else if (lodash_1.isFunction(_col.formatter)) {
                label = _col.formatter(formatterData);
            }
            else {
                label = _item[_col.key];
            }
            return label;
        };
        var lineHeight = this.props.columnHeight -
            this.props.columnPadding * 2 -
            this.props.columnBorderWidth;
        var colAlign = this.props.bodyAlign || _col.align;
        var label;
        if (_col.key === '__line_number__') {
            label = _itemIdx + 1;
        }
        else if (_col.key === '__row_selector__') {
            label = (React.createElement("div", { className: classnames_1.default('axd-check-box'), style: {
                    maxHeight: _col.width - 10 + 'px',
                    minHeight: _col.width - 10 + 'px',
                } }));
        }
        else {
            label = getLabel(_colGroup, _col, _item, _itemIdx);
        }
        var spanStyle = {
            height: this.props.columnHeight - this.props.columnBorderWidth + 'px',
            lineHeight: lineHeight + 'px',
            textAlign: colAlign,
        };
        return (React.createElement("span", { "data-span": _col.columnAttr || '', "data-pos": _col.colIndex + ',' + _col.rowIndex + ',' + _itemIdx, style: spanStyle }, label || ' '));
    };
    GridBodyCell.prototype.render = function () {
        var _this = this;
        var _a = this.props, columnHeight = _a.columnHeight, columnBorderWidth = _a.columnBorderWidth, focusedRow = _a.focusedRow, focusedCol = _a.focusedCol, selectionRows = _a.selectionRows, selectionCols = _a.selectionCols, isInlineEditing = _a.isInlineEditing, inlineEditingCell = _a.inlineEditingCell, onDoubleClickCell = _a.onDoubleClickCell, list = _a.list, li = _a.li, colGroup = _a.colGroup, col = _a.col, ci = _a.ci, value = _a.value, onEditInput = _a.onEditInput;
        var cellHeight = columnHeight * col.rowspan;
        var tdClassNames = (_b = {},
            _b['axd-line-number'] = col.columnAttr === 'lineNumber',
            _b['axd-row-selector'] = col.columnAttr === 'rowSelector',
            _b);
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
        if (isInlineEditing &&
            inlineEditingCell.row === li &&
            inlineEditingCell.col === col.colIndex) {
            return (React.createElement("td", { key: ci, colSpan: col.colspan, rowSpan: col.rowspan, className: classnames_1.default(tdClassNames), style: { height: cellHeight, minHeight: '1px' } },
                React.createElement("input", { type: "text", ref: function (input) {
                        _this.editInput = input;
                    }, onBlur: function (e) {
                        onEditInput(constant_1.E_NAME.BLUR, e);
                    }, onKeyDown: function (e) {
                        onEditInput(constant_1.E_NAME.KEY_DOWN, e);
                    }, "data-inline-edit": true, defaultValue: value })));
        }
        else {
            return (React.createElement("td", { key: ci, colSpan: col.colspan, rowSpan: col.rowspan, className: classnames_1.default(tdClassNames), style: { height: cellHeight, minHeight: '1px' }, onDoubleClick: function (e) {
                    onDoubleClickCell(e, col, li);
                } }, this.getFieldSpan(colGroup, col, list.get(li), li)));
        }
        var _b;
    };
    return GridBodyCell;
}(React.Component));
exports.GridBodyCell = GridBodyCell;
//# sourceMappingURL=GridBodyCell.js.map