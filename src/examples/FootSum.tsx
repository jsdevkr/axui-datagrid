import * as React from 'react';

import { Wrapper, Segment } from 'components';
import { DataGrid, utils } from 'axui-datagrid';
import {
  IDataGridFormatterData,
  IDataGridCollectorData,
} from 'axui-datagrid/common/@types';

class FootSum extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const gridData = require('examples/data/data-price.json');

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
          formatter: function(formatterData: IDataGridFormatterData) {
            return utils.formatCurrency(
              formatterData.item.price * formatterData.item.qty,
            );
          },
        },
        { key: 'description', width: 200, label: 'Description' },
      ],
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
            collector: function(collectorData: IDataGridCollectorData) {
              const { data } = collectorData;
              return data.reduce(
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

  public render() {
    return (
      <Wrapper>
        <Segment padded>
          <h1>FootSum</h1>
          <p>
            You can use footSum props. <br></br>
            The value of the footSum column, which consists of an array, can be determined using the built-in collector
            (avg, sum) function. <br></br>
            Alternatively, you can define your own function.
          </p>
          <DataGrid
            height={this.state.height}
            style={{ fontSize: '12px' }}
            columns={this.state.columns}
            footSum={this.state.footSum}
            data={this.state.data}
            options={this.state.options}
          />
        </Segment>
      </Wrapper>
    );
  }
}

export default FootSum;
