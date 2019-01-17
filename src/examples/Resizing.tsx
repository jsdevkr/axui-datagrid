import * as React from 'react';
import styled from 'styled-components';
import mouseEventSubscribe, {
  IMousePosition,
} from '../utils/mouseEventSubscribe';
import { Button, Divider } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

const MyBox = styled.div`
  position: relative;
  background: #eee;

  .resizer {
    position: absolute;
    right: -12px;
    bottom: -12px;
    width: 15px;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
    transform: rotate(45deg);
    cursor: se-resize;
    user-select: none;
  }
`;

class Resizing extends React.Component<any, any> {
  state = {
    boxWidth: 1000,
    boxHeight: 500,
  };

  containerRef: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.containerRef = React.createRef();
  }

  handleColResizerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const {
      left: containerLeft,
      top: containerTop,
    } = this.containerRef.current.getBoundingClientRect();

    mouseEventSubscribe(
      (mpos: IMousePosition) => {
        this.setState({
          boxWidth: mpos.clientX - containerLeft,
          boxHeight: mpos.clientY - containerTop,
        });
      },
      () => {
        // resize 종료 (마우스 업 이벤트 발생.)
      },
    );
  };

  render() {
    const { boxWidth, boxHeight } = this.state;

    const grid = {
      columns: [
        { key: 'id', width: 60, label: 'ID', editor: { type: 'text' } },
        { key: 'title', width: 200, label: 'Title', editor: { type: 'text' } },
        { key: 'writer', label: 'Writer', editor: { type: 'text' } },
        {
          key: 'date',
          label: 'Date',
          formatter: 'date',
          editor: { type: 'text' },
        },
        {
          key: 'money',
          label: 'Money',
          formatter: 'money',
          align: 'right',
          editor: { type: 'text' },
        },
      ],
      data: [
        {
          id: 1,
          title: 'Think like a man of action and act like man of thought.',
          writer: 'Thomas',
          date: '2017-12-05',
          money: 120000,
        },
        {
          id: 2,
          title:
            'Courage is very important. Like a muscle, it is strengthened by use.',
          writer: 'Sofia',
          date: '2017-11-10',
          money: 18000,
        },
        {
          id: 3,
          title:
            'Life is the art of drawing sufficient conclusions from insufficient premises.',
          writer: 'Mondo',
          date: '2017-11-21',
          money: 12000000,
        },
        {
          id: 4,
          title: 'By doubting we come at the truth.',
          writer: 'Brant',
          date: '2017-09-08',
          money: 59000,
        },
        {
          id: 5,
          title:
            'A man that hath no virtue in himself, ever envieth virtue in others.',
          writer: 'Louis',
          date: '2017-09-28',
          money: 100000,
        },
        {
          id: 6,
          title: 'When money speaks, the truth keeps silent.',
          writer: 'Paul',
          date: '2017-12-21',
          money: 50000,
        },
        {
          id: 7,
          title: 'Better the last smile than the first laughter.',
          writer: 'Tiffany',
          date: '2017-03-30',
          money: 60000,
        },
        {
          id: 8,
          title:
            'In the morning of life, work; in the midday, give counsel; in the evening, pray.',
          writer: 'Louis',
          date: '2017-05-08',
          money: 70000,
        },
        {
          id: 9,
          title: 'Painless poverty is better than embittered wealth.',
          writer: 'Paul',
          date: '2017-04-28',
          money: 90000,
        },
        {
          id: 10,
          title: 'A poet is the painter of the soul.',
          writer: 'Tiffany',
          date: '2017-06-06',
          money: 500000,
        },
        {
          id: 11,
          title: 'Error is the discipline through which we advance.',
          writer: 'Benjamin',
          date: '2017-06-22',
          money: 6000000,
        },
        {
          id: 12,
          title: 'Faith without deeds is useless.',
          writer: 'June',
          date: '2017-11-14',
          money: 78000,
        },
        {
          id: 13,
          title: 'Weak things united become strong.',
          writer: 'Cherry',
          date: '2017-01-01',
          money: 67000,
        },
        {
          id: 14,
          title: 'We give advice, but we cannot give conduct.',
          writer: 'Bell',
          date: '2017-02-28',
          money: 1200000,
        },
        {
          id: 15,
          title:
            'Nature never deceives us; it is always we who deceive ourselves.',
          writer: 'Julia',
          date: '2017-08-08',
          money: 10000,
        },
        {
          id: 16,
          title: 'Think like a man of action and act like man of thought.',
          writer: 'Thomas',
          date: '2017-03-08',
          money: 890000,
        },
        {
          id: 17,
          title:
            'Courage is very important. Like a muscle, it is strengthened by use.',
          writer: 'Sofia',
          date: '2017-04-14',
          money: 620000,
        },
        {
          id: 18,
          title:
            'Life is the art of drawing sufficient conclusions from insufficient premises.',
          writer: 'Mondo',
          date: '2017-04-23',
          money: 67000,
        },
        {
          id: 19,
          title: 'By doubting we come at the truth.',
          writer: 'Brant',
          date: '2017-09-03',
          money: 180000,
        },
        {
          id: 20,
          title:
            'A man that hath no virtue in himself, ever envieth virtue in others.',
          writer: 'Louis',
          date: '2017-07-02',
          money: 570000,
        },
        {
          id: 21,
          title: 'When money speaks, the truth keeps silent.',
          writer: 'Paul',
          date: '2017-08-17',
          money: 210000,
        },
        {
          id: 22,
          title: 'Better the last smile than the first laughter.',
          writer: 'Tiffany',
          date: '2017-07-10',
          money: 16000,
        },
        {
          id: 23,
          title:
            'In the morning of life, work; in the midday, give counsel; in the evening, pray.',
          writer: 'Louis',
          date: '2017-08-12',
          money: 89000,
        },
        {
          id: 24,
          title: 'Painless poverty is better than embittered wealth.',
          writer: 'Paul',
          date: '2017-04-01',
          money: 45000,
        },
        {
          id: 25,
          title: 'A poet is the painter of the soul.',
          writer: 'Tiffany',
          date: '2017-05-21',
          money: 6000,
        },
        {
          id: 26,
          title: 'Error is the discipline through which we advance.',
          writer: 'Benjamin',
          date: '2017-10-24',
          money: 990000,
        },
        {
          id: 27,
          title: 'Faith without deeds is useless.',
          writer: 'June',
          date: '2017-11-07',
          money: 100000,
        },
        {
          id: 28,
          title: 'Weak things united become strong.',
          writer: 'Cherry',
          date: '2017-10-06',
          money: 50000,
        },
        {
          id: 29,
          title: 'We give advice, but we cannot give conduct.',
          writer: 'Bell',
          date: '2017-05-01',
          money: 28000,
        },
        {
          id: 30,
          title:
            'Nature never deceives us; it is always we who deceive ourselves.',
          writer: 'Julia',
          date: '2017-03-24',
          money: 360000,
        },
      ],
      options: {},
    };

    return (
      <Wrapper>
        <Segment padded>
          <h1>Resizing</h1>
          <p>
            The user can adjust the data grid screen using the mouse cursor
            located below the right side of the data grid.
          </p>
          <MyBox
            style={{ width: boxWidth, height: boxHeight }}
            ref={this.containerRef}
          >
            <DataGrid
              width={this.state.boxWidth}
              height={this.state.boxHeight}
              style={{ fontSize: '12px' }}
              columns={grid.columns}
              data={grid.data}
              options={grid.options}
            />
            <div
              className="resizer"
              onMouseDownCapture={this.handleColResizerMove}
            >
              ⇆
            </div>
          </MyBox>
        </Segment>
      </Wrapper>
    );
  }
}

export default Resizing;
