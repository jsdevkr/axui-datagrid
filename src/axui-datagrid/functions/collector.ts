import { intfs } from '../stores';

function sum(collectorData: intfs.IDataGridCollectorData) {
  const { key = '', data } = collectorData;
  return data.reduce(
    (accumulator: number, currentValue: any) => accumulator + currentValue[key],
    0,
  );
}

function avg(collectorData: intfs.IDataGridCollectorData) {
  return parseFloat(
    (sum(collectorData) / collectorData.data.length).toFixed(4),
  );
}

export default { sum, avg };
