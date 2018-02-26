import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import pkg from '@root/dist/ts/package.json';

export class SideNav extends React.Component<any, any> {
  constructor( props ) {
    super( props );

    this.handleItemClick = this.handleItemClick.bind( this );
  }

  public componentWillUpdate() {
    window.scrollTo( 0, 0 );
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
          <Menu.Header>Attributes</Menu.Header>
          <Menu.Menu>
            <Menu.Item as={NavLink} to='/props' activeClassName='active'>
              Props
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Example</Menu.Header>
          <Menu.Menu>
            <Menu.Item as={NavLink} to='/sample/LargeData' activeClassName='active'>
              LargeData
            </Menu.Item>
            <Menu.Item as={NavLink} to='/sample/Formatter' activeClassName='active'>
              Formatting of data
            </Menu.Item>
            <Menu.Item as={NavLink} to='/sample/FrozenColumnRow' activeClassName='active'>
              Frozen column and row
            </Menu.Item>
            <Menu.Item as={NavLink} to='/sample/MultiColumnHeader' activeClassName='active'>
              Multi column header
            </Menu.Item>
            <Menu.Item as={NavLink} to='/sample/InlineEdit' activeClassName='active'>
              Inline edit
            </Menu.Item>
            <Menu.Item as={NavLink} to='/sample/EventReceive' activeClassName='active'>
              Event
            </Menu.Item>
            <Menu.Item as={NavLink} to='/sample/DisabledVerticalScroll' activeClassName='active'>
              DisabledVerticalScroll
            </Menu.Item>
            <Menu.Item as={NavLink} to='/sample/AlignHeader' activeClassName='active'>
              AlignHeader
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

      </Menu>
    )
  }
}