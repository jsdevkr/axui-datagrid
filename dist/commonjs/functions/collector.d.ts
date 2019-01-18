import { IDataGrid } from '../common/@types';
declare function sum(collectorData: IDataGrid.ICollectorData): any;
declare function avg(collectorData: IDataGrid.ICollectorData): number;
declare const _default: {
    sum: typeof sum;
    avg: typeof avg;
};
export default _default;
