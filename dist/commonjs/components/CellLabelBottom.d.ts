import * as React from 'react';
import { IDataGrid } from '../common/@types';
declare const CellLabelBottom: React.SFC<{
    columnHeight: number;
    lineHeight: number;
    columnBorderWidth: number;
    colAlign: string;
    col: IDataGrid.ICol;
    list: any[];
    predefinedFormatter: IDataGrid.IFormatter;
    predefinedCollector: IDataGrid.ICollector;
}>;
export default CellLabelBottom;
