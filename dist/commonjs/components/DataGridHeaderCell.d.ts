import * as React from 'react';
import { IDataGrid } from '../common/@types';
interface IProps {
    listSelectedAll: boolean;
    options: IDataGrid.IOptions;
    focusedCol: number;
    selectionCols: {};
    sortInfo: {};
    bodyRow: IDataGrid.IColumnTableMap;
    ri: number;
    col: IDataGrid.ICol;
    onClick: (e: any, col: IDataGrid.ICol) => void;
}
declare class DatagridHeaderCell extends React.PureComponent<IProps> {
    render(): JSX.Element;
}
export default DatagridHeaderCell;
