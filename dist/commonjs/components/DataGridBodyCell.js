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
var stores_1 = require("../stores");
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var DataGridBodyCell = /** @class */ (function (_super) {
    __extends(DataGridBodyCell, _super);
    function DataGridBodyCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
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
            var setStoreState = _this.props.setStoreState;
            var proc = (_a = {},
                _a[stores_1.KeyCodes.ENTER] = function () {
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
            var _a;
        };
        _this.onEventInput = function (eventName, e) {
            var _a = _this.props, getRootNode = _a.getRootNode, setStoreState = _a.setStoreState, dispatch = _a.dispatch, _b = _a.inlineEditingCell, inlineEditingCell = _b === void 0 ? {} : _b;
            var rootNode = utils_1.getNode(getRootNode);
            var proc = (_c = {},
                _c[stores_1.EventNames.BLUR] = function () {
                    setStoreState({
                        isInlineEditing: false,
                        inlineEditingCell: {},
                    });
                    if (rootNode) {
                        rootNode.focus();
                    }
                },
                _c[stores_1.EventNames.KEYUP] = function () {
                    switch (e.which) {
                        case stores_1.KeyCodes.ESC:
                            setStoreState({
                                isInlineEditing: false,
                                inlineEditingCell: {},
                            });
                            if (rootNode) {
                                rootNode.focus();
                            }
                            break;
                        case stores_1.KeyCodes.UP_ARROW:
                        case stores_1.KeyCodes.DOWN_ARROW:
                        case stores_1.KeyCodes.ENTER:
                            dispatch(stores_1.DispatchTypes.UPDATE, {
                                row: inlineEditingCell.rowIndex,
                                colIndex: inlineEditingCell.colIndex,
                                value: e.target.value,
                                eventWhichKey: e.which,
                            });
                            break;
                        default:
                            break;
                    }
                },
                _c);
            proc[eventName] && proc[eventName]();
            var _c;
        };
        return _this;
    }
    DataGridBodyCell.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.editInput) {
            this.editInput.select();
        }
    };
    DataGridBodyCell.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.filteredList, filteredList = _b === void 0 ? [] : _b, focusedRow = _a.focusedRow, focusedCol = _a.focusedCol, _c = _a.selectionRows, selectionRows = _c === void 0 ? [] : _c, _d = _a.selectionCols, selectionCols = _d === void 0 ? [] : _d, li = _a.li, _e = _a.col, col = _e === void 0 ? {} : _e, ci = _a.ci, value = _a.value, _f = _a.options, options = _f === void 0 ? {} : _f, _g = _a.isInlineEditing, isInlineEditing = _g === void 0 ? false : _g, _h = _a.inlineEditingCell, inlineEditingCell = _h === void 0 ? {} : _h, _j = _a.predefinedFormatter, predefinedFormatter = _j === void 0 ? {} : _j;
        var _k = options.body, optionsBody = _k === void 0 ? {} : _k;
        var _l = optionsBody.columnHeight, columnHeight = _l === void 0 ? 0 : _l, _m = optionsBody.columnPadding, columnPadding = _m === void 0 ? 0 : _m, _o = optionsBody.columnBorderWidth, columnBorderWidth = _o === void 0 ? 0 : _o, _p = optionsBody.align, bodyAlign = _p === void 0 ? 'left' : _p;
        var _q = col.rowSpan, colRowSpan = _q === void 0 ? 0 : _q, _r = col.colIndex, colColIndex = _r === void 0 ? 0 : _r;
        var cellHeight = columnHeight * colRowSpan;
        var tdClassNames = (_s = {},
            _s['axui-datagrid-line-number'] = col.columnAttr === 'lineNumber',
            _s['axui-datagrid-row-selector'] = col.columnAttr === 'rowSelector',
            _s);
        if (col.columnAttr === 'lineNumber') {
            if (focusedRow === li) {
                tdClassNames.focused = true;
            }
            if (selectionRows[li]) {
                tdClassNames.selected = true;
            }
        }
        else if (col.columnAttr === 'rowSelector') {
        }
        else {
            if (selectionRows[li] && selectionCols[colColIndex]) {
                tdClassNames.selected = true;
            }
            if (focusedRow === li && focusedCol === colColIndex) {
                tdClassNames.focused = true;
            }
        }
        if (isInlineEditing &&
            inlineEditingCell.rowIndex === li &&
            inlineEditingCell.colIndex === col.colIndex) {
            return (React.createElement("td", { key: ci, colSpan: col.colSpan, rowSpan: col.rowSpan, className: utils_1.classNames(tdClassNames), style: { height: cellHeight, minHeight: '1px' } },
                React.createElement("input", { type: "text", ref: this.setEditInputNode, onBlur: function (e) {
                        _this.onEventInput(stores_1.EventNames.BLUR, e);
                    }, onKeyUp: function (e) {
                        _this.onEventInput(stores_1.EventNames.KEYUP, e);
                    }, "data-inline-edit": true, defaultValue: value })));
        }
        else {
            var lineHeight = columnHeight - columnPadding * 2 - columnBorderWidth;
            var colAlign = col.align || bodyAlign || '';
            var label = void 0;
            var getLabel = function (_item, _itemIdx) {
                var formatterData = {
                    data: filteredList,
                    item: _item,
                    index: _itemIdx,
                    key: col.key,
                    value: _item[col.key || ''],
                };
                var labelValue;
                if (typeof col.formatter === 'string' &&
                    col.formatter in predefinedFormatter) {
                    labelValue = predefinedFormatter[col.formatter](formatterData);
                }
                else if (utils_1.isFunction(col.formatter)) {
                    labelValue = col.formatter(formatterData);
                }
                else {
                    labelValue = _item[col.key || ''];
                }
                return labelValue;
            };
            if (col.key === '__line_number__') {
                label = li + 1;
            }
            else if (col.key === '__row_selector__') {
                label = (React.createElement("div", { className: "axui-datagrid-check-box", "data-span": col.columnAttr || '', "data-checked": filteredList[li].__selected__, style: {
                        maxHeight: lineHeight + 'px',
                        minHeight: lineHeight + 'px',
                    } }));
            }
            else {
                label = getLabel(filteredList[li], li);
            }
            return (React.createElement("td", { key: ci, colSpan: col.colSpan, rowSpan: col.rowSpan, className: utils_1.classNames(tdClassNames), style: { height: cellHeight, minHeight: '1px' }, onDoubleClick: function (e) {
                    _this.onDoubleClickCell(e, col, li);
                } },
                React.createElement("span", { "data-span": col.columnAttr || '', "data-pos": col.colIndex + ',' + col.rowIndex + ',' + li, style: {
                        height: columnHeight - columnBorderWidth + 'px',
                        lineHeight: lineHeight + 'px',
                        textAlign: colAlign,
                    } }, label || ' ')));
        }
        var _s;
    };
    return DataGridBodyCell;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridBodyCell);
//# sourceMappingURL=DataGridBodyCell.js.map