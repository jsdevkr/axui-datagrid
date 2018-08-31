import * as React from 'react';

const DataGridLoader: React.SFC<{
  loading: boolean;
}> = props => {
  if (!props.loading) {
    return null;
  }

  return (
    <div className="axui-datagrid-loader">
      <div data-loader-spinner="" />
      <div data-loader-text="">Loading</div>
    </div>
  );
};

export default DataGridLoader;
