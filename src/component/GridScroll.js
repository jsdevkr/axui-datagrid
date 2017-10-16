import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';

const GridScroll = ({
                      mounted,
                      CTInnerWidth,
                      CTInnerHeight,
                      pageHeight,
                      verticalScrollerWidth,
                      horizontalScrollerHeight,
                      scrollContentContainerHeight,
                      scrollContentHeight,
                      scrollContentContainerWidth,
                      scrollContentWidth,
                      trackPadding
                    }) => {

  if (!mounted) return null;
  if (verticalScrollerWidth == 0 && horizontalScrollerHeight == 0) return null;

  let verticalScrollBarHeight = scrollContentContainerHeight * CTInnerHeight / scrollContentHeight,
      horizontalScrollBarWidth = scrollContentContainerWidth * CTInnerWidth / scrollContentWidth;

  let verticalStyles = {
    width: verticalScrollerWidth,
    height: CTInnerHeight,
    bottom: pageHeight + ((horizontalScrollerHeight) ? horizontalScrollerHeight : 0)
  };
  let verticalBarStyles = {
    height: verticalScrollBarHeight
  };
  let horizontalStyles = {
    width: CTInnerWidth,
    height: horizontalScrollerHeight,
    bottom: pageHeight,
    right: (verticalScrollerWidth) ? verticalScrollerWidth : 0
  };
  let horizontalBarStyles = {
    width: horizontalScrollBarWidth
  };
  let cornerStyle = {
    width: verticalScrollerWidth,
    height: horizontalScrollerHeight,
    bottom: pageHeight
  };

  return (
    <div className={classNames(sass.gridScroller)}>
      {(verticalScrollerWidth) ? (
        <div data-scroll="vertical" style={verticalStyles}>
          <div className={classNames(sass.scrollBar)} style={verticalBarStyles} />
        </div>
      ) : null}
      {(horizontalScrollerHeight) ? (
        <div data-scroll="horizontal" style={horizontalStyles}>
          <div className={classNames(sass.scrollBar)} style={horizontalBarStyles} />
        </div>
      ) : null}
      {(verticalScrollerWidth && horizontalScrollerHeight) ? (<div data-scroll="corner" style={cornerStyle} />) : null}
    </div>
  )
};

export default GridScroll;