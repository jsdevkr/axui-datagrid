import * as React from 'react';
import { IREWMenu } from './common/@types';
import { PopupMenu } from './components';

const ReactDOM = (() => {
  try {
    const ReactDom = require('@hot-loader/react-dom');
    if (ReactDom) {
      return ReactDom;
    }
  } catch (error) {}
  return require('react-dom');
})();

class ContextMenu implements IREWMenu.IContextMenu {
  container: HTMLDivElement;
  options: IREWMenu.IContextMenuOptions = {
    id: '',
  };
  menuItems: IREWMenu.IMenuItem[] = [];
  _visible: boolean = false;

  constructor(options: IREWMenu.IContextMenuOptions = {}) {
    this.options = options;
  }

  get visible() {
    return this._visible;
  }

  set visible(tf: boolean) {
    this._visible = tf;

    this.menuItems
      .filter(n => n)
      .forEach(n => {
        n.opened = false;
      });

    this.render();
  }

  setMenu(menuItems: IREWMenu.IMenuItem[]) {
    this.menuItems = [...menuItems];
    this.render();
    return this;
  }

  popup(popupOption: IREWMenu.IPopupOption) {
    const { x: containerLeft = 0, y: containerTop = 0 } = popupOption;
    const { id = '' } = this.options;

    const existContainer = document.querySelectorAll(
      `[data-rewm-contextmenu-container="${id}"]`,
    )[0];

    if (existContainer && id !== '') {
      this.container = existContainer as any;
      document.body.appendChild(this.container);
    } else {
      this.container = document.createElement('div');
      this.container.setAttribute('data-rewm-contextmenu-container', id);
      document.body.appendChild(this.container);
    }

    // set style of this.container
    this.container.style.position = 'absolute';
    this.container.style.left = containerLeft + 'px';
    this.container.style.top = containerTop + 'px';

    if (this.container) {
      this.visible = true;
    }
  }

  close() {
    this.visible = false;
  }

  onClickItem: IREWMenu.OnClickItem = (menuItem, w, e) => {
    const { type = 'normal', enabled = true, visible = true } = menuItem;

    if (enabled) {
      if (type === 'checkbox') {
        menuItem.checked = !menuItem.checked;
      }
    }
    // 메뉴가 클릭되었다는 것은 인지하는 곳.
    this.visible = false;
  };

  // document.body에서 마우스 다운이 일어난 경우 contextMenu안쪽이 클릭된 것이지 바깥쪽에서 마우스 다운이 일어 난 건지 체크.
  onMousedownBody = (e: MouseEvent) => {
    var el = e.target;
    if (el && el instanceof Node && !this.container.contains(el)) {
      this.visible = false;
    }
  };

  onKeyDownWindow = (e: KeyboardEvent) => {
    if (e.which === 27) {
      this.visible = false;
    }
  };

  render() {
    if (!this.container) {
      return;
    }
    const { style = {} } = this.options;

    ReactDOM.render(
      <PopupMenu
        menuItems={this.menuItems}
        onClickItem={this.onClickItem}
        visible={this.visible}
        parentOffset={{
          top: this.container.offsetTop,
          left: this.container.offsetLeft,
        }}
        userStyle={{ ...style, ...{ left: 0, top: 0 } }}
      />,
      this.container,
    );

    if (this.visible) {
      document.body.addEventListener('mousedown', this.onMousedownBody);
      window.addEventListener('keydown', this.onKeyDownWindow);
    } else {
      document.body.removeEventListener('mousedown', this.onMousedownBody);
      window.removeEventListener('keydown', this.onKeyDownWindow);
    }
  }
}

export default ContextMenu;
