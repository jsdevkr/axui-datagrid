import * as React from 'react';
import { isFunction } from '../utils';
import { IDataGrid } from '../common/@types';

class CellLabel extends React.PureComponent<{
  columnHeight: number;
  lineHeight: number;
  columnBorderWidth: number;
  colAlign: string;
  col: IDataGrid.ICol;
  li: number;
  item: any;
  selected?: boolean;
  predefinedFormatter: IDataGrid.IFormatter;
}> {
  render() {
    const {
      columnHeight,
      lineHeight,
      columnBorderWidth,
      colAlign,
      col,
      col: { key = '', columnAttr = '', formatter },
      li,
      item,
      selected = false,
      predefinedFormatter,
    } = this.props;

    const formatterData = {
      item,
      index: li,
      key: col.key,
      value: item[col.key || ''],
    };

    let labelValue: string | React.ReactNode = '';
    switch (key) {
      case '_line_number_':
        labelValue = li + 1 + '';
        break;

      case '_row_selector_':
        labelValue = (
          <div
            data-span={columnAttr}
            className="axui-datagrid-check-box"
            data-checked={selected}
            style={{
              width: lineHeight + 'px',
              height: lineHeight + 'px',
            }}
          />
        );
        break;

      default:
        if (typeof formatter === 'string' && formatter in predefinedFormatter) {
          labelValue = predefinedFormatter[formatter](formatterData);
        } else if (isFunction(formatter)) {
          labelValue = (formatter as IDataGrid.formatterFunction)(
            formatterData,
          );
        } else {
          labelValue = item[key];
        }
    }

    return (
      <span
        data-span={columnAttr}
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

export default CellLabel;
