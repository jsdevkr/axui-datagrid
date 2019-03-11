import * as React from 'react';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from '../common/@enums';
interface IProps {
    col: IDataGrid.ICol;
    li: number;
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
declare class CellEditor extends React.Component<IProps> {
    inputTextRef: React.RefObject<HTMLInputElement>;
    editorTargetRef: React.RefObject<HTMLDivElement>;
    activeComposition: boolean;
    constructor(props: IProps);
    onEventInput: (eventName: DataGridEnums.EventNames, e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleUpdateValue: (value: any, keepEditing?: boolean | undefined) => void;
    handleCancelEdit: () => void;
    handleCustomEditorFocus: () => void;
    handleCustomEditorBlur: () => void;
    inputTextRender: (value: any) => JSX.Element;
    handleCheckboxValue: (value: boolean) => void;
    checkboxRender: (value: any, label?: React.ReactNode) => JSX.Element;
    shouldComponentUpdate(nextProps: IProps): boolean;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): {} | null | undefined;
}
export default CellEditor;
