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
        _this.handleActiveInlineEdit = function (e, col, li) {
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
        var _a = this.props, li = _a.li, _b = _a.col, col = _b === void 0 ? {} : _b, _c = _a.col, _d = _c === void 0 ? {} : _c, _e = _d.rowSpan, rowSpan = _e === void 0 ? 0 : _e, _f = _d.colSpan, colSpan = _f === void 0 ? 0 : _f, _g = _d.colIndex, colIndex = _g === void 0 ? 0 : _g, _h = _d.columnAttr, columnAttr = _h === void 0 ? '' : _h, ci = _a.ci, _j = _a.data, data = _j === void 0 ? [] : _j, selected = _a.selected, focusedRow = _a.focusedRow, focusedCol = _a.focusedCol, _k = _a.selectionRows, selectionRows = _k === void 0 ? [] : _k, _l = _a.selectionCols, selectionCols = _l === void 0 ? [] : _l, _m = _a.options, _o = _m === void 0 ? {} : _m, _p = _o.rowSelectorSize, rowSelectorSize = _p === void 0 ? 0 : _p, _q = _o.body, _r = _q === void 0 ? {} : _q, _s = _r.columnHeight, columnHeight = _s === void 0 ? 0 : _s, _t = _r.columnPadding, columnPadding = _t === void 0 ? 0 : _t, _u = _r.columnBorderWidth, columnBorderWidth = _u === void 0 ? 0 : _u, _v = _r.align, bodyAlign = _v === void 0 ? 'left' : _v, _w = _a.isInlineEditing, isInlineEditing = _w === void 0 ? false : _w, _x = _a.inlineEditingCell, inlineEditingCell = _x === void 0 ? {} : _x, _y = _a.predefinedFormatter, predefinedFormatter = _y === void 0 ? {} : _y, setStoreState = _a.setStoreState, dispatch = _a.dispatch;
        var editor = col.editor;
        var colAlign = col.align || bodyAlign;
        var value = data[li] && data[li][col.key || ''];
        var cellHeight = columnHeight * rowSpan;
        var lineHeight = columnHeight - columnPadding * 2 - columnBorderWidth;
        var tdClassNames = [
            "" + (columnAttr === 'lineNumber' ? 'axui-datagrid-line-number' : ''),
            "" + (columnAttr === 'rowSelector' ? 'axui-datagrid-row-selector' : ''),
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
        var activeType = colEditor
            ? colEditor.activeType || 'dblclick'
            : 'dblclick';
        var inlineEditingActive = isInlineEditing &&
            inlineEditingCell.rowIndex === li &&
            inlineEditingCell.colIndex === colIndex;
        var inlineEditingActiveAlways = (colEditor && activeType === 'always') ||
            (colEditor && colEditor.type === 'checkbox');
        var editorDisabled = colEditor && colEditor.disable
            ? colEditor.disable({
                col: col,
                rowIndex: li,
                colIndex: col.colIndex || 0,
                item: data[li],
                value: value,
            })
            : false;
        var displayLabel = true;
        if (colEditor) {
            displayLabel = !(inlineEditingActiveAlways || inlineEditingActive);
            if (colEditor.type !== 'checkbox' && editorDisabled) {
                displayLabel = true;
            }
            if (colEditor.type === 'checkbox' &&
                (inlineEditingActiveAlways || inlineEditingActive)) {
                displayLabel = false;
            }
        }
        return (React.createElement("td", { key: ci, colSpan: colSpan, rowSpan: rowSpan, className: tdClassNames.join(' '), style: { height: cellHeight, minHeight: '1px' }, onDoubleClick: function (e) {
                if (!editorDisabled &&
                    !inlineEditingActive &&
                    activeType === 'dblclick') {
                    _this.handleActiveInlineEdit(e, col, li);
                }
            }, onClick: function (e) {
                if (!editorDisabled &&
                    !inlineEditingActive &&
                    activeType === 'click') {
                    _this.handleActiveInlineEdit(e, col, li);
                }
            } }, displayLabel ? (React.createElement(CellLabel_1.default, { col: col, li: li, item: data[li], columnHeight: columnHeight, lineHeight: lineHeight, columnBorderWidth: columnBorderWidth, rowSelectorSize: rowSelectorSize, colAlign: colAlign, selected: selected, predefinedFormatter: predefinedFormatter })) : (React.createElement(CellEditor_1.default, { col: col, li: li, item: data[li], value: value, columnHeight: columnHeight, lineHeight: lineHeight, columnBorderWidth: columnBorderWidth, colAlign: colAlign, inlineEditingCell: inlineEditingCell, focusedRow: focusedRow, focusedCol: focusedCol, dispatch: dispatch, setStoreState: setStoreState }))));
    };
    return DataGridBodyCell;
}(React.Component));
exports.default = DataGridBodyCell;
