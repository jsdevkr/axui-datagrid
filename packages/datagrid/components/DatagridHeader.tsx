import React, { useContext } from 'react';
import DatagridContext from '../context/DatagridContext';

const DatagridHeader: React.FC = props => {
  const [context, setContext] = useContext(DatagridContext);
  const { columns = [] } = context;
  return (
    <div>
      {columns.map((column, key) => {
        return (
          <div key={key}>
            {column.key} / {column.label}
          </div>
        );
      })}
    </div>
  );
};

export default DatagridHeader;
