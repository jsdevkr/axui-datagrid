import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, List } from 'semantic-ui-react';
import pkg from '@root/package.json';

export const Usage = (props) => (
  <Container>
    <Segment basic padded>
      <h1>Usage</h1>
    </Segment>

    <Segment basic padded>
      <Header as='h2' dividing>NPM</Header>
      <Segment>
        <pre>$ npm install {pkg.name}-es -S</pre>
      </Segment>
      <Segment>
        <pre>$ npm install {pkg.name}-ts -S</pre>
      </Segment>
    </Segment>
  </Container>
);