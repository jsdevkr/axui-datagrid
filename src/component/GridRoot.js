import React from 'react';
import ReactDOM from 'react-dom';
import {each, extend, extendOwn, isArray, isEqual, isObject, throttle} from 'underscore';
import classNames from 'classnames';
import sass from '../scss/index.scss';
import PropTypes from 'prop-types';

import * as UTIL from '../_inc/utils';
import GridHeader from './GridHeader';
import GridBody from './GridBody';
import GridPage from './GridPage';
import GridScroll from './GridScroll';

//~~~~~
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
    columnHeight: 26,
    columnPadding: 3,
    columnBorderWidth: 1,
    selector: true
  },
  body: {
    align: false,
    columnHeight: 26,
    columnPadding: 3,
    columnBorderWidth: 1,
    grouping: false,
    mergeCells: false
  },
  page: {
    height: 25,
    display: true,
    statusDisplay: true,
    navigationItemCount: 5
  },
  scroller: {
    size: 12,
    barMinSize: 12,
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
      parentKey: "pid",
      selfKey: "id",
      collapse: "collapse",
      hidden: "hidden",
      parentHash: "__hp__",
      selfHash: "__hs__",
      children: "__children__",
      depth: "__depth__",
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
      state.colGroupMap[col.colIndex] = extend({}, col);
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
    if ("by" in state.options.body.grouping && "columns" in state.options.body.grouping) {
      state.bodyGrouping = {
        by: state.options.body.grouping.by,
        columns: state.options.body.grouping.columns
      };
      state.bodyGroupingTable = UTIL.makeBodyGroupingTable(state.bodyGrouping.columns, state.colGroup, state.options);
      state.sortInfo = (() => {
        let sortInfo = {};
        for (let k = 0, kl = state.bodyGrouping.by.length; k < kl; k++) {
          sortInfo[state.bodyGrouping.by[k]] = {
            orderBy: "asc",
            seq: k,
            fixed: true
          };
          for (let c = 0, cl = colGroup.length; c < cl; c++) {
            if (state.colGroup[c].key === state.bodyGrouping.by[k]) {
              state.colGroup[c].sort = "asc";
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

class GridRoot extends React.Component {
  constructor(props) {
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
        let options = extend({}, defaultOptions);
        each(props.options, function (v, k) {
          options[k] = (isObject(v)) ? extendOwn(options[k], v) : v;
        });
        return options;
      })()
    };
    this.state = propsToState(props, extend({}, this.state));

    // state 계산영역 끝
    this.props.init(props, this.state.options);

    // 이벤트 멤버에 바인딩
    this.onMouseDownScrollBar = this.onMouseDownScrollBar.bind(this);
    this.onClickScrollTrack = this.onClickScrollTrack.bind(this);
    this.onResizeColumnResizer = this.onResizeColumnResizer.bind(this);
    this.refCallback = this.refCallback.bind(this);
  }

  componentDidMount() {
    this.gridRootNode = ReactDOM.findDOMNode(this.refs.gridRoot);


    this.throttled_updateDimensions = throttle(this.updateDimensions.bind(this), 100);
    window.addEventListener("resize", this.throttled_updateDimensions);

    this.setState({
      mounted: true,
      //styles: styles
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.throttled_updateDimensions);
  }

  // 변경된 props를 받게 되면
  componentWillReceiveProps(nextProps) {
    // 데이터 체인지
    if (this.props.data !== nextProps.data) {
      this.props.setData(nextProps.data, this.state.options);
    }

    if (this.props.options !== nextProps.options || this.props.columns !== nextProps.columns) {
      this.data._headerColGroup = undefined;
      this.data.sColIndex = -1;
      this.data.eColIndex = -1;

      let newState = propsToState(nextProps, extend({}, this.state, {scrollLeft: 0, scrollTop: 0}));
      newState.styles = UTIL.calculateDimensions(this.gridRootNode, {list: this.props.store_list}, newState).styles;
      this.setState(newState);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.data !== nextProps.data) {
      return false;
    }
    if (
      this.props.store_list !== nextProps.store_list ||
      this.props.store_deletedList !== nextProps.store_deletedList ||
      this.props.store_page !== nextProps.store_page ||
      this.props.store_sortInfo !== nextProps.store_sortInfo
    ) {
      // redux store state가 변경되면 렌더를 바로 하지 말고 this.state.styles 변경하여 state에 의해 랜더링 되도록 함. (이주으로 랜더링 하기 싫음)
      let {styles} = UTIL.calculateDimensions(this.gridRootNode, {list: nextProps.store_list}, this.state);
      this.setState({
        styles: styles
      });
      return false;
    }
    // redux state 가 변경되면 렌더 금지 하고 state 변경.
    return true;
  }

  componentWillUpdate(nextProps) {
    // console.log(this.state.sColIndex);
    // shouldComponentUpdate에더 랜더를 방지 하거나. willUpdate에서 this.state.styles값 강제 변경 테스트.
  }

  // change props and render
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.height != this.props.height) {
      this.updateDimensions();
    }
  }

  /**
   * 사용자 함수
   */
  updateDimensions() {
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

  handleWheel(e) {
    let delta = {x: 0, y: 0};

    if (e.detail) {
      delta.y = e.detail * 10;
    }
    else {
      if (typeof e.deltaY === "undefined") {
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

  onMouseDownScrollBar(e, barName) {

    e.preventDefault();
    const styles = this.state.styles;
    const currScrollBarLeft = -this.state.scrollLeft * (styles.CTInnerWidth - styles.horizontalScrollBarWidth) / (styles.scrollContentWidth - styles.scrollContentContainerWidth);
    const currScrollBarTop = -this.state.scrollTop * (styles.CTInnerHeight - styles.verticalScrollBarHeight) / (styles.scrollContentHeight - styles.scrollContentContainerHeight);

    this.data[barName + '-scroll-bar'] = {
      startMousePosition: UTIL.getMousePosition(e)
    };

    const onMouseMove = (ee) => {
      if (!this.state.dragging) this.setState({dragging: true});
      const {x, y} = UTIL.getMousePosition(ee);
      const {startMousePosition} = this.data[barName + '-scroll-bar'];

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

      if (barName in processor) processor[barName]();
    };

    const offEvent = (e) => {
      e.preventDefault();

      this.setState({dragging: false});
      this.data[barName + '-scroll-bar'] = null;
      // console.log("offEvent");
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', offEvent);
      document.removeEventListener('mouseleave', offEvent);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', offEvent);
    document.addEventListener('mouseleave', offEvent);
  }

  onClickScrollTrack(e, barName) {
    const styles = this.state.styles;
    const currScrollBarLeft = -this.state.scrollLeft * (styles.CTInnerWidth - styles.horizontalScrollBarWidth) / (styles.scrollContentWidth - styles.scrollContentContainerWidth);
    const currScrollBarTop = -this.state.scrollTop * (styles.CTInnerHeight - styles.verticalScrollBarHeight) / (styles.scrollContentHeight - styles.scrollContentContainerHeight);
    const {x, y} = UTIL.getMousePosition(e);

    const processor = {
      vertical: () => {
        let {scrollLeft, scrollTop} = UTIL.getScrollPositionByScrollBar(currScrollBarLeft, y - this.refs.gridRoot.offsetTop - (styles.verticalScrollBarHeight / 2), styles);
        this.setState({
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        });
      },
      horizontal: () => {
        let {scrollLeft, scrollTop} = UTIL.getScrollPositionByScrollBar(x - this.refs.gridRoot.offsetLeft - (styles.horizontalScrollBarWidth / 2), currScrollBarTop, styles);
        this.setState({
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        });
      }
    };

    if (barName in processor) processor[barName]();
  }

  onResizeColumnResizer(e) {

  }

  refCallback(_key, el) {
    // 하위 컴포넌트에서 전달해주는 ref를 수집 / 갱신
    this.componentRefs[_key] = el;
  }

  render() {
    const styles = this.state.styles;
    const options = this.state.options;
    const mounted = this.state.mounted;
    const headerColGroup = this.state.headerColGroup;

    let gridRootStyle = Object.assign({height: this.props.height}, this.props.style);
    if (styles.calculatedHeight !== null) {
      gridRootStyle.height = styles.calculatedHeight;
    }
    if (this.state.dragging) { // 드래깅 중이므로 내부 요소 text select 금지
      gridRootStyle["userSelect"] = "none";
    }

    let _scrollLeft = Math.abs(this.state.scrollLeft);
    let bodyPanelWidth = styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth;
    let sColIndex = 0, eColIndex = headerColGroup.length;
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

      if (typeof this.data._headerColGroup === "undefined" || !isEqual(this.data._headerColGroup, _headerColGroup)) {
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
      <div ref="gridRoot"
           onWheel={e => {
             this.handleWheel(e);
           }}
           className={classNames(sass.gridRoot)}
           style={gridRootStyle}>
        <div className={classNames(sass.gridClipBoard)}>
          <textarea ref="gridClipboard"></textarea>
        </div>
        <GridHeader
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
        <GridBody
          refCallback={this.refCallback}
          mounted={mounted}
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
        />
        <GridPage
          refCallback={this.refCallback}
          mounted={mounted}
          styles={styles}
        />
        <GridScroll
          refCallback={this.refCallback}
          onMouseDownScrollBar={this.onMouseDownScrollBar}
          onClickScrollTrack={this.onClickScrollTrack}
          mounted={mounted}
          optionsScroller={options.scroller}

          CTInnerWidth={styles.CTInnerWidth}
          CTInnerHeight={styles.CTInnerHeight}
          pageHeight={styles.pageHeight}
          verticalScrollerWidth={styles.verticalScrollerWidth}
          horizontalScrollerHeight={styles.horizontalScrollerHeight}

          verticalScrollBarHeight={styles.verticalScrollBarHeight}
          horizontalScrollBarWidth={styles.horizontalScrollBarWidth}

          scrollBarLeft={-this.state.scrollLeft * (styles.CTInnerWidth - styles.horizontalScrollBarWidth) / (styles.scrollContentWidth - styles.scrollContentContainerWidth)}
          scrollBarTop={-this.state.scrollTop * (styles.CTInnerHeight - styles.verticalScrollBarHeight) / (styles.scrollContentHeight - styles.scrollContentContainerHeight)}
        />

        <div ref="gridVerticalResizer"></div>
        <div ref="gridHorizontalResizer"></div>
      </div>
    );

  }
}


GridRoot.propTypes = {
  height: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  options: PropTypes.shape({
    frozenColumnIndex: PropTypes.number,
    frozenRowIndex: PropTypes.number,
    showLineNumber: PropTypes.bool,
    showRowSelector: PropTypes.bool,
    multipleSelect: PropTypes.bool,
    columnMinWidth: PropTypes.number,
    lineNumberColumnWidth: PropTypes.number,
    rowSelectorColumnWidth: PropTypes.number,
    sortable: PropTypes.bool,
    remoteSort: PropTypes.bool,
    asidePanelWidth: PropTypes.number,
    header: PropTypes.shape({
      display: PropTypes.bool,
      align: PropTypes.string,
      columnHeight: PropTypes.number,
      columnPadding: PropTypes.number,
      columnBorderWidth: PropTypes.number,
      selector: PropTypes.bool
    }),
    body: PropTypes.shape({
      align: PropTypes.bool,
      columnHeight: PropTypes.number,
      columnPadding: PropTypes.number,
      columnBorderWidth: PropTypes.number,
      grouping: PropTypes.bool,
      mergeCells: PropTypes.bool
    }),
    page: PropTypes.shape({
      height: PropTypes.number,
      display: PropTypes.bool,
      statusDisplay: PropTypes.bool,
      navigationItemCount: PropTypes.number
    }),
    scroller: PropTypes.shape({
      size: PropTypes.number,
      barMinSize: PropTypes.number,
      useVerticalScroll: PropTypes.bool
    }),
    columnKeys: PropTypes.shape({
      selected: PropTypes.string,
      modified: PropTypes.string,
      deleted: PropTypes.string,
      disableSelection: PropTypes.string
    }),
    tree: PropTypes.shape({
      use: PropTypes.bool,
      hashDigit: PropTypes.number,
      indentWidth: PropTypes.number,
      arrowWidth: PropTypes.number,
      iconWidth: PropTypes.number,
      icons: PropTypes.shape({
        openedArrow: PropTypes.string,
        collapsedArrow: PropTypes.string,
        groupIcon: PropTypes.string,
        collapsedGroupIcon: PropTypes.string,
        itemIcon: PropTypes.string
      }),
      columnKeys: PropTypes.shape({
        parentKey: PropTypes.string,
        selfKey: PropTypes.string,
        collapse: PropTypes.string,
        hidden: PropTypes.string,
        parentHash: PropTypes.string,
        selfHash: PropTypes.string,
        children: PropTypes.string,
        depth: PropTypes.string,
      })
    })
  }),
  footSum: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ])
};

GridRoot.defaultProps = {
  height: "300px",
  columns: [],
  data: [],
  options: {}
};

export default GridRoot;