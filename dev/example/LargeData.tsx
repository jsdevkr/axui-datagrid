import * as React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { AXDatagrid } from 'datagrid-ts/index';

export class LargeData extends React.Component<any, any> {
  constructor( props ) {
    super( props );

    let gridData = [];

    for ( let i = 1; i < 1000; i++ ) {
      gridData.push( {
        id: i, title: 'title ' + i, writer: 'Thomas', date: '2018-01-20', money: 100 * i
      } )
    }

    this.state = {
      height: 400,
      columns: [
        { key: 'id', width: 60, label: 'ID', align: 'center' },
        { key: 'title', width: 100, label: 'Title'},
        { key: 'writer', label: 'Writer', align: 'center'},
        { key: 'date', label: 'Date', align: 'center'},
        { key: 'money', label: 'Money', align: 'right'}
      ],
      data: gridData,
      options: {
        lineNumberColumnWidth: 60,
        header: {
          align: 'center'
        },
        showLineNumber: true,
        showRowSelector: false
      }
    }
  }

  public render() {
    return (
      <Container>
        <Segment basic padded>
          <h1>LargeData</h1>
        </Segment>

        <Segment basic padded>
          <p>
            브라우저에 많은양의 데이터를 표현하기 위해서는 많은양의 HTML 노드가 필요합니다. 하지만 많은 양의 HTML 노드를 브라우저에 표현하게 되면 브라우저의 처리속도가 떨어져
            사용자에게 불편을 주게 됩니다.
            AXUI datagrid는 그리드 컨테이너 영역안에 사용자가 현재 보려는 영역만 출력하는 방식으로 구현되어 아주 많은 양의 데이터를 표현할 수 있습니다.
          </p>
          <AXDatagrid
            height={this.state.height}
            style={{ fontSize: '12px' }}
            columns={this.state.columns}
            data={this.state.data}
            options={this.state.options}
          />
        </Segment>
      </Container>
    )
  }
}