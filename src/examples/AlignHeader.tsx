import * as React from 'react';

import { Button, Divider } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class AlignHeader extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const gridData = require('examples/data/data-basic.json');

    this.state = {
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
      alignLeft: () => {
        this.setState({
          options: {
            header: {
              align: 'left',
            },
          },
        });
      },
      alignCenter: () => {
        this.setState({
          options: {
            header: {
              align: 'center',
            },
          },
        });
      },
      alignRight: () => {
        this.setState({
          options: {
            header: {
              align: 'right',
            },
          },
        });
      },
    };

    if (props in processor) {
      processor[props]();
    } else {
      this.setState(props);
    }
  }

  changeConfig2 = (props: any, value: any) => {
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
          <h1>Align Header</h1>
          <p>This example changes the 'options.header.align' property.</p>

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
                onClick={() => this.changeConfig2('setHeight', 300)}
              >
                height : 300
              </Button>

              <Button
                type="primary"
                onClick={() => this.changeConfig2('setHeight', 400)}
              >
                height : 400
              </Button>

              <Button
                type="primary"
                onClick={() => this.changeConfig2('setHeight', 500)}
              >
                height : 500
              </Button>




          <Divider />

          <Button onClick={() => this.changeConfig('alignLeft')}>
            align left
          </Button>
          <Button onClick={() => this.changeConfig('alignCenter')}>
            align center
          </Button>
          <Button onClick={() => this.changeConfig('alignRight')}>
            align right
          </Button>
        </Segment>
      </Wrapper>
    );
  }
}

export default AlignHeader;
