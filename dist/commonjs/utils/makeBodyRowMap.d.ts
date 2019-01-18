import { IDataGrid } from '../common/@types';
/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {DataGridOptions} options
 * @return {{[p: string]: any}}
 */
declare function makeBodyRowMap(rowTable: IDataGrid.IColumnTableMap, options: IDataGrid.IOptions): {
    [key: string]: any;
};
export default makeBodyRowMap;
