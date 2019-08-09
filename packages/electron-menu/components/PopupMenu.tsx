import * as React from 'react';
import MenuItem from './MenuItem';
import { IREWMenu } from '../common/@types';

class PopupMenu extends React.Component<
  IREWMenu.IPopupMenuProps,
  IREWMenu.IPopupMenuState
> {
  state = {
    visible: true,
    positioned: false,
    newLeft: 0,
    newTop: 0,
    menuItems: [],
  };

  popupMenuRef: React.RefObject<HTMLDivElement>;

  static getDerivedStateFromProps(
    props: IREWMenu.IPopupMenuProps,
    state: IREWMenu.IPopupMenuState,
  ) {
    let nextState = state;
    let needChange = false;

    if (props.menuItems !== state.menuItems) {
      nextState.menuItems = props.menuItems;
      nextState.menuItems.forEach(n => {
        n.opened = false;
      });
    }
    if (props.visible !== state.visible) {
      nextState.visible = props.visible;
      if (!props.visible) {
        // visible false 가 되면 값 초기화.
        nextState.positioned = false;
      }
    }

    return needChange ? nextState : null;
  }

  constructor(props: IREWMenu.IPopupMenuProps) {
    super(props);
    this.popupMenuRef = React.createRef();
  }

  align = () => {
    const { userStyle = {} } = this.props;
    const {
      left: pLeft,
      top: pTop,
      width: pWidth = 0,
      height: pHeight = 0,
      id,
    } = this.props.parentOffset;
    const { scrollWidth, scrollHeight } = document.body;

    let newLeft = Number(userStyle.left || 0);
    let newTop = Number(userStyle.top || 0);

    if (!this.state.positioned && this.popupMenuRef.current) {
      const popupMenuRect = this.popupMenuRef.current.getBoundingClientRect();
      const marginTop = Number(
        (
          '' + window.getComputedStyle(this.popupMenuRef.current).marginTop
        ).replace(/[a-zA-Z]/g, ''),
      );

      if (pLeft + newLeft + popupMenuRect.width > scrollWidth) {
        newLeft = newLeft - pWidth - popupMenuRect.width;
      }

      if (pTop + newTop + popupMenuRect.height > scrollHeight) {
        newTop = newTop + pHeight - popupMenuRect.height - marginTop * 2;
      }

      this.setState({
        positioned: true,
        newLeft: Number(newLeft),
        newTop: Number(newTop),
      });
    }
  };

  onHoverItem: IREWMenu.OnHoverItem = (item, e, hover) => {
    this.setState(prevState => {
      prevState.menuItems.forEach(n => {
        if (n === item) {
          n.opened = true;
        } else {
          n.opened = false;
        }
      });

      return {
        menuItems: prevState.menuItems,
      };
    });
  };

  componentDidMount() {
    this.align();
  }
  componentDidUpdate() {
    this.align();
  }

  render() {
    const { visible = false, menuItems, onClickItem, userStyle } = this.props;

    if (!visible) {
      return null;
    }

    const renderStyles: React.CSSProperties = this.state.positioned
      ? {
          left: this.state.newLeft,
          top: this.state.newTop,
        }
      : {
          opacity: 0,
          position: 'fixed',
          left: 0,
          top: 0,
        };
    const menuStyles = { ...userStyle, ...renderStyles };

    return (
      <div
        className="rewm-contextmenu"
        style={menuStyles}
        ref={this.popupMenuRef}
      >
        {menuItems.map((item, i) => (
          <MenuItem
            key={i}
            item={item}
            onClickItem={onClickItem}
            onHoverItem={this.onHoverItem}
          />
        ))}
      </div>
    );
  }
}

export default PopupMenu;
