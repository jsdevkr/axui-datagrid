import { IDataGrid } from '../common/@types';
export interface IGetVisibleColGroupParam {
    scrollLeft?: number;
    bodyRowData?: IDataGrid.IColumnTableMap;
    footSumData?: IDataGrid.IColumnTableMap;
    styles?: IDataGrid.IStyles;
    options?: IDataGrid.IOptions;
}
export default function getVisibleColGroup(headerColGroup: IDataGrid.ICol[] | undefined, { scrollLeft, bodyRowData, footSumData, styles, options, }: IGetVisibleColGroupParam): {
    visibleHeaderColGroup: IDataGrid.ICol[];
    visibleBodyRowData: IDataGrid.IColumnTableMap;
    visibleFootSumData: IDataGrid.IColumnTableMap;
    printStartColIndex: number;
    printEndColIndex: number;
};
