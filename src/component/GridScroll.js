import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';


class GridScroll extends React.Component {
  constructor(props) {
    super(props);

    this.onClickScrollTrack = this.onClickScrollTrack.bind(this);
  }

  /*
  // 사실상 항상 리랜더 해야 하는 컴포넌트라서 제어하지 않을 작정
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

  onClickScrollTrack(e, barName) {
    e.preventDefault();
    if (e.target.getAttribute("data-scroll")) {
      this.props.onClickScrollTrack(e, barName);
    }
  }

  render() {
    const refCallback              = this.props.refCallback,
          onMouseDownScrollBar     = this.props.onMouseDownScrollBar,
          mounted                  = this.props.mounted,
          CTInnerWidth             = this.props.CTInnerWidth,
          CTInnerHeight            = this.props.CTInnerHeight,
          pageHeight               = this.props.pageHeight,
          verticalScrollerWidth    = this.props.verticalScrollerWidth,
          horizontalScrollerHeight = this.props.horizontalScrollerHeight,
          verticalScrollBarHeight  = this.props.verticalScrollBarHeight,
          horizontalScrollBarWidth = this.props.horizontalScrollBarWidth,
          scrollBarLeft            = this.props.scrollBarLeft,
          scrollBarTop             = this.props.scrollBarTop;

    if (!mounted) return null;
    
    if (verticalScrollerWidth === 0 && horizontalScrollerHeight === 0) return null;

    let verticalStyles = {
      width: verticalScrollerWidth,
      height: CTInnerHeight,
      bottom: pageHeight + ((horizontalScrollerHeight) ? horizontalScrollerHeight : 0)
    };
    let verticalBarStyles = {
      height: verticalScrollBarHeight,
      top: scrollBarTop
    };
    let horizontalStyles = {
      width: CTInnerWidth,
      height: horizontalScrollerHeight,
      bottom: pageHeight,
      right: (verticalScrollerWidth) ? verticalScrollerWidth : 0
    };
    let horizontalBarStyles = {
      width: horizontalScrollBarWidth,
      left: scrollBarLeft
    };
    let cornerStyle = {
      width: verticalScrollerWidth,
      height: horizontalScrollerHeight,
      bottom: pageHeight
    };

    return (
      <div className={classNames(sass.gridScroller)}>
        {(verticalScrollerWidth) ? (
          <div data-scroll="vertical"
               style={verticalStyles}
               ref={ref => refCallback("vertical-scroll-track", ref)}
               onClick={e => this.onClickScrollTrack(e, "vertical")}>
            <div className={classNames(sass.scrollBar)}
                 style={verticalBarStyles}
                 onMouseDown={e => onMouseDownScrollBar(e, "vertical")} />
          </div>
        ) : null}
        {(horizontalScrollerHeight) ? (
          <div data-scroll="horizontal"
               style={horizontalStyles}
               ref={ref => refCallback("horizontal-scroll-track", ref)}
               onClick={e => this.onClickScrollTrack(e, "horizontal")}>
            <div className={classNames(sass.scrollBar)}
                 style={horizontalBarStyles}
                 onMouseDown={(e) => onMouseDownScrollBar(e, "horizontal")} />
          </div>
        ) : null}
        {(verticalScrollerWidth && horizontalScrollerHeight) ? (<div data-scroll="corner" style={cornerStyle} />) : null}
      </div>
    )

  }
}

export default GridScroll;