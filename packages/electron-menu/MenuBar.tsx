import * as React from 'react';
import { IREWMenu } from './common/@types';
import ContextMenu from './ContextMenu';

interface IState {
  active: boolean;
  openedMenuIndex: number;
}

class MenuBar extends React.Component<IREWMenu.IMenuBarProps, IState> {
  childMenu: IREWMenu.IContextMenu[];
  containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: IREWMenu.IMenuBarProps) {
    super(props);

    this.childMenu = [];
    this.containerRef = React.createRef();
    this.state = {
      active: false,
      openedMenuIndex: -1,
    };
  }

  onMousedownBody = (e: MouseEvent) => {
    var el = e.target;
    if (this.containerRef.current) {
      if (el && el instanceof Node && !this.containerRef.current.contains(el)) {
        this.setState({ active: false, openedMenuIndex: -1 });
        document.body.removeEventListener('mousedown', this.onMousedownBody);
        window.removeEventListener('keydown', this.onKeyDownWindow);
      }
    }
  };

  onKeyDownWindow = (e: KeyboardEvent) => {
    if (e.which === 27) {
      // this.visible = false;
    }
  };

  handleMenuBarActive = () => {
    this.setState({
      active: true,
    });

    document.body.addEventListener('mousedown', this.onMousedownBody);
    window.addEventListener('keydown', this.onKeyDownWindow);
  };

  handleMenuClick = (e: React.MouseEvent, menuIndex: number) => {
    this.handleSubmenuPopup(e, menuIndex);
  };

  handleMenuOver = (e: React.MouseEvent, menuIndex: number) => {
    const { active } = this.state;
    if (!active) {
      return;
    }
    this.handleSubmenuPopup(e, menuIndex);
  };

  handleSubmenuPopup = (e: React.MouseEvent, menuIndex: number) => {
    const { items = [] } = this.props;
    const item = items[menuIndex];
    const submenu = this.childMenu[menuIndex];
    if (!submenu || !item) {
      return;
    }
    if (!e.currentTarget) {
      return;
    }
    if (!this.containerRef.current) {
      return;
    }

    const { openedMenuIndex = -1 } = this.state;
    const { pageXOffset, pageYOffset } = window;
    const { left, top, height } = e.currentTarget.getBoundingClientRect();

    if (openedMenuIndex !== menuIndex) {
      this.childMenu[openedMenuIndex] &&
        this.childMenu[openedMenuIndex].close();
    }
    // submenu.setMenu(item.submenu || []);
    submenu.popup({ x: left + pageXOffset, y: top + height + pageYOffset });

    this.setState({
      openedMenuIndex: menuIndex,
    });
  };

  initSubmenu = () => {
    const {
      items = [],
      submenu: { style: _submenuStyle = {}, placement = 'bottom' } = {},
    } = this.props;

    const submenuStyle = {
      ..._submenuStyle,
    };

    if (placement === 'bottom') {
      submenuStyle.borderTopLeftRadius = 0;
      submenuStyle.borderTopRightRadius = 0;
      submenuStyle.marginTop = 0;
    }

    this.childMenu = [];
    items.forEach((menu, i) => {
      const submenu = new ContextMenu({
        id: `menu-${i}`,
        style: submenuStyle,
        placement,
      });
      submenu.setMenu(menu.submenu || []);
      this.childMenu.push(submenu);
    });
  };

  componentDidMount() {
    this.initSubmenu();
  }

  componentDidUpdate(prevProps: IREWMenu.IMenuBarProps) {
    if (prevProps.items !== this.props.items) {
      this.initSubmenu();
    }
  }

  render() {
    const { active, openedMenuIndex } = this.state;
    const { items = [], style } = this.props;
    const menuBarStyle = {
      ...style,
    };
    return (
      <div
        ref={this.containerRef}
        className={`rewm-menubar${active ? ' rewm-menubar-active' : ''}`}
        style={menuBarStyle}
      >
        {items.map((menu, mi) => {
          return (
            <div
              className={`${openedMenuIndex === mi ? 'active' : ''}`}
              key={mi}
              data-menubar-item
              onMouseDown={() => {
                this.handleMenuBarActive();
              }}
              onClick={e => {
                this.handleMenuClick(e, mi);
              }}
              onMouseOver={e => {
                this.handleMenuOver(e, mi);
              }}
            >
              {menu.label}
            </div>
          );
        })}
      </div>
    );
  }
}

export default MenuBar;
