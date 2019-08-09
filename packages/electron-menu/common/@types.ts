export namespace IREWMenu {
  export type OnHoverItem = (
    menuItem: IMenuItem,
    event: React.MouseEvent<HTMLDivElement>,
    hover: boolean,
  ) => void;

  export type OnClickItem = (
    menuItem: IMenuItem,
    browserWindow: Window,
    event: React.MouseEvent<HTMLDivElement>,
  ) => void;

  export interface IMenuItem {
    label?: string;
    sublabel?: string;
    type?: 'normal' | 'separator' | 'checkbox';
    icon?: string | React.ReactElement<any>;
    checked?: boolean;
    submenu?: IMenuItem[];
    click?: OnClickItem;
    opened?: boolean;
    enabled?: boolean;
    visible?: boolean;
    accelerator?: string;
  }

  export interface IMenuItemProps {
    item: IMenuItem;
    onClickItem: OnClickItem;
    onHoverItem: OnHoverItem;
  }

  export interface IContextMenuOptions {
    id?: string;
    style?: React.CSSProperties;
    placement?: 'top' | 'bottom';
  }

  export interface IPopupOption {
    x?: number;
    y?: number;
    callback?: () => void;
  }

  export interface IPopupMenuProps {
    visible: boolean;
    menuItems: IMenuItem[];
    onClickItem: OnClickItem;
    parentOffset: {
      left: number;
      top: number;
      width?: number;
      height?: number;
      id?: string;
    };
    userStyle?: React.CSSProperties;
  }

  export interface IPopupMenuState {
    visible: boolean;
    positioned: boolean;
    newLeft: number;
    newTop: number;
    menuItems: IMenuItem[];
  }

  export interface IContextMenu {
    popup: (popupOption?: IPopupOption) => void;
    setMenu: (menuItems: IMenuItem[]) => IContextMenu;
    close: () => void;
  }

  export interface IMenuBarSubmenu {
    style?: React.CSSProperties;
    placement?: 'top' | 'bottom';
  }

  export interface IMenuBarProps {
    items?: IMenuItem[];
    style?: React.CSSProperties;
    submenu?: IMenuBarSubmenu;
  }
}
