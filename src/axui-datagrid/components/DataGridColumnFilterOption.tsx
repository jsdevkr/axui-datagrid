import * as React from 'react';
import { types } from '../stores';
import { connectStore } from '../hoc';
import { IDataGridStore } from '../providers';
import { classNames as CX } from '../utils';

interface IProps extends IDataGridStore {
  filterOptions: any[];
  onChange: (value: any, checked: any, checkAll: any) => void;
}

const DatagridColumnFilterOption: React.SFC<IProps> = ({}) => {
  return <div />;
};

export default connectStore(DatagridColumnFilterOption);
