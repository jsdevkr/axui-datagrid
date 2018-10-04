import * as React from 'react';
import { IDataGridStore } from '../providers';
interface IProps extends IDataGridStore {
    panelName: string;
    style?: any;
}
declare const _default: React.ComponentClass<Pick<IProps, "style" | "panelName">, any>;
export default _default;
