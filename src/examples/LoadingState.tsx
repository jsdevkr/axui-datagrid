import * as React from 'react';

import { Divider, Checkbox } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class LoadingState extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const gridData = require('examples/data/data-basic.json');

    this.state = {
      loading: false,
      loadingData: false,
      height: 300,
      columns: [
        { key: 'id', width: 60, label: 'ID' },
        { key: 'title', width: 200, label: 'Title' },
        { key: 'writer', label: 'Writer' },
        { key: 'date', label: 'Date', formatter: 'date' },
        { key: 'money', label: 'Money', formatter: 'money' },
      ],
      data: gridData,
      options: {},
    };
  }

  onScrollEnd = () => {
    const appendData = require('examples/data/data-basic.json');
    this.setState({
      loadingData: true,
    });

    setTimeout(() => {
      this.setState({
        loadingData: false,
        data: [...this.state.data, ...appendData],
      });
    }, 1000);
  };

  render() {
    const { loading, loadingData, height, columns, data, options } = this.state;

    return (
      <Wrapper>
        <Segment padded>
          <h1>Loading</h1>
          <p>You can express the loading status with loading props</p>

          <DataGrid
            loading={loading}
            loadingData={loadingData}
            height={height}
            style={{ fontSize: '12px' }}
            columns={columns}
            data={data}
            options={options}
            onScrollEnd={(param: any) => {
              // console.log('scroll end' + param);
              this.onScrollEnd();
            }}
          />
          <Divider />
          <h3>Set Loading state</h3>
          <Checkbox
            checked={this.state.loading}
            onChange={e => {
              this.setState({ loading: e.target.checked });
            }}
          >
            loading
          </Checkbox>
          <Checkbox
            checked={this.state.loadingData}
            onChange={e => {
              this.setState({ loadingData: e.target.checked });
            }}
          >
            loadingData
          </Checkbox>
        </Segment>
      </Wrapper>
    );
  }
}

export default LoadingState;
