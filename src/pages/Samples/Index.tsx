import * as React from 'react';
import 'styles/globals';
import { Basic, CustomizeStyle } from './Examples';
import {
  Container,
  Header,
  Grid,
  Checkbox,
  Button,
  Icon,
} from 'semantic-ui-react';
import { CodeViewer } from 'components';

const basicRaw = require('!raw-loader!./Examples/components/Basic.tsx');
const customizeStyleRaw = require('!raw-loader!./Examples/components/CustomizeStyle.tsx');
const axuiLogo = require('assets/axui-logo.png');

const GitHubButton = require('react-github-button');

interface IProps {}
interface IState {}
class Index extends React.Component<IProps, IState> {
  state = {
    viewBasicRaw: false,
    viewCustomizeStyleRaw: false,
  };

  render() {
    const { viewBasicRaw, viewCustomizeStyleRaw } = this.state;

    return (
      <>
        <header className={'app-header'}>
          <Container>
            <div className={'logo-img'}>
              <img src={axuiLogo} />
            </div>
            <h1>axui-datagrid</h1>
            <div>
              <GitHubButton
                type="stargazers"
                size="large"
                namespace="axui"
                repo="axui-datagrid"
              />{' '}
              <GitHubButton
                type="forks"
                size="large"
                namespace="axui"
                repo="axui-datagrid"
              />
            </div>
          </Container>
        </header>
        <Container>
          <Grid padded>
            <Grid.Row>
              <Grid.Column>
                <Header as="h2">Installation</Header>

                <CodeViewer>npm install axui-datagrid -S</CodeViewer>

                <CodeViewer
                  code={`
import 'axui-datagrid/style.css';
import { AXUIDataGrid } from 'axui-datagrid';
`}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
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
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </>
    );
  }
}

export default Index;
