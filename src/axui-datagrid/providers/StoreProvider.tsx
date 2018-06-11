import * as React from 'react';
import { typeStore } from '../stores';

export interface IDataGrid {
  style?: any;
  height?: number;
  autoHeight?: boolean;
  columns?: typeStore.DataGridColumns[];
  data?: any[];
  options?: typeStore.DataGridOption;
  onBeforeEvent?: () => void;
  onAfterEvent?: () => void;
}

export interface IDataGridState {
  data: any[];
}

export interface IDataGridStore extends IDataGridState {
  dispatch: (store: IDataGridState) => void;
}

const store: IDataGridStore = {
  data: [],
  dispatch: () => {},
};

const { Provider, Consumer } = React.createContext(store);

class StoreProvider extends React.Component<{}, IDataGridState> {
  state = {
    data: [],
  };

  static getDerivedStateFromProps(
    nextProps: IDataGrid,
    prevState: IDataGridState,
  ) {
    return {
      data: [],
    };
  }

  render() {
    return (
      <Provider
        value={{
          data: this.state.data,
          dispatch: state => this.setState(state),
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default { Provider: StoreProvider, Consumer };
