import * as React from 'react';
import { IDataGrid } from '../common/@types';
declare class DataGridBodyCell extends React.PureComponent<{
    li: number;
    ci: number;
    col?: IDataGrid.ICol;
    data?: any[];
    selected?: boolean;
    setStoreState: IDataGrid.setStoreState;
    focusedRow: number;
    focusedCol: number;
    selectionRows: {};
    selectionCols: {};
    options: IDataGrid.IOptions;
    isInlineEditing: boolean;
    inlineEditingCell: IDataGrid.IEditingCell;
    predefinedFormatter?: IDataGrid.IFormatter;
}> {
    onDoubleClickCell: (e: React.KeyboardEvent<HTMLInputElement>, col: IDataGrid.IColumn, li: number) => void;
    render(): JSX.Element;
}
export default DataGridBodyCell;
