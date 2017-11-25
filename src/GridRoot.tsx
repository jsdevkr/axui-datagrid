import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { assignWith, each, isArray, isEqual, isFunction, isObject, throttle } from 'lodash';
import { fromJS } from 'immutable';
import classNames from 'classnames';

import * as UTIL from './_inc/utils';
import { iGridRoot } from './_inc/namespaces';
import { gridOptions } from './_inc/defaults';
import { GridBody, GridHeader, GridPage, GridScroll, GridSelector } from './component';

export class GridRoot extends React.Component<iGridRoot.Props, iGridRoot.State> {

  public static defaultProps: Partial<iGridRoot.Props> = {
    height: '300px',
    columns: [],
    data: [],
    options: {}
  };

  private componentRefs: any;
  private data: any;
  private gridRootNode: any;
  private throttled_updateDimensions: any;
  private scrollMovingTimer: any;

  constructor(props: any) {
    super(props);

    this.componentRefs = {};
    this.data = {
      sColIndex: -1,
      eColIndex: -1
    };
    // 내부연산용 데이터 저장소
    this.state = {
      mounted: false,
      scrollLeft: 0,
      scrollTop: 0,
      dragging: false, // 사용자가 드래깅 중인 경우 (style.userSelect=none 처리)
      selecting: false,
      selectionStartOffset: {},
      selectionEndOffset: {},
      isInlineEditing: false,
      focusedColumn: {},
      selectedColumn: {},
      inlineEditingColumn: {},
      colGroup: [],
      colGroupMap: {},
      asideColGroup: [],
      leftHeaderColGroup: [],
      headerColGroup: [],
      bodyGrouping: [],
      headerTable: {},
      asideHeaderData: {},
      leftHeaderData: {},
      headerData: {},
      bodyRowTable: {},
      asideBodyRowData: {},
      leftBodyRowData: {},
      bodyRowData: {},
      bodyRowMap: {},
      bodyGroupingTable: {},
      asideBodyGroupingData: {},
      leftBodyGroupingData: {},
      bodyGroupingData: {},
      bodyGroupingMap: {},
      footSumColumns: [],
      footSumTable: {}, // footSum의 출력레이아웃
      leftFootSumData: {}, // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 왼쪽
      footSumData: {}, // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 오른쪽
      styles: {
        calculatedHeight: null,
        // 줄번호 + 줄셀렉터의 너비
        asidePanelWidth: 0,
        // 틀고정된 컬럼들의 너비
        frozenPanelWidth: 0,
        // 한줄의 높이
        bodyTrHeight: 0,
        // 컨테이너의 크기
        elWidth: 0,
        elHeight: 0,
        CTInnerWidth: 0,
        CTInnerHeight: 0,
        rightPanelWidth: 0,
        // 헤더의 높이
        headerHeight: 0,
        bodyHeight: 0,
        // 틀고정된 로우들의 높이
        frozenRowHeight: 0,
        // 풋섬의 높이
        footSumHeight: 0,
        // 페이징 영역의 높이
        pageHeight: 0,
        // scrollTack 의 크기 (너비, 높이)
        verticalScrollerWidth: 0,
        horizontalScrollerHeight: 0,

        scrollContentContainerHeight: 0,
        scrollContentHeight: 0,
        scrollContentContainerWidth: 0,
        scrollContentWidth: 0,
        verticalScrollerHeight: 0,
        verticalScrollBarHeight: 0,
        horizontalScrollerWidth: 0,
        horizontalScrollBarWidth: 0,
        scrollerPadding: 0,
        scrollerArrowSize: 0,
        pageButtonsContainerWidth: 0
      },
      options: (() => {
        let options = assignWith({}, gridOptions);
        each(props.options, function (v, k) {
          options[ k ] = (isObject(v)) ? assignWith(options[ k ], v) : v;
        });
        return options;
      })()
    };

    this.state = UTIL.propsToState(props, assignWith({}, this.state));

    // state 계산영역 끝
    this.props.init(props, this.state.options);

    // 이벤트 멤버에 바인딩
    this.onMouseDownScrollBar = this.onMouseDownScrollBar.bind(this);
    this.onClickScrollTrack = this.onClickScrollTrack.bind(this);
    this.onClickScrollArrow = this.onClickScrollArrow.bind(this);
    this.onResizeColumnResizer = this.onResizeColumnResizer.bind(this);
    this.onClickPageButton = this.onClickPageButton.bind(this);
    this.onMouseDownBody = this.onMouseDownBody.bind(this);
    this.refCallback = this.refCallback.bind(this);
  }

  public componentDidMount() {
    this.gridRootNode = ReactDOM.findDOMNode(this.refs.gridRoot);

    this.throttled_updateDimensions = throttle(this.updateDimensions.bind(this), 100);
    window.addEventListener('resize', this.throttled_updateDimensions);

    this.setState({
      mounted: true
    });
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.throttled_updateDimensions);
  }

  public componentWillReceiveProps(nextProps) {
    // 변경된 props를 받게 되면
    // 데이터 체인지
    if (this.props.data !== nextProps.data) {
      this.props.setData(nextProps.data, this.state.options);
    }

    if (this.props.options !== nextProps.options || this.props.columns !== nextProps.columns) {
      this.data._headerColGroup = undefined;
      this.data.sColIndex = -1;
      this.data.eColIndex = -1;

      let newState = UTIL.propsToState(nextProps, assignWith({}, this.state, {scrollLeft: 0, scrollTop: 0}));
      newState.styles = UTIL.calculateDimensions(this.gridRootNode, {list: this.props.store_list}, newState).styles;
      this.setState(newState);
    }
  }

  public shouldComponentUpdate(nextProps, nextState) {
    if (this.props.data !== nextProps.data) {
      return false;
    }
    if (
      this.props.store_list !== nextProps.store_list ||
      this.props.store_deletedList !== nextProps.store_deletedList ||
      this.props.store_page !== nextProps.store_page ||
      this.props.store_sortInfo !== nextProps.store_sortInfo
    ) {
      // redux store state가 변경되면 렌더를 바로 하지 말고 this.state.styles 변경하여 state에 의해 랜더링 되도록 함. (이중으로 랜더링 하기 싫음)

      const {styles} = UTIL.calculateDimensions(this.gridRootNode, {list: nextProps.store_list}, this.state);

      this.setState({
        styles: styles
      });
      return false;
    }

    return true;
  }

  public componentWillUpdate(nextProps) {
    // console.log(this.state.sColIndex);
    // shouldComponentUpdate에더 랜더를 방지 하거나. willUpdate에서 this.state.styles값 강제 변경 테스트.

  }

  public componentDidUpdate(prevProps, prevState) {
    // change props and render
    if (prevProps.height !== this.props.height) {
      this.updateDimensions();
    }
  }

  /**
   * 사용자 함수
   */
  public updateDimensions() {
    let {styles} = UTIL.calculateDimensions(this.gridRootNode, {list: this.props.store_list}, this.state);
    let {scrollLeft, scrollTop} = UTIL.getScrollPosition(this.state.scrollLeft, this.state.scrollTop, {
      scrollWidth: styles.scrollContentWidth,
      scrollHeight: styles.scrollContentHeight,
      clientWidth: styles.scrollContentContainerWidth,
      clientHeight: styles.scrollContentContainerHeight
    });
    this.setState({
      scrollLeft: scrollLeft,
      scrollTop: scrollTop,
      styles: styles
    });
  }

  public handleWheel(e) {
    let delta = {x: 0, y: 0};

    if (e.detail) {
      delta.y = e.detail * 10;
    }
    else {
      if (typeof e.deltaY === 'undefined') {
        delta.y = -e.wheelDelta;
        delta.x = 0;
      } else {
        delta.y = e.deltaY;
        delta.x = e.deltaX;
      }
    }

    let {scrollLeft, scrollTop, endScroll} = UTIL.getScrollPosition(this.state.scrollLeft - delta.x, this.state.scrollTop - delta.y, {
      scrollWidth: this.state.styles.scrollContentWidth,
      scrollHeight: this.state.styles.scrollContentHeight,
      clientWidth: this.state.styles.scrollContentContainerWidth,
      clientHeight: this.state.styles.scrollContentContainerHeight
    });
    this.setState({
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
    });

    if (!endScroll) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  public onMouseDownScrollBar(e: any, barName: string): void {
    e.preventDefault();
    const styles = this.state.styles;
    const currScrollBarLeft: number = -this.state.scrollLeft * (styles.horizontalScrollerWidth - styles.horizontalScrollBarWidth) / (styles.scrollContentWidth - styles.scrollContentContainerWidth);
    const currScrollBarTop: number = -this.state.scrollTop * (styles.verticalScrollerHeight - styles.verticalScrollBarHeight) / (styles.scrollContentHeight - styles.scrollContentContainerHeight);

    let startMousePosition = UTIL.getMousePosition(e);

    const onMouseMove = (ee) => {
      if (!this.state.dragging) {
        this.setState({dragging: true});
      }
      const {x, y} = UTIL.getMousePosition(ee);

      const processor = {
        vertical: () => {
          let {scrollLeft, scrollTop} = UTIL.getScrollPositionByScrollBar(currScrollBarLeft, currScrollBarTop + (y - startMousePosition.y), styles);
          this.setState({
            scrollLeft: scrollLeft,
            scrollTop: scrollTop
          });
        },
        horizontal: () => {
          let {scrollLeft, scrollTop} = UTIL.getScrollPositionByScrollBar(currScrollBarLeft + (x - startMousePosition.x), currScrollBarTop, styles);
          this.setState({
            scrollLeft: scrollLeft,
            scrollTop: scrollTop
          });
        }
      };

      if (barName in processor) {
        processor[ barName ]();
      }
    };

    const offEvent = (ee) => {
      ee.preventDefault();

      this.setState({dragging: false});
      startMousePosition = null;
      // console.log('offEvent');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', offEvent);
      document.removeEventListener('mouseleave', offEvent);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', offEvent);
    document.addEventListener('mouseleave', offEvent);
  }

  public onClickScrollTrack(e: any, barName: string) {
    const styles = this.state.styles;
    const currScrollBarLeft: number = -this.state.scrollLeft * (styles.horizontalScrollerWidth - styles.horizontalScrollBarWidth) / (styles.scrollContentWidth - styles.scrollContentContainerWidth);
    const currScrollBarTop: number = -this.state.scrollTop * (styles.verticalScrollerHeight - styles.verticalScrollBarHeight) / (styles.scrollContentHeight - styles.scrollContentContainerHeight);
    const {x, y} = UTIL.getMousePosition(e);
    const grx: number = this.gridRootNode.getBoundingClientRect().x;
    const gry: number = this.gridRootNode.getBoundingClientRect().y;

    const processor = {
      vertical: () => {
        let {scrollLeft, scrollTop} = UTIL.getScrollPositionByScrollBar(currScrollBarLeft, y - gry - (styles.verticalScrollBarHeight / 2), styles);
        this.setState({
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        });
      },
      horizontal: () => {
        let {scrollLeft, scrollTop} = UTIL.getScrollPositionByScrollBar(x - grx - styles.pageButtonsContainerWidth - (styles.horizontalScrollBarWidth / 2), currScrollBarTop, styles);
        this.setState({
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        });
      }
    };

    if (barName in processor) {
      processor[ barName ]();
    }
  }

  public onClickScrollArrow(e: any, direction: string) {
    const styles = this.state.styles;
    const processor = {
      up: () => {
        let scrollAmount = styles.scrollContentContainerHeight;
        this.setState({
          scrollTop: (this.state.scrollTop + scrollAmount < 0) ? this.state.scrollTop + scrollAmount : 0
        });
      },
      down: () => {
        let scrollAmount = styles.scrollContentContainerHeight;
        this.setState({
          scrollTop: (styles.scrollContentContainerHeight < styles.scrollContentHeight + (this.state.scrollTop - scrollAmount)) ? this.state.scrollTop - scrollAmount : styles.scrollContentContainerHeight - styles.scrollContentHeight
        });
      },
      left: () => {
        let scrollAmount = styles.scrollContentContainerWidth;
        this.setState({
          scrollLeft: (this.state.scrollLeft + scrollAmount < 0) ? this.state.scrollLeft + scrollAmount : 0
        });
      },
      right: () => {
        let scrollAmount = styles.scrollContentContainerWidth;
        this.setState({
          scrollLeft: (styles.scrollContentContainerWidth < styles.scrollContentWidth + (this.state.scrollLeft - scrollAmount)) ? this.state.scrollLeft - scrollAmount : styles.scrollContentContainerWidth - styles.scrollContentWidth
        });
      }
    };
    if (direction in processor) {
      processor[ direction ]();
    }
  }

  public onResizeColumnResizer(e: any, col, newWidth) {
    let colGroup = fromJS(this.state.colGroup).toJS();
    colGroup[ col.colIndex ]._width = colGroup[ col.colIndex ].width = newWidth;

    let {styles, leftHeaderColGroup, headerColGroup} = UTIL.calculateDimensions(this.gridRootNode, {list: this.props.store_list}, assignWith({}, this.state, {
      colGroup: colGroup
    }));

    this.data._headerColGroup = undefined;
    this.setState({
      colGroup: colGroup,
      leftHeaderColGroup: leftHeaderColGroup,
      headerColGroup: headerColGroup,
      styles: styles
    });
  }

  public onClickPageButton(e: any, onClick: Function) {
    const styles = this.state.styles;
    const processor = {
      'PAGE_FIRST': () => {
        this.setState({
          scrollTop: 0
        });
      },
      'PAGE_PREV': () => {
        // styles.bodyTrHeight
      },
      'PAGE_BACK': () => {
      },
      'PAGE_PLAY': () => {

      },
      'PAGE_NEXT': () => {
      },
      'PAGE_LAST': () => {
        this.setState({
          scrollTop: styles.scrollContentContainerHeight - styles.scrollContentHeight
        });
      }
    };

    if (isFunction(onClick)) {

    }
    else if (typeof onClick === 'string' && onClick in processor) {
      processor[ onClick ]();
    }
  }

  public onMouseDownBody(e: any) {
    e.preventDefault();

    // const styles = this.state.styles;
    const startMousePosition = UTIL.getMousePosition(e);
    const dragStartPosition = e.target.getAttribute('data-pos');
    const startScrollLeft: number = this.state.scrollLeft;
    const startScrollTop: number = this.state.scrollTop;

    if (!dragStartPosition) {
      return false;
    }

    const {
            headerHeight, bodyHeight, CTInnerWidth, verticalScrollerWidth, bodyTrHeight,
            frozenRowHeight, asidePanelWidth, frozenPanelWidth
          } = this.state.styles;
    const {x, y} = this.gridRootNode.getBoundingClientRect();
    const leftPadding: number = x; // + styles.asidePanelWidth;
    const topPadding: number = y; // + styles.headerHeight; // todo : 셀렉터의 좌표를 이용하여 선택된 셀 구하기 할 때 필요.

    const onMouseMove = (ee): void => {
      const currMousePosition = UTIL.getMousePosition(ee);

      // 인터벌 무빙 함수 아래 구문에서 연속 스크롤이 필요하면 사용
      const setStateCall = (currState, _moving?: iGridRoot.Moving): void => {
        let sRowP: number = -1;
        let eRowP: number = -1;
        let sColP: number = -1;
        let eColP: number = -1;
        // 선택된 시작점으로 부터 그리드 바디의 선택 시작위치값 구하기

        let p1xBySC = currState.selectionStartOffset.x - asidePanelWidth - startScrollLeft;
        let p1yBySC = currState.selectionStartOffset.y - headerHeight - startScrollTop;
        let p2xBySC = currState.selectionEndOffset.x - asidePanelWidth - startScrollLeft;
        let p2yBySC = currState.selectionEndOffset.y - headerHeight - startScrollTop;

        if (_moving && _moving.active) {
          if (_moving.top) {
            p1yBySC = currState.selectionStartOffset.y - headerHeight - this.state.scrollTop;
          } else if (_moving.bottom) {
            p2yBySC = currState.selectionEndOffset.y - headerHeight - this.state.scrollTop;
          }
          // WOW! It's working
          if (_moving.left) {
            p1xBySC = currState.selectionStartOffset.x - asidePanelWidth - this.state.scrollLeft;
          } else if (_moving.right) {
            p2xBySC = currState.selectionEndOffset.x - asidePanelWidth - this.state.scrollLeft;
          }
        }

        sRowP = Math.floor(p1yBySC / bodyTrHeight);
        eRowP = Math.floor(p2yBySC / bodyTrHeight);

        console.log(this.state.headerColGroup);
        // todo : 여기부터 다시 시작

        this.setState(currState);
      };
      const scrollMoving = (_moving: iGridRoot.Moving): boolean => {
        let newScrollTop: number = this.state.scrollTop;
        let newScrollLeft: number = this.state.scrollLeft;
        if (_moving.top) {
          newScrollTop = this.state.scrollTop + bodyTrHeight;
        } else if (_moving.bottom) {
          newScrollTop = this.state.scrollTop - bodyTrHeight;
        }
        if (_moving.left) {
          newScrollLeft = this.state.scrollLeft + bodyTrHeight;
        } else if (_moving.right) {
          newScrollLeft = this.state.scrollLeft - bodyTrHeight;
        }

        let {scrollLeft, scrollTop, endScroll} = UTIL.getScrollPosition(newScrollLeft, newScrollTop, {
          scrollWidth: this.state.styles.scrollContentWidth,
          scrollHeight: this.state.styles.scrollContentHeight,
          clientWidth: this.state.styles.scrollContentContainerWidth,
          clientHeight: this.state.styles.scrollContentContainerHeight
        });

        setStateCall({
          scrollTop: scrollTop,
          scrollLeft: scrollLeft,
          selectionStartOffset: this.state.selectionStartOffset,
          selectionEndOffset: this.state.selectionEndOffset
        }, _moving);

        return !endScroll;
      };

      let x1: number = startMousePosition.x - leftPadding;
      let y1: number = startMousePosition.y - topPadding;
      let x2: number = currMousePosition.x - leftPadding;
      let y2: number = currMousePosition.y - topPadding;

      let p1X: number = Math.min(x1, x2);
      let p2X: number = Math.max(x1, x2);
      let p1Y: number = Math.min(y1, y2);
      let p2Y: number = Math.max(y1, y2);

      let moving: iGridRoot.Moving = {
        active: false,
        top: false,
        left: false,
        bottom: false,
        right: false
      };

      if (p1Y < headerHeight) {
        moving.active = true;
        moving.top = true;
      }
      else if (p2Y > headerHeight + bodyHeight) {
        moving.active = true;
        moving.bottom = true;
      }
      if (p1X < asidePanelWidth) {
        moving.active = true;
        moving.left = true;
      }
      else if (p2X > CTInnerWidth - verticalScrollerWidth) {
        moving.active = true;
        moving.right = true;
      }

      setStateCall({
        dragging: true,
        selecting: true,
        scrollTop: this.state.scrollTop,
        scrollLeft: this.state.scrollLeft,
        selectionStartOffset: {
          x: p1X,
          y: p1Y
        },
        selectionEndOffset: {
          x: p2X,
          y: p2Y
        }
      }, moving);

      // moving.active 이면 타임 인터벌 시작
      if (this.scrollMovingTimer) clearInterval(this.scrollMovingTimer);
      if (moving.active) {
        this.scrollMovingTimer = setInterval(() => {
          if (!scrollMoving(moving)) {
            clearInterval(this.scrollMovingTimer);
          }
        }, 60);
      }
    };

    const offEvent = (ee) => {
      ee.preventDefault();

      if (this.scrollMovingTimer) clearInterval(this.scrollMovingTimer);
      this.setState({
        dragging: false,
        selecting: false,
        selectionStartOffset: null,
        selectionEndOffset: null
      });
      document.removeEventListener('mousemove', throttled_onMouseMove);
      document.removeEventListener('mouseup', offEvent);
      document.removeEventListener('mouseleave', offEvent);
    };

    let throttled_onMouseMove = throttle(onMouseMove, 10);

    document.addEventListener('mousemove', throttled_onMouseMove);
    document.addEventListener('mouseup', offEvent);
    document.addEventListener('mouseleave', offEvent);
  }

  public updateSelectedCells() {

  }

  public refCallback(_key, el) {
    // 하위 컴포넌트에서 전달해주는 ref를 수집 / 갱신
    this.componentRefs[ _key ] = el;
  }

  public render() {
    const styles = this.state.styles;
    const options = this.state.options;
    const mounted = this.state.mounted;
    const headerColGroup = this.state.headerColGroup;

    let gridRootStyle = Object.assign({height: this.props.height}, this.props.style);
    if (styles.calculatedHeight !== null) {
      gridRootStyle.height = styles.calculatedHeight;
    }

    if (this.state.dragging) { // 드래깅 중이므로 내부 요소 text select 금지
      gridRootStyle[ 'userSelect' ] = 'none';
    }

    let _scrollLeft = Math.abs(this.state.scrollLeft);
    let bodyPanelWidth = styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth;
    let sColIndex = 0;
    let eColIndex = headerColGroup.length;
    let _headerColGroup = headerColGroup;
    let _bodyRowData = this.state.bodyRowData;
    let _bodyGroupingData = this.state.bodyGroupingData;

    // 프린트 컬럼 시작점과 끝점 연산
    if (mounted) {

      headerColGroup.forEach((col, ci) => {
        if (col._sx <= _scrollLeft && col._ex >= _scrollLeft) {
          sColIndex = ci;
        }
        if (col._sx <= _scrollLeft + bodyPanelWidth && col._ex >= _scrollLeft + bodyPanelWidth) {
          eColIndex = ci;
          return false;
        }
      });
      _headerColGroup = headerColGroup.slice(sColIndex, eColIndex + 1);

      if (typeof this.data._headerColGroup === 'undefined' || !isEqual(this.data._headerColGroup, _headerColGroup)) {
        this.data.sColIndex = sColIndex;
        this.data.eColIndex = eColIndex;
        this.data._headerColGroup = _headerColGroup;
        _bodyRowData = this.data._bodyRowData = UTIL.getTableByStartEndColumnIndex(this.state.bodyRowData, sColIndex, eColIndex + 1);
        _bodyGroupingData = this.data._bodyGroupingData = UTIL.getTableByStartEndColumnIndex(this.state.bodyGroupingData, sColIndex, eColIndex + 1);
      } else {
        _bodyRowData = this.data._bodyRowData;
        _bodyGroupingData = this.data._bodyGroupingData;
      }
    }

    return (
      <div ref='gridRoot'
           className={classNames(this.props.gridCSS[ 'axDatagrid' ])}
           onWheel={e => {
             this.handleWheel(e);
           }}
           style={gridRootStyle}>
        <div className={classNames(this.props.gridCSS[ 'clipBoard' ])}>
          <textarea ref='gridClipboard' />
        </div>
        <GridHeader
          mounted={mounted}
          gridCSS={this.props.gridCSS}
          optionsHeader={options.header}
          styles={styles}
          frozenColumnIndex={options.frozenColumnIndex}
          colGroup={this.state.colGroup}
          asideColGroup={this.state.asideColGroup}
          leftHeaderColGroup={this.state.leftHeaderColGroup}
          headerColGroup={this.state.headerColGroup}
          asideHeaderData={this.state.asideHeaderData}
          leftHeaderData={this.state.leftHeaderData}
          headerData={this.state.headerData}
          scrollLeft={this.state.scrollLeft}
          refCallback={this.refCallback}
          onResizeColumnResizer={this.onResizeColumnResizer}
        />
        <GridBody
          mounted={mounted}
          gridCSS={this.props.gridCSS}
          options={options}
          styles={styles}
          CTInnerWidth={styles.CTInnerWidth}
          CTInnerHeight={styles.CTInnerHeight}
          frozenColumnIndex={options.frozenColumnIndex}
          colGroup={this.state.colGroup}
          asideColGroup={this.state.asideColGroup}
          leftHeaderColGroup={this.state.leftHeaderColGroup}
          headerColGroup={_headerColGroup}
          bodyTable={this.state.bodyRowTable}
          asideBodyRowData={this.state.asideBodyRowData}
          asideBodyGroupingData={this.state.asideBodyGroupingData}
          leftBodyRowData={this.state.leftBodyRowData}
          leftBodyGroupingData={this.state.leftBodyGroupingData}
          bodyRowData={_bodyRowData}
          bodyGroupingData={_bodyGroupingData}
          list={this.props.store_list}
          scrollLeft={this.state.scrollLeft}
          scrollTop={this.state.scrollTop}
          refCallback={this.refCallback}
          onMouseDownBody={this.onMouseDownBody}
        />
        <GridPage
          mounted={mounted}
          gridCSS={this.props.gridCSS}
          styles={styles}
          pageButtonsContainerWidth={styles.pageButtonsContainerWidth}
          pageButtons={options.page.buttons}
          pageButtonHeight={options.page.buttonHeight}
          onClickPageButton={this.onClickPageButton}
        />
        <GridScroll
          mounted={mounted}
          gridCSS={this.props.gridCSS}
          bodyHeight={styles.bodyHeight}
          pageHeight={styles.pageHeight}
          verticalScrollerWidth={styles.verticalScrollerWidth}
          verticalScrollerHeight={styles.verticalScrollerHeight}
          horizontalScrollerWidth={styles.horizontalScrollerWidth}
          horizontalScrollerHeight={styles.horizontalScrollerHeight}
          verticalScrollBarHeight={styles.verticalScrollBarHeight}
          horizontalScrollBarWidth={styles.horizontalScrollBarWidth}
          scrollerArrowSize={styles.scrollerArrowSize}
          scrollerPadding={styles.scrollerPadding}
          scrollBarLeft={-this.state.scrollLeft * (styles.horizontalScrollerWidth - styles.horizontalScrollBarWidth) / (styles.scrollContentWidth - styles.scrollContentContainerWidth)}
          scrollBarTop={-this.state.scrollTop * (styles.verticalScrollerHeight - styles.verticalScrollBarHeight) / (styles.scrollContentHeight - styles.scrollContentContainerHeight)}
          refCallback={this.refCallback}
          onMouseDownScrollBar={this.onMouseDownScrollBar}
          onClickScrollTrack={this.onClickScrollTrack}
          onClickScrollArrow={this.onClickScrollArrow}
        />
        <GridSelector
          selecting={this.state.selecting}
          gridCSS={this.props.gridCSS}
          selectionStartOffset={this.state.selectionStartOffset}
          selectionEndOffset={this.state.selectionEndOffset}
        />
      </div>
    );

  }
}
