import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import gridReducers from './reducers';
import GridContainer from './container/GridContainer';

//~~~~~
const store = createStore(gridReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//~~~~~
class AX6UIReactGrid extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <GridContainer {...this.props}/>
      </Provider>
    );
  }
}

export default AX6UIReactGrid