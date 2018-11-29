import * as React from 'react';

import { Button, Divider, Form, Select } from 'antd';
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

  changeConfig = (props: any, value: any) => {
    const processor = {
      setHeight: () => {
        this.setState({
          height: value,
        });
      },
    };

    if (props in processor) {
      processor[props].call(this, value);
    } else {
      this.setState(value);
    }
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
              if (eventName === 'contextmenu') {
                e.preventDefault();
                // e.stopPropagation();
              }
              this.receiveEvent(eventName);
            }}
          />
          <Divider />
          <textarea
            style={{ width: '100%', height: '400px', padding: '10px' }}
            value={this.state.eventLog.join('\n')}
          />

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
            height : 400"
          </Button>
          <Button
            type="primary"
            onClick={() => this.changeConfig('setHeight', 500)}
          >
            height : 500"
          </Button>
        </Segment>
      </Wrapper>
    );
  }
}

export default EventReceive;
