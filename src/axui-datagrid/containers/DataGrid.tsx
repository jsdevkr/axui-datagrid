import * as React from 'react';
import { DataGridStore, IDataGrid } from '../providers';
import { DataGridHeader } from '../components';

interface IProps extends IDataGrid {}
interface IState {
  receiveData: any[];
}

class DataGrid extends React.Component<IProps, IState> {
  state = {
    receiveData: [],
  };

  static getDerivedStateFromProps(props: IProps, state: IState) {
    if (props.data !== state.receiveData) {
      return {
        receiveData: props.data,
      };
    }

    return null;
  }

  public render() {
    // const { data: receiveData, options, columns, style, height } = this.props;

    return (
      <DataGridStore.Provider>
        <DataGridHeader />
        <div>DATAGRID</div>
      </DataGridStore.Provider>
    );
  }
}

export default DataGrid;
