import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import pkg from '@root/package.json';

export class SideNav extends React.Component<iSideNavProps, iSideNavState> {
  constructor( props ) {
    super( props );

    this.handleItemClick = this.handleItemClick.bind( this );
  }

  private handleItemClick() {

  }

  public render() {
    const { style } = this.props;
    return (
      <Menu vertical fixed='left' inverted style={{ ...style }}>
        <Menu.Item>
          <b>AXUI datagrid {pkg.version}</b>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Start</Menu.Header>
          <Menu.Menu>
            <Menu.Item as={NavLink} to='/introduction' activeClassName='active'>
              Introduction
            </Menu.Item>
            <Menu.Item as={NavLink} to='/usage' activeClassName='active'>
              Usage
            </Menu.Item>
            <Menu.Item as='a' href={pkg.repository}>
              <Icon name='github' /> GitHub
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Props</Menu.Header>
          <Menu.Menu>
            <Menu.Item as={NavLink} to='/basic' activeClassName='active'>
              basic
            </Menu.Item>
            <Menu.Item name='height' onClick={this.handleItemClick} />
            <Menu.Item name='style' onClick={this.handleItemClick} />
            <Menu.Item name='columns' onClick={this.handleItemClick} />
            <Menu.Item name='data' onClick={this.handleItemClick} />
            <Menu.Item name='options' onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Options</Menu.Header>
          <Menu.Menu>
            <Menu.Item name='header' onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Events</Menu.Header>
          <Menu.Menu>
            <Menu.Item name='onClick' onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu.Item>

      </Menu>
    )
  }
}