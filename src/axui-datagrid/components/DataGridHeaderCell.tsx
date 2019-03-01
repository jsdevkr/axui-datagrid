import * as React from 'react';
import { connectStore } from '../hoc';
import { IDataGridStore } from '../providers';
import { classNames as CX } from '../utils';
import { IDataGrid } from '../common/@types';

const CellLabel: React.SFC<{
  lineHeight: number;
  col: IDataGrid.ICol;
  optionsHeader: IDataGrid.IOptionHeader;
  listSelectedAll: boolean;
}> = ({ col, lineHeight, optionsHeader, listSelectedAll }) => {
  const { key = '', label = '' } = col;
  switch (key) {
    case '_row_selector_':
      if (optionsHeader.selector) {
        return (
          <div
            className="axui-datagrid-check-box"
            data-checked={listSelectedAll}
            style={{
              maxHeight: lineHeight + 'px',
              minHeight: lineHeight + 'px',
            }}
          />
        );
      } else {
        return null;
      }

    default:
      return <>{label}</>;
  }
};

const CellSorter: React.SFC<{
  show: boolean;
  colIndex: number;
  orderBy: string;
}> = ({ show, colIndex, orderBy }) =>
  show ? <span data-sorter={colIndex} data-sorter-order={orderBy} /> : null;

const CellFilter: React.SFC<{
  show: boolean;
  colIndex: number;
  isFiltered: boolean;
}> = ({ show, colIndex, isFiltered }) =>
  show ? <span data-filter={isFiltered} data-filter-index={colIndex} /> : null;

interface IProps extends IDataGridStore {
  bodyRow: IDataGrid.IColumnTableMap;
  ri: number;
  col: IDataGrid.ICol;
  onClick: (e: any, col: IDataGrid.ICol) => void;
}

const DatagridHeaderCell: React.SFC<IProps> = ({
  listSelectedAll = false,
  options = {},
  focusedCol = -1,
  selectionCols,
  sortInfo = {},
  bodyRow,
  ri,
  col,
  onClick,
}) => {
  const { header: optionsHeader = {} } = options;
  const {
    columnHeight: optionsHeaderColumnHeight = 0,
    columnPadding: optionsHeaderColumnPadding = 0,
    columnBorderWidth: optionsHeaderColumnBorderWidth = 0,
    align: headerAlign = '',
  } = optionsHeader;
  const {
    align: colAlign = headerAlign || '',
    colIndex = 0,
    key: colKey = '',
    rowSpan: colRowSpan = 1,
    colSpan: colCowSpan = 1,
  } = col;
  const lineHeight =
    optionsHeaderColumnHeight -
    optionsHeaderColumnPadding * 2 -
    optionsHeaderColumnBorderWidth;

  return (
    <td
      colSpan={colCowSpan}
      rowSpan={colRowSpan}
      className={CX({
        ['axui-datagrid-header-column']: true,
        ['axui-datagrid-header-corner']: col.columnAttr === 'lineNumber',
        ['focused']:
          focusedCol > -1 &&
          colIndex === focusedCol &&
          bodyRow.rows.length - 1 === ri + colRowSpan - 1,
        ['selected']:
          selectionCols &&
          selectionCols[colIndex] &&
          bodyRow.rows.length - 1 === ri + colRowSpan - 1,
      })}
      style={{
        height:
          optionsHeaderColumnHeight * colRowSpan -
          optionsHeaderColumnBorderWidth,
        minHeight: '1px',
      }}
      onClick={(e: React.MouseEvent<Element>) => {
        onClick(e, col);
      }}
    >
      <span
        data-span
        data-align={colAlign}
        style={{
          height:
            optionsHeaderColumnHeight - optionsHeaderColumnBorderWidth + 'px',
          lineHeight: lineHeight + 'px',
        }}
      >
        <CellSorter
          show={colKey && sortInfo[colKey]}
          colIndex={colIndex}
          orderBy={sortInfo[colKey] ? sortInfo[colKey].orderBy : ''}
        />
        <CellLabel
          col={col}
          lineHeight={lineHeight}
          optionsHeader={optionsHeader}
          listSelectedAll={listSelectedAll}
        />
      </span>
    </td>
  );
};

export default connectStore(DatagridHeaderCell);
