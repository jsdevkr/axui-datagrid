import { IDataGrid } from '../common/@types';

function sum(collectorData: IDataGrid.ICollectorData) {
  const { key = '', data = {} } = collectorData;

  return Object.values(data).reduce(
    (accumulator: number, currentValue: any) => accumulator + currentValue[key],
    0,
  );
}

function avg(collectorData: IDataGrid.ICollectorData) {
  const { dataLength = 1 } = collectorData;
  return parseFloat((sum(collectorData) / dataLength).toFixed(4));
}

export default { sum, avg };
