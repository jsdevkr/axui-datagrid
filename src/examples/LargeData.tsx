import * as React from 'react';

import { Button, Divider } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class LargeData extends React.Component<any, any> {
  dataGridContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    let gridData = [];

    const typeGroup = {
      aTypes: ['A', 'B', 'C', 'D'],
      bTypes: ['A01', 'A02', 'B01', 'B02', 'C01', 'C02'],
      cTypes: ['Thomas', 'Brant', 'Ben', 'Woo'],
      priceTypes: [500, 1000, 1500, 2000],
      amountTypes: [1, 2, 4, 5, 10, 20],
      saleTypes: ['T', 'B', 'H', 'W'],
      saleDtTypes: [
        '2018-01-20',
        '2018-01-21',
        '2018-02-01',
        '2018-02-02',
        '2018-02-03',
      ],
      customerTypes: [
        'TOM',
        'BRANT',
        'BENJAMIN',
        'BILL',
        'KELLY',
        'CIA',
        'ALAIN',
        'ROBB',
        'ISSAC',
        'ELLIE',
        'PAUL',
      ],
    };

    const getTypes = (typeName: string) => {
      const types = typeGroup[typeName];
      return types[Math.floor(Math.random() * types.length)];
    };

    for (let i = 1; i < 10000; i++) {
      const price = getTypes('priceTypes');
      const amount = getTypes('amountTypes');

      gridData.push({
        a: getTypes('aTypes'),
        b: getTypes('bTypes'),
        c: getTypes('cTypes'),
        saleDt: getTypes('saleDtTypes'),
        customer: getTypes('customerTypes'),
        saleType: getTypes('saleTypes'),
        price: price,
        amount: amount,
        cost: price * amount,
      });
    }

    this.state = {
      width: 300,
      height: 300,
      columns: [
        {
          key: 'a',
          label: 'Field A',
          width: 80,
          align: 'center',
        },
        { key: 'b', label: 'Field B', align: 'center' },
        { key: 'c', label: 'Field C', align: 'center' },
        { key: 'price', label: 'Price', formatter: 'money', align: 'right' },
        { key: 'amount', label: 'Qty', formatter: 'money', align: 'right' },
        { key: 'cost', label: 'Sum', align: 'right', formatter: 'money' },
        { key: 'saleDt', label: 'Sale Date', align: 'center' },
        { key: 'customer', label: 'Customer', align: 'center' },
        { key: 'saleType', label: 'Sale Type', align: 'center' },
      ],
      data: gridData,
      options: {
        lineNumberColumnWidth: 60,
        header: {
          align: 'center',
        },
        showLineNumber: true,
        showRowSelector: false,
      },
    };

    this.dataGridContainerRef = React.createRef();
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

  render() {
    const { width, height, columns, data, options } = this.state;

    return (
      <Wrapper>
        <Segment padded>
          <h1>LargeData</h1>
          <p>
            To represent large amounts of data in the browser, a large amount of
            HTML nodes Required. However, if you represent a large amount of
            HTML nodes in your browser The browser will slow down and
            inconvenience you. Because axui-datagrid only prints the areas that
            need to be displayed in the grid container area, it can process
            large amounts of data quickly with ease.
          </p>

          <div ref={this.dataGridContainerRef}>
            <DataGrid
              width={width}
              height={height}
              style={{ fontSize: '12px' }}
              columns={columns}
              data={data}
              options={options}
            />
          </div>

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

export default LargeData;
