import * as React from 'react';

import { Button, Divider, Form, Select } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid, utils } from 'axui-datagrid';

const columnsTypeA = [
  { key: 'id', width: 60, label: 'ID', align: 'center' },
  { key: 'title', width: 200, label: 'Title' },
  { key: 'writer', label: 'Writer', align: 'center' },
  { key: 'date', label: 'Date', align: 'center', formatter: 'date' },
  { key: 'money', label: 'Money', align: 'right', formatter: 'money' },
];
const columnsTypeB = [
  { key: 'money', label: 'Money', align: 'right', formatter: 'money' },
  { key: 'date', label: 'Date', align: 'center', formatter: 'date' },
  { key: 'writer', label: 'Writer', align: 'center' },
  { key: 'title', width: 200, label: 'Title' },
  { key: 'id', width: 60, label: 'ID', align: 'center' },
  { key: 'title', width: 200, label: 'Title' },
  { key: 'writer', label: 'Writer', align: 'center' },
  { key: 'date', label: 'Date', align: 'center', formatter: 'date' },
  { key: 'money', label: 'Money', align: 'right', formatter: 'money' },
];

class FrozenColumnRow extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const gridData = require('examples/basicData.json');

    this.state = {
      columns: columnsTypeA,
      data: gridData,
      options: {},
    };
  }

  changeConfig = (props: any, value: any) => {
    const processor = {
      setHeight: () => {
        this.setState({
          height: value,
        });
      },
      setOptions: () => {
        this.setState({
          options: utils.mergeAll({}, this.state.options, value),
        });
      },
      setColumns: (columnsType: string) => {
        this.setState({
          columns: columnsType === 'A' ? columnsTypeA : columnsTypeB,
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
    const { height, columns, data, options } = this.state;

    return (
      <Wrapper>
        <Segment padded>
          <h1>Change Columns</h1>
          <p>
            This is an example of changing the columns props in the datagrid.
          </p>
          <DataGrid
            height={height}
            style={{ fontSize: '12px' }}
            columns={columns}
            data={data}
            options={options}
          />

          <Divider />

          <Button
            type="primary"
            onClick={() => this.changeConfig('setColumns', 'A')}
          >
            set columns type A
          </Button>

          <Button
            type="primary"
            onClick={() => this.changeConfig('setColumns', 'B')}
          >
            set columns type B
          </Button>

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
            height : 400"
          </Button>
          <Button
            type="primary"
            onClick={() => this.changeConfig('setHeight', 500)}
          >
            height : 500"
          </Button>
        </Segment>
      </Wrapper>
    );
  }
}

export default FrozenColumnRow;
