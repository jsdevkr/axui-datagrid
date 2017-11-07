import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../Routes/Main';
import GridBasic from '../Routes/GridBasic';
import NotFound from '../Routes/NotFound';
import Nav from '../component/Nav';

class App extends React.Component {
  render() {

    console.log(this.props);

    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/grid" component={GridBasic} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

// <Route exact path="/" render={(props) => (<Main onCreate={onCreate} onRemove={onRemove} {...props} />)} />
// 리덕스에 연결을 시키고 내보낸다
export default App;