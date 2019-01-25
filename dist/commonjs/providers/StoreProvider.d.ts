import * as React from 'react';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from '../common/@enums';
export interface IDataGridStore extends IDataGrid.IStoreState {
    setStoreState: (store: IDataGrid.IStoreState) => void;
    dispatch: (dispatchType: DataGridEnums.DispatchTypes, param: IDataGrid.DispatchParam) => void;
}
declare class StoreProvider extends React.Component<IDataGrid.IStoreProps, IDataGrid.IStoreState> {
    state: IDataGridStore;
    throttledUpdateDimensions: any;
    static getDerivedStateFromProps(nProps: IDataGrid.IStoreProps, nState: IDataGrid.IStoreState): IDataGrid.IStoreState | null;
    setStoreState: (newState: IDataGrid.IStoreState) => void;
    dispatch: (dispatchType: DataGridEnums.DispatchTypes, param: IDataGrid.DispatchParam) => void;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(pProps: IDataGrid.IStoreProps, pState: IDataGrid.IStoreState): void;
    componentWillUnmount(): void;
}
declare const _default: {
    Provider: typeof StoreProvider;
    Consumer: React.ExoticComponent<React.ConsumerProps<IDataGridStore>>;
};
export default _default;
