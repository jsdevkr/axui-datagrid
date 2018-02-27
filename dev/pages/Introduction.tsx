import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Image, List, Segment } from 'semantic-ui-react';
import axuiLogo from '../assets/axui-logo.png';
import {features} from './features';

export const Introduction = ( props ) => (
  <Container>

    <Segment textAlign={'center'} basic padded>
      <Image src={axuiLogo} size='small' centered />
      <h1>AXUI datagrid</h1>
    </Segment>

    <Segment basic padded>
      <h1>Introduction</h1>
      <p>
        AXUI datagrid는 모던 웹 애플리케이션 개발을 위해 'React + ES6 + TS' 코드로 제작된 'datagrid UI component' 입니다.
        <br />
        'datagrid UI component'는 데이터를 스프레드시트 처럼 보여주는 UI를 말합니다. datagrid에 필요한 기능을 사용자가 원하는 데로 모두 만든다면 끝이 없겠지만
        대용량의 데이터를 빠른속도로 출력하고 컨트롤 하는 것과 완벽한 'React + ES6 + TS' 개발환경을 지원하는 것을 가장 중요한 가치로 생각하고 디자인 되었습니다.
      </p>
    </Segment>

    {features.map((f, fi) => {
      return <f.Component key={fi} />
    })}

  </Container>
);