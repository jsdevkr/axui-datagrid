import { IData, IColumn } from '@axui/datagrid/common/Types';

export interface ISettings {
  width?: number;
  height?: number;
  scrollLeft?: number;
  scrollTop?: number;
  frozenColumnIndex?: number;
  frozenRowIndex?: number;
  columns?: IColumn[];
  data?: IData;
}

export enum SettingsActionType {
  SET_WIDTH = 'width',
  SET_HEIGHT = 'height',
  SET_SCROLL_LEFT = 'scrollLeft',
  SET_SCROLL_TOP = 'scrollTop',
  SET_FROZEN_COLUMN_INDEX = 'frozenColumnIndex',
  SET_FROZEN_ROW_INDEX = 'frozenRowIndex',
  SET_COLUMNS = 'columns',
  SET_DATA = 'data',
}

export type SettingsReducer = (
  state: ISettings,
  action: {
    type: SettingsActionType;
    value?: any;
  },
) => ISettings;
