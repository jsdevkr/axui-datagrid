import * as React from 'react';

import {
  Button,
  Divider,
  Form,
  Select,
  Icon,
  DatePicker,
  InputNumber,
  Checkbox,
} from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';
import { IDataGrid } from 'axui-datagrid/common/@types';
import { debounce } from 'axui-datagrid/utils';
import styled from 'styled-components';
import moment = require('moment');

const DatagridContainer = styled.div`
  .ant-input {
    height: 23px;
    padding: 2px 5px;
  }
  .ant-select {
    height: 23px;
  }
  .ant-select-selection--single {
    height: 23px;
  }
  .ant-select-selection__rendered {
    line-height: 23px;
  }
  .ant-input-number {
    height: 23px;
  }
  .ant-input-number-input {
    height: 23px;
  }
`;

class InlineEdit extends React.Component<any, any> {
  dataGridContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    const columns: IDataGrid.ICol[] = [
      { key: 'id', width: 60, label: 'ID', editor: { type: 'text' } },
      { key: 'title', width: 200, label: 'Title', editor: { type: 'text' } },
      {
        key: 'date',
        label: 'Date',
        formatter: 'date',
        width: 105,
        editor: {
          activeType: 'always',
          width: 105, // need when autofitColumns
          render: ({ value, update }) => {
            return (
              <DatePicker
                value={value ? moment(value, 'YYYY/MM/DD') : moment()}
                onChange={(date, dateString) => {
                  update(dateString);
                }}
              />
            );
          },
        },
      },
      {
        key: 'type',
        label: 'select',
        editor: {
          activeType: 'always',
          render: ({ value, update, cancel, focus, blur }) => {
            return (
              <Select
                style={{ width: '100%' }}
                onChange={val => {
                  update(val);
                }}
                value={value}
                onDropdownVisibleChange={open => {
                  if (open) {
                    focus();
                  } else {
                    blur();
                  }
                }}
                dropdownClassName="axui-datagrid-select-dropdown"
              >
                <Select.Option value="A">A</Select.Option>
                <Select.Option value="B">B</Select.Option>
                <Select.Option value="C">C</Select.Option>
              </Select>
            );
          },
        },
      },
      {
        key: 'writer',
        label: 'search',
        width: 120,
        editor: {
          activeType: 'always',
          render: ({ value, update, focus, blur }) => {
            return (
              <Select
                style={{ width: '100%' }}
                showSearch
                optionFilterProp="children"
                onFocus={() => focus()}
                onBlur={() => blur()}
                onInputKeyDown={e => {
                  if (e.which !== 13 && e.which !== 27) {
                    update(e.currentTarget.value, true);
                  }
                }}
                onChange={val => {
                  update(val);
                }}
                onDropdownVisibleChange={open => {
                  if (open) {
                    focus();
                  } else {
                    blur();
                  }
                }}
                value={value}
                dropdownClassName="axui-datagrid-select-dropdown"
              >
                <Select.Option value="Jack">Jack</Select.Option>
                <Select.Option value="Sofia">Sofia</Select.Option>
                <Select.Option value="Thomas">Thomas</Select.Option>
              </Select>
            );
          },
        },
      },
      {
        key: 'money',
        label: 'Money',
        formatter: 'money',
        align: 'right',
        editor: {
          render: ({ value, update, cancel }) => {
            return (
              <InputNumber
                style={{ width: '100%' }}
                autoFocus
                defaultValue={value}
                onChange={val => {
                  update(val, true);
                }}
                onBlur={cancel}
                onKeyUp={e => {
                  if (e.which === 13) {
                    update(e.currentTarget.value);
                  }
                }}
              />
            );
          },
        },
      },
      {
        key: 'check',
        label: 'checkbox',
        editor: {
          activeType: 'always',
          render: ({ value, update }) => {
            return (
              <Checkbox
                style={{ justifyContent: 'center' }}
                checked={value}
                onChange={e => {
                  update(e.target.checked);
                }}
              >
                Active
              </Checkbox>
            );
          },
        },
      },
    ];
    const options: IDataGrid.IOptions = {
      header: {
        align: 'center',
      },
    };
    const selection: IDataGrid.ISelection = {
      rows: [],
      cols: [],
      focusedRow: -1,
      focusedCol: -1,
    };

    this.state = {
      width: 300,
      height: 300,
      scrollTop: 0,
      columns,
      data: [
        {
          id: 1,
          title: 'Think like a man of action and act like man of thought.',
          writer: 'Thomas',
          date: '2017/12/05',
          money: 120000,
          type: 'A',
          check: true,
        },
        {
          id: 2,
          title:
            'Courage is very important. Like a muscle, it is strengthened by use.',
          writer: 'Sofia',
          date: new Date(),
          money: 18000,
          type: 'B',
          check: false,
        },
        {
          id: 3,
          title: 'TEST',
          writer: 'Jack',
          date: '2018/01/01',
          money: 9000,
          type: 'C',
          check: false,
        },
        {
          id: 4,
          title: 'Think like a man of action and act like man of thought.',
          writer: 'Thomas',
          date: '2017/12/05',
          money: 120000,
          type: 'A',
          check: true,
        },
        {
          id: 5,
          title:
            'Courage is very important. Like a muscle, it is strengthened by use.',
          writer: 'Sofia',
          date: new Date(),
          money: 18000,
          type: 'B',
          check: false,
        },
        {
          id: 6,
          title: 'TEST',
          writer: 'Jack',
          date: '2018/01/01',
          money: 9000,
          type: 'C',
          check: false,
        },
      ],
      options,
      selection,
      scrollContentHeight: 0,
      bodyTrHeight: 24,
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
      type: 'B',
      check: true,
    };
    this.setState({
      data: [...this.state.data, ...[newItem]],
      scrollTop: this.state.scrollContentHeight,
    });
  };

  removeItem = () => {
    const { selection, data } = this.state;
    if (selection.focusedRow > -1) {
      data.splice(selection.focusedRow, 1);
      this.setState({
        data,
        selection: {},
      });
    }
  };

  onScroll = (param: IDataGrid.IonScrollFunctionParam) => {
    // console.log(param);
  };

  onChangeScrollSize = (param: IDataGrid.IonChangeScrollSizeFunctionParam) => {
    // console.log(param);
    this.setState({
      scrollContentHeight: param.scrollContentHeight,
      bodyTrHeight: param.bodyTrHeight,
    });
  };

  onChangeSelection = (param: IDataGrid.IonChangeSelectionParam) => {
    // console.log(param);
    this.setState({ selection: param });
  };

  handleChangeSelection = () => {
    const { data, columns, bodyTrHeight } = this.state;

    const r = Math.floor(Math.random() * data.length);
    const c = Math.floor(Math.random() * columns.length);

    const scrollTop = r * bodyTrHeight;

    this.setState({
      scrollTop,
      selection: {
        rows: [r],
        cols: [c],
        focusedRow: r,
        focusedCol: c,
      },
    });
  };

  public render() {
    const {
      width,
      height,
      columns,
      data,
      options,
      scrollTop,
      selection,
    } = this.state;

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
            <DatagridContainer>
              <DataGrid
                width={width}
                height={height}
                style={{ fontSize: '12px' }}
                columns={columns}
                data={data}
                options={options}
                selection={selection}
                onScroll={this.onScroll}
                onChangeScrollSize={this.onChangeScrollSize}
                onChangeSelection={this.onChangeSelection}
                scrollTop={scrollTop}
              />
            </DatagridContainer>
          </div>

          <div style={{ height: 10 }} />
          <Button size="small" onClick={() => this.addItem()}>
            <Icon type="plus" />
            Add item
          </Button>

          <Button
            size="small"
            disabled={selection.focusedRow === -1}
            onClick={() => this.removeItem()}
          >
            <Icon type="minus" />
            Remove item
          </Button>

          <Button size="small" onClick={() => this.setState({ scrollTop: 0 })}>
            scroll top (0)
          </Button>

          <Button size="small" onClick={this.handleChangeSelection}>
            change selection
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
