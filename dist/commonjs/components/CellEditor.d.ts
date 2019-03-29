import * as React from 'react';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from '../common/@enums';
interface IProps {
    col: IDataGrid.ICol;
    li: number;
    item: any;
    value: any;
    columnHeight: number;
    lineHeight: number;
    columnBorderWidth: number;
    colAlign: string;
    setStoreState: IDataGrid.setStoreState;
    dispatch: IDataGrid.dispatch;
    inlineEditingCell: IDataGrid.IEditingCell;
    focusedRow: number;
    focusedCol: number;
}
declare class CellEditor extends React.PureComponent<IProps> {
    inputTextRef: React.RefObject<HTMLInputElement>;
    activeComposition: boolean;
    lastEventName: string;
    constructor(props: IProps);
    onEventInput: (eventName: DataGridEnums.EventNames, e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleUpdateValue: IDataGrid.CellEditorDataUpdate;
    handleCancelEdit: () => void;
    handleCustomEditorFocus: () => void;
    handleCustomEditorBlur: () => void;
    inputTextRender: (value: any, disable?: boolean) => JSX.Element;
    handleCheckboxValue: (value: boolean) => void;
    checkboxRender: (value: any, label?: React.ReactNode, disabled?: boolean) => JSX.Element;
    componentDidMount(): void;
    handleInputTextSelect: (inputCurrent: any) => void;
    render(): {} | null | undefined;
}
export default CellEditor;
