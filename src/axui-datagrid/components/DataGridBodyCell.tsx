import * as React from 'react';
import { types, DispatchTypes, EventNames, KeyCodes } from '../stores';
import { connectStore } from '../hoc';
import { IDataGridStore } from '../providers';
import { classNames as CX, isFunction, getNode } from '../utils';

const CellLabel: React.SFC<{
  lineHeight: number;
  col: types.DataGridCol;
  list: any[];
  li: number;
  predefinedFormatter: types.DataGridFormatter;
}> = props => {
  const { col, list: data, li, lineHeight, predefinedFormatter } = props;
  const { key = '', columnAttr = '', formatter } = col;
  const formatterData = {
    data,
    item: data[li],
    index: li,
    key: col.key,
    value: data[li][col.key || ''],
  };

  switch (key) {
    case '_line_number_':
      return <>{li + 1}</>;
    case '_row_selector_':
      return (
        <div
          className="axui-datagrid-check-box"
          data-span={columnAttr}
          data-checked={data[li]._selected_}
          style={{
            maxHeight: lineHeight + 'px',
            minHeight: lineHeight + 'px',
          }}
        />
      );
    default:
      let labelValue: string;

      if (typeof formatter === 'string' && formatter in predefinedFormatter) {
        labelValue = predefinedFormatter[formatter](formatterData);
      } else if (isFunction(formatter)) {
        labelValue = (formatter as types.formatterFunction)(formatterData);
      } else {
        labelValue = data[li][key];
      }

      return <>{labelValue}</>;
  }
};

interface IProps extends IDataGridStore {
  li: number;
  ci: number;
  col?: types.DataGridCol;
  value?: any;
}

class DataGridBodyCell extends React.Component<IProps> {
  editInput: HTMLInputElement;
  state = {};
  activeComposition: boolean = false;

  setEditInputNode = (element: HTMLInputElement) => {
    this.editInput = element;
  };

  componentDidUpdate(prevProps: IProps) {
    if (this.editInput) {
      this.activeComposition = false;
      this.editInput.select();
    }
  }

  onDoubleClickCell = (
    e: React.KeyboardEvent<HTMLInputElement>,
    col: types.DataGridColumn,
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

  onKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    col: types.DataGridColumn,
    li: number,
  ) => {
    const { setStoreState } = this.props;

    const proc = {
      [KeyCodes.ENTER]: () => {
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
      },
    };

    proc[e.which] && proc[e.which]();
  };

  onEventInput = (
    eventName: EventNames,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const {
      getRootNode,
      setStoreState,
      dispatch,
      inlineEditingCell = {},
    } = this.props;

    const rootNode = getNode(getRootNode);

    const proc = {
      [EventNames.BLUR]: () => {
        setStoreState({
          isInlineEditing: false,
          inlineEditingCell: {},
        });

        if (rootNode) {
          rootNode.focus();
        }
      },
      [EventNames.KEYUP]: () => {
        switch (e.which) {
          case KeyCodes.ESC:
            setStoreState({
              isInlineEditing: false,
              inlineEditingCell: {},
            });

            if (rootNode) {
              rootNode.focus();
            }
            break;
          case KeyCodes.UP_ARROW:
          case KeyCodes.DOWN_ARROW:
          case KeyCodes.ENTER:
            if (!this.activeComposition) {
              dispatch(DispatchTypes.UPDATE, {
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
      },
    };

    proc[eventName] && proc[eventName]();
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
          <input
            type="text"
            ref={this.setEditInputNode}
            onCompositionUpdate={(e: any) => {
              this.activeComposition = true;
            }}
            onCompositionEnd={(e: any) => {
              setTimeout(() => {
                this.activeComposition = false;
              });
            }}
            onBlur={(e: any) => {
              this.onEventInput(EventNames.BLUR, e);
            }}
            onKeyUp={(e: any) => {
              this.onEventInput(EventNames.KEYUP, e);
            }}
            data-inline-edit
            defaultValue={value}
          />
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
              list={filteredList}
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
