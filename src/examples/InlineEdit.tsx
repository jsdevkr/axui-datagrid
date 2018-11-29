import * as React from 'react';

import { Button, Divider, Form, Select } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class InlineEdit extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const gridData = require('examples/data/data-basic.json');

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
          <h1>Inline Edit</h1>
          <p>
          One column is consists of the attributes which are defined in '&#123; &#125;' context. 
          <br/>So if you want to edit contents of columns, you have to add the editor attribute like 'editor: &#123;type: 'text' &#125;' within '&#123; &#125;' what you want to add editor mode.
          <br/>After this, you can activate editor mode using double-click or return key.
          </p>
          <DataGrid
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
            height : 400"
          </Button>
          <Button
            type="primary"
            onClick={() => this.changeConfig('setHeight', 500)}
          >
            height : 500"
          </Button>


        </Segment>
      </Wrapper>
      

    );
  }
}

export default InlineEdit;
