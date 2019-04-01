"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const _enums_1 = require("../common/@enums");
class CellEditor extends React.PureComponent {
    constructor(props) {
        super(props);
        this.activeComposition = false;
        this.lastEventName = '';
        this.onEventInput = (eventName, e) => {
            const { setStoreState, dispatch, inlineEditingCell = {}, col, li, } = this.props;
            switch (eventName) {
                case _enums_1.DataGridEnums.EventNames.BLUR:
                    // console.log('eventInput blur : setStoreState');
                    setStoreState({
                        isInlineEditing: false,
                        inlineEditingCell: {},
                    });
                    if (!this.activeComposition) {
                        if (this.lastEventName === 'update') {
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
                            this.lastEventName = 'esc';
                            dispatch(_enums_1.DataGridEnums.DispatchTypes.FOCUS_ROOT, {});
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.UP_ARROW:
                        case _enums_1.DataGridEnums.KeyCodes.DOWN_ARROW:
                        case _enums_1.DataGridEnums.KeyCodes.ENTER:
                            if (!this.activeComposition) {
                                // console.log('eventInput enter : setStoreState');
                                this.lastEventName = 'update';
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
        this.handleUpdateValue = (value, options) => {
            const { dispatch, li, col } = this.props;
            const { keepEditing = false, updateItem = false } = options || {};
            // console.log('handleUpdateValue UPDATE : dispatch');
            dispatch(updateItem
                ? _enums_1.DataGridEnums.DispatchTypes.UPDATE_ITEM
                : _enums_1.DataGridEnums.DispatchTypes.UPDATE, {
                row: li,
                colIndex: col.colIndex,
                value,
                eventWhichKey: 'custom-editor-action',
                keepEditing,
            });
        };
        this.handleCancelEdit = () => {
            const { setStoreState, dispatch } = this.props;
            // console.log('handleCancelEdit : setStoreState');
            setStoreState({
                isInlineEditing: false,
                inlineEditingCell: {},
            });
            dispatch(_enums_1.DataGridEnums.DispatchTypes.FOCUS_ROOT, {});
        };
        this.handleCustomEditorFocus = () => {
            const { setStoreState, li, col } = this.props;
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
        this.handleCustomEditorBlur = () => {
            const { setStoreState, dispatch } = this.props;
            setStoreState({
                isInlineEditing: false,
                inlineEditingCell: {},
            });
            dispatch(_enums_1.DataGridEnums.DispatchTypes.FOCUS_ROOT, {});
        };
        this.inputTextRender = (value, disable = false) => {
            return (React.createElement("input", { type: "text", ref: this.inputTextRef, onCompositionUpdate: () => {
                    this.activeComposition = true;
                }, onCompositionEnd: () => {
                    setTimeout(() => {
                        this.activeComposition = false;
                    });
                }, onFocus: e => { }, onBlur: e => {
                    this.onEventInput(_enums_1.DataGridEnums.EventNames.BLUR, e);
                }, onKeyUp: e => {
                    this.onEventInput(_enums_1.DataGridEnums.EventNames.KEYUP, e);
                }, "data-inline-edit": true, defaultValue: value }));
        };
        this.handleCheckboxValue = (value) => {
            const { dispatch, li, col } = this.props;
            dispatch(_enums_1.DataGridEnums.DispatchTypes.UPDATE, {
                row: li,
                colIndex: col.colIndex,
                value: value,
                eventWhichKey: 'click-checkbox',
            });
        };
        this.checkboxRender = (value, label = '', disabled = false) => {
            const { columnHeight, lineHeight, columnBorderWidth, colAlign, } = this.props;
            let justifyContent = '';
            switch (colAlign) {
                case 'center':
                    justifyContent = 'center';
                    break;
                case 'right':
                    justifyContent = 'flex-end';
                    break;
                default:
            }
            return (React.createElement("span", { "data-span": 'checkbox-editor', className: `${disabled ? 'disabled' : ''}`, style: {
                    height: columnHeight - columnBorderWidth + 'px',
                    lineHeight: lineHeight + 'px',
                    justifyContent,
                }, onClick: () => {
                    if (!disabled) {
                        this.handleCheckboxValue(!value);
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
        this.handleInputTextSelect = (inputCurrent) => {
            const { col: { editor: colEditor }, } = this.props;
            const editor = colEditor === 'text'
                ? { type: 'text' }
                : colEditor;
            if (editor.activeType !== 'always') {
                inputCurrent.select();
            }
        };
        this.inputTextRef = React.createRef();
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
    componentDidMount() {
        if (this.inputTextRef.current) {
            this.activeComposition = false;
            const { col: { editor: colEditor }, } = this.props;
            const editor = colEditor === 'text'
                ? { type: 'text' }
                : colEditor;
            if (editor.activeType !== 'always') {
                this.inputTextRef.current.focus();
            }
        }
    }
    render() {
        const { item, value, col, li } = this.props;
        const editor = col.editor === 'text'
            ? { type: 'text' }
            : col.editor;
        const disabled = editor.disable
            ? editor.disable({
                col: col,
                rowIndex: li,
                colIndex: col.colIndex || 0,
                item,
                value,
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
                    item,
                    value,
                    update: this.handleUpdateValue,
                    cancel: this.handleCancelEdit,
                    focus: this.handleCustomEditorFocus,
                    blur: this.handleCustomEditorBlur,
                });
        }
    }
}
exports.default = CellEditor;
