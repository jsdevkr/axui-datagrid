import * as React from 'react';
import { IDataGrid } from '../common/@types';
import CellLabelBottom from './CellLabelBottom';

interface IProps {
  ci: number;
  col?: IDataGrid.ICol;
  data?: any;
  options: IDataGrid.IOptions;
  predefinedFormatter?: {};
  predefinedCollector?: {};
}

class DataGridBodyBottomCell extends React.PureComponent<IProps> {
  render() {
    const {
      data = [],
      col = {},
      col: {
        rowSpan: colRowSpan = 0,
        align: colAlign = '',
        columnAttr = '',
        colSpan = 1,
        rowSpan = 1,
      } = {},
      ci,
      options: {
        body: {
          columnHeight = 0,
          columnPadding = 0,
          columnBorderWidth = 0,
          align: bodyAlign = 'left',
        } = {},
      } = {},
      predefinedFormatter = {},
      predefinedCollector = {},
    } = this.props;
    const lineHeight: number =
      columnHeight - columnPadding * 2 - columnBorderWidth;

    return (
      <td
        key={ci}
        colSpan={colSpan}
        rowSpan={rowSpan}
        className={`${
          columnAttr === 'lineNumber' ? 'axui-datagrid-line-number' : ''
        } ${columnAttr === 'rowSelector' ? 'axui-datagrid-row-selector' : ''}`}
        style={{ height: columnHeight * colRowSpan, minHeight: '1px' }}
      >
        <CellLabelBottom
          columnHeight={columnHeight}
          lineHeight={lineHeight}
          columnBorderWidth={columnBorderWidth}
          colAlign={colAlign || bodyAlign}
          col={col}
          data={data}
          predefinedFormatter={predefinedFormatter}
          predefinedCollector={predefinedCollector}
        />
      </td>
    );
  }
}

export default DataGridBodyBottomCell;
