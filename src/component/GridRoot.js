import React from 'react';
import ReactDOM from 'react-dom';
import {each, extend, extendOwn, isEqual, isObject, isArray, throttle} from 'underscore';
import {Map, List} from 'immutable';
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
  lineNumberColumnWidth: 30,
  rowSelectorColumnWidth: 26,
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

class GridRoot extends React.Component {
  constructor(props) {
    super(props);

    let dividedObj;

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

    // state 계산영역 시작
    this.state.headerTable = UTIL.makeHeaderTable(this.props.columns, this.state.options);
    this.state.bodyRowTable = UTIL.makeBodyRowTable(this.props.columns, this.state.options);
    this.state.bodyRowMap = UTIL.makeBodyRowMap(this.state.bodyRowTable, this.state.options);
    
    dividedObj = UTIL.divideTableByFrozenColumnIndex(this.state.headerTable, this.state.options.frozenColumnIndex, this.state.options);
    this.state.asideHeaderData = dividedObj.asideData;
    this.state.asideColGroup = dividedObj.asideColGroup; // asideColGroup은 header, bodyRow 에서 공통으로 사용 한번만 구하면 그만이지만 편의상 header에서 처리하기로 한다.
    this.state.leftHeaderData = dividedObj.leftData;
    this.state.headerData = dividedObj.rightData;
    this.state.styles.asidePanelWidth = dividedObj.asidePanelWidth;

    dividedObj = UTIL.divideTableByFrozenColumnIndex(this.state.bodyRowTable, this.state.options.frozenColumnIndex, this.state.options);
    this.state.asideBodyRowData = dividedObj.asideData;
    this.state.leftBodyRowData = dividedObj.leftData;
    this.state.bodyRowData = dividedObj.rightData;

    // 한줄의 높이 계산 (한줄이 여러줄로 구성되었다면 높이를 늘려야 하니까);
    this.state.styles.bodyTrHeight = this.state.bodyRowTable.rows.length * this.state.options.body.columnHeight;

    this.state.colGroupMap = {};

    this.state.headerTable.rows.forEach((row, r) => {
      row.cols.forEach((col, c) => {
        this.state.colGroupMap[col.colIndex] = extend({}, col);
      });
    });

    this.state.colGroup = [];
    each(this.state.colGroupMap, (v, k) => {
      this.state.colGroup.push(v);
    });

    this.state.leftHeaderColGroup = this.state.colGroup.slice(0, this.state.options.frozenColumnIndex);
    this.state.headerColGroup = this.state.colGroup.slice(this.state.options.frozenColumnIndex);

    // footSum
    this.state.footSumColumns = [];
    this.state.footSumTable = {};

    if (isArray(this.state.options.footSum)) {
      this.state.footSumColumns = this.state.options.footSum;
      this.state.footSumTable = UTIL.makeFootSumTable(this.state.footSumColumns, this.state.colGroup, this.state.options);
      dividedObj = UTIL.divideTableByFrozenColumnIndex(this.state.footSumTable, this.state.options.frozenColumnIndex, this.state.options);
      this.state.leftFootSumData = dividedObj.leftData;
      this.state.footSumData = dividedObj.rightData;
    }

    // grouping info
    if (this.state.options.body.grouping) {
      if ("by" in this.state.options.body.grouping && "columns" in this.state.options.body.grouping) {
        this.state.bodyGrouping = {
          by: this.state.options.body.grouping.by,
          columns: this.state.options.body.grouping.columns
        };
        this.state.bodyGroupingTable = UTIL.makeBodyGroupingTable(this.state.bodyGrouping.columns, this.state.colGroup, this.state.options);
        this.state.sortInfo = (() => {
          let sortInfo = {};
          for (let k = 0, kl = this.state.bodyGrouping.by.length; k < kl; k++) {
            sortInfo[this.state.bodyGrouping.by[k]] = {
              orderBy: "asc",
              seq: k,
              fixed: true
            };
            for (let c = 0, cl = colGroup.length; c < cl; c++) {
              if (this.state.colGroup[c].key === this.state.bodyGrouping.by[k]) {
                this.state.colGroup[c].sort = "asc";
                this.state.colGroup[c].sortFixed = true;
              }
            }
          }
          return sortInfo;
        })();

        dividedObj = UTIL.divideTableByFrozenColumnIndex(this.state.bodyGroupingTable, this.state.options.frozenColumnIndex, this.state.options);
        this.state.asideBodyGroupingData = dividedObj.asideData;
        this.state.leftBodyGroupingData = dividedObj.leftData;
        this.state.bodyGroupingData = dividedObj.rightData;
        this.state.bodyGroupingMap = UTIL.makeBodyRowMap(this.state.bodyGroupingTable, this.state.options);
      } else {
        this.state.options.body.grouping = false;
      }
    }

    // state 계산영역 끝

    this.refCallback = this.refCallback.bind(this);
    this.onMouseDownScrollBar = this.onMouseDownScrollBar.bind(this);
    this.onClickScrollTrack = this.onClickScrollTrack.bind(this);

    this.props.init(props, this.state.options);
  }

  componentDidMount() {
    this.gridRootNode = ReactDOM.findDOMNode(this.refs.gridRoot);
    const {styles} = UTIL.calculateDimensions(this.gridRootNode, this.props.gridState, this.state);

    this.throttled_updateDimensions = throttle(this.updateDimensions.bind(this), 100);
    window.addEventListener("resize", this.throttled_updateDimensions);

    this.setState({
      mounted: true,
      styles: styles
    });
    // didMount후에 랜더링이 가능 하므로 불가피하게 setState사용. 다른 대안이 있다면 이 부분 수정 필요.
    // 하지만 mounted = false 상황에서 아무런 부하가 없도록 하였으니 큰 문제는 없을 것으로 판단됨.
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.throttled_updateDimensions);
  }

  // 변경된 props를 받게 되면
  componentWillReceiveProps(nextProps) {
    // 데이터 체인지
    if (this.props.data != nextProps.data) {
      this.props.setData(nextProps.data);
    }
    if (this.props.options != nextProps.options || this.props.columns != nextProps.columns) {
      if (this.props.options != nextProps.options) {
        each(nextProps.options, (v, k) => {
          this.state.options[k] = (isObject(v)) ? extendOwn(this.state.options[k], v) : v;
        });
      }

      this.props.updateProps(nextProps, this.gridRootNode, this.state.options);
      this.data.sColIndex = -1;
      this.data.eColIndex = -1;
    }
  }

  componentWillUpdate(nextProps) {
    // console.log(this.state.sColIndex);
  }

  // change props and render
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.height != this.props.height) {
      //this.props.align(this.props, this.gridRootNode);

      console.log(this.state);
      
      const {styles} = UTIL.calculateDimensions(this.gridRootNode, this.props.gridState, this.state);


      setTimeout(() => {
        let {scrollLeft, scrollTop} = UTIL.getScrollPosition(this.state.scrollLeft, this.state.scrollTop, {
          scrollWidth: this.gridStyles.scrollContentWidth,
          scrollHeight: this.gridStyles.scrollContentHeight,
          clientWidth: this.gridStyles.scrollContentContainerWidth,
          clientHeight: this.gridStyles.scrollContentContainerHeight
        });
        this.setState({
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        });
      });
    }
  }

  /**
   * 사용자 함수
   */
  updateDimensions() {
    this.props.align(this.props, this.gridRootNode);

    let {scrollLeft, scrollTop} = UTIL.getScrollPosition(this.state.scrollLeft, this.state.scrollTop, {
      scrollWidth: this.gridStyles.scrollContentWidth,
      scrollHeight: this.gridStyles.scrollContentHeight,
      clientWidth: this.gridStyles.scrollContentContainerWidth,
      clientHeight: this.gridStyles.scrollContentContainerHeight
    });
    this.setState({
      scrollLeft: scrollLeft,
      scrollTop: scrollTop
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

  refCallback(_key, el) {
    // 하위 컴포넌트에서 전달해주는 ref를 수집 / 갱신
    this.componentRefs[_key] = el;
  }

  render() {
    const gridState = this.props.gridState;
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

      if (typeof this.data._headerColGroup == "undefined" || !isEqual(this.data._headerColGroup, _headerColGroup)) {
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

          list={gridState.get('list')}

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