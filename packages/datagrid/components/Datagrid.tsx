import React, { useState, useEffect } from 'react';
import { IDatagridProps, IDatagridContext } from '../common/Types';
import DataContext from '../context/DatagridContext';

const Datagrid: React.FC<IDatagridProps> = props => {
  const [context, setContext] = useState<IDatagridContext>({});
  const styles: React.CSSProperties = {
    ...props.style,
    width: props.width,
    height: props.height,
  };

  // componnent didUpdate
  useEffect(() => {
    // make new context
    const nextContext: IDatagridContext = {
      ...props,
      _scrollLeft: 0,
      _scrollTop: 0,
    };

    if (context.columns !== nextContext.columns) {
      console.log('changed or init columns');
    }
    if (context.data !== nextContext.data) {
      console.log('changed or init data');
    }

    setContext(nextContext);
  }, [context.columns, context.data, props]);

  return (
    <DataContext.Provider value={[context, setContext]}>
      <div data-datagrid-container style={styles}>
        {props.children}
      </div>
    </DataContext.Provider>
  );
};

export default Datagrid;
