import { IDataGridColumn, IDataGridOptions, IDataGridColumnTableMap } from '../common/@types';
/**
 *
 * @param {DataGridColumn[]} headerColumns
 * @param {DataGridOptions} options
 * @return {DataGridColumnTableMap}
 */
declare function makeHeaderTable(headerColumns: IDataGridColumn[], options: IDataGridOptions): IDataGridColumnTableMap;
export default makeHeaderTable;
