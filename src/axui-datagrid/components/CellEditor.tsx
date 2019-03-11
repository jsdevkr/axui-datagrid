import * as React from 'react';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from '../common/@enums';

interface IProps {
  col: IDataGrid.ICol;
  li: number;
  value: any;
  columnHeight: number;
  lineHeight: number;
  columnBorderWidth: number;
  colAlign: string;
  setStoreState: IDataGrid.setStoreState;
  dispatch: IDataGrid.dispatch;
  inlineEditingCell: IDataGrid.IEditingCell;
  focusedRow: number;
  focusedCol: number;
}

class CellEditor extends React.Component<IProps> {
  inputTextRef: React.RefObject<HTMLInputElement>;
  editorTargetRef: React.RefObject<HTMLDivElement>;
  activeComposition: boolean = false;

  constructor(props: IProps) {
    super(props);

    this.inputTextRef = React.createRef();
    this.editorTargetRef = React.createRef();
  }

  onEventInput = (
    eventName: DataGridEnums.EventNames,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const { setStoreState, dispatch, inlineEditingCell = {} } = this.props;

    switch (eventName) {
      case DataGridEnums.EventNames.BLUR:
        setStoreState({
          isInlineEditing: false,
          inlineEditingCell: {},
        });

        dispatch(DataGridEnums.DispatchTypes.FOCUS_ROOT, {});

        break;
      case DataGridEnums.EventNames.KEYUP:
        switch (e.which) {
          case DataGridEnums.KeyCodes.ESC:
            setStoreState({
              isInlineEditing: false,
              inlineEditingCell: {},
            });

            dispatch(DataGridEnums.DispatchTypes.FOCUS_ROOT, {});
            break;
          case DataGridEnums.KeyCodes.UP_ARROW:
          case DataGridEnums.KeyCodes.DOWN_ARROW:
          case DataGridEnums.KeyCodes.ENTER:
            if (!this.activeComposition) {
              dispatch(DataGridEnums.DispatchTypes.UPDATE, {
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

  handleUpdateValue = (value: any, keepEditing?: boolean) => {
    const { dispatch, li, col } = this.props;

    dispatch(DataGridEnums.DispatchTypes.UPDATE, {
      row: li,
      colIndex: col.colIndex,
      value: value,
      eventWhichKey: 'custom-editor-action',
      keepEditing,
    });
  };

  handleCancelEdit = () => {
    const { setStoreState, dispatch } = this.props;

    setStoreState({
      isInlineEditing: false,
      inlineEditingCell: {},
    });

    dispatch(DataGridEnums.DispatchTypes.FOCUS_ROOT, {});
  };

  handleCustomEditorFocus = () => {
    const { setStoreState, li, col } = this.props;
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
    const { setStoreState, dispatch } = this.props;

    setStoreState({
      isInlineEditing: false,
      inlineEditingCell: {},
    });

    dispatch(DataGridEnums.DispatchTypes.FOCUS_ROOT, {});
  };

  inputTextRender = (value: any) => {
    return (
      <input
        type="text"
        ref={this.inputTextRef}
        onCompositionUpdate={() => {
          this.activeComposition = true;
        }}
        onCompositionEnd={() => {
          setTimeout(() => {
            this.activeComposition = false;
          });
        }}
        onBlur={(e: any) => {
          this.onEventInput(DataGridEnums.EventNames.BLUR, e);
        }}
        onKeyUp={(e: any) => {
          this.onEventInput(DataGridEnums.EventNames.KEYUP, e);
        }}
        data-inline-edit
        defaultValue={value}
      />
    );
  };

  handleCheckboxValue = (value: boolean) => {
    const { dispatch, li, col } = this.props;

    dispatch(DataGridEnums.DispatchTypes.UPDATE, {
      row: li,
      colIndex: col.colIndex,
      value: value,
      eventWhichKey: 'click-checkbox',
    });
  };

  checkboxRender = (value: any, label?: React.ReactNode | string) => {
    const {
      columnHeight,
      lineHeight,
      columnBorderWidth,
      colAlign,
    } = this.props;

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
        style={{
          height: columnHeight - columnBorderWidth + 'px',
          lineHeight: lineHeight + 'px',
          justifyContent,
        }}
        onClick={() => {
          this.handleCheckboxValue(!value);
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

  shouldComponentUpdate(nextProps: IProps) {
    const {
      li,
      col: { colIndex },
    } = nextProps;

    if (
      this.props.focusedRow === nextProps.focusedRow &&
      nextProps.focusedRow === li &&
      this.props.focusedCol === nextProps.focusedCol &&
      nextProps.focusedCol === colIndex
    ) {
      return true;
    }

    return this.props.value !== nextProps.value;
  }

  componentDidMount() {
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
  }
  componentDidUpdate() {
    if (this.inputTextRef.current) {
      this.activeComposition = false;
      this.inputTextRef.current.select();
    }
  }

  render() {
    const { value, col, li } = this.props;

    const editor: IDataGrid.IColEditor =
      col.editor === 'text'
        ? { type: 'text' }
        : (col.editor as IDataGrid.IColEditor);

    switch (editor.type) {
      case 'text':
        return this.inputTextRender(value);
      case 'checkbox':
        return this.checkboxRender(value, editor.label);
      default:
        if (!editor.render) {
          return this.inputTextRender(value);
        }

        // return <div ref={this.editorTargetRef} />;
        return editor.render({
          col: col,
          rowIndex: li,
          colIndex: col.colIndex || 0,
          value,
          update: this.handleUpdateValue,
          cancel: this.handleCancelEdit,
          focus: this.handleCustomEditorFocus,
          blur: this.handleCustomEditorBlur,
        });
    }
  }
}

export default CellEditor;
