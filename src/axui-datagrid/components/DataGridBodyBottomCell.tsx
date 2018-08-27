import * as React from 'react';
import { intfs, types, DispatchTypes, EventNames, KeyCodes } from '../stores';
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
  state = {};

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
      let collectorData: intfs.IDataGridCollectorData = {
        data: filteredList,
        key: col.key,
      };
      let formatterData: intfs.IDataGridFormatterData = {
        data: filteredList,
        key: col.key,
        value: '',
      };

      let labelValue: string;

      if (
        typeof col.collector === 'string' &&
        col.collector in predefinedCollector
      ) {
        labelValue = predefinedCollector[col.collector](collectorData);
      } else if (isFunction(col.collector)) {
        labelValue = (col.collector as types.collectorFunction)(collectorData);
      } else {
        labelValue = col.label || '';
      }

      // collector로 구한 값을 formatter의 value로 사용
      formatterData.value = labelValue;

      if (
        typeof col.formatter === 'string' &&
        col.formatter in predefinedFormatter
      ) {
        labelValue = predefinedFormatter[col.formatter](formatterData);
      } else if (isFunction(col.formatter)) {
        labelValue = (col.formatter as types.formatterFunction)(formatterData);
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
          data-pos={col.colIndex}
          style={{
            height: columnHeight - columnBorderWidth + 'px',
            lineHeight: lineHeight + 'px',
            textAlign: colAlign as any,
          }}
        >
          {label || ''}
        </span>
      </td>
    );
  }
}

export default connectStore(DataGridBodyBottomCell);
