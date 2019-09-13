import React, { useContext, useState } from 'react';
import { Datagrid, DatagridHeader, DatagridBody } from '@axui/datagrid';
import { IData } from '@axui/datagrid/common/Types';
import 'styles/global';
import '@axui/datagrid/scss/style.scss';
import { LayoutRoot, Nav, ControlBox, Viewer } from 'layouts';

const columns = [{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }];
const data: IData = [
  { value: { id: '1', name: 'tom' } },
  { value: { id: '2', name: 'seowoo' } },
];

const Home: React.FC = props => {
  return (
    <LayoutRoot>
      <Nav />
      <ControlBox></ControlBox>
      <Viewer>
        <Datagrid
          width={400}
          height={300}
          columns={columns}
          data={data}
          scrollLeft={0}
          scrollTop={0}
          frozenColumnIndex={0}
          frozenRowIndex={0}
        >
          <DatagridHeader />
          <DatagridBody />
        </Datagrid>
      </Viewer>
    </LayoutRoot>
  );
};

export default Home;
