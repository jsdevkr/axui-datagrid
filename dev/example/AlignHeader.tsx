import * as React from 'react';
import { Button, Container, Divider, Segment } from 'semantic-ui-react';
import { AXDatagrid } from 'datagrid-ts/index';

export class AlignHeader extends React.Component<any, any> {
  constructor( props ) {
    super( props );

    const gridData = [
      { id: 1, title: '인생은 해파에게조차 아름답고 장엄하다.', writer: '장기영', date: '20171205123000', money: 1289301823 },
      { id: 2, title: '이 세상에 영원한 것은 아무것도 없다. 우리의 문제들도 그렇다.', writer: '장서우', date: '2017-10-10', money: 12000 },
      { id: 3, title: '생각은 너무 많고 느끼는 것은 너무 적다.', writer: '이영희', date: '2017-10-10', money: 12000000 },
      { id: 4, title: '실패는 중요하지 않다. ', writer: '황인서', date: '2017-10-10', money: 59800 },
      { id: 5, title: '성공한 사람의 인생은 성공한 후에 포장되어 평범한 사람의 인생을 망친다.', writer: '황세진', date: '2017-10-10' },
      { id: 6, title: '너무 고르는 자가 가장 나쁜 것을 갖는다.', writer: '황현진', date: '2017-10-10' },
      { id: 7, title: '위대한 사람은 위대한 꿈을, 평범한 사람은 평범한 꿈을 가지고 있다.', writer: '이서연', date: '2017-10-10' },
      { id: 8, title: '상대방이 만만하게 보인다면 그 사람은 당신을 배려하고 있는 것이다.', writer: '황세진', date: '2017-10-10' },
      { id: 9, title: '짜장면 먹고싶은 사람에게 짬뽕 100번 사줘도 고맙다는 말 못듣는다.', writer: '황현진', date: '2017-10-10' },
      { id: 10, title: '니가 아는 거라곤 니가 다 아는줄 아는 것 뿐이다.', writer: '이서연', date: '2017-10-10' }
    ];

    this.state = {
      columns: [
        { key: 'id', width: 60, label: 'ID', align: 'center' },
        { key: 'title', width: 200, label: 'Title' },
        { key: 'writer', label: 'Writer', align: 'center' },
        { key: 'date', label: 'Date', align: 'center', formatter: 'date' },
        { key: 'money', label: 'Money', align: 'right', formatter: 'money' }
      ],
      data: gridData,
      options: {
      }
    }
  }

  public changeConfig( props ) {

    const processor = {
      'alignLeft': function () {
        this.setState( {
          options: {
            header: {
              align: 'left'
            }
          }
        } );
      },
      'alignCenter': function () {
        this.setState( {
          options: {
            header: {
              align: 'center'
            }
          }
        } );
      },
      'alignRight': function () {
        this.setState( {
          options: {
            header: {
              align: 'right'
            }
          }
        } );
      }
    };

    if ( props in processor ) {
      processor[ props ].call( this );
    } else {
      this.setState( props );
    }

  }

  public render() {
    return (
      <Container>
        <Segment basic padded>
          <h1>AlignHeader</h1>
        </Segment>

        <Segment basic padded>
          <AXDatagrid
            height={this.state.height}
            style={{ fontSize: '12px' }}
            columns={this.state.columns}
            data={this.state.data}
            options={this.state.options}
          />

          <Divider />
          <Button.Group basic size='tiny'>
            <Button onClick={e => this.changeConfig( 'alignLeft' )} content='align left' />
            <Button onClick={e => this.changeConfig( 'alignCenter' )} content='align center' />
            <Button onClick={e => this.changeConfig( 'alignRight' )} content='align right' />
          </Button.Group>
        </Segment>
      </Container>
    )
  }
}