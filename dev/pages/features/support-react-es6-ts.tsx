import * as React from 'react';
import { Segment, Header } from 'semantic-ui-react';

const supportReactEs6Ts = ( props ) => (
  <Segment basic padded>
    <Header as='h2' dividing>Support React + ES6 + TS</Header>
    <p>
      AXUI datagrid는 React.js 프레임워크를 이용하여 개발되었습니다, 빠르게 변화하는 웹 개발환경 변화에 맞추어
      내부 코드는 ES6와 TS로 제작되었고 'babelJS' 를 이용하여 컴파일 합니다.
      만약에 여러분이 여러분의 프로젝트에서 완벽한게 ES6 + TS 혹은 ES6 코드를 사용하고 싶다면 AXUI datagrid는 최고의 선택이 되실 겁니다.
    </p>
  </Segment>
);

export default supportReactEs6Ts;