import * as React from 'react';
import { IDataGrid } from '../common/@types';
declare class DataGridTableColGroup extends React.PureComponent<{
    panelColGroup: IDataGrid.ICol[];
}> {
    render(): JSX.Element;
}
export default DataGridTableColGroup;
