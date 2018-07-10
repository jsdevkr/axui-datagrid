import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { NoMatch, ErrorBoundary, SideNav } from 'components';

import 'styles/globals';
import Index from './samples/Index';

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
          <>
            <SideNav leftMenuWidth={leftMenuWidth} />
            <div style={contentStyles}>
              <Switch>
                <Route path="/" component={Index} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </>
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

export default hot(module)(App);
