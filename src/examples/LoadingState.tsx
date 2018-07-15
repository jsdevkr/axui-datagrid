import * as React from 'react';

import { Button, Divider } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class LoadingState extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const gridData = require('examples/basicData.json');

    this.state = {
      loading: false,
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

  public changeConfig(props: any) {
    const processor = {
      'loading-true': () => {
        this.setState({ loading: true });
      },
      'loading-false': () => {
        this.setState({ loading: false });
      },
    };

    if (props in processor) {
      processor[props]();
    } else {
      this.setState(props);
    }
  }

  render() {
    return (
      <Wrapper>
        <Segment padded>
          <h1>Loading</h1>
          <p>You can express the loading status with loading props</p>

          <DataGrid
            loading={this.state.loading}
            height={this.state.height}
            style={{ fontSize: '12px' }}
            columns={this.state.columns}
            data={this.state.data}
            options={this.state.options}
          />

          <Divider />

          <Button onClick={() => this.changeConfig('loading-true')}>
            Set Loading(True)
          </Button>
          <Button onClick={() => this.changeConfig('loading-false')}>
            Set Loading(False)
          </Button>
        </Segment>
      </Wrapper>
    );
  }
}

export default LoadingState;
