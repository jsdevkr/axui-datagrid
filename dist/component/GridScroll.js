import React from 'react';
import classNames from 'classnames';
import sass from '../scss/index.scss';
import PropTypes from 'prop-types';

class GridScroll extends React.Component {
  constructor(props) {
    super(props);

    this.onMouseDownScrollBar = this.onMouseDownScrollBar.bind(this);
    this.onMouseMoveScrollBar = this.onMouseMoveScrollBar.bind(this);
    this.onMouseUpScrollBar = this.onMouseUpScrollBar.bind(this);
    this.onClickScrollTrack = this.onClickScrollTrack.bind(this);
  }

  onMouseDownScrollBar() {}
  onMouseMoveScrollBar() {}
  onMouseUpScrollBar() {}
  onClickScrollTrack() {}

  render() {
    if (!this.props.mounted) return null;
    if (this.props.verticalScrollerWidth === 0 && this.props.horizontalScrollerHeight === 0) return null;

    let verticalScrollBarHeight = this.props.scrollContentContainerHeight * this.props.CTInnerHeight / this.props.scrollContentHeight,
        horizontalScrollBarWidth = this.props.scrollContentContainerWidth * this.props.CTInnerWidth / this.props.scrollContentWidth;

    let verticalStyles = {
      width: this.props.verticalScrollerWidth,
      height: this.props.CTInnerHeight,
      bottom: this.props.pageHeight + (this.props.horizontalScrollerHeight ? this.props.horizontalScrollerHeight : 0)
    };
    let verticalBarStyles = {
      height: verticalScrollBarHeight,
      top: -this.props.scrollTop * (this.props.CTInnerHeight - verticalScrollBarHeight) / (this.props.scrollContentHeight - this.props.scrollContentContainerHeight)
    };
    let horizontalStyles = {
      width: this.props.CTInnerWidth,
      height: this.props.horizontalScrollerHeight,
      bottom: this.props.pageHeight,
      right: this.props.verticalScrollerWidth ? this.props.verticalScrollerWidth : 0
    };
    let horizontalBarStyles = {
      width: horizontalScrollBarWidth,
      left: -this.props.scrollLeft * (this.props.CTInnerWidth - horizontalScrollBarWidth) / (this.props.scrollContentWidth - this.props.scrollContentContainerWidth)
    };
    let cornerStyle = {
      width: this.props.verticalScrollerWidth,
      height: this.props.horizontalScrollerHeight,
      bottom: this.props.pageHeight
    };

    return React.createElement(
      'div',
      { className: classNames(sass.gridScroller) },
      this.props.verticalScrollerWidth ? React.createElement(
        'div',
        { 'data-scroll': 'vertical', style: verticalStyles },
        React.createElement('div', { className: classNames(sass.scrollBar), style: verticalBarStyles })
      ) : null,
      this.props.horizontalScrollerHeight ? React.createElement(
        'div',
        { 'data-scroll': 'horizontal', style: horizontalStyles },
        React.createElement('div', { className: classNames(sass.scrollBar), style: horizontalBarStyles })
      ) : null,
      this.props.verticalScrollerWidth && this.props.horizontalScrollerHeight ? React.createElement('div', { 'data-scroll': 'corner', style: cornerStyle }) : null
    );
  }
}

GridScroll.propTypes = {
  refCallback: PropTypes.func,
  onMoveScrollBar: PropTypes.func,
  mounted: PropTypes.bool,
  optionsScroller: PropTypes.object,
  CTInnerWidth: PropTypes.number,
  CTInnerHeight: PropTypes.number,
  pageHeight: PropTypes.number,
  verticalScrollerWidth: PropTypes.number,
  horizontalScrollerHeight: PropTypes.number,
  scrollContentContainerHeight: PropTypes.number,
  scrollContentHeight: PropTypes.number,
  scrollContentContainerWidth: PropTypes.number,
  scrollContentWidth: PropTypes.number,
  scrollLeft: PropTypes.number,
  scrollTop: PropTypes.number
};

GridScroll.defaultProps = {
  scrollLeft: 0,
  scrollTop: 0
};

export default GridScroll;