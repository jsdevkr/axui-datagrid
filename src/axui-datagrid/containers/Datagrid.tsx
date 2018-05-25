import * as React from 'react';
import { dataStore } from '../index';

interface IProps {}
interface IState {}

class Datagrid extends React.Component<
  IProps & dataStore.AXUIDatagrid,
  IState
> {



  public render() {
    // const { data: receiveData, options, columns, style, height } = this.props;

    return <div>DATAGRID</div>;
  }
}

export default Datagrid;
