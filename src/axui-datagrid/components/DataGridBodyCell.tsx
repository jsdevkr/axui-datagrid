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
          <CellEditor col={col} li={li} />
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
