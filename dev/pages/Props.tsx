import * as React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';
import { PropsTable } from '../components'
import { datagridProps } from '../inc/datagridProps'


interface iProps {
}

interface iState {
}


export class Props extends React.Component<iProps, iState> {
  constructor( props ) {
    super( props );

  }

  public render() {
    return (
      <Container>
        <Segment basic padded>
          <Header as='h1'>Props</Header>
        </Segment>
        <Segment basic padded>
          <PropsTable props={datagridProps} />
        </Segment>
      </Container>
    )
  }
}