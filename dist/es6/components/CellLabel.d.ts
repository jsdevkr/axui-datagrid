import * as React from 'react';
import { IDataGrid } from '../common/@types';
declare class CellLabel extends React.PureComponent<{
    columnHeight: number;
    lineHeight: number;
    columnBorderWidth: number;
    colAlign: string;
    col: IDataGrid.ICol;
    li: number;
    item: any;
    selected?: boolean;
    predefinedFormatter: IDataGrid.IFormatter;
}> {
    render(): JSX.Element;
}
export default CellLabel;
