import * as React from 'react';
import { IDataGrid } from '../common/@types';

class CellLabel extends React.PureComponent<{
  lineHeight: number;
  rowSelectorSize: number;
  col: IDataGrid.ICol;
  optionsHeader: IDataGrid.IOptionHeader;
  listSelectedAll: boolean;
}> {
  render() {
    const {
      col: { key = '', label = '' },
      rowSelectorSize,
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
                width: rowSelectorSize + 'px',
                height: rowSelectorSize + 'px',
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
  seq: number;
  orderBy: string;
}> {
  render() {
    const { show, colIndex, seq, orderBy } = this.props;
    return show ? (
      <span data-sorter={colIndex} data-sorter-order={orderBy}>
        {seq}
      </span>
    ) : null;
  }
}

// const CellFilter: React.SFC<{
//   show: boolean;
//   colIndex: number;
//   isFiltered: boolean;
// }> = ({ show, colIndex, isFiltered }) =>
//   show ? <span data-filter={isFiltered} data-filter-index={colIndex} /> : null;

interface IProps {
  listSelectedAll: boolean;
  options: IDataGrid.IOptions;
  focusedCol: number;
  selectionCols: Record<any, any>;
  sortInfo: {
    [key: string]: IDataGrid.ISortInfo;
  };
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
        rowSelectorSize = 0,
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
        columnAttr = '',
      } = {},
      onClick,
    } = this.props;
    const optionsHeader = options.header || {};
    const lineHeight =
      optionsHeaderColumnHeight -
      optionsHeaderColumnPadding * 2 -
      optionsHeaderColumnBorderWidth;

    const classNames: string[] = ['axui-datagrid-header-column'];

    if (columnAttr === 'lineNumber') {
      classNames.push('axui-datagrid-header-corner');
    }
    if (
      focusedCol > -1 &&
      colIndex === focusedCol &&
      bodyRow.rows.length - 1 === ri + colRowSpan - 1
    ) {
      classNames.push('focused');
    }
    if (
      selectionCols &&
      selectionCols[colIndex] &&
      bodyRow.rows.length - 1 === ri + colRowSpan - 1
    ) {
      classNames.push('selected');
    }

    // console.log('sortInfo', sortInfo);

    return (
      <td
        colSpan={colCowSpan}
        rowSpan={colRowSpan}
        className={classNames.join(' ')}
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
          data-span={columnAttr}
          data-align={colAlign || headerAlign}
          style={{
            height:
              optionsHeaderColumnHeight - optionsHeaderColumnBorderWidth + 'px',
            lineHeight: lineHeight + 'px',
          }}
        >
          {sortInfo[colKey] && (
            <CellSorter
              show={!!(colKey && sortInfo[colKey])}
              colIndex={colIndex}
              seq={sortInfo[colKey].seq || 0}
              orderBy={sortInfo[colKey] ? sortInfo[colKey].orderBy : ''}
            />
          )}
          <CellLabel
            col={col}
            lineHeight={lineHeight}
            rowSelectorSize={rowSelectorSize}
            optionsHeader={optionsHeader}
            listSelectedAll={listSelectedAll}
          />
        </span>
      </td>
    );
  }
}

export default DatagridHeaderCell;
