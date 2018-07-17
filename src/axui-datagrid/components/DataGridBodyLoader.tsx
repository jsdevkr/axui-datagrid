import * as React from 'react';
import { types } from '../stores';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';

interface IProps extends IDataGridStore {}
interface IState {}

class DataGridBodyLoader extends React.Component<IProps, IState> {
  state = {};

  render() {
    const { loadingData, options = {} } = this.props;
    const { bodyLoaderHeight = 0 } = options;

    if (!loadingData) {
      return null;
    }

    const loaderStyle = {
      height: bodyLoaderHeight,
    };

    return (
      <div className="axui-datagrid-body-loader" style={loaderStyle}>
        <div data-loader-spinner="" />
        <div data-loader-text="">Loading</div>
      </div>
    );
  }
}

export default connectStore(DataGridBodyLoader);
