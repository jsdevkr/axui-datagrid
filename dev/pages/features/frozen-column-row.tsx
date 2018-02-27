import * as React from 'react';
import { Segment, Header } from 'semantic-ui-react';

const frozenColumnRow= ( props ) => (
  <Segment basic padded>
    <Header as='h2' dividing>Frozen column and row</Header>
    <p>
      options.frozenColumnIndex, options.frozenRowIndex를 정하면 그리드에 틀고정영역을 설정 할 수 있습니다.
    </p>
  </Segment>
);

export default frozenColumnRow;