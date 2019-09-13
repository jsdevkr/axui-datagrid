import React, { useContext, useState } from 'react';
import { Datagrid, DatagridHeader, DatagridBody } from '@axui/datagrid';

const Home: React.FC = props => {
  return (
    <>
      <Datagrid
        width={300}
        height={300}
        columns={[{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }]}
        data={[]}
        scrollLeft={0}
        scrollTop={0}
        frozenColumnIndex={0}
        frozenRowIndex={0}
      >
        <DatagridHeader />
        <DatagridBody />
      </Datagrid>
    </>
  );
};

export default Home;
