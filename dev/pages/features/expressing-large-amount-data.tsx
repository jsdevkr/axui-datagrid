import * as React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const expressingLargeAmountData = props => (
  <Segment basic padded>
    <Header as="h2" dividing>
      Expressing large amounts of data
    </Header>
    <p>
      AXUI datagrid는 대용량의 데이터를 처리 할수 있도록 datagrid에 보여지는
      영역만 출력하는 가상스크롤 기능을 지원합니다. 또한 행뿐만아니라 열에
      대해서도 보여지는 영역만 출력되므로 최소한의 DOM엘리먼트만 브라우저에
      출력됩니다.
    </p>
    <p>
      <Link to="/sample/LargeData">대용량 데이터 예제보기</Link>
    </p>
  </Segment>
);

export default expressingLargeAmountData;
