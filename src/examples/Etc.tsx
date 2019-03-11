import * as React from 'react';
import styled from 'styled-components';
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
      columns: [
        {
          autoIncrement: true,
          displaySize: 5,
          index: 0,
          key: '0',
          label: 'city_id',
          name: 'city_id',
          nullable: false,
          type: 'SMALLINT UNSIGNED',
          width: 120,
        },
        {
          autoIncrement: false,
          displaySize: 50,
          index: 1,
          key: '1',
          label: 'city',
          name: 'city',
          nullable: false,
          type: 'VARCHAR',
          width: 120,
        },
      ],
      data: [['A', 'B', 'C<b>a</b>'], ['A', 'B', 'C<b>a</b>']],
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
              width={this.state.boxWidth}
              height={this.state.boxHeight}
              style={{ fontSize: '12px' }}
              columns={grid.columns}
              data={grid.data}
              options={{
                lineNumberColumnWidth: 50,
                scroller: {
                  theme: 'solid',
                  horizontalScrollerWidth: 50,
                  padding: 0,
                  width: 3,
                  height: 5,
                },
              }}
              status={<div>{`Total Record ${grid.data.length}`}</div>}
            />
          </MyBox>
        </Segment>
      </Wrapper>
    );
  }
}

export default Etc;
