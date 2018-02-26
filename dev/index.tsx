import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import './scss/index.css';
import 'datagrid-ts/scss/index.css';

ReactDOM.render(
  <BrowserRouter basename='/'>
    <AppRouter />
  </BrowserRouter>,
  document.getElementById( 'root' )
);
