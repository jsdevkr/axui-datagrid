import * as React from 'react';
import { types } from '../stores';

export interface IDataGridStore extends types.DataGridState {
  dispatch: (store: types.DataGridState) => void;
}

const store: IDataGridStore = {
  data: [],
  dispatch: () => {},
};

const { Provider, Consumer } = React.createContext(store);

class StoreProvider extends React.Component<{}, types.DataGridState> {
  state = {
    data: [],
  };

  static getDerivedStateFromProps(
    props: IDataGridStore,
    state: types.DataGridState,
  ) {
    if (props.data !== state.data) {
      return {
        data: props.data,
      };
    }

    return null;
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
