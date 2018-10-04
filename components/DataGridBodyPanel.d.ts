import * as React from 'react';
import { IDataGridStore } from '../providers';
interface IProps extends IDataGridStore {
    panelName: string;
    style?: any;
    containerStyle?: any;
    panelScrollConfig?: any;
    panelLeft?: number;
    panelTop?: number;
}
declare const _default: React.ComponentClass<Pick<IProps, "style" | "panelName" | "containerStyle" | "panelScrollConfig" | "panelLeft" | "panelTop">, any>;
export default _default;
