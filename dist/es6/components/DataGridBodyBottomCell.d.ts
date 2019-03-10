import * as React from 'react';
import { IDataGrid } from '../common/@types';
interface IProps {
    ci: number;
    col?: IDataGrid.ICol;
    data?: any;
    options: IDataGrid.IOptions;
    predefinedFormatter?: {};
    predefinedCollector?: {};
}
declare class DataGridBodyBottomCell extends React.PureComponent<IProps> {
    render(): JSX.Element;
}
export default DataGridBodyBottomCell;
