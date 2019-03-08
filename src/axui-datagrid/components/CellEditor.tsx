import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from '../common/@enums';

interface IProps extends IDataGridStore {
  col: IDataGrid.ICol;
  li: number;
  value: any;
}

class CellEditor extends React.Component<IProps> {
  inputTextRef: React.RefObject<HTMLInputElement>;
  activeComposition: boolean = false;

  constructor(props: IProps) {
    super(props);

    this.inputTextRef = React.createRef();
  }

  componentDidMount() {
    if (this.inputTextRef.current) {
      this.activeComposition = false;
      this.inputTextRef.current.select();
    }
  }
  componentDidUpdate(prevProps: IProps) {
    if (this.inputTextRef.current) {
      this.activeComposition = false;
      this.inputTextRef.current.select();
    }
  }

  onEventInput = (
    eventName: DataGridEnums.EventNames,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const {
      rootNode,
      setStoreState,
      dispatch,
      inlineEditingCell = {},
    } = this.props;

    switch (eventName) {
      case DataGridEnums.EventNames.BLUR:
        setStoreState({
          isInlineEditing: false,
          inlineEditingCell: {},
        });

        if (rootNode && rootNode.current) {
          rootNode.current.focus();
        }

        break;
      case DataGridEnums.EventNames.KEYUP:
        switch (e.which) {
          case DataGridEnums.KeyCodes.ESC:
            setStoreState({
              isInlineEditing: false,
              inlineEditingCell: {},
            });

            if (rootNode && rootNode.current) {
              rootNode.current.focus();
            }
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
    const { setStoreState, rootNode } = this.props;

    setStoreState({
      isInlineEditing: false,
      inlineEditingCell: {},
    });

    if (rootNode && rootNode.current) {
      rootNode.current.focus();
    }
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
    const { setStoreState, rootNode } = this.props;

    setStoreState({
      isInlineEditing: false,
      inlineEditingCell: {},
    });

    if (rootNode && rootNode.current) {
      rootNode.current.focus();
    }
  };

  renderInputText = (value: any) => {
    return (
      <input
        type="text"
        ref={this.inputTextRef}
        onCompositionUpdate={(e: any) => {
          this.activeComposition = true;
        }}
        onCompositionEnd={(e: any) => {
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

  render() {
    const { data = [], col, li } = this.props;
    const value = data[li] && data[li][col.key || ''];

    const editor: IDataGrid.IColEditor =
      col.editor === 'text'
        ? { type: 'text' }
        : (col.editor as IDataGrid.IColEditor);

    switch (editor.type) {
      case 'text':
        return this.renderInputText(value);
      default:
        if (!editor.render) {
          return this.renderInputText(value);
        }

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

export default connectStore(CellEditor);
