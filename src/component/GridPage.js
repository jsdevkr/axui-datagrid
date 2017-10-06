import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';

const GridPage = ({
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
    <div className={classNames(sass.gridPage)} style={{}}>

    </div>
  )
};

export default GridPage;