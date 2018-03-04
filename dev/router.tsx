import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Redirect, Route, Switch } from 'react-router-dom';
import style from './Style';
import { withRouter } from 'react-router';
import asyncRoute from './components/asyncRoute';

const Introduction = asyncRoute(() => {
  return new Promise(resolve => {
    import('./pages/Introduction').then((c) => {
      resolve(c.Introduction);
    });
  });
});

const Usage = asyncRoute(() => {
  return new Promise(resolve => {
    import('./pages/Usage').then((c) => {
      resolve(c.Usage);
    });
  });
});

const Props = asyncRoute(() => {
  return new Promise(resolve => {
    import('./pages/Props').then((c) => {
      resolve(c.Props);
    });
  });
});

const SideNav = asyncRoute(() => {
  return new Promise(resolve => {
    import('./components/SideNav').then((c) => {
      resolve(c.SideNav);
    });
  });
});

const ExampleRoot = asyncRoute(() => {
  return new Promise(resolve => {
    import('./components/ExampleRoot').then((c) => {
      resolve(c.ExampleRoot);
    });
  });
});

const RedirectToIntro = () => <Redirect to='/introduction' />;

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