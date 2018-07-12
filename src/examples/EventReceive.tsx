import * as React from 'react';

import { Button, Divider } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class EventReceive extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const gridData = require('examples/basicData.json');

    this.state = {
      columns: [
        { key: 'id', width: 60, label: 'ID' },
        { key: 'title', width: 200, label: 'Title' },
        { key: 'writer', label: 'Writer' },
        { key: 'date', label: 'Date', formatter: 'date' },
        { key: 'money', label: 'Money', formatter: 'money' },
      ],
      data: gridData,
      options: {
        header: {
          align: 'center',
        },
      },
      eventLog: [],
    };
  }

  receiveEvent = (eventName: string) => {
    this.setState({
      eventLog: [eventName].concat(this.state.eventLog),
    });
  };

  render() {
    return (
      <Wrapper>
        <Segment padded>
          <h1>Event</h1>
          <p>
            onBeforeEvent, onAfterEvent props을 이용하면 keydown, click등의
            이벤트가 발생될때 callback을 받을 수 있습니다.
          </p>
          <DataGrid
            height={this.state.height}
            style={{ fontSize: '12px' }}
            columns={this.state.columns}
            data={this.state.data}
            options={this.state.options}
            onBeforeEvent={(e, eventName) => {
              this.receiveEvent(eventName);
            }}
          />
          <Divider />
          <textarea
            style={{ width: '100%', height: '400px', padding: '10px' }}
            value={this.state.eventLog.join('\n')}
          />
        </Segment>
      </Wrapper>
    );
  }
}

export default EventReceive;
