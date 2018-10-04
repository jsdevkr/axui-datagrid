import { types } from '../stores';
declare function getPositionPrintColGroup(_headerColGroup: types.DataGridCol[], sx: number, ex: number): {
    printStartColIndex: number;
    printEndColIndex: number;
};
export default getPositionPrintColGroup;
