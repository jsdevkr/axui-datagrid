import { IDataGridColumnTableMap, IDataGridOptions } from '../common/@types';
/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {DataGridOptions} options
 * @return {{[p: string]: any}}
 */
declare function makeBodyRowMap(rowTable: IDataGridColumnTableMap, options: IDataGridOptions): {
    [key: string]: any;
};
export default makeBodyRowMap;
