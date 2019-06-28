import * as React from 'react';

import { Button, Select, Icon, DatePicker, InputNumber } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';
import { IDataGrid } from 'axui-datagrid/common/@types';

import styled from 'styled-components';
import moment = require('moment');
import { debounce, isObject } from 'axui-datagrid/utils';

const DatagridContainer = styled.div`
  border: 1px solid #ccc;
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

const inputNumberEditor: IDataGrid.cellEditorFunction = ({
  value,
  update,
  cancel,
}) => {
  return (
    <InputNumber
      style={{ width: '100%' }}
      autoFocus
      defaultValue={value}
      onChange={val => {
        update(val, { keepEditing: true });
      }}
      onBlur={cancel}
      onKeyUp={e => {
        if (e.which === 13) {
          update(e.currentTarget.value);
        }
      }}
    />
  );
};

const searchSelectEditor: IDataGrid.cellEditorFunction = ({
  value,
  update,
  focus,
  blur,
}) => {
  return (
    <Select
      style={{ width: '100%' }}
      showSearch
      optionFilterProp="children"
      onFocus={() => focus()}
      onBlur={() => blur()}
      onInputKeyDown={e => {
        if (e.which !== 13 && e.which !== 27) {
          update(e.currentTarget.value, { keepEditing: true });
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
};

const types = ['A', 'B', 'C'];
const subTypes = [
  { type: 'A', subType: 'A-1' },
  { type: 'A', subType: 'A-2' },
  { type: 'A', subType: 'A-3' },
  { type: 'B', subType: 'B-1' },
  { type: 'B', subType: 'B-2' },
  { type: 'B', subType: 'B-3' },
  { type: 'C', subType: 'C-1' },
  { type: 'C', subType: 'C-2' },
  { type: 'C', subType: 'C-3' },
];

const selectEditorA: IDataGrid.cellEditorFunction = ({
  value,
  item,
  update,
  cancel,
  focus,
  blur,
}) => {
  return (
    <Select
      style={{ width: '100%' }}
      onChange={val => {
        if ((val.subType + '').substring(0, 1) === val) {
          update(val);
        } else {
          update({ type: val, subType: '' }, { updateItem: true });
        }
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
      {types.map(t => (
        <Select.Option key={t} value={t}>
          {t}
        </Select.Option>
      ))}
    </Select>
  );
};

const selectEditorB: IDataGrid.cellEditorFunction = ({
  item,
  value,
  update,
  cancel,
  focus,
  blur,
}) => {
  const _subTypes = subTypes.filter(t => t.type === item.value['type']);
  if (!_subTypes.find(t => t.subType === value)) {
    value = '';
  }

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
      {_subTypes.map(t => (
        <Select.Option key={t.subType} value={t.subType}>
          {t.subType}
        </Select.Option>
      ))}
    </Select>
  );
};

const inputDateEditor: IDataGrid.cellEditorFunction = ({ value, update }) => {
  return (
    <DatePicker
      value={value ? moment(value, 'YYYY/MM/DD') : moment()}
      onChange={(date, dateString) => {
        update(dateString);
      }}
    />
  );
};

interface IState {
  width: number;
  height: number;
  scrollTop: number;
  columns: IDataGrid.IColumn[];
  data: IDataGrid.IData;
  selection: IDataGrid.ISelection;
}

class InlineEdit extends React.Component<any, IState> {
  dataGridContainerRef: React.RefObject<HTMLDivElement>;

  scrollTop: number = 0;
  scrollContentHeight: number = 0;
  bodyTrHeight: number = 24;
  selectedIndexes: number[] = [];
  debouncedOnScroll: any;

  constructor(props: any) {
    super(props);

    const columns: IDataGrid.IColumn[] = [
      { key: 'id', width: 60, label: 'ID', editor: { type: 'text' } },
      {
        key: 'title',
        width: 200,
        label: 'Title',
        editor: {
          activeType: 'click',
          type: 'text',
        },
      },
      {
        key: 'type',
        label: 'select A',
        editor: {
          activeType: 'always',
          render: selectEditorA,
        },
      },
      {
        key: 'subType',
        label: 'select B',
        width: 120,
        editor: {
          activeType: 'always',
          render: selectEditorB,
        },
      },
      {
        key: 'writer',
        label: 'Writer',
        width: 120,
        editor: {
          activeType: 'always',
          render: searchSelectEditor,
          disable: ({ item }) => item.value['type'] === 'A',
        },
      },
      {
        key: 'money',
        label: 'Money',
        formatter: 'money',
        align: 'right',
        editor: {
          activeType: 'click',
          render: inputNumberEditor,
          disable: ({ item }) => item.value['type'] === 'A',
        },
      },
      {
        key: 'check',
        label: 'checkbox',
        align: 'center',
        editor: {
          type: 'checkbox',
          label: 'useYn',
          disable: ({ item }) => item.value['type'] === 'A',
        },
      },
      {
        key: 'date',
        label: 'Date',
        formatter: 'date',
        width: 105,
        editor: {
          activeType: 'always',
          width: 105, // need when autofitColumns
          render: inputDateEditor,
        },
      },
    ];

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
          value: {
            id: 1,
            title: 'Think like a man of action and act like man of thought.',
            writer: 'Thomas',
            date: '2017/12/05',
            money: 120000,
            type: 'A',
            subType: 'A-1',
            check: true,
          },
        },
        {
          value: {
            id: 2,
            title:
              'Courage is very important. Like a muscle, it is strengthened by use.',
            writer: 'Sofia',
            date: new Date(),
            money: 18000,
            type: 'B',
            subType: 'B-1',
            check: false,
          },
        },
        {
          value: {
            id: 3,
            title: 'TEST',
            writer: 'Jack',
            date: '2018/01/01',
            money: 9000,
            type: 'C',
            subType: 'C-1',
            check: false,
          },
        },
        {
          value: {
            id: 4,
            title: 'Think like a man of action and act like man of thought.',
            writer: 'Thomas',
            date: '2017/12/05',
            money: 120000,
            type: 'A',
            subType: 'A-2',
            check: true,
          },
        },
        {
          value: {
            id: 5,
            title:
              'Courage is very important. Like a muscle, it is strengthened by use.',
            writer: 'Sofia',
            date: new Date(),
            money: 18000,
            type: 'B',
            subType: 'B-2',
            check: false,
          },
        },
        {
          value: {
            id: 6,
            title: 'TEST',
            writer: 'Jack',
            date: '2018/01/01',
            money: 9000,
            type: 'C',
            subType: 'C-2',
            check: false,
          },
        },
      ],
      selection,
    };

    this.dataGridContainerRef = React.createRef();
    this.debouncedOnScroll = debounce((scrollTop: number) => {
      this.setState({
        scrollTop: scrollTop,
      });
    }, 1000);
  }

  addItem = () => {
    // const newItem = {
    //   id: 999,
    //   title: '',
    //   writer: '',
    //   date: '',
    //   money: 0,
    //   type: 'B',
    //   check: true,
    // };
    // console.log(this.scrollContentHeight);
    // this.setState({
    //   data: [...this.state.data, ...[newItem]],
    //   scrollTop: -this.scrollContentHeight,
    //   selection: {
    //     rows: [this.state.data.length],
    //     cols: [1],
    //     focusedRow: this.state.data.length,
    //     focusedCol: 1,
    //   },
    // });
  };

  removeItem = () => {
    // console.log(this.selectedIndexes);
    if (this.selectedIndexes.length) {
      // const data: any[] = this.state.data;
      // const _data = data.filter((n, i) => {
      //   return !this.selectedIndexes.includes(i);
      // });
      // this.setState({ data: _data });
    }
  };

  onScroll = (param: IDataGrid.IonScrollFunctionParam) => {
    // console.log(param);
    this.debouncedOnScroll(param.scrollTop);
  };

  onChangeScrollSize = (param: IDataGrid.IonChangeScrollSizeFunctionParam) => {
    // console.log(param);
    this.scrollContentHeight = param.scrollContentHeight || 0;
    this.bodyTrHeight = param.bodyTrHeight || 0;
  };

  onChangeSelection = (param: IDataGrid.IonChangeSelectionParam) => {
    // console.log(param);
    this.setState({ selection: param });
  };

  onEditItem = (param: IDataGrid.IonEditParam) => {
    console.log(param);
    const { li, col: { key: colKey = '' } = {}, value } = param;
    const { data } = this.state;
    const editDataItem: IDataGrid.IDataItem = { ...data[li] };

    if (isObject(value)) {
      editDataItem.value = { ...editDataItem.value, ...value };
    } else {
      editDataItem.value[colKey] = value;
    }

    // console.log('newData', { ...data, [li]: editDataItem });

    this.setState({
      data: { ...data, [li]: editDataItem },
    });
  };

  public render() {
    const { width, height, columns, data, scrollTop } = this.state;

    console.log('render', data);

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
                style={{ fontSize: '12px' }}
                width={width - 2}
                height={height - 2}
                columns={columns}
                data={data}
                dataLength={Object.keys(data).length}
                options={{
                  rowSelectorColumnWidth: 26,
                  showRowSelector: true,
                  header: {
                    align: 'center',
                  },
                }}
                // selection={selection}
                // onChangeSelection={this.onChangeSelection}
                // selectedRowKeys={this.selectedRowKeys}
                // onChangeSelected={param => {
                //   this.selectedIndexes = param.selectedIndexes || [];
                // }}
                // onScroll={this.onScroll}
                scrollTop={scrollTop}
                onChangeScrollSize={this.onChangeScrollSize}
                onEdit={this.onEditItem}
              />
            </DatagridContainer>
          </div>

          <div style={{ height: 10 }} />
          <Button size="small" onClick={() => this.addItem()}>
            <Icon type="plus" />
            Add item
          </Button>

          <Button size="small" onClick={() => this.removeItem()}>
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
