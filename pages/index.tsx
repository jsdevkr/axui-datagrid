import React, { useContext, useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { Datagrid, DatagridHeader, DatagridBody } from '@axui/datagrid';
import { IData, IColumn } from '@axui/datagrid/common/Types';
import 'styles/global';
import '@axui/datagrid/scss/style.scss';
import { LayoutRoot, Nav, ControlBox, Viewer } from 'layouts';
import { default as DefaultOptions } from 'components/DefaultOptions';

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

const Home: React.FC = props => {
  const [options, setOptions] = useState<IDefaultOptions>({});

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
    if (!columns || !data) {
      setOptions({
        columns: [{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }],
        data: [
          { value: { id: '1', name: 'tom' } },
          { value: { id: '2', name: 'seowoo' } },
        ],
      });
    }
  }, [columns, data]);

  const onChangeOptions = debounce((newOptions: IDefaultOptions) => {
    setOptions({ ...options, ...newOptions });
  }, 300);

  return (
    <LayoutRoot>
      <Nav />
      <ControlBox>
        <DefaultOptions {...options} onChangeOptions={onChangeOptions} />
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
