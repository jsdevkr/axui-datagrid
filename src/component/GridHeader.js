import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';


const GridHeader = ({headerTable}) => {
  const DIV_headerTable = headerTable.toJS();
  return (
    <div className={classNames(sass.gridHeader)}>

    </div>
  )
};

export default GridHeader;