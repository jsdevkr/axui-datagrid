import { types } from '../stores';

/**
 *
 * @param {DataGridColumn[]} headerColumns
 * @param {DataGridOptions} options
 * @return {DataGridColumnTableMap}
 */
function makeHeaderTable(
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

export default makeHeaderTable;
