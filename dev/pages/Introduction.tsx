import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, List } from 'semantic-ui-react';

interface iProps {
}

interface iState {
}


export class Introduction extends React.Component<iProps, iState> {
  constructor( props ) {
    super( props );

  }

  public render() {
    return (
      <Container>
        <Segment basic textAlign='center'>
          <h1>Introduction</h1>
        </Segment>

        <Segment basic padded>
          <Header as='h2' dividing>Introduction</Header>
          <p>
            Semantic UI React is the official React integration for <a href='#'>Semantic UI</a> .
          </p>
          <List>
            <List.Item icon='check' content='jQuery Free' />
            <List.Item icon='check' content='Declarative API' />
            <List.Item icon='check' content='Augmentation' />
            <List.Item icon='check' content='Shorthand Props' />
            <List.Item icon='check' content='Sub Components' />
            <List.Item icon='check' content='Auto Controlled State' />
          </List>
          <p>
            Installation instructions are provided in the <Link to='/usage'>Usage</Link> section.
          </p>
        </Segment>
      </Container>
    )
  }
}