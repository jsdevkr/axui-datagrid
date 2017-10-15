import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';

const GridScroll = ({
                      mounted,
                      styles
                    }) => {

  if (!mounted) {
    return null;
  }



  return (
    <div className={classNames(sass.gridScroller)}>
      <div data-scroll="vertical">
        <div data-scroll="vertical-bar"></div>
      </div>
      <div data-scroll="horizontal">
        <div data-scroll="horizontal-bar"></div>
      </div>
      <div data-scroll="corner"></div>
    </div>
  )
};

export default GridScroll;