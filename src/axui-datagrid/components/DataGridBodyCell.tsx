import * as React from 'react';
import { connectStore } from '../hoc';
import { IDataGridStore } from '../providers';
import { classNames as CX, isFunction, getNode } from '../utils';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from '../common/@enums';
import CellLabel from './CellLabel';
import CellEditor from './CellEditor';

interface IProps extends IDataGridStore {
  li: number;
  ci: number;
  col?: IDataGrid.ICol;
  value?: any;
}

class DataGridBodyCell extends React.Component<IProps> {
  state = {};

  onDoubleClickCell = (
    e: React.KeyboardEvent<HTMLInputElement>,
    col: IDataGrid.IColumn,
    li: number,
  ) => {
    const { setStoreState } = this.props;

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

  shouldComponentUpdate(nextProps: IProps) {
    const {
      li,
      col = {},
      selectionRows = [],
      selectionCols = [],
      inlineEditingCell = {},
      data = [],
    } = this.props;
    const { colIndex = 0 } = col;
    const {
      rowIndex: editRowIndex,
      colIndex: editColIndex,
    } = inlineEditingCell;
    const {
      selectionRows: _selectionRows = [],
      selectionCols: _selectionCols = [],
      inlineEditingCell: _inlineEditingCell = {},
      data: _data = [],
    } = nextProps;
    const {
      rowIndex: _editRowIndex,
      colIndex: _editColIndex,
    } = _inlineEditingCell;

    if (
      this.props.data !== nextProps.data ||
      this.props.colGroup !== nextProps.colGroup
    ) {
      return true;
    }

    if (
      _selectionRows[li] !== selectionRows[li] ||
      selectionCols[colIndex] !== _selectionCols[colIndex]
    ) {
      return true;
    }

    if (
      this.props.isInlineEditing !== nextProps.isInlineEditing &&
      ((editRowIndex === li && editColIndex === colIndex) ||
        (_editRowIndex === li && _editColIndex === colIndex))
    ) {
      return true;
    }

    if (
      this.props.scrollTop !== nextProps.scrollTop ||
      this.props.scrollLeft !== nextProps.scrollLeft
    ) {
      return true;
    }

    // if (li === 5 && colIndex === 6) {
    //   console.log(
    //     data[li][col.key || ''],
    //     nextProps.data![li][col.key || ''],
    //     col,
    //   );
    // }

    // if (data[li][col.key || ''] !== nextProps.data![li][col.key || '']) {
    //   return true;
    // }

    // return (

    //   ((this.props.isInlineEditing !== nextProps.isInlineEditing &&
    //     this.props.inlineEditingCell &&
    //     this.props.inlineEditingCell.rowIndex === li) ||
    //     this.props.inlineEditingCell.colIndex === li)
    // );

    return false;
  }

  render() {
    const {
      data = [],
      focusedRow,
      focusedCol,
      selectionRows = [],
      selectionCols = [],
      li,
      col = {},
      ci,
      options = {},
      isInlineEditing = false,
      inlineEditingCell = {},
      predefinedFormatter = {},
    } = this.props;

    // console.log('render');
    const { body: optionsBody = {} } = options;
    const {
      columnHeight = 0,
      columnPadding = 0,
      columnBorderWidth = 0,
      align: bodyAlign = 'left',
    } = optionsBody;
    const {
      rowSpan = 0,
      colSpan = 0,
      colIndex = 0,
      rowIndex = 0,
      align: colAlign = bodyAlign,
      columnAttr = '',
      editor,
    } = col;
    const cellHeight = columnHeight * rowSpan;
    const lineHeight = columnHeight - columnPadding * 2 - columnBorderWidth;
    const tdClassNames: { [key: string]: any } = {
      ['axui-datagrid-line-number']: columnAttr === 'lineNumber',
      ['axui-datagrid-row-selector']: columnAttr === 'rowSelector',
    };

    switch (columnAttr) {
      case 'lineNumber':
        if (focusedRow === li) {
          tdClassNames.focused = true;
        }
        if (selectionRows[li]) {
          tdClassNames.selected = true;
        }
        break;
      case 'rowSelector':
        break;
      default:
        if (selectionRows[li] && selectionCols[colIndex]) {
          tdClassNames.selected = true;
        }
        if (focusedRow === li && focusedCol === colIndex) {
          tdClassNames.focused = true;
        }
    }

    const colEditor: IDataGrid.IColEditor =
      editor === 'string'
        ? { type: '' + editor }
        : (editor as IDataGrid.IColEditor);
    const inlineEditingActive =
      isInlineEditing &&
      inlineEditingCell.rowIndex === li &&
      inlineEditingCell.colIndex === colIndex;
    const inlineEditingActiveAlways =
      colEditor && colEditor.activeType === 'always';

    return (
      <td
        key={ci}
        colSpan={colSpan}
        rowSpan={rowSpan}
        className={CX(tdClassNames)}
        style={{ height: cellHeight, minHeight: '1px' }}
        onDoubleClick={(e: any) => {
          if (!inlineEditingActive) {
            this.onDoubleClickCell(e, col, li);
          }
        }}
      >
        {inlineEditingActiveAlways || inlineEditingActive ? (
          <CellEditor col={col} li={li} value={data[li][col.key || '']} />
        ) : (
          <CellLabel
            columnHeight={columnHeight}
            lineHeight={lineHeight}
            columnBorderWidth={columnBorderWidth}
            colAlign={colAlign}
            col={col}
            list={data}
            li={li}
            predefinedFormatter={predefinedFormatter}
          />
        )}
      </td>
    );
  }
}

export default connectStore(DataGridBodyCell);
