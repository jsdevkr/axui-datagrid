import { hot } from 'react-hot-loader';
import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import style from './Style';

import { ExampleRoot, SideNav } from './components'
import { Introduction, Props, Usage } from './pages';

const RedirectToIntro = () => <Redirect to='/introduction' />

class AppRouter extends React.Component<any, any> {
  constructor( props ) {
    super( props );

    this.state = {
      visible: false
    };

    this.toggleVisibility = this.toggleVisibility.bind( this );
  }

  private toggleVisibility() {
    this.setState( { visible: !this.state.visible } );
  }

  public render() {
    const { visible } = this.state;
    const mainStyle = style.main;

    return (
      <BrowserRouter>

        <div style={style.container}>
          <SideNav style={style.menu} />
          <div style={mainStyle}>

            <Switch>
              <Route exact path='/' render={RedirectToIntro} />
              <Route path='/introduction' component={Introduction} />
              <Route path='/Usage' component={Usage} />
              <Route path='/props' component={Props} />
              <Route path='/sample/:name' component={ExampleRoot} />
            </Switch>

          </div>
        </div>

      </BrowserRouter>
    );
  }
}


export default hot(module)(AppRouter);