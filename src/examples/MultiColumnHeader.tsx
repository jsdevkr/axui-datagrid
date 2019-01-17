import * as React from 'react';

import { Button, Divider, Form, Select } from 'antd';
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
        { key: 'money', label: 'Money', formatter: 'money', align: 'right' },
      ],
      data: gridData,
      options: {
        header: {
          align: 'center',
        },
      },
    };
  }

  changeConfig = (props: any, value: any) => {
    const processor = {
      setHeight: () => {
        this.setState({
          height: value,
        });
      },
    };

    if (props in processor) {
      processor[props].call(this, value);
    } else {
      this.setState(value);
    }
  };

  public render() {
    return (
      <Wrapper>
        <Segment padded>
          <h1>Multi Column Header</h1>
          <p>
            The column in the datagrid can be created with the context 'column:
            &#91; &#93;' you write. Inside '&#91; &#93;', one '&#123; &#125;'
            means a one column.
            <br />
            So if you want to create multi column header, you can use 'columns :
            &#91; &#93;' in the column what you want to create a multi column
            header.
            <br />
            For example, columns : &#91; &#123; &#125; , &#123; &#123; &#125;
            &#123; &#125; &#125; &#93; context means that this datagrid has
            three columns, and the second column is a multi column header which
            has 2 columns.
          </p>
          <DataGrid
            width={600}
            height={this.state.height}
            style={{ fontSize: '12px' }}
            columns={this.state.columns}
            data={this.state.data}
            options={this.state.options}
          />

          <Divider />

          <Button
            type="primary"
            onClick={() => this.changeConfig('setHeight', 300)}
          >
            height : 300
          </Button>
          <Button
            type="primary"
            onClick={() => this.changeConfig('setHeight', 400)}
          >
            height : 400
          </Button>
          <Button
            type="primary"
            onClick={() => this.changeConfig('setHeight', 500)}
          >
            height : 500
          </Button>
        </Segment>
      </Wrapper>
    );
  }
}

export default MultiColumnHeader;
