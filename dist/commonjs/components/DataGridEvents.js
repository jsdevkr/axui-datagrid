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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var _enums_1 = require("../common/@enums");
var DataGridEvents = /** @class */ (function (_super) {
    __extends(DataGridEvents, _super);
    function DataGridEvents() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.busy = false;
        _this.state = {};
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
            setStoreState({
                scrollLeft: currScrollLeft,
                scrollTop: currScrollTop,
            });
            if (scrollContentContainerHeight < scrollContentHeight && !endOfScrollTop) {
                e.preventDefault();
                // e.stopPropagation();
            }
            return true;
        };
        _this.onKeyUp = function (e) {
            var _a = _this.props, _b = _a.colGroup, colGroup = _b === void 0 ? [] : _b, _c = _a.focusedRow, focusedRow = _c === void 0 ? 0 : _c, _d = _a.focusedCol, focusedCol = _d === void 0 ? 0 : _d, setStoreState = _a.setStoreState;
            switch (e.which) {
                case _enums_1.DataGridEnums.KeyCodes.ENTER:
                    var col = colGroup[focusedCol];
                    if (!col.editor) {
                        return;
                    }
                    setStoreState({
                        isInlineEditing: true,
                        inlineEditingCell: {
                            rowIndex: focusedRow,
                            colIndex: col.colIndex,
                            editor: col.editor,
                        },
                    });
                    return;
                default:
                    return;
            }
        };
        _this.onKeyDown = function (e) {
            var _a = _this.props, _b = _a.data, data = _b === void 0 ? [] : _b, rootNode = _a.rootNode, clipBoardNode = _a.clipBoardNode, _c = _a.colGroup, colGroup = _c === void 0 ? [] : _c, _d = _a.headerColGroup, headerColGroup = _d === void 0 ? [] : _d, _e = _a.selectionRows, selectionRows = _e === void 0 ? {} : _e, _f = _a.selectionCols, selectionCols = _f === void 0 ? {} : _f, _g = _a.focusedCol, focusedCol = _g === void 0 ? 0 : _g, setStoreState = _a.setStoreState, _h = _a.scrollLeft, scrollLeft = _h === void 0 ? 0 : _h, _j = _a.scrollTop, scrollTop = _j === void 0 ? 0 : _j, _k = _a.focusedRow, focusedRow = _k === void 0 ? 0 : _k, _l = _a.options, options = _l === void 0 ? {} : _l, _m = _a.styles, styles = _m === void 0 ? {} : _m;
            var _o = _this.props, _p = _o.printStartColIndex, printStartColIndex = _p === void 0 ? 0 : _p, _q = _o.printEndColIndex, printEndColIndex = _q === void 0 ? colGroup.length - 1 : _q;
            var _r = options.frozenRowIndex, frozenRowIndex = _r === void 0 ? 0 : _r, _s = options.frozenColumnIndex, frozenColumnIndex = _s === void 0 ? 0 : _s;
            var _t = styles.bodyTrHeight, bodyTrHeight = _t === void 0 ? 0 : _t, _u = styles.scrollContentWidth, scrollContentWidth = _u === void 0 ? 0 : _u, _v = styles.scrollContentHeight, scrollContentHeight = _v === void 0 ? 0 : _v, _w = styles.scrollContentContainerWidth, scrollContentContainerWidth = _w === void 0 ? 0 : _w, _x = styles.scrollContentContainerHeight, scrollContentContainerHeight = _x === void 0 ? 0 : _x, _y = styles.frozenPanelWidth, frozenPanelWidth = _y === void 0 ? 0 : _y, _z = styles.rightPanelWidth, rightPanelWidth = _z === void 0 ? 0 : _z, _0 = styles.verticalScrollerWidth, verticalScrollerWidth = _0 === void 0 ? 0 : _0;
            var sRowIndex = Math.floor(-scrollTop / bodyTrHeight) + frozenRowIndex;
            var eRowIndex = Math.floor(-scrollTop / bodyTrHeight) +
                // frozenRowIndex +
                Math.floor(scrollContentContainerHeight / bodyTrHeight);
            var sColIndex = printStartColIndex;
            var eColIndex = printEndColIndex;
            var pRowSize = Math.floor(scrollContentContainerHeight / bodyTrHeight);
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
            return new Promise(function (resolve, reject) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                if (e.metaKey) {
                    switch (e.which) {
                        case _enums_1.DataGridEnums.MetaKeycodes.C:
                            e.preventDefault();
                            var copySuccess = false;
                            var copiedString = '';
                            for (var rk in selectionRows) {
                                if (selectionRows[rk]) {
                                    var item = data[rk];
                                    for (var ck in selectionCols) {
                                        if (selectionCols[ck]) {
                                            copiedString += (item[headerColGroup[ck].key] || '') + '\t';
                                        }
                                    }
                                    copiedString += '\n';
                                }
                            }
                            if (clipBoardNode && clipBoardNode.current) {
                                clipBoardNode.current.value = copiedString;
                                clipBoardNode.current.select();
                            }
                            try {
                                copySuccess = document.execCommand('copy');
                            }
                            catch (e) { }
                            rootNode && rootNode.current && rootNode.current.focus();
                            if (copySuccess) {
                                resolve();
                            }
                            else {
                                reject();
                            }
                            break;
                        case _enums_1.DataGridEnums.MetaKeycodes.A:
                            e.preventDefault();
                            var state = {
                                dragging: false,
                                selectionRows: {},
                                selectionCols: {},
                                focusedRow: 0,
                                focusedCol: focusedCol,
                            };
                            state.selectionRows = (function () {
                                var rows = {};
                                data.forEach(function (item, i) {
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
                            setStoreState(state, function () {
                                resolve();
                            });
                            break;
                        default:
                            break;
                    }
                }
                else {
                    var focusRow = void 0;
                    var focusCol = void 0;
                    switch (e.which) {
                        case _enums_1.DataGridEnums.KeyCodes.ESC:
                            setStoreState({
                                selectionRows: (_a = {},
                                    _a[focusedRow] = true,
                                    _a),
                                selectionCols: (_b = {},
                                    _b[focusedCol] = true,
                                    _b),
                            }, function () {
                                resolve();
                            });
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.HOME:
                            focusRow = 0;
                            setStoreState({
                                scrollTop: getAvailScrollTop(focusRow),
                                selectionRows: (_c = {},
                                    _c[focusRow] = true,
                                    _c),
                                focusedRow: focusRow,
                            }, function () {
                                resolve();
                            });
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.END:
                            focusRow = data.length - 1;
                            setStoreState({
                                scrollTop: getAvailScrollTop(focusRow),
                                selectionRows: (_d = {},
                                    _d[focusRow] = true,
                                    _d),
                                focusedRow: focusRow,
                            }, function () {
                                resolve();
                            });
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.PAGE_UP:
                            e.preventDefault();
                            focusRow = focusedRow - pRowSize < 1 ? 0 : focusedRow - pRowSize;
                            setStoreState({
                                scrollTop: getAvailScrollTop(focusRow),
                                selectionRows: (_e = {},
                                    _e[focusRow] = true,
                                    _e),
                                focusedRow: focusRow,
                            }, function () {
                                resolve();
                            });
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.PAGE_DOWN:
                            e.preventDefault();
                            focusRow =
                                focusedRow + pRowSize >= data.length
                                    ? data.length - 1
                                    : focusedRow + pRowSize;
                            setStoreState({
                                scrollTop: getAvailScrollTop(focusRow),
                                selectionRows: (_f = {},
                                    _f[focusRow] = true,
                                    _f),
                                focusedRow: focusRow,
                            }, function () {
                                resolve();
                            });
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.UP_ARROW:
                            e.preventDefault();
                            focusRow = focusedRow < 1 ? 0 : focusedRow - 1;
                            setStoreState({
                                scrollTop: getAvailScrollTop(focusRow),
                                selectionRows: (_g = {},
                                    _g[focusRow] = true,
                                    _g),
                                focusedRow: focusRow,
                            }, function () {
                                setTimeout(function () {
                                    resolve();
                                });
                            });
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.DOWN_ARROW:
                            e.preventDefault();
                            focusRow =
                                focusedRow + 1 >= data.length ? data.length - 1 : focusedRow + 1;
                            setStoreState({
                                scrollTop: getAvailScrollTop(focusRow),
                                selectionRows: (_h = {},
                                    _h[focusRow] = true,
                                    _h),
                                focusedRow: focusRow,
                            }, function () {
                                setTimeout(function () {
                                    resolve();
                                });
                            });
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.LEFT_ARROW:
                            e.preventDefault();
                            focusCol = focusedCol < 1 ? 0 : focusedCol - 1;
                            setStoreState({
                                scrollLeft: getAvailScrollLeft(focusCol),
                                selectionCols: (_j = {},
                                    _j[focusCol] = true,
                                    _j),
                                focusedCol: focusCol,
                            }, function () {
                                setTimeout(function () {
                                    resolve();
                                });
                            });
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.RIGHT_ARROW:
                            e.preventDefault();
                            focusCol =
                                focusedCol + 1 >= colGroup.length
                                    ? colGroup.length - 1
                                    : focusedCol + 1;
                            setStoreState({
                                scrollLeft: getAvailScrollLeft(focusCol),
                                selectionCols: (_k = {},
                                    _k[focusCol] = true,
                                    _k),
                                focusedCol: focusCol,
                            }, function () {
                                setTimeout(function () {
                                    resolve();
                                });
                            });
                            break;
                        default:
                            resolve();
                            break;
                    }
                }
            });
        };
        _this.onContextmenu = function (e) {
            var _a = _this.props, onRightClick = _a.onRightClick, focusedRow = _a.focusedRow, focusedCol = _a.focusedCol, data = _a.data, colGroup = _a.colGroup;
            if (onRightClick &&
                data &&
                typeof focusedRow !== 'undefined' &&
                typeof focusedCol !== 'undefined' &&
                colGroup) {
                var _b = colGroup[focusedCol].key, itemKey = _b === void 0 ? '' : _b;
                onRightClick({
                    e: e,
                    item: data[focusedRow],
                    value: data[focusedRow][itemKey],
                    focusedRow: focusedRow,
                    focusedCol: focusedCol,
                });
            }
        };
        _this.onFireEvent = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var _a, loading, loadingData, _b, isInlineEditing, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.props, loading = _a.loading, loadingData = _a.loadingData, _b = _a.isInlineEditing, isInlineEditing = _b === void 0 ? false : _b;
                        if (this.busy || loadingData || isInlineEditing || loading) {
                            e.preventDefault();
                            return [2 /*return*/];
                        }
                        if (this.props.onBeforeEvent) {
                            this.props.onBeforeEvent({ e: e, eventName: e.type });
                        }
                        _c = e.type;
                        switch (_c) {
                            case _enums_1.DataGridEnums.EventNames.WHEEL: return [3 /*break*/, 1];
                            case _enums_1.DataGridEnums.EventNames.KEYDOWN: return [3 /*break*/, 2];
                            case _enums_1.DataGridEnums.EventNames.KEYUP: return [3 /*break*/, 4];
                            case _enums_1.DataGridEnums.EventNames.CONTEXTMENU: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 6];
                    case 1:
                        this.onWheel(e);
                        return [3 /*break*/, 7];
                    case 2:
                        this.busy = true;
                        return [4 /*yield*/, this.onKeyDown(e)];
                    case 3:
                        _d.sent();
                        this.busy = false;
                        return [3 /*break*/, 7];
                    case 4:
                        this.onKeyUp(e);
                        return [3 /*break*/, 7];
                    case 5:
                        this.onContextmenu(e);
                        return [3 /*break*/, 7];
                    case 6: return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    DataGridEvents.prototype.render = function () {
        return React.createElement("div", { onWheel: this.onFireEvent }, this.props.children);
    };
    DataGridEvents.prototype.componentDidMount = function () {
        var rootNode = this.props.rootNode;
        if (rootNode && rootNode.current) {
            rootNode.current.addEventListener('keydown', this.onFireEvent, false);
            rootNode.current.addEventListener('keyup', this.onFireEvent, false);
            rootNode.current.addEventListener('contextmenu', this.onFireEvent, false);
        }
    };
    DataGridEvents.prototype.componentWillUnmount = function () {
        var rootNode = this.props.rootNode;
        if (rootNode && rootNode.current) {
            rootNode.current.removeEventListener('keydown', this.onFireEvent);
            // rootNode.current.removeEventListener('keyup', this.onFireEvent);
            rootNode.current.removeEventListener('contextmenu', this.onFireEvent);
        }
    };
    return DataGridEvents;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridEvents);
