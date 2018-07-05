import { types } from '../stores';

/**
 *
 * @param {DataGridColumn[]} bodyColumns
 * @param {DataGridOptions} options
 * @return {DataGridColumnTableMap}
 */
function makeBodyRowTable(
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

export default makeBodyRowTable;
