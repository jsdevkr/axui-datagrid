import * as React from 'react';

import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class MultiColumnHeader extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const gridData = require('examples/data/data-basic.json');

    this.state = {
      height: 300,
      columns: [
        { key: 'id', width: 60, label: 'ID' },
        { key: 'title', width: 200, label: 'Title' },
        {
          label: 'Group',
          columns: [
            { key: 'writer', label: 'Writer' },
            { key: 'date', label: 'Date', formatter: 'date' },
          ],
        },
        { key: 'money', label: 'Money', formatter: 'money' },
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
          <h1>Multi Column Header</h1>
          <p>
            You can set up multiple-line headers by adding columns inside
            'columns> col'.
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

export default MultiColumnHeader;
