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
        };
        _this.onEventInput = function (eventName, e) {
            var _a;
            var _b = _this.props, getRootNode = _b.getRootNode, setStoreState = _b.setStoreState, dispatch = _b.dispatch, _c = _b.inlineEditingCell, inlineEditingCell = _c === void 0 ? {} : _c;
            var rootNode = utils_1.getNode(getRootNode);
            var proc = (_a = {},
                _a[stores_1.EventNames.BLUR] = function () {
                    setStoreState({
                        isInlineEditing: false,
                        inlineEditingCell: {},
                    });
                    if (rootNode) {
                        rootNode.focus();
                    }
                },
                _a[stores_1.EventNames.KEYUP] = function () {
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
                            if (!_this.activeComposition) {
                                dispatch(stores_1.DispatchTypes.UPDATE, {
                                    row: inlineEditingCell.rowIndex,
                                    colIndex: inlineEditingCell.colIndex,
                                    value: e.target.value,
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
    DataGridBodyCell.prototype.componentDidUpdate = function (prevProps, prevState) {
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
        var _r = col.rowSpan, colRowSpan = _r === void 0 ? 0 : _r, _s = col.colIndex, colColIndex = _s === void 0 ? 0 : _s;
        var cellHeight = columnHeight * colRowSpan;
        var tdClassNames = (_a = {},
            _a['axui-datagrid-line-number'] = col.columnAttr === 'lineNumber',
            _a['axui-datagrid-row-selector'] = col.columnAttr === 'rowSelector',
            _a);
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
                React.createElement("input", { type: "text", ref: this.setEditInputNode, onCompositionUpdate: function (e) {
                        _this.activeComposition = true;
                    }, onCompositionEnd: function (e) {
                        setTimeout(function () {
                            _this.activeComposition = false;
                        });
                    }, onBlur: function (e) {
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
            if (col.key === '_line_number_') {
                label = li + 1;
            }
            else if (col.key === '_row_selector_') {
                label = (React.createElement("div", { className: "axui-datagrid-check-box", "data-span": col.columnAttr || '', "data-checked": filteredList[li]._selected_, style: {
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
    };
    return DataGridBodyCell;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridBodyCell);
//# sourceMappingURL=DataGridBodyCell.js.map