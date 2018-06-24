import * as React from 'react';
import { types } from '../stores';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import {
  classNames as CX,
  getMousePosition,
  getScrollPositionByScrollBar,
} from '../utils';

interface IProps extends IDataGridStore {}
interface IState {}

type scrollTypes = 'horizontal' | 'vertical';

class DatagridScroll extends React.Component<IProps, IState> {
  state = {};

  onClickScrollArrow = (e: any, d: any) => {};
  onClickScrollTrack = (e: any, d: any) => {};
  onMouseDownScrollBar = (e: any, barName: scrollTypes) => {
    const {
      dragging = false,
      scrollLeft = 0,
      scrollTop = 0,
      options = {},
      styles = {},
      dispatch,
    } = this.props;

    const {
      horizontalScrollerWidth = 0,
      horizontalScrollBarWidth = 0,
      scrollContentWidth = 0,
      scrollContentContainerWidth = 0,
      verticalScrollerHeight = 0,
      verticalScrollBarHeight = 0,
      scrollContentHeight = 0,
      scrollContentContainerHeight = 0,
    } = styles;

    e.preventDefault();

    const currScrollBarLeft: number =
      -scrollLeft *
      (horizontalScrollerWidth - horizontalScrollBarWidth) /
      (scrollContentWidth - scrollContentContainerWidth);
    const currScrollBarTop: number =
      -scrollTop *
      (verticalScrollerHeight - verticalScrollBarHeight) /
      (scrollContentHeight - scrollContentContainerHeight);

    let startMousePosition = getMousePosition(e);

    const onMouseMove = (ee: any) => {
      if (!dragging) {
        dispatch({ dragging: true });
      }
      const { x, y } = getMousePosition(ee);

      const processor = {
        vertical: () => {
          let {
            scrollLeft: currScrollLeft = 0,
            scrollTop: currScrollTop = 0,
          } = getScrollPositionByScrollBar(
            currScrollBarLeft,
            currScrollBarTop + (y - startMousePosition.y),
            styles,
          );

          dispatch({
            scrollLeft: currScrollLeft,
            scrollTop: currScrollTop,
          });
        },
        horizontal: () => {
          let {
            scrollLeft: currScrollLeft = 0,
            scrollTop: currScrollTop = 0,
          } = getScrollPositionByScrollBar(
            currScrollBarLeft + (x - startMousePosition.x),
            currScrollBarTop,
            styles,
          );

          dispatch({
            scrollLeft: currScrollLeft,
            scrollTop: currScrollTop,
          });
        },
      };

      if (barName in processor) {
        processor[barName]();
      }
    };

    const offEvent = (ee: any) => {
      ee.preventDefault();

      dispatch({ dragging: false });
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', offEvent);
      document.removeEventListener('mouseleave', offEvent);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', offEvent);
    document.addEventListener('mouseleave', offEvent);
  };

  render() {
    const {
      scrollLeft = 0,
      scrollTop = 0,
      options = {},
      styles = {},
    } = this.props;

    const {
      pageHeight = 0,
      verticalScrollerWidth = 0,
      verticalScrollerHeight = 0,
      horizontalScrollerWidth = 0,
      horizontalScrollerHeight = 0,

      verticalScrollBarHeight = 0,
      horizontalScrollBarWidth = 0,
      scrollerArrowSize = 0,
      scrollerPadding = 0,

      scrollContentContainerWidth = 1,
      scrollContentContainerHeight = 1,
      scrollContentWidth = 0,
      scrollContentHeight = 0,
    } = styles;

    const scrollBarLeft =
      -scrollLeft *
      (horizontalScrollerWidth - horizontalScrollBarWidth) /
      (scrollContentWidth - scrollContentContainerWidth);

    const scrollBarTop =
      -scrollTop *
      (verticalScrollerHeight - verticalScrollBarHeight) /
      (scrollContentHeight - scrollContentContainerHeight);

    if (verticalScrollerWidth === 0 && horizontalScrollerHeight === 0) {
      return null;
    }

    let arrowWidth = (scrollerArrowSize - scrollerPadding * 2) / 2;
    let verticalArrowStyles = {
      width: verticalScrollerWidth,
      height: scrollerArrowSize / 2 + scrollerPadding,
    };

    let verticalTopArrowStyles = {
      left: scrollerPadding,
      top: (verticalArrowStyles.height - arrowWidth) / 2,
      borderTop: '0 none',
      borderRight: 'solid ' + arrowWidth + 'px transparent',
      borderBottomWidth: arrowWidth + 'px',
      borderLeft: 'solid ' + arrowWidth + 'px transparent',
    };
    let verticalBottomArrowStyles = {
      left: scrollerPadding,
      top: (verticalArrowStyles.height - arrowWidth) / 2,
      borderTopWidth: arrowWidth + 'px',
      borderRight: 'solid ' + arrowWidth + 'px transparent',
      borderBottom: '0 none',
      borderLeft: 'solid ' + arrowWidth + 'px transparent',
    };
    let verticalStyles = {
      width: verticalScrollerWidth,
      height: verticalScrollerHeight + scrollerPadding * 2 + scrollerArrowSize,
      bottom: pageHeight,
      padding: scrollerPadding,
      paddingTop: scrollerArrowSize / 2 + scrollerPadding,
    };
    let verticalBarStyles = {
      height: verticalScrollBarHeight,
      top: scrollBarTop,
    };
    let horizontalArrowStyles = {
      width: scrollerArrowSize / 2 + scrollerPadding,
      height: horizontalScrollerHeight,
    };
    let horizontalLeftArrowStyles = {
      left: (horizontalArrowStyles.width - arrowWidth) / 2,
      top: scrollerPadding,
      borderTop: 'solid ' + arrowWidth + 'px transparent',
      borderRightWidth: arrowWidth + 'px',
      borderBottom: 'solid ' + arrowWidth + 'px transparent',
      borderLeft: '0 none',
    };
    let horizontalRightArrowStyles = {
      left: (horizontalArrowStyles.width - arrowWidth) / 2,
      top: scrollerPadding,
      borderTop: 'solid ' + arrowWidth + 'px transparent',
      borderRight: '0 none',
      borderBottom: 'solid ' + arrowWidth + 'px transparent',
      borderLeftWidth: arrowWidth + 'px',
    };
    let horizontalStyles = {
      width: horizontalScrollerWidth + scrollerPadding * 2 + scrollerArrowSize,
      height: horizontalScrollerHeight,
      bottom: (pageHeight - 1 - horizontalScrollerHeight) / 2,
      right: (pageHeight - 1 - horizontalScrollerHeight) / 2,
      padding: scrollerPadding,
      paddingLeft: scrollerArrowSize / 2 + scrollerPadding,
    };
    let horizontalBarStyles = {
      width: horizontalScrollBarWidth,
      left: scrollBarLeft,
    };

    return (
      <div className="axui-datagrid-scroller">
        {verticalScrollerWidth ? (
          <div data-scroll-track="vertical" style={verticalStyles}>
            <div data-scroll-arrow="up" style={verticalArrowStyles}>
              <div
                data-arrow
                style={verticalTopArrowStyles}
                onClick={e => this.onClickScrollArrow(e, 'up')}
              />
            </div>
            <div
              data-scroll="vertical"
              onClick={e => this.onClickScrollTrack(e, 'vertical')}
            >
              <div
                className="axui-datagrid-scroll-bar"
                style={verticalBarStyles}
                onMouseDown={e => this.onMouseDownScrollBar(e, 'vertical')}
              />
            </div>
            <div data-scroll-arrow="down" style={verticalArrowStyles}>
              <div
                data-arrow
                style={verticalBottomArrowStyles}
                onClick={e => this.onClickScrollArrow(e, 'down')}
              />
            </div>
          </div>
        ) : null}
        {horizontalScrollerHeight ? (
          <div data-scroll-track="horizontal" style={horizontalStyles}>
            <div data-scroll-arrow="left" style={horizontalArrowStyles}>
              <div
                data-arrow
                style={horizontalLeftArrowStyles}
                onClick={e => this.onClickScrollArrow(e, 'left')}
              />
            </div>
            <div
              data-scroll="horizontal"
              onClick={e => this.onClickScrollTrack(e, 'horizontal')}
            >
              <div
                className="axui-datagrid-scroll-bar"
                style={horizontalBarStyles}
                onMouseDown={e => this.onMouseDownScrollBar(e, 'horizontal')}
              />
            </div>
            <div data-scroll-arrow="right" style={horizontalArrowStyles}>
              <div
                data-arrow
                style={horizontalRightArrowStyles}
                onClick={e => this.onClickScrollArrow(e, 'right')}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connectStore(DatagridScroll);
