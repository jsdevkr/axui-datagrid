import * as React from 'react';
import { Divider } from 'antd';
import { CodeViewer, Wrapper, Segment } from 'components';

const Usage = () => (
  <Wrapper>
    <h1>Usage</h1>

    <Segment>
      <h2>Install</h2>
      <CodeViewer>$ npm i axui-datagrid -S</CodeViewer>
    </Segment>

    <Divider />

    <Segment>
      <h2>Develop</h2>
      <CodeViewer>
        {`
$ cd [my-open-source-folder]
$ git clone https://github.com/axui/datagrid.git
$ npm i
$ npm start
`}
      </CodeViewer>
      <p>You can view axui-datagrid in the browser. http://localhost:3000</p>
    </Segment>

    <Segment>
      <h2>Example</h2>

      <p>
        <a href="https://github.com/axui/datagrid/tree/master/src/examples" target="_blank">
          You can see source code here.</a> and It is one example code for using a datagrid
      </p>
      <CodeViewer>
        {`
import * as React from 'react';

import 'axui-datagrid/style.scss'; // or style.css
import { DataGrid } from 'axui-datagrid';

interface IProps {}
interface IState {
  gridData: any[];
}
class Basic extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    let gridData: any[] = [];

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
        '장기영',
        '황인서',
        '양용성',
        '이하종',
        '김혜미',
        '홍시아',
      ],
    };

    const getTypes = (typeName: string) => {
      const types = typeGroup[typeName];
      return types[Math.floor(Math.random() * types.length)];
    };

    for (let i = 1; i < 30; i++) {
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
      gridData: gridData,
    };
  }

  render() {
    const columns = [
      {
        key: 'a',
        label: '필드A',
        width: 50,
        align: 'center',
      },
      { key: 'b', label: '필드B', align: 'center', editor: { type: 'text' } },
      { key: 'c', label: '필드C', align: 'center', editor: { type: 'text' } },
      { key: 'price', label: '단가', formatter: 'money', align: 'right' },
      {
        key: 'amount',
        width: 50,
        label: '수량',
        formatter: 'money',
        align: 'right',
      },
      { key: 'cost', label: '금액', align: 'right', formatter: 'money' },
      { key: 'saleDt', label: '판매일자', align: 'center' },
      {
        key: 'customer',
        label: '고객명',
        align: 'center',
        editor: { type: 'text' },
      },
      { key: 'saleType', label: '판매타입', align: 'center' },
    ];
    const { gridData } = this.state;
    return (
      <>
          <h1>Basic</h1>

          <DataGrid
            data={gridData}
            columns={columns}
            options={{
              showLineNumber: true,
              showRowSelector: true,
              asidePanelWidth: 900,
              columnKeys: { deleted: 'D' },
              header: {
                clickAction: 'sort',
              },
            }}
            style={{ fontSize: '12px' }}
          />
      </>
    );
  }
}

export default Basic;

`}
      </CodeViewer>
    </Segment>
  </Wrapper>
);

export default Usage;
