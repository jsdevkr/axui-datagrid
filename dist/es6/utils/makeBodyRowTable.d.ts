import { IDataGrid } from '../common/@types';
/**
 *
 * @param {DataGridColumn[]} bodyColumns
 * @param {DataGridOptions} options
 * @return {DataGridColumnTableMap}
 */
declare function makeBodyRowTable(bodyColumns: IDataGrid.IColumn[], options: IDataGrid.IOptions): IDataGrid.IColumnTableMap;
export default makeBodyRowTable;
