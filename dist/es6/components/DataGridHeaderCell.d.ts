import * as React from 'react';
import { IDataGridStore } from '../providers';
import { IDataGrid } from '../common/@types';
interface IProps extends IDataGridStore {
    bodyRow: IDataGrid.IColumnTableMap;
    ri: number;
    col: IDataGrid.ICol;
    onClick: (e: any, col: IDataGrid.ICol) => void;
}
declare const _default: React.ComponentClass<Pick<IProps, "col" | "bodyRow" | "ri" | "onClick">, any>;
export default _default;
