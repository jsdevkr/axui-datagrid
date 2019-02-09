import * as React from 'react';
import { IDataGrid } from '../common/@types';
declare const PageButtons: React.SFC<{
    pageButtons: IDataGrid.IOptionPageButton[];
    pageButtonHeight: number;
    onClickPageButton: (e: React.MouseEvent<HTMLElement>, userFunction: string | IDataGrid.userCallBackFunction) => void;
}>;
export default PageButtons;
