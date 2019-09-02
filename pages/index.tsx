import React, { useContext, useState } from 'react';
import { Datagrid } from '@axui/datagrid';

const Home: React.FC = props => {
  return (
    <>
      <Datagrid width={300} height={300} columns={[]} data={[]} />
    </>
  );
};

export default Home;
