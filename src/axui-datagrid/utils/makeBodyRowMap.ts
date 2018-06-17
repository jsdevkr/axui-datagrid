import { types } from '../stores';

/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {DataGridOptions} options
 * @return {{[p: string]: any}}
 */
function makeBodyRowMap(
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

export default makeBodyRowMap;
