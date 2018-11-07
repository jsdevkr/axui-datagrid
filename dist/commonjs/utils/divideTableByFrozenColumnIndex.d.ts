import { IDataGridColumnTableMap, DataGridColumnDivideTable, IDataGridOptions } from '../common/@types';
/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {number} frozenColumnIndex
 * @param {DataGridOptions} options
 * @return {DataGridColumnDivideTable}
 */
declare function divideTableByFrozenColumnIndex(rowTable: IDataGridColumnTableMap, frozenColumnIndex: number, options: IDataGridOptions): DataGridColumnDivideTable;
export default divideTableByFrozenColumnIndex;
