import * as React from 'react';
import { types } from '../stores';
import { IDataGridStore } from '../providers';
interface IProps extends IDataGridStore {
    bodyRow: types.DataGridColumnTableMap;
    ri: number;
    col: types.DataGridCol;
    onClick: (e: any, col: types.DataGridCol) => void;
}
declare const _default: React.ComponentClass<Pick<IProps, "col" | "bodyRow" | "ri" | "onClick">, any>;
export default _default;
