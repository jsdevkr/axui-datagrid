import * as React from 'react';
import { types, DispatchTypes, EventNames, KeyCodes } from '../stores';
import { connectStore } from '../hoc';
import { IDataGridStore } from '../providers';
import { classNames as CX, isFunction, getNode } from '../utils';

interface IProps extends IDataGridStore {
  ci: number;
  col?: types.DataGridCol;
  value?: any;
}
interface IState {}

class DataGridBodyBottomCell extends React.Component<IProps, IState> {
  editInput: HTMLInputElement;
  state = {};
  activeComposition: boolean = false;

  setEditInputNode = (element: any) => {
    this.editInput = element;
  };

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (this.editInput) {
      this.activeComposition = false;
      this.editInput.select();
    }
  }

  onDoubleClickCell = (e: any, col: types.DataGridColumn, li: number) => {
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

  onKeyUp = (e: any, col: types.DataGridColumn, li: number) => {
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

  onEventInput = (eventName: EventNames, e: any) => {
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
                value: e.target.value,
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
      col = {},
      ci,
      value,
      options = {},
      predefinedFormatter = {},
      predefinedCollector = {},
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

    const lineHeight: number =
      columnHeight - columnPadding * 2 - columnBorderWidth;
    const colAlign = col.align || bodyAlign || '';

    let label: any;

    const getLabel = function() {
      let collectorData = {
        data: filteredList,
        key: col.key,
      };
      let labelValue: string;

      if (
        typeof col.collector === 'string' &&
        col.collector in predefinedCollector
      ) {
        // todo call collector function

        if (
          typeof col.formatter === 'string' &&
          col.formatter in predefinedFormatter
        ) {
          labelValue = predefinedFormatter[col.formatter](collectorData);
        } else if (isFunction(col.formatter)) {
          labelValue = (col.formatter as types.formatterFunction)(
            collectorData,
          );
        } else {
          labelValue = col.label || '';
        }
      } else {
        labelValue = col.label || '';
      }

      return labelValue;
    };

    if (col.key === '_line_number_') {
      label = '';
    } else if (col.key === '_row_selector_') {
      label = (
        <div
          className="axui-datagrid-check-box"
          data-span={col.columnAttr || ''}
          data-checked={false}
          style={{
            maxHeight: lineHeight + 'px',
            minHeight: lineHeight + 'px',
          }}
        />
      );
    } else {
      label = getLabel();
    }

    return (
      <td
        key={ci}
        colSpan={col.colSpan}
        rowSpan={col.rowSpan}
        className={CX(tdClassNames)}
        style={{ height: cellHeight, minHeight: '1px' }}
      >
        <span
          data-span={col.columnAttr || ''}
          data-pos={col.colIndex + ',' + col.rowIndex + ',' + 'footsum'}
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

export default connectStore(DataGridBodyBottomCell);
