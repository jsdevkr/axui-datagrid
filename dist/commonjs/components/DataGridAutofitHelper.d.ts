import * as React from 'react';
import { IDataGridStore } from '../providers';
import { IDataGrid } from '../common/@types';
interface IProps extends IDataGridStore {
    applyAutofit: (colGroup: IDataGrid.IAutofitCol[]) => void;
}
declare const _default: React.ComponentClass<Pick<IProps, "applyAutofit">, any>;
export default _default;
