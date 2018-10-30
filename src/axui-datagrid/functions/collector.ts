import { IDataGridCollectorData } from '../common/@types';

function sum(collectorData: IDataGridCollectorData) {
  const { key = '', data } = collectorData;
  return data.reduce(
    (accumulator: number, currentValue: any) => accumulator + currentValue[key],
    0,
  );
}

function avg(collectorData: IDataGridCollectorData) {
  return parseFloat(
    (sum(collectorData) / collectorData.data.length).toFixed(4),
  );
}

export default { sum, avg };
