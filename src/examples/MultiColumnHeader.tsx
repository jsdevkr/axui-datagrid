import * as React from 'react';

import { Button, Divider } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';
import { basicData } from './data/basicData';

class MultiColumnHeader extends React.Component<any, any> {
  dataGridContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      width: 300,
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
      data: basicData,
      options: {
        header: {
          align: 'center',
        },
      },
    };

    this.dataGridContainerRef = React.createRef();
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
    const { width, height, columns, data, options } = this.state;

    return (
      <Wrapper>
        <Segment padded>
          <h1>Multi Column Header</h1>
          <p>
            The column in the datagrid can be created with the context `column:
            &#91; &#93;` you write. Inside `&#91; &#93;`, one `&#123; &#125;`
            means a one column.
            <br />
            So if you want to create multi column header, you can use `columns :
            &#91; &#93;` in the column what you want to create a multi column
            header.
            <br />
            For example, columns : &#91; &#123; &#125; , &#123; &#123; &#125;
            &#123; &#125; &#125; &#93; context means that this datagrid has
            three columns, and the second column is a multi column header which
            has 2 columns.
          </p>

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
              dataLength={data.length}
              options={options}
            />
          </div>

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

export default MultiColumnHeader;
