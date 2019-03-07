import * as React from 'react';

import { Button, Divider, Form, Select, Icon } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';
import { IDataGrid } from 'axui-datagrid/common/@types';

class InlineEdit extends React.Component<any, any> {
  dataGridContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      width: 300,
      height: 300,
      scrollTop: 0,
      columns: [
        { key: 'id', width: 60, label: 'ID', editor: { type: 'text' } },
        { key: 'title', width: 200, label: 'Title', editor: { type: 'text' } },
        {
          key: 'date',
          label: 'Date',
          formatter: 'date',
          editor: { type: 'text' },
        },

        { key: 'writer', label: 'search', editor: { type: 'text' } },
        {
          key: 'money',
          label: 'Money',
          formatter: 'money',
          align: 'right',
          editor: { type: 'text' },
        },
        { key: 'type', label: 'select', editor: { type: 'text' } },
      ],
      data: [
        {
          id: 1,
          title: 'Think like a man of action and act like man of thought.',
          writer: 'Thomas',
          date: '2017-12-05',
          money: 120000,
          type: 'A',
        },
        {
          id: 2,
          title:
            'Courage is very important. Like a muscle, it is strengthened by use.',
          writer: 'Sofia',
          date: '2017-11-10',
          money: 18000,
          type: 'B',
        },
      ],
      options: {
        header: {
          align: 'center',
        },
      },
      scrollContentHeight: 0,
    };

    this.dataGridContainerRef = React.createRef();
  }

  addItem = () => {
    const newItem = {
      id: 999,
      title: '',
      writer: '',
      date: '',
      money: 0,
      type: '',
    };
    this.setState({
      data: [...this.state.data, ...[newItem]],
      scrollTop: this.state.scrollContentHeight,
    });
  };

  removeItem = () => {};

  onScroll = (param: IDataGrid.IonScrollFunctionParam) => {
    // console.log(param);
  };

  onChangeScrollSize = (param: IDataGrid.IonChangeScrollSizeFunctionParam) => {
    // console.log(param);
    this.setState({
      scrollContentHeight: param.scrollContentHeight,
    });
  };

  public render() {
    const { width, height, columns, data, options, scrollTop } = this.state;

    return (
      <Wrapper>
        <Segment padded>
          <h1>Inline Edit</h1>
          <p>
            One column is consists of the attributes which are defined in
            '&#123; &#125;' context.
            <br />
            So if you want to edit contents of columns, you have to add the
            editor attribute like 'editor: &#123;type: 'text' &#125;' within
            '&#123; &#125;' what you want to add editor mode.
            <br />
            After this, you can activate editor mode using double-click or
            return key.
          </p>

          <div ref={this.dataGridContainerRef}>
            <DataGrid
              width={width}
              height={height}
              style={{ fontSize: '12px' }}
              columns={columns}
              data={data}
              options={options}
              selection={{
                rows: [0],
                cols: [0],
                focusedRow: 0,
                focusedCol: 0,
              }}
              onScroll={this.onScroll}
              onChangeScrollSize={this.onChangeScrollSize}
              scrollTop={scrollTop}
            />
          </div>

          <div style={{ height: 10 }} />
          <Button size="small" onClick={() => this.addItem()}>
            <Icon type="plus" />
            Add item
          </Button>

          <Button size="small" disabled onClick={() => this.removeItem()}>
            <Icon type="minus" />
            Remove item
          </Button>

          <Button size="small" onClick={() => this.setState({ scrollTop: 0 })}>
            scroll top (0)
          </Button>
        </Segment>
      </Wrapper>
    );
  }

  getDataGridContainerRect = (e?: Event) => {
    if (this.dataGridContainerRef.current) {
      const {
        width,
        height,
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

export default InlineEdit;
