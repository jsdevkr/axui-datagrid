import { IDataGrid } from '../common/@types';

export default function getDataItem(data: IDataGrid.IData, key: number) {
  return (data instanceof Map ? data.get(key) : data[key]) || undefined;
}
