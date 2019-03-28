import * as React from 'react';
import { isFunction } from '../utils';
import { IDataGrid } from '../common/@types';

class CellLabelBottom extends React.PureComponent<{
  columnHeight: number;
  lineHeight: number;
  columnBorderWidth: number;
  colAlign: string;
  col: IDataGrid.ICol;
  data: any[];
  predefinedFormatter: IDataGrid.IFormatter;
  predefinedCollector: IDataGrid.ICollector;
}> {
  render() {
    const {
      columnHeight,
      lineHeight,
      columnBorderWidth,
      colAlign,
      col,
      col: { key, label = '', columnAttr = '', collector, formatter },
      data,
      predefinedFormatter,
      predefinedCollector,
    } = this.props;

    let collectorData: IDataGrid.ICollectorData = {
      data,
      key,
    };
    let formatterData: IDataGrid.IFormatterData = {
      key,
      value: '',
    };

    let labelValue: string | React.ReactNode = '';
    switch (key) {
      case '_line_number_':
        labelValue = '';
        break;

      case '_row_selector_':
        labelValue = (
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
        break;

      default:
        if (typeof collector === 'string' && collector in predefinedCollector) {
          labelValue = predefinedCollector[collector](collectorData);
        } else if (isFunction(collector)) {
          labelValue = (collector as IDataGrid.collectorFunction)(
            collectorData,
          );
        } else {
          labelValue = label;
        }

        // set formatterData.value by collector value
        formatterData.value = labelValue;

        if (typeof formatter === 'string' && formatter in predefinedFormatter) {
          labelValue = predefinedFormatter[formatter](formatterData);
        } else if (isFunction(col.formatter)) {
          labelValue = (col.formatter as IDataGrid.formatterFunction)(
            formatterData,
          );
        }
    }

    return (
      <span
        data-span={columnAttr}
        // data-pos={colColIndex}
        style={{
          height: columnHeight - columnBorderWidth + 'px',
          lineHeight: lineHeight + 'px',
          textAlign: colAlign as any,
        }}
      >
        {labelValue}
      </span>
    );
  }
}

export default CellLabelBottom;
