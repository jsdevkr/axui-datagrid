import * as React from 'react';
import { IDataGridStore } from '../providers';
import { DataGridEnums } from 'axui-datagrid/common/@enums';
interface IProps extends IDataGridStore {
    panelName: DataGridEnums.PanelNames;
    style?: any;
    containerStyle?: any;
    panelLeft?: number;
    panelTop?: number;
}
declare const _default: React.ComponentClass<Pick<IProps, "style" | "panelName" | "containerStyle" | "panelLeft" | "panelTop">, any>;
export default _default;
