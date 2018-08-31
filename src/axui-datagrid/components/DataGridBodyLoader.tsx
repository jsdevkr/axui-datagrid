import * as React from 'react';

const DataGridBodyLoader: React.SFC<{
  loadingData: boolean;
  bodyLoaderHeight: number;
}> = props => {
  const { loadingData, bodyLoaderHeight } = props;

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
};

export default DataGridBodyLoader;
