import * as React from 'react';
import { connectStore } from '../hoc';
import { IDataGridStore } from '../providers';
import { classNames as CX, isFunction } from '../utils';
import { IDataGrid } from '../common/@types';
import CellLabelBottom from './CellLabelBottom';

interface IProps extends IDataGridStore {
  ci: number;
  col?: IDataGrid.ICol;
  value?: any;
}

const DataGridBodyBottomCell: React.SFC<IProps> = props => {
  const {
    data = [],
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
      <CellLabelBottom
        columnHeight={columnHeight}
        lineHeight={lineHeight}
        columnBorderWidth={columnBorderWidth}
        colAlign={colAlign}
        col={col}
        data={data}
        predefinedFormatter={predefinedFormatter}
        predefinedCollector={predefinedCollector}
      />
    </td>
  );
};

export default connectStore(DataGridBodyBottomCell);
