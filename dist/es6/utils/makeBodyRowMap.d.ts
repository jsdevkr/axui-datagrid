import { types } from '../stores';
/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {DataGridOptions} options
 * @return {{[p: string]: any}}
 */
declare function makeBodyRowMap(rowTable: types.DataGridColumnTableMap, options: types.DataGridOptions): {
    [key: string]: any;
};
export default makeBodyRowMap;
