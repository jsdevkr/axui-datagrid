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
        autofit: boolean;
        doneAutofit: boolean;
        autofitColGroup: never[];
    };
    constructor(props: IProps);
    getOptions: (options: IDataGrid.IOptions) => IDataGrid.IOptions;
    getProviderProps: (storeProps: IDataGrid.IStoreProps) => IDataGrid.IStoreProps;
    applyAutofit: (colGroup: IDataGrid.IAutofitCol[]) => void;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IProps): void;
}
export default DataGrid;
