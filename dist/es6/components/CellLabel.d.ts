import * as React from 'react';
import { IDataGrid } from '../common/@types';
declare const CellLabel: React.SFC<{
    columnHeight: number;
    lineHeight: number;
    columnBorderWidth: number;
    colAlign: string;
    col: IDataGrid.ICol;
    list: any[];
    li: number;
    predefinedFormatter: IDataGrid.IFormatter;
}>;
export default CellLabel;
