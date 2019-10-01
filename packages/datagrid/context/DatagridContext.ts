import React, { createContext } from 'react';
import { IDatagridContext } from '../common/Types';

const initialValues: [
  IDatagridContext,
  React.Dispatch<React.SetStateAction<IDatagridContext>>,
] = [
  {
    _scrollLeft: 0,
    _scrollTop: 0,
  },
  () => {},
];

const DatagridContext = createContext(initialValues);

export default DatagridContext;
