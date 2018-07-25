import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { DataGrid } from '../src/axui-datagrid';

it('renders DataGrid default', () => {
  let gridData: any[] = [];

  const state = {
    height: 300,
    columns: [
      {
        key: 'a',
        label: '필드A',
        width: 80,
        align: 'center',
      },
      { key: 'b', label: '필드B', align: 'center' },
      { key: 'c', label: '필드C', align: 'center' },
      { key: 'price', label: '단가', formatter: 'money', align: 'right' },
      { key: 'amount', label: '수량', formatter: 'money', align: 'right' },
      { key: 'cost', label: '금액', align: 'right', formatter: 'money' },
      { key: 'saleDt', label: '판매일자', align: 'center' },
      { key: 'customer', label: '고객명', align: 'center' },
      { key: 'saleType', label: '판매타입', align: 'center' },
    ],
    data: gridData,
    options: {
      lineNumberColumnWidth: 60,
      showLineNumber: true,
      showRowSelector: false,
    },
  };

  const tree = renderer
    .create(
      <DataGrid
        columns={state.columns}
        height={state.height}
        data={state.data}
        options={state.options}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
