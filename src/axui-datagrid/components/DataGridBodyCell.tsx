import * as React from 'react';
import { types, EventNames, KeyCodes } from '../stores';
import { connectStore } from '../hoc';
import { IDataGridStore } from '../providers';
import { classNames as CX, isFunction } from '../utils';

interface IProps extends IDataGridStore {
  li: number;
  ci: number;
  col: types.DataGridCol;
  value: any;
}
interface IState {}

class DataGridBodyCell extends React.Component<IProps, IState> {
  editInput: HTMLInputElement;
  state = {};

  onDoubleClickCell = (e: any, col: types.DataGridColumn, li: number) => {
    const { setStoreState } = this.props;

    if (col.editor) {
      setStoreState({
        isInlineEditing: true,
        inlineEditingCell: {
          row: li,
          col: col.colIndex,
          editor: col.editor,
        },
      });
    }
  };

  onEventInput = (eventName: EventNames, e: any) => {
    const { setStoreState } = this.props;

    const proc = {
      [EventNames.BLUR]: () => {

        setStoreState({
          isInlineEditing: false,
          inlineEditingCell: {},
        });
      },
      [EventNames.KEYDOWN]: () => {
        if (e.which === KeyCodes.ESC) {

          setStoreState({
            isInlineEditing: false,
            inlineEditingCell: {},
          });

        } else if (e.which === KeyCodes.ENTER) {

          setStoreState({
            isInlineEditing: false,
            inlineEditingCell: {},
          });

          /*
          updateEditInput(
            'update',
            inlineEditingCell.row,
            inlineEditingCell.col,
            e.target.value,
          );
          */
        }
      },
    };
    proc[eventName]();
  };

  render() {
    const {
      filteredList = [],
      focusedRow,
      focusedCol,
      selectionRows = [],
      selectionCols = [],
      li,
      col = {},
      ci,
      value,
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
    const { rowSpan: colRowSpan = 0, colIndex: colColIndex = 0 } = col;

    let cellHeight = columnHeight * colRowSpan;
    let tdClassNames: { [key: string]: any } = {
      ['axui-datagrid-line-number']: col.columnAttr === 'lineNumber',
      ['axui-datagrid-row-selector']: col.columnAttr === 'rowSelector',
    };

    if (col.columnAttr === 'lineNumber') {
      if (focusedRow === li) {
        tdClassNames.focused = true;
      }
      if (selectionRows[li]) {
        tdClassNames.selected = true;
      }
    } else if (col.columnAttr === 'rowSelector') {
    } else {
      if (selectionRows[li] && selectionCols[colColIndex]) {
        tdClassNames.selected = true;
      }
      if (focusedRow === li && focusedCol === colColIndex) {
        tdClassNames.focused = true;
      }
    }

    if (
      isInlineEditing &&
      inlineEditingCell.row === li &&
      inlineEditingCell.col === col.colIndex
    ) {
      return (
        <td
          key={ci}
          colSpan={col.colSpan}
          rowSpan={col.rowSpan}
          className={CX(tdClassNames)}
          style={{ height: cellHeight, minHeight: '1px' }}
        >
          <input
            type="text"
            ref={input => {
              this.editInput = input as HTMLInputElement;
            }}
            data-inline-edit
            defaultValue={value}
          />
        </td>
      );
    } else {
      const lineHeight: number =
        columnHeight - columnPadding * 2 - columnBorderWidth;
      const colAlign = col.align || bodyAlign || '';

      let label: any;

      const getLabel = function(_item: any, _itemIdx: number) {
        let formatterData = {
          data: filteredList,
          item: _item,
          index: _itemIdx,
          key: col.key,
          value: _item[col.key || ''],
        };
        let labelValue: string;

        if (
          typeof col.formatter === 'string' &&
          col.formatter in predefinedFormatter
        ) {
          labelValue = predefinedFormatter[col.formatter](formatterData);
        } else if (isFunction(col.formatter)) {
          labelValue = (col.formatter as types.formatterFunction)(
            formatterData,
          );
        } else {
          labelValue = _item[col.key || ''];
        }

        return labelValue;
      };

      if (col.key === '__line_number__') {
        label = li + 1;
      } else if (col.key === '__row_selector__') {
        label = (
          <div
            className="axui-datagrid-check-box"
            style={{
              maxHeight: (col.width as number) - 10 + 'px',
              minHeight: (col.width as number) - 10 + 'px',
            }}
          />
        );
      } else {
        label = getLabel(filteredList[li], li);
      }

      return (
        <td
          key={ci}
          colSpan={col.colSpan}
          rowSpan={col.rowSpan}
          className={CX(tdClassNames)}
          style={{ height: cellHeight, minHeight: '1px' }}
          onDoubleClick={(e: any) => {}}
        >
          <span
            data-span={col.columnAttr || ''}
            data-pos={col.colIndex + ',' + col.rowIndex + ',' + li}
            style={{
              height: columnHeight - columnBorderWidth + 'px',
              lineHeight: lineHeight + 'px',
              textAlign: colAlign as any,
            }}
          >
            {label || ' '}
          </span>
        </td>
      );
    }
  }
}

export default connectStore(DataGridBodyCell);
