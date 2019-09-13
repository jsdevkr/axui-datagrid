export interface IDataItem {
  type?: 'C' | 'U' | 'D';
  value: [] | { [key: string]: any };
  changed?: { [key: string]: any };
  selected?: boolean;
}
export type IData =
  | Map<number, IDataItem>
  | {
      [key: number]: IDataItem;
    };

export interface IColumn {
  key?: string;
  label?: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right' | string;
  colSpan?: number;
  rowSpan?: number;
  colIndex?: number;
  rowIndex?: number;
  formatter?: number;
  collector?: number;
  editor?: any;
  _sx?: number;
  _ex?: number;
  _width?: number;
  attr?: string;
  depth?: number;
}

export interface IDatagridProps {
  width?: number;
  height?: number;
  columns?: IColumn[];
  data?: IData;
  dataLength?: number;
  style?: React.CSSProperties;
  loading?: boolean;
  loadingData?: boolean;
  selection?: any;
  scrollLeft?: number;
  scrollTop?: number;
  frozenColumnIndex?: number;
  frozenRowIndex?: number;
  onScroll?: () => void;
  onClick?: () => void;
}

export interface IDatagridContext extends IDatagridProps {}
