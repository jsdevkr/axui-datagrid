import * as React from 'react';
import 'styles/globals';
import { Basic } from 'examples';
import {
  Container,
  Header,
  Segment,
  Checkbox,
  Divider,
} from 'semantic-ui-react';
import { CodeViewer } from 'components';

const basicRaw = require('!raw-loader!examples/Basic.tsx');

interface IProps {}
interface IState {}
class Introduction extends React.Component<IProps, IState> {
  state = {
    viewBasicRaw: false,
    viewCustomizeStyleRaw: false,
  };

  render() {
    const { viewBasicRaw } = this.state;

    return (
      <>
        <Container>
          <Segment padded basic>
            <Header as="h2">Installation</Header>

            <CodeViewer>npm install axui-datagrid -S</CodeViewer>

            <CodeViewer
              code={`
import 'axui-datagrid/style.scss';
import { DataGrid } from 'axui-datagrid';
`}
            />
          </Segment>
          <Divider />
          <Segment padded basic>
            <Header as="h2">basic</Header>
            <Basic />

            <Checkbox
              label="Show Code"
              checked={viewBasicRaw}
              onChange={(e: any, data: any) => {
                this.setState({ viewBasicRaw: data.checked });
              }}
            />
            {viewBasicRaw ? <CodeViewer code={basicRaw} /> : null}
          </Segment>
        </Container>
      </>
    );
  }
}

export default Introduction;
