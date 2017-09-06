import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../Routes/Main';
import GridBasic from '../Routes/GridBasic';
import NotFound from '../Routes/NotFound';
import Nav from '../component/Nav';

import { connect } from 'react-redux';
import * as actions from '../modules';


class App extends React.Component{
  render(){
    const { onCreate, onRemove } = this.props;

    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" render={(props) => (<Main onCreate={onCreate} onRemove={onRemove} {...props} />)} />
            <Route path="/grid" component={GridBasic} />
            <Route component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}


// 액션함수 준비
const mapToDispatch = (dispatch) => ({
  onCreate: () => dispatch(actions.create()),
  onRemove: () => dispatch(actions.remove())
});

// 리덕스에 연결을 시키고 내보낸다
export default connect(null, mapToDispatch)(App);