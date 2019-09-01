import * as React from 'react';

import { Button, Divider } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class LargeData extends React.Component<any, any> {
  dataGridContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      width: 300,
      height: 300,
      columns: [
        {
          key: 'a',
          label: 'Field A',
          width: 50,
          align: 'center',
        },
        { key: 'b', label: 'Field B', align: 'center', width: 50 },
        { key: 'c', label: 'Field C', align: 'center', width: 50 },
        {
          key: 'price',
          label: 'Price',
          formatter: 'money',
          align: 'right',
          width: 50,
        },
        {
          key: 'amount',
          label: 'Qty',
          formatter: 'money',
          align: 'right',
          width: 50,
        },
        {
          key: 'cost',
          label: 'Sum',
          align: 'right',
          formatter: 'money',
          width: 50,
        },
        { key: 'saleDt', label: 'Sale Date', align: 'center', width: 50 },
        { key: 'customer', label: 'Customer', align: 'center', width: 50 },
        { key: 'saleType', label: 'Sale Type', align: 'center', width: 50 },
      ],
      data: [],
      options: {
        header: {
          align: 'center',
        },
        showLineNumber: true,
        showRowSelector: false,
      },
      loading: false,
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

  makeData = (len: number) => {
    return new Promise((resolve, reject) => {
      let gridData: any = [];

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

      for (let i = 1; i < len; i++) {
        const price = getTypes('priceTypes');
        const amount = getTypes('amountTypes');

        gridData.push({
          value: {
            a: getTypes('aTypes'),
            b: getTypes('bTypes'),
            c: getTypes('cTypes'),
            saleDt: getTypes('saleDtTypes'),
            customer: getTypes('customerTypes'),
            saleType: getTypes('saleTypes'),
            price: price,
            amount: amount,
            cost: price * amount,
          },
        });
      }

      setTimeout(() => {
        resolve(gridData);
      });
    });
  };

  getData = async (len: number) => {
    this.setState({ data: [], loading: true });
    console.log(
      `${new Date().toLocaleTimeString()}:${new Date().getMilliseconds()}`,
      'start getData',
    );

    setTimeout(async () => {
      const gridData = await this.makeData(len);

      console.log(
        `${new Date().toLocaleTimeString()}:${new Date().getMilliseconds()}`,
        'make getData done!',
      );
      this.setState(
        () => ({
          columns: [...this.state.columns],
          data: gridData,
          loading: false,
        }),
        () => {
          console.log(
            `${new Date().toLocaleTimeString()}:${new Date().getMilliseconds()}`,
            'state changed',
          );
        },
      );
    });
  };

  render() {
    const { width, height, columns, data, options, loading } = this.state;

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

          <div
            ref={this.dataGridContainerRef}
            style={{ border: '1px solid #ccc' }}
          >
            <DataGrid
              width={width - 2}
              height={height - 2}
              style={{ fontSize: '12px' }}
              columns={columns}
              data={data}
              dataLength={data.length}
              options={{ ...options, updateAt: new Date() }}
              loading={loading}
              autofitColumns={true}
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

        <Segment>
          <Button onClick={() => this.getData(5000000)}>
            Get data 5,000,000
          </Button>
          <Button onClick={() => this.getData(500000)}>Get data 500,000</Button>
          <Button onClick={() => this.getData(50000)}>Get data 50,000</Button>
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

export default LargeData;
