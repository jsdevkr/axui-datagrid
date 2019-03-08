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
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var CellLabel_1 = require("./CellLabel");
var CellEditor_1 = require("./CellEditor");
var DataGridBodyCell = /** @class */ (function (_super) {
    __extends(DataGridBodyCell, _super);
    function DataGridBodyCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
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
    DataGridBodyCell.prototype.shouldComponentUpdate = function (nextProps) {
        var _a = this.props, li = _a.li, _b = _a.col, col = _b === void 0 ? {} : _b, _c = _a.selectionRows, selectionRows = _c === void 0 ? [] : _c, _d = _a.selectionCols, selectionCols = _d === void 0 ? [] : _d, _e = _a.inlineEditingCell, inlineEditingCell = _e === void 0 ? {} : _e, _f = _a.data, data = _f === void 0 ? [] : _f;
        var _g = col.colIndex, colIndex = _g === void 0 ? 0 : _g;
        var editRowIndex = inlineEditingCell.rowIndex, editColIndex = inlineEditingCell.colIndex;
        var _h = nextProps.selectionRows, _selectionRows = _h === void 0 ? [] : _h, _j = nextProps.selectionCols, _selectionCols = _j === void 0 ? [] : _j, _k = nextProps.inlineEditingCell, _inlineEditingCell = _k === void 0 ? {} : _k, _l = nextProps.data, _data = _l === void 0 ? [] : _l;
        var _editRowIndex = _inlineEditingCell.rowIndex, _editColIndex = _inlineEditingCell.colIndex;
        if (this.props.data !== nextProps.data ||
            this.props.colGroup !== nextProps.colGroup) {
            return true;
        }
        if (_selectionRows[li] !== selectionRows[li] ||
            selectionCols[colIndex] !== _selectionCols[colIndex]) {
            return true;
        }
        if (this.props.isInlineEditing !== nextProps.isInlineEditing &&
            ((editRowIndex === li && editColIndex === colIndex) ||
                (_editRowIndex === li && _editColIndex === colIndex))) {
            return true;
        }
        if (this.props.scrollTop !== nextProps.scrollTop ||
            this.props.scrollLeft !== nextProps.scrollLeft) {
            return true;
        }
        // if (li === 5 && colIndex === 6) {
        //   console.log(
        //     data[li][col.key || ''],
        //     nextProps.data![li][col.key || ''],
        //     col,
        //   );
        // }
        // if (data[li][col.key || ''] !== nextProps.data![li][col.key || '']) {
        //   return true;
        // }
        // return (
        //   ((this.props.isInlineEditing !== nextProps.isInlineEditing &&
        //     this.props.inlineEditingCell &&
        //     this.props.inlineEditingCell.rowIndex === li) ||
        //     this.props.inlineEditingCell.colIndex === li)
        // );
        return false;
    };
    DataGridBodyCell.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, _c = _b.data, data = _c === void 0 ? [] : _c, focusedRow = _b.focusedRow, focusedCol = _b.focusedCol, _d = _b.selectionRows, selectionRows = _d === void 0 ? [] : _d, _e = _b.selectionCols, selectionCols = _e === void 0 ? [] : _e, li = _b.li, _f = _b.col, col = _f === void 0 ? {} : _f, ci = _b.ci, _g = _b.options, options = _g === void 0 ? {} : _g, _h = _b.isInlineEditing, isInlineEditing = _h === void 0 ? false : _h, _j = _b.inlineEditingCell, inlineEditingCell = _j === void 0 ? {} : _j, _k = _b.predefinedFormatter, predefinedFormatter = _k === void 0 ? {} : _k;
        // console.log('render');
        var _l = options.body, optionsBody = _l === void 0 ? {} : _l;
        var _m = optionsBody.columnHeight, columnHeight = _m === void 0 ? 0 : _m, _o = optionsBody.columnPadding, columnPadding = _o === void 0 ? 0 : _o, _p = optionsBody.columnBorderWidth, columnBorderWidth = _p === void 0 ? 0 : _p, _q = optionsBody.align, bodyAlign = _q === void 0 ? 'left' : _q;
        var _r = col.rowSpan, rowSpan = _r === void 0 ? 0 : _r, _s = col.colSpan, colSpan = _s === void 0 ? 0 : _s, _t = col.colIndex, colIndex = _t === void 0 ? 0 : _t, _u = col.rowIndex, rowIndex = _u === void 0 ? 0 : _u, _v = col.align, colAlign = _v === void 0 ? bodyAlign : _v, _w = col.columnAttr, columnAttr = _w === void 0 ? '' : _w, editor = col.editor;
        var cellHeight = columnHeight * rowSpan;
        var lineHeight = columnHeight - columnPadding * 2 - columnBorderWidth;
        var tdClassNames = (_a = {},
            _a['axui-datagrid-line-number'] = columnAttr === 'lineNumber',
            _a['axui-datagrid-row-selector'] = columnAttr === 'rowSelector',
            _a);
        switch (columnAttr) {
            case 'lineNumber':
                if (focusedRow === li) {
                    tdClassNames.focused = true;
                }
                if (selectionRows[li]) {
                    tdClassNames.selected = true;
                }
                break;
            case 'rowSelector':
                break;
            default:
                if (selectionRows[li] && selectionCols[colIndex]) {
                    tdClassNames.selected = true;
                }
                if (focusedRow === li && focusedCol === colIndex) {
                    tdClassNames.focused = true;
                }
        }
        var colEditor = editor === 'string'
            ? { type: '' + editor }
            : editor;
        var inlineEditingActive = isInlineEditing &&
            inlineEditingCell.rowIndex === li &&
            inlineEditingCell.colIndex === colIndex;
        var inlineEditingActiveAlways = colEditor && colEditor.activeType === 'always';
        return (React.createElement("td", { key: ci, colSpan: colSpan, rowSpan: rowSpan, className: utils_1.classNames(tdClassNames), style: { height: cellHeight, minHeight: '1px' }, onDoubleClick: function (e) {
                if (!inlineEditingActive) {
                    _this.onDoubleClickCell(e, col, li);
                }
            } }, inlineEditingActiveAlways || inlineEditingActive ? (React.createElement(CellEditor_1.default, { col: col, li: li, value: data[li][col.key || ''] })) : (React.createElement(CellLabel_1.default, { columnHeight: columnHeight, lineHeight: lineHeight, columnBorderWidth: columnBorderWidth, colAlign: colAlign, col: col, list: data, li: li, predefinedFormatter: predefinedFormatter }))));
    };
    return DataGridBodyCell;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridBodyCell);
