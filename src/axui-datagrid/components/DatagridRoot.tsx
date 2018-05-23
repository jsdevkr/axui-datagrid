import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { dataStore } from '../stores';

interface IProps {}
interface IState {}

class DatagridRoot extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <div />;
  }
}

export default DatagridRoot;
