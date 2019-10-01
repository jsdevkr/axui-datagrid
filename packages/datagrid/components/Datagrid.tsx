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

  useEffect(() => {
    // make new context
    const nextContext: IDatagridContext = {
      ...props,
      _scrollLeft: 0,
      _scrollTop: 0,
    };

    console.log('isColumns changed', context.columns !== nextContext.columns);

    setContext(nextContext);
  }, [context.columns, props]);

  return (
    <DataContext.Provider value={[context, setContext]}>
      <div data-datagrid-container style={styles}>
        {props.children}
      </div>
    </DataContext.Provider>
  );
};

export default Datagrid;
