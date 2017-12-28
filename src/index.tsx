import * as React from 'react';
import { connect, Provider } from 'react-redux';
import { store } from './store';
import { GridRoot } from './GridRoot';
import * as ACT from './_inc/actions';

interface iProps {
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
      store_sortInfo: state.get('sortInfo'),
      store_filterInfo: state.get('filterInfo')
    };
  },
  (dispatch: Function) => ({
    init: (props, options) => dispatch(ACT.INIT(props, options)),
    setData: (data, options) => dispatch(ACT.SET_DATA(data, options)),
    sort: (colGroup, options, colIndex: number) => dispatch(ACT.SORT(colGroup, options, colIndex)),
    filter: (colGroup, options, colIndex: number, filterInfo) => dispatch(ACT.FILTER(colGroup, options, colIndex, filterInfo)),
    update: (colGroup, options, row: number, col: number, value: string) => dispatch(ACT.UPDATE(colGroup, options, row, col, value))
  })
)(GridRoot);

export class AXDatagrid extends React.Component<iProps, {}> {

  public static setFormatter(_formatter: any): any {
    return GridRoot.setFormatter(_formatter);
  }

  public static getFormatter(): any {
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
