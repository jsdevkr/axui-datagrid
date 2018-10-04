import * as React from 'react';
import { types } from '../stores';
interface IProps extends types.DataGrid {
}
interface IState extends types.DataGridRootState {
}
declare class DataGrid extends React.Component<IProps, IState> {
    static defaultHeight: number;
    static defaultColumnKeys: types.DataGridColumnKeys;
    static defaultHeader: types.DataGridOptionHeader;
    static defaultBody: types.DataGridOptionBody;
    static defaultPageButtons: types.DataGridOptionPageButton[];
    static defaultPage: types.DataGridOptionPage;
    static defaultScroller: types.DataGridOptionScroller;
    static defaultOptions: types.DataGridOptions;
    static defaultStyles: types.DataGridStyles;
    static defaultThrottleWait: number;
    rootObject: any;
    rootNode: any;
    clipBoardNode: any;
    state: {
        mounted: boolean;
        calculatedHeight: undefined;
    };
    setRootNode: (element: any) => void;
    setClipBoardNode: (element: any) => void;
    /**
     * You must execute setRootState only once in the child component.
     * otherwise you will fall into a trap.
     * @param {DataGridRootState} state
     */
    setRootState: (state: types.DataGridRootState) => void;
    getRootState: () => {
        mounted: boolean;
        calculatedHeight: undefined;
    };
    getRootNode: () => any;
    getClipBoardNode: () => any;
    onFireEvent: () => void;
    getOptions: (options: types.DataGridOptions) => types.DataGridOptions;
    getProviderProps: (prevState: types.DataGridState) => types.DataGridState;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default DataGrid;
