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
var _enums_1 = require("../common/@enums");
var CellEditor = /** @class */ (function (_super) {
    __extends(CellEditor, _super);
    function CellEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.activeComposition = false;
        _this.lastEventName = '';
        _this.onEventInput = function (eventName, e) {
            var _a = _this.props, setStoreState = _a.setStoreState, dispatch = _a.dispatch, _b = _a.inlineEditingCell, inlineEditingCell = _b === void 0 ? {} : _b, col = _a.col, li = _a.li;
            switch (eventName) {
                case _enums_1.DataGridEnums.EventNames.BLUR:
                    // console.log('eventInput blur : setStoreState');
                    setStoreState({
                        isInlineEditing: false,
                        inlineEditingCell: {},
                    });
                    if (!_this.activeComposition) {
                        if (_this.lastEventName === 'update') {
                            dispatch(_enums_1.DataGridEnums.DispatchTypes.FOCUS_ROOT, {});
                        }
                        else {
                            dispatch(_enums_1.DataGridEnums.DispatchTypes.UPDATE, {
                                row: li,
                                colIndex: col.colIndex,
                                value: e.currentTarget.value,
                                eventWhichKey: e.which,
                            });
                        }
                    }
                    break;
                case _enums_1.DataGridEnums.EventNames.KEYUP:
                    switch (e.which) {
                        case _enums_1.DataGridEnums.KeyCodes.ESC:
                            setStoreState({
                                isInlineEditing: false,
                                inlineEditingCell: {},
                            });
                            _this.lastEventName = 'esc';
                            dispatch(_enums_1.DataGridEnums.DispatchTypes.FOCUS_ROOT, {});
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.UP_ARROW:
                        case _enums_1.DataGridEnums.KeyCodes.DOWN_ARROW:
                        case _enums_1.DataGridEnums.KeyCodes.ENTER:
                            if (!_this.activeComposition) {
                                // console.log('eventInput enter : setStoreState');
                                _this.lastEventName = 'update';
                                dispatch(_enums_1.DataGridEnums.DispatchTypes.UPDATE, {
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
                    break;
                default:
                    break;
            }
        };
        _this.handleUpdateValue = function (value, options) {
            var _a = _this.props, dispatch = _a.dispatch, li = _a.li, col = _a.col;
            var _b = options || {}, _c = _b.keepEditing, keepEditing = _c === void 0 ? false : _c, _d = _b.updateItem, updateItem = _d === void 0 ? false : _d;
            // console.log('handleUpdateValue UPDATE : dispatch');
            dispatch(updateItem
                ? _enums_1.DataGridEnums.DispatchTypes.UPDATE_ITEM
                : _enums_1.DataGridEnums.DispatchTypes.UPDATE, {
                row: li,
                colIndex: col.colIndex,
                value: value,
                eventWhichKey: 'custom-editor-action',
                keepEditing: keepEditing,
            });
        };
        _this.handleCancelEdit = function () {
            var _a = _this.props, setStoreState = _a.setStoreState, dispatch = _a.dispatch;
            // console.log('handleCancelEdit : setStoreState');
            setStoreState({
                isInlineEditing: false,
                inlineEditingCell: {},
            });
            dispatch(_enums_1.DataGridEnums.DispatchTypes.FOCUS_ROOT, {});
        };
        _this.handleCustomEditorFocus = function () {
            var _a = _this.props, setStoreState = _a.setStoreState, li = _a.li, col = _a.col;
            // console.log('handleCustomEditorFocus : setStoreState');
            setStoreState({
                isInlineEditing: true,
                inlineEditingCell: {
                    rowIndex: li,
                    colIndex: col.colIndex,
                    editor: col.editor,
                },
            });
        };
        _this.handleCustomEditorBlur = function () {
            var _a = _this.props, setStoreState = _a.setStoreState, dispatch = _a.dispatch;
            setStoreState({
                isInlineEditing: false,
                inlineEditingCell: {},
            });
            dispatch(_enums_1.DataGridEnums.DispatchTypes.FOCUS_ROOT, {});
        };
        _this.inputTextRender = function (value, disable) {
            if (disable === void 0) { disable = false; }
            return (React.createElement("input", { type: "text", ref: _this.inputTextRef, onCompositionUpdate: function () {
                    _this.activeComposition = true;
                }, onCompositionEnd: function () {
                    setTimeout(function () {
                        _this.activeComposition = false;
                    });
                }, onFocus: function (e) { }, onBlur: function (e) {
                    _this.onEventInput(_enums_1.DataGridEnums.EventNames.BLUR, e);
                }, onKeyUp: function (e) {
                    _this.onEventInput(_enums_1.DataGridEnums.EventNames.KEYUP, e);
                }, "data-inline-edit": true, defaultValue: value }));
        };
        _this.handleCheckboxValue = function (value) {
            var _a = _this.props, dispatch = _a.dispatch, li = _a.li, col = _a.col;
            dispatch(_enums_1.DataGridEnums.DispatchTypes.UPDATE, {
                row: li,
                colIndex: col.colIndex,
                value: value,
                eventWhichKey: 'click-checkbox',
            });
        };
        _this.checkboxRender = function (value, label, disabled) {
            if (label === void 0) { label = ''; }
            if (disabled === void 0) { disabled = false; }
            var _a = _this.props, columnHeight = _a.columnHeight, lineHeight = _a.lineHeight, columnBorderWidth = _a.columnBorderWidth, colAlign = _a.colAlign;
            var justifyContent = '';
            switch (colAlign) {
                case 'center':
                    justifyContent = 'center';
                    break;
                case 'right':
                    justifyContent = 'flex-end';
                    break;
                default:
            }
            return (React.createElement("span", { "data-span": 'checkbox-editor', className: "" + (disabled ? 'disabled' : ''), style: {
                    height: columnHeight - columnBorderWidth + 'px',
                    lineHeight: lineHeight + 'px',
                    justifyContent: justifyContent,
                }, onClick: function () {
                    if (!disabled) {
                        _this.handleCheckboxValue(!value);
                    }
                } },
                React.createElement("div", { className: "axui-datagrid-check-box", "data-checked": value, style: {
                        width: lineHeight + 'px',
                        height: lineHeight + 'px',
                    } }),
                React.createElement("label", { style: {
                        height: lineHeight + 'px',
                        lineHeight: lineHeight + 'px',
                    } }, label)));
        };
        _this.handleInputTextSelect = function (inputCurrent) {
            var colEditor = _this.props.col.editor;
            var editor = colEditor === 'text'
                ? { type: 'text' }
                : colEditor;
            if (editor.activeType !== 'always') {
                inputCurrent.select();
            }
        };
        _this.inputTextRef = React.createRef();
        return _this;
    }
    // shouldComponentUpdate(nextProps: IProps) {
    //   const {
    //     li,
    //     col: { colIndex },
    //   } = nextProps;
    //   if (
    //     this.props.focusedRow === nextProps.focusedRow &&
    //     nextProps.focusedRow === li &&
    //     this.props.focusedCol === nextProps.focusedCol &&
    //     nextProps.focusedCol === colIndex
    //   ) {
    //     return true;
    //   }
    //   return this.props.value !== nextProps.value;
    // }
    CellEditor.prototype.componentDidMount = function () {
        if (this.inputTextRef.current) {
            this.activeComposition = false;
            this.inputTextRef.current.focus();
        }
    };
    CellEditor.prototype.render = function () {
        var _a = this.props, item = _a.item, value = _a.value, col = _a.col, li = _a.li;
        var editor = col.editor === 'text'
            ? { type: 'text' }
            : col.editor;
        var disabled = editor.disable
            ? editor.disable({
                col: col,
                rowIndex: li,
                colIndex: col.colIndex || 0,
                item: item,
                value: value,
            })
            : false;
        switch (editor.type) {
            case 'text':
                return this.inputTextRender(value);
            case 'checkbox':
                return this.checkboxRender(value, editor.label, disabled);
            default:
                if (!editor.render) {
                    return this.inputTextRender(value);
                }
                return editor.render({
                    col: col,
                    rowIndex: li,
                    colIndex: col.colIndex || 0,
                    item: item,
                    value: value,
                    update: this.handleUpdateValue,
                    cancel: this.handleCancelEdit,
                    focus: this.handleCustomEditorFocus,
                    blur: this.handleCustomEditorBlur,
                });
        }
    };
    return CellEditor;
}(React.PureComponent));
exports.default = CellEditor;
