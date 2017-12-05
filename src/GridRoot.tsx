import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { assignWith, each, filter, isArray, isEqual, isFunction, isNil, isObject, last, range, throttle } from 'lodash';
import { fromJS } from 'immutable';
import classNames from 'classnames';

import * as UTIL from './_inc/utils';
import { iGridRoot } from './_inc/namespaces';
import { gridOptions } from './_inc/defaults';
import { GridBody, GridHeader, GridPage, GridScroll } from './component';
import * as GridFormatter from './_inc/formatter';

let formatter = GridFormatter.getAll();

export class GridRoot extends React.Component<iGridRoot.Props, iGridRoot.State> {

  public static defaultProps: Partial<iGridRoot.Props> = {
    height: '300px',
    columns: [],
    data: [],
    options: {}
  };

  public static setFormatter(_formatter) {
    return formatter = assignWith(formatter, _formatter);
  }

  public static getFormatter() {
    return formatter;
  }

  private componentRefs: any;
  private data: any;
  private gridRootNode: any;
  private throttled_updateDimensions: any;
  private scrollMovingTimer: any;
  private columnFormatter: any;

  constructor(props: any) {
    super(props);

    this.columnFormatter = GridRoot.getFormatter();
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
      selectionMinOffset: {},
      selectionMaxOffset: {},
      selectionRows: {},
      selectionCols: {},
      deSelections: {},
      focusedRow: -1,
      focusedCol: -1,
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
    this.getRootBounding = this.getRootBounding.bind(this);
    this.onMouseDownScrollBar = this.onMouseDownScrollBar.bind(this);
    this.onClickScrollTrack = this.onClickScrollTrack.bind(this);
    this.onClickScrollArrow = this.onClickScrollArrow.bind(this);
    this.onResizeColumnResizer = this.onResizeColumnResizer.bind(this);
    this.onClickPageButton = this.onClickPageButton.bind(this);
    this.onMouseDownBody = this.onMouseDownBody.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClickHeader = this.onClickHeader.bind(this);
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

  private handleWheel(e) {
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

  private onMouseDownScrollBar(e: any, barName: string): void {
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

  private onClickScrollTrack(e: any, barName: string) {
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

  private onClickScrollArrow(e: any, direction: string) {
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

  private onResizeColumnResizer(e: any, col, newWidth) {
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

  private getRootBounding() {
    return this.gridRootNode.getBoundingClientRect();
  }

  private onClickPageButton(e: any, onClick: Function) {
    const {
            scrollContentContainerHeight,
            scrollContentHeight,
            bodyTrHeight
          } = this.state.styles;
    const [ ABOVE, BELOW, FIRST, LAST ] : [ string, string, number, number ]
            = [ 'above', 'below', 0, scrollContentContainerHeight - scrollContentHeight ];

    const setFn: Function = (scrollTop: number, direction: string) => {
      switch (direction) {
        case ABOVE:
          this.setState({scrollTop: Math.min(scrollTop, FIRST)});
          break;
        case BELOW:
          this.setState({scrollTop: Math.max(scrollTop, LAST)});
          break;
      }
    };

    const processor = {
      'PAGE_FIRST': () => {
        this.setState({scrollTop: FIRST});
      },
      'PAGE_PREV': () => {
        let size: number = Math.floor(scrollContentContainerHeight / bodyTrHeight);
        setFn(this.state.scrollTop + bodyTrHeight * (this.state.scrollTop % bodyTrHeight ? (size - 1) : size) - this.state.scrollTop % bodyTrHeight, ABOVE);
      },
      'PAGE_BACK': () => {
        setFn(this.state.scrollTop - (this.state.scrollTop % bodyTrHeight || -bodyTrHeight), ABOVE);
      },
      'PAGE_PLAY': () => {
        setFn(this.state.scrollTop - bodyTrHeight - this.state.scrollTop % bodyTrHeight, BELOW);
      },
      'PAGE_NEXT': () => {
        setFn(Math.ceil((this.state.scrollTop - scrollContentContainerHeight) / bodyTrHeight) * bodyTrHeight, BELOW)
      },
      'PAGE_LAST': () => {
        this.setState({scrollTop: LAST});
      }
    };

    if (isFunction(onClick)) {

    }
    else if (typeof onClick === 'string' && onClick in processor) {
      processor[ onClick ]();
    }
  }

  private onMouseDownBody(e: any) {
    e.preventDefault();

    const startMousePosition = UTIL.getMousePosition(e);
    const spanType: string = e.target.getAttribute('data-span');
    const {headerHeight, bodyHeight, CTInnerWidth, verticalScrollerWidth, bodyTrHeight, asidePanelWidth} = this.state.styles;
    const {x, y} = this.getRootBounding();
    const leftPadding: number = x; // + styles.asidePanelWidth;
    const topPadding: number = y; // + styles.headerHeight;
    const startScrollLeft: number = this.state.scrollLeft;
    const startScrollTop: number = this.state.scrollTop;
    const getRowIndex: Function = (y: number, scrollTop: number): number => {
      let i: number = 0;
      i = Math.floor((y - headerHeight - scrollTop) / bodyTrHeight);
      if (i < 0) i = 0;
      else if (i >= this.props.store_list.size - 1) i = this.props.store_list.size - 1;
      return i;
    };
    const getColIndex: Function = (x: number, scrollLeft: number): number => {
      const p: number = x - asidePanelWidth - scrollLeft;
      let cl: number = this.state.headerColGroup.length;
      let i: number = -1;
      while (cl--) {
        const col = this.state.headerColGroup[ cl ];
        if (col._sx <= p && col._ex >= p) {
          i = col.colIndex;
          break;
        }
      }
      return i;
    };
    const proc_bodySelect = (function () {
      const startX: number = startMousePosition.x - leftPadding;
      const startY: number = startMousePosition.y - topPadding;

      // 선택이 시작된 row / col
      let selectStartedRow: number = getRowIndex(startY, startScrollTop);
      let selectStartedCol: number = getColIndex(startX, startScrollLeft);

      if (selectStartedCol < 0) return;

      const onMouseMove = (ee): void => {
        const currMousePosition = UTIL.getMousePosition(ee);

        // 인터벌 무빙 함수 아래 구문에서 연속 스크롤이 필요하면 사용
        const setStateCall = (currState, _moving?: iGridRoot.Moving): void => {
          const selectEndedRow: number = getRowIndex(currState.selectionEndOffset.y, this.state.scrollTop);
          let selectEndedCol: number = getColIndex(currState.selectionEndOffset.x, this.state.scrollLeft);

          // 컬럼인덱스를 찾지 못했다면
          if (selectEndedCol === -1) {
            const p = currState.selectionEndOffset.x - asidePanelWidth - this.state.scrollLeft;
            const lastCol = last(this.state.headerColGroup);
            selectEndedCol = (p < 0) ? 0 : (lastCol._ex <= p) ? lastCol.colIndex : 0;
          }

          let sRow: number = Math.min(selectStartedRow, selectEndedRow);
          let eRow: number = Math.max(selectStartedRow, selectEndedRow);
          let sCol: number = Math.min(selectStartedCol, selectEndedCol);
          let eCol: number = Math.max(selectStartedCol, selectEndedCol);

          if (sRow !== -1 && eRow !== -1 && sCol !== -1 && eCol !== -1) {
            currState.selectionRows = {};
            currState.selectionCols = {};
            for (let i = sRow; i < eRow + 1; i++) currState.selectionRows[ i ] = true;
            for (let i = sCol; i < eCol + 1; i++) currState.selectionCols[ i ] = true;
          }
          else {
            console.error('get selection fail', sRow, eRow, sCol, eCol);
          }

          //currState.focusedRow = selectEndedRow;
          //currState.focusedCol = selectEndedCol;

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
            newScrollLeft = this.state.scrollLeft + 100;
          } else if (_moving.right) {
            newScrollLeft = this.state.scrollLeft - 100;
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
            x: x1,
            y: y1
          },
          selectionEndOffset: {
            x: x2,
            y: y2
          },
          selectionMinOffset: {
            x: p1X,
            y: p1Y
          },
          selectionMaxOffset: {
            x: p2X,
            y: p2Y
          }
        }, moving);

        // moving.active 이면 타임 인터벌 시작
        if (this.scrollMovingTimer) clearInterval(this.scrollMovingTimer);
        if (moving.active) {
          this.scrollMovingTimer = setInterval(() => {
            if (!scrollMoving(moving)) {
              // clearInterval(this.scrollMovingTimer);
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
          selectionEndOffset: null,
          selectionMinOffset: null,
          selectionMaxOffset: null
        });
        document.removeEventListener('mousemove', throttled_onMouseMove);
        document.removeEventListener('mouseup', offEvent);
        document.removeEventListener('mouseleave', offEvent);
      };

      const throttled_onMouseMove = throttle(onMouseMove, 10);

      if (e.metaKey || e.shiftKey && this.state.focusedRow > -1 && this.state.focusedCol > -1) {
        if (e.shiftKey) {
          let state = {
            dragging: false,
            selecting: false,
            selectionRows: {},
            selectionCols: {}
          };

          let sRow: number = Math.min(this.state.focusedRow, selectStartedRow);
          let sCol: number = Math.min(this.state.focusedCol, selectStartedCol);
          let eRow: number = Math.max(this.state.focusedRow, selectStartedRow);
          let eCol: number = Math.max(this.state.focusedCol, selectStartedCol);
          for (let i = sRow; i < eRow + 1; i++) state.selectionRows[ i ] = true;
          for (let i = sCol; i < eCol + 1; i++) state.selectionCols[ i ] = true;

          this.setState(state);

          selectStartedRow = this.state.focusedRow;
          selectStartedCol = this.state.focusedCol;
          document.addEventListener('mousemove', throttled_onMouseMove);
          document.addEventListener('mouseup', offEvent);
          document.addEventListener('mouseleave', offEvent);
        }
        else if (e.metaKey) {
          /*
          let state = {
            selectionRows: this.state.selectionRows,
            selectionCols: this.state.selectionCols,
            focusedRow: selectStartedRow,
            focusedCol: selectStartedCol
          };
          if(state.selectionRows[selectStartedRow] && state.selectionRows[selectStartedRow]){

          }
          this.setState(state);
          */
        }
      }
      else {
        // 셀렉션 저장정보 초기화
        this.setState({
          dragging: false,
          selecting: false,
          selectionStartOffset: null,
          selectionEndOffset: null,
          selectionMinOffset: null,
          selectionMaxOffset: null,
          selectionRows: {[selectStartedRow]: true},
          selectionCols: {[selectStartedCol]: true},
          focusedRow: selectStartedRow,
          focusedCol: selectStartedCol
        });

        document.addEventListener('mousemove', throttled_onMouseMove);
        document.addEventListener('mouseup', offEvent);
        document.addEventListener('mouseleave', offEvent);
      }
    }).bind(this);
    const proc_clickLinenumber = (function () {
      const startY: number = startMousePosition.y - topPadding;

      // 선택이 시작된 row / col
      let selectStartedRow: number = getRowIndex(startY, startScrollTop);

      let state = {
        dragging: false,
        selecting: false,
        selectionRows: {},
        selectionCols: (() => {
          let cols = {};
          this.state.colGroup.forEach(col => {
            cols[ col.colIndex ] = true;
          });
          return cols;
        })(),
        focusedRow: this.state.focusedRow,
        focusedCol: 0
      };

      if (e.shiftKey) {
        state.selectionRows = (() => {
          let rows = {};
          range(Math.min(this.state.focusedRow, selectStartedRow), Math.max(this.state.focusedRow, selectStartedRow) + 1).forEach(i => {
            rows[ i ] = true;
          });
          return rows;
        })();
      }
      else {
        state.selectionRows = {
          [selectStartedRow]: true
        };
        state.focusedRow = selectStartedRow;
      }

      this.setState(state);

    }).bind(this);

    if (spanType === 'lineNumber') {
      // click lineNumber
      proc_clickLinenumber();
    }
    else {
      proc_bodySelect();
    }
  }

  private onKeyDown(e: any) {
    // todo : copy 기능 구현
    // todo : focus 이동 구현
  }

  private onClickHeader(e: any, colIndex: number, key: string) {
    let state = {
      dragging: false,
      selecting: false,
      selectionRows: {},
      selectionCols: {},
      focusedRow: 0,
      focusedCol: this.state.focusedCol
    };

    if (key === 'lineNumber') {

      state.selectionRows = (() => {
        let rows = {};
        this.props.store_list.forEach((item, i) => {
          rows[ i ] = true;
        });
        return rows;
      })();
      state.selectionCols = (() => {
        let cols = {};
        this.state.colGroup.forEach(col => {
          cols[ col.colIndex ] = true;
        });
        return cols;
      })();
      state.focusedCol = 0;

    } else {

      state.selectionRows = (() => {
        let rows = {};
        this.props.store_list.forEach((item, i) => {
          rows[ i ] = true;
        });
        return rows;
      })();

      if (e.shiftKey) {
        state.selectionCols = (() => {
          let cols = {};
          range(Math.min(this.state.focusedCol, colIndex), Math.max(this.state.focusedCol, colIndex) + 1).forEach(i => {
            cols[ i ] = true;
          });
          return cols;
        })();
      }
      else {
        state.selectionCols = {
          [colIndex]: true
        };
        state.focusedCol = colIndex;
      }

    }

    this.setState(state);
  }

  private refCallback(_key, el) {
    // 하위 컴포넌트에서 전달해주는 ref를 수집 / 갱신
    console.log(_key);
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

    let _scrollLeft: number = Math.abs(this.state.scrollLeft);
    let bodyPanelWidth: number = styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth;
    let sColIndex: number = 0;
    let eColIndex: number = headerColGroup.length;
    let _headerColGroup = headerColGroup;
    let _bodyRowData = this.state.bodyRowData;
    let _bodyGroupingData = this.state.bodyGroupingData;

    // 프린트 컬럼 시작점과 끝점 연산
    if (mounted) {
      for (let ci = 0, cl = headerColGroup.length; ci < cl; ci++) {
        if (headerColGroup[ ci ]._sx <= _scrollLeft && headerColGroup[ ci ]._ex >= _scrollLeft) {
          sColIndex = ci;
        }
        if (headerColGroup[ ci ]._sx <= _scrollLeft + bodyPanelWidth && headerColGroup[ ci ]._ex >= _scrollLeft + bodyPanelWidth) {
          eColIndex = ci;
          break;
        }
      }

      _headerColGroup = headerColGroup.slice(sColIndex, eColIndex + 1);

      if (typeof this.data._headerColGroup === 'undefined' || !isEqual(this.data._headerColGroup, _headerColGroup)) {
        this.data.sColIndex = sColIndex;
        this.data.eColIndex = eColIndex;
        this.data._headerColGroup = _headerColGroup;
        _bodyRowData = this.data._bodyRowData = UTIL.getTableByStartEndColumnIndex(this.state.bodyRowData, sColIndex, eColIndex + 1);
        _bodyGroupingData = this.data._bodyGroupingData = UTIL.getTableByStartEndColumnIndex(this.state.bodyGroupingData, sColIndex, eColIndex + 1);
      }
      else {
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
          getRootBounding={this.getRootBounding}
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
          selectionCols={this.state.selectionCols}
          focusedCol={this.state.focusedCol}
          onResizeColumnResizer={this.onResizeColumnResizer}
          onClickHeader={this.onClickHeader}
        />
        <GridBody
          mounted={mounted}
          gridCSS={this.props.gridCSS}
          columnFormatter={this.columnFormatter}
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
          selectionRows={this.state.selectionRows}
          selectionCols={this.state.selectionCols}
          deSelections={this.state.deSelections}
          focusedRow={this.state.focusedRow}
          focusedCol={this.state.focusedCol}
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
          onMouseDownScrollBar={this.onMouseDownScrollBar}
          onClickScrollTrack={this.onClickScrollTrack}
          onClickScrollArrow={this.onClickScrollArrow}
        />
      </div>
    );
  }
}


// todo : linenumber 클릭시
// todo : header 클릭시