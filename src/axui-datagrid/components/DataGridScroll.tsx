import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { getMousePosition, getScrollPositionByScrollBar } from '../utils';
import { DataGridEnums } from '../common/@enums';

interface IProps extends IDataGridStore {}

class DatagridScroll extends React.Component<IProps> {
  state = {};

  onClickScrollArrow = (
    e: React.MouseEvent<HTMLDivElement>,
    direction: DataGridEnums.DirectionTypes,
  ) => {
    const {
      scrollLeft = 0,
      scrollTop = 0,
      styles = {},
      setStoreState,
      loading,
      loadingData,
    } = this.props;

    if (loading || loadingData) {
      return false;
    }

    const {
      scrollContentWidth = 0,
      scrollContentContainerWidth = 0,
      scrollContentHeight = 0,
      scrollContentContainerHeight = 0,
    } = styles;

    const processor = {
      [DataGridEnums.DirectionTypes.UP]: () => {
        let scrollAmount = scrollContentContainerHeight;
        setStoreState({
          scrollTop:
            scrollTop + scrollAmount < 0 ? scrollTop + scrollAmount : 0,
        });
      },
      [DataGridEnums.DirectionTypes.DOWN]: () => {
        let scrollAmount = scrollContentContainerHeight;
        setStoreState({
          scrollTop:
            scrollContentContainerHeight <
            scrollContentHeight + (scrollTop - scrollAmount)
              ? scrollTop - scrollAmount
              : scrollContentContainerHeight - scrollContentHeight,
        });
      },
      [DataGridEnums.DirectionTypes.LEFT]: () => {
        let scrollAmount = scrollContentContainerWidth;
        setStoreState({
          scrollLeft:
            scrollLeft + scrollAmount < 0 ? scrollLeft + scrollAmount : 0,
        });
      },
      [DataGridEnums.DirectionTypes.RIGHT]: () => {
        let scrollAmount = scrollContentContainerWidth;
        setStoreState({
          scrollLeft:
            scrollContentContainerWidth <
            scrollContentWidth + (scrollLeft - scrollAmount)
              ? scrollLeft - scrollAmount
              : scrollContentContainerWidth - scrollContentWidth,
        });
      },
    };

    processor[direction]();

    return true;
  };

  onClickScrollTrack = (
    e: React.MouseEvent<HTMLDivElement>,
    barName: DataGridEnums.ScrollTypes,
  ) => {
    const {
      rootNode,
      scrollLeft = 0,
      scrollTop = 0,
      styles = {},
      setStoreState,
      loading,
      loadingData,
    } = this.props;

    if (loading || loadingData) {
      return false;
    }

    e.preventDefault();

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

    const currScrollBarLeft: number =
      (-scrollLeft * (horizontalScrollerWidth - horizontalScrollBarWidth)) /
        (scrollContentWidth - scrollContentContainerWidth) || 1;
    const currScrollBarTop: number =
      (-scrollTop * (verticalScrollerHeight - verticalScrollBarHeight)) /
        (scrollContentHeight - scrollContentContainerHeight) || 1;

    const { x: mouseX, y: mouseY } = getMousePosition(e);
    const { x: grx = 0, y: gry = 0 } =
      rootNode && rootNode.current
        ? (rootNode.current.getBoundingClientRect() as any)
        : {};

    const processor = {
      [DataGridEnums.ScrollTypes.VERTICAL]: () => {
        let {
          scrollLeft: currScrollLeft = 0,
          scrollTop: currScrollTop = 0,
        } = getScrollPositionByScrollBar(
          currScrollBarLeft,
          mouseY - gry - verticalScrollBarHeight / 2,
          styles,
        );
        setStoreState({
          scrollLeft: currScrollLeft,
          scrollTop: currScrollTop,
        });
      },
      [DataGridEnums.ScrollTypes.HORIZONTAL]: () => {
        let {
          scrollLeft: currScrollLeft = 0,
          scrollTop: currScrollTop = 0,
        } = getScrollPositionByScrollBar(
          mouseX - grx - horizontalScrollBarWidth / 2,
          currScrollBarTop,
          styles,
        );
        setStoreState({
          scrollLeft: currScrollLeft,
          scrollTop: currScrollTop,
        });
      },
    };

    if ((e.target as any).getAttribute('data-scroll')) {
      processor[barName]();
    }

    return true;
  };

  onMouseDownScrollBar = (
    e: React.MouseEvent<HTMLDivElement>,
    barName: DataGridEnums.ScrollTypes,
  ) => {
    const {
      scrollLeft = 0,
      scrollTop = 0,
      styles = {},
      setStoreState,
      loading,
      loadingData,
    } = this.props;

    if (loading || loadingData) {
      return false;
    }

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
      (-scrollLeft * (horizontalScrollerWidth - horizontalScrollBarWidth)) /
        (scrollContentWidth - scrollContentContainerWidth) || 0;
    const currScrollBarTop: number =
      (-scrollTop * (verticalScrollerHeight - verticalScrollBarHeight)) /
        (scrollContentHeight - scrollContentContainerHeight) || 0;

    let startMousePosition = getMousePosition(e);

    const onMouseMove = (ee: any) => {
      const { x, y } = getMousePosition(ee);

      const processor = {
        [DataGridEnums.ScrollTypes.VERTICAL]: () => {
          let {
            scrollLeft: currScrollLeft = 0,
            scrollTop: currScrollTop = 0,
          } = getScrollPositionByScrollBar(
            currScrollBarLeft,
            currScrollBarTop + (y - startMousePosition.y),
            styles,
          );

          setStoreState({
            scrollLeft: currScrollLeft,
            scrollTop: currScrollTop,
          });
        },
        [DataGridEnums.ScrollTypes.HORIZONTAL]: () => {
          let {
            scrollLeft: currScrollLeft = 0,
            scrollTop: currScrollTop = 0,
          } = getScrollPositionByScrollBar(
            currScrollBarLeft + (x - startMousePosition.x),
            currScrollBarTop,
            styles,
          );

          setStoreState({
            scrollLeft: currScrollLeft,
            scrollTop: currScrollTop,
          });
        },
      };
      processor[barName]();
    };

    const offEvent = (ee: any) => {
      ee.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', offEvent);
      document.removeEventListener('mouseleave', offEvent);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', offEvent);
    document.addEventListener('mouseleave', offEvent);

    return true;
  };

  render() {
    const {
      scrollLeft = 0,
      scrollTop = 0,
      styles = {},
      options = {},
    } = this.props;

    const {
      pageHeight = 0,
      verticalScrollerWidth = 0,
      verticalScrollerHeight = 0,
      horizontalScrollerWidth = 0,
      horizontalScrollerHeight = 0,

      verticalScrollBarHeight = 0,
      horizontalScrollBarWidth = 0,

      scrollerPadding = 0,
      scrollerArrowSize = 0,

      scrollContentContainerWidth = 1,
      scrollContentContainerHeight = 1,
      scrollContentWidth = 0,
      scrollContentHeight = 0,
    } = styles;

    const { scroller = {} } = options;
    const { theme = 'default' } = scroller;

    let scrollBarLeft: number =
      (-scrollLeft * (horizontalScrollerWidth - horizontalScrollBarWidth)) /
        (scrollContentWidth - scrollContentContainerWidth) || 1;

    if (horizontalScrollBarWidth + scrollBarLeft > horizontalScrollerWidth) {
      scrollBarLeft = horizontalScrollerWidth - horizontalScrollBarWidth;
    }

    let scrollBarTop: number =
      (-scrollTop * (verticalScrollerHeight - verticalScrollBarHeight)) /
        (scrollContentHeight - scrollContentContainerHeight) || 1;

    if (verticalScrollBarHeight + scrollBarTop > verticalScrollerHeight) {
      scrollBarTop = verticalScrollerHeight - verticalScrollBarHeight;
    }

    if (verticalScrollerWidth === 0 && horizontalScrollerHeight === 0) {
      return null;
    }

    let arrowWidth: number = (scrollerArrowSize - scrollerPadding * 2) / 2;
    let verticalArrowStyles = {
      width: verticalScrollerWidth,
      height: scrollerArrowSize / 2 + scrollerPadding,
    };

    let verticalTopArrowStyles = {
      left: scrollerPadding,
      top: (verticalArrowStyles.height - arrowWidth) / 2 + 1,
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
      height: verticalScrollerHeight + scrollerArrowSize + scrollerPadding * 2,
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
            {theme === 'default' && (
              <div data-scroll-arrow="up" style={verticalArrowStyles}>
                <div
                  data-arrow
                  style={verticalTopArrowStyles}
                  onClick={e =>
                    this.onClickScrollArrow(e, DataGridEnums.DirectionTypes.UP)
                  }
                />
              </div>
            )}
            <div
              data-scroll="vertical"
              onClick={e =>
                this.onClickScrollTrack(e, DataGridEnums.ScrollTypes.VERTICAL)
              }
            >
              <div
                className="axui-datagrid-scroll-bar"
                style={verticalBarStyles}
                onMouseDown={e =>
                  this.onMouseDownScrollBar(
                    e,
                    DataGridEnums.ScrollTypes.VERTICAL,
                  )
                }
              />
            </div>
            {theme === 'default' && (
              <div data-scroll-arrow="down" style={verticalArrowStyles}>
                <div
                  data-arrow
                  style={verticalBottomArrowStyles}
                  onClick={e =>
                    this.onClickScrollArrow(
                      e,
                      DataGridEnums.DirectionTypes.DOWN,
                    )
                  }
                />
              </div>
            )}
          </div>
        ) : null}
        {horizontalScrollerHeight ? (
          <div data-scroll-track="horizontal" style={horizontalStyles}>
            {theme === 'default' && (
              <div data-scroll-arrow="left" style={horizontalArrowStyles}>
                <div
                  data-arrow
                  style={horizontalLeftArrowStyles}
                  onClick={e =>
                    this.onClickScrollArrow(
                      e,
                      DataGridEnums.DirectionTypes.LEFT,
                    )
                  }
                />
              </div>
            )}
            <div
              data-scroll="horizontal"
              onClick={e =>
                this.onClickScrollTrack(e, DataGridEnums.ScrollTypes.HORIZONTAL)
              }
            >
              <div
                className="axui-datagrid-scroll-bar"
                style={horizontalBarStyles}
                onMouseDown={e =>
                  this.onMouseDownScrollBar(
                    e,
                    DataGridEnums.ScrollTypes.HORIZONTAL,
                  )
                }
              />
            </div>

            {theme === 'default' && (
              <div data-scroll-arrow="right" style={horizontalArrowStyles}>
                <div
                  data-arrow
                  style={horizontalRightArrowStyles}
                  onClick={e =>
                    this.onClickScrollArrow(
                      e,
                      DataGridEnums.DirectionTypes.RIGHT,
                    )
                  }
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default connectStore(DatagridScroll);
