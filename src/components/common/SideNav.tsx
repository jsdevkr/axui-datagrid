import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';

import { Layout, Menu, Icon } from 'antd';
const axuiLogo = require('assets/axui-logo.png');
const GitHubButton = require('react-github-button');

interface IProps extends RouteComponentProps<any> {
  leftMenuWidth: number;
}
interface IState {}

class SideNav extends React.Component<IProps, IState> {
  state = {
    menus: {
      start: {
        label: (
          <>
            <Icon type="home" />
            Start
          </>
        ),
        menus: [
          { to: '/introduction', label: 'Introduction' },
          { to: '/usage', label: 'Usage' },
          {
            key: 'link-to-github',
            href: 'https://github.com/axui/datagrid',
            label: (
              <>
                <Icon type="github" /> GitHub
              </>
            ),
          },
        ],
      },
      examples: {
        label: 'Examples',
        menus: [
          { to: '/examples/LargeData', label: 'LargeData' },
          { to: '/examples/Formatter', label: 'Formatting of data' },
          { to: '/examples/FrozenColumnRow', label: 'Frozen column and row' },
          { to: '/examples/MultiColumnHeader', label: 'Multi column header' },
          { to: '/examples/InlineEdit', label: 'Inline edit' },
          { to: '/examples/EventReceive', label: 'Event' },
          {
            to: '/examples/DisabledVerticalScroll',
            label: 'DisabledVerticalScroll',
          },
          { to: '/examples/AlignHeader', label: 'AlignHeader' },
        ],
      },
    },
  };

  render() {
    const { leftMenuWidth, location } = this.props;
    const { menus } = this.state;

    let defaultOpenKeys: any[] = [];
    let defaultSelectedKeys: any[] = [];

    Object.keys(menus).forEach((k: string) => {
      menus[k].menus.forEach((menu: any) => {
        if (menu.to === location.pathname) {
          defaultOpenKeys.push(k);
          defaultSelectedKeys.push(menu.to);
        }
      });
    });

    if (defaultOpenKeys.length === 0) {
      defaultOpenKeys.push('start');
    }

    return (
      <Layout.Sider
        className="app-left-menu"
        width={leftMenuWidth}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="sider-header">
          <div className={'logo-img'}>
            <img src={axuiLogo} />
          </div>
          <h1>axui-datagrid</h1>

          <div className="github-btn-container">
            <GitHubButton type="stargazers" namespace="axui" repo="datagrid" />{' '}
            <GitHubButton type="forks" namespace="axui" repo="datagrid" />
          </div>
        </div>

        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={defaultSelectedKeys}
          defaultOpenKeys={defaultOpenKeys}
        >
          {Object.keys(menus).map((k: string) => {
            return (
              <Menu.SubMenu key={k} title={menus[k].label}>
                {menus[k].menus.map((menu: any, idx: number) => {
                  return (
                    <Menu.Item key={menu.key || menu.to || k + '.' + idx}>
                      {menu.to ? (
                        <NavLink to={menu.to}>{menu.label}</NavLink>
                      ) : (
                        <a href={menu.href}>{menu.label}</a>
                      )}
                    </Menu.Item>
                  );
                })}
              </Menu.SubMenu>
            );
          })}
        </Menu>
      </Layout.Sider>
    );
  }
}

export default withRouter(SideNav);
