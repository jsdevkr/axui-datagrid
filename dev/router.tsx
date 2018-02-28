import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Redirect, Route, Switch } from 'react-router-dom';
import style from './Style';
import { withRouter } from 'react-router';

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

  componentDidUpdate( prevProps ) {
    if ( this.props.location !== prevProps.location ) {
      window.scrollTo( 0, 0 );
    }
  }

  private toggleVisibility() {
    this.setState( { visible: !this.state.visible } );
  }

  public render() {
    const { visible } = this.state;
    const mainStyle = style.main;

    return (
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
    );
  }
}


export default hot( module )( withRouter( AppRouter ) );