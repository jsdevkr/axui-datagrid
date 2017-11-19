import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import {assignWith, each, isArray, isEqual, isFunction, isObject, throttle} from 'lodash';
import {fromJS} from 'immutable';

import * as UTIL from './_inc/utils';
import {GridHeader, GridPage} from './component';


export namespace GridRoot {
  export interface Props {
    store_receivedList: any;
    store_deletedList: any;
    store_list: any;
    store_page: object;
    store_sortInfo: object;
    gridCSS: any;
    height: string;
    style: object;
    columns: any;
    data: any;
    options: object;
    thisCallback: object;
    init: Function;
    setData: Function;
  }

  export interface State {
    mounted: boolean;
    scrollLeft: number;
    scrollTop: number;
    dragging: boolean; // 사용자가 드래깅 중인 경우 (style.userSelect=none 처리)
    selecting: boolean;
    selectionStartOffset: object;
    selectionEndOffset: object;
    isInlineEditing: boolean;
    focusedColumn: object;
    selectedColumn: object;
    inlineEditingColumn: object;
    colGroup: any;
    colGroupMap: object;
    asideColGroup: any;
    leftHeaderColGroup: any;
    headerColGroup: any;
    bodyGrouping: any;
    headerTable: object;
    asideHeaderData: object;
    leftHeaderData: object;
    headerData: object;
    bodyRowTable: object;
    asideBodyRowData: object;
    leftBodyRowData: object;
    bodyRowData: object;
    bodyRowMap: object;
    bodyGroupingTable: object;
    asideBodyGroupingData: object;
    leftBodyGroupingData: object;
    bodyGroupingData: object;
    bodyGroupingMap: object;
    footSumColumns: any;
    footSumTable: object; // footSum의 출력레이아웃
    leftFootSumData: object; // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 왼쪽
    footSumData: object; // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 오른쪽
    styles: any;
    options: any;
  }
}

const defaultOptions = {
  frozenColumnIndex: 0,
  frozenRowIndex: 0,
  showLineNumber: false,
  showRowSelector: false,
  multipleSelect: true,
  columnMinWidth: 100,
  lineNumberColumnWidth: 40,
  rowSelectorColumnWidth: 28,
  sortable: false,
  remoteSort: false,
  asidePanelWidth: 0,
  header: {
    display: true,
    align: false,
    columnHeight: 24,
    columnPadding: 3,
    columnBorderWidth: 1,
    selector: true
  },
  body: {
    align: false,
    columnHeight: 24,
    columnPadding: 3,
    columnBorderWidth: 1,
    grouping: false,
    mergeCells: false
  },
  page: {
    buttonsContainerWidth: 150,
    buttons: [
      {className: 'datagridIcon-first', onClick: 'PAGE_FIRST'},
      {className: 'datagridIcon-prev', onClick: 'PAGE_PREV'},
      {className: 'datagridIcon-back', onClick: 'PAGE_BACK'},
      {className: 'datagridIcon-play', onClick: 'PAGE_PLAY'},
      {className: 'datagridIcon-next', onClick: 'PAGE_NEXT'},
      {className: 'datagridIcon-last', onClick: 'PAGE_LAST'}
    ],
    buttonHeight: 16,
    height: 19
  },
  scroller: {
    size: 14,
    arrowSize: 14,
    barMinSize: 12,
    padding: 3,
    useVerticalScroll: true
  },
  columnKeys: {
    selected: '__selected__',
    modified: '__modified__',
    deleted: '__deleted__',
    disableSelection: '__disable_selection__'
  },
  tree: {
    use: false,
    hashDigit: 8,
    indentWidth: 10,
    arrowWidth: 15,
    iconWidth: 18,
    icons: {
      openedArrow: '▾',
      collapsedArrow: '▸',
      groupIcon: '⊚',
      collapsedGroupIcon: '⊚',
      itemIcon: '⊙'
    },
    columnKeys: {
      parentKey: 'pid',
      selfKey: 'id',
      collapse: 'collapse',
      hidden: 'hidden',
      parentHash: '__hp__',
      selfHash: '__hs__',
      children: '__children__',
      depth: '__depth__'
    }
  },
  footSum: false
};

const propsToState = function (props, state) {
  let dividedObj;

  // state 계산영역 시작
  state.headerTable = UTIL.makeHeaderTable(props.columns, state.options);
  state.bodyRowTable = UTIL.makeBodyRowTable(props.columns, state.options);
  state.bodyRowMap = UTIL.makeBodyRowMap(state.bodyRowTable, state.options);

  dividedObj = UTIL.divideTableByFrozenColumnIndex(state.headerTable, state.options.frozenColumnIndex, state.options);
  state.asideHeaderData = dividedObj.asideData;
  state.asideColGroup = dividedObj.asideColGroup; // asideColGroup은 header, bodyRow 에서 공통으로 사용 한번만 구하면 그만이지만 편의상 header에서 처리하기로 한다.
  state.leftHeaderData = dividedObj.leftData;
  state.headerData = dividedObj.rightData;
  state.styles.asidePanelWidth = dividedObj.asidePanelWidth;

  dividedObj = UTIL.divideTableByFrozenColumnIndex(state.bodyRowTable, state.options.frozenColumnIndex, state.options);
  state.asideBodyRowData = dividedObj.asideData;
  state.leftBodyRowData = dividedObj.leftData;
  state.bodyRowData = dividedObj.rightData;

  // 한줄의 높이 계산 (한줄이 여러줄로 구성되었다면 높이를 늘려야 하니까);
  state.styles.bodyTrHeight = state.bodyRowTable.rows.length * state.options.body.columnHeight;

  state.colGroupMap = {};

  state.headerTable.rows.forEach((row, r) => {
    row.cols.forEach((col, c) => {
      state.colGroupMap[col.colIndex] = assignWith({}, col);
    });
  });

  state.colGroup = [];
  each(state.colGroupMap, (v, k) => {
    state.colGroup.push(v);
  });

  state.leftHeaderColGroup = state.colGroup.slice(0, state.options.frozenColumnIndex);
  state.headerColGroup = state.colGroup.slice(state.options.frozenColumnIndex);

  // footSum
  state.footSumColumns = [];
  state.footSumTable = {};

  if (isArray(state.options.footSum)) {
    state.footSumColumns = state.options.footSum;
    state.footSumTable = UTIL.makeFootSumTable(state.footSumColumns, state.colGroup, state.options);
    dividedObj = UTIL.divideTableByFrozenColumnIndex(state.footSumTable, state.options.frozenColumnIndex, state.options);
    state.leftFootSumData = dividedObj.leftData;
    state.footSumData = dividedObj.rightData;
  }

  // grouping info
  if (state.options.body.grouping) {
    if ('by' in state.options.body.grouping && 'columns' in state.options.body.grouping) {
      state.bodyGrouping = {
        by: state.options.body.grouping.by,
        columns: state.options.body.grouping.columns
      };
      state.bodyGroupingTable = UTIL.makeBodyGroupingTable(state.bodyGrouping.columns, state.colGroup, state.options);
      state.sortInfo = (() => {
        let sortInfo = {};
        for (let k = 0, kl = state.bodyGrouping.by.length; k < kl; k++) {
          sortInfo[state.bodyGrouping.by[k]] = {
            orderBy: 'asc',
            seq: k,
            fixed: true
          };
          for (let c = 0, cl = state.colGroup.length; c < cl; c++) {
            if (state.colGroup[c].key === state.bodyGrouping.by[k]) {
              state.colGroup[c].sort = 'asc';
              state.colGroup[c].sortFixed = true;
            }
          }
        }
        return sortInfo;
      })();

      dividedObj = UTIL.divideTableByFrozenColumnIndex(state.bodyGroupingTable, state.options.frozenColumnIndex, state.options);
      state.asideBodyGroupingData = dividedObj.asideData;
      state.leftBodyGroupingData = dividedObj.leftData;
      state.bodyGroupingData = dividedObj.rightData;
      state.bodyGroupingMap = UTIL.makeBodyRowMap(state.bodyGroupingTable, state.options);
    } else {
      state.options.body.grouping = false;
    }
  }

  return state;
};

export class GridRoot extends React.Component<GridRoot.Props, GridRoot.State> {

  public static defaultProps: Partial<GridRoot.Props> = {
    height: '300px',
    columns: [],
    data: [],
    options: {}
  };

  private componentRefs: any;
  private data: any;
  private gridRootNode: any;
  private throttled_updateDimensions: any;
  public ref: any;

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
      scrollLeft: null,
      scrollTop: null,
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
        asidePanelWidth: null,
        // 틀고정된 컬럼들의 너비
        frozenPanelWidth: null,
        // 한줄의 높이
        bodyTrHeight: null,
        // 컨테이너의 크기
        elWidth: null,
        elHeight: null,
        CTInnerWidth: null,
        CTInnerHeight: null,
        rightPanelWidth: null,
        // 헤더의 높이
        headerHeight: null,
        // 틀고정된 로우들의 높이
        frozenRowHeight: null,
        // 풋섬의 높이
        footSumHeight: null,
        // 페이징 영역의 높이
        pageHeight: null,
        // scrollTack 의 크기 (너비, 높이)
        verticalScrollerWidth: null,
        horizontalScrollerHeight: null,

        bodyHeight: null,

        scrollContentContainerHeight: null,
        scrollContentHeight: null,
        scrollContentContainerWidth: null,
        scrollContentWidth: null
      },
      options: (() => {
        let options = assignWith({}, defaultOptions);
        each(props.options, function (v, k) {
          options[k] = (isObject(v)) ? assignWith(options[k], v) : v;
        });
        return options;
      })()
    };


    console.log(this.props.height);

    this.state = propsToState(props, assignWith({}, this.state));

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

  // 변경된 props를 받게 되면
  public componentWillReceiveProps(nextProps) {
    // 데이터 체인지
    if (this.props.data !== nextProps.data) {
      this.props.setData(nextProps.data, this.state.options);
    }

    if (this.props.options !== nextProps.options || this.props.columns !== nextProps.columns) {
      this.data._headerColGroup = undefined;
      this.data.sColIndex = -1;
      this.data.eColIndex = -1;

      let newState = propsToState(nextProps, assignWith({}, this.state, {scrollLeft: 0, scrollTop: 0}));
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
      this.setState({
        styles: UTIL.calculateDimensions(this.gridRootNode, {list: nextProps.store_list}, this.state).styles
      });
      return false;
    }

    return true;
  }

  public componentWillUpdate(nextProps) {
    // console.log(this.state.sColIndex);
    // shouldComponentUpdate에더 랜더를 방지 하거나. willUpdate에서 this.state.styles값 강제 변경 테스트.

  }

  // change props and render
  public componentDidUpdate(prevProps, prevState) {
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

  public onMouseDownScrollBar(e, barName) {
    e.preventDefault();
    const styles = this.state.styles;
    const currScrollBarLeft = -this.state.scrollLeft * (styles.horizontalScrollerWidth - styles.horizontalScrollBarWidth) / (styles.scrollContentWidth - styles.scrollContentContainerWidth);
    const currScrollBarTop = -this.state.scrollTop * (styles.verticalScrollerHeight - styles.verticalScrollBarHeight) / (styles.scrollContentHeight - styles.scrollContentContainerHeight);

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
        processor[barName]();
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

  public onClickScrollTrack(e, barName) {
    const styles = this.state.styles;
    const currScrollBarLeft = -this.state.scrollLeft * (styles.horizontalScrollerWidth - styles.horizontalScrollBarWidth) / (styles.scrollContentWidth - styles.scrollContentContainerWidth);
    const currScrollBarTop = -this.state.scrollTop * (styles.verticalScrollerHeight - styles.verticalScrollBarHeight) / (styles.scrollContentHeight - styles.scrollContentContainerHeight);
    const {x, y} = UTIL.getMousePosition(e);
    const gridRootElement: any = this.ref.gridRef;

    const processor = {
      vertical: () => {
        let {scrollLeft, scrollTop} = UTIL.getScrollPositionByScrollBar(currScrollBarLeft, y - gridRootElement.offsetTop - (styles.verticalScrollBarHeight / 2), styles);
        this.setState({
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        });
      },
      horizontal: () => {
        let {scrollLeft, scrollTop} = UTIL.getScrollPositionByScrollBar(x - gridRootElement.offsetLeft - styles.pageButtonsContainerWidth - (styles.horizontalScrollBarWidth / 2), currScrollBarTop, styles);
        this.setState({
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        });
      }
    };

    if (barName in processor) {
      processor[barName]();
    }
  }

  public onClickScrollArrow(e, direction) {
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
      processor[direction]();
    }
  }

  public onResizeColumnResizer(e, col, newWidth) {
    let colGroup = fromJS(this.state.colGroup).toJS();
    colGroup[col.colIndex]._width = colGroup[col.colIndex].width = newWidth;

    let leftHeaderColGroup = colGroup.slice(0, this.state.options.frozenColumnIndex);
    let headerColGroup = colGroup.slice(this.state.options.frozenColumnIndex);
    let {styles} = UTIL.calculateDimensions(this.gridRootNode, {list: this.props.store_list}, assignWith({}, this.state, {
      colGroup: colGroup,
      leftHeaderColGroup: leftHeaderColGroup,
      headerColGroup: headerColGroup
    }));

    this.data._headerColGroup = undefined;
    this.setState({
      colGroup: colGroup,
      leftHeaderColGroup: leftHeaderColGroup,
      headerColGroup: headerColGroup,
      styles: styles
    });
  }

  public onClickPageButton(e, onClick) {
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
      processor[onClick]();
    }
  }

  public onMouseDownBody(e) {
    e.preventDefault();
    // const styles = this.state.styles;
    const startMousePosition = UTIL.getMousePosition(e);
    const dragStartPosition = e.target.getAttribute('data-pos');

    if (!dragStartPosition) {
      return false;
    }

    const topPadding = this.gridRootNode.offsetTop; // + styles.headerHeight; // todo : 셀렉터의 좌표를 이용하여 선택된 셀 구하기 할 때 필요.
    const leftPadding = this.gridRootNode.offsetLeft; // + styles.asidePanelWidth;

    const onMouseMove = (ee) => {
      let currMousePosition = UTIL.getMousePosition(ee);

      // let selectedCells = UTIL.getSelectedCellByMousePosition(startMousePosition, currMousePosition);
      // console.log(selectedCells);


      // todo : 반대 방향으로 셀렉팅 구현 필요
      this.setState({
        dragging: true,
        selecting: true,
        selectionStartOffset: {
          x: startMousePosition.x - leftPadding,
          y: startMousePosition.y - topPadding
        },
        selectionEndOffset: {
          x: currMousePosition.x - leftPadding,
          y: currMousePosition.y - topPadding
        }
      });
    };

    const offEvent = (ee) => {
      ee.preventDefault();

      this.setState({
        dragging: false,
        selecting: false,
        selectionStartOffset: null,
        selectionEndOffset: null
      });
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', offEvent);
      document.removeEventListener('mouseleave', offEvent);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', offEvent);
    document.addEventListener('mouseleave', offEvent);
  }

  public updateSelectedCells() {

  }

  public refCallback(_key, el) {
    // 하위 컴포넌트에서 전달해주는 ref를 수집 / 갱신
    this.componentRefs[_key] = el;
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

    console.log(gridRootStyle, styles.calculatedHeight);

    if (this.state.dragging) { // 드래깅 중이므로 내부 요소 text select 금지
      gridRootStyle['userSelect'] = 'none';
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
           className={classNames(this.props.gridCSS['axDatagrid'])}
           onWheel={e => {
             this.handleWheel(e);
           }}
           style={gridRootStyle}>
        <div className={classNames(this.props.gridCSS['clipBoard'])}>
          <textarea ref='gridClipboard'></textarea>
        </div>
        <GridHeader
          gridCSS={this.props.gridCSS}
          refCallback={this.refCallback}
          onResizeColumnResizer={this.onResizeColumnResizer}
          mounted={mounted}
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

      </div>
    );

  }
}