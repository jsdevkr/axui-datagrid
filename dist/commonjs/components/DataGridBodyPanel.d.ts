import * as React from 'react';
import { IDataGridStore } from '../providers';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from '../common/@enums';
interface IProps extends IDataGridStore {
    panelName: DataGridEnums.PanelNames;
    style?: any;
    containerStyle?: any;
    panelScrollConfig?: IDataGrid.IScrollConfig;
    panelLeft?: number;
    panelTop?: number;
}
declare const _default: React.ComponentClass<Pick<IProps, "style" | "panelName" | "containerStyle" | "panelScrollConfig" | "panelLeft" | "panelTop">, any>;
export default _default;
