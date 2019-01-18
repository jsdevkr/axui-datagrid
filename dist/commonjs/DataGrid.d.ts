import * as React from 'react';
import { IDataGrid } from './common/@types';
interface IProps extends IDataGrid.IProps {
}
interface IState extends IDataGrid.IRootState {
}
declare class DataGrid extends React.Component<IProps, IState> {
    static defaultHeight: number;
    static defaultColumnKeys: IDataGrid.IColumnKeys;
    static defaultHeader: IDataGrid.IOptionHeader;
    static defaultBody: IDataGrid.IOptionBody;
    static defaultPageButtons: IDataGrid.IOptionPageButton[];
    static defaultPage: IDataGrid.IOptionPage;
    static defaultScroller: IDataGrid.IOptionScroller;
    static defaultOptions: IDataGrid.IOptions;
    static defaultStyles: IDataGrid.IStyles;
    static defaultThrottleWait: number;
    rootObject: any;
    rootNode: React.RefObject<HTMLDivElement>;
    clipBoardNode: React.RefObject<HTMLTextAreaElement>;
    scrollLeft: number;
    scrollTop: number;
    state: {
        mounted: boolean;
        calculatedHeight: undefined;
    };
    constructor(props: IProps);
    /**
     * You must execute setRootState only once in the child component.
     * otherwise you will fall into a trap.
     * @param {DataGridRootState} state
     */
    setRootState: (state: IDataGrid.IRootState) => void;
    getRootState: () => {
        mounted: boolean;
        calculatedHeight: undefined;
    };
    setScrollLeft: (scrollLeft: number) => void;
    setScrollTop: (scrollTop: number) => void;
    getOptions: (options: IDataGrid.IOptions) => IDataGrid.IOptions;
    getProviderProps: (prevState: IDataGrid.IStoreState) => IDataGrid.IStoreState;
    render(): JSX.Element;
    componentDidMount(): void;
}
export default DataGrid;
