import * as React from 'react';

import { Button, Divider, Form, Select } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid, utils } from 'axui-datagrid';

class FrozenColumnRow extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const gridData = require('examples/data/data-basic.json');

    this.state = {
      columns: [
        { key: 'id', width: 60, label: 'ID', align: 'center' },
        { key: 'title', width: 200, label: 'Title' },
        { key: 'writer', label: 'Writer', align: 'center' },
        { key: 'date', label: 'Date', align: 'center', formatter: 'date' },
        { key: 'money', label: 'Money', align: 'right', formatter: 'money' },
        { key: 'id', width: 60, label: 'ID', align: 'center' },
        { key: 'title', width: 200, label: 'Title' },
        { key: 'writer', label: 'Writer', align: 'center' },
        { key: 'date', label: 'Date', align: 'center', formatter: 'date' },
        { key: 'money', label: 'Money', align: 'right', formatter: 'money' },
      ],
      data: gridData,
      options: {
        frozenColumnIndex: 2,
        frozenRowIndex: 2,
      },
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
    };

    if (props in processor) {
      processor[props].call(this);
    } else {
      this.setState(value);
    }
  };

  public render() {
    const { height, columns, data, options } = this.state;

    return (
      <Wrapper>
        <Segment padded>
          <h1>Frozen Column {'&'} Row</h1>
          <p>
            Users can dynamically specify options.frozenColumnIndex and options.
            frozenRowIndex to set the frame fixed area. Then, The row and column
            areas can be specified in the fixed size chosen by the user.
          </p>
          <DataGrid
            width={600}
            height={height}
            style={{ fontSize: '12px' }}
            columns={columns}
            data={data}
            options={options}
          />

          <Divider />

          <Form layout="inline">
            <Form.Item id={'row'} label={'Row'}>
              <Select
                labelInValue
                defaultValue={
                  {
                    key: '' + this.state.options.frozenRowIndex + ' row',
                  } as any
                }
                onChange={(value: any) => {
                  this.changeConfig('setOptions', {
                    frozenRowIndex: Number(value.key),
                  });
                }}
              >
                {this.state.data.map((some: any, i: number) => {
                  return (
                    <Select.Option key="" value={i}>
                      {i} row
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item id={'col'} label={'Column'}>
              <Select
                labelInValue
                defaultValue={
                  {
                    key: '' + this.state.options.frozenColumnIndex + ' column',
                  } as any
                }
                onChange={(value: any) => {
                  this.changeConfig('setOptions', {
                    frozenColumnIndex: Number(value.key),
                  });
                }}
              >
                {this.state.columns.map((some: any, i: number) => {
                  return (
                    <Select.Option key="" value={i}>
                      {i} column
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>

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
}

export default FrozenColumnRow;
