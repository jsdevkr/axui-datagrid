import * as React from 'react';
import { types } from '../stores';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';

interface IProps extends IDataGridStore {}
interface IState {}

class DataGridBodyLoader extends React.Component<IProps, IState> {
  state = {};

  render() {
    const { loadingData } = this.props;

    if (!loadingData) {
      return null;
    }

    return (
      <div className="axui-datagrid-body-loader">
        <div data-loader-spinner="" />
        <div data-loader-text="">Loading</div>
      </div>
    );
  }
}

export default connectStore(DataGridBodyLoader);
