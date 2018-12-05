import * as React from 'react';

import { Button, Divider } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class Formatter extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const gridData = require('examples/data/data-basic.json');""

    this.state = {
      height: 400,
      columns: [
        { key: 'id', width: 60, label: 'ID', align: 'center' },
        {
          key: 'title',
          width: 200,
          label: 'Title',
          formatter: function(args: any) {
            // console.log(args);
            return ' * ' + args.value;
          },
        },
        { key: 'writer', label: 'Writer', align: 'center' },
        { key: 'date', label: 'Date', align: 'center', formatter: 'date' },
        { key: 'money', label: 'Money', align: 'right', formatter: 'money' },
      ],
      data: gridData,
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
      processor[props].call(this);
    } else {
      this.setState(value);
    }
  };

  render() {
    return (
      <Wrapper>
        <Segment padded>
          <h1>Formatter</h1>
          <p>
           Users can change the values using 'date', 'money' predefined in 'columns>col.formatter',
           or the values as desired using a user-defined function and apply the formula to the data in the column.
           The results are then displayed accoding to the function. 
           For example, if you defined the formatter of the 'money' column as a function(args: any) &#123; return args.value*2 &#125;,
           you can see the money columns update doubled.
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

export default Formatter;
