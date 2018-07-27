[![npm version](https://badge.fury.io/js/axui-datagrid.svg)](https://badge.fury.io/js/axui-datagrid)
[![](https://img.shields.io/npm/dm/axui-datagrid.svg)](https://www.npmjs.com/package/axui-datagrid)

# axui-datagrid

# Install

```bash
npm install axui-datagrid -S
```

# Usage

```typescript jsx
import * as React from 'react';
import { Segment } from 'semantic-ui-react';

import 'axui-datagrid/style.scss';
import { DataGrid } from 'axui-datagrid';

interface IProps {}
interface IState {}
class Basic extends React.Component<IProps, IState> {
  state = {};

  render() {
    let gridData = [];

    for (let i = 1; i < 30; i++) {
      gridData.push({
        a: 'a',
        b: 'b',
        c: 'c',
        saleDt: 'saleDt',
        customer: 'customer',
        saleType: 'saleType',
        price: 100 * i,
        amount: i,
        cost: 100 * i * i,
      });
    }

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
    return (
      <>
        <Segment>
          <h1>Basic</h1>

          <DataGrid
            data={gridData}
            columns={columns}
            options={{
              showLineNumber: true,
            }}
            style={{ fontSize: '12px' }}
          />
        </Segment>
      </>
    );
  }
}

export default Basic;
```

# Version history

* v0.3.0 - Add a new prop loading, loadingData, and onScrollEnd to the DataGrid.
* v0.3.2 - Add a new props onChangeSelected, refactoring StoreProvider
* v0.3.3 - Changed keyboard event firing to be determined by 'onCompositionUpdate' state. In InlineEdit mode.
