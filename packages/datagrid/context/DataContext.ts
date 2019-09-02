import React, { createContext } from 'react';
import { DatagridDataState } from '../Types';

const initialValues: [
  DatagridDataState,
  React.Dispatch<React.SetStateAction<DatagridDataState>>,
] = [{}, () => {}];

const DataContext = createContext(initialValues);

export default DataContext;
