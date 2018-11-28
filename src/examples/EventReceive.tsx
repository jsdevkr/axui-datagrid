import * as React from 'react';

import { Divider } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class EventReceive extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const gridData = require('examples/data/data-basic.json');

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
            If you define the onBeforeEvent or the onAfterEvent attributes on
            DataGrid tag, you can get a callback before processing particular
            events or after. And the events are 'keyup', 'keydown', 'wheel'.
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
