import { IDataGrid } from 'axui-datagrid/common/@types';
export interface IGetFilteredListParam {
    colGroup: IDataGrid.ICol[];
    filter?: {
        colIndex: number;
        info: {};
    };
    sorter?: {};
    options?: IDataGrid.IOptions;
}
export default function getFilteredList(data: any[], { colGroup, filter, sorter, options }: IGetFilteredListParam): any[];
