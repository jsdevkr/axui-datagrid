import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';

const GridPage = ({
                    styles
                  }) => {

  return (
    <div className={classNames(sass.gridPage)} style={{height: styles.pageHeight}}>

    </div>
  )
};

export default GridPage;