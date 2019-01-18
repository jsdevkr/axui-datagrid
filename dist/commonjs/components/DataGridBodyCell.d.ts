import * as React from 'react';
import { IDataGridStore } from '../providers';
import { IDataGrid } from '../common/@types';
interface IProps extends IDataGridStore {
    li: number;
    ci: number;
    col?: IDataGrid.ICol;
    value?: any;
}
declare const _default: React.ComponentClass<Pick<IProps, "col" | "li" | "value" | "ci">, any>;
export default _default;
