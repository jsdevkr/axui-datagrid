import * as React from 'react';
import { DataGridStore, IDataGridStore } from '../providers';

// Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type IConnectStore = IDataGridStore;

interface IProps {}

function connectStore<P extends IConnectStore>(
  WrappedComponent: React.ComponentType<P>,
): React.ComponentClass<Omit<P, keyof IConnectStore>> {
  class Component extends React.Component<IProps> {
    render() {
      const Comp = WrappedComponent as any;
      return (
        <DataGridStore.Consumer>
          {store => <Comp {...this.props} {...store} />}
        </DataGridStore.Consumer>
      );
    }
  }
  return Component as any;
}

export default connectStore;
