import * as React from 'react';
import { types } from '../stores';
import { IDataGridStore } from '../providers';
interface IProps extends IDataGridStore {
    ci: number;
    col?: types.DataGridCol;
    value?: any;
}
declare const _default: React.ComponentClass<Pick<IProps, "col" | "value" | "ci">, any>;
export default _default;
