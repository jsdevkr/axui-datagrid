import * as React from 'react';
import {connect, Provider} from 'react-redux';
import {store} from './store';
import * as act from './actions';
import {GridRoot} from './component/GridRoot';

interface iProps {
  gridCSS: object;
  height: string;
  style: object;
  columns: any;
  data: any;
  options: object;
  thisCallback: object;
}

export const GridRootConnected = connect(
  (state: any) => {
    return {
      store_receivedList: state.get('receivedList'),
      store_deletedList: state.get('deletedList'),
      store_list: state.get('list'),
      store_page: state.get('page'),
      store_sortInfo: state.get('sortInfo')
    };
  },
  (dispatch: any) => ({
    init: (props, options) => dispatch(act.init(props, options)),
    setData: (data, options) => dispatch(act.setData(data, options))
  })
)(GridRoot);

class AXDatagrid extends React.Component<iProps, {}> {
  render() {
    return (
      <Provider store={store}>
        <GridRootConnected {...this.props} />
      </Provider>
    );
  }
}

export {
  AXDatagrid
};
