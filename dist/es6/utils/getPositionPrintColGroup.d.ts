import { IDataGridCol } from '../common/@types';
declare function getPositionPrintColGroup(_headerColGroup: IDataGridCol[], sx: number, ex: number): {
    printStartColIndex: number;
    printEndColIndex: number;
};
export default getPositionPrintColGroup;
