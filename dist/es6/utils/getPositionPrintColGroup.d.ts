import { IDataGrid } from '../common/@types';
declare function getPositionPrintColGroup(_headerColGroup: IDataGrid.ICol[], sx: number, ex: number): {
    printStartColIndex: number;
    printEndColIndex: number;
};
export default getPositionPrintColGroup;
