import * as React from 'react';
import classNames from 'classnames';
export class GridScroll extends React.Component {
    constructor(props) {
        super(props);
        this.onClickScrollTrack = this.onClickScrollTrack.bind(this);
    }
    /*
    // 사실상 항상 리랜더 해야 하는 컴포넌트라서 제어하지 않을 작정
      shouldComponentUpdate(nextProps, nextState) {
        let sameProps = false;
  
        for(const k in this.props){
          if(typeof nextProps[k] === 'undefined' || nextProps[k] !== this.props[k]){
            sameProps = true;
          }
        }
  
        return sameProps;
      }
    */
    onClickScrollTrack(e, barName) {
        e.preventDefault();
        if (e.target.getAttribute('data-scroll')) {
            this.props.onClickScrollTrack(e, barName);
        }
    }
    render() {
        const { mounted, bodyHeight, pageHeight, verticalScrollerHeight, verticalScrollerWidth, horizontalScrollerWidth, horizontalScrollerHeight, verticalScrollBarHeight, horizontalScrollBarWidth, scrollerArrowSize, scrollerPadding, scrollBarLeft, scrollBarTop, onMouseDownScrollBar, onClickScrollArrow, } = this.props;
        if (!mounted)
            return null;
        if (verticalScrollerWidth === 0 && horizontalScrollerHeight === 0)
            return null;
        let verticalArrowStyles = {
            width: verticalScrollerWidth,
            height: scrollerArrowSize / 2 + scrollerPadding
        };
        let arrowWidth = (scrollerArrowSize - scrollerPadding * 2) / 2;
        let verticalTopArrowStyles = {
            left: scrollerPadding,
            top: (verticalArrowStyles.height - arrowWidth) / 2,
            borderTop: '0 none',
            borderRight: 'solid ' + arrowWidth + 'px transparent',
            borderBottomWidth: (arrowWidth) + 'px',
            borderLeft: 'solid ' + arrowWidth + 'px transparent'
        };
        let verticalBottomArrowStyles = {
            left: scrollerPadding,
            top: (verticalArrowStyles.height - arrowWidth) / 2,
            borderTopWidth: (arrowWidth) + 'px',
            borderRight: 'solid ' + arrowWidth + 'px transparent',
            borderBottom: '0 none',
            borderLeft: 'solid ' + arrowWidth + 'px transparent'
        };
        let verticalStyles = {
            width: verticalScrollerWidth,
            height: verticalScrollerHeight + scrollerPadding * 2 + scrollerArrowSize,
            bottom: pageHeight,
            padding: scrollerPadding,
            paddingTop: scrollerArrowSize / 2 + scrollerPadding
        };
        let verticalBarStyles = {
            height: verticalScrollBarHeight,
            top: scrollBarTop
        };
        let horizontalArrowStyles = {
            width: scrollerArrowSize / 2 + scrollerPadding,
            height: horizontalScrollerHeight
        };
        let horizontalLeftArrowStyles = {
            left: (horizontalArrowStyles.width - arrowWidth) / 2,
            top: scrollerPadding,
            borderTop: 'solid ' + arrowWidth + 'px transparent',
            borderRightWidth: (arrowWidth) + 'px',
            borderBottom: 'solid ' + arrowWidth + 'px transparent',
            borderLeft: '0 none'
        };
        let horizontalRightArrowStyles = {
            left: (horizontalArrowStyles.width - arrowWidth) / 2,
            top: scrollerPadding,
            borderTop: 'solid ' + arrowWidth + 'px transparent',
            borderRight: '0 none',
            borderBottom: 'solid ' + arrowWidth + 'px transparent',
            borderLeftWidth: (arrowWidth) + 'px'
        };
        let horizontalStyles = {
            width: horizontalScrollerWidth + scrollerPadding * 2 + scrollerArrowSize,
            height: horizontalScrollerHeight,
            bottom: (pageHeight - 1 - horizontalScrollerHeight) / 2,
            right: (pageHeight - 1 - horizontalScrollerHeight) / 2,
            padding: scrollerPadding,
            paddingLeft: scrollerArrowSize / 2 + scrollerPadding
        };
        let horizontalBarStyles = {
            width: horizontalScrollBarWidth,
            left: scrollBarLeft
        };
        return (React.createElement("div", { className: classNames('axd-scroller') },
            (verticalScrollerWidth) ? (React.createElement("div", { "data-scroll-track": 'vertical', style: verticalStyles },
                React.createElement("div", { "data-scroll-arrow": 'up', style: verticalArrowStyles },
                    React.createElement("div", { "data-arrow": true, style: verticalTopArrowStyles, onClick: e => onClickScrollArrow(e, 'up') })),
                React.createElement("div", { "data-scroll": 'vertical', onClick: e => this.onClickScrollTrack(e, 'vertical') },
                    React.createElement("div", { className: classNames('axd-scroll-bar'), style: verticalBarStyles, onMouseDown: e => onMouseDownScrollBar(e, 'vertical') })),
                React.createElement("div", { "data-scroll-arrow": 'down', style: verticalArrowStyles },
                    React.createElement("div", { "data-arrow": true, style: verticalBottomArrowStyles, onClick: e => onClickScrollArrow(e, 'down') })))) : null,
            (horizontalScrollerHeight) ? (React.createElement("div", { "data-scroll-track": 'horizontal', style: horizontalStyles },
                React.createElement("div", { "data-scroll-arrow": 'left', style: horizontalArrowStyles },
                    React.createElement("div", { "data-arrow": true, style: horizontalLeftArrowStyles, onClick: e => onClickScrollArrow(e, 'left') })),
                React.createElement("div", { "data-scroll": 'horizontal', onClick: e => this.onClickScrollTrack(e, 'horizontal') },
                    React.createElement("div", { className: classNames('axd-scroll-bar'), style: horizontalBarStyles, onMouseDown: (e) => onMouseDownScrollBar(e, 'horizontal') })),
                React.createElement("div", { "data-scroll-arrow": 'right', style: horizontalArrowStyles },
                    React.createElement("div", { "data-arrow": true, style: horizontalRightArrowStyles, onClick: e => onClickScrollArrow(e, 'right') })))) : null));
    }
}
