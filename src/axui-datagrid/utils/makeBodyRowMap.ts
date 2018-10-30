import { IDataGridColumnTableMap, IDataGridOptions } from '../common/@types';

/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {DataGridOptions} options
 * @return {{[p: string]: any}}
 */
function makeBodyRowMap(
  rowTable: IDataGridColumnTableMap,
  options: IDataGridOptions,
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
