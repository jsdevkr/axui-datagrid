"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var DataGridBodyPanel_1 = require("./DataGridBodyPanel");
var DataGridBodyBottomPanel_1 = require("./DataGridBodyBottomPanel");
var DataGridBodyLoader_1 = require("./DataGridBodyLoader");
var _enums_1 = require("../common/@enums");
var DataGridBody = /** @class */ (function (_super) {
    __extends(DataGridBody, _super);
    function DataGridBody(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        _this.onMouseDownBody = function (e) {
            var _a = _this.props, _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.colGroup, colGroup = _c === void 0 ? [] : _c, _d = _a.headerColGroup, headerColGroup = _d === void 0 ? [] : _d, _e = _a.scrollLeft, scrollLeft = _e === void 0 ? 0 : _e, _f = _a.scrollTop, scrollTop = _f === void 0 ? 0 : _f, _g = _a.focusedRow, focusedRow = _g === void 0 ? 0 : _g, _h = _a.focusedCol, focusedCol = _h === void 0 ? 0 : _h, isInlineEditing = _a.isInlineEditing, _j = _a.inlineEditingCell, inlineEditingCell = _j === void 0 ? {} : _j, _k = _a.styles, styles = _k === void 0 ? {} : _k, setStoreState = _a.setStoreState, dispatch = _a.dispatch, rootNode = _a.rootNode, _l = _a.rootObject, rootObject = _l === void 0 ? {} : _l, loading = _a.loading, loadingData = _a.loadingData;
            if (loading || loadingData) {
                return false;
            }
            var _m = styles.frozenPanelWidth, frozenPanelWidth = _m === void 0 ? 0 : _m, _o = styles.frozenPanelHeight, frozenPanelHeight = _o === void 0 ? 0 : _o, _p = styles.headerHeight, headerHeight = _p === void 0 ? 0 : _p, _q = styles.bodyHeight, bodyHeight = _q === void 0 ? 0 : _q, _r = styles.elWidth, elWidth = _r === void 0 ? 0 : _r, _s = styles.bodyTrHeight, bodyTrHeight = _s === void 0 ? 0 : _s, _t = styles.asidePanelWidth, asidePanelWidth = _t === void 0 ? 0 : _t, _u = styles.scrollContentWidth, scrollContentWidth = _u === void 0 ? 0 : _u, _v = styles.scrollContentHeight, scrollContentHeight = _v === void 0 ? 0 : _v, _w = styles.scrollContentContainerWidth, scrollContentContainerWidth = _w === void 0 ? 0 : _w, _x = styles.scrollContentContainerHeight, scrollContentContainerHeight = _x === void 0 ? 0 : _x;
            var scrollPanelRightMargin = 0; // 필요하면 verticalScrollerWidth 대입
            var startMousePosition = utils_1.getMousePosition(e);
            var spanType = e.target.getAttribute('data-span');
            var _y = rootNode &&
                rootNode.current &&
                rootNode.current.getBoundingClientRect(), _z = _y.x, leftPadding = _z === void 0 ? 0 : _z, _0 = _y.y, topPadding = _0 === void 0 ? 0 : _0;
            var startScrollLeft = scrollLeft;
            var startScrollTop = scrollTop;
            var startX = startMousePosition.x - leftPadding;
            var startY = startMousePosition.y - topPadding;
            var getRowIndex = function (y, _scrollTop) {
                var i = Math.floor((y -
                    headerHeight -
                    (y - headerHeight < frozenPanelHeight ? 0 : _scrollTop)) /
                    bodyTrHeight);
                return i >= data.length ? -1 : i;
            };
            var getColIndex = function (x, _scrollLeft) {
                var p = x -
                    asidePanelWidth -
                    (x - asidePanelWidth < frozenPanelWidth ? 0 : _scrollLeft);
                var cl = colGroup.length;
                var i = -1;
                while (cl--) {
                    var col = colGroup[cl];
                    if (col && (col._sx || 0) <= p && (col._ex || 0) >= p) {
                        i = col.colIndex;
                        break;
                    }
                }
                return i;
            };
            var procBodySelect = function () {
                var _a, _b;
                if (selectStartedCol < 0) {
                    return;
                }
                var onMouseMove = function (ee) {
                    var currMousePosition = utils_1.getMousePosition(ee);
                    // 인터벌 무빙 함수 아래 구문에서 연속 스크롤이 필요하면 사용
                    var setStateCall = function (currState, _moving) {
                        var _a = currState.selectionEndOffset, currSelectionEndOffset = _a === void 0 ? {} : _a, _b = currState.scrollLeft, currScrollLeft = _b === void 0 ? 0 : _b, _c = currState.scrollTop, currScrollTop = _c === void 0 ? 0 : _c;
                        var _d = currSelectionEndOffset.x, selectionEndOffsetX = _d === void 0 ? 0 : _d, _e = currSelectionEndOffset.y, selectionEndOffsetY = _e === void 0 ? 0 : _e;
                        var selectEndedRow = getRowIndex(selectionEndOffsetY, currScrollTop);
                        var selectEndedCol = getColIndex(selectionEndOffsetX, currScrollLeft);
                        // 컬럼인덱스를 찾지 못했다면
                        if (selectEndedCol === -1) {
                            var p = selectionEndOffsetX - asidePanelWidth - scrollLeft;
                            var lastCol = headerColGroup[headerColGroup.length - 1] || {};
                            if (p < 0) {
                                selectEndedCol = 0;
                            }
                            else if (typeof lastCol._ex !== 'undefined' && lastCol._ex <= p) {
                                selectEndedCol = lastCol.colIndex || 0;
                            }
                            else {
                                selectEndedCol = 0;
                            }
                        }
                        var sRow = Math.min(selectStartedRow, selectEndedRow);
                        var eRow = Math.max(selectStartedRow, selectEndedRow);
                        var sCol = Math.min(selectStartedCol, selectEndedCol);
                        var eCol = Math.max(selectStartedCol, selectEndedCol);
                        if (sRow !== -1 && eRow !== -1 && sCol !== -1 && eCol !== -1) {
                            currState.selectionRows = {};
                            currState.selectionCols = {};
                            for (var i = sRow; i < eRow + 1; i++) {
                                currState.selectionRows[i] = true;
                            }
                            for (var i = sCol; i < eCol + 1; i++) {
                                currState.selectionCols[i] = true;
                            }
                        }
                        else {
                            // console.log('get selection fail', sRow, eRow, sCol, eCol);
                        }
                        setStoreState(currState);
                        dispatch(_enums_1.DataGridEnums.DispatchTypes.CHANGE_SELECTION, {
                            sRow: sRow,
                            eRow: eRow,
                            sCol: sCol,
                            eCol: eCol,
                            focusedRow: selectStartedRow,
                            focusedCol: selectStartedCol,
                        });
                    };
                    var scrollMoving = function (_moving) {
                        var _a = _this.props, _b = _a.scrollTop, propsScrollTop = _b === void 0 ? 0 : _b, _c = _a.scrollLeft, propsScrollLeft = _c === void 0 ? 0 : _c, propsSelectionEndOffset = _a.selectionEndOffset;
                        var _scrollTop = propsScrollTop;
                        var _scrollLeft = propsScrollLeft;
                        if (_moving.top) {
                            _scrollTop = propsScrollTop + bodyTrHeight;
                        }
                        else if (_moving.bottom) {
                            _scrollTop = propsScrollTop - bodyTrHeight;
                        }
                        if (_moving.left) {
                            _scrollLeft = propsScrollLeft + 100;
                        }
                        else if (_moving.right) {
                            _scrollLeft = propsScrollLeft - 100;
                        }
                        var _d = utils_1.getScrollPosition(_scrollLeft, _scrollTop, {
                            scrollWidth: scrollContentWidth,
                            scrollHeight: scrollContentHeight,
                            clientWidth: scrollContentContainerWidth,
                            clientHeight: scrollContentContainerHeight,
                        }), newScrollLeft = _d.scrollLeft, newScrollTop = _d.scrollTop, endOfScrollTop = _d.endOfScrollTop, endOfScrollLeft = _d.endOfScrollLeft;
                        setStateCall({
                            scrollTop: newScrollTop,
                            scrollLeft: newScrollLeft,
                            selectionEndOffset: propsSelectionEndOffset,
                        }, _moving);
                        return !endOfScrollTop && !endOfScrollLeft;
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
                    else if (p2X > elWidth - scrollPanelRightMargin) {
                        moving.active = true;
                        moving.right = true;
                    }
                    // moving.active 이면 타임 인터벌 시작
                    if (rootObject.timer) {
                        clearInterval(rootObject.timer);
                    }
                    if (moving.active) {
                        rootObject.timer = setInterval(function () {
                            if (!scrollMoving(moving)) {
                                // clearInterval(this.scrollMovingTimer);
                            }
                        }, 60);
                    }
                    else {
                        setStateCall({
                            scrollTop: scrollTop,
                            scrollLeft: scrollLeft,
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
                    }
                };
                var offEvent = function (ee) {
                    ee.preventDefault();
                    if (rootObject.timer) {
                        clearInterval(rootObject.timer);
                    }
                    setStoreState({
                        selectionStartOffset: undefined,
                        selectionEndOffset: undefined,
                        selectionMinOffset: undefined,
                        selectionMaxOffset: undefined,
                    });
                    document.removeEventListener('mousemove', throttledOnMouseMove);
                    document.removeEventListener('mouseup', offEvent);
                    document.removeEventListener('mouseleave', offEvent);
                };
                var throttledOnMouseMove = utils_1.throttle(onMouseMove, 200);
                if (e.metaKey || (e.shiftKey && focusedRow > -1 && focusedCol > -1)) {
                    if (e.shiftKey) {
                        var state = {
                            dragging: false,
                            selectionRows: {},
                            selectionCols: {},
                        };
                        var sRow = Math.min(focusedRow, selectStartedRow);
                        var sCol = Math.min(focusedCol, selectStartedCol);
                        var eRow = Math.max(focusedRow, selectStartedRow);
                        var eCol = Math.max(focusedCol, selectStartedCol);
                        for (var i = sRow; i < eRow + 1; i++) {
                            state.selectionRows[i] = true;
                        }
                        for (var i = sCol; i < eCol + 1; i++) {
                            state.selectionCols[i] = true;
                        }
                        setStoreState(state);
                        dispatch(_enums_1.DataGridEnums.DispatchTypes.CHANGE_SELECTION, {
                            sRow: sRow,
                            eRow: eRow,
                            sCol: sCol,
                            eCol: eCol,
                            focusedRow: focusedRow,
                            focusedCol: focusedCol,
                        });
                        selectStartedRow = focusedRow;
                        selectStartedCol = focusedCol;
                        document.addEventListener('mousemove', throttledOnMouseMove);
                        document.addEventListener('mouseup', offEvent);
                        document.addEventListener('mouseleave', offEvent);
                    }
                }
                else {
                    // 셀렉션 저장정보 초기화
                    setStoreState({
                        selectionStartOffset: undefined,
                        selectionEndOffset: undefined,
                        selectionMinOffset: undefined,
                        selectionMaxOffset: undefined,
                        selectionRows: (_a = {}, _a[selectStartedRow] = true, _a),
                        selectionCols: (_b = {}, _b[selectStartedCol] = true, _b),
                        focusedRow: selectStartedRow,
                        focusedCol: selectStartedCol,
                    });
                    dispatch(_enums_1.DataGridEnums.DispatchTypes.CHANGE_SELECTION, {
                        sRow: selectStartedRow,
                        eRow: selectStartedRow,
                        sCol: selectStartedCol,
                        eCol: selectStartedCol,
                        focusedRow: selectStartedRow,
                        focusedCol: selectStartedCol,
                    });
                    document.addEventListener('mousemove', throttledOnMouseMove);
                    document.addEventListener('mouseup', offEvent);
                    document.addEventListener('mouseleave', offEvent);
                }
            };
            var procClickLineNumber = function () {
                var _a;
                var state = {
                    dragging: false,
                    selectionRows: {},
                    selectionCols: (function () {
                        var cols = {};
                        colGroup.forEach(function (col) {
                            cols[col.colIndex || 0] = true;
                        });
                        return cols;
                    })(),
                    focusedRow: focusedRow,
                    focusedCol: 0,
                };
                if (e.shiftKey) {
                    state.selectionRows = (function () {
                        var rows = {};
                        utils_1.arrayFromRange(Math.min(focusedRow, selectStartedRow), Math.max(focusedRow, selectStartedRow) + 1).forEach(function (i) {
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
                setStoreState(state);
            };
            var procClickRowSelector = function () {
                dispatch(_enums_1.DataGridEnums.DispatchTypes.SELECT, {
                    rowIndex: selectStartedRow,
                });
            };
            var procBodyClick = function () {
                var _a, _b;
                if (selectStartedCol < 0) {
                    return;
                }
                // 셀렉션 저장정보 초기화
                setStoreState({
                    selectionStartOffset: undefined,
                    selectionEndOffset: undefined,
                    selectionMinOffset: undefined,
                    selectionMaxOffset: undefined,
                    selectionRows: (_a = {}, _a[selectStartedRow] = true, _a),
                    selectionCols: (_b = {}, _b[selectStartedCol] = true, _b),
                    focusedRow: selectStartedRow,
                    focusedCol: selectStartedCol,
                });
            };
            // 선택이 시작된 row / col
            var selectStartedRow = getRowIndex(startY, startScrollTop);
            // row값이 없다면 선택 안되야 함.
            var selectStartedCol = selectStartedRow === -1 ? -1 : getColIndex(startX, startScrollLeft);
            if (isInlineEditing &&
                inlineEditingCell.rowIndex === selectStartedRow &&
                inlineEditingCell.colIndex === selectStartedCol) {
                // 선택된 셀이 에디팅중인 셀이라면 함수 실행 중지
                return false;
            }
            // only first mouse button
            if (e.button === 0) {
                switch (spanType) {
                    case 'lineNumber':
                        procClickLineNumber();
                        break;
                    case 'rowSelector':
                        procClickRowSelector();
                        break;
                    default:
                        procBodySelect();
                        break;
                }
            }
            else {
                procBodyClick();
            }
            return true;
        };
        _this.onWheel = function (e) {
            var _a = _this.props, _b = _a.scrollLeft, scrollLeft = _b === void 0 ? 0 : _b, _c = _a.scrollTop, scrollTop = _c === void 0 ? 0 : _c, _d = _a.styles, styles = _d === void 0 ? {} : _d, setStoreState = _a.setStoreState;
            var _e = styles.scrollContentWidth, scrollContentWidth = _e === void 0 ? 0 : _e, _f = styles.scrollContentContainerWidth, scrollContentContainerWidth = _f === void 0 ? 0 : _f, _g = styles.scrollContentHeight, scrollContentHeight = _g === void 0 ? 0 : _g, _h = styles.scrollContentContainerHeight, scrollContentContainerHeight = _h === void 0 ? 0 : _h;
            var delta = { x: 0, y: 0 };
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
            var _j = utils_1.getScrollPosition(scrollLeft - delta.x, scrollTop - delta.y, {
                scrollWidth: scrollContentWidth,
                scrollHeight: scrollContentHeight,
                clientWidth: scrollContentContainerWidth,
                clientHeight: scrollContentContainerHeight,
            }), _k = _j.scrollLeft, currScrollLeft = _k === void 0 ? 0 : _k, _l = _j.scrollTop, currScrollTop = _l === void 0 ? 0 : _l, endOfScrollTop = _j.endOfScrollTop;
            if (scrollContentContainerHeight < scrollContentHeight && !endOfScrollTop) {
                e.preventDefault();
            }
            setStoreState({
                scrollLeft: currScrollLeft,
                scrollTop: currScrollTop,
            });
            return;
        };
        _this.bodyRef = React.createRef();
        return _this;
    }
    DataGridBody.prototype.shouldComponentUpdate = function (pProps) {
        var _a = this.props, _b = _a.scrollLeft, scrollLeft = _b === void 0 ? 0 : _b, _c = _a.scrollTop, scrollTop = _c === void 0 ? 0 : _c, _d = _a.options, _e = _d === void 0 ? {} : _d, _f = _e.frozenRowIndex, frozenRowIndex = _f === void 0 ? 0 : _f, _g = _e.bodyLoaderHeight, bodyLoaderHeight = _g === void 0 ? 0 : _g, _h = _a.styles, _j = _h === void 0 ? {} : _h, _k = _j.elWidth, elWidth = _k === void 0 ? 0 : _k, _l = _j.bodyHeight, bodyHeight = _l === void 0 ? 0 : _l, _m = _j.bodyTrHeight, bodyTrHeight = _m === void 0 ? 1 : _m, _o = _j.asidePanelWidth, asidePanelWidth = _o === void 0 ? 0 : _o, _p = _j.frozenPanelWidth, frozenPanelWidth = _p === void 0 ? 0 : _p, _q = _j.frozenPanelHeight, frozenPanelHeight = _q === void 0 ? 0 : _q, _r = _j.rightPanelWidth, rightPanelWidth = _r === void 0 ? 0 : _r, _s = _j.footSumHeight, footSumHeight = _s === void 0 ? 0 : _s, _t = _a.loadingData, loadingData = _t === void 0 ? false : _t, _u = _a.data, data = _u === void 0 ? [] : _u, _v = _a.colGroup, colGroup = _v === void 0 ? [] : _v;
        var _w = pProps.scrollLeft, _scrollLeft = _w === void 0 ? 0 : _w, _x = pProps.scrollTop, _scrollTop = _x === void 0 ? 0 : _x, _y = pProps.options, _z = _y === void 0 ? {} : _y, _0 = _z.frozenRowIndex, _frozenRowIndex = _0 === void 0 ? 0 : _0, _1 = _z.bodyLoaderHeight, _bodyLoaderHeight = _1 === void 0 ? 0 : _1, _2 = pProps.styles, _3 = _2 === void 0 ? {} : _2, _4 = _3.elWidth, _elWidth = _4 === void 0 ? 0 : _4, _5 = _3.bodyHeight, _bodyHeight = _5 === void 0 ? 0 : _5, _6 = _3.bodyTrHeight, _bodyTrHeight = _6 === void 0 ? 1 : _6, _7 = _3.asidePanelWidth, _asidePanelWidth = _7 === void 0 ? 0 : _7, _8 = _3.frozenPanelWidth, _frozenPanelWidth = _8 === void 0 ? 0 : _8, _9 = _3.frozenPanelHeight, _frozenPanelHeight = _9 === void 0 ? 0 : _9, _10 = _3.rightPanelWidth, _rightPanelWidth = _10 === void 0 ? 0 : _10, _11 = _3.footSumHeight, _footSumHeight = _11 === void 0 ? 0 : _11, _12 = pProps.loadingData, _loadingData = _12 === void 0 ? false : _12, _13 = pProps.data, _data = _13 === void 0 ? [] : _13, _14 = pProps.colGroup, _colGroup = _14 === void 0 ? [] : _14;
        if (data !== _data || colGroup !== _colGroup) {
            return true;
        }
        if (scrollTop !== _scrollTop || scrollLeft !== _scrollLeft) {
            return true;
        }
        if (frozenRowIndex !== _frozenRowIndex ||
            bodyLoaderHeight !== _bodyLoaderHeight ||
            elWidth !== _elWidth ||
            bodyHeight !== _bodyHeight ||
            bodyTrHeight !== _bodyTrHeight ||
            asidePanelWidth !== _asidePanelWidth ||
            frozenPanelWidth !== _frozenPanelWidth ||
            frozenPanelHeight !== _frozenPanelHeight ||
            rightPanelWidth !== _rightPanelWidth ||
            footSumHeight !== _footSumHeight ||
            loadingData !== _loadingData) {
            return true;
        }
        return false;
    };
    DataGridBody.prototype.componentDidMount = function () {
        if (this.bodyRef.current) {
            this.bodyRef.current.addEventListener('wheel', this.onWheel, {
                passive: false,
            });
        }
    };
    DataGridBody.prototype.componentWillUnmount = function () {
        if (this.bodyRef.current) {
            this.bodyRef.current.removeEventListener('wheel', this.onWheel);
        }
    };
    DataGridBody.prototype.render = function () {
        var _a = this.props, _b = _a.scrollLeft, scrollLeft = _b === void 0 ? 0 : _b, _c = _a.scrollTop, scrollTop = _c === void 0 ? 0 : _c, _d = _a.options, _e = _d === void 0 ? {} : _d, _f = _e.frozenRowIndex, frozenRowIndex = _f === void 0 ? 0 : _f, _g = _e.bodyLoaderHeight, bodyLoaderHeight = _g === void 0 ? 0 : _g, _h = _a.styles, _j = _h === void 0 ? {} : _h, _k = _j.elWidth, elWidth = _k === void 0 ? 0 : _k, _l = _j.bodyHeight, bodyHeight = _l === void 0 ? 0 : _l, _m = _j.bodyTrHeight, bodyTrHeight = _m === void 0 ? 1 : _m, _o = _j.asidePanelWidth, asidePanelWidth = _o === void 0 ? 0 : _o, _p = _j.frozenPanelWidth, frozenPanelWidth = _p === void 0 ? 0 : _p, _q = _j.frozenPanelHeight, frozenPanelHeight = _q === void 0 ? 0 : _q, _r = _j.rightPanelWidth, rightPanelWidth = _r === void 0 ? 0 : _r, _s = _j.footSumHeight, footSumHeight = _s === void 0 ? 0 : _s, _t = _a.loadingData, loadingData = _t === void 0 ? false : _t;
        var sRowIndex = Math.floor(-scrollTop / (bodyTrHeight || 1)) + frozenRowIndex;
        var loadingDataHeight = loadingData ? bodyLoaderHeight : 0;
        var scrollPanelRightMargin = 0; // 필요하면 verticalScrollerWidth 대입
        var topBodyScrollConfig = {
            frozenRowIndex: 0,
            sRowIndex: 0,
            eRowIndex: frozenRowIndex - 1,
        };
        var bodyScrollConfig = {
            frozenRowIndex: frozenRowIndex,
            sRowIndex: sRowIndex,
            eRowIndex: sRowIndex + Math.ceil(bodyHeight / (bodyTrHeight || 1)) + 1,
        };
        var topAsideBodyPanelStyle = {
            left: 0,
            width: asidePanelWidth,
            top: 0,
            height: frozenPanelHeight,
        };
        var topLeftBodyPanelStyle = {
            left: asidePanelWidth,
            width: frozenPanelWidth,
            top: 0,
            height: frozenPanelHeight,
        };
        var topBodyPanelStyle = {
            left: frozenPanelWidth + asidePanelWidth,
            width: elWidth -
                asidePanelWidth -
                frozenPanelWidth -
                rightPanelWidth -
                scrollPanelRightMargin,
            top: 0,
            height: frozenPanelHeight,
        };
        var asideBodyPanelStyle = {
            left: 0,
            width: asidePanelWidth,
            top: frozenPanelHeight - loadingDataHeight,
            height: bodyHeight - frozenPanelHeight - footSumHeight,
        };
        var leftBodyPanelStyle = {
            left: asidePanelWidth,
            width: frozenPanelWidth,
            top: frozenPanelHeight - loadingDataHeight,
            height: bodyHeight - frozenPanelHeight - footSumHeight,
        };
        var bodyPanelStyle = {
            left: frozenPanelWidth + asidePanelWidth,
            width: elWidth -
                asidePanelWidth -
                frozenPanelWidth -
                rightPanelWidth -
                scrollPanelRightMargin,
            top: frozenPanelHeight - loadingDataHeight,
            height: bodyHeight - frozenPanelHeight - footSumHeight,
        };
        var bottomAsideBodyPanelStyle = {
            left: 0,
            width: asidePanelWidth,
            top: bodyHeight - footSumHeight - 1,
            height: footSumHeight,
        };
        var bottomLeftBodyPanelStyle = {
            left: asidePanelWidth,
            width: frozenPanelWidth,
            top: bodyHeight - footSumHeight - 1,
            height: footSumHeight,
        };
        var bottomBodyPanelStyle = {
            left: frozenPanelWidth + asidePanelWidth,
            width: elWidth -
                asidePanelWidth -
                frozenPanelWidth -
                rightPanelWidth -
                scrollPanelRightMargin,
            top: bodyHeight - footSumHeight - 1,
            height: footSumHeight,
        };
        return (React.createElement("div", { ref: this.bodyRef, className: 'axui-datagrid-body', style: { height: bodyHeight, touchAction: 'none' }, onMouseDown: this.onMouseDownBody },
            asidePanelWidth !== 0 && frozenPanelHeight !== 0 && (React.createElement(DataGridBodyPanel_1.default, { panelName: _enums_1.DataGridEnums.PanelNames.TOP_ASIDE_BODY_SCROLL, containerStyle: topAsideBodyPanelStyle, panelScrollConfig: topBodyScrollConfig })),
            frozenPanelWidth !== 0 && frozenPanelHeight !== 0 && (React.createElement(DataGridBodyPanel_1.default, { panelName: _enums_1.DataGridEnums.PanelNames.TOP_LEFT_BODY_SCROLL, containerStyle: topLeftBodyPanelStyle, panelScrollConfig: topBodyScrollConfig })),
            frozenPanelHeight !== 0 && (React.createElement(DataGridBodyPanel_1.default, { panelName: _enums_1.DataGridEnums.PanelNames.TOP_BODY_SCROLL, containerStyle: topBodyPanelStyle, panelScrollConfig: topBodyScrollConfig, panelLeft: scrollLeft })),
            asidePanelWidth !== 0 && (React.createElement(DataGridBodyPanel_1.default, { panelName: _enums_1.DataGridEnums.PanelNames.ASIDE_BODY_SCROLL, containerStyle: asideBodyPanelStyle, panelScrollConfig: bodyScrollConfig, panelTop: scrollTop })),
            frozenPanelWidth !== 0 && (React.createElement(DataGridBodyPanel_1.default, { panelName: _enums_1.DataGridEnums.PanelNames.LEFT_BODY_SCROLL, containerStyle: leftBodyPanelStyle, panelScrollConfig: bodyScrollConfig, panelTop: scrollTop })),
            React.createElement(DataGridBodyPanel_1.default, { panelName: _enums_1.DataGridEnums.PanelNames.BODY_SCROLL, containerStyle: bodyPanelStyle, panelScrollConfig: bodyScrollConfig, panelLeft: scrollLeft, panelTop: scrollTop }),
            footSumHeight !== 0 && asidePanelWidth !== 0 && (React.createElement(DataGridBodyBottomPanel_1.default, { panelName: _enums_1.DataGridEnums.PanelNames.BOTTOM_ASIDE_BODY_SCROLL, containerStyle: bottomAsideBodyPanelStyle })),
            footSumHeight !== 0 && frozenPanelHeight !== 0 && (React.createElement(DataGridBodyBottomPanel_1.default, { panelName: _enums_1.DataGridEnums.PanelNames.BOTTOM_LEFT_BODY_SCROLL, containerStyle: bottomLeftBodyPanelStyle })),
            footSumHeight !== 0 && (React.createElement(DataGridBodyBottomPanel_1.default, { panelName: _enums_1.DataGridEnums.PanelNames.BOTTOM_BODY_SCROLL, containerStyle: bottomBodyPanelStyle, panelLeft: scrollLeft })),
            React.createElement(DataGridBodyLoader_1.default, { loadingData: loadingData, bodyLoaderHeight: bodyLoaderHeight })));
    };
    return DataGridBody;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridBody);
