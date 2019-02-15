import * as React from 'react';
import { classNames as CX, isFunction, getNode } from '../utils';
import { IDataGrid } from '../common/@types';

const CellLabel: React.SFC<{
  lineHeight: number;
  col: IDataGrid.ICol;
  list: any[];
  li: number;
  predefinedFormatter: IDataGrid.IFormatter;
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
        labelValue = (formatter as IDataGrid.formatterFunction)(formatterData);
      } else {
        labelValue = data[li][key];
      }

      return <>{labelValue}</>;
  }
};

export default CellLabel;
