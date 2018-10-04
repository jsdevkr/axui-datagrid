import { types } from '../stores';
/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {number} frozenColumnIndex
 * @param {DataGridOptions} options
 * @return {DataGridColumnDivideTable}
 */
declare function divideTableByFrozenColumnIndex(rowTable: types.DataGridColumnTableMap, frozenColumnIndex: number, options: types.DataGridOptions): types.DataGridColumnDivideTable;
export default divideTableByFrozenColumnIndex;
