import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container, Segment } from 'semantic-ui-react';
import style from './Style';
import { SideNav } from './components'
import { Introduction, BasicDatagrid } from './pages';


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
            <Container>

                <Switch>
                  <Route exact path='/' component={Introduction} />
                  <Route path='/basic' component={BasicDatagrid} />
                </Switch>

            </Container>
          </div>
        </div>

      </BrowserRouter>
    );
  }
}
