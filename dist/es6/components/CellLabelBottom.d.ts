import * as React from 'react';
import { IDataGrid } from '../common/@types';
declare class CellLabelBottom extends React.PureComponent<{
    columnHeight: number;
    lineHeight: number;
    columnBorderWidth: number;
    colAlign: string;
    col: IDataGrid.ICol;
    data: any[];
    predefinedFormatter: IDataGrid.IFormatter;
    predefinedCollector: IDataGrid.ICollector;
}> {
    render(): JSX.Element;
}
export default CellLabelBottom;
