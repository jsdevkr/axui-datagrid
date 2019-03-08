import * as React from 'react';
import { IDataGridStore } from '../providers';
import { IDataGrid } from '../common/@types';
interface IProps extends IDataGridStore {
    col: IDataGrid.ICol;
    li: number;
}
declare const _default: React.ComponentClass<Pick<IProps, "col" | "li">, any>;
export default _default;
