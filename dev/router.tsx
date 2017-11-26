import * as React from 'react';
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';
import {Button, Container, Menu, Segment, Sidebar, Icon} from 'semantic-ui-react';
import {BasicDatagrid} from './components';

interface iProps {}
interface iState {
  visible: boolean;
}

export class AppRouter extends React.Component<iProps, iState> {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  public toggleVisibility() {
    this.setState({visible: !this.state.visible});
  }

  public render() {
    const {visible} = this.state;

    return (
      <BrowserRouter>
        <Container className='main-layout'>
          <Button color='blue' onClick={this.toggleVisibility} icon={visible? 'folder' : 'folder open'} labelPosition='right' content='ax-datagrid Samples' />
          <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted>
              <Menu.Item name='home'>
                <NavLink to='/basic' className='item' activeClassName='active'>Basic</NavLink>
              </Menu.Item>
              <Menu.Item name='gamepad'>
                <NavLink to='/members' className='item' activeClassName='active'>Members</NavLink>
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment padded className='segment-content-view'>
                <Switch>
                  <Route exact path='/' component={BasicDatagrid} />
                  <Route path='/basic' component={BasicDatagrid} />
                </Switch>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Container>
      </BrowserRouter>
    );
  }
}
