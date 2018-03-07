import * as React from 'react';
import { get } from 'lodash-es';
import * as Examples from '../example';
import { SourceCodeEditor } from 'components';
import { Container, Divider, Grid, Icon, Segment } from 'semantic-ui-react';
import pkg from '@root/dist/ts/package.json';

export const ExampleRoot = (props) => {
  const name = get(props, 'match.params.name');
  const Layout = Examples[ name ];
  const sourceCode = require('!raw-loader!../example/' + name + '.tsx');

  return <div>
    {Layout ? <Layout /> : null}
    <Divider />
    <Container>
      <Segment basic padded>
        <Grid columns={2} padded>
          <Grid.Row>
            <Grid.Column>
              <h4>Source Code </h4>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <a href={pkg.repository + '/tree/master/dev/example/' + name + '.tsx'} target={'_blank'}>
                <Icon name='github' />/dev/example/{name}.tsx
              </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <SourceCodeEditor code={sourceCode} />
      </Segment>
    </Container>
  </div>

};

export default ExampleRoot;