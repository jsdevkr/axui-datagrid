import React from 'react';
import renderer from 'react-test-renderer';
import { AXDatagrid } from '../src';

describe('test', () => {
  let component = null;

  const columns = [
    {
      key: 'a',
      label: '필드A',
      width: 80,
      align: 'center'
    },
    { key: 'b', label: '필드B', align: 'center' },
    { key: 'c', label: '필드C', align: 'center' },
    { key: 'price', label: '단가', formatter: 'money', align: 'right' },
    { key: 'amount', label: '수량', formatter: 'money', align: 'right' },
    { key: 'cost', label: '금액', align: 'right', formatter: 'money' },
    { key: 'saleDt', label: '판매일자', align: 'center' },
    { key: 'customer', label: '고객명', align: 'center' },
    { key: 'saleType', label: '판매타입', align: 'center' }
  ];

  const options = {
    lineNumberColumnWidth: 60,
    header: {
      align: 'center'
    },
    showLineNumber: true,
    showRowSelector: false
  };

  let gridData = [];

  const typeGroup = {
    aTypes: [ 'A', 'B', 'C', 'D' ],
    bTypes: [ 'A01', 'A02', 'B01', 'B02', 'C01', 'C02' ],
    cTypes: [ 'Thomas', 'Brant', 'Ben', 'Woo' ],
    priceTypes: [ 500, 1000, 1500, 2000 ],
    amountTypes: [ 1, 2, 4, 5, 10, 20 ],
    saleTypes: [ 'T', 'B', 'H', 'W' ],
    saleDtTypes: [ '2018-01-20', '2018-01-21', '2018-02-01', '2018-02-02', '2018-02-03' ],
    customerTypes: [ '장기영', '황인서', '양용성', '이하종', '김혜미', '홍시아' ]
  };

  const getTypes = ( typeName ) => {
    const types = typeGroup[ typeName ];
    return types[ Math.floor( Math.random() * types.length ) ];
  };

  for ( let i = 1; i < 20; i++ ) {
    const price = getTypes( 'priceTypes' );
    const amount = getTypes( 'amountTypes' );

    gridData.push( {
      a: getTypes( 'aTypes' ), b: getTypes( 'bTypes' ), c: getTypes( 'cTypes' ),
      saleDt: getTypes( 'saleDtTypes' ), customer: getTypes( 'customerTypes' ), saleType: getTypes( 'saleTypes' ),
      price: price, amount: amount, cost: price * amount
    } );
  }

  it('renders correctly', () => {
    component = renderer.create(<AXDatagrid columns={columns} data={gridData} options={options} />);
  });

  it('matches snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});