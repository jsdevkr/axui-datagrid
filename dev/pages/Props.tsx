import * as React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';
import { PropsTable } from '../components'
import { datagridProps } from '../declarations/datagridProps'


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
          <h1>Props</h1>
        </Segment>

        <Segment basic padded>
          <Header as='h2' dividing>Summary</Header>
          <PropsTable props={datagridProps} />
        </Segment>
      </Container>
    )
  }
}