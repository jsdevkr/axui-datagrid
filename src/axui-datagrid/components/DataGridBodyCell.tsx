import * as React from 'react';
import { IDataGrid } from '../common/@types';
import CellLabel from './CellLabel';
import CellEditor from './CellEditor';

class DataGridBodyCell extends React.Component<{
  li: number;
  ci: number;
  col?: IDataGrid.ICol;
  data?: any[];
  selected?: boolean;
  setStoreState: IDataGrid.setStoreState;
  dispatch: IDataGrid.dispatch;
  focusedRow: number;
  focusedCol: number;
  selectionRows: {};
  selectionCols: {};
  options: IDataGrid.IOptions;
  isInlineEditing: boolean;
  inlineEditingCell: IDataGrid.IEditingCell;
  predefinedFormatter?: IDataGrid.IFormatter;
}> {
  handleActiveInlineEdit = (
    e: React.MouseEvent<HTMLTableDataCellElement>,
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
      li,
      col = {},
      col: { rowSpan = 0, colSpan = 0, colIndex = 0, columnAttr = '' } = {},
      ci,
      data = [],
      selected,
      focusedRow,
      focusedCol,
      selectionRows = [],
      selectionCols = [],
      options: {
        rowSelectorSize = 0,
        body: {
          columnHeight = 0,
          columnPadding = 0,
          columnBorderWidth = 0,
          align: bodyAlign = 'left',
        } = {},
      } = {},
      isInlineEditing = false,
      inlineEditingCell = {},
      predefinedFormatter = {},
      setStoreState,
      dispatch,
    } = this.props;

    const editor = col.editor;
    const colAlign = col.align || bodyAlign;
    const value = data[li] && data[li][col.key || ''];
    const cellHeight = columnHeight * rowSpan;
    const lineHeight = columnHeight - columnPadding * 2 - columnBorderWidth;
    const tdClassNames: string[] = [
      `${columnAttr === 'lineNumber' ? 'axui-datagrid-line-number' : ''}`,
      `${columnAttr === 'rowSelector' ? 'axui-datagrid-row-selector' : ''}`,
    ];

    switch (columnAttr) {
      case 'lineNumber':
        if (focusedRow === li) {
          tdClassNames.push('focused');
        }
        if (selectionRows[li]) {
          tdClassNames.push('selected');
        }
        break;
      case 'rowSelector':
      default:
        if (selectionRows[li] && selectionCols[colIndex]) {
          tdClassNames.push('selected');
        }
        if (focusedRow === li && focusedCol === colIndex) {
          tdClassNames.push('focused');
        }
    }

    const colEditor: IDataGrid.IColEditor =
      editor === 'string'
        ? { type: '' + editor }
        : (editor as IDataGrid.IColEditor);
    const activeType = colEditor
      ? colEditor.activeType || 'dblclick'
      : 'dblclick';
    const inlineEditingActive =
      isInlineEditing &&
      inlineEditingCell.rowIndex === li &&
      inlineEditingCell.colIndex === colIndex;
    const inlineEditingActiveAlways =
      (colEditor && activeType === 'always') ||
      (colEditor && colEditor.type === 'checkbox');

    const editorDisabled =
      colEditor && colEditor.disable
        ? colEditor.disable({
            col: col,
            rowIndex: li,
            colIndex: col.colIndex || 0,
            item: data[li],
            value,
          })
        : false;

    let displayLabel = true;
    if (colEditor) {
      displayLabel = !(inlineEditingActiveAlways || inlineEditingActive);

      if (colEditor.type !== 'checkbox' && editorDisabled) {
        displayLabel = true;
      }
      if (
        colEditor.type === 'checkbox' &&
        (inlineEditingActiveAlways || inlineEditingActive)
      ) {
        displayLabel = false;
      }
    }

    return (
      <td
        key={ci}
        colSpan={colSpan}
        rowSpan={rowSpan}
        className={tdClassNames.join(' ')}
        style={{ height: cellHeight, minHeight: '1px' }}
        onDoubleClick={e => {
          if (
            !editorDisabled &&
            !inlineEditingActive &&
            activeType === 'dblclick'
          ) {
            this.handleActiveInlineEdit(e, col, li);
          }
        }}
        onClick={e => {
          if (
            !editorDisabled &&
            !inlineEditingActive &&
            activeType === 'click'
          ) {
            this.handleActiveInlineEdit(e, col, li);
          }
        }}
      >
        {displayLabel ? (
          <CellLabel
            col={col}
            li={li}
            item={data[li]}
            columnHeight={columnHeight}
            lineHeight={lineHeight}
            columnBorderWidth={columnBorderWidth}
            rowSelectorSize={rowSelectorSize}
            colAlign={colAlign}
            selected={selected}
            predefinedFormatter={predefinedFormatter}
          />
        ) : (
          <CellEditor
            col={col}
            li={li}
            item={data[li]}
            value={value}
            columnHeight={columnHeight}
            lineHeight={lineHeight}
            columnBorderWidth={columnBorderWidth}
            colAlign={colAlign}
            inlineEditingCell={inlineEditingCell}
            focusedRow={focusedRow}
            focusedCol={focusedCol}
            dispatch={dispatch}
            setStoreState={setStoreState}
          />
        )}
      </td>
    );
  }
}

export default DataGridBodyCell;
