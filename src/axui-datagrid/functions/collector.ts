import { IDataGrid } from '../common/@types';

function sum(collectorData: IDataGrid.ICollectorData) {
  const { key = '', data } = collectorData;
  return data.reduce(
    (accumulator: number, currentValue: any) => accumulator + currentValue[key],
    0,
  );
}

function avg(collectorData: IDataGrid.ICollectorData) {
  return parseFloat(
    (sum(collectorData) / collectorData.data.length).toFixed(4),
  );
}

export default { sum, avg };
