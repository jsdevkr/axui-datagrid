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

class Etc extends React.Component<any, any> {
  state = {
    boxWidth: 600,
    boxHeight: 300,
  };

  containerRef: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.containerRef = React.createRef();
  }

  render() {
    const { boxWidth, boxHeight } = this.state;

    const grid = {
      columns: [],
      data: [],
      options: {},
    };

    return (
      <Wrapper>
        <Segment padded>
          <h1>Etc</h1>
          <MyBox
            style={{ width: boxWidth, height: boxHeight }}
            ref={this.containerRef}
          >
            <DataGrid
              height={this.state.boxHeight}
              style={{ fontSize: '12px' }}
              columns={grid.columns}
              data={grid.data}
              options={grid.options}
            />
          </MyBox>
        </Segment>
      </Wrapper>
    );
  }
}

export default Etc;
