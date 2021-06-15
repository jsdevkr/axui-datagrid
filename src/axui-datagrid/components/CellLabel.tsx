import * as React from 'react';
import { isFunction } from '../utils';
import { IDataGrid } from '../common/@types';

class CellLabel extends React.PureComponent<{
  columnHeight: number;
  lineHeight: number;
  columnBorderWidth: number;
  rowSelectorSize: number;
  colAlign: string;
  col: IDataGrid.ICol;
  li: number;
  lineNumberStartAt: number;
  item?: IDataGrid.IDataItem;
  selected?: boolean;
  predefinedFormatter: IDataGrid.IFormatter;
}> {
  render() {
    const {
      columnHeight,
      lineHeight,
      columnBorderWidth,
      rowSelectorSize,
      colAlign,
      col,
      col: { key = '', columnAttr = '', formatter },
      li,
      lineNumberStartAt,
      item,
      selected = false,
      predefinedFormatter,
    } = this.props;

    if (!item) {
      return null;
    }

    const value =
      item && item.changed && item.changed![col.key || '']
        ? item.changed![col.key || '']
        : item.value[col.key || ''];

    const formatterData: IDataGrid.IFormatterData = {
      item,
      index: li,
      key: col.key,
      value,
    };

    let labelValue: string | React.ReactNode = '';
    switch (key) {
      case '_line_number_':
        labelValue = item.type ? item.type : li + lineNumberStartAt + '';
        break;

      case '_row_selector_':
        labelValue = (
          <div
            data-span={columnAttr}
            className="axui-datagrid-check-box"
            data-checked={selected}
            style={{
              width: rowSelectorSize + 'px',
              height: rowSelectorSize + 'px',
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
          labelValue = formatterData.value;
        }
    }

    if (typeof labelValue === 'string') {
      return (
        <span
          data-span={columnAttr}
          style={{
            height: columnHeight - columnBorderWidth + 'px',
            lineHeight: lineHeight + 'px',
            textAlign: colAlign as any,
          }}
          dangerouslySetInnerHTML={{ __html: labelValue }}
        />
      );
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
