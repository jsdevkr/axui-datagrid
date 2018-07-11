import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { NoMatch, ErrorBoundary, SideNav } from 'components';
import { Layout } from 'antd';

import 'styles/globals';

import Introduction from './start/Introduction';
import Usage from './start/Usage';

class App extends React.Component {
  state = {
    leftMenuWidth: 250,
  };

  render() {
    const { leftMenuWidth } = this.state;

    const contentStyles = {
      marginLeft: leftMenuWidth,
      minWidth: '550px',
      maxWidth: '1150px',
    };

    return (
      <ErrorBoundary>
        <BrowserRouter>
          <Layout>
            <SideNav leftMenuWidth={leftMenuWidth} />

            <Layout style={contentStyles}>
              <Layout.Content>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/introduction" />}
                  />
                  <Route path="/introduction" component={Introduction} />
                  <Route path="/usage" component={Usage} />
                  <Route component={NoMatch} />
                </Switch>
              </Layout.Content>
              <Layout.Footer>AXUI</Layout.Footer>
            </Layout>
          </Layout>
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

export default hot(module)(App);
