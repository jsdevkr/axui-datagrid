import * as React from 'react';
import {connect, Provider} from 'react-redux';
import {store} from './store';
import * as act from './actions';
import {GridRoot} from './GridRoot';

interface iProps {
  gridCSS: any;
  height: string;
  style: any;
  columns: any;
  data: any;
  options: any;
  thisCallback: Function;
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
    setData: (data, options) => dispatch(act.setData(data, options)),
    sort: (colGroup, colIndex, options) => dispatch(act.sort(colGroup, colIndex, options))
  })
)(GridRoot);

export class AXDatagrid extends React.Component<iProps, {}> {

  public static setFormatter(_formatter: any): any{
    return GridRoot.setFormatter(_formatter);
  }

  public static getFormatter(): any{
    return GridRoot.getFormatter();
  }

  public render() {
    return (
      <Provider store={store}>
        <GridRootConnected {...this.props} />
      </Provider>
    );
  }
}
