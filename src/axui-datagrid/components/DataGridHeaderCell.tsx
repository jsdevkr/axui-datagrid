import * as React from 'react';
import { connectStore } from '../hoc';
import { IDataGridStore } from '../providers';
import { classNames as CX } from '../utils';
import { IDataGrid } from '../common/@types';

class CellLabel extends React.PureComponent<{
  lineHeight: number;
  col: IDataGrid.ICol;
  optionsHeader: IDataGrid.IOptionHeader;
  listSelectedAll: boolean;
}> {
  render() {
    const {
      col: { key = '', label = '' },
      lineHeight,
      optionsHeader,
      listSelectedAll,
    } = this.props;
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
  }
}

class CellSorter extends React.PureComponent<{
  show: boolean;
  colIndex: number;
  orderBy: string;
}> {
  render() {
    const { show, colIndex, orderBy } = this.props;
    return show ? (
      <span data-sorter={colIndex} data-sorter-order={orderBy} />
    ) : null;
  }
}

const CellFilter: React.SFC<{
  show: boolean;
  colIndex: number;
  isFiltered: boolean;
}> = ({ show, colIndex, isFiltered }) =>
  show ? <span data-filter={isFiltered} data-filter-index={colIndex} /> : null;

interface IProps {
  listSelectedAll: boolean;
  options: IDataGrid.IOptions;
  focusedCol: number;
  selectionCols: {};
  sortInfo: {};
  bodyRow: IDataGrid.IColumnTableMap;
  ri: number;
  col: IDataGrid.ICol;
  onClick: (e: any, col: IDataGrid.ICol) => void;
}

class DatagridHeaderCell extends React.PureComponent<IProps> {
  render() {
    const {
      listSelectedAll = false,
      options,
      options: {
        header: {
          columnHeight: optionsHeaderColumnHeight = 0,
          columnPadding: optionsHeaderColumnPadding = 0,
          columnBorderWidth: optionsHeaderColumnBorderWidth = 0,
          align: headerAlign = 'left',
        } = {},
      } = {},
      focusedCol = -1,
      selectionCols,
      sortInfo = {},
      bodyRow,
      ri,
      col,
      col: {
        align: colAlign = '',
        colIndex = 0,
        key: colKey = '',
        rowSpan: colRowSpan = 1,
        colSpan: colCowSpan = 1,
      } = {},
      onClick,
    } = this.props;
    const optionsHeader = options.header || {};
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
          data-align={colAlign || headerAlign}
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
  }
}

export default DatagridHeaderCell;
