import * as React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { SourceCodeEditor } from 'components';
import { Link } from 'react-router-dom';

const multiColumnHeader= ( props ) => (
  <Segment basic padded>
    <Header as='h2' dividing>Multi column header</Header>
    <p>
      column아래에 columns가 있으면 datagrid가 알아서 처리해 줍니다.
    </p>

    <SourceCodeEditor>
      {`
columns: [
  { key: 'id', width: 60, label: 'ID' },
  { key: 'title', width: 200, label: 'Title' },
  {
    label: 'Group', columns: [
    { key: 'writer', label: 'Writer' },
    { key: 'date', label: 'Date', formatter: 'date' }
  ]
  },
  { key: 'money', label: 'Money', formatter: 'money' }
]
`}
    </SourceCodeEditor>

    <p>
      <Link to='/sample/MultiColumnHeader'>MultiColumnHeader 예제보기</Link>
    </p>
  </Segment>
);

export default multiColumnHeader;