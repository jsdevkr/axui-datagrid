import * as React from 'react';
import { Segment } from 'semantic-ui-react';

import 'axui-datagrid/style.scss';
import { DataGrid } from 'axui-datagrid';

interface IProps {}
interface IState {
  emails: string[];
}
class Basic extends React.Component<IProps, IState> {
  state = {
    emails: [],
  };

  render() {
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

    const columns = [
      {
        key: 'a',
        label: '필드A',
        width: 50,
        align: 'center',
      },
      { key: 'b', label: '필드B', align: 'center' },
      { key: 'c', label: '필드C', align: 'center' },
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
      { key: 'customer', label: '고객명', align: 'center' },
      { key: 'saleType', label: '판매타입', align: 'center' },
    ];
    return (
      <>
        <Segment>
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
        </Segment>
      </>
    );
  }
}

export default Basic;
