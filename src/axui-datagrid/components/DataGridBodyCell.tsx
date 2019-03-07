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

  // onKeyUp = (
  //   e: React.KeyboardEvent<HTMLInputElement>,
  //   col: IDataGrid.IColumn,
  //   li: number,
  // ) => {
  //   const { setStoreState } = this.props;

  //   const proc = {
  //     [DataGridEnums.KeyCodes.ENTER]: () => {
  //       if (col.editor) {
  //         setStoreState({
  //           isInlineEditing: true,
  //           inlineEditingCell: {
  //             rowIndex: li,
  //             colIndex: col.colIndex,
  //             editor: col.editor,
  //           },
  //         });
  //       }
  //     },
  //   };

  //   proc[e.which] && proc[e.which]();
  // };

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
    } = col;

    let cellHeight = columnHeight * rowSpan;
    let tdClassNames: { [key: string]: any } = {
      ['axui-datagrid-line-number']: columnAttr === 'lineNumber',
      ['axui-datagrid-row-selector']: columnAttr === 'rowSelector',
    };

    if (columnAttr === 'lineNumber') {
      if (focusedRow === li) {
        tdClassNames.focused = true;
      }
      if (selectionRows[li]) {
        tdClassNames.selected = true;
      }
    } else if (columnAttr === 'rowSelector') {
    } else {
      if (selectionRows[li] && selectionCols[colIndex]) {
        tdClassNames.selected = true;
      }
      if (focusedRow === li && focusedCol === colIndex) {
        tdClassNames.focused = true;
      }
    }

    if (
      isInlineEditing &&
      inlineEditingCell.rowIndex === li &&
      inlineEditingCell.colIndex === colIndex
    ) {
      return (
        <td
          key={ci}
          colSpan={colSpan}
          rowSpan={rowSpan}
          className={CX(tdClassNames)}
          style={{ height: cellHeight, minHeight: '1px' }}
        >
          <CellEditor col={col} li={li} />
        </td>
      );
    } else {
      const lineHeight: number =
        columnHeight - columnPadding * 2 - columnBorderWidth;

      return (
        <td
          key={ci}
          colSpan={colSpan}
          rowSpan={rowSpan}
          className={CX(tdClassNames)}
          style={{ height: cellHeight, minHeight: '1px' }}
          onDoubleClick={(e: any) => {
            this.onDoubleClickCell(e, col, li);
          }}
        >
          <span
            data-span={columnAttr}
            data-pos={colIndex + ',' + rowIndex + ',' + li}
            style={{
              height: columnHeight - columnBorderWidth + 'px',
              lineHeight: lineHeight + 'px',
              textAlign: colAlign as any,
            }}
          >
            <CellLabel
              lineHeight={lineHeight}
              col={col}
              list={data}
              li={li}
              predefinedFormatter={predefinedFormatter}
            />
          </span>
        </td>
      );
    }
  }
}

export default connectStore(DataGridBodyCell);
