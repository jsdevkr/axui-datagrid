import React, { createContext } from 'react';
import { DatagridStyleState } from '../Types';

const initialValues: [
  DatagridStyleState,
  React.Dispatch<React.SetStateAction<DatagridStyleState>>,
] = [{}, () => {}];

const StyleContext = createContext(initialValues);

export default StyleContext;
