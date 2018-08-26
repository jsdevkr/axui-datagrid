import { intfs } from '../stores';

function avg(collectorData: intfs.IDataGridCollectorData) {
  return 'avg';
}

function sum(collectorData: intfs.IDataGridCollectorData) {
  return 'sum';
}

export default { avg, sum };
