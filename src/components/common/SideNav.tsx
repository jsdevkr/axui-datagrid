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
      <div className={'app-left-menu'} style={leftMenuStyles}>
        <div className={'item'}>
          <div className={'logo-img'}>
            <img src={axuiLogo} />
          </div>
          <h1>axui-datagrid</h1>
        </div>
        <div className={'item'}>
          <GitHubButton type="stargazers" namespace="axui" repo="datagrid" />{' '}
          <GitHubButton type="forks" namespace="axui" repo="datagrid" />
        </div>
      </div>
    );
  }
}

export default SideNav;
