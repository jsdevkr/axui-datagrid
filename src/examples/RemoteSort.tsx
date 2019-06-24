import * as React from 'react';
import styled from 'styled-components';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';
import { IDataGrid } from 'axui-datagrid/common/@types';
import { Divider, Button, Alert } from 'antd';

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

class RemoteSort extends React.Component<any, any> {
  state = {
    boxWidth: 600,
    boxHeight: 300,
    sortInfos: [],
  };

  containerRef: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.containerRef = React.createRef();
  }

  render() {
    const { boxWidth, boxHeight, sortInfos } = this.state;

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
          displaySize: 5,
          index: 1,
          key: '1',
          label: 'city_name',
          name: 'city_name',
          nullable: false,
          type: 'SMALLINT UNSIGNED',
          width: 120,
        },
        {
          autoIncrement: false,
          displaySize: 50,
          index: 2,
          key: '2',
          label: 'city',
          name: 'city',
          nullable: false,
          type: 'VARCHAR',
          width: 120,
          formatter: (param: IDataGrid.IFormatterData) => {
            if (typeof param.value === 'string') {
              return param.value;
            } else {
              return param.value.v;
            }
          },
        },
      ],
      data: [
        ['A', 'C', { v: 'TEST' }],
        ['A', 'B', 'C<b>a</b>'],
        ['A', 'B', 'C<b>a</b>'],
        ['A', 'B', 'C<b>a</b>'],
        ['A', 'B', 'C<b>a</b>'],
        ['A', 'B', 'C<b>a</b>'],
        ['A', 'B', 'C<b>a</b>'],
        ['A', 'B', 'C<b>a</b>'],
        ['A', 'B', 'C<b>a</b>'],
        ['A', 'B', 'C<b>a</b>'],
        ['A', 'B', 'C<b>a</b>'],
      ],
    };

    return (
      <Wrapper>
        <Segment padded>
          <h1>Etc</h1>
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
              columns={grid.columns}
              data={grid.data}
              options={{
                header: {
                  remoteSort: true,
                },
                lineNumberStartAt: 100,
                scroller: {
                  theme: 'solid',
                  horizontalScrollerWidth: 50,
                  padding: 2,
                  width: 9,
                  height: 9,
                },
                disableClipboard: true,
              }}
              status={<div>{`Total Record ${grid.data.length}`}</div>}
              onError={(err, evt) => {
                console.log(err);
              }}
              autofitColumns={false}
              onSort={param => {
                this.setState({
                  sortInfos: param.sortInfos,
                });
              }}
              sortInfos={sortInfos}
            />
          </MyBox>

          <Divider />

          <Alert
            type="warning"
            message={'sortInfos'}
            description={JSON.stringify(sortInfos)}
          />

          <Divider />

          <Button
            onClick={() => {
              this.setState({ sortInfos: [{ key: '0', orderBy: 'asc' }] });
            }}
          >
            sort 0, asc
          </Button>
          <Button
            onClick={() => {
              this.setState({ sortInfos: [{ key: '0', orderBy: 'desc' }] });
            }}
          >
            sort 0, desc
          </Button>
          <Button
            onClick={() => {
              this.setState({ sortInfos: [{ key: '1', orderBy: 'desc' }] });
            }}
          >
            sort 1, desc
          </Button>
          <Button
            onClick={() => {
              this.setState({
                sortInfos: [
                  { key: '0', orderBy: 'desc' },
                  { key: '2', orderBy: 'desc' },
                ],
              });
            }}
          >
            sort 0, 2, desc
          </Button>
        </Segment>
      </Wrapper>
    );
  }
}

export default RemoteSort;
