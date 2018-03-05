import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import pkg from '@root/dist/ts/package.json';

export class SideNav extends React.Component<any, any> {
  constructor( props ) {
    super( props );

    this.state = {
      exampleItems: [
        { to: '/sample/LargeData', label: 'LargeData' },
        { to: '/sample/Formatter', label: 'Formatting of data' },
        { to: '/sample/FrozenColumnRow', label: 'Frozen column and row' },
        { to: '/sample/MultiColumnHeader', label: 'Multi column header' },
        { to: '/sample/InlineEdit', label: 'Inline edit' },
        { to: '/sample/EventReceive', label: 'Event' },
        { to: '/sample/DisabledVerticalScroll', label: 'DisabledVerticalScroll' },
        { to: '/sample/AlignHeader', label: 'AlignHeader' }
      ]
    };

    this.handleItemClick = this.handleItemClick.bind( this );
  }

  public componentWillUpdate( nextProps, nextState ) {

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

            {this.state.exampleItems.map((item, i) => {
              return <Menu.Item key={i} as={NavLink} to={item.to} activeClassName='active'>
                {item.label}
              </Menu.Item>
            })}

          </Menu.Menu>
        </Menu.Item>

      </Menu>
    )
  }
}

export default SideNav;