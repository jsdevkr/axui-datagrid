import { IDataGrid } from '../common/@types';
declare function money(formatterData: IDataGrid.IFormatterData): string;
declare function date(formatterData: IDataGrid.IFormatterData): string | Date;
declare function datetime(formatterData: IDataGrid.IFormatterData): string | Date;
declare const _default: {
    money: typeof money;
    date: typeof date;
    datetime: typeof datetime;
};
export default _default;
