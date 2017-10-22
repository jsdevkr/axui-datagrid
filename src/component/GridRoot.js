import React from 'react';
import ReactDOM from 'react-dom';
import {each, extend, extendOwn, isObject, throttle} from 'underscore';
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
    // props에 추가된 액션만 호출 가능
    this.gridStyles = {};
    this.componentRefs = {};
    this.data = {}; // 내부연산용 데이터 저장소
    this.state = {
      scrollLeft: 0,
      scrollTop: 0,
      dragging: false, // 사용자가 드래깅 중인 경우 (style.userSelect=none 처리)
      options: (() => {
        let options = extend({}, defaultOptions);
        each(props.options, function (v, k) {
          options[k] = (isObject(v)) ? extendOwn(options[k], v) : v;
        });
        return options;
      })()
    };
    this.refCallback = this.refCallback.bind(this);
    this.onMouseDownScrollBar = this.onMouseDownScrollBar.bind(this);
    this.onClickScrollTrack = this.onClickScrollTrack.bind(this);

    props.init(props, this.state.options);
  }

  componentDidMount() {
    this.gridRootNode = ReactDOM.findDOMNode(this.refs.gridRoot);
    this.props.didMount(this.props, this.gridRootNode);

    this.throttled_updateDimensions = throttle(this.updateDimensions.bind(this), 100);
    window.addEventListener("resize", this.throttled_updateDimensions);
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
        this.setState({
          options: this.state.options
        });
      }

      //this.props.changeOptions(nextProps, this.gridRootNode, this.state.options);
      this.props.updateProps(nextProps, this.gridRootNode, this.state.options);
    }
  }

  // change props and render
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.height != this.props.height) {
      this.props.align(this.props, this.gridRootNode);

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
      scrollWidth: this.gridStyles.scrollContentWidth,
      scrollHeight: this.gridStyles.scrollContentHeight,
      clientWidth: this.gridStyles.scrollContentContainerWidth,
      clientHeight: this.gridStyles.scrollContentContainerHeight
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
    const styles = this.gridStyles;
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
    const styles = this.gridStyles;
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
    const styles = this.gridStyles = gridState.get('styles').toJS();
    const options = gridState.get('options').toJS();
    const mounted = gridState.get("mounted");

    let gridRootStyle = Object.assign({height: this.props.height}, this.props.style);
    if(styles.calculatedHeight !== null){
      gridRootStyle.height = styles.calculatedHeight;
    }
    if (this.state.dragging) { // 드래깅 중이므로 내부 요소 text select 금지
      gridRootStyle["userSelect"] = "none";
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

          colGroup={gridState.get('colGroup')}
          asideColGroup={gridState.get('asideColGroup')}
          leftHeaderColGroup={gridState.get('leftHeaderColGroup')}
          headerColGroup={gridState.get('headerColGroup')}

          asideHeaderData={gridState.get('asideHeaderData')}
          leftHeaderData={gridState.get('leftHeaderData')}
          headerData={gridState.get('headerData')}

          scrollLeft={this.state.scrollLeft}
        />
        <GridBody
          refCallback={this.refCallback}
          mounted={mounted}
          options={options}
          styles={styles}
          frozenColumnIndex={options.frozenColumnIndex}

          colGroup={gridState.get('colGroup')}
          asideColGroup={gridState.get('asideColGroup')}
          leftHeaderColGroup={gridState.get('leftHeaderColGroup')}
          headerColGroup={gridState.get('headerColGroup')}

          bodyTable={gridState.get('bodyRowTable')}
          asideBodyRowData={gridState.get('asideBodyRowData')}
          asideBodyGroupingData={gridState.get('asideBodyGroupingData')}
          leftBodyRowData={gridState.get('leftBodyRowData')}
          leftBodyGroupingData={gridState.get('leftBodyGroupingData')}
          bodyRowData={gridState.get('bodyRowData')}
          bodyGroupingData={gridState.get('bodyGroupingData')}

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