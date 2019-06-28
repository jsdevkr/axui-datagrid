import * as React from 'react';

import { Button, Divider } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class EventReceive extends React.Component<any, any> {
  dataGridContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    const gridData = require('examples/data/data-basic.json');

    this.state = {
      width: 300,
      height: 300,
      columns: [
        { key: 'id', width: 60, label: 'ID' },
        { key: 'title', width: 200, label: 'Title' },
        { key: 'writer', label: 'Writer' },
        { key: 'date', label: 'Date', formatter: 'date' },
        { key: 'money', label: 'Money', formatter: 'money', align: 'right' },
      ],
      data: gridData,
      options: {
        header: {
          align: 'center',
        },
      },
      eventLog: [],
      scrollTop: 0,
    };

    this.dataGridContainerRef = React.createRef();
  }

  receiveEvent = (eventName: string) => {
    this.setState({
      eventLog: [eventName].concat(this.state.eventLog).slice(0, 20),
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
    const { width, height, columns, data, options } = this.state;

    return (
      <Wrapper>
        <Segment padded>
          <h1>Event</h1>
          <p>
            If you define the onBeforeEvent or the onAfterEvent attributes on
            DataGrid tag, you can get a callback before processing particular
            events or after. And the events are 'keyup', 'keydown', 'wheel'.
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
              options={options}
              scrollTop={screenTop}
              onScroll={({ sRowIndex, eRowIndex, scrollTop }) => {
                this.setState({ scrollTop });
                this.receiveEvent(
                  `onScroll sRowIndex : ${sRowIndex}, eRowIndex : ${eRowIndex}`,
                );
              }}
              onBeforeEvent={({ e, eventName }) => {
                this.receiveEvent(eventName);
              }}
              onRightClick={({ e, item, value, focusedRow, focusedCol }) => {
                e.preventDefault();
                // e.stopPropagation();
                // item : item of list, value: keyvalue of item
                console.log(item, value, focusedRow, focusedCol);
              }}
              onChangeSelection={selection => {
                console.log(selection);
              }}
              onClick={({ e, item, value, rowIndex, colIndex }) => {
                console.log(item, value);
                this.receiveEvent(
                  `onClick value: ${value}, ri : ${rowIndex}, ci : ${colIndex}`,
                );
              }}
            />
          </div>
          <Divider />
          <textarea
            style={{ width: '100%', height: '400px', padding: '10px' }}
            value={this.state.eventLog.join('\n')}
            readOnly
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
            height : 400
          </Button>
          <Button
            type="primary"
            onClick={() => this.changeConfig('setHeight', 500)}
          >
            height : 500
          </Button>
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

export default EventReceive;
