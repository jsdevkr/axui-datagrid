import * as React from 'react';

class DataGridBodyLoader extends React.PureComponent<{
  loadingData: boolean;
  bodyLoaderHeight: number;
}> {
  render() {
    const { loadingData, bodyLoaderHeight } = this.props;

    if (!loadingData) {
      return null;
    }

    return (
      <div
        className="axui-datagrid-body-loader"
        style={{
          height: bodyLoaderHeight,
        }}
      >
        <div data-loader-spinner="" />
        <div data-loader-text="">Loading</div>
      </div>
    );
  }
}

export default DataGridBodyLoader;
