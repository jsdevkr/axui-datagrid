import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { getOuterHeight, getOuterWidth } from '../utils';

interface IProps extends IDataGridStore {}
interface IState {}

class TestComponent extends React.Component<IProps, IState> {
  state = {};

  componentDidMount() {
    const { setRootState, rootObject } = this.props;

    console.log(rootObject);

    rootObject.timer = 'Root scope value';
    console.log(rootObject.timer);

    // setRootState && setRootState({ calculatedHeight: 500 });
  }

  runDispatch = (e: any) => {
    const { rootObject } = this.props;

    this.props.setStoreState({ scrollTop: 999 });

    rootObject.runner = 'i am runner';
  };

  render() {
    // props test
    const { getRootState, getRootNode } = this.props;

    // console.table(getRootState && getRootState());
    // console.log(getRootNode && getOuterHeight(getRootNode()));

    return (
      <div>
        <button onClick={this.runDispatch}>setStoreState</button>
      </div>
    );
  }
}

export default connectStore(TestComponent);
