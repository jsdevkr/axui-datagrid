import { intfs } from '../stores';
declare function sum(collectorData: intfs.IDataGridCollectorData): any;
declare function avg(collectorData: intfs.IDataGridCollectorData): number;
declare const _default: {
    sum: typeof sum;
    avg: typeof avg;
};
export default _default;
