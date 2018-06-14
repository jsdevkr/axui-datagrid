import { types } from '../stores';

/**
 *
 * @param {DataGridColumn[]} headerColumns
 * @param {DataGridOptions} options
 * @return {DataGridColumnTableMap}
 */
export function makeHeaderTable(
  headerColumns: types.DataGridColumn[],
  options: types.DataGridOptions,
): types.DataGridColumnTableMap {
  const columns: types.DataGridColumn[] = [...headerColumns];
  let table: types.DataGridColumnTableMap = {
    rows: [],
  };
  let colIndex = 0;

  function makeRows(
    rowsColumns: types.DataGridColumn[],
    depth: number,
    parentField?: any,
  ): number {
    let row: types.DataGridColumnTableMapRow = { cols: [] };
    let i: number = 0;
    let l: number = rowsColumns.length;
    let colSpan: number = 1;

    for (; i < l; i++) {
      let field = rowsColumns[i];
      colSpan = 1;

      if (!field.hidden) {
        field.colSpan = 1;
        field.rowSpan = 1;

        field.rowIndex = depth;
        field.colIndex = (function() {
          if (!parentField) {
            return colIndex++;
          } else {
            colIndex = parentField.colIndex + i + 1;
            return parentField.colIndex + i;
          }
        })();

        if ('columns' in field && field.columns) {
          colSpan = makeRows(field.columns, depth + 1, field);
        } else {
          field.width = 'width' in field ? field.width : options.columnMinWidth;
        }
        field.colSpan = colSpan;

        row.cols.push(field);
      }
    }

    if (row.cols && row.cols.length > 0) {
      if (!table.rows[depth]) {
        table.rows[depth] = { cols: [] };
      }
      table.rows[depth].cols = [...table.rows[depth].cols, ...row.cols];
      return row.cols.length - 1 + colSpan;
    } else {
      return colSpan;
    }
  }

  makeRows(columns, 0);

  // set rowspan
  table.rows.forEach((row, ri) => {
    if (row.cols) {
      row.cols.forEach(col => {
        if (!('columns' in col)) {
          col.rowSpan = table.rows.length - ri;
        }
      });
    }
  });

  return table;
}

/**
 *
 * @param {DataGridColumn[]} bodyColumns
 * @param {DataGridOptions} options
 * @return {DataGridColumnTableMap}
 */
export function makeBodyRowTable(
  bodyColumns: types.DataGridColumn[],
  options: types.DataGridOptions,
): types.DataGridColumnTableMap {
  const columns: types.DataGridColumn[] = [...bodyColumns];
  let table: types.DataGridColumnTableMap = {
    rows: [],
  };
  let colIndex = 0;

  const makeRows = function(
    rowsColumns: types.DataGridColumn[],
    depth: number,
    parentField?: any,
  ): number {
    let row: types.DataGridColumnTableMapRow = { cols: [] };
    let i = 0;
    let l = rowsColumns.length;
    let colSpan = 1;

    const selfMakeRow = function(
      selfRowsColumns: types.DataGridColumn[],
      selfRowsDepth: number,
    ): void {
      let si = 0;
      let sl = selfRowsColumns.length;

      for (; si < sl; si++) {
        let field = selfRowsColumns[si];
        let selfColSpan = 1;

        if (!field.hidden) {
          if ('key' in field) {
            field.colSpan = 1;
            field.rowSpan = 1;
            field.depth = selfRowsDepth;

            field.rowIndex = selfRowsDepth;
            field.colIndex = (function() {
              if (!parentField) {
                return colIndex++;
              } else {
                colIndex = parentField.colIndex + si + 1;
                return parentField.colIndex + si;
              }
            })();

            row.cols.push(field);

            if ('columns' in field && field.columns) {
              selfColSpan = makeRows(field.columns, selfRowsDepth + 1, field);
            }
            field.colSpan = selfColSpan;
          } else {
            if ('columns' in field && field.columns) {
              selfMakeRow(field.columns, selfRowsDepth);
            }
          }
        }
      }
    };

    for (; i < l; i++) {
      let field = rowsColumns[i];
      colSpan = 1;

      if (!field.hidden) {
        if ('key' in field) {
          field.colSpan = 1;
          field.rowSpan = 1;
          field.depth = depth;

          field.rowIndex = depth;
          field.colIndex = (function() {
            if (!parentField) {
              return colIndex++;
            } else {
              colIndex = parentField.colIndex + i + 1;
              return parentField.colIndex + i;
            }
          })();

          row.cols.push(field);

          if ('columns' in field && field.columns) {
            colSpan = makeRows(field.columns, depth + 1, field);
          }
          field.colSpan = colSpan;
        } else {
          if ('columns' in field && field.columns) {
            selfMakeRow(field.columns, depth);
          }
        }
      }
    }

    if (row.cols && row.cols.length > 0) {
      if (!table.rows[depth]) {
        table.rows[depth] = { cols: [] };
      }
      table.rows[depth].cols = [...table.rows[depth].cols, ...row.cols];
      return row.cols.length - 1 + colSpan;
    } else {
      return colSpan;
    }
  };

  makeRows(columns, 0);

  // set rowspan
  table.rows.forEach((row, ri) => {
    if (row.cols) {
      row.cols.forEach(col => {
        if (!('columns' in col)) {
          col.rowSpan = table.rows.length - ri;
        }
      });
    }
  });

  return table;
}

/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {DataGridOptions} options
 * @return {{[p: string]: any}}
 */
export function makeBodyRowMap(
  rowTable: types.DataGridColumnTableMap,
  options: types.DataGridOptions,
): { [key: string]: any } {
  let map = {};

  rowTable.rows.forEach(row => {
    if (row.cols) {
      row.cols.forEach(col => {
        map[col.rowIndex + '_' + col.colIndex] = { ...col };
      });
    }
  });
  return map;
}

/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {number} frozenColumnIndex
 * @param {DataGridOptions} options
 * @return {DataGridColumnDivideTable}
 */
export function divideTableByFrozenColumnIndex(
  rowTable: types.DataGridColumnTableMap,
  frozenColumnIndex: number,
  options: types.DataGridOptions,
): types.DataGridColumnDivideTable {
  let asideTable: types.DataGridColumnTableMap = { rows: [] };
  let asideColGroup: any[] = [];
  let asidePanelWidth = 0;
  let tempTableLeft: types.DataGridColumnTableMap = { rows: [] };
  let tempTableRight: types.DataGridColumnTableMap = { rows: [] };

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
            width: options.lineNumberColumnWidth,
            _width: options.lineNumberColumnWidth,
            align: 'center',
            columnAttr: 'lineNumber',
            key: '__line_number__',
            label: '',
          },
        };

        asideColGroup.push(_col);
        asideTable.rows[i].cols.push(_col);

        asidePanelWidth += options.lineNumberColumnWidth || 0;
      }
      if (options.showRowSelector) {
        _col = {
          ...col,
          ...{
            width: options.rowSelectorColumnWidth,
            _width: options.rowSelectorColumnWidth,
            align: 'center',
            columnAttr: 'rowSelector',
            key: '__row_selector__',
            label: '',
          },
        };
        asideColGroup.push(_col);
        asideTable.rows[i].cols.push(_col);

        asidePanelWidth += options.rowSelectorColumnWidth || 0;
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
    asidePanelWidth: asidePanelWidth,
    leftData: tempTableLeft,
    rightData: tempTableRight,
  };
}

/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {number} startColumnIndex
 * @param {number} endColumnIndex
 * @return {DataGridColumnTableMap}
 */
export function getTableByStartEndColumnIndex(
  rowTable: types.DataGridColumnTableMap,
  startColumnIndex: number,
  endColumnIndex: number,
): types.DataGridColumnTableMap {
  let tempTable: types.DataGridColumnTableMap = { rows: [] };

  if ('rows' in rowTable) {
    rowTable.rows.forEach((row, r) => {
      tempTable.rows[r] = { cols: [] };
      for (let c = 0, cl = row.cols.length; c < cl; c++) {
        let col = { ...row.cols[c] };
        let colStartIndex: number = col.colIndex || 0;
        let colEndIndex: number = (col.colIndex || 0) + (col.colSpan || 0);

        if (
          startColumnIndex <= colStartIndex ||
          colEndIndex <= endColumnIndex
        ) {
          if (
            startColumnIndex <= colStartIndex &&
            colEndIndex <= endColumnIndex
          ) {
            // 변형없이 추가
            tempTable.rows[r].cols.push(col);
          } else if (
            startColumnIndex > colStartIndex &&
            colEndIndex > startColumnIndex
          ) {
            // 앞에서 걸친경우
            col.colSpan = colEndIndex - startColumnIndex;
            tempTable.rows[r].cols.push(col);
          } else if (
            colEndIndex > endColumnIndex &&
            colStartIndex <= endColumnIndex
          ) {
            tempTable.rows[r].cols.push(col);
          }
        }
      }
    });
  }
  return tempTable;
}
