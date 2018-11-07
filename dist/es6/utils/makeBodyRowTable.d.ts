import { IDataGridColumn, IDataGridOptions, IDataGridColumnTableMap } from '../common/@types';
/**
 *
 * @param {DataGridColumn[]} bodyColumns
 * @param {DataGridOptions} options
 * @return {DataGridColumnTableMap}
 */
declare function makeBodyRowTable(bodyColumns: IDataGridColumn[], options: IDataGridOptions): IDataGridColumnTableMap;
export default makeBodyRowTable;
