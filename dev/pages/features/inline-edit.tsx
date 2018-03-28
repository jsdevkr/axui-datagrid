import * as React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { SourceCodeEditor } from 'components';
import { Link } from 'react-router-dom';

const inlineEdit = props => (
  <Segment basic padded>
    <Header as="h2" dividing>
      Inline edit
    </Header>
    <p>column에 editor를 선언해주면 inline edit기능을 사용할 수 있습니다.</p>

    <SourceCodeEditor>
      {`
{ key: 'title', width: 200, label: 'Title', editor: { type: 'text' } }
      `}
    </SourceCodeEditor>
    <p>
      <Link to="/sample/InlineEdit">InlineEdit 예제보기</Link>
    </p>
  </Segment>
);

export default inlineEdit;
