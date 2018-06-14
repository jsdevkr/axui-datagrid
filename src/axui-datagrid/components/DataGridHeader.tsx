import * as React from 'react';
import { types } from '../stores';
import { connectStore } from '../hoc';

interface IProps {}
interface IState {}

class DatagridHeader extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <div>i'm header</div>;
  }
}

export default connectStore(DatagridHeader);
