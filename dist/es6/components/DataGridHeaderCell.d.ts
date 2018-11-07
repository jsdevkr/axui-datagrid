import * as React from 'react';
import { IDataGridStore } from '../providers';
import { IDataGridCol, IDataGridColumnTableMap } from '../common/@types';
interface IProps extends IDataGridStore {
    bodyRow: IDataGridColumnTableMap;
    ri: number;
    col: IDataGridCol;
    onClick: (e: any, col: IDataGridCol) => void;
}
declare const _default: React.ComponentClass<Pick<IProps, "col" | "bodyRow" | "ri" | "onClick">, any>;
export default _default;
