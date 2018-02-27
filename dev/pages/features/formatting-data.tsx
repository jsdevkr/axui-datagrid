import * as React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { SourceCodeEditor } from '@root/dev/components';
import { Link } from 'react-router-dom';

const formattingData = ( props ) => (
  <Segment basic padded>
    <Header as='h2' dividing>Formatting of data</Header>
    <p>
      내장된 'date', 'money' formatter 외에도 datagrid의 static 함수인 setFormatter 함수를 이용하여 사용자 formatter를 만들 수 있습니다.
    </p>

    <SourceCodeEditor>
      {`
AXDatagrid.setFormatter({
  MY_FORMATTER: function (data) {
    return 'MY_FORMATTER';
  }
});

columns: [
  { key: 'id', width: 60, label: 'ID', align: 'center' },
  { key: 'title', width: 200, label: 'Title', formatter: 'MY_FORMATTER'},
  { key: 'writer', label: 'Writer', align: 'center'},
  { key: 'date', label: 'Date', align: 'center', formatter: 'date'},
  { key: 'money', label: 'Money', align: 'right', formatter: 'money'}
]
`}
    </SourceCodeEditor>

    <p>
      <Link to='/sample/Formatter'>Formatter 예제보기</Link>
    </p>
  </Segment>
);

export default formattingData;