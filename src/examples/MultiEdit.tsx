import * as React from 'react';

import { Button, Icon, Input } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';
import { IDataGrid } from 'axui-datagrid/common/@types';

import styled from 'styled-components';
// import { debounce } from 'axui-datagrid/utils';

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

interface IProps {}
interface IState {
  width: number;
  height: number;
  scrollTop: number;
  columns: IDataGrid.IColumn[];
  data: any[];
  editingData: IDataGrid.IEditingData;
  addingData: any[];
  selection: IDataGrid.ISelection;
}

class MultiEdit extends React.Component<IProps, IState> {
  dataGridContainerRef: React.RefObject<HTMLDivElement>;

  scrollTop: number = 0;
  scrollContentContainerHeight: number = 0;
  scrollContentHeight: number = 0;
  bodyTrHeight: number = 24;
  selectedIndexes: number[] = [];
  debouncedOnScroll: any;

  constructor(props: any) {
    super(props);

    const gridData = require('examples/data/data-array.json');
    const editor: IDataGrid.cellEditorFunction = ({
      value,
      li,
      item,
      update,
      cancel,
      blur,
      focus,
    }) => {
      return (
        <Input
          style={{ width: '100%' }}
          autoFocus
          defaultValue={value.v}
          onBlur={e => {
            // value.editValue = e.currentTarget.value;
            update(value);
          }}
          onKeyUp={e => {
            if (e.which === 27) {
              cancel();
              return;
            }
            if (e.which === 13) {
              // value.editValue = e.currentTarget.value;
              update(value);
            }
          }}
        />
      );
    };

    const columns: IDataGrid.ICol[] = [
      {
        key: '0',
        label: 'column 0',
        editor: { activeType: 'dblclick', render: editor },
        formatter: ({ value }) => value.v,
      },
      {
        key: '1',
        label: 'column 1',
        editor: { activeType: 'dblclick', render: editor },
        formatter: ({ value }) => value.v,
      },
      {
        key: '2',
        label: 'column 2',
        editor: { activeType: 'dblclick', render: editor },
        formatter: ({ value }) => value.v,
      },
      {
        key: '3',
        label: 'column 3',
        editor: { activeType: 'dblclick', render: editor },
        formatter: ({ value }) => value.v,
      },
      {
        key: '4',
        label: 'column 4',
        editor: { activeType: 'dblclick', render: editor },
        formatter: ({ value }) => value.v,
      },
      {
        key: '5',
        label: 'column 5',
        editor: { activeType: 'dblclick', render: editor },
        formatter: ({ value }) => value.v,
      },
      {
        key: '6',
        label: 'column 6',
        editor: { activeType: 'dblclick', render: editor },
        formatter: ({ value }) => value.v,
      },
      {
        key: '7',
        label: 'column 7',
        editor: { activeType: 'dblclick', render: editor },
        formatter: ({ value }) => value.v,
      },
      {
        key: '8',
        label: 'column 8',
        editor: { activeType: 'dblclick', render: editor },
        formatter: ({ value }) => value.v,
      },
      {
        key: '9',
        label: 'column 9',
        editor: { activeType: 'dblclick', render: editor },
        formatter: ({ value }) => value.v,
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
      data: gridData,
      selection,
      editingData: {
        '0': { editType: 'U', values: { '0': 'editValue' } },
        '1': { editType: 'U', values: { '0': 'editValue' } },
      },
      addingData: [],
    };

    this.dataGridContainerRef = React.createRef();
  }

  addItem = () => {
    const newItem = [
      { v: 'J' },
      { v: 'A' },
      { v: 'N' },
      { v: 'G' },
      { v: 'S' },
      { v: 'E' },
      { v: 'O' },
      { v: 'W' },
      { v: 'O' },
      { v: 'O' },
    ];

    // 그리드의 스크롤을 변경하기 위한 스크롤 포지션 구하기
    // const scrollTop =
    //   this.scrollContentContainerHeight < this.scrollContentHeight
    //     ? -this.scrollContentHeight
    //     : 0;

    // this.setState({
    //   addingData: [...this.state.addingData, ...[newItem]],
    //   scrollTop,
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
      //   const data: any[] = this.state.data;
      //   const _data = data.filter((n, i) => {
      //     return !this.selectedIndexes.includes(i);
      //   });
      //   this.setState({ data: _data });
    }
  };

  onScroll = (param: IDataGrid.IonScrollFunctionParam) => {
    // console.log('onScroll', param);
    const { scrollTop } = param;

    this.setState({
      scrollTop,
    });
  };

  onChangeScrollSize = (param: IDataGrid.IonChangeScrollSizeFunctionParam) => {
    // console.log('onChangeScrollSize', param);
    this.scrollContentContainerHeight = param.scrollContentContainerHeight || 0;
    this.scrollContentHeight = param.scrollContentHeight || 0;
    this.bodyTrHeight = param.bodyTrHeight || 0;
  };

  onChangeSelection = (param: IDataGrid.IonChangeSelectionParam) => {
    // console.log('onChangeSelection', param);
    this.setState({ selection: param });
  };

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

  render() {
    const { width, height, columns, data, scrollTop, selection } = this.state;

    return (
      <Wrapper>
        <Segment padded>
          <h1>Multi Edit</h1>

          <div ref={this.dataGridContainerRef}>
            <DatagridContainer>
              <DataGrid
                style={{ fontSize: '12px' }}
                width={width - 2}
                height={height - 2}
                columns={columns}
                data={data}
                options={{}}
                autofitColumns={true}
                onScroll={this.onScroll}
                scrollTop={scrollTop}
                onChangeScrollSize={this.onChangeScrollSize}
                selection={selection}
                onChangeSelection={this.onChangeSelection}
              />
            </DatagridContainer>
          </div>

          <div style={{ height: 10 }} />
          <Button size="small" onClick={this.addItem}>
            <Icon type="plus" />
            Add item
          </Button>

          <Button size="small" onClick={this.removeItem}>
            <Icon type="minus" />
            Remove item
          </Button>

          <Button size="small" onClick={() => {}}>
            Save
          </Button>

          <div>
            <h4>width</h4>
            <Input value={width} readOnly />
          </div>
          <div>
            <h4>height</h4>
            <Input value={height} readOnly />
          </div>
          <div>
            <h4>scrollTop</h4>
            <Input value={scrollTop} readOnly />
          </div>

          <div>
            <h4>selection</h4>
            <textarea
              style={{ width: '100%', height: 100 }}
              value={JSON.stringify(selection)}
              readOnly
            />
          </div>
        </Segment>
      </Wrapper>
    );
  }
}

export default MultiEdit;
