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
  align?: 'left' | 'center' | 'right' | string;
  colSpan?: number;
  rowSpan?: number;
}

export interface IDataGridEditingCell {
  rowIndex?: number;
  colIndex?: number;
  editor?: any;
}

export interface IDataGridFormatterData {
  data?: any;
  item?: any;
  index?: number;
  key?: string;
  value?: any;
  options?: any;
}

export type formatterFunction = (formatterData: IDataGridFormatterData) => any;

export interface IDataGridCollectorData {
  data?: any;
  key?: string;
  value?: any;
  options?: any;
}

export type collectorFunction = (formatterData: IDataGridCollectorData) => any;

export type editorFunction = (editorData: IDataGridFormatterData) => void;

export type userCallBackFunction = (param?: any) => void;

export interface IonScrollEndFunctionParam {
  endOfScrollTop?: boolean;
  endOfScrollLeft?: boolean;
}

export interface IonChangeSelectedParam {
  filteredList?: any[];
}

export interface IDataGridFormatter {
  [key: string]: formatterFunction;
}

export interface IDataGridCollector {
  [key: string]: collectorFunction;
}

export interface IDataGridCol extends ICol {
  colIndex?: number;
  rowIndex?: number;
  formatter?: formatterFunction | string;
  collector?: collectorFunction | string;
  editor?: editorFunction | string | { type?: string };
  _ex?: number;
  _sx?: number;
  _width?: number;
  columnAttr?: string;
}

export interface IDataGridColumn extends ICol {
  colIndex?: number;
  rowIndex?: number;
  formatter?: formatterFunction | string;
  collector?: collectorFunction | string;
  editor?: editorFunction | string | { type?: string };
  hidden?: boolean;
  columns?: IDataGridColumn[];
  depth?: number;
  columnAttr?: string;
}

export interface IDataGridColumnKeys {
  selected?: string;
  modified?: string;
  deleted?: string;
  disableSelection?: string;
}

export interface IDataGridMoving {
  active?: boolean;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}
