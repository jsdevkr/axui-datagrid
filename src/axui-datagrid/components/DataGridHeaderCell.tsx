import * as React from 'react';
import { types } from '../stores';
import { connectStore } from '../hoc';
import { IDataGridStore } from '../providers';
import { classNames as CX } from '../utils';

interface IProps extends IDataGridStore {
  bodyRow: types.DataGridColumnTableMap;
  ri: number;
  col: types.DataGridCol;
  onClick: (e: any, col: types.DataGridCol) => void;
}

const DatagridHeaderCell: React.SFC<IProps> = ({
  listSelectedAll = false,
  options = {},
  focusedCol = -1,
  selectionCols,
  sortInfo,
  bodyRow,
  ri,
  col,
  onClick,
  filterInfo = {},
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
    label: colLabel = '',
    rowSpan: colRowSpan = 1,
    colSpan: colCowSpan = 1,
  } = col;

  let lineHeight =
    optionsHeaderColumnHeight -
    optionsHeaderColumnPadding * 2 -
    optionsHeaderColumnBorderWidth;
  let label, sorter, filter;

  if (col.key === '_row_selector_') {
    if (optionsHeader.selector) {
      label = (
        <div
          className="axui-datagrid-check-box"
          data-checked={listSelectedAll}
          style={{
            maxHeight: lineHeight + 'px',
            minHeight: lineHeight + 'px',
          }}
        />
      );
    }
  } else {
    label = colLabel;
  }

  if (colKey && sortInfo && sortInfo[colKey]) {
    sorter = (
      <span
        data-sorter={colIndex}
        data-sorter-order={sortInfo[colKey].orderBy}
      />
    );
  }

  // todo : filter된 상태일 때. 아이콘 처리 및 filter해제 상태 관리
  // if (filterInfo[colIndex]) {
  if (optionsHeader.enableFilter && colKey && colIndex > -1) {
    filter = (
      <span data-filter={!!filterInfo[colIndex]} data-filter-index={colIndex} />
    );
  }

  let cellHeight =
    optionsHeaderColumnHeight * colRowSpan - optionsHeaderColumnBorderWidth;

  let tdClassNames = {
    ['axui-datagrid-header-column']: true,
    ['axui-datagrid-header-corner']: col.columnAttr === 'lineNumber',
    ['focused']:
      focusedCol > -1 &&
      col.colIndex === focusedCol &&
      bodyRow.rows.length - 1 === ri + colRowSpan - 1,
    ['selected']:
      selectionCols &&
      selectionCols[colIndex] &&
      bodyRow.rows.length - 1 === ri + colRowSpan - 1,
  };

  return (
    <td
      colSpan={colCowSpan}
      rowSpan={colRowSpan}
      className={CX(tdClassNames)}
      style={{ height: cellHeight, minHeight: '1px' }}
      onClick={(e: any) => {
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
        {sorter}
        {label || ' '}
      </span>
      {filter}
    </td>
  );
};

export default connectStore(DatagridHeaderCell);
