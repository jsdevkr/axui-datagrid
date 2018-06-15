import * as types from './@types';

export interface IPosition {
  x?: number;
  y?: number;
}

export interface IRect extends IPosition {
  width: number;
  height?: number;
}

export interface ICol {
  key?: string;
  label?: string;
  width?: number | string;
  align?: types.ColTextAlign;
  colSpan?: number;
  rowSpan?: number;
}

export interface IDataGridEditingCell {
  row?: number;
  col?: number;
  editor?: any;
}

export interface IDataGridFormatterData {
  list: any;
  item: any;
  index: number;
  key: string;
  value: any;
  options: any;
}

export interface IDataGridCol extends ICol {
  colIndex?: number;
  rowIndex?: number;
  formatter?: string | Function;
  _ex?: number;
  _sx?: number;
  _width?: number;
}

export interface IDataGridColumn extends ICol {
  colIndex?: number;
  rowIndex?: number;
  formatter?: () => void | string;
  hidden?: boolean;
  columns?: IDataGridColumn[];
  depth?: number;
}

export interface IDataGridColumnKeys {
  selected?: string;
  modified?: string;
  deleted?: string;
  disableSelection?: string;
}
