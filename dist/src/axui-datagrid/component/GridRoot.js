"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var lodash_1 = require("lodash");
var immutable_1 = require("immutable");
var classnames_1 = require("classnames");
var UTIL = require("../util/index");
var defaults_1 = require("../_inc/defaults");
var index_1 = require("./index");
var GridFormatter = require("../_inc/formatter");
var constant_1 = require("../_inc/constant");
var formatter = GridFormatter.getAll();
var GridRoot = /** @class */ (function (_super) {
    __extends(GridRoot, _super);
    function GridRoot(props) {
        var _this = _super.call(this, props) || this;
        _this.columnFormatter = GridRoot.getFormatter();
        _this.componentRefs = {};
        _this.data = {
            sColIndex: -1,
            eColIndex: -1,
        };
        // 내부연산용 데이터 저장소
        var defaultState = {
            mounted: false,
            scrollLeft: 0,
            scrollTop: 0,
            dragging: false,
            selectionStartOffset: {},
            selectionEndOffset: {},
            selectionMinOffset: {},
            selectionMaxOffset: {},
            selectionRows: {},
            selectionCols: {},
            focusedRow: -1,
            focusedCol: -1,
            isInlineEditing: false,
            inlineEditingCell: {},
            isColumnFilter: false,
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
            footSumTable: {},
            leftFootSumData: {},
            footSumData: {},
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
                frozenPanelHeight: 0,
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
                pageButtonsContainerWidth: 0,
            },
            options: (function () {
                // todo : 옵션 초기화 함수로 분리
                var options = lodash_1.assign({}, defaults_1.gridOptions);
                lodash_1.each(props.options, function (v, k) {
                    options[k] = lodash_1.isObject(v) ? lodash_1.assign({}, options[k], v) : v;
                });
                return options;
            })(),
        };
        _this.state = UTIL.propsToState(props, lodash_1.assign({}, defaultState));
        // state 계산영역 끝
        _this.props.init(props, _this.state.options);
        // 이벤트 멤버에 바인딩
        _this.getRootBounding = _this.getRootBounding.bind(_this);
        _this.onMouseDownScrollBar = _this.onMouseDownScrollBar.bind(_this);
        _this.onClickScrollTrack = _this.onClickScrollTrack.bind(_this);
        _this.onClickScrollArrow = _this.onClickScrollArrow.bind(_this);
        _this.onResizeColumnResizer = _this.onResizeColumnResizer.bind(_this);
        _this.onClickPageButton = _this.onClickPageButton.bind(_this);
        _this.onMouseDownBody = _this.onMouseDownBody.bind(_this);
        _this.onWheel = _this.onWheel.bind(_this);
        _this.onKeyPress = _this.onKeyPress.bind(_this);
        _this.onClickHeader = _this.onClickHeader.bind(_this);
        _this.onChangeColumnFilter = _this.onChangeColumnFilter.bind(_this);
        _this.onDoubleClickCell = _this.onDoubleClickCell.bind(_this);
        _this.updateEditInput = _this.updateEditInput.bind(_this);
        _this.onFireEvent = _this.onFireEvent.bind(_this);
        return _this;
    }
    GridRoot.setFormatter = function (_formatter) {
        return (formatter = lodash_1.assign(formatter, _formatter));
    };
    GridRoot.getFormatter = function () {
        return formatter;
    };
    GridRoot.prototype.componentDidMount = function () {
        this.gridRootNode = ReactDOM.findDOMNode(this.refs.gridRoot);
        this.throttled_updateDimensions = lodash_1.throttle(this.updateDimensions.bind(this), 100);
        window.addEventListener('resize', this.throttled_updateDimensions);
        this.setState({
            mounted: true,
        });
    };
    GridRoot.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.throttled_updateDimensions);
    };
    GridRoot.prototype.componentWillReceiveProps = function (nextProps) {
        // 변경된 props를 받게 되면
        // 데이터 체인지
        if (this.props.data !== nextProps.data) {
            this.props.setData(nextProps.data, this.state.options);
        }
        if (this.props.options !== nextProps.options ||
            this.props.columns !== nextProps.columns) {
            this.data._headerColGroup = undefined;
            this.data.sColIndex = -1;
            this.data.eColIndex = -1;
            var newState = lodash_1.assign({}, this.state, {
                scrollLeft: 0,
                scrollTop: 0,
                options: (function () {
                    var options = lodash_1.assign({}, defaults_1.gridOptions);
                    lodash_1.each(nextProps.options, function (v, k) {
                        options[k] = lodash_1.isObject(v) ? lodash_1.assign({}, options[k], v) : v;
                    });
                    return options;
                })(),
            });
            newState = UTIL.propsToState(nextProps, newState);
            newState.styles = UTIL.calculateDimensions(this.gridRootNode, { list: this.props.store_list }, newState).styles;
            this.setState(newState);
        }
    };
    GridRoot.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        if (this.props.data !== nextProps.data) {
            return false;
        }
        if (this.props.height !== nextProps.height) {
            // 악마의 기술을 쓴게 아닐까..
            this.gridRootNode.style.height = UTIL.cssNumber(nextProps.height);
        }
        if (this.props.store_list !== nextProps.store_list ||
            this.props.store_deletedList !== nextProps.store_deletedList ||
            this.props.store_page !== nextProps.store_page ||
            this.props.store_sortInfo !== nextProps.store_sortInfo ||
            this.props.store_filterInfo !== nextProps.store_filterInfo) {
            // redux store state가 변경되면 렌더를 바로 하지 말고 this.state.styles 변경하여 state에 의해 랜더링 되도록 함. (이중으로 랜더링 하기 싫음)
            var styles = UTIL.calculateDimensions(this.gridRootNode, { list: nextProps.store_list }, this.state).styles;
            this.setState({
                scrollTop: 0,
                styles: styles,
            });
            return false;
        }
        return true;
    };
    GridRoot.prototype.componentWillUpdate = function (nextProps) {
        // console.log(this.state.sColIndex);
        // shouldComponentUpdate에더 랜더를 방지 하거나. willUpdate에서 this.state.styles값 강제 변경 테스트.
    };
    GridRoot.prototype.componentDidUpdate = function (prevProps, prevState) {
        // change props and render
        if (prevProps.height !== this.props.height) {
            this.updateDimensions();
        }
    };
    /**
     * 사용자 함수
     */
    GridRoot.prototype.updateDimensions = function () {
        var styles = UTIL.calculateDimensions(this.gridRootNode, { list: this.props.store_list }, this.state).styles;
        var _a = UTIL.getScrollPosition(this.state.scrollLeft, this.state.scrollTop, {
            scrollWidth: styles.scrollContentWidth,
            scrollHeight: styles.scrollContentHeight,
            clientWidth: styles.scrollContentContainerWidth,
            clientHeight: styles.scrollContentContainerHeight,
        }), scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop;
        this.setState({
            scrollLeft: scrollLeft,
            scrollTop: scrollTop,
            styles: styles,
        });
    };
    GridRoot.prototype.onMouseDownScrollBar = function (e, barName) {
        var _this = this;
        e.preventDefault();
        var styles = this.state.styles;
        var currScrollBarLeft = -this.state.scrollLeft *
            (styles.horizontalScrollerWidth - styles.horizontalScrollBarWidth) /
            (styles.scrollContentWidth - styles.scrollContentContainerWidth);
        var currScrollBarTop = -this.state.scrollTop *
            (styles.verticalScrollerHeight - styles.verticalScrollBarHeight) /
            (styles.scrollContentHeight - styles.scrollContentContainerHeight);
        var startMousePosition = UTIL.getMousePosition(e);
        var onMouseMove = function (ee) {
            if (!_this.state.dragging) {
                _this.setState({ dragging: true });
            }
            var _a = UTIL.getMousePosition(ee), x = _a.x, y = _a.y;
            var processor = {
                vertical: function () {
                    var _a = UTIL.getScrollPositionByScrollBar(currScrollBarLeft, currScrollBarTop + (y - startMousePosition.y), styles), scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop;
                    _this.setState({
                        scrollLeft: scrollLeft || 0,
                        scrollTop: scrollTop || 0,
                    });
                },
                horizontal: function () {
                    var _a = UTIL.getScrollPositionByScrollBar(currScrollBarLeft + (x - startMousePosition.x), currScrollBarTop, styles), scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop;
                    _this.setState({
                        scrollLeft: scrollLeft || 0,
                        scrollTop: scrollTop || 0,
                    });
                },
            };
            if (barName in processor) {
                processor[barName]();
            }
        };
        var offEvent = function (ee) {
            ee.preventDefault();
            _this.setState({ dragging: false });
            startMousePosition = null;
            console.log('offEvent');
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', offEvent);
            document.removeEventListener('mouseleave', offEvent);
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', offEvent);
        document.addEventListener('mouseleave', offEvent);
    };
    GridRoot.prototype.onClickScrollTrack = function (e, barName) {
        var _this = this;
        var styles = this.state.styles;
        var currScrollBarLeft = -this.state.scrollLeft *
            (styles.horizontalScrollerWidth - styles.horizontalScrollBarWidth) /
            (styles.scrollContentWidth - styles.scrollContentContainerWidth);
        var currScrollBarTop = -this.state.scrollTop *
            (styles.verticalScrollerHeight - styles.verticalScrollBarHeight) /
            (styles.scrollContentHeight - styles.scrollContentContainerHeight);
        var _a = UTIL.getMousePosition(e), x = _a.x, y = _a.y;
        var _b = this.gridRootNode.getBoundingClientRect(), grx = _b.x, gry = _b.y;
        var processor = {
            vertical: function () {
                var _a = UTIL.getScrollPositionByScrollBar(currScrollBarLeft, y - gry - styles.verticalScrollBarHeight / 2, styles), scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop;
                _this.setState({
                    scrollLeft: scrollLeft || 0,
                    scrollTop: scrollTop || 0,
                });
            },
            horizontal: function () {
                var _a = UTIL.getScrollPositionByScrollBar(x -
                    grx -
                    styles.pageButtonsContainerWidth -
                    styles.horizontalScrollBarWidth / 2, currScrollBarTop, styles), scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop;
                _this.setState({
                    scrollLeft: scrollLeft || 0,
                    scrollTop: scrollTop || 0,
                });
            },
        };
        if (barName in processor) {
            processor[barName]();
        }
    };
    GridRoot.prototype.onClickScrollArrow = function (e, direction) {
        var _this = this;
        var styles = this.state.styles;
        var processor = {
            up: function () {
                var scrollAmount = styles.scrollContentContainerHeight;
                _this.setState({
                    scrollTop: _this.state.scrollTop + scrollAmount < 0
                        ? _this.state.scrollTop + scrollAmount
                        : 0,
                });
            },
            down: function () {
                var scrollAmount = styles.scrollContentContainerHeight;
                _this.setState({
                    scrollTop: styles.scrollContentContainerHeight <
                        styles.scrollContentHeight + (_this.state.scrollTop - scrollAmount)
                        ? _this.state.scrollTop - scrollAmount
                        : styles.scrollContentContainerHeight -
                            styles.scrollContentHeight,
                });
            },
            left: function () {
                var scrollAmount = styles.scrollContentContainerWidth;
                _this.setState({
                    scrollLeft: _this.state.scrollLeft + scrollAmount < 0
                        ? _this.state.scrollLeft + scrollAmount
                        : 0,
                });
            },
            right: function () {
                var scrollAmount = styles.scrollContentContainerWidth;
                _this.setState({
                    scrollLeft: styles.scrollContentContainerWidth <
                        styles.scrollContentWidth + (_this.state.scrollLeft - scrollAmount)
                        ? _this.state.scrollLeft - scrollAmount
                        : styles.scrollContentContainerWidth - styles.scrollContentWidth,
                });
            },
        };
        if (direction in processor) {
            processor[direction]();
        }
    };
    GridRoot.prototype.onResizeColumnResizer = function (e, col, newWidth) {
        var colGroup = immutable_1.fromJS(this.state.colGroup).toJS();
        var styles, leftHeaderColGroup, headerColGroup;
        colGroup[col.colIndex]._width = colGroup[col.colIndex].width = newWidth;
        (_a = UTIL.calculateDimensions(this.gridRootNode, { list: this.props.store_list }, lodash_1.assign({}, this.state, { colGroup: colGroup })), styles = _a.styles, leftHeaderColGroup = _a.leftHeaderColGroup, headerColGroup = _a.headerColGroup);
        this.data._headerColGroup = undefined;
        this.setState({
            colGroup: colGroup,
            leftHeaderColGroup: leftHeaderColGroup,
            headerColGroup: headerColGroup,
            styles: styles,
        });
        var _a;
    };
    GridRoot.prototype.getRootBounding = function () {
        return this.gridRootNode.getBoundingClientRect();
    };
    GridRoot.prototype.onClickPageButton = function (e, onClick) {
        var _this = this;
        var processor = {
            PAGE_FIRST: function () {
                _this.onKeyAction(constant_1.KEY_CODE.HOME);
            },
            PAGE_PREV: function () {
                _this.onKeyAction(constant_1.KEY_CODE.PAGE_UP);
            },
            PAGE_BACK: function () {
                _this.onKeyAction(constant_1.KEY_CODE.UP);
            },
            PAGE_PLAY: function () {
                _this.onKeyAction(constant_1.KEY_CODE.DOWN);
            },
            PAGE_NEXT: function () {
                _this.onKeyAction(constant_1.KEY_CODE.PAGE_DOWN);
            },
            PAGE_LAST: function () {
                _this.onKeyAction(constant_1.KEY_CODE.END);
            },
        };
        if (lodash_1.isFunction(onClick)) {
            onClick();
        }
        else if (typeof onClick === 'string' && onClick in processor) {
            processor[onClick]();
        }
    };
    GridRoot.prototype.onMouseDownBody = function (e) {
        var _this = this;
        var _a = this.state.styles, frozenPanelWidth = _a.frozenPanelWidth, frozenPanelHeight = _a.frozenPanelHeight;
        var startMousePosition = UTIL.getMousePosition(e);
        var spanType = e.target.getAttribute('data-span');
        var _b = this.state.styles, headerHeight = _b.headerHeight, bodyHeight = _b.bodyHeight, CTInnerWidth = _b.CTInnerWidth, verticalScrollerWidth = _b.verticalScrollerWidth, bodyTrHeight = _b.bodyTrHeight, asidePanelWidth = _b.asidePanelWidth;
        var _c = this.getRootBounding(), x = _c.x, y = _c.y;
        var leftPadding = x; // + styles.asidePanelWidth;
        var topPadding = y; // + styles.headerHeight;
        var startScrollLeft = this.state.scrollLeft;
        var startScrollTop = this.state.scrollTop;
        var startX = startMousePosition.x - leftPadding;
        var startY = startMousePosition.y - topPadding;
        var getRowIndex = function (y, scrollTop) {
            if (y - headerHeight < frozenPanelHeight)
                scrollTop = 0;
            var i = 0;
            i = Math.floor((y - headerHeight - scrollTop) / bodyTrHeight);
            if (i < 0)
                i = 0;
            else if (i >= _this.props.store_list.size - 1)
                i = _this.props.store_list.size - 1;
            return i;
        };
        var getColIndex = function (x, scrollLeft) {
            if (x - asidePanelWidth < frozenPanelWidth)
                scrollLeft = 0;
            var p = x - asidePanelWidth - scrollLeft;
            var cl = _this.state.colGroup.length;
            var i = -1;
            while (cl--) {
                var col = _this.state.colGroup[cl];
                if (col._sx <= p && col._ex >= p) {
                    i = col.colIndex;
                    break;
                }
            }
            return i;
        };
        var proc_bodySelect = function () {
            if (selectStartedCol < 0)
                return;
            var onMouseMove = function (ee) {
                var currMousePosition = UTIL.getMousePosition(ee);
                // 인터벌 무빙 함수 아래 구문에서 연속 스크롤이 필요하면 사용
                var setStateCall = function (currState, _moving) {
                    var selectEndedRow = getRowIndex(currState.selectionEndOffset.y, _this.state.scrollTop);
                    var selectEndedCol = getColIndex(currState.selectionEndOffset.x, _this.state.scrollLeft);
                    // 컬럼인덱스를 찾지 못했다면
                    if (selectEndedCol === -1) {
                        var p = currState.selectionEndOffset.x -
                            asidePanelWidth -
                            _this.state.scrollLeft;
                        var lastCol = lodash_1.last(_this.state.headerColGroup);
                        selectEndedCol =
                            p < 0 ? 0 : lastCol._ex <= p ? lastCol.colIndex : 0;
                    }
                    var sRow = Math.min(selectStartedRow, selectEndedRow);
                    var eRow = Math.max(selectStartedRow, selectEndedRow);
                    var sCol = Math.min(selectStartedCol, selectEndedCol);
                    var eCol = Math.max(selectStartedCol, selectEndedCol);
                    if (sRow !== -1 && eRow !== -1 && sCol !== -1 && eCol !== -1) {
                        currState.selectionRows = {};
                        currState.selectionCols = {};
                        for (var i = sRow; i < eRow + 1; i++)
                            currState.selectionRows[i] = true;
                        for (var i = sCol; i < eCol + 1; i++)
                            currState.selectionCols[i] = true;
                    }
                    else {
                        console.error('get selection fail', sRow, eRow, sCol, eCol);
                    }
                    //currState.focusedRow = selectEndedRow;
                    //currState.focusedCol = selectEndedCol;
                    _this.setState(currState);
                };
                var scrollMoving = function (_moving) {
                    var newScrollTop = _this.state.scrollTop;
                    var newScrollLeft = _this.state.scrollLeft;
                    var scrollLeft, scrollTop, endScroll;
                    if (_moving.top) {
                        newScrollTop = _this.state.scrollTop + bodyTrHeight;
                    }
                    else if (_moving.bottom) {
                        newScrollTop = _this.state.scrollTop - bodyTrHeight;
                    }
                    if (_moving.left) {
                        newScrollLeft = _this.state.scrollLeft + 100;
                    }
                    else if (_moving.right) {
                        newScrollLeft = _this.state.scrollLeft - 100;
                    }
                    (_a = UTIL.getScrollPosition(newScrollLeft, newScrollTop, {
                        scrollWidth: _this.state.styles.scrollContentWidth,
                        scrollHeight: _this.state.styles.scrollContentHeight,
                        clientWidth: _this.state.styles.scrollContentContainerWidth,
                        clientHeight: _this.state.styles.scrollContentContainerHeight,
                    }), scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop, endScroll = _a.endScroll);
                    setStateCall({
                        scrollTop: scrollTop,
                        scrollLeft: scrollLeft,
                        selectionEndOffset: _this.state.selectionEndOffset,
                    }, _moving);
                    return !endScroll;
                    var _a;
                };
                var x1 = startMousePosition.x - leftPadding;
                var y1 = startMousePosition.y - topPadding;
                var x2 = currMousePosition.x - leftPadding;
                var y2 = currMousePosition.y - topPadding;
                var p1X = Math.min(x1, x2);
                var p2X = Math.max(x1, x2);
                var p1Y = Math.min(y1, y2);
                var p2Y = Math.max(y1, y2);
                var moving = {
                    active: false,
                    top: false,
                    left: false,
                    bottom: false,
                    right: false,
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
                    scrollTop: _this.state.scrollTop,
                    scrollLeft: _this.state.scrollLeft,
                    selectionStartOffset: {
                        x: x1,
                        y: y1,
                    },
                    selectionEndOffset: {
                        x: x2,
                        y: y2,
                    },
                    selectionMinOffset: {
                        x: p1X,
                        y: p1Y,
                    },
                    selectionMaxOffset: {
                        x: p2X,
                        y: p2Y,
                    },
                }, moving);
                // moving.active 이면 타임 인터벌 시작
                if (_this.scrollMovingTimer)
                    clearInterval(_this.scrollMovingTimer);
                if (moving.active) {
                    _this.scrollMovingTimer = setInterval(function () {
                        if (!scrollMoving(moving)) {
                            // clearInterval(this.scrollMovingTimer);
                        }
                    }, 60);
                }
            };
            var offEvent = function (ee) {
                ee.preventDefault();
                if (_this.scrollMovingTimer)
                    clearInterval(_this.scrollMovingTimer);
                _this.setState({
                    dragging: false,
                    selectionStartOffset: null,
                    selectionEndOffset: null,
                    selectionMinOffset: null,
                    selectionMaxOffset: null,
                });
                document.removeEventListener('mousemove', throttled_onMouseMove);
                document.removeEventListener('mouseup', offEvent);
                document.removeEventListener('mouseleave', offEvent);
            };
            var throttled_onMouseMove = lodash_1.throttle(onMouseMove, 10);
            if (e.metaKey ||
                (e.shiftKey && _this.state.focusedRow > -1 && _this.state.focusedCol > -1)) {
                if (e.shiftKey) {
                    var state = {
                        dragging: false,
                        selectionRows: {},
                        selectionCols: {},
                    };
                    var sRow = Math.min(_this.state.focusedRow, selectStartedRow);
                    var sCol = Math.min(_this.state.focusedCol, selectStartedCol);
                    var eRow = Math.max(_this.state.focusedRow, selectStartedRow);
                    var eCol = Math.max(_this.state.focusedCol, selectStartedCol);
                    for (var i = sRow; i < eRow + 1; i++)
                        state.selectionRows[i] = true;
                    for (var i = sCol; i < eCol + 1; i++)
                        state.selectionCols[i] = true;
                    _this.setState(state);
                    selectStartedRow = _this.state.focusedRow;
                    selectStartedCol = _this.state.focusedCol;
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
                _this.setState({
                    dragging: false,
                    selectionStartOffset: null,
                    selectionEndOffset: null,
                    selectionMinOffset: null,
                    selectionMaxOffset: null,
                    selectionRows: (_a = {}, _a[selectStartedRow] = true, _a),
                    selectionCols: (_b = {}, _b[selectStartedCol] = true, _b),
                    focusedRow: selectStartedRow,
                    focusedCol: selectStartedCol,
                });
                document.addEventListener('mousemove', throttled_onMouseMove);
                document.addEventListener('mouseup', offEvent);
                document.addEventListener('mouseleave', offEvent);
            }
            var _a, _b;
        };
        var proc_clickLinenumber = function () {
            var state = {
                dragging: false,
                selectionRows: {},
                selectionCols: (function () {
                    var cols = {};
                    _this.state.colGroup.forEach(function (col) {
                        cols[col.colIndex] = true;
                    });
                    return cols;
                })(),
                focusedRow: _this.state.focusedRow,
                focusedCol: 0,
            };
            if (e.shiftKey) {
                state.selectionRows = (function () {
                    var rows = {};
                    lodash_1.range(Math.min(_this.state.focusedRow, selectStartedRow), Math.max(_this.state.focusedRow, selectStartedRow) + 1).forEach(function (i) {
                        rows[i] = true;
                    });
                    return rows;
                })();
            }
            else {
                state.selectionRows = (_a = {},
                    _a[selectStartedRow] = true,
                    _a);
                state.focusedRow = selectStartedRow;
            }
            _this.setState(state);
            var _a;
        };
        // 선택이 시작된 row / col
        var selectStartedRow = getRowIndex(startY, startScrollTop);
        var selectStartedCol = getColIndex(startX, startScrollLeft);
        if (this.state.isInlineEditing &&
            this.state.inlineEditingCell.row === selectStartedRow &&
            this.state.inlineEditingCell.col === selectStartedCol) {
            // 선택된 셀이 에디팅중인 셀이라면 함수 실행 중지
            return false;
        }
        if (spanType === 'lineNumber') {
            // click lineNumber
            proc_clickLinenumber();
        }
        else {
            proc_bodySelect();
        }
        return true;
    };
    GridRoot.prototype.onKeyAction = function (keyAction) {
        var _this = this;
        var options = this.state.options;
        var styles = this.state.styles;
        var headerColGroup = this.state.headerColGroup;
        var sRowIndex = Math.floor(-this.state.scrollTop / styles.bodyTrHeight) +
            options.frozenRowIndex;
        var eRowIndex = Math.floor(-this.state.scrollTop / styles.bodyTrHeight) +
            options.frozenRowIndex +
            Math.floor(styles.bodyHeight / styles.bodyTrHeight);
        var sColIndex = this.data.sColIndex;
        var eColIndex = this.data.eColIndex;
        var pRowSize = Math.floor(styles.bodyHeight / styles.bodyTrHeight);
        var getAvailScrollTop = function (rowIndex) {
            var scrollTop;
            if (sRowIndex >= rowIndex) {
                scrollTop = -rowIndex * styles.bodyTrHeight;
            }
            else if (eRowIndex <= rowIndex) {
                scrollTop =
                    -rowIndex * styles.bodyTrHeight +
                        (pRowSize * styles.bodyTrHeight - styles.bodyTrHeight);
            }
            if (typeof scrollTop !== 'undefined') {
                scrollTop = UTIL.getScrollPosition(_this.state.scrollLeft, scrollTop, {
                    scrollWidth: styles.scrollContentWidth,
                    scrollHeight: styles.scrollContentHeight,
                    clientWidth: styles.scrollContentContainerWidth,
                    clientHeight: styles.scrollContentContainerHeight,
                }).scrollTop;
            }
            else {
                scrollTop = _this.state.scrollTop;
            }
            return scrollTop;
        };
        var getAvailScrollLeft = function (colIndex) {
            var scrollLeft;
            if (sColIndex >= colIndex) {
                scrollLeft = -headerColGroup[colIndex]._sx;
            }
            else if (eColIndex <= colIndex) {
                scrollLeft =
                    -headerColGroup[colIndex]._ex +
                        (styles.CTInnerWidth -
                            styles.asidePanelWidth -
                            styles.frozenPanelWidth -
                            styles.rightPanelWidth -
                            styles.verticalScrollerWidth);
            }
            if (typeof scrollLeft !== 'undefined') {
                scrollLeft = UTIL.getScrollPosition(scrollLeft, _this.state.scrollTop, {
                    scrollWidth: styles.scrollContentWidth,
                    scrollHeight: styles.scrollContentHeight,
                    clientWidth: styles.scrollContentContainerWidth,
                    clientHeight: styles.scrollContentContainerHeight,
                }).scrollLeft;
            }
            else {
                scrollLeft = _this.state.scrollLeft;
            }
            return scrollLeft;
        };
        var proc = (_a = {},
            _a[constant_1.KEY_CODE.ESC] = function () {
                _this.setState({
                    selectionRows: (_a = {},
                        _a[_this.state.focusedRow] = true,
                        _a),
                    selectionCols: (_b = {},
                        _b[_this.state.focusedCol] = true,
                        _b),
                });
                var _a, _b;
            },
            _a[constant_1.KEY_CODE.RETURN] = function () { },
            _a[constant_1.KEY_CODE.HOME] = function () {
                var focusRow = 0;
                var scrollTop = getAvailScrollTop(focusRow);
                _this.setState({
                    scrollTop: scrollTop,
                    selectionRows: (_a = {},
                        _a[focusRow] = true,
                        _a),
                    focusedRow: focusRow,
                });
                var _a;
            },
            _a[constant_1.KEY_CODE.END] = function () {
                var focusRow = _this.props.store_list.size - 1;
                var scrollTop = getAvailScrollTop(focusRow);
                _this.setState({
                    scrollTop: scrollTop,
                    selectionRows: (_a = {},
                        _a[focusRow] = true,
                        _a),
                    focusedRow: focusRow,
                });
                var _a;
            },
            _a[constant_1.KEY_CODE.PAGE_UP] = function () {
                var focusRow = _this.state.focusedRow - pRowSize < 1
                    ? 0
                    : _this.state.focusedRow - pRowSize;
                var scrollTop = getAvailScrollTop(focusRow);
                _this.setState({
                    scrollTop: scrollTop,
                    selectionRows: (_a = {},
                        _a[focusRow] = true,
                        _a),
                    focusedRow: focusRow,
                });
                var _a;
            },
            _a[constant_1.KEY_CODE.PAGE_DOWN] = function () {
                var focusRow = _this.state.focusedRow + pRowSize >= _this.props.store_list.size
                    ? _this.props.store_list.size - 1
                    : _this.state.focusedRow + pRowSize;
                var scrollTop = getAvailScrollTop(focusRow);
                _this.setState({
                    scrollTop: scrollTop,
                    selectionRows: (_a = {},
                        _a[focusRow] = true,
                        _a),
                    focusedRow: focusRow,
                });
                var _a;
            },
            _a[constant_1.KEY_CODE.UP] = function () {
                var focusRow = _this.state.focusedRow < 1 ? 0 : _this.state.focusedRow - 1;
                var scrollTop = getAvailScrollTop(focusRow);
                _this.setState({
                    scrollTop: scrollTop,
                    selectionRows: (_a = {},
                        _a[focusRow] = true,
                        _a),
                    focusedRow: focusRow,
                });
                var _a;
            },
            _a[constant_1.KEY_CODE.DOWN] = function () {
                var focusRow = _this.state.focusedRow + 1 >= _this.props.store_list.size
                    ? _this.props.store_list.size - 1
                    : _this.state.focusedRow + 1;
                var scrollTop = getAvailScrollTop(focusRow);
                _this.setState({
                    scrollTop: scrollTop,
                    selectionRows: (_a = {},
                        _a[focusRow] = true,
                        _a),
                    focusedRow: focusRow,
                });
                var _a;
            },
            _a[constant_1.KEY_CODE.LEFT] = function () {
                var focusCol = _this.state.focusedCol < 1 ? 0 : _this.state.focusedCol - 1;
                var scrollLeft = getAvailScrollLeft(focusCol);
                _this.setState({
                    scrollLeft: scrollLeft,
                    selectionCols: (_a = {},
                        _a[focusCol] = true,
                        _a),
                    focusedCol: focusCol,
                });
                var _a;
            },
            _a[constant_1.KEY_CODE.RIGHT] = function () {
                var focusCol = _this.state.focusedCol + 1 >= headerColGroup.length
                    ? headerColGroup.length - 1
                    : _this.state.focusedCol + 1;
                var scrollLeft = getAvailScrollLeft(focusCol);
                _this.setState({
                    scrollLeft: scrollLeft,
                    selectionCols: (_a = {},
                        _a[focusCol] = true,
                        _a),
                    focusedCol: focusCol,
                });
                var _a;
            },
            _a);
        if (keyAction in proc)
            proc[keyAction]();
        var _a;
    };
    GridRoot.prototype.onWheel = function (e) {
        var scrollLeft, scrollTop, endScroll;
        var delta = { x: 0, y: 0 };
        // 컬럼필터 활성화 상태라면 구문 실행 안함.
        if (this.state.isColumnFilter !== false)
            return true;
        if (e.detail) {
            delta.y = e.detail * 10;
        }
        else {
            if (typeof e.deltaY === 'undefined') {
                delta.y = -e.wheelDelta;
                delta.x = 0;
            }
            else {
                delta.y = e.deltaY;
                delta.x = e.deltaX;
            }
        }
        (_a = UTIL.getScrollPosition(this.state.scrollLeft - delta.x, this.state.scrollTop - delta.y, {
            scrollWidth: this.state.styles.scrollContentWidth,
            scrollHeight: this.state.styles.scrollContentHeight,
            clientWidth: this.state.styles.scrollContentContainerWidth,
            clientHeight: this.state.styles.scrollContentContainerHeight,
        }), scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop, endScroll = _a.endScroll);
        this.setState({
            scrollLeft: scrollLeft || 0,
            scrollTop: scrollTop || 0,
        });
        if (!endScroll) {
            e.preventDefault();
            e.stopPropagation();
        }
        var _a;
    };
    GridRoot.prototype.onKeyPress = function (e) {
        var _this = this;
        var headerColGroup = this.state.headerColGroup;
        var metaProc = (_a = {},
            _a[constant_1.KEY_CODE.C] = function () {
                e.preventDefault();
                e.stopPropagation();
                var gridClipboard = _this.refs.gridClipboard;
                var copysuccess = false;
                var copiedString = '';
                lodash_1.each(_this.state.selectionRows, function (row, k) {
                    var item = _this.props.store_list.get(k);
                    lodash_1.each(_this.state.selectionCols, function (col, ci) {
                        copiedString += (item[headerColGroup[ci].key] || '') + '\t';
                    });
                    copiedString += '\n';
                });
                gridClipboard.value = copiedString;
                gridClipboard.select();
                try {
                    copysuccess = document.execCommand('copy');
                }
                catch (e) { }
                _this.gridRootNode.focus();
                return copysuccess;
            },
            _a[constant_1.KEY_CODE.A] = function () {
                e.preventDefault();
                e.stopPropagation();
                var state = {
                    dragging: false,
                    selectionRows: {},
                    selectionCols: {},
                    focusedRow: 0,
                    focusedCol: _this.state.focusedCol,
                };
                state.selectionRows = (function () {
                    var rows = {};
                    _this.props.store_list.forEach(function (item, i) {
                        rows[i] = true;
                    });
                    return rows;
                })();
                state.selectionCols = (function () {
                    var cols = {};
                    _this.state.colGroup.forEach(function (col) {
                        cols[col.colIndex] = true;
                    });
                    return cols;
                })();
                state.focusedCol = 0;
                _this.setState(state);
            },
            _a);
        if (e.metaKey) {
            // console.log('meta', e.which);
            if (e.which in metaProc)
                metaProc[e.which]();
        }
        else {
            this.onKeyAction(e.which);
            if (!this.state.isInlineEditing) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        var _a;
    };
    GridRoot.prototype.onClickHeader = function (e, colIndex, key) {
        var _this = this;
        var styles = this.state.styles;
        var options = this.state.options;
        if (e.target.getAttribute('data-filter')) {
            var downEvent_1 = function (ee) {
                if (ee.target &&
                    ee.target.getAttribute &&
                    '' + _this.state.isColumnFilter ===
                        ee.target.getAttribute('data-filter-index')) {
                    return false;
                }
                var downedElement = UTIL.findParentNodeByAttr(ee.target, function (element) {
                    return element
                        ? element.getAttribute('data-column-filter') === 'true'
                        : false;
                });
                if (downedElement === false) {
                    ee.preventDefault();
                    _this.setState({
                        isColumnFilter: false,
                    });
                    document.removeEventListener('mousedown', downEvent_1);
                    document.removeEventListener('mouseleave', downEvent_1);
                    document.removeEventListener('keydown', keyDown_1);
                }
            };
            var keyDown_1 = function (ee) {
                if (ee.which === 27) {
                    downEvent_1(ee);
                }
            };
            if (this.state.isColumnFilter === colIndex) {
                this.setState({
                    isColumnFilter: false,
                });
                document.removeEventListener('mousedown', downEvent_1);
                document.removeEventListener('mouseleave', downEvent_1);
                document.removeEventListener('keydown', keyDown_1);
            }
            else {
                var columnFilterLeft = styles.asidePanelWidth +
                    this.state.colGroup[colIndex]._sx -
                    2 +
                    this.state.scrollLeft;
                this.setState({
                    scrollLeft: columnFilterLeft < 0
                        ? this.state.scrollLeft - columnFilterLeft
                        : this.state.scrollLeft,
                    isColumnFilter: colIndex,
                });
                document.addEventListener('mousedown', downEvent_1);
                document.addEventListener('mouseleave', downEvent_1);
                document.addEventListener('keydown', keyDown_1);
            }
        }
        else {
            var state = {
                dragging: false,
                selectionRows: {},
                selectionCols: {},
                focusedRow: 0,
                focusedCol: this.state.focusedCol,
            };
            if (key === 'lineNumber') {
                state.selectionRows = (function () {
                    var rows = {};
                    _this.props.store_list.forEach(function (item, i) {
                        rows[i] = true;
                    });
                    return rows;
                })();
                state.selectionCols = (function () {
                    var cols = {};
                    _this.state.colGroup.forEach(function (col) {
                        cols[col.colIndex] = true;
                    });
                    return cols;
                })();
                state.focusedCol = 0;
                this.setState(state);
            }
            else {
                if (options.header.clickAction === 'select') {
                    state.selectionRows = (function () {
                        var rows = {};
                        _this.props.store_list.forEach(function (item, i) {
                            rows[i] = true;
                        });
                        return rows;
                    })();
                    if (e.shiftKey) {
                        state.selectionCols = (function () {
                            var cols = {};
                            lodash_1.range(Math.min(_this.state.focusedCol, colIndex), Math.max(_this.state.focusedCol, colIndex) + 1).forEach(function (i) {
                                cols[i] = true;
                            });
                            return cols;
                        })();
                    }
                    else {
                        state.selectionCols = (_a = {},
                            _a[colIndex] = true,
                            _a);
                        state.focusedCol = colIndex;
                    }
                    this.setState(state);
                }
                else if (options.header.clickAction === 'sort' &&
                    options.header.sortable) {
                    this.props.sort(this.state.colGroup, options, colIndex);
                }
            }
        }
        var _a;
    };
    GridRoot.prototype.onChangeColumnFilter = function (colIndex, filterInfo) {
        this.props.filter(this.state.colGroup, this.state.options, colIndex, filterInfo);
    };
    GridRoot.prototype.onDoubleClickCell = function (e, col, li) {
        if (col.editor) {
            this.setState({
                isInlineEditing: true,
                inlineEditingCell: {
                    row: li,
                    col: col.colIndex,
                    editor: col.editor,
                },
            });
        }
    };
    GridRoot.prototype.onTouchStart = function (e) {
        var _this = this;
        e.preventDefault();
        e.stopImmediatePropagation();
        var scrollLeft, scrollTop, endScroll;
        var startMousePosition = UTIL.getMousePosition(e);
        var startScrollLeft = this.state.scrollLeft;
        var startScrollTop = this.state.scrollTop;
        var _a = this.state.styles, scrollContentWidth = _a.scrollContentWidth, scrollContentHeight = _a.scrollContentHeight, scrollContentContainerWidth = _a.scrollContentContainerWidth, scrollContentContainerHeight = _a.scrollContentContainerHeight;
        var onTouchMove = function (ee) {
            ee.preventDefault();
            ee.stopImmediatePropagation();
            var _a = UTIL.getMousePosition(ee), x = _a.x, y = _a.y;
            var delta = { x: 0, y: 0 };
            var dx = startMousePosition.x - x;
            var dy = startMousePosition.y - y;
            // 컬럼필터 활성화 상태라면 구문 실행 안함.
            if (_this.state.isColumnFilter !== false)
                return true;
            if (Math.abs(dx) > 1) {
                delta.x = dx;
            }
            if (Math.abs(dy) > 1) {
                delta.y = dy;
            }
            (_b = UTIL.getScrollPosition(startScrollLeft - delta.x, startScrollTop - delta.y, {
                scrollWidth: scrollContentWidth,
                scrollHeight: scrollContentHeight,
                clientWidth: scrollContentContainerWidth,
                clientHeight: scrollContentContainerHeight,
            }), scrollLeft = _b.scrollLeft, scrollTop = _b.scrollTop, endScroll = _b.endScroll);
            _this.setState({
                scrollLeft: scrollLeft || 0,
                scrollTop: scrollTop || 0,
            });
            var _b;
        };
        var offEvent = function (ee) {
            ee.preventDefault();
            document.removeEventListener('touchmove', onTouchMove, true);
            document.removeEventListener('touchend', offEvent, true);
        };
        e.target.addEventListener('touchmove', onTouchMove, {
            capture: true,
            passive: false,
        });
        e.target.addEventListener('touchend', offEvent, {
            capture: true,
            passive: false,
        });
        /*
        (document.addEventListener as any)('touchcancel', offEvent, {
          cancelable: false,
        });
        */
    };
    GridRoot.prototype.updateEditInput = function (act, row, col, value) {
        var _this = this;
        var proc = {
            cancel: function () {
                _this.setState({
                    isInlineEditing: false,
                    inlineEditingCell: {},
                });
            },
            update: function () {
                _this.props.update(_this.state.colGroup, _this.state.options, row, col, value);
                _this.setState({
                    isInlineEditing: false,
                    inlineEditingCell: {},
                });
            },
        };
        proc[act]();
    };
    GridRoot.prototype.onFireEvent = function (eventName, e) {
        var _this = this;
        var that = {};
        var processor = {
            wheel: function () {
                _this.onWheel(e);
            },
            keydown: function () {
                _this.onKeyPress(e);
            },
            keyup: function () { },
            mousedown: function () { },
            mouseup: function () { },
            click: function () { },
            touchStart: function () {
                _this.onTouchStart(e);
            },
        };
        if (this.props.onBeforeEvent) {
            this.props.onBeforeEvent(e, eventName, that);
        }
        if (eventName in processor) {
            processor[eventName]();
        }
        if (this.props.onAfterEvent) {
            this.props.onAfterEvent(e, eventName, that);
        }
    };
    GridRoot.prototype.render = function () {
        var styles = this.state.styles;
        var options = this.state.options;
        var mounted = this.state.mounted;
        var headerColGroup = this.state.headerColGroup;
        var bodyPanelWidth = styles.CTInnerWidth -
            styles.asidePanelWidth -
            styles.frozenPanelWidth -
            styles.rightPanelWidth;
        var gridRootStyle = lodash_1.assign({ height: this.props.height }, this.props.style);
        var _scrollLeft = Math.abs(this.state.scrollLeft);
        var sColIndex = 0;
        var eColIndex = headerColGroup.length;
        var _headerColGroup = headerColGroup;
        var _bodyRowData = this.state.bodyRowData;
        var _bodyGroupingData = this.state.bodyGroupingData;
        var scrollBarLeft = 0;
        var scrollBarTop = 0;
        var viewSX = _scrollLeft + styles.frozenPanelWidth;
        var viewEX = _scrollLeft + styles.frozenPanelWidth + bodyPanelWidth;
        if (styles.calculatedHeight !== null) {
            gridRootStyle.height = styles.calculatedHeight;
        }
        if (this.state.dragging) {
            // 드래깅 중이므로 내부 요소 text select 금지
            gridRootStyle['userSelect'] = 'none';
        }
        if (mounted) {
            for (var ci = 0, cl = headerColGroup.length; ci < cl; ci++) {
                if (headerColGroup[ci]._sx <= viewSX &&
                    headerColGroup[ci]._ex >= viewSX) {
                    sColIndex = ci;
                }
                if (headerColGroup[ci]._sx <= viewEX &&
                    headerColGroup[ci]._ex >= viewEX) {
                    eColIndex = ci;
                    break;
                }
            }
            _headerColGroup = headerColGroup.slice(sColIndex, eColIndex + 1);
            if (typeof this.data._headerColGroup === 'undefined' ||
                !lodash_1.isEqual(this.data._headerColGroup, _headerColGroup)) {
                this.data.sColIndex = sColIndex;
                this.data.eColIndex = eColIndex;
                this.data._headerColGroup = _headerColGroup;
                _bodyRowData = this.data._bodyRowData = UTIL.getTableByStartEndColumnIndex(this.state.bodyRowData, sColIndex + options.frozenColumnIndex, eColIndex + 1 + options.frozenColumnIndex);
                _bodyGroupingData = this.data._bodyGroupingData = UTIL.getTableByStartEndColumnIndex(this.state.bodyGroupingData, sColIndex + options.frozenColumnIndex, eColIndex + 1 + options.frozenColumnIndex);
            }
            else {
                _bodyRowData = this.data._bodyRowData;
                _bodyGroupingData = this.data._bodyGroupingData;
            }
            scrollBarLeft =
                -this.state.scrollLeft *
                    (styles.horizontalScrollerWidth - styles.horizontalScrollBarWidth) /
                    (styles.scrollContentWidth - styles.scrollContentContainerWidth || 1);
            scrollBarTop =
                -this.state.scrollTop *
                    (styles.verticalScrollerHeight - styles.verticalScrollBarHeight) /
                    (styles.scrollContentHeight - styles.scrollContentContainerHeight || 1);
        }
        return (React.createElement(index_1.GridRootContainer, { ref: "gridRoot", onFireEvent: this.onFireEvent, style: gridRootStyle },
            React.createElement("div", { className: classnames_1.default('axd-clip-board') },
                React.createElement("textarea", { ref: "gridClipboard" })),
            React.createElement(index_1.GridHeader, { getRootBounding: this.getRootBounding, mounted: mounted, optionsHeader: options.header, styles: styles, frozenColumnIndex: options.frozenColumnIndex, colGroup: this.state.colGroup, asideColGroup: this.state.asideColGroup, leftHeaderColGroup: this.state.leftHeaderColGroup, headerColGroup: this.state.headerColGroup, asideHeaderData: this.state.asideHeaderData, leftHeaderData: this.state.leftHeaderData, headerData: this.state.headerData, scrollLeft: this.state.scrollLeft, selectionCols: this.state.selectionCols, focusedCol: this.state.focusedCol, sortInfo: this.props.store_sortInfo, onResizeColumnResizer: this.onResizeColumnResizer, onClickHeader: this.onClickHeader }),
            React.createElement(index_1.GridBody, { mounted: mounted, columnFormatter: this.columnFormatter, options: options, styles: styles, CTInnerWidth: styles.CTInnerWidth, CTInnerHeight: styles.CTInnerHeight, frozenColumnIndex: options.frozenColumnIndex, colGroup: this.state.colGroup, asideColGroup: this.state.asideColGroup, leftHeaderColGroup: this.state.leftHeaderColGroup, headerColGroup: _headerColGroup, bodyTable: this.state.bodyRowTable, asideBodyRowData: this.state.asideBodyRowData, asideBodyGroupingData: this.state.asideBodyGroupingData, leftBodyRowData: this.state.leftBodyRowData, leftBodyGroupingData: this.state.leftBodyGroupingData, bodyRowData: _bodyRowData, bodyGroupingData: _bodyGroupingData, list: this.props.store_list, scrollLeft: this.state.scrollLeft, scrollTop: this.state.scrollTop, selectionRows: this.state.selectionRows, selectionCols: this.state.selectionCols, focusedRow: this.state.focusedRow, focusedCol: this.state.focusedCol, isInlineEditing: this.state.isInlineEditing, inlineEditingCell: this.state.inlineEditingCell, onMouseDownBody: this.onMouseDownBody, onDoubleClickCell: this.onDoubleClickCell, updateEditInput: this.updateEditInput }),
            React.createElement(index_1.GridPage, { mounted: mounted, styles: styles, pageButtonsContainerWidth: styles.pageButtonsContainerWidth, pageButtons: options.page.buttons, pageButtonHeight: options.page.buttonHeight, onClickPageButton: this.onClickPageButton }),
            React.createElement(index_1.GridScroll, { mounted: mounted, bodyHeight: styles.bodyHeight, pageHeight: styles.pageHeight, verticalScrollerWidth: styles.verticalScrollerWidth, verticalScrollerHeight: styles.verticalScrollerHeight, horizontalScrollerWidth: styles.horizontalScrollerWidth, horizontalScrollerHeight: styles.horizontalScrollerHeight, verticalScrollBarHeight: styles.verticalScrollBarHeight, horizontalScrollBarWidth: styles.horizontalScrollBarWidth, scrollerArrowSize: styles.scrollerArrowSize, scrollerPadding: styles.scrollerPadding, scrollBarLeft: scrollBarLeft, scrollBarTop: scrollBarTop, onMouseDownScrollBar: this.onMouseDownScrollBar, onClickScrollTrack: this.onClickScrollTrack, onClickScrollArrow: this.onClickScrollArrow }),
            React.createElement(index_1.GridColumnFilter, { isColumnFilter: this.state.isColumnFilter, filterInfo: this.props.store_filterInfo, colGroup: this.state.colGroup, options: options, frozenColumnIndex: options.frozenColumnIndex, scrollLeft: this.state.scrollLeft, styles: styles, list: this.props.store_receivedList, onChangeColumnFilter: this.onChangeColumnFilter })));
    };
    GridRoot.defaultProps = {
        height: '300px',
        columns: [],
        data: [],
        options: {},
    };
    return GridRoot;
}(React.Component));
exports.GridRoot = GridRoot;
//# sourceMappingURL=GridRoot.js.map