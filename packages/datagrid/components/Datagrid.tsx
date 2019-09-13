import React, { useState } from 'react';
import { IDatagridProps, IDatagridContext } from '../common/Types';
import DataContext from '../context/DatagridContext';

const Datagrid: React.FC<IDatagridProps> = props => {
  const {
    width,
    height,
    headerHeight,
    columns,
    data,
    dataLength,
    loading,
    loadingData,
    selection,
    scrollLeft,
    scrollTop,
    frozenColumnIndex,
    frozenRowIndex,
    onScroll,
    onClick,
  } = props;
  const initialContext: IDatagridContext = {
    width,
    height,
    headerHeight,
    columns,
    data,
    dataLength,
    loading,
    loadingData,
    selection,
    scrollLeft,
    scrollTop,
    frozenColumnIndex,
    frozenRowIndex,
    onScroll,
    onClick,
  };
  const [context, setContext] = useState(initialContext);

  const styles: React.CSSProperties = { ...props.style, width, height };

  return (
    <DataContext.Provider value={[context, setContext]}>
      <div data-datagrid-container style={styles}>
        {props.children}
      </div>
    </DataContext.Provider>
  );
};

export default Datagrid;
