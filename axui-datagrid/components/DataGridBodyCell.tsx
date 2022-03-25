import * as React from 'react';
import { IDataGrid } from '../common/@types';
import CellLabel from './CellLabel';
import CellEditor from './CellEditor';
import { getDataItem } from '../utils';

class DataGridBodyCell extends React.PureComponent<{
  li: number;
  ci: number;
  colGroup: IDataGrid.ICol[];
  col?: IDataGrid.ICol;
  value?: any;
  data?: IDataGrid.IData;
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
  printStartColIndex?: number;
  printEndColIndex?: number;
  scrollLeft?: number;
  scrollTop?: number;
  styles?: IDataGrid.IStyles;
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
      colGroup = [],
      col = {},
      col: { rowSpan = 0, colSpan = 0, colIndex = 0, columnAttr = '' } = {},
      ci,
      data = {},
      selected,
      focusedRow,
      focusedCol,
      selectionRows = [],
      selectionCols = [],
      options,
      options: {
        lineNumberStartAt = 1,
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
      printStartColIndex,
      printEndColIndex,
      scrollLeft,
      scrollTop,
      styles,
    } = this.props;

    const editor = col.editor;
    const colAlign = col.align || bodyAlign;
    const item = getDataItem(data, li);
    if (!item) {
      return null;
    }
    // @ts-ignore
    const value = item.value[col.key || ''] || '';
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
        // @ts-ignore
        if (selectionRows[li]) {
          tdClassNames.push('selected');
        }
        break;
      case 'rowSelector':
      default:
        // @ts-ignore
        if (selectionRows[li] && selectionCols[colIndex]) {
          tdClassNames.push('selected');
        }
        if (focusedRow === li && focusedCol === colIndex) {
          tdClassNames.push('focused');
        }
    }

    if (item.changed && item.changed[col.key || ''] && item.type === 'U') {
      tdClassNames.push('updated');
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
            item,
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
        className={tdClassNames.join(' ').trim()}
        style={{ height: cellHeight }}
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
            lineNumberStartAt={lineNumberStartAt}
            item={item}
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
            colGroup={colGroup}
            col={col}
            li={li}
            item={item}
            columnHeight={columnHeight}
            lineHeight={lineHeight}
            columnBorderWidth={columnBorderWidth}
            colAlign={colAlign}
            inlineEditingCell={inlineEditingCell}
            focusedRow={focusedRow}
            focusedCol={focusedCol}
            dispatch={dispatch}
            setStoreState={setStoreState}
            printStartColIndex={printStartColIndex}
            printEndColIndex={printEndColIndex}
            scrollLeft={scrollLeft}
            scrollTop={scrollTop}
            options={options}
            styles={styles}
          />
        )}
      </td>
    );
  }
}

export default DataGridBodyCell;
