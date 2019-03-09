import * as React from 'react';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from '../common/@enums';
interface IProps {
    col: IDataGrid.ICol;
    li: number;
    value: any;
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
    componentDidMount(): void;
    componentDidUpdate(prevProps: IProps): void;
    onEventInput: (eventName: DataGridEnums.EventNames, e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleUpdateValue: (value: any, keepEditing?: boolean | undefined) => void;
    handleCancelEdit: () => void;
    handleCustomEditorFocus: () => void;
    handleCustomEditorBlur: () => void;
    renderInputText: (value: any) => JSX.Element;
    shouldComponentUpdate(nextProps: IProps): boolean;
    render(): {} | null | undefined;
}
export default CellEditor;
