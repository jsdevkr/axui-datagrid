import { intfs } from '../stores';
declare function money(formatterData: intfs.IDataGridFormatterData): string;
declare function date(formatterData: intfs.IDataGridFormatterData): string | Date;
declare function datetime(formatterData: intfs.IDataGridFormatterData): string | Date;
declare const _default: {
    money: typeof money;
    date: typeof date;
    datetime: typeof datetime;
};
export default _default;
