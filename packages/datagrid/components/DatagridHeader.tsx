import React, { useContext } from 'react';
import DatagridContext from '../context/DatagridContext';
import { IDatagridHeader } from '../common/Types';

const DatagridHeader: React.FC<IDatagridHeader> = props => {
  const [context, setContext] = useContext(DatagridContext);
  const { columns = [], headerHeight = 30 } = context;
  const styles = { ...props.style, height: headerHeight };
  return (
    <div style={styles} role="datagrid-header">
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
