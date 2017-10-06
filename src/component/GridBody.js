import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';

const GridBody = ({
                      optionsHeader,
                      styles,
                      frozenColumnIndex,
                      colGroup,
                      headerTable,
                      asideColGroup,
                      leftHeaderColGroup,
                      headerColGroup,
                      asideHeaderData,
                      leftHeaderData,
                      headerData
                    }) => {

  return (
    <div className={classNames(sass.gridBody)} style={{}}>

    </div>
  )
};

export default GridBody;