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
var stores_1 = require("../stores");
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var DataGridEvents = /** @class */ (function (_super) {
    __extends(DataGridEvents, _super);
    function DataGridEvents() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.onWheel = function (e) {
            var _a = _this.props, _b = _a.scrollLeft, scrollLeft = _b === void 0 ? 0 : _b, _c = _a.scrollTop, scrollTop = _c === void 0 ? 0 : _c, _d = _a.styles, styles = _d === void 0 ? {} : _d, setStoreState = _a.setStoreState, _e = _a.isColumnFilter, isColumnFilter = _e === void 0 ? false : _e;
            var _f = styles.scrollContentWidth, scrollContentWidth = _f === void 0 ? 0 : _f, _g = styles.scrollContentContainerWidth, scrollContentContainerWidth = _g === void 0 ? 0 : _g, _h = styles.scrollContentHeight, scrollContentHeight = _h === void 0 ? 0 : _h, _j = styles.scrollContentContainerHeight, scrollContentContainerHeight = _j === void 0 ? 0 : _j;
            var delta = { x: 0, y: 0 };
            // 컬럼필터 활성화 상태라면 구문 실행 안함.
            if (isColumnFilter) {
                return true;
            }
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
            var _k = utils_1.getScrollPosition(scrollLeft - delta.x, scrollTop - delta.y, {
                scrollWidth: scrollContentWidth,
                scrollHeight: scrollContentHeight,
                clientWidth: scrollContentContainerWidth,
                clientHeight: scrollContentContainerHeight,
            }), _l = _k.scrollLeft, currScrollLeft = _l === void 0 ? 0 : _l, _m = _k.scrollTop, currScrollTop = _m === void 0 ? 0 : _m;
            setStoreState({
                scrollLeft: currScrollLeft,
                scrollTop: currScrollTop,
            });
            e.preventDefault();
            e.stopPropagation();
            /* 휠 이벤트에서 이벤트 중지 예외처리 사용안함.
            if (!endScroll) {
        
            }
            */
            return true;
        };
        _this.onKeyUp = function (e) {
            var _a;
            var _b = _this.props, _c = _b.colGroup, colGroup = _c === void 0 ? [] : _c, _d = _b.focusedRow, focusedRow = _d === void 0 ? 0 : _d, _e = _b.focusedCol, focusedCol = _e === void 0 ? 0 : _e, setStoreState = _b.setStoreState, isInlineEditing = _b.isInlineEditing;
            var proc = (_a = {},
                _a[stores_1.KeyCodes.ENTER] = function () {
                    var col = colGroup[focusedCol];
                    if (col.editor) {
                        setStoreState({
                            isInlineEditing: true,
                            inlineEditingCell: {
                                rowIndex: focusedRow,
                                colIndex: col.colIndex,
                                editor: col.editor,
                            },
                        });
                    }
                },
                _a);
            if (!isInlineEditing && e.which in proc) {
                proc[e.which]();
            }
        };
        _this.onKeyDown = function (e) {
            var _a, _b;
            var _c = _this.props, _d = _c.filteredList, filteredList = _d === void 0 ? [] : _d, getRootNode = _c.getRootNode, getClipBoardNode = _c.getClipBoardNode, _e = _c.colGroup, colGroup = _e === void 0 ? [] : _e, _f = _c.headerColGroup, headerColGroup = _f === void 0 ? [] : _f, _g = _c.selectionRows, selectionRows = _g === void 0 ? {} : _g, _h = _c.selectionCols, selectionCols = _h === void 0 ? {} : _h, _j = _c.focusedCol, focusedCol = _j === void 0 ? 0 : _j, setStoreState = _c.setStoreState, _k = _c.scrollLeft, scrollLeft = _k === void 0 ? 0 : _k, _l = _c.scrollTop, scrollTop = _l === void 0 ? 0 : _l, _m = _c.focusedRow, focusedRow = _m === void 0 ? 0 : _m, _o = _c.options, options = _o === void 0 ? {} : _o, _p = _c.styles, styles = _p === void 0 ? {} : _p;
            var _q = _this.props, _r = _q.printStartColIndex, printStartColIndex = _r === void 0 ? 0 : _r, _s = _q.printEndColIndex, printEndColIndex = _s === void 0 ? colGroup.length : _s;
            var _t = options.frozenRowIndex, frozenRowIndex = _t === void 0 ? 0 : _t, _u = options.frozenColumnIndex, frozenColumnIndex = _u === void 0 ? 0 : _u;
            var _v = styles.bodyTrHeight, bodyTrHeight = _v === void 0 ? 0 : _v, _w = styles.bodyHeight, bodyHeight = _w === void 0 ? 0 : _w, _x = styles.scrollContentWidth, scrollContentWidth = _x === void 0 ? 0 : _x, _y = styles.scrollContentHeight, scrollContentHeight = _y === void 0 ? 0 : _y, _z = styles.scrollContentContainerWidth, scrollContentContainerWidth = _z === void 0 ? 0 : _z, _0 = styles.scrollContentContainerHeight, scrollContentContainerHeight = _0 === void 0 ? 0 : _0, _1 = styles.frozenPanelWidth, frozenPanelWidth = _1 === void 0 ? 0 : _1, _2 = styles.rightPanelWidth, rightPanelWidth = _2 === void 0 ? 0 : _2, _3 = styles.verticalScrollerWidth, verticalScrollerWidth = _3 === void 0 ? 0 : _3;
            var rootNode = utils_1.getNode(getRootNode);
            var clipBoardNode = utils_1.getNode(getClipBoardNode);
            var sRowIndex = Math.floor(-scrollTop / bodyTrHeight) + frozenRowIndex;
            var eRowIndex = Math.floor(-scrollTop / bodyTrHeight) +
                // frozenRowIndex +
                Math.floor(bodyHeight / bodyTrHeight);
            var sColIndex = printStartColIndex;
            var eColIndex = printEndColIndex;
            var pRowSize = Math.floor(bodyHeight / bodyTrHeight);
            var getAvailScrollTop = function (rowIndex) {
                var _scrollTop = undefined;
                if (frozenRowIndex >= rowIndex) {
                    return;
                }
                if (sRowIndex >= rowIndex) {
                    _scrollTop = -(rowIndex - frozenRowIndex) * bodyTrHeight;
                }
                else if (eRowIndex <= rowIndex) {
                    _scrollTop =
                        -rowIndex * bodyTrHeight + (pRowSize * bodyTrHeight - bodyTrHeight);
                }
                if (typeof _scrollTop !== 'undefined') {
                    _scrollTop = utils_1.getScrollPosition(scrollLeft, _scrollTop, {
                        scrollWidth: scrollContentWidth,
                        scrollHeight: scrollContentHeight,
                        clientWidth: scrollContentContainerWidth,
                        clientHeight: scrollContentContainerHeight,
                    }).scrollTop;
                }
                else {
                    _scrollTop = scrollTop;
                }
                return _scrollTop;
            };
            var getAvailScrollLeft = function (colIndex) {
                var _scrollLeft = undefined;
                if (frozenColumnIndex > colIndex) {
                    return;
                }
                if (sColIndex >= colIndex - frozenColumnIndex) {
                    _scrollLeft = -colGroup[colIndex]._sx + frozenPanelWidth;
                }
                else if (eColIndex <= colIndex - frozenColumnIndex) {
                    // 끝점 계산
                    _scrollLeft =
                        scrollContentContainerWidth -
                            colGroup[colIndex]._ex +
                            frozenPanelWidth -
                            verticalScrollerWidth -
                            rightPanelWidth;
                }
                if (typeof _scrollLeft !== 'undefined') {
                    _scrollLeft = utils_1.getScrollPosition(_scrollLeft, scrollTop, {
                        scrollWidth: scrollContentWidth,
                        scrollHeight: scrollContentHeight,
                        clientWidth: scrollContentContainerWidth,
                        clientHeight: scrollContentContainerHeight,
                    }).scrollLeft;
                }
                else {
                    _scrollLeft = scrollLeft;
                }
                return _scrollLeft;
            };
            var metaProc = (_a = {},
                _a[stores_1.KeyCodes.C] = function () {
                    e.preventDefault();
                    e.stopPropagation();
                    var copySuccess = false;
                    var copiedString = '';
                    for (var rk in selectionRows) {
                        if (selectionRows[rk]) {
                            var item = filteredList[rk];
                            for (var ck in selectionCols) {
                                if (selectionCols[ck]) {
                                    copiedString += (item[headerColGroup[ck].key] || '') + '\t';
                                }
                            }
                            copiedString += '\n';
                        }
                    }
                    if (clipBoardNode) {
                        clipBoardNode.value = copiedString;
                        clipBoardNode.select();
                    }
                    try {
                        copySuccess = document.execCommand('copy');
                    }
                    catch (e) { }
                    rootNode && rootNode.focus();
                    return copySuccess;
                },
                _a[stores_1.KeyCodes.A] = function () {
                    e.preventDefault();
                    e.stopPropagation();
                    var state = {
                        dragging: false,
                        selectionRows: {},
                        selectionCols: {},
                        focusedRow: 0,
                        focusedCol: focusedCol,
                    };
                    state.selectionRows = (function () {
                        var rows = {};
                        filteredList.forEach(function (item, i) {
                            rows[i] = true;
                        });
                        return rows;
                    })();
                    state.selectionCols = (function () {
                        var cols = {};
                        colGroup.forEach(function (col) {
                            cols[col.colIndex || 0] = true;
                        });
                        return cols;
                    })();
                    state.focusedCol = 0;
                    setStoreState(state);
                },
                _a);
            var proc = (_b = {},
                _b[stores_1.KeyCodes.ESC] = function () {
                    var _a, _b;
                    setStoreState({
                        selectionRows: (_a = {},
                            _a[focusedRow] = true,
                            _a),
                        selectionCols: (_b = {},
                            _b[focusedCol] = true,
                            _b),
                    });
                },
                _b[stores_1.KeyCodes.HOME] = function () {
                    var _a;
                    e.preventDefault();
                    e.stopPropagation();
                    var focusRow = 0;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: (_a = {},
                            _a[focusRow] = true,
                            _a),
                        focusedRow: focusRow,
                    });
                },
                _b[stores_1.KeyCodes.END] = function () {
                    var _a;
                    e.preventDefault();
                    e.stopPropagation();
                    var focusRow = filteredList.length - 1;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: (_a = {},
                            _a[focusRow] = true,
                            _a),
                        focusedRow: focusRow,
                    });
                },
                _b[stores_1.KeyCodes.PAGE_UP] = function () {
                    var _a;
                    e.preventDefault();
                    e.stopPropagation();
                    var focusRow = focusedRow - pRowSize < 1 ? 0 : focusedRow - pRowSize;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: (_a = {},
                            _a[focusRow] = true,
                            _a),
                        focusedRow: focusRow,
                    });
                },
                _b[stores_1.KeyCodes.PAGE_DOWN] = function () {
                    var _a;
                    e.preventDefault();
                    e.stopPropagation();
                    var focusRow = focusedRow + pRowSize >= filteredList.length
                        ? filteredList.length - 1
                        : focusedRow + pRowSize;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: (_a = {},
                            _a[focusRow] = true,
                            _a),
                        focusedRow: focusRow,
                    });
                },
                _b[stores_1.KeyCodes.UP_ARROW] = function () {
                    var _a;
                    e.preventDefault();
                    e.stopPropagation();
                    var focusRow = focusedRow < 1 ? 0 : focusedRow - 1;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: (_a = {},
                            _a[focusRow] = true,
                            _a),
                        focusedRow: focusRow,
                    });
                },
                _b[stores_1.KeyCodes.DOWN_ARROW] = function () {
                    var _a;
                    e.preventDefault();
                    e.stopPropagation();
                    var focusRow = focusedRow + 1 >= filteredList.length
                        ? filteredList.length - 1
                        : focusedRow + 1;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: (_a = {},
                            _a[focusRow] = true,
                            _a),
                        focusedRow: focusRow,
                    });
                },
                _b[stores_1.KeyCodes.LEFT_ARROW] = function () {
                    var _a;
                    e.preventDefault();
                    e.stopPropagation();
                    var focusCol = focusedCol < 1 ? 0 : focusedCol - 1;
                    setStoreState({
                        scrollLeft: getAvailScrollLeft(focusCol),
                        selectionCols: (_a = {},
                            _a[focusCol] = true,
                            _a),
                        focusedCol: focusCol,
                    });
                },
                _b[stores_1.KeyCodes.RIGHT_ARROW] = function () {
                    var _a;
                    e.preventDefault();
                    e.stopPropagation();
                    var focusCol = focusedCol + 1 >= colGroup.length
                        ? colGroup.length - 1
                        : focusedCol + 1;
                    setStoreState({
                        scrollLeft: getAvailScrollLeft(focusCol),
                        selectionCols: (_a = {},
                            _a[focusCol] = true,
                            _a),
                        focusedCol: focusCol,
                    });
                },
                _b);
            if (e.metaKey) {
                if (e.which in metaProc) {
                    metaProc[e.which]();
                }
            }
            else {
                proc[e.which] && proc[e.which]();
            }
        };
        _this.onFireEvent = function (e, eventName) {
            var _a;
            var _b = _this.props, loading = _b.loading, loadingData = _b.loadingData, _c = _b.isInlineEditing, isInlineEditing = _c === void 0 ? false : _c;
            var proc = (_a = {},
                _a[stores_1.EventNames.WHEEL] = function () {
                    if (!loadingData) {
                        _this.onWheel(e);
                    }
                    else {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                },
                _a[stores_1.EventNames.KEYDOWN] = function () {
                    if (!loadingData && !isInlineEditing) {
                        _this.onKeyDown(e);
                    }
                },
                _a[stores_1.EventNames.KEYUP] = function () {
                    if (!loadingData && !isInlineEditing) {
                        _this.onKeyUp(e);
                    }
                },
                _a[stores_1.EventNames.MOUSEDOWN] = function () { },
                _a[stores_1.EventNames.MOUSEUP] = function () { },
                _a[stores_1.EventNames.CLICK] = function () { },
                _a);
            if (eventName in proc && !loading) {
                if (_this.props.onBeforeEvent && !loadingData) {
                    _this.props.onBeforeEvent(e, eventName);
                }
                proc[eventName]();
                if (_this.props.onAfterEvent && !loadingData) {
                    _this.props.onAfterEvent(e, eventName);
                }
            }
        };
        return _this;
    }
    DataGridEvents.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "axui-datagrid", tabIndex: -1, style: this.props.style, onWheel: function (e) {
                _this.onFireEvent(e, stores_1.EventNames.WHEEL);
            }, onKeyDown: function (e) {
                _this.onFireEvent(e, stores_1.EventNames.KEYDOWN);
            }, onKeyUp: function (e) {
                _this.onFireEvent(e, stores_1.EventNames.KEYUP);
            }, onMouseDown: function (e) {
                _this.onFireEvent(e, stores_1.EventNames.MOUSEDOWN);
            }, onMouseUp: function (e) {
                _this.onFireEvent(e, stores_1.EventNames.MOUSEUP);
            }, onClick: function (e) {
                _this.onFireEvent(e, stores_1.EventNames.CLICK);
            }, onTouchStartCapture: function (e) {
                // this.onFireEvent(e, EventNames.TOUCHSTART);
            } }, this.props.children));
    };
    return DataGridEvents;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridEvents);
//# sourceMappingURL=DataGridEvents.js.map