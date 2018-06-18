import * as React from 'react';
import { types } from '../stores';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';

interface IProps extends IDataGridStore {}
interface IState {
  columnResizing: boolean;
  columnResizerLeft: number;
}

class DataGridHeader extends React.Component<IProps, IState> {
  state = {
    columnResizing: false,
    columnResizerLeft: 0,
  };

  render() {
    const { styles } = this.props;
    const headerHeight = (styles && styles.headerHeight) || 0;
    console.log(styles);

    return (
      <div className={'axui-datagrid-header'} style={{ height: headerHeight }}>
        HEADER
      </div>
    );
  }
}

export default connectStore(DataGridHeader);
