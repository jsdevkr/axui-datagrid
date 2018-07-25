import * as React from 'react';

import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class LoadingState extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const gridData = require('examples/basicData.json');

    this.state = {
      loading: false,
      loadingData: false,
      columns: [
        { key: 'id', width: 60, label: 'ID' },
        { key: 'title', width: 200, label: 'Title' },
        { key: 'writer', label: 'Writer' },
        { key: 'date', label: 'Date', formatter: 'date' },
        { key: 'money', label: 'Money', formatter: 'money' },
      ],
      data: gridData,
      options: {
        showRowSelector: true,
      },
    };
  }

  render() {
    const { loading, loadingData, height, columns, data, options } = this.state;

    return (
      <Wrapper>
        <Segment padded>
          <h1>RowSelector</h1>
          <p>You can express the loading status with loading props</p>

          <DataGrid
            loading={loading}
            loadingData={loadingData}
            height={height}
            style={{ fontSize: '12px' }}
            columns={columns}
            data={data}
            options={options}
          />
        </Segment>
      </Wrapper>
    );
  }
}

export default LoadingState;
