import React, { useState, useEffect } from 'react';
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
    _scrollLeft: 0,
    scrollTop,
    _scrollTop: 0,
    frozenColumnIndex,
    frozenRowIndex,
    onScroll,
    onClick,
  };

  const [context, setContext] = useState(initialContext);

  const styles: React.CSSProperties = { ...props.style, width, height };

  // remake _columns and related scrollWidth
  useEffect(() => {
    console.log('changed columns or width');
  }, [columns, width, frozenColumnIndex]);

  // remake related scrollHeight
  useEffect(() => {}, [data, height]);

  // related scrollLeft
  useEffect(() => {}, [scrollLeft]);

  // related scrollTop
  useEffect(() => {}, [scrollTop]);

  return (
    <DataContext.Provider value={[context, setContext]}>
      <div data-datagrid-container style={styles}>
        {props.children}
      </div>
    </DataContext.Provider>
  );
};

export default Datagrid;
