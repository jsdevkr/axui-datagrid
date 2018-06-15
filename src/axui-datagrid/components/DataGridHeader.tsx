import * as React from 'react';
import { types } from '../stores';
import { connectStore } from '../hoc';

interface IProps {}
interface IState {}

class DataGridHeader extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <div>DataGridHeader</div>;
  }
}

export default connectStore(DataGridHeader);
