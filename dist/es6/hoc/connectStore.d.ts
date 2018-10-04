import * as React from 'react';
import { IDataGridStore } from '../providers';
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type IConnectStore = IDataGridStore;
declare function connectStore<P extends IConnectStore>(WrappedComponent: React.ComponentType<P>): React.ComponentClass<Omit<P, keyof IConnectStore>>;
export default connectStore;
