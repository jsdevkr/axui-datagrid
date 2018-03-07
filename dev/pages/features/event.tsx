import * as React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { SourceCodeEditor } from 'components';
import { Link } from 'react-router-dom';

const eventCompatibility = props => (
  <Segment basic padded>
    <Header as="h2" dividing>
      Browser event compatibility
    </Header>
    <p>
      onBeforeEvent, onAfterEvent props을 이용하면 keydown, click등의 이벤트가
      발생될때 callback을 받을 수 있습니다.
    </p>

    <SourceCodeEditor>
      {`
<AXDatagrid
  height={this.state.height}
  style={{ fontSize: '12px' }}
  columns={this.state.columns}
  data={this.state.data}
  options={this.state.options}
  onBeforeEvent={( e, eventName ) => {
    this.receiveEvent(eventName);
  }}
  onAfterEvent={( e, eventName ) => {
    this.receiveEvent(eventName);
  }}
/>
      `}
    </SourceCodeEditor>
    <p>
      <Link to="/sample/EventReceive">EventReceive 예제보기</Link>
    </p>
  </Segment>
);

export default eventCompatibility;
