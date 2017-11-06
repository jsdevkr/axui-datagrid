'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _underscore = require('underscore');

var _immutable = require('immutable');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../_inc/utils');

var UTIL = _interopRequireWildcard(_utils);

var _GridHeader = require('./GridHeader');

var _GridHeader2 = _interopRequireDefault(_GridHeader);

var _GridBody = require('./GridBody');

var _GridBody2 = _interopRequireDefault(_GridBody);

var _GridPage = require('./GridPage');

var _GridPage2 = _interopRequireDefault(_GridPage);

var _GridScroll = require('./GridScroll');

var _GridScroll2 = _interopRequireDefault(_GridScroll);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//~~~~~
var defaultOptions = {
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
    buttons: [{ className: 'datagridIcon-first', onClick: 'PAGE_FIRST' }, { className: 'datagridIcon-prev', onClick: 'PAGE_PREV' }, { className: 'datagridIcon-back', onClick: 'PAGE_BACK' }, { className: 'datagridIcon-play', onClick: 'PAGE_PLAY' }, { className: 'datagridIcon-next', onClick: 'PAGE_NEXT' }, { className: 'datagridIcon-last', onClick: 'PAGE_LAST' }],
    buttonHeight: 16,
    height: 19,
    paging: {
      currentPage: 0,
      pageSize: 5
    }
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
      parentKey: "pid",
      selfKey: "id",
      collapse: "collapse",
      hidden: "hidden",
      parentHash: "__hp__",
      selfHash: "__hs__",
      children: "__children__",
      depth: "__depth__"
    }
  },
  footSum: false
};

var propsToState = function propsToState(props, state) {
  var dividedObj = void 0;

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

  state.headerTable.rows.forEach(function (row, r) {
    row.cols.forEach(function (col, c) {
      state.colGroupMap[col.colIndex] = (0, _underscore.extend)({}, col);
    });
  });

  state.colGroup = [];
  (0, _underscore.each)(state.colGroupMap, function (v, k) {
    state.colGroup.push(v);
  });

  state.leftHeaderColGroup = state.colGroup.slice(0, state.options.frozenColumnIndex);
  state.headerColGroup = state.colGroup.slice(state.options.frozenColumnIndex);

  // footSum
  state.footSumColumns = [];
  state.footSumTable = {};

  if ((0, _underscore.isArray)(state.options.footSum)) {
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
      state.sortInfo = function () {
        var sortInfo = {};
        for (var k = 0, kl = state.bodyGrouping.by.length; k < kl; k++) {
          sortInfo[state.bodyGrouping.by[k]] = {
            orderBy: "asc",
            seq: k,
            fixed: true
          };
          for (var c = 0, cl = colGroup.length; c < cl; c++) {
            if (state.colGroup[c].key === state.bodyGrouping.by[k]) {
              state.colGroup[c].sort = "asc";
              state.colGroup[c].sortFixed = true;
            }
          }
        }
        return sortInfo;
      }();

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

var GridRoot = function (_React$Component) {
  _inherits(GridRoot, _React$Component);

  function GridRoot(props) {
    _classCallCheck(this, GridRoot);

    var _this = _possibleConstructorReturn(this, (GridRoot.__proto__ || Object.getPrototypeOf(GridRoot)).call(this, props));

    _this.componentRefs = {};
    _this.data = {
      sColIndex: -1,
      eColIndex: -1
    };
    // 내부연산용 데이터 저장소
    _this.state = {
      mounted: false,
      scrollLeft: null,
      scrollTop: null,
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
      options: function () {
        var options = (0, _underscore.extend)({}, defaultOptions);
        (0, _underscore.each)(props.options, function (v, k) {
          options[k] = (0, _underscore.isObject)(v) ? (0, _underscore.extendOwn)(options[k], v) : v;
        });
        return options;
      }()
    };
    _this.state = propsToState(props, (0, _underscore.extend)({}, _this.state));

    // state 계산영역 끝
    _this.props.init(props, _this.state.options);

    // 이벤트 멤버에 바인딩
    _this.onMouseDownScrollBar = _this.onMouseDownScrollBar.bind(_this);
    _this.onClickScrollTrack = _this.onClickScrollTrack.bind(_this);
    _this.onClickScrollArrow = _this.onClickScrollArrow.bind(_this);
    _this.onResizeColumnResizer = _this.onResizeColumnResizer.bind(_this);
    _this.onUpdateSelectedCells = _this.onUpdateSelectedCells.bind(_this);
    _this.onClickPageButton = _this.onClickPageButton.bind(_this);
    _this.refCallback = _this.refCallback.bind(_this);
    return _this;
  }

  _createClass(GridRoot, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.gridRootNode = _reactDom2.default.findDOMNode(this.refs.gridRoot);

      this.throttled_updateDimensions = (0, _underscore.throttle)(this.updateDimensions.bind(this), 100);
      window.addEventListener("resize", this.throttled_updateDimensions);

      this.setState({
        mounted: true
        //styles: styles
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.throttled_updateDimensions);
    }

    // 변경된 props를 받게 되면

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // 데이터 체인지
      if (this.props.data !== nextProps.data) {
        this.props.setData(nextProps.data, this.state.options);
      }

      if (this.props.options !== nextProps.options || this.props.columns !== nextProps.columns) {
        this.data._headerColGroup = undefined;
        this.data.sColIndex = -1;
        this.data.eColIndex = -1;

        var newState = propsToState(nextProps, (0, _underscore.extend)({}, this.state, { scrollLeft: 0, scrollTop: 0 }));
        newState.styles = UTIL.calculateDimensions(this.gridRootNode, { list: this.props.store_list }, newState).styles;
        this.setState(newState);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.data !== nextProps.data) {
        return false;
      }
      if (this.props.store_list !== nextProps.store_list || this.props.store_deletedList !== nextProps.store_deletedList || this.props.store_page !== nextProps.store_page || this.props.store_sortInfo !== nextProps.store_sortInfo) {
        // redux store state가 변경되면 렌더를 바로 하지 말고 this.state.styles 변경하여 state에 의해 랜더링 되도록 함. (이중으로 랜더링 하기 싫음)
        this.setState({
          styles: UTIL.calculateDimensions(this.gridRootNode, { list: nextProps.store_list }, this.state).styles
        });
        return false;
      }

      return true;
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {}
    // console.log(this.state.sColIndex);
    // shouldComponentUpdate에더 랜더를 방지 하거나. willUpdate에서 this.state.styles값 강제 변경 테스트.

    // change props and render

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.height != this.props.height) {
        this.updateDimensions();
      }
    }

    /**
     * 사용자 함수
     */

  }, {
    key: 'updateDimensions',
    value: function updateDimensions() {
      var _UTIL$calculateDimens = UTIL.calculateDimensions(this.gridRootNode, { list: this.props.store_list }, this.state),
          styles = _UTIL$calculateDimens.styles;

      var _UTIL$getScrollPositi = UTIL.getScrollPosition(this.state.scrollLeft, this.state.scrollTop, {
        scrollWidth: styles.scrollContentWidth,
        scrollHeight: styles.scrollContentHeight,
        clientWidth: styles.scrollContentContainerWidth,
        clientHeight: styles.scrollContentContainerHeight
      }),
          scrollLeft = _UTIL$getScrollPositi.scrollLeft,
          scrollTop = _UTIL$getScrollPositi.scrollTop;

      this.setState({
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        styles: styles
      });
    }
  }, {
    key: 'handleWheel',
    value: function handleWheel(e) {
      var delta = { x: 0, y: 0 };

      if (e.detail) {
        delta.y = e.detail * 10;
      } else {
        if (typeof e.deltaY === "undefined") {
          delta.y = -e.wheelDelta;
          delta.x = 0;
        } else {
          delta.y = e.deltaY;
          delta.x = e.deltaX;
        }
      }

      var _UTIL$getScrollPositi2 = UTIL.getScrollPosition(this.state.scrollLeft - delta.x, this.state.scrollTop - delta.y, {
        scrollWidth: this.state.styles.scrollContentWidth,
        scrollHeight: this.state.styles.scrollContentHeight,
        clientWidth: this.state.styles.scrollContentContainerWidth,
        clientHeight: this.state.styles.scrollContentContainerHeight
      }),
          scrollLeft = _UTIL$getScrollPositi2.scrollLeft,
          scrollTop = _UTIL$getScrollPositi2.scrollTop,
          endScroll = _UTIL$getScrollPositi2.endScroll;

      this.setState({
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      });

      if (!endScroll) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }, {
    key: 'onMouseDownScrollBar',
    value: function onMouseDownScrollBar(e, barName) {
      var _this2 = this;

      e.preventDefault();
      var styles = this.state.styles;
      var currScrollBarLeft = -this.state.scrollLeft * (styles.horizontalScrollerWidth - styles.horizontalScrollBarWidth) / (styles.scrollContentWidth - styles.scrollContentContainerWidth);
      var currScrollBarTop = -this.state.scrollTop * (styles.verticalScrollerHeight - styles.verticalScrollBarHeight) / (styles.scrollContentHeight - styles.scrollContentContainerHeight);

      this.data[barName + '-scroll-bar'] = {
        startMousePosition: UTIL.getMousePosition(e)
      };

      var onMouseMove = function onMouseMove(ee) {
        if (!_this2.state.dragging) _this2.setState({ dragging: true });

        var _UTIL$getMousePositio = UTIL.getMousePosition(ee),
            x = _UTIL$getMousePositio.x,
            y = _UTIL$getMousePositio.y;

        var startMousePosition = _this2.data[barName + '-scroll-bar'].startMousePosition;


        var processor = {
          vertical: function vertical() {
            var _UTIL$getScrollPositi3 = UTIL.getScrollPositionByScrollBar(currScrollBarLeft, currScrollBarTop + (y - startMousePosition.y), styles),
                scrollLeft = _UTIL$getScrollPositi3.scrollLeft,
                scrollTop = _UTIL$getScrollPositi3.scrollTop;

            _this2.setState({
              scrollLeft: scrollLeft,
              scrollTop: scrollTop
            });
          },
          horizontal: function horizontal() {
            var _UTIL$getScrollPositi4 = UTIL.getScrollPositionByScrollBar(currScrollBarLeft + (x - startMousePosition.x), currScrollBarTop, styles),
                scrollLeft = _UTIL$getScrollPositi4.scrollLeft,
                scrollTop = _UTIL$getScrollPositi4.scrollTop;

            _this2.setState({
              scrollLeft: scrollLeft,
              scrollTop: scrollTop
            });
          }
        };

        if (barName in processor) processor[barName]();
      };

      var offEvent = function offEvent(e) {
        e.preventDefault();

        _this2.setState({ dragging: false });
        _this2.data[barName + '-scroll-bar'] = null;
        // console.log("offEvent");
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', offEvent);
        document.removeEventListener('mouseleave', offEvent);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', offEvent);
      document.addEventListener('mouseleave', offEvent);
    }
  }, {
    key: 'onClickScrollTrack',
    value: function onClickScrollTrack(e, barName) {
      var _this3 = this;

      var styles = this.state.styles;
      var currScrollBarLeft = -this.state.scrollLeft * (styles.horizontalScrollerWidth - styles.horizontalScrollBarWidth) / (styles.scrollContentWidth - styles.scrollContentContainerWidth);
      var currScrollBarTop = -this.state.scrollTop * (styles.verticalScrollerHeight - styles.verticalScrollBarHeight) / (styles.scrollContentHeight - styles.scrollContentContainerHeight);

      var _UTIL$getMousePositio2 = UTIL.getMousePosition(e),
          x = _UTIL$getMousePositio2.x,
          y = _UTIL$getMousePositio2.y;

      var processor = {
        vertical: function vertical() {
          var _UTIL$getScrollPositi5 = UTIL.getScrollPositionByScrollBar(currScrollBarLeft, y - _this3.refs.gridRoot.offsetTop - styles.verticalScrollBarHeight / 2, styles),
              scrollLeft = _UTIL$getScrollPositi5.scrollLeft,
              scrollTop = _UTIL$getScrollPositi5.scrollTop;

          _this3.setState({
            scrollLeft: scrollLeft,
            scrollTop: scrollTop
          });
        },
        horizontal: function horizontal() {
          var _UTIL$getScrollPositi6 = UTIL.getScrollPositionByScrollBar(x - _this3.refs.gridRoot.offsetLeft - styles.pageButtonsContainerWidth - styles.horizontalScrollBarWidth / 2, currScrollBarTop, styles),
              scrollLeft = _UTIL$getScrollPositi6.scrollLeft,
              scrollTop = _UTIL$getScrollPositi6.scrollTop;

          _this3.setState({
            scrollLeft: scrollLeft,
            scrollTop: scrollTop
          });
        }
      };

      if (barName in processor) processor[barName]();
    }
  }, {
    key: 'onClickScrollArrow',
    value: function onClickScrollArrow(e, direction) {
      var _this4 = this;

      var styles = this.state.styles;
      var processor = {
        up: function up() {
          var scrollAmount = styles.scrollContentContainerHeight;
          _this4.setState({
            scrollTop: _this4.state.scrollTop + scrollAmount < 0 ? _this4.state.scrollTop + scrollAmount : 0
          });
        },
        down: function down() {
          var scrollAmount = styles.scrollContentContainerHeight;
          _this4.setState({
            scrollTop: styles.scrollContentContainerHeight < styles.scrollContentHeight + (_this4.state.scrollTop - scrollAmount) ? _this4.state.scrollTop - scrollAmount : styles.scrollContentContainerHeight - styles.scrollContentHeight
          });
        },
        left: function left() {
          var scrollAmount = styles.scrollContentContainerWidth;
          _this4.setState({
            scrollLeft: _this4.state.scrollLeft + scrollAmount < 0 ? _this4.state.scrollLeft + scrollAmount : 0
          });
        },
        right: function right() {
          var scrollAmount = styles.scrollContentContainerWidth;
          _this4.setState({
            scrollLeft: styles.scrollContentContainerWidth < styles.scrollContentWidth + (_this4.state.scrollLeft - scrollAmount) ? _this4.state.scrollLeft - scrollAmount : styles.scrollContentContainerWidth - styles.scrollContentWidth
          });
        }
      };
      if (direction in processor) processor[direction]();
    }
  }, {
    key: 'onResizeColumnResizer',
    value: function onResizeColumnResizer(e, col, newWidth) {
      var colGroup = (0, _immutable.fromJS)(this.state.colGroup).toJS();
      colGroup[col.colIndex]._width = colGroup[col.colIndex].width = newWidth;

      var leftHeaderColGroup = colGroup.slice(0, this.state.options.frozenColumnIndex);
      var headerColGroup = colGroup.slice(this.state.options.frozenColumnIndex);

      var _UTIL$calculateDimens2 = UTIL.calculateDimensions(this.gridRootNode, { list: this.props.store_list }, (0, _underscore.extend)({}, this.state, {
        colGroup: colGroup,
        leftHeaderColGroup: leftHeaderColGroup,
        headerColGroup: headerColGroup
      })),
          styles = _UTIL$calculateDimens2.styles;

      this.data._headerColGroup = undefined;
      this.setState({
        colGroup: colGroup,
        leftHeaderColGroup: leftHeaderColGroup,
        headerColGroup: headerColGroup,
        styles: styles
      });
    }
  }, {
    key: 'onUpdateSelectedCells',
    value: function onUpdateSelectedCells() {}
  }, {
    key: 'onClickPageButton',
    value: function onClickPageButton(e, onClick) {
      var _this5 = this;

      var styles = this.state.styles;
      var state = this.state;
      var processor = {
        'PAGE_FIRST': function PAGE_FIRST() {
          _this5.setState({
            scrollTop: 0
          });
        },
        'PAGE_PREV': function PAGE_PREV() {},
        'PAGE_BACK': function PAGE_BACK() {},
        'PAGE_PLAY': function PAGE_PLAY() {
          _this5.setState(_extends({}, state, {
            page: _extends({}, state.page, {
              paging: _extends({}, state.page.paging, {
                currentPage: state.page.paging.currentPage + 1
              })
            })
          }));
        },
        'PAGE_NEXT': function PAGE_NEXT() {},
        'PAGE_LAST': function PAGE_LAST() {
          _this5.setState({
            scrollTop: styles.scrollContentContainerHeight - styles.scrollContentHeight
          });
        }
      };

      if ((0, _underscore.isFunction)(onClick)) {} else if (typeof onClick === 'string' && onClick in processor) {
        processor[onClick]();
      }
    }
  }, {
    key: 'refCallback',
    value: function refCallback(_key, el) {
      // 하위 컴포넌트에서 전달해주는 ref를 수집 / 갱신
      this.componentRefs[_key] = el;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var styles = this.state.styles;
      var options = this.state.options;
      var mounted = this.state.mounted;
      var headerColGroup = this.state.headerColGroup;

      var gridRootStyle = Object.assign({ height: this.props.height }, this.props.style);
      if (styles.calculatedHeight !== null) {
        gridRootStyle.height = styles.calculatedHeight;
      }
      if (this.state.dragging) {
        // 드래깅 중이므로 내부 요소 text select 금지
        gridRootStyle["userSelect"] = "none";
      }

      var _scrollLeft = Math.abs(this.state.scrollLeft);
      var bodyPanelWidth = styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth;
      var sColIndex = 0,
          eColIndex = headerColGroup.length;
      var _headerColGroup = headerColGroup;
      var _bodyRowData = this.state.bodyRowData;
      var _bodyGroupingData = this.state.bodyGroupingData;

      // 프린트 컬럼 시작점과 끝점 연산
      if (mounted) {
        headerColGroup.forEach(function (col, ci) {
          if (col._sx <= _scrollLeft && col._ex >= _scrollLeft) {
            sColIndex = ci;
          }
          if (col._sx <= _scrollLeft + bodyPanelWidth && col._ex >= _scrollLeft + bodyPanelWidth) {
            eColIndex = ci;
            return false;
          }
        });
        _headerColGroup = headerColGroup.slice(sColIndex, eColIndex + 1);

        if (typeof this.data._headerColGroup === "undefined" || !(0, _underscore.isEqual)(this.data._headerColGroup, _headerColGroup)) {
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

      return _react2.default.createElement(
        'div',
        { ref: 'gridRoot',
          className: (0, _classnames2.default)(this.props.gridCSS.axDatagrid),
          onWheel: function onWheel(e) {
            _this6.handleWheel(e);
          },
          style: gridRootStyle },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(this.props.gridCSS.clipBoard) },
          _react2.default.createElement('textarea', { ref: 'gridClipboard' })
        ),
        _react2.default.createElement(_GridHeader2.default, {
          gridCSS: this.props.gridCSS,
          refCallback: this.refCallback,
          onResizeColumnResizer: this.onResizeColumnResizer,
          mounted: mounted,
          optionsHeader: options.header,
          styles: styles,
          frozenColumnIndex: options.frozenColumnIndex,

          colGroup: this.state.colGroup,
          asideColGroup: this.state.asideColGroup,
          leftHeaderColGroup: this.state.leftHeaderColGroup,
          headerColGroup: this.state.headerColGroup,

          asideHeaderData: this.state.asideHeaderData,
          leftHeaderData: this.state.leftHeaderData,
          headerData: this.state.headerData,

          scrollLeft: this.state.scrollLeft
        }),
        _react2.default.createElement(_GridBody2.default, {
          gridCSS: this.props.gridCSS,
          refCallback: this.refCallback,
          onUpdateSelectedCells: this.onUpdateSelectedCells,
          mounted: mounted,
          options: options,
          styles: styles,
          CTInnerWidth: styles.CTInnerWidth,
          CTInnerHeight: styles.CTInnerHeight,
          frozenColumnIndex: options.frozenColumnIndex,

          colGroup: this.state.colGroup,
          asideColGroup: this.state.asideColGroup,
          leftHeaderColGroup: this.state.leftHeaderColGroup,
          headerColGroup: _headerColGroup,

          bodyTable: this.state.bodyRowTable,
          asideBodyRowData: this.state.asideBodyRowData,
          asideBodyGroupingData: this.state.asideBodyGroupingData,
          leftBodyRowData: this.state.leftBodyRowData,
          leftBodyGroupingData: this.state.leftBodyGroupingData,
          bodyRowData: _bodyRowData,
          bodyGroupingData: _bodyGroupingData,

          list: this.props.store_list,
          scrollLeft: this.state.scrollLeft,
          scrollTop: this.state.scrollTop
        }),
        _react2.default.createElement(_GridPage2.default, {
          gridCSS: this.props.gridCSS,
          refCallback: this.refCallback,
          onClickPageButton: this.onClickPageButton,
          mounted: mounted,
          styles: styles,
          pageButtonsContainerWidth: styles.pageButtonsContainerWidth,
          pageButtons: options.page.buttons,
          pageButtonHeight: options.page.buttonHeight,
          paging: options.page.paging,
          list: this.props.store_list,
          scrollLeft: this.state.scrollLeft,
          scrollTop: this.state.scrollTop
        }),
        _react2.default.createElement(_GridScroll2.default, {
          gridCSS: this.props.gridCSS,
          refCallback: this.refCallback,
          onMouseDownScrollBar: this.onMouseDownScrollBar,
          onClickScrollTrack: this.onClickScrollTrack,
          onClickScrollArrow: this.onClickScrollArrow,
          mounted: mounted,
          optionsScroller: options.scroller,

          bodyHeight: styles.bodyHeight,
          pageHeight: styles.pageHeight,

          verticalScrollerWidth: styles.verticalScrollerWidth,
          verticalScrollerHeight: styles.verticalScrollerHeight,

          horizontalScrollerWidth: styles.horizontalScrollerWidth,
          horizontalScrollerHeight: styles.horizontalScrollerHeight,

          verticalScrollBarHeight: styles.verticalScrollBarHeight,
          horizontalScrollBarWidth: styles.horizontalScrollBarWidth,

          scrollerArrowSize: styles.scrollerArrowSize,
          scrollerPadding: styles.scrollerPadding,
          scrollBarLeft: -this.state.scrollLeft * (styles.horizontalScrollerWidth - styles.horizontalScrollBarWidth) / (styles.scrollContentWidth - styles.scrollContentContainerWidth),
          scrollBarTop: -this.state.scrollTop * (styles.verticalScrollerHeight - styles.verticalScrollBarHeight) / (styles.scrollContentHeight - styles.scrollContentContainerHeight)
        }),
        _react2.default.createElement('div', { ref: 'gridVerticalResizer' }),
        _react2.default.createElement('div', { ref: 'gridHorizontalResizer' })
      );
    }
  }]);

  return GridRoot;
}(_react2.default.Component);

GridRoot.propTypes = {
  height: _propTypes2.default.string,
  columns: _propTypes2.default.array,
  data: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
  options: _propTypes2.default.shape({
    frozenColumnIndex: _propTypes2.default.number,
    frozenRowIndex: _propTypes2.default.number,
    showLineNumber: _propTypes2.default.bool,
    showRowSelector: _propTypes2.default.bool,
    multipleSelect: _propTypes2.default.bool,
    columnMinWidth: _propTypes2.default.number,
    lineNumberColumnWidth: _propTypes2.default.number,
    rowSelectorColumnWidth: _propTypes2.default.number,
    sortable: _propTypes2.default.bool,
    remoteSort: _propTypes2.default.bool,
    asidePanelWidth: _propTypes2.default.number,
    header: _propTypes2.default.shape({
      display: _propTypes2.default.bool,
      align: _propTypes2.default.string,
      columnHeight: _propTypes2.default.number,
      columnPadding: _propTypes2.default.number,
      columnBorderWidth: _propTypes2.default.number,
      selector: _propTypes2.default.bool
    }),
    body: _propTypes2.default.shape({
      align: _propTypes2.default.bool,
      columnHeight: _propTypes2.default.number,
      columnPadding: _propTypes2.default.number,
      columnBorderWidth: _propTypes2.default.number,
      grouping: _propTypes2.default.bool,
      mergeCells: _propTypes2.default.bool
    }),
    page: _propTypes2.default.shape({
      height: _propTypes2.default.number,
      display: _propTypes2.default.bool,
      statusDisplay: _propTypes2.default.bool,
      navigationItemCount: _propTypes2.default.number,
      paging: {
        pageSize: _propTypes2.default.number,
        currentPage: _propTypes2.default.number
      }
    }),
    scroller: _propTypes2.default.shape({
      size: _propTypes2.default.number,
      barMinSize: _propTypes2.default.number,
      useVerticalScroll: _propTypes2.default.bool
    }),
    columnKeys: _propTypes2.default.shape({
      selected: _propTypes2.default.string,
      modified: _propTypes2.default.string,
      deleted: _propTypes2.default.string,
      disableSelection: _propTypes2.default.string
    }),
    tree: _propTypes2.default.shape({
      use: _propTypes2.default.bool,
      hashDigit: _propTypes2.default.number,
      indentWidth: _propTypes2.default.number,
      arrowWidth: _propTypes2.default.number,
      iconWidth: _propTypes2.default.number,
      icons: _propTypes2.default.shape({
        openedArrow: _propTypes2.default.string,
        collapsedArrow: _propTypes2.default.string,
        groupIcon: _propTypes2.default.string,
        collapsedGroupIcon: _propTypes2.default.string,
        itemIcon: _propTypes2.default.string
      }),
      columnKeys: _propTypes2.default.shape({
        parentKey: _propTypes2.default.string,
        selfKey: _propTypes2.default.string,
        collapse: _propTypes2.default.string,
        hidden: _propTypes2.default.string,
        parentHash: _propTypes2.default.string,
        selfHash: _propTypes2.default.string,
        children: _propTypes2.default.string,
        depth: _propTypes2.default.string
      })
    })
  }),
  footSum: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func])
};

GridRoot.defaultProps = {
  height: "300px",
  columns: [],
  data: [],
  options: {}
};

exports.default = GridRoot;