import * as React from 'react';

class DataGridLoader extends React.PureComponent<{
  loading: boolean;
}> {
  render() {
    if (!this.props.loading) {
      return null;
    }

    return (
      <div className="axui-datagrid-loader">
        <div data-loader-spinner="" />
        <div data-loader-text="">Loading</div>
      </div>
    );
  }
}

export default DataGridLoader;
