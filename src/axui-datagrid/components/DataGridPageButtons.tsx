import * as React from 'react';
import { classNames as CX } from '../utils';
import { IDataGrid } from '../common/@types';

const PageButtons: React.SFC<{
  pageButtons: IDataGrid.IOptionPageButton[];
  pageButtonHeight: number;
  onClickPageButton: (
    e: React.MouseEvent<HTMLElement>,
    userFunction: string | IDataGrid.userCallBackFunction,
  ) => void;
}> = ({ pageButtons, pageButtonHeight, onClickPageButton }) => (
  <>
    {pageButtons.map((button, bi) => {
      return (
        <button
          key={bi}
          style={{
            height: pageButtonHeight,
            width: button.width || pageButtonHeight,
          }}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            onClickPageButton(e, button.onClick);
          }}
        >
          <div data-button-svg className={CX(button.className)} />
        </button>
      );
    })}
  </>
);

export default PageButtons;
