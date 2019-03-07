import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from 'axui-datagrid/common/@enums';

interface IProps extends IDataGridStore {
  col: IDataGrid.ICol;
  li: number;
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
    console.log('componentDidUpdate ~');
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

  renderInputText = () => {
    const { data = [], col, li } = this.props;
    const value = data[li] && data[li][col.key || ''];

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

  render() {
    const { col } = this.props;
    const editor: IDataGrid.IColEditor =
      col.editor === 'text'
        ? { type: 'text' }
        : (col.editor as IDataGrid.IColEditor);

    switch (editor.type) {
      case 'text':
        return this.renderInputText();

      default:
        return '';
    }
  }
}

export default connectStore(CellEditor);
