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
        _this.onEventInput = function (eventName, e) {
            var _a = _this.props, setStoreState = _a.setStoreState, dispatch = _a.dispatch, _b = _a.inlineEditingCell, inlineEditingCell = _b === void 0 ? {} : _b;
            switch (eventName) {
                case _enums_1.DataGridEnums.EventNames.BLUR:
                    setStoreState({
                        isInlineEditing: false,
                        inlineEditingCell: {},
                    });
                    dispatch(_enums_1.DataGridEnums.DispatchTypes.FOCUS_ROOT, {});
                    break;
                case _enums_1.DataGridEnums.EventNames.KEYUP:
                    switch (e.which) {
                        case _enums_1.DataGridEnums.KeyCodes.ESC:
                            setStoreState({
                                isInlineEditing: false,
                                inlineEditingCell: {},
                            });
                            dispatch(_enums_1.DataGridEnums.DispatchTypes.FOCUS_ROOT, {});
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.UP_ARROW:
                        case _enums_1.DataGridEnums.KeyCodes.DOWN_ARROW:
                        case _enums_1.DataGridEnums.KeyCodes.ENTER:
                            if (!_this.activeComposition) {
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
        _this.handleUpdateValue = function (value, keepEditing) {
            var _a = _this.props, dispatch = _a.dispatch, li = _a.li, col = _a.col;
            dispatch(_enums_1.DataGridEnums.DispatchTypes.UPDATE, {
                row: li,
                colIndex: col.colIndex,
                value: value,
                eventWhichKey: 'custom-editor-action',
                keepEditing: keepEditing,
            });
        };
        _this.handleCancelEdit = function () {
            var _a = _this.props, setStoreState = _a.setStoreState, dispatch = _a.dispatch;
            setStoreState({
                isInlineEditing: false,
                inlineEditingCell: {},
            });
            dispatch(_enums_1.DataGridEnums.DispatchTypes.FOCUS_ROOT, {});
        };
        _this.handleCustomEditorFocus = function () {
            var _a = _this.props, setStoreState = _a.setStoreState, li = _a.li, col = _a.col;
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
        _this.renderInputText = function (value) {
            return (React.createElement("input", { type: "text", ref: _this.inputTextRef, onCompositionUpdate: function (e) {
                    _this.activeComposition = true;
                }, onCompositionEnd: function (e) {
                    setTimeout(function () {
                        _this.activeComposition = false;
                    });
                }, onBlur: function (e) {
                    _this.onEventInput(_enums_1.DataGridEnums.EventNames.BLUR, e);
                }, onKeyUp: function (e) {
                    _this.onEventInput(_enums_1.DataGridEnums.EventNames.KEYUP, e);
                }, "data-inline-edit": true, defaultValue: value }));
        };
        _this.inputTextRef = React.createRef();
        _this.editorTargetRef = React.createRef();
        return _this;
    }
    CellEditor.prototype.componentDidMount = function () {
        if (this.inputTextRef.current) {
            this.activeComposition = false;
            this.inputTextRef.current.select();
        }
        // if (this.editorTargetRef.current) {
        //   const { data = [], col, li } = this.props;
        //   const value = data[li] && data[li][col.key || ''];
        //   const editor: IDataGrid.IColEditor =
        //     col.editor === 'text'
        //       ? { type: 'text' }
        //       : (col.editor as IDataGrid.IColEditor);
        //   if (editor && editor.render) {
        //     const element = editor.render({
        //       col: col,
        //       rowIndex: li,
        //       colIndex: col.colIndex || 0,
        //       value,
        //       update: this.handleUpdateValue,
        //       cancel: this.handleCancelEdit,
        //       focus: this.handleCustomEditorFocus,
        //       blur: this.handleCustomEditorBlur,
        //     });
        //     ReactDOM.render(element as any, this.editorTargetRef.current);
        //   }
        // }
    };
    CellEditor.prototype.componentDidUpdate = function (prevProps) {
        if (this.inputTextRef.current) {
            this.activeComposition = false;
            this.inputTextRef.current.select();
        }
    };
    CellEditor.prototype.shouldComponentUpdate = function (nextProps) {
        var li = nextProps.li, colIndex = nextProps.col.colIndex;
        if (this.props.focusedRow === nextProps.focusedRow &&
            nextProps.focusedRow === li &&
            this.props.focusedCol === nextProps.focusedCol &&
            nextProps.focusedCol === colIndex) {
            return true;
        }
        return this.props.value !== nextProps.value;
    };
    CellEditor.prototype.render = function () {
        var _a = this.props, value = _a.value, col = _a.col, li = _a.li;
        // const value = data[li] && data[li][col.key || ''];
        var editor = col.editor === 'text'
            ? { type: 'text' }
            : col.editor;
        switch (editor.type) {
            case 'text':
                return this.renderInputText(value);
            default:
                if (!editor.render) {
                    return this.renderInputText(value);
                }
                // return <div ref={this.editorTargetRef} />;
                return editor.render({
                    col: col,
                    rowIndex: li,
                    colIndex: col.colIndex || 0,
                    value: value,
                    update: this.handleUpdateValue,
                    cancel: this.handleCancelEdit,
                    focus: this.handleCustomEditorFocus,
                    blur: this.handleCustomEditorBlur,
                });
        }
    };
    return CellEditor;
}(React.Component));
exports.default = CellEditor;
