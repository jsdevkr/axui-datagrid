import * as React from 'react';
import PopupMenu from './PopupMenu';
import { IREWMenu } from '../common/@types';

const Submenu: React.SFC<{
  submenu: IREWMenu.IMenuItem[];
  onClickItem: IREWMenu.OnClickItem;
  itemRef: React.RefObject<HTMLDivElement>;
}> = ({ submenu, onClickItem, itemRef }) => {
  if (!itemRef.current) {
    return null;
  }

  const itemRect = itemRef.current.getBoundingClientRect();
  const submenuStyle: React.CSSProperties = {
    top: 0,
    left: itemRect.width,
  };

  return (
    <PopupMenu
      menuItems={submenu}
      onClickItem={onClickItem}
      visible={true}
      parentOffset={{
        width: Number(itemRect.width),
        height: Number(itemRect.height),
        left: itemRect.left,
        top: itemRect.top,
        id: 'tom',
      }}
      userStyle={submenuStyle}
    />
  );
};

export default Submenu;
