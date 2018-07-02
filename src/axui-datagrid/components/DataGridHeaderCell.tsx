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
  options = {},
  focusedCol,
  selectionCols,
  sortInfo,
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
  const colAlign = col.align || headerAlign || '';

  let lineHeight =
    optionsHeaderColumnHeight -
    optionsHeaderColumnPadding * 2 -
    optionsHeaderColumnBorderWidth;
  let label, sorter;

  if (col.key === '__row_selector__') {
    if (optionsHeader.selector) {
      label = (
        <div
          className="axui-datagrid-check-box"
          style={{
            maxHeight: lineHeight + 'px',
            minHeight: lineHeight + 'px',
          }}
        />
      );
    }
  } else {
    label = col.label;
  }

  if (
    col.key &&
    col.colIndex !== null &&
    typeof col.colIndex !== 'undefined' &&
    sortInfo &&
    sortInfo[col.key]
  ) {
    sorter = (
      <span
        data-sorter={col.colIndex}
        data-sorter-order={sortInfo[col.key].orderBy}
      />
    );
  }

  let cellHeight =
    optionsHeaderColumnHeight * (col.rowSpan || 1) -
    optionsHeaderColumnBorderWidth;
  let tdClassNames = {
    ['axui-datagrid-header-column']: true,
    ['axui-datagrid-header-corner']: col.columnAttr === 'lineNumber',
    ['focused']:
      (focusedCol || 0) > -1 &&
      col.colIndex === focusedCol &&
      bodyRow.rows.length - 1 === ri + (col.rowSpan || 1) - 1,
    ['selected']:
      selectionCols &&
      selectionCols[col.colIndex || 0] &&
      bodyRow.rows.length - 1 === ri + (col.rowSpan || 1) - 1,
  };

  // td : onClick={e => onClickHeader(e, col.colIndex, col.columnAttr)}

  return (
    <td
      colSpan={col.colSpan}
      rowSpan={col.rowSpan}
      className={CX(tdClassNames)}
      style={{ height: cellHeight, minHeight: '1px' }}
      data-axui-tooltip={col.key === '__line_number__' ? 'SELECT ALL' : 'false'}
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
      {optionsHeader.enableFilter && col.key && (col.colIndex || 0) > -1 ? (
        <span data-filter="true" data-filter-index={col.colIndex} />
      ) : null}
    </td>
  );
};

export default connectStore(DatagridHeaderCell);
