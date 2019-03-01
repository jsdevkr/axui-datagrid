import { IDataGrid } from '../common/@types';
export interface ICalculateDimensionsParam {
    headerTable?: IDataGrid.IColumnTableMap;
    colGroup?: IDataGrid.ICol[];
    headerColGroup?: IDataGrid.ICol[];
    bodyRowTable?: IDataGrid.IColumnTableMap;
    footSumColumns?: IDataGrid.IColumn[][];
    data?: any[];
    options?: IDataGrid.IOptions;
}
export default function calculateDimensions(storeState: IDataGrid.IStoreState, { headerTable, colGroup, headerColGroup, bodyRowTable, footSumColumns, data, options, }: ICalculateDimensionsParam): {
    scrollLeft: number;
    scrollTop: number;
    styles: IDataGrid.IStyles;
};
