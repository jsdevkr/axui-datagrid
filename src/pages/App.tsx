import * as React from 'react';
import 'styles/globals';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { NoMatch, ErrorBoundary } from 'components';

import {
  Container,
  Header,
  Grid,
  Checkbox,
  Button,
  Icon,
} from 'semantic-ui-react';

const axuiLogo = require('assets/axui-logo.png');
const GitHubButton = require('react-github-button');

import { PROJECT_ROUTES } from 'routes';
import Index from './Samples/Index';

class App extends React.Component {
  state = {
    leftMenuWidth: 250,
  };

  render() {
    const { leftMenuWidth } = this.state;
    const leftMenuStyles = {
      width: leftMenuWidth,
    };
    const contentStyles = {
      marginLeft: leftMenuWidth,
      minWidth: '550px',
      maxWidth: '1150px',
    };

    return (
      <ErrorBoundary>
        <div className={'app-left-menu'} style={leftMenuStyles}>
          <div className={'item'}>
            <div className={'logo-img'}>
              <img src={axuiLogo} />
            </div>
            <h1>axui-datagrid</h1>
          </div>
          <div className={'item'}>
            <GitHubButton type="stargazers" namespace="axui" repo="datagrid" />{' '}
            <GitHubButton type="forks" namespace="axui" repo="datagrid" />
          </div>
        </div>

        <div style={contentStyles}>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={Index} />
              <Route component={NoMatch} />
            </Switch>
          </BrowserRouter>
        </div>
      </ErrorBoundary>
    );
  }
}

export default hot(module)(App);
