import React, {
  useContext,
  useState,
  useEffect,
  useReducer,
  Reducer,
} from 'react';
import debounce from 'lodash/debounce';
import { Datagrid, DatagridHeader, DatagridBody } from '@axui/datagrid';
import { IData, IColumn } from '@axui/datagrid/common/Types';
import 'styles/global';
import '@axui/datagrid/scss/style.scss';
import { LayoutRoot, Nav, ControlBox, Viewer } from 'layouts';
import {
  default as DefaultOptions,
  OptionKeys,
} from 'components/DefaultOptions';

export interface IDefaultOptions {
  width?: number;
  height?: number;
  scrollLeft?: number;
  scrollTop?: number;
  frozenColumnIndex?: number;
  frozenRowIndex?: number;
  columns?: IColumn[];
  data?: IData;
}
export interface IOptionReducerAction {
  type: string;
  value?: any;
}

const reducer = (
  state: IDefaultOptions,
  action: IOptionReducerAction,
): IDefaultOptions => {
  const { type, value } = action;
  switch (type) {
    case 'columns':
      return { ...state, columns: value };
    case 'width':
      return { ...state, width: value };
    default:
      throw new Error();
  }
};
const defaultOption: IDefaultOptions = {
  columns: [{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }],
  data: [
    { value: { id: '1', name: 'tom' } },
    { value: { id: '2', name: 'seowoo' } },
  ],
};
const Home: React.FC = props => {
  const [options, dispatchOptions] = useReducer(reducer, defaultOption);

  console.log('options value is ', options);
  const {
    width = 400,
    height = 300,
    scrollLeft = 0,
    scrollTop = 0,
    frozenColumnIndex = 0,
    frozenRowIndex = 0,
    columns,
    data,
  } = options;

  useEffect(() => {
    //
  }, []);

  const onChangeOption = debounce((key: OptionKeys, value: any) => {
    switch (key) {
      case OptionKeys.COLUMNS:
        dispatchOptions({ type: 'columns', value });
        break;
      case OptionKeys.WIDTH:
        dispatchOptions({ type: 'width', value });
      default:
        break;
    }
  }, 500);

  return (
    <LayoutRoot>
      <Nav />
      <ControlBox>
        <DefaultOptions {...options} onChangeOption={onChangeOption} />
      </ControlBox>
      <Viewer>
        <Datagrid
          width={width}
          height={height}
          columns={columns}
          data={data}
          scrollLeft={scrollLeft}
          scrollTop={scrollTop}
          frozenColumnIndex={frozenColumnIndex}
          frozenRowIndex={frozenRowIndex}
        >
          <DatagridHeader />
          <DatagridBody />
        </Datagrid>
      </Viewer>
    </LayoutRoot>
  );
};

export default Home;
