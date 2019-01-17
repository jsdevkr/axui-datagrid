import * as React from 'react';
import { IDataGrid, IDataGridRootState, IDataGridOptionHeader, IDataGridOptionBody, IDataGridOptionPageButton, IDataGridOptionPage, IDataGridOptionScroller, IDataGridOptions, IDataGridStyles, IDataGridState, IDataGridColumnKeys } from './common/@types';
interface IProps extends IDataGrid {
}
interface IState extends IDataGridRootState {
}
declare class DataGrid extends React.Component<IProps, IState> {
    static defaultHeight: number;
    static defaultColumnKeys: IDataGridColumnKeys;
    static defaultHeader: IDataGridOptionHeader;
    static defaultBody: IDataGridOptionBody;
    static defaultPageButtons: IDataGridOptionPageButton[];
    static defaultPage: IDataGridOptionPage;
    static defaultScroller: IDataGridOptionScroller;
    static defaultOptions: IDataGridOptions;
    static defaultStyles: IDataGridStyles;
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
    setRootState: (state: IDataGridRootState) => void;
    getRootState: () => {
        mounted: boolean;
        calculatedHeight: undefined;
    };
    setScrollLeft: (scrollLeft: number) => void;
    setScrollTop: (scrollTop: number) => void;
    getOptions: (options: IDataGridOptions) => IDataGridOptions;
    getProviderProps: (prevState: IDataGridState) => IDataGridState;
    render(): JSX.Element;
    componentDidMount(): void;
}
export default DataGrid;
