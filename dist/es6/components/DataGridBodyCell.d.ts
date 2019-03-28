import * as React from 'react';
import { IDataGrid } from '../common/@types';
declare class DataGridBodyCell extends React.Component<{
    li: number;
    ci: number;
    col?: IDataGrid.ICol;
    data?: any[];
    selected?: boolean;
    setStoreState: IDataGrid.setStoreState;
    dispatch: IDataGrid.dispatch;
    focusedRow: number;
    focusedCol: number;
    selectionRows: {};
    selectionCols: {};
    options: IDataGrid.IOptions;
    isInlineEditing: boolean;
    inlineEditingCell: IDataGrid.IEditingCell;
    predefinedFormatter?: IDataGrid.IFormatter;
}> {
    handleActiveInlineEdit: (e: React.MouseEvent<HTMLTableDataCellElement>, col: IDataGrid.IColumn, li: number) => void;
    render(): JSX.Element;
}
export default DataGridBodyCell;
