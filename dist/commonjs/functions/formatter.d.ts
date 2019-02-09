/// <reference types="react" />
import { IDataGrid } from '../common/@types';
declare function money(formatterData: IDataGrid.IFormatterData): string;
declare function date(formatterData: IDataGrid.IFormatterData): string | Date;
declare function datetime(formatterData: IDataGrid.IFormatterData): string | Date;
declare function html(formatterData: IDataGrid.IFormatterData): "" | JSX.Element;
declare const _default: {
    money: typeof money;
    date: typeof date;
    datetime: typeof datetime;
    html: typeof html;
};
export default _default;
