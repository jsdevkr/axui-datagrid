import * as React from 'react';
import { intfs, types } from '../stores';
import { connectStore } from '../hoc';
import { IDataGridStore } from '../providers';
import { classNames as CX, isFunction } from '../utils';

interface IProps extends IDataGridStore {
  ci: number;
  col?: types.DataGridCol;
  value?: any;
}

const CellLabel: React.SFC<{
  lineHeight: number;
  col: types.DataGridCol;
  list: any[];
  predefinedFormatter: types.DataGridFormatter;
  predefinedCollector: types.DataGridCollector;
}> = props => {
  const {
    col,
    list: data,
    lineHeight,
    predefinedFormatter,
    predefinedCollector,
  } = props;
  const { key, label = '', columnAttr = '', collector, formatter } = col;
  let collectorData: intfs.IDataGridCollectorData = {
    data,
    key,
  };
  let formatterData: intfs.IDataGridFormatterData = {
    data,
    key,
    value: '',
  };

  switch (key) {
    case '_line_number_':
      return null;
    case '_row_selector_':
      return (
        <div
          className="axui-datagrid-check-box"
          data-span={columnAttr}
          data-checked={false}
          style={{
            maxHeight: lineHeight + 'px',
            minHeight: lineHeight + 'px',
          }}
        />
      );
    default:
      let labelValue: string;
      if (typeof collector === 'string' && collector in predefinedCollector) {
        labelValue = predefinedCollector[collector](collectorData);
      } else if (isFunction(collector)) {
        labelValue = (collector as types.collectorFunction)(collectorData);
      } else {
        labelValue = label;
      }

      // set formatterData.value by collector value
      formatterData.value = labelValue;

      if (typeof formatter === 'string' && formatter in predefinedFormatter) {
        labelValue = predefinedFormatter[formatter](formatterData);
      } else if (isFunction(col.formatter)) {
        labelValue = (col.formatter as types.formatterFunction)(formatterData);
      }

      return <>{labelValue}</>;
  }
};

const DataGridBodyBottomCell: React.SFC<IProps> = props => {
  const {
    filteredList = [],
    col = {},
    ci,
    options = {},
    predefinedFormatter = {},
    predefinedCollector = {},
  } = props;

  const { body: optionsBody = {} } = options;
  const {
    columnHeight = 0,
    columnPadding = 0,
    columnBorderWidth = 0,
    align: bodyAlign = 'left',
  } = optionsBody;
  const {
    rowSpan: colRowSpan = 0,
    colIndex: colColIndex = 0,
    align: colAlign = bodyAlign || '',
    columnAttr = '',
    colSpan = 1,
    rowSpan = 1,
  } = col;
  const tdClassNames: { [key: string]: any } = {
    ['axui-datagrid-line-number']: columnAttr === 'lineNumber',
    ['axui-datagrid-row-selector']: columnAttr === 'rowSelector',
  };
  const lineHeight: number =
    columnHeight - columnPadding * 2 - columnBorderWidth;

  return (
    <td
      key={ci}
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={CX(tdClassNames)}
      style={{ height: columnHeight * colRowSpan, minHeight: '1px' }}
    >
      <span
        data-span={columnAttr}
        data-pos={colColIndex}
        style={{
          height: columnHeight - columnBorderWidth + 'px',
          lineHeight: lineHeight + 'px',
          textAlign: colAlign as any,
        }}
      >
        <CellLabel
          col={col}
          list={filteredList}
          lineHeight={lineHeight}
          predefinedFormatter={predefinedFormatter}
          predefinedCollector={predefinedCollector}
        />
      </span>
    </td>
  );
};

export default connectStore(DataGridBodyBottomCell);
