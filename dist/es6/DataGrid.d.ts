import * as React from 'react';
import { IDataGrid } from './common/@types';
interface IProps extends IDataGrid.IRootProps {
}
interface IState extends IDataGrid.IRootState {
}
declare class DataGrid extends React.Component<IProps, IState> {
    static defaultHeight: number;
    static defaultColumnKeys: IDataGrid.IColumnKeys;
    static defaultHeader: IDataGrid.IOptionHeader;
    static defaultBody: IDataGrid.IOptionBody;
    static defaultPage: IDataGrid.IOptionPage;
    static defaultScroller: IDataGrid.IOptionScroller;
    static defaultOptions: IDataGrid.IOptions;
    static defaultStyles: IDataGrid.IStyles;
    static defaultThrottleWait: number;
    rootObject: any;
    rootNode: React.RefObject<HTMLDivElement>;
    clipBoardNode: React.RefObject<HTMLTextAreaElement>;
    state: IState;
    constructor(props: IProps);
    getOptions: (options: IDataGrid.IOptions) => IDataGrid.IOptions;
    applyAutofit: (params: IDataGrid.IapplyAutofitParam) => void;
    getColumnData: (columns: IDataGrid.IColumn[], footSum: IDataGrid.IColumn[][], options: IDataGrid.IOptions) => IState;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IProps, prevState: IState): void;
    render(): JSX.Element;
}
export default DataGrid;
