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

  .axui-datagrid {
    &:focus {
      outline: #ff3300 solid 1px !important;
    }
  }
`;

const inputNumberEditor: IDataGrid.cellEditorFunction = ({
  value,
  update,
  cancel,
  keyAction,
}) => {
  return (
    <InputNumber
      style={{ width: '100%' }}
      autoFocus
      defaultValue={value}
      onBlur={e => {
        console.log('onBlur');
        cancel();
      }}
      onKeyDown={e => {
        if (e.which === 9) {
          e.preventDefault();
          keyAction('EDIT_NEXT', e.currentTarget.value, { e });
        } else if (e.which === 27) {
          e.preventDefault();
          cancel();
        } else if (e.which === 13) {
          e.preventDefault();
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
  cancel,
  keyAction,
}) => {
  return (
    <Select<string>
      style={{ width: '100%' }}
      showSearch
      optionFilterProp="children"
      defaultOpen={true}
      autoFocus={true}
      defaultValue={value}
      dropdownClassName="axui-datagrid-select-dropdown"
      onSelect={val => {
        console.log('onSelect', val);
        if (value !== val) {
          update(val);
        } else {
          cancel({ keepEditing: true });
        }
      }}
      onInputKeyDown={e => {
        console.log('onInputKeyDown', e.currentTarget.value);
        if (e.which === 9) {
          e.preventDefault();
          keyAction('EDIT_NEXT', value, { e });
        } else if (e.which === 27 || e.which === 13) {
          e.preventDefault();
          cancel({ keepEditing: true });
        }
      }}
      onBlur={() => {
        console.log('onBlur');
        cancel();
      }}
      onDropdownVisibleChange={open => {
        if (open) {
          focus();
        }
      }}
    >
      <Select.Option value="Jack">Jack</Select.Option>
      <Select.Option value="Sofia">Sofia</Select.Option>
      <Select.Option value="Thomas">Thomas</Select.Option>
    </Select>
  );
};

const inputDateEditor: IDataGrid.cellEditorFunction = ({
  value,
  update,
  focus,
  keyAction,
}) => {
  return (
    <DatePicker
      value={value ? moment(value, 'YYYY/MM/DD') : moment()}
      onChange={(date, dateString) => {
        update(dateString);
        // keyAction('EDIT_NEXT', dateString);
      }}
      open={true}
    />
  );
};

interface IState {
  width: number;
  height: number;
  scrollTop: number;
  scrollLeft: number;
  columns: IDataGrid.IColumn[];
  data: IDataGrid.IData;
  selection: IDataGrid.ISelection;
}

class InlineEdit extends React.Component<any, IState> {
  dataGridContainerRef: React.RefObject<HTMLDivElement>;

  scrollTop: number = 0;
  scrollContentContainerHeight: number = 0;
  scrollContentHeight: number = 0;
  bodyTrHeight: number = 24;
  selectedIndexes: number[] = [];
  debouncedOnScroll: any;

  constructor(props: any) {
    super(props);

    const columns: IDataGrid.IColumn[] = [
      {
        key: 'id',
        width: 60,
        label: 'ID',
        editor: { activeType: 'click', type: 'text' },
      },
      {
        key: 'writer',
        label: 'Writer',
        width: 120,
        editor: {
          activeType: 'click',
          render: searchSelectEditor,
          // disable: ({ item }) => item.value['type'] === 'A',
        },
      },
      {
        key: 'check',
        label: 'checkbox',
        align: 'center',
        formatter: ({ value }) => value + '',
        editor: {
          type: 'checkbox',
          disable: ({ item }) => item.value['type'] === 'A',
        },
      },
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
        key: 'date',
        label: 'Date',
        formatter: 'date',
        width: 105,
        editor: {
          activeType: 'click',
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
      isEditing: false,
    };

    this.state = {
      width: 300,
      height: 300,
      scrollTop: 0,
      scrollLeft: 0,
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
  }

  addItem = () => {
    const { data } = this.state;
    const dataLength = Object.keys(data).length;
    const newItem: IDataGrid.IData = {
      [dataLength]: {
        type: 'C',
        value: {
          id: 999,
          title: '',
          writer: '',
          date: '',
          money: 0,
          type: 'B',
          check: true,
        },
      },
    };

    // 그리드의 스크롤을 변경하기 위한 스크롤 포지션 구하기
    const scrollTop =
      this.scrollContentContainerHeight < this.scrollContentHeight
        ? -this.scrollContentHeight
        : 0;

    this.setState({
      data: { ...data, ...newItem },
      scrollTop,
      selection: {
        rows: [dataLength],
        cols: [0],
        focusedRow: dataLength,
        focusedCol: 0,
        isEditing: true,
      },
    });
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

  // onScroll = (param: IDataGrid.IonScrollFunctionParam) => {
  //   // console.log(param);
  //   this.debouncedOnScroll(param.scrollTop);
  // };

  onScroll = debounce((param: IDataGrid.IonScrollFunctionParam) => {
    console.log('debounce');
    this.setState({
      scrollTop: param.scrollTop,
      scrollLeft: param.scrollLeft,
    });
  }, 300);

  onChangeScrollSize = (param: IDataGrid.IonChangeScrollSizeFunctionParam) => {
    // console.log(param);
    this.scrollContentHeight = param.scrollContentHeight || 0;
    this.bodyTrHeight = param.bodyTrHeight || 0;
  };

  onChangeSelection = (param: IDataGrid.IonChangeSelectionParam) => {
    // this.setState({ selection: param });
  };

  onEditItem = (param: IDataGrid.IonEditParam) => {
    console.log(`onEditItem`, param);
    const { li, col: { key: colKey = '' } = {}, value } = param;
    const { data } = this.state;
    const editDataItem: IDataGrid.IDataItem = { ...data[li] };

    if (isObject(value)) {
      editDataItem.value = { ...editDataItem.value, ...value };
    } else {
      editDataItem.value[colKey] = value;
    }

    this.setState({
      data: { ...data, [li]: editDataItem },
    });
  };

  onKeyDown = (e: KeyboardEvent) => {
    // if (
    //   this.dataGridContainerRef.current &&
    //   e.target &&
    //   e.target instanceof Node
    // ) {
    //   console.log(
    //     this.dataGridContainerRef.current.contains(e.target),
    //     this.dataGridContainerRef.current,
    //     e.target,
    //     e.currentTarget,
    //   );
    //   // console.log(e.target, e.currentTarget);
    // }
  };

  componentDidMount() {
    this.getDataGridContainerRect();
    window.addEventListener('resize', this.getDataGridContainerRect, false);
    window.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDataGridContainerRect);
    window.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    const {
      width,
      height,
      columns,
      data,
      scrollTop,
      scrollLeft,
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
                selection={selection}
                onChangeSelection={this.onChangeSelection}
                onScroll={this.onScroll}
                scrollTop={scrollTop}
                scrollLeft={scrollLeft}
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
}

export default InlineEdit;
