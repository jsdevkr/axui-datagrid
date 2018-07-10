import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Image, Menu } from 'semantic-ui-react';

const axuiLogo = require('assets/axui-logo.png');
const GitHubButton = require('react-github-button');

interface IProps {
  leftMenuWidth: number;
}
interface IState {}

class SideNav extends React.Component<IProps, IState> {
  state = {
    exampleItems: [
      { to: '/sample/LargeData', label: 'LargeData' },
      { to: '/sample/Formatter', label: 'Formatting of data' },
      { to: '/sample/FrozenColumnRow', label: 'Frozen column and row' },
      { to: '/sample/MultiColumnHeader', label: 'Multi column header' },
      { to: '/sample/InlineEdit', label: 'Inline edit' },
      { to: '/sample/EventReceive', label: 'Event' },
      {
        to: '/sample/DisabledVerticalScroll',
        label: 'DisabledVerticalScroll',
      },
      { to: '/sample/AlignHeader', label: 'AlignHeader' },
    ],
  };

  render() {
    const { leftMenuWidth } = this.props;
    const leftMenuStyles = {
      width: leftMenuWidth,
    };

    return (
      <Menu
        vertical
        fixed="left"
        inverted
        className="app-left-menu"
        style={leftMenuStyles}
      >
        <Menu.Item>
          <div className={'logo-img'}>
            <img src={axuiLogo} />
          </div>
          <h1>axui-datagrid</h1>

          <div className='github-btn-container'>
            <GitHubButton type="stargazers" namespace="axui" repo="datagrid" />{' '}
            <GitHubButton type="forks" namespace="axui" repo="datagrid" />
          </div>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Start</Menu.Header>
          <Menu.Menu>
            <Menu.Item as={NavLink} to="/introduction" activeClassName="active">
              Introduction
            </Menu.Item>
            <Menu.Item as={NavLink} to="/usage" activeClassName="active">
              Usage
            </Menu.Item>
            <Menu.Item as="a" href="https://github.com/axui/datagrid">
              <Icon name="github" /> GitHub
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }
}

export default SideNav;
