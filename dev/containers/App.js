import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../Routes/Main';
import GridBasic from '../Routes/GridBasic';
import NotFound from '../Routes/NotFound';
import Nav from '../component/Nav';

export default () => {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/grid" component={GridBasic} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}