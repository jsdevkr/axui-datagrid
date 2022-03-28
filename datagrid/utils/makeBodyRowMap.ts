import { IDataGrid } from '../common/@types';

/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {DataGridOptions} options
 * @return {{[p: string]: any}}
 */
function makeBodyRowMap(
  rowTable: IDataGrid.IColumnTableMap,
  options: IDataGrid.IOptions,
): { [key: string]: any } {
  const map: Record<string, any> = {};

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
