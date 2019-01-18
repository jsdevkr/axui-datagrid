import { IDataGrid } from '../common/@types';
/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {number} frozenColumnIndex
 * @param {DataGridOptions} options
 * @return {DataGridColumnDivideTable}
 */
declare function divideTableByFrozenColumnIndex(rowTable: IDataGrid.IColumnTableMap, frozenColumnIndex: number, options: IDataGrid.IOptions): IDataGrid.ColumnDivideTable;
export default divideTableByFrozenColumnIndex;
