import { IDataGrid } from '../common/@types';
/**
 * 그리드 colGroup의 width 값을 처리 하는 함수. 왜? '*', '%'로 된 값은 상대적인 값이기 때문에. 컨테이너의 너비에 따라 재계산이 필요합니다.
 * @param {DataGridCol[]} colGroup
 * @param {DataGridRect} container
 * @param {DataGridOptions} options
 * @return {DataGridCol[]}
 */
declare function setColGroupWidth(colGroup: IDataGrid.ICol[], container: IDataGrid.IRect, options: IDataGrid.IOptions): IDataGrid.ICol[];
export default setColGroupWidth;
