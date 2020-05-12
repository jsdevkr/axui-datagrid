import * as React from 'react';

import { Button, Input } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';
import { IDataGrid } from 'axui-datagrid/common/@types';

import styled from 'styled-components';
import { PlusCircleFilled, MinusCircleFilled } from '@ant-design/icons';
import { arrayTypedData } from './data/arrayTypedData';

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
  scrollLeft: number;
  columns: IDataGrid.IColumn[];
  data: IDataGrid.IData;
  selection: IDataGrid.ISelection;
  sortInfos: IDataGrid.ISortInfo[];
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

    const editor: IDataGrid.cellEditorFunction = ({
      value,
      li,
      item,
      update,
      cancel,
      blur,
      focus,
      keyAction,
    }) => {
      return (
        <Input
          style={{ width: '100%' }}
          autoFocus
          defaultValue={value.v}
          onBlur={e => {
            cancel();
          }}
          onKeyDown={e => {
            if (e.which === 9) {
              e.preventDefault();
              keyAction(
                'EDIT_NEXT',
                value.v !== e.currentTarget.value
                  ? { ...value, changed: e.currentTarget.value }
                  : undefined,
                { e },
              );
            } else if (e.which === 27) {
              e.preventDefault();
              cancel();
            } else if (e.which === 13) {
              e.preventDefault();
              if (value.v !== e.currentTarget.value) {
                update({ ...value, changed: e.currentTarget.value });
              } else {
                blur();
              }
            }
          }}
        />
      );
    };
    const formatter: IDataGrid.formatterFunction = ({ value, item }) => {
      return value ? value.v : '';
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
        formatter,
      },
      {
        key: '3',
        label: 'column 3',
        editor: { activeType: 'dblclick', render: editor },
        formatter,
      },
      {
        key: '4',
        label: 'column 4',
        editor: { activeType: 'dblclick', render: editor },
        formatter,
      },
      {
        key: '5',
        label: 'column 5',
        editor: { activeType: 'dblclick', render: editor },
        formatter,
      },
      {
        key: '6',
        label: 'column 6',
        editor: { activeType: 'dblclick', render: editor },
        formatter,
      },
      {
        key: '7',
        label: 'column 7',
        editor: { activeType: 'dblclick', render: editor },
        formatter,
      },
      {
        key: '8',
        label: 'column 8',
        editor: { activeType: 'dblclick', render: editor },
        formatter,
      },
      {
        key: '9',
        label: 'column 9',
        editor: { activeType: 'dblclick', render: editor },
        formatter,
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
      data: arrayTypedData,
      selection,
      sortInfos: [],
    };

    this.dataGridContainerRef = React.createRef();
  }

  addItem = () => {
    const { data } = this.state;
    const dataLength = Object.keys(data).length;
    const newItem: IDataGrid.IData = {
      [dataLength]: {
        type: 'C',
        value: [
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
        ],
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
    const { selection, data } = this.state;
    if (selection.rows && selection.rows.length) {
      const dataLength = Object.keys(data).length;

      selection.rows.forEach(li => {
        if (data instanceof Map) {
          const item = data.get(li);

          if (item) {
            if (item.type === 'C') {
              data.delete(li);
            } else {
              item.type = 'D';
            }

            for (let i = li; i < dataLength - 1; i++) {
              const nextItem = data.get(i + 1);
              if (nextItem) {
                data.set(i, nextItem);
                data.delete(i + 1);
              }
            }
          }
        } else {
          const item = data[li];
          if (item) {
            if (item.type === 'C') {
              delete data[li];
            } else {
              item.type = 'D';
            }

            for (let i = li; i < dataLength - 1; i++) {
              data[i] = data[i + 1];
              delete data[i + 1];
            }
          }
        }
      });

      this.setState({ data: { ...data } });
    }
  };

  onEditItem = (param: IDataGrid.IonEditParam) => {
    try {
      const { li, col: { key: colKey = '' } = {}, value } = param;
      const { data } = this.state;

      const originalItemType = data[li].type;
      if (originalItemType === 'C') {
        const editDataItem: IDataGrid.IDataItem = { ...data[li] };
        editDataItem.value[colKey] = { v: value.changed };

        this.setState({
          data: { ...data, [li]: editDataItem },
        });
      } else {
        const editDataItem: IDataGrid.IDataItem = {
          type: 'U',
          value: data[li].value,
          changed: { ...data[li].changed, [colKey]: { v: value.changed } },
        };
        this.setState({
          data: { ...data, [li]: editDataItem },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  onScroll = (param: IDataGrid.IonScrollFunctionParam) => {
    // console.log('onScroll', param);
    const { scrollTop, scrollLeft } = param;

    this.setState({
      scrollTop,
      scrollLeft,
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

  onChangeColumns = (param: IDataGrid.IonChangeColumnParam) => {
    console.log(param);
    const { columns } = this.state;
    const { colGroup = [] } = param;
    colGroup.forEach(col => {
      columns[col.colIndex || 0].width = col.width;
    });
    this.setState({ columns });
  };

  getDataGridContainerRect = (e?: Event) => {
    if (this.dataGridContainerRef.current) {
      const {
        width,
      } = this.dataGridContainerRef.current.getBoundingClientRect();
      this.setState({ width });
    }
  };

  onSort = (param: IDataGrid.IonSortParam) => {
    const { data } = this.state;
    const { sortInfos } = param;

    const getValueByKey = function (_item: any, _key: string) {
      return _item.value[_key].v || '';
    };

    const newData = Object.values(data)
      .sort((a, b) => {
        for (let i = 0; i < sortInfos.length; i++) {
          let aValue = getValueByKey(a, sortInfos[i].key!);
          let bValue = getValueByKey(b, sortInfos[i].key!);

          if (typeof aValue !== typeof bValue) {
            aValue = '' + aValue;
            bValue = '' + bValue;
          }
          if (aValue < bValue) {
            return sortInfos[i].orderBy === 'asc' ? -1 : 1;
          } else if (aValue > bValue) {
            return sortInfos[i].orderBy === 'asc' ? 1 : -1;
          }
        }
        return 0;
      })
      .reduce((obj, item, idx) => {
        // convert array to object
        obj[idx] = item;
        return obj;
      }, {});

    // console.log(newData);

    this.setState({ sortInfos, data: newData });
  };

  componentDidMount() {
    this.getDataGridContainerRect();
    window.addEventListener('resize', this.getDataGridContainerRect, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDataGridContainerRect);
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
      sortInfos,
    } = this.state;

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
                dataLength={Object.keys(data).length}
                options={{}}
                onScroll={this.onScroll}
                scrollTop={scrollTop}
                scrollLeft={scrollLeft}
                onChangeScrollSize={this.onChangeScrollSize}
                selection={selection}
                onChangeSelection={this.onChangeSelection}
                onChangeColumns={this.onChangeColumns}
                sortInfos={sortInfos}
                onSort={this.onSort}
                onEdit={this.onEditItem}
              />
            </DatagridContainer>
          </div>

          <div style={{ height: 10 }} />
          <Button size="small" onClick={this.addItem}>
            <PlusCircleFilled />
            Add item
          </Button>

          <Button size="small" onClick={this.removeItem}>
            <MinusCircleFilled />
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

          <div>
            <h4>columns</h4>
            <textarea
              style={{ width: '100%', height: 100 }}
              value={JSON.stringify(columns)}
              readOnly
            />
          </div>

          <div>
            <h4>data</h4>
            <textarea
              style={{ width: '100%', height: 200 }}
              value={JSON.stringify(data).replace(/},"/g, '},\n"')}
              readOnly
            />
          </div>
        </Segment>
      </Wrapper>
    );
  }
}

export default MultiEdit;
