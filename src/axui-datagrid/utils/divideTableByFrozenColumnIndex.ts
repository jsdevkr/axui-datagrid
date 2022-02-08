import { IDataGrid } from '../common/@types';

/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {number} frozenColumnIndex
 * @param {DataGridOptions} options
 * @return {DataGridColumnDivideTable}
 */
function divideTableByFrozenColumnIndex(
  rowTable: IDataGrid.IColumnTableMap,
  frozenColumnIndex: number,
  options: IDataGrid.IOptions,
  params: {
    lineNumberWidth?: number;
    rowSelectorWidth?: number;
  },
): IDataGrid.ColumnDivideTable {
  let asideTable: IDataGrid.IColumnTableMap = { rows: [] };
  let asideColGroup: any[] = [];
  let tempTableLeft: IDataGrid.IColumnTableMap = { rows: [] };
  let tempTableRight: IDataGrid.IColumnTableMap = { rows: [] };

  // make asideTable
  for (let i = 0, l = rowTable.rows.length; i < l; i++) {
    asideTable.rows[i] = { cols: [] };

    if (i === 0) {
      let col = {
          label: '',
          colSpan: 1,
          rowSpan: rowTable.rows.length,
          rowIndex: 0,
          colIndex: -1,
        },
        _col = {};

      if (options.showLineNumber) {
        _col = {
          ...col,
          ...{
            width: params.lineNumberWidth,
            _width: params.lineNumberWidth,
            align: 'center',
            columnAttr: 'lineNumber',
            key: '_line_number_',
            label: '',
          },
        };

        asideColGroup.push(_col);
        asideTable.rows[i].cols.push(_col);
      }

      if (options.showRowSelector) {
        _col = {
          ...col,
          ...{
            width: params.rowSelectorWidth,
            _width: params.rowSelectorWidth,
            align: 'center',
            columnAttr: 'rowSelector',
            key: '_row_selector_',
            label: '',
          },
        };
        asideColGroup.push(_col);
        asideTable.rows[i].cols.push(_col);
      }
    }
  }

  for (let r = 0, rl = rowTable.rows.length; r < rl; r++) {
    let row = rowTable.rows[r];

    tempTableLeft.rows[r] = { cols: [] };
    tempTableRight.rows[r] = { cols: [] };

    for (let c = 0, cl = row.cols.length; c < cl; c++) {
      let col = row.cols[c],
        colStartIndex = col.colIndex || 0,
        colEndIndex = colStartIndex + (col.colSpan || 0);

      if (colStartIndex < frozenColumnIndex) {
        if (colEndIndex <= frozenColumnIndex) {
          // 좌측편에 변형없이 추가
          tempTableLeft.rows[r].cols.push(col);
        } else {
          let leftCol = { ...col };
          let rightCol = { ...leftCol };

          leftCol.colSpan = frozenColumnIndex - (leftCol.colIndex || 0);
          rightCol.colSpan = (col.colSpan || 0) - leftCol.colSpan;

          tempTableLeft.rows[r].cols.push(leftCol);
          if (rightCol.colSpan) {
            tempTableRight.rows[r].cols.push(rightCol);
          }
        }
      } else {
        // 오른편
        tempTableRight.rows[r].cols.push({ ...col });
      }
    }
  }

  // frozenPanelWidth는 컬럼의 너비 _width가 결정된 후에 구해야 함으로 여기서 처리 하지 않는다
  // _width는 컬럼의 너비가 '*' 또는 '%'일 때에 컨테이너의 너비에 따라 상대적으로 결정된다.
  return {
    asideData: asideTable,
    asideColGroup: asideColGroup,
    leftData: tempTableLeft,
    rightData: tempTableRight,
  };
}

export default divideTableByFrozenColumnIndex;
