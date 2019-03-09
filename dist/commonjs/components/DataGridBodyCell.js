"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var CellLabel_1 = require("./CellLabel");
var CellEditor_1 = require("./CellEditor");
var DataGridBodyCell = /** @class */ (function (_super) {
    __extends(DataGridBodyCell, _super);
    function DataGridBodyCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onDoubleClickCell = function (e, col, li) {
            var setStoreState = _this.props.setStoreState;
            if (col.editor) {
                setStoreState({
                    isInlineEditing: true,
                    inlineEditingCell: {
                        rowIndex: li,
                        colIndex: col.colIndex,
                        editor: col.editor,
                    },
                });
            }
        };
        return _this;
    }
    DataGridBodyCell.prototype.render = function () {
        var _this = this;
        var _a = this.props, li = _a.li, _b = _a.col, col = _b === void 0 ? {} : _b, _c = _a.col, _d = _c === void 0 ? {} : _c, _e = _d.rowSpan, rowSpan = _e === void 0 ? 0 : _e, _f = _d.colSpan, colSpan = _f === void 0 ? 0 : _f, _g = _d.colIndex, colIndex = _g === void 0 ? 0 : _g, _h = _d.rowIndex, rowIndex = _h === void 0 ? 0 : _h, _j = _d.columnAttr, columnAttr = _j === void 0 ? '' : _j, ci = _a.ci, _k = _a.data, data = _k === void 0 ? [] : _k, selected = _a.selected, focusedRow = _a.focusedRow, focusedCol = _a.focusedCol, _l = _a.selectionRows, selectionRows = _l === void 0 ? [] : _l, _m = _a.selectionCols, selectionCols = _m === void 0 ? [] : _m, _o = _a.options, _p = (_o === void 0 ? {} : _o).body, _q = _p === void 0 ? {} : _p, _r = _q.columnHeight, columnHeight = _r === void 0 ? 0 : _r, _s = _q.columnPadding, columnPadding = _s === void 0 ? 0 : _s, _t = _q.columnBorderWidth, columnBorderWidth = _t === void 0 ? 0 : _t, _u = _q.align, bodyAlign = _u === void 0 ? 'left' : _u, _v = _a.isInlineEditing, isInlineEditing = _v === void 0 ? false : _v, _w = _a.inlineEditingCell, inlineEditingCell = _w === void 0 ? {} : _w, _x = _a.predefinedFormatter, predefinedFormatter = _x === void 0 ? {} : _x;
        var editor = col.editor;
        var colAlign = col.align || bodyAlign;
        var value = data[li] && data[li][col.key || ''];
        var cellHeight = columnHeight * rowSpan;
        var lineHeight = columnHeight - columnPadding * 2 - columnBorderWidth;
        var tdClassNames = [
            "" + (columnAttr === 'lineNumber' && 'axui-datagrid-line-number'),
            "" + (columnAttr === 'rowSelector' && 'axui-datagrid-row-selector'),
        ];
        switch (columnAttr) {
            case 'lineNumber':
                if (focusedRow === li) {
                    tdClassNames.push('focused');
                }
                if (selectionRows[li]) {
                    tdClassNames.push('selected');
                }
                break;
            case 'rowSelector':
                break;
            default:
                if (selectionRows[li] && selectionCols[colIndex]) {
                    tdClassNames.push('selected');
                }
                if (focusedRow === li && focusedCol === colIndex) {
                    tdClassNames.push('focused');
                }
        }
        var colEditor = editor === 'string'
            ? { type: '' + editor }
            : editor;
        var inlineEditingActive = isInlineEditing &&
            inlineEditingCell.rowIndex === li &&
            inlineEditingCell.colIndex === colIndex;
        var inlineEditingActiveAlways = colEditor && colEditor.activeType === 'always';
        return (React.createElement("td", { key: ci, colSpan: colSpan, rowSpan: rowSpan, className: tdClassNames.join(' '), style: { height: cellHeight, minHeight: '1px' }, onDoubleClick: function (e) {
                if (!inlineEditingActive) {
                    _this.onDoubleClickCell(e, col, li);
                }
            } }, inlineEditingActiveAlways || inlineEditingActive ? (React.createElement(CellEditor_1.default, { col: col, li: li, value: value })) : (React.createElement(CellLabel_1.default, { columnHeight: columnHeight, lineHeight: lineHeight, columnBorderWidth: columnBorderWidth, colAlign: colAlign, col: col, li: li, data: data, selected: selected, predefinedFormatter: predefinedFormatter }))));
    };
    return DataGridBodyCell;
}(React.PureComponent));
exports.default = DataGridBodyCell;
