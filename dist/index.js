import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import gridReducers from './reducers';
import GridContainer from './container/GridContainer';

//~~~~~
const store = createStore(gridReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//~~~~~
class AXDataGrid extends React.Component {
  render() {
    return React.createElement(
      Provider,
      { store: store },
      React.createElement(GridContainer, this.props)
    );
  }
}

export default AXDataGrid;