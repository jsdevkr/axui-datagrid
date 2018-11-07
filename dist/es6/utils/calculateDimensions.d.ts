import { IDataGridState, IDataGridStyles, IDataGridCol } from '../common/@types';
declare function calculateDimensions(containerDOM: HTMLDivElement | undefined | null, state: IDataGridState, toBeFilteredList?: any[]): {
    styles: IDataGridStyles;
    colGroup: IDataGridCol[];
    leftHeaderColGroup: IDataGridCol[];
    headerColGroup: IDataGridCol[];
};
export default calculateDimensions;
