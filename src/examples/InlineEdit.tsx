import * as React from 'react';

import { Button, Divider } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class InlineEdit extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const gridData = require('examples/basicData.json');

    this.state = {
      height: 300,
      columns: [
        { key: 'id', width: 60, label: 'ID', editor: { type: 'text' } },
        { key: 'title', width: 200, label: 'Title', editor: { type: 'text' } },
        { key: 'writer', label: 'Writer', editor: { type: 'text' } },
        {
          key: 'date',
          label: 'Date',
          formatter: 'date',
          editor: { type: 'text' },
        },
        {
          key: 'money',
          label: 'Money',
          formatter: 'money',
          editor: { type: 'text' },
        },
      ],
      data: gridData,
      options: {
        header: {
          align: 'center',
        },
      },
    };
  }

  public render() {
    return (
      <Wrapper>
        <Segment padded>
          <h1>Inline Edit</h1>
          <p>
            If you define the editor attribute in 'columns> col', you can use
            the editor mode of that column. You can activate editor mode using
            double-click or return key.
          </p>
          <DataGrid
            height={this.state.height}
            style={{ fontSize: '12px' }}
            columns={this.state.columns}
            data={this.state.data}
            options={this.state.options}
          />
        </Segment>
      </Wrapper>
    );
  }
}

export default InlineEdit;
