import { IDataGrid } from '../common/@types';
/**
 *
 * @param {DataGridColumn[]} headerColumns
 * @param {DataGridOptions} options
 * @return {DataGridColumnTableMap}
 */
declare function makeHeaderTable(headerColumns: IDataGrid.IColumn[], options: IDataGrid.IOptions): IDataGrid.IColumnTableMap;
export default makeHeaderTable;
