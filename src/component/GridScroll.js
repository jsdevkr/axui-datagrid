import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';


class GridScroll extends React.Component {
  constructor(props) {
    super(props);

  }

  /*
  // 사실상 항상 리랜더 해야 하는 컴포넌트
    shouldComponentUpdate(nextProps, nextState) {
      let sameProps = false;

      for(const k in this.props){
        if(typeof nextProps[k] === "undefined" || nextProps[k] !== this.props[k]){
          sameProps = true;
        }
      }

      return sameProps;
    }
  */
  render() {
    const onMouseDownScrollBar         = this.props.onMouseDownScrollBar,
          mounted                      = this.props.mounted,
          CTInnerWidth                 = this.props.CTInnerWidth,
          CTInnerHeight                = this.props.CTInnerHeight,
          pageHeight                   = this.props.pageHeight,
          verticalScrollerWidth        = this.props.verticalScrollerWidth,
          horizontalScrollerHeight     = this.props.horizontalScrollerHeight,
          scrollContentContainerHeight = this.props.scrollContentContainerHeight,
          scrollContentHeight          = this.props.scrollContentHeight,
          scrollContentContainerWidth  = this.props.scrollContentContainerWidth,
          scrollContentWidth           = this.props.scrollContentWidth,
          scrollLeft                   = this.props.scrollLeft,
          scrollTop                    = this.props.scrollTop;


    if (!mounted) return null;
    if (verticalScrollerWidth === 0 && horizontalScrollerHeight === 0) return null;

    let verticalScrollBarHeight  = scrollContentContainerHeight * CTInnerHeight / scrollContentHeight,
        horizontalScrollBarWidth = scrollContentContainerWidth * CTInnerWidth / scrollContentWidth;

    let verticalStyles = {
      width: verticalScrollerWidth,
      height: CTInnerHeight,
      bottom: pageHeight + ((horizontalScrollerHeight) ? horizontalScrollerHeight : 0)
    };
    let verticalBarStyles = {
      height: verticalScrollBarHeight,
      top: -scrollTop * (CTInnerHeight - verticalScrollBarHeight) / (scrollContentHeight - scrollContentContainerHeight)
    };
    let horizontalStyles = {
      width: CTInnerWidth,
      height: horizontalScrollerHeight,
      bottom: pageHeight,
      right: (verticalScrollerWidth) ? verticalScrollerWidth : 0
    };
    let horizontalBarStyles = {
      width: horizontalScrollBarWidth,
      left: -scrollLeft * (CTInnerWidth - horizontalScrollBarWidth) / (scrollContentWidth - scrollContentContainerWidth)
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
            <div className={classNames(sass.scrollBar)} style={verticalBarStyles} onMouseDown={(e) => onMouseDownScrollBar(e, "vertical")} />
          </div>
        ) : null}
        {(horizontalScrollerHeight) ? (
          <div data-scroll="horizontal" style={horizontalStyles}>
            <div className={classNames(sass.scrollBar)} style={horizontalBarStyles} onMouseDown={(e) => onMouseDownScrollBar(e, "horizontal")} />
          </div>
        ) : null}
        {(verticalScrollerWidth && horizontalScrollerHeight) ? (<div data-scroll="corner" style={cornerStyle} />) : null}
      </div>
    )


  }
}

export default GridScroll;