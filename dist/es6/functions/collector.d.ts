import { IDataGridCollectorData } from '../common/@types';
declare function sum(collectorData: IDataGridCollectorData): any;
declare function avg(collectorData: IDataGridCollectorData): number;
declare const _default: {
    sum: typeof sum;
    avg: typeof avg;
};
export default _default;
