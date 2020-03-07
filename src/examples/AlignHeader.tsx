import * as React from 'react';

import { Button, Divider } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';
import { basicData } from './data/basicData';

class AlignHeader extends React.Component<any, any> {
  dataGridContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      width: 300,
      height: 300,
      columns: [
        { key: 'id', width: 60, label: 'ID' },
        { key: 'title', width: 200, label: 'Title' },
        { key: 'writer', label: 'Writer' },
        { key: 'date', label: 'Date', formatter: 'date' },
        { key: 'money', label: 'Money', formatter: 'money' },
      ],
      data: basicData,
      options: {},
    };

    this.dataGridContainerRef = React.createRef();
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
    const { width, height, columns, data, options } = this.state;

    return (
      <Wrapper>
        <Segment padded>
          <h1>Align Header</h1>
          <p>This example changes the 'options.header.align' property.</p>

          <div
            ref={this.dataGridContainerRef}
            style={{ border: '1px solid #ccc' }}
          >
            <DataGrid
              width={width - 2}
              height={height - 2}
              style={{ fontSize: '12px' }}
              columns={columns}
              data={data}
              dataLength={Object.keys(data).length}
              options={options}
            />
          </div>

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

  getDataGridContainerRect = (e?: Event) => {
    if (this.dataGridContainerRef.current) {
      const {
        width,
      } = this.dataGridContainerRef.current.getBoundingClientRect();
      this.setState({ width });
    }
  };

  componentDidMount() {
    this.getDataGridContainerRect();
    window.addEventListener('resize', this.getDataGridContainerRect, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDataGridContainerRect);
  }
}

export default AlignHeader;
