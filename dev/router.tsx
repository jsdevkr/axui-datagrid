import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import style from './Style';
import { SideNav, ExampleRoot } from './components'
import { Introduction, Usage, Props } from './pages';

const RedirectToIntro = () => <Redirect to='/introduction' />

interface iProps {
}

interface iState {
  visible: boolean;
}

export class AppRouter extends React.Component<iProps, iState> {
  constructor( props ) {
    super( props );

    this.state = {
      visible: false
    };

    this.toggleVisibility = this.toggleVisibility.bind( this );
  }

  public toggleVisibility() {
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
