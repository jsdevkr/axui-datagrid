import * as React from 'react';
import { IDataGrid } from '../common/@types';
declare const CellLabel: React.SFC<{
    lineHeight: number;
    col: IDataGrid.ICol;
    list: any[];
    li: number;
    predefinedFormatter: IDataGrid.IFormatter;
}>;
export default CellLabel;
