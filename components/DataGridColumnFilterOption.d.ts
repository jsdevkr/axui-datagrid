import * as React from 'react';
import { IDataGridStore } from '../providers';
interface IProps extends IDataGridStore {
    filterOptions: any[];
    optionItemHeight: number;
    onChange: (value: any, checked: any, checkAll: any) => void;
}
declare const _default: React.ComponentClass<Pick<IProps, "filterOptions" | "optionItemHeight" | "onChange">, any>;
export default _default;
