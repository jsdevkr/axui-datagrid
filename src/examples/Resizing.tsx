import * as React from 'react';
import styled from 'styled-components';
import mouseEventSubscribe, {
  IMousePosition,
} from '../utils/mouseEventSubscribe';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';
import { basicData } from './data/basicData';

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
    boxWidth: 500,
    boxHeight: 300,
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
    data: basicData,
    options: {},
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
    const { boxWidth, boxHeight, columns, data } = this.state;

    return (
      <Wrapper>
        <Segment padded>
          <h1>Resizing</h1>
          <p>
            The user can adjust the data grid screen using the mouse cursor
            located below the right side of the data grid.
          </p>
          <MyBox
            style={{
              width: boxWidth,
              height: boxHeight,
              border: '1px solid #ccc',
            }}
            ref={this.containerRef}
          >
            <DataGrid
              width={this.state.boxWidth - 2}
              height={this.state.boxHeight - 2}
              style={{ fontSize: '12px' }}
              columns={columns}
              data={data}
              dataLength={data.length}
              options={{}}
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
