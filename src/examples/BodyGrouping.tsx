import * as React from 'react';

import { Button } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid, utils } from 'axui-datagrid';
import { IDataGrid } from 'axui-datagrid/common/@types';

class FootSum extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const gridData = require('examples/data/data-grouping.json');

    this.state = {
      height: 300,
      columns: [
        { key: 'id', width: 60, label: 'ID', align: 'center' },
        {
          key: 'title',
          width: 200,
          label: 'Title',
        },
        { key: 'writer', label: 'Writer', align: 'center' },
        { key: 'price', label: 'price', align: 'right', formatter: 'money' },
        { key: 'qty', label: 'Qty', align: 'right', formatter: 'money' },
        {
          key: 'sum',
          label: 'Sum',
          align: 'right',
          formatter: function(formatterData: IDataGrid.IFormatterData) {
            if (!formatterData.item) {
              return '';
            }
            const itemValue = formatterData.item.value as any;
            const price = itemValue.price;
            const qty = itemValue.qty;
            return utils.formatCurrency(price * qty);
          },
        },
        { key: 'description', width: 200, label: 'Description' },
      ],
      body: {
        grouping: {
          by: ['writer'],
          columns: [
            {
              label: () => {
                return 'sub total';
              },
            },
          ],
        },
      },
      footSum: [
        [
          { label: 'footSum', colSpan: 3, align: 'center' },
          {
            key: 'price',
            collector: 'avg',
            formatter: 'money',
            align: 'right',
          },
          {
            key: 'qty',
            collector: 'sum',
            formatter: 'money',
            align: 'right',
          },
          {
            key: 'sum',
            collector: function(collectorData: IDataGrid.ICollectorData) {
              const { data = {} } = collectorData;
              return Object.values(data).reduce(
                (accumulator: number, currentValue: any) =>
                  accumulator + currentValue.price * currentValue.qty,
                0,
              );
            },
            formatter: 'money',
            align: 'right',
          },
        ],
      ],

      data: gridData,
    };
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
      processor[props].call(this);
    } else {
      this.setState(value);
    }
  };

  public render() {
    return (
      <Wrapper>
        <Segment padded>
          <h1>FootSum</h1>
          <p>
            You can use footSum props The value of the footSum column, which
            consists of an array, can be determined using the built-in collector
            (avg, sum) function, Alternatively, you can define your own
            function.
          </p>
          <DataGrid
            width={600}
            height={this.state.height}
            style={{ fontSize: '12px' }}
            columns={this.state.columns}
            footSum={this.state.footSum}
            data={this.state.data}
            options={this.state.options}
          />

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

export default FootSum;
