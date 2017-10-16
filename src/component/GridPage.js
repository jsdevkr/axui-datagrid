import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';

const GridPage = ({
                    mounted,
                    styles
                  }) => {

  if (!mounted) return null;

  return (
    <div className={classNames(sass.gridPage)} style={{height: styles.pageHeight}}>

    </div>
  )
};

export default GridPage;