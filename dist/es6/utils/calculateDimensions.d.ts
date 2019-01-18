import { IDataGrid } from '../common/@types';
declare function calculateDimensions(containerDOM: HTMLDivElement | undefined | null, state: IDataGrid.IStoreState, toBeFilteredList?: any[]): {
    scrollLeft: number;
    scrollTop: number;
    styles: IDataGrid.IStyles;
    colGroup: IDataGrid.ICol[];
    leftHeaderColGroup: IDataGrid.ICol[];
    headerColGroup: IDataGrid.ICol[];
};
export default calculateDimensions;
