import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from 'router';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter basename='/'>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById( 'root' )
  );
};

render( AppRouter );