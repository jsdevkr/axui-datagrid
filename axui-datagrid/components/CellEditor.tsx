import * as React from 'react';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from '../common/@enums';
import getAvailScrollLeft from '../utils/getAvailScrollLeft';

interface IProps {
  colGroup: IDataGrid.ICol[];
  col: IDataGrid.ICol;
  li: number;
  item?: IDataGrid.IDataItem;
  columnHeight: number;
  lineHeight: number;
  columnBorderWidth: number;
  colAlign: string;
  setStoreState: IDataGrid.setStoreState;
  dispatch: IDataGrid.dispatch;
  inlineEditingCell: IDataGrid.IEditingCell;
  focusedRow: number;
  focusedCol: number;
  printStartColIndex?: number;
  printEndColIndex?: number;
  scrollLeft?: number;
  scrollTop?: number;
  options?: IDataGrid.IOptions;
  styles?: IDataGrid.IStyles;
}

class CellEditor extends React.PureComponent<IProps> {
  customEditorRef: React.RefObject<HTMLDivElement>;
  activeComposition: boolean = false;
  lastEventName: string = '';
  busy = false;

  constructor(props: IProps) {
    super(props);

    this.customEditorRef = React.createRef();
  }

  onInputTextBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const {
      dispatch,
      inlineEditingCell = {},
      colGroup = [],
      col,
      li,
    } = this.props;

    // console.log('fire onInputTextBlur', this.lastEventName);
    if (this.lastEventName === 'update') {
      dispatch(DataGridEnums.DispatchTypes.FOCUS_ROOT, {
        isInlineEditing: false,
        inlineEditingCell: {},
      });
    } else {
      dispatch(DataGridEnums.DispatchTypes.UPDATE, {
        row: li,
        colIndex: col.colIndex,
        value: e.currentTarget.value,
        // eventWhichKey: e.which,
        isInlineEditing: false,
        inlineEditingCell: {},
      });
    }
  };

  onInputTextKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const {
      dispatch,
      inlineEditingCell = {},
      colGroup = [],
      col,
      li,
    } = this.props;

    switch (e.which) {
      case DataGridEnums.KeyCodes.ESC:
        this.lastEventName = 'esc';
        e.preventDefault();
        dispatch(DataGridEnums.DispatchTypes.FOCUS_ROOT, {
          isInlineEditing: false,
          inlineEditingCell: {},
        });
        break;
      case DataGridEnums.KeyCodes.UP_ARROW:
      case DataGridEnums.KeyCodes.DOWN_ARROW:
      case DataGridEnums.KeyCodes.ENTER:
        // console.log('fire onInputTextKeyDown ENTER');
        this.lastEventName = 'update';
        e.preventDefault();
        dispatch(DataGridEnums.DispatchTypes.UPDATE, {
          row: inlineEditingCell.rowIndex,
          col,
          colIndex: inlineEditingCell.colIndex,
          value: e.currentTarget.value,
          eventWhichKey: e.which,
          keepEditing: true,
        });
        break;
      case DataGridEnums.KeyCodes.TAB:
        e.preventDefault();

        this.lastEventName = 'update';
        const { colIndex = 0 } = col;
        const nextCol =
          colGroup[
            e.shiftKey
              ? colIndex - 1 > -1
                ? colIndex - 1
                : colGroup.length - 1
              : colIndex + 1 < colGroup.length
              ? colIndex + 1
              : 0
          ];

        dispatch(DataGridEnums.DispatchTypes.UPDATE, {
          row: inlineEditingCell.rowIndex,
          col,
          colIndex: inlineEditingCell.colIndex,
          value: e.currentTarget.value,
          eventWhichKey: e.which,

          keepEditing: true,
          isInlineEditing: true,
          inlineEditingCell: {
            rowIndex: li,
            colIndex: nextCol.colIndex,
            editor: nextCol.editor,
          },
          newFocusedRow: li,
          newFocusedCol: nextCol.colIndex,
        });

        break;
      default:
        break;
    }
  };

  handleUpdateValue: IDataGrid.CellEditorDataUpdate = (value: any, options) => {
    const { dispatch, li, col } = this.props;
    const {
      keepEditing = false,
      updateItem = false,
      focus = false,
    } = options || {};

    if (this.lastEventName === 'update' || this.lastEventName === 'cancel') {
      return;
    }

    this.lastEventName = 'update';

    dispatch(
      updateItem
        ? DataGridEnums.DispatchTypes.UPDATE_ITEM
        : DataGridEnums.DispatchTypes.UPDATE,
      {
        row: li,
        col,
        colIndex: col.colIndex,
        value,
        eventWhichKey: 'custom-editor-action',
        keepEditing,
      },
    );

    if (focus) {
      dispatch(DataGridEnums.DispatchTypes.FOCUS_ROOT, {});
    }
  };

  handleCancelEdit: IDataGrid.CellEditorDataCancel = options => {
    const { setStoreState, dispatch } = this.props;
    const { keepEditing = false } = options || {};

    if (!this.busy) {
      this.lastEventName = 'cancel';
      setStoreState({
        isInlineEditing: false,
        inlineEditingCell: {},
      });

      if (keepEditing) {
        dispatch(DataGridEnums.DispatchTypes.FOCUS_ROOT, {});
      }
    }
  };

  handelKeyAction: IDataGrid.CellEditorKeyAction = (action, value, options) => {
    const {
      dispatch,
      li,
      colGroup,
      col,
      printStartColIndex = 0,
      printEndColIndex = 0,
      scrollLeft = 0,
      scrollTop = 0,
      options: { frozenColumnIndex = 0 } = {},
      styles: {
        scrollContentWidth = 0,
        scrollContentHeight = 0,
        scrollContentContainerWidth = 0,
        scrollContentContainerHeight = 0,
        frozenPanelWidth = 0,
        rightPanelWidth = 0,
        verticalScrollerWidth = 0,
      } = {},
    } = this.props;
    const { updateItem = false, e } = options || { e: null };

    this.busy = true;

    switch (action) {
      case 'EDIT_NEXT':
        const { colIndex = 0 } = col;

        this.lastEventName = 'update';

        const nextCol =
          colGroup[
            e && e.shiftKey
              ? colIndex - 1 > -1
                ? colIndex - 1
                : colGroup.length - 1
              : colIndex + 1 < colGroup.length
              ? colIndex + 1
              : 0
          ];

        if (nextCol.colIndex !== undefined) {
          // const nextColEditor = nextCol.editor;
          // const nextEditor: IDataGrid.IColEditor =
          //   nextColEditor === 'text'
          //     ? { type: 'text' }
          //     : (nextColEditor as IDataGrid.IColEditor);
          // const hasNextColEditor =
          //   nextEditor &&
          //   (nextEditor.activeType === 'click' ||
          //     nextEditor.activeType === 'dblclick');

          // console.log('hasNextColEditor', hasNextColEditor, nextEditor);

          dispatch(
            updateItem
              ? DataGridEnums.DispatchTypes.UPDATE_ITEM
              : DataGridEnums.DispatchTypes.UPDATE,
            {
              row: li,
              col,
              colIndex,
              value,
              eventWhichKey: 'custom-editor-action',
              scrollLeft: getAvailScrollLeft(nextCol.colIndex, {
                colGroup,
                sColIndex: printStartColIndex,
                eColIndex:
                  printEndColIndex === 0
                    ? colGroup.length - 1
                    : printEndColIndex,
                frozenColumnIndex,
                frozenPanelWidth,
                verticalScrollerWidth,
                rightPanelWidth,
                scrollContentWidth,
                scrollContentHeight,
                scrollContentContainerWidth,
                scrollContentContainerHeight,
                scrollTop,
                scrollLeft,
              }),
              keepEditing: true,
              isInlineEditing: true,
              inlineEditingCell: {
                rowIndex: li,
                colIndex: nextCol.colIndex,
                editor: nextCol.editor,
              },
              newFocusedRow: li,
              newFocusedCol: nextCol.colIndex,
            },
          );
        }

        break;
      default:
    }

    this.busy = false;
  };

  handleCustomEditorFocus = () => {
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

  handleCustomEditorBlur = () => {
    const { dispatch } = this.props;

    dispatch(DataGridEnums.DispatchTypes.FOCUS_ROOT, {
      isInlineEditing: false,
      inlineEditingCell: {},
    });
  };

  inputTextRender = (value: any, disable: boolean = false) => {
    return (
      <input
        type="text"
        onCompositionUpdate={() => {
          this.activeComposition = true;
        }}
        onCompositionEnd={() => {
          setTimeout(() => {
            this.activeComposition = false;
          });
        }}
        onFocus={e => {}}
        onBlur={this.onInputTextBlur}
        onKeyDown={this.onInputTextKeyDown}
        data-inline-edit
        defaultValue={value}
      />
    );
  };

  handleCheckboxValue = (value: boolean) => {
    const { dispatch, li, col } = this.props;

    dispatch(DataGridEnums.DispatchTypes.UPDATE, {
      row: li,
      col,
      colIndex: col.colIndex,
      value: value,
      eventWhichKey: 'click-checkbox',
      keepEditing: false,
    });
  };

  handleCheckboxKeyUp = (e: React.KeyboardEvent, currentValue: any) => {
    switch (e.which) {
      case DataGridEnums.KeyCodes.SPACE:
      case DataGridEnums.KeyCodes.ENTER:
        this.handleCheckboxValue(!currentValue);
        break;
      default:
        break;
    }
  };

  checkboxRender = (
    value: any,
    label: React.ReactNode | string = '',
    disabled: boolean = false,
  ) => {
    const { columnHeight, lineHeight, columnBorderWidth, colAlign } =
      this.props;

    let justifyContent: string = '';
    switch (colAlign) {
      case 'center':
        justifyContent = 'center';
        break;
      case 'right':
        justifyContent = 'flex-end';
        break;
      default:
    }

    return (
      <span
        data-span={'checkbox-editor'}
        className={`${disabled ? 'disabled' : ''}`}
        style={{
          height: columnHeight - columnBorderWidth + 'px',
          lineHeight: lineHeight + 'px',
          justifyContent,
        }}
        onClick={() => {
          if (!disabled) {
            this.handleCheckboxValue(!value);
          }
        }}
      >
        <div
          className="axui-datagrid-check-box"
          data-checked={value}
          style={{
            width: lineHeight + 'px',
            height: lineHeight + 'px',
          }}
        />
        <label
          style={{
            height: lineHeight + 'px',
            lineHeight: lineHeight + 'px',
          }}
        >
          {label}
        </label>
      </span>
    );
  };

  componentDidMount() {
    const {
      col: { editor: colEditor },
    } = this.props;
    const editor: IDataGrid.IColEditor =
      colEditor === 'text'
        ? { type: 'text' }
        : (colEditor as IDataGrid.IColEditor);

    if (this.customEditorRef.current) {
      const inputEl = this.customEditorRef.current.querySelector('input');
      if (editor.activeType !== 'always' && inputEl) {
        inputEl.focus({ preventScroll: true });
        return;
      }
    }

    // dispatch(DataGridEnums.DispatchTypes.FOCUS_ROOT, {});
  }

  componentDidUpdate(prevProps: IProps) {
    this.lastEventName = '';
  }

  handleInputTextSelect = (inputCurrent: any) => {
    const {
      col: { editor: colEditor },
    } = this.props;
    const editor: IDataGrid.IColEditor =
      colEditor === 'text'
        ? { type: 'text' }
        : (colEditor as IDataGrid.IColEditor);
    if (editor.activeType !== 'always') {
      inputCurrent.select();
    }
  };

  render() {
    const { item, col, li } = this.props;
    if (!item) {
      return null;
    }

    const value =
      item && item.changed && item.changed![col.key || '']
        ? item.changed![col.key || '']
        : // @ts-ignore
          item.value[col.key || ''];

    const editor: IDataGrid.IColEditor =
      col.editor === 'text'
        ? { type: 'text' }
        : (col.editor as IDataGrid.IColEditor);

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
        return (
          <div ref={this.customEditorRef}>{this.inputTextRender(value)}</div>
        );
      case 'checkbox':
        return this.checkboxRender(value, editor.label, disabled);
      default:
        if (!editor.render) {
          return (
            <div ref={this.customEditorRef}>{this.inputTextRender(value)}</div>
          );
        }

        return (
          <div ref={this.customEditorRef}>
            {editor.render({
              col: col,
              li,
              colIndex: col.colIndex || 0,
              item,
              value,
              update: this.handleUpdateValue,
              cancel: this.handleCancelEdit,
              focus: this.handleCustomEditorFocus,
              blur: this.handleCustomEditorBlur,
              keyAction: this.handelKeyAction,
            })}
          </div>
        );
    }
  }
}

export default CellEditor;
