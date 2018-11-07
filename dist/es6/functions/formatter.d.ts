import { IDataGridFormatterData } from '../common/@types';
declare function money(formatterData: IDataGridFormatterData): string;
declare function date(formatterData: IDataGridFormatterData): string | Date;
declare function datetime(formatterData: IDataGridFormatterData): string | Date;
declare const _default: {
    money: typeof money;
    date: typeof date;
    datetime: typeof datetime;
};
export default _default;
