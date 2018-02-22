import * as React from 'react';
import cx from 'classnames';

export class GridScroll extends React.Component<iAXDataGridScrollProps, iAXDataGridScrollState> {
  constructor( props: iAXDataGridScrollProps ) {
    super( props );

    this.onClickScrollTrack = this.onClickScrollTrack.bind( this );
  }

  public onClickScrollTrack( e, barName ) {
    e.preventDefault();
    if ( e.target.getAttribute( 'data-scroll' ) ) {
      this.props.onClickScrollTrack( e, barName );
    }
  }

  public render() {

    const {
            mounted,
            bodyHeight,
            pageHeight,
            verticalScrollerHeight,
            verticalScrollerWidth,
            horizontalScrollerWidth,
            horizontalScrollerHeight,
            verticalScrollBarHeight,
            horizontalScrollBarWidth,
            scrollerArrowSize,
            scrollerPadding,
            scrollBarLeft,
            scrollBarTop,
            onMouseDownScrollBar,
            onClickScrollArrow,
          } = this.props;

    if ( !mounted ) return null;
    if ( verticalScrollerWidth === 0 && horizontalScrollerHeight === 0 ) return null;

    let arrowWidth = (scrollerArrowSize - scrollerPadding * 2) / 2;
    let verticalArrowStyles = {
      width: verticalScrollerWidth,
      height: scrollerArrowSize / 2 + scrollerPadding
    };


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

    return (
      <div className={cx( 'axd-scroller' )}>
        {(verticalScrollerWidth) ? (
          <div data-scroll-track='vertical' style={verticalStyles}>
            <div data-scroll-arrow='up' style={verticalArrowStyles}>
              <div data-arrow style={verticalTopArrowStyles} onClick={e => onClickScrollArrow( e, 'up' )} />
            </div>
            <div data-scroll='vertical'
                 onClick={e => this.onClickScrollTrack( e, 'vertical' )}>
              <div className={cx( 'axd-scroll-bar' )}
                   style={verticalBarStyles}
                   onMouseDown={e => onMouseDownScrollBar( e, 'vertical' )} />
            </div>
            <div data-scroll-arrow='down' style={verticalArrowStyles}>
              <div data-arrow style={verticalBottomArrowStyles} onClick={e => onClickScrollArrow( e, 'down' )} />
            </div>
          </div>
        ) : null}
        {(horizontalScrollerHeight) ? (
          <div data-scroll-track='horizontal' style={horizontalStyles}>
            <div data-scroll-arrow='left' style={horizontalArrowStyles}>
              <div data-arrow style={horizontalLeftArrowStyles} onClick={e => onClickScrollArrow( e, 'left' )} />
            </div>
            <div data-scroll='horizontal'
                 onClick={e => this.onClickScrollTrack( e, 'horizontal' )}>
              <div className={cx( 'axd-scroll-bar' )}
                   style={horizontalBarStyles}
                   onMouseDown={( e ) => onMouseDownScrollBar( e, 'horizontal' )} />
            </div>
            <div data-scroll-arrow='right' style={horizontalArrowStyles}>
              <div data-arrow style={horizontalRightArrowStyles} onClick={e => onClickScrollArrow( e, 'right' )} />
            </div>
          </div>
        ) : null}
      </div>
    );

  }
}
