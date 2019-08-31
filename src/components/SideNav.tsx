import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { Menus } from 'routes';

import { Layout, Menu, Row, Col } from 'antd';
const axuiLogo = require('assets/axui-logo.png');
const GitHubButton = require('react-github-button');
const pkg = require('package.json');

interface IProps extends RouteComponentProps<any> {
  leftMenuWidth: number;
}
interface IState {
  mounted: boolean;
  defaultOpenKeys: string[];
  defaultSelectedKeys: string[];
  openKeys: string[];
  selectedKeys: string[];
  menus: { [key: string]: any };
}

const LayoutSider = styled(Layout.Sider as any)`
  .app-left-menu {
    &::-webkit-scrollbar-track {
      border-radius: 0;
      background-color: #133b5d;
    }

    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 0;
      background-color: #1c6091;
    }
  }

  .sider-header {
    padding: 5px 15px 20px 15px;
    .logo-img {
      width: 80px;
      overflow: hidden;
      img {
        width: 100%;
        display: block;
      }
    }
    h1 {
      @extend .font-display;
      color: #fff;
      font-size: 24px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      margin-top: 0;
      margin-bottom: 0;
    }
    .pkg-infos {
      color: #fff;
      margin-bottom: 10px;
    }
    .github-btn {
      display: inline-block;
      .gh-btn {
        margin-bottom: 0.5em;
      }
      .gh-count {
        margin-right: 1em;
        margin-bottom: 0.5em;
      }
    }
  }
`;

class SideNav extends React.Component<IProps, IState> {
  state = {
    mounted: false,
    defaultOpenKeys: [],
    defaultSelectedKeys: [],
    openKeys: [],
    selectedKeys: [],
    menus: Menus,
  };

  static getDerivedStateFromProps(props: any, prevState: IState) {
    const { location } = props;
    const { menus, mounted } = prevState;

    if (!mounted) {
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

      if (defaultSelectedKeys.length) {
        return {
          menus,
          defaultOpenKeys,
          defaultSelectedKeys,
          openKeys: defaultOpenKeys,
          selectedKeys: defaultSelectedKeys,
          mounted: true,
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    // console.log('ROUTE CHANGED');
    const { location } = this.props;
    const { menus } = this.state;
    let selectedKeys: string[] = [];
    let openKeys: string[] = [];

    Object.keys(menus).forEach((k: string) => {
      menus[k].menus.forEach((menu: any) => {
        if (menu.to === location.pathname) {
          openKeys.push(k);
          selectedKeys.push(menu.to);
        }
      });
    });

    this.setState({
      openKeys,
      selectedKeys,
    });

    window.scroll(0, 0);
  }

  render() {
    const { leftMenuWidth } = this.props;
    const { menus, mounted, openKeys, selectedKeys } = this.state;

    if (!mounted) {
      return null;
    }

    return (
      <LayoutSider
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

          <Row gutter={1} className="pkg-infos">
            <Col span={12}>version : {pkg.version}</Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              {pkg.license}
            </Col>
          </Row>

          {window.location.host !== 'localhost:3000' && (
            <div className="github-btn-container">
              <GitHubButton
                type="stargazers"
                namespace="axui"
                repo="datagrid"
              />{' '}
              <GitHubButton type="forks" namespace="axui" repo="datagrid" />
            </div>
          )}
        </div>

        <Menu
          mode="inline"
          theme="dark"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={(nextOpenKeys: string[]) => {
            this.setState({
              openKeys: nextOpenKeys,
            });
          }}
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
                        <a
                          href={menu.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {menu.label}
                        </a>
                      )}
                    </Menu.Item>
                  );
                })}
              </Menu.SubMenu>
            );
          })}
        </Menu>
      </LayoutSider>
    );
  }
}

export default withRouter(SideNav);
