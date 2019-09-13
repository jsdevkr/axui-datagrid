import React, { useState } from 'react';
import { IDatagridProps, IDatagridContext } from '../common/Types';
import DataContext from '../context/DatagridContext';

const Datagrid: React.FC<IDatagridProps> = ({
  width,
  height,
  data,
  columns,
  children,
}) => {
  const initialContext: IDatagridContext = {
    width,
    height,
    columns,
  };
  const [context, setContext] = useState(initialContext);
  return (
    <DataContext.Provider value={[context, setContext]}>
      {children}
    </DataContext.Provider>
  );
};

export default Datagrid;
