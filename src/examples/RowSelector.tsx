import * as React from 'react';
import { Divider } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class LoadingState extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    let gridData = require('examples/basicData.json');

    this.state = {
      columns: [
        { key: 'id', width: 60, label: 'ID' },
        { key: 'title', width: 200, label: 'Title' },
        { key: 'writer', label: 'Writer' },
        { key: 'date', label: 'Date', formatter: 'date' },
        { key: 'money', label: 'Money', formatter: 'money' },
      ],
      data: [...gridData],
      filteredList: [...gridData],
      options: {
        showRowSelector: true,
      },
    };
  }

  render() {
    const { height, columns, data, options } = this.state;

    return (
      <Wrapper>
        <Segment padded>
          <h1>RowSelector</h1>
          <p>You can express the loading status with loading props</p>

          <DataGrid
            height={height}
            style={{ fontSize: '12px' }}
            columns={columns}
            data={data}
            options={options}
            onChangeSelected={param => {
              this.setState({
                filteredList: param.filteredList,
              });
            }}
          />
          <Divider />

          <h2>Data</h2>
          <textarea
            style={{ width: '100%', height: '400px', padding: '10px' }}
            value={JSON.stringify(this.state.filteredList)}
            readOnly
          />
        </Segment>
      </Wrapper>
    );
  }
}

export default LoadingState;
