import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from './Routes/Main';

import Nav from './component/Nav';
import GridBasic from './component/GridBasic';

export default () => {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/grid" component={GridBasic} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}