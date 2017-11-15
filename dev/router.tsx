import * as React from 'react';
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';
import {Button, Container, Menu, Segment, Sidebar, Icon} from 'semantic-ui-react';
import {About, Header, MembersPage} from './components';

interface IAppRouterState {
  visible: boolean
}

export class AppRouter extends React.Component<{}, IAppRouterState> {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  public toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  public render() {
    const { visible } = this.state;

    return (
      <BrowserRouter>

        <Container className="main-layout">

          <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>

          <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted>
              <Menu.Item name='home'>
                <NavLink to="/about" className="item" activeClassName="active">About</NavLink>
              </Menu.Item>
              <Menu.Item name='gamepad'>
                <NavLink to="/members" className="item" activeClassName="active">Members</NavLink>
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment padded className="segment-content-view">

                <Switch>
                  <Route exact path="/" component={About} />
                  <Route path="/about" component={About} />
                  <Route path="/members" component={MembersPage} />
                </Switch>

              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>


        </Container>

      </BrowserRouter>
    );
  }
}
