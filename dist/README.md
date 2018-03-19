[![npm version](https://badge.fury.io/js/axui-datagrid.svg)](https://badge.fury.io/js/axui-datagrid)
[![](https://img.shields.io/npm/dm/axui-datagrid.svg)](https://www.npmjs.com/package/axui-datagrid)

# axui-datagrid

# Install

```
npm install axui-datagrid -S
```

# Usage
```js
import * as React from 'react';
import { AXDatagrid } from 'axui-datagrid';


export class Datagrid extends React.Component<any, any> {
  constructor( props ) {
    super( props );

    this.state = {
      columns: [
        { key: 'id', width: 60, label: 'ID', align: 'center' },
        { key: 'title', width: 200, label: 'Title', formatter: 'MY_FORMATTER'},
        { key: 'writer', label: 'Writer', align: 'center'},
        { key: 'date', label: 'Date', align: 'center', formatter: 'date'},
        { key: 'money', label: 'Money', align: 'right', formatter: 'money'}
      ],
      data: [
        {id: 1, title: '인생은 해파에게조차 아름답고 장엄하다.', writer: '장기영', date: '20171205123000', money: 1289301823}
      ]
    }
  }

  public render() {
    
    return (
      <div>
          <AXDatagrid
            height={this.state.height}
            columns={this.state.columns}
            data={this.state.data}
          />
      </div>
    )
  }
}
```
