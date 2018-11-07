"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
var _enums_1 = require("../common/@enums");
var CellLabel = function (props) {
    var col = props.col, data = props.list, li = props.li, lineHeight = props.lineHeight, predefinedFormatter = props.predefinedFormatter;
    var _a = col.key, key = _a === void 0 ? '' : _a, _b = col.columnAttr, columnAttr = _b === void 0 ? '' : _b, formatter = col.formatter;
    var formatterData = {
        data: data,
        item: data[li],
        index: li,
        key: col.key,
        value: data[li][col.key || ''],
    };
    switch (key) {
        case '_line_number_':
            return React.createElement(React.Fragment, null, li + 1);
        case '_row_selector_':
            return (React.createElement("div", { className: "axui-datagrid-check-box", "data-span": columnAttr, "data-checked": data[li]._selected_, style: {
                    maxHeight: lineHeight + 'px',
                    minHeight: lineHeight + 'px',
                } }));
        default:
            var labelValue = void 0;
            if (typeof formatter === 'string' && formatter in predefinedFormatter) {
                labelValue = predefinedFormatter[formatter](formatterData);
            }
            else if (utils_1.isFunction(formatter)) {
                labelValue = formatter(formatterData);
            }
            else {
                labelValue = data[li][key];
            }
            return React.createElement(React.Fragment, null, labelValue);
    }
};
var DataGridBodyCell = /** @class */ (function (_super) {
    __extends(DataGridBodyCell, _super);
    function DataGridBodyCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.activeComposition = false;
        _this.setEditInputNode = function (element) {
            _this.editInput = element;
        };
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
        _this.onKeyUp = function (e, col, li) {
            var _a;
            var setStoreState = _this.props.setStoreState;
            var proc = (_a = {},
                _a[_enums_1.KeyCodes.ENTER] = function () {
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
                },
                _a);
            proc[e.which] && proc[e.which]();
        };
        _this.onEventInput = function (eventName, e) {
            var _a;
            var _b = _this.props, rootNode = _b.rootNode, setStoreState = _b.setStoreState, dispatch = _b.dispatch, _c = _b.inlineEditingCell, inlineEditingCell = _c === void 0 ? {} : _c;
            var proc = (_a = {},
                _a[_enums_1.EventNames.BLUR] = function () {
                    setStoreState({
                        isInlineEditing: false,
                        inlineEditingCell: {},
                    });
                    if (rootNode && rootNode.current) {
                        rootNode.current.focus();
                    }
                },
                _a[_enums_1.EventNames.KEYUP] = function () {
                    switch (e.which) {
                        case _enums_1.KeyCodes.ESC:
                            setStoreState({
                                isInlineEditing: false,
                                inlineEditingCell: {},
                            });
                            if (rootNode && rootNode.current) {
                                rootNode.current.focus();
                            }
                            break;
                        case _enums_1.KeyCodes.UP_ARROW:
                        case _enums_1.KeyCodes.DOWN_ARROW:
                        case _enums_1.KeyCodes.ENTER:
                            if (!_this.activeComposition) {
                                dispatch(_enums_1.DispatchTypes.UPDATE, {
                                    row: inlineEditingCell.rowIndex,
                                    colIndex: inlineEditingCell.colIndex,
                                    value: e.currentTarget.value,
                                    eventWhichKey: e.which,
                                });
                            }
                            break;
                        default:
                            break;
                    }
                },
                _a);
            proc[eventName] && proc[eventName]();
        };
        return _this;
    }
    DataGridBodyCell.prototype.componentDidUpdate = function (prevProps) {
        if (this.editInput) {
            this.activeComposition = false;
            this.editInput.select();
        }
    };
    DataGridBodyCell.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, _c = _b.filteredList, filteredList = _c === void 0 ? [] : _c, focusedRow = _b.focusedRow, focusedCol = _b.focusedCol, _d = _b.selectionRows, selectionRows = _d === void 0 ? [] : _d, _e = _b.selectionCols, selectionCols = _e === void 0 ? [] : _e, li = _b.li, _f = _b.col, col = _f === void 0 ? {} : _f, ci = _b.ci, value = _b.value, _g = _b.options, options = _g === void 0 ? {} : _g, _h = _b.isInlineEditing, isInlineEditing = _h === void 0 ? false : _h, _j = _b.inlineEditingCell, inlineEditingCell = _j === void 0 ? {} : _j, _k = _b.predefinedFormatter, predefinedFormatter = _k === void 0 ? {} : _k;
        var _l = options.body, optionsBody = _l === void 0 ? {} : _l;
        var _m = optionsBody.columnHeight, columnHeight = _m === void 0 ? 0 : _m, _o = optionsBody.columnPadding, columnPadding = _o === void 0 ? 0 : _o, _p = optionsBody.columnBorderWidth, columnBorderWidth = _p === void 0 ? 0 : _p, _q = optionsBody.align, bodyAlign = _q === void 0 ? 'left' : _q;
        var _r = col.rowSpan, rowSpan = _r === void 0 ? 0 : _r, _s = col.colSpan, colSpan = _s === void 0 ? 0 : _s, _t = col.colIndex, colIndex = _t === void 0 ? 0 : _t, _u = col.rowIndex, rowIndex = _u === void 0 ? 0 : _u, _v = col.align, colAlign = _v === void 0 ? bodyAlign : _v, _w = col.columnAttr, columnAttr = _w === void 0 ? '' : _w;
        var cellHeight = columnHeight * rowSpan;
        var tdClassNames = (_a = {},
            _a['axui-datagrid-line-number'] = columnAttr === 'lineNumber',
            _a['axui-datagrid-row-selector'] = columnAttr === 'rowSelector',
            _a);
        if (columnAttr === 'lineNumber') {
            if (focusedRow === li) {
                tdClassNames.focused = true;
            }
            if (selectionRows[li]) {
                tdClassNames.selected = true;
            }
        }
        else if (columnAttr === 'rowSelector') {
        }
        else {
            if (selectionRows[li] && selectionCols[colIndex]) {
                tdClassNames.selected = true;
            }
            if (focusedRow === li && focusedCol === colIndex) {
                tdClassNames.focused = true;
            }
        }
        if (isInlineEditing &&
            inlineEditingCell.rowIndex === li &&
            inlineEditingCell.colIndex === colIndex) {
            return (React.createElement("td", { key: ci, colSpan: colSpan, rowSpan: rowSpan, className: utils_1.classNames(tdClassNames), style: { height: cellHeight, minHeight: '1px' } },
                React.createElement("input", { type: "text", ref: this.setEditInputNode, onCompositionUpdate: function (e) {
                        _this.activeComposition = true;
                    }, onCompositionEnd: function (e) {
                        setTimeout(function () {
                            _this.activeComposition = false;
                        });
                    }, onBlur: function (e) {
                        _this.onEventInput(_enums_1.EventNames.BLUR, e);
                    }, onKeyUp: function (e) {
                        _this.onEventInput(_enums_1.EventNames.KEYUP, e);
                    }, "data-inline-edit": true, defaultValue: value })));
        }
        else {
            var lineHeight = columnHeight - columnPadding * 2 - columnBorderWidth;
            return (React.createElement("td", { key: ci, colSpan: colSpan, rowSpan: rowSpan, className: utils_1.classNames(tdClassNames), style: { height: cellHeight, minHeight: '1px' }, onDoubleClick: function (e) {
                    _this.onDoubleClickCell(e, col, li);
                } },
                React.createElement("span", { "data-span": columnAttr, "data-pos": colIndex + ',' + rowIndex + ',' + li, style: {
                        height: columnHeight - columnBorderWidth + 'px',
                        lineHeight: lineHeight + 'px',
                        textAlign: colAlign,
                    } },
                    React.createElement(CellLabel, { lineHeight: lineHeight, col: col, list: filteredList, li: li, predefinedFormatter: predefinedFormatter }))));
        }
    };
    return DataGridBodyCell;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridBodyCell);
