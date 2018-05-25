import * as React from 'react';
import { dataStore } from '../index';

export interface IGlobalState {
  data: any[];
}

export interface IGlobalStore extends IGlobalState {
  dispatch: (store: IGlobalState) => void;
}

const store: IGlobalStore = {
  data: [],
  dispatch: () => {},
};

const { Provider, Consumer } = React.createContext(store);

class StoreProvider extends React.Component<{}, IGlobalState> {
  state = {
    data: [],
  };

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
