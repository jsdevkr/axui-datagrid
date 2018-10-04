import { types } from '../stores';
declare function calculateDimensions(containerDOM: HTMLDivElement | undefined, state: types.DataGridState, toBeFilteredList?: any[]): {
    styles: types.DataGridStyles;
    colGroup: types.DataGridCol[];
    leftHeaderColGroup: types.DataGridCol[];
    headerColGroup: types.DataGridCol[];
};
export default calculateDimensions;
