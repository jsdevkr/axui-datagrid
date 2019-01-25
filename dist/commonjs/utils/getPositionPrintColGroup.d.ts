import { IDataGrid } from '../common/@types';
declare function getPositionPrintColGroup(_headerColGroup: IDataGrid.ICol[] | undefined, sx: number, ex: number): {
    printStartColIndex: number;
    printEndColIndex: number;
};
export default getPositionPrintColGroup;
