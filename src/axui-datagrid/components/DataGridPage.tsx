import * as React from 'react';
import { IDataGridStore } from '../providers/StoreProvider';
import { connectStore } from '../hoc';
import { formatCurrency } from '../utils';

interface IProps extends IDataGridStore {}

class DataGridPage extends React.Component<IProps> {
  shouldComponentUpdate(prevProps: IProps) {
    const {
      styles: { pageHeight = 0, horizontalScrollerWidth = 0 } = {},
    } = this.props;

    const {
      styles: {
        pageHeight: _pageHeight = 0,
        horizontalScrollerWidth: _horizontalScrollerWidth = 0,
      } = {},
    } = prevProps;

    if (
      this.props.data !== prevProps.data ||
      this.props.dataLength !== prevProps.dataLength ||
      this.props.status !== prevProps.status ||
      pageHeight !== _pageHeight ||
      horizontalScrollerWidth !== _horizontalScrollerWidth
    ) {
      return true;
    }

    return false;
  }

  render() {
    const {
      styles: { pageHeight = 0, horizontalScrollerWidth = 0 } = {},
      status,
      dataLength = 0,
    } = this.props;

    return (
      <div className="axui-datagrid-page" style={{ height: pageHeight }}>
        <div className="axui-datagrid-page-status">
          {status ? status : `Total ${formatCurrency(dataLength)} Items`}
        </div>
        <div style={{ width: horizontalScrollerWidth }} />
      </div>
    );
  }
}

export default connectStore(DataGridPage);
