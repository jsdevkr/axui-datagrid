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
var DataGridPage = /** @class */ (function (_super) {
    __extends(DataGridPage, _super);
    function DataGridPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.onClickPageButton = function (e, userFunction) {
            var _a = _this.props, _b = _a.filteredList, filteredList = _b === void 0 ? [] : _b, _c = _a.scrollLeft, scrollLeft = _c === void 0 ? 0 : _c, _d = _a.scrollTop, scrollTop = _d === void 0 ? 0 : _d, _e = _a.focusedRow, focusedRow = _e === void 0 ? 0 : _e, _f = _a.options, options = _f === void 0 ? {} : _f, _g = _a.styles, styles = _g === void 0 ? {} : _g, setStoreState = _a.setStoreState, _h = _a.colGroup, colGroup = _h === void 0 ? [] : _h;
            var _j = _this.props, _k = _j.printStartColIndex, printStartColIndex = _k === void 0 ? 0 : _k, _l = _j.printEndColIndex, printEndColIndex = _l === void 0 ? colGroup.length : _l;
            var _m = options.frozenRowIndex, frozenRowIndex = _m === void 0 ? 0 : _m;
            var _o = styles.bodyTrHeight, bodyTrHeight = _o === void 0 ? 0 : _o, _p = styles.bodyHeight, bodyHeight = _p === void 0 ? 0 : _p, _q = styles.scrollContentWidth, scrollContentWidth = _q === void 0 ? 0 : _q, _r = styles.scrollContentHeight, scrollContentHeight = _r === void 0 ? 0 : _r, _s = styles.scrollContentContainerWidth, scrollContentContainerWidth = _s === void 0 ? 0 : _s, _t = styles.scrollContentContainerHeight, scrollContentContainerHeight = _t === void 0 ? 0 : _t;
            var sRowIndex = Math.floor(-scrollTop / bodyTrHeight) + frozenRowIndex;
            var eRowIndex = Math.floor(-scrollTop / bodyTrHeight) +
                frozenRowIndex +
                Math.floor(bodyHeight / bodyTrHeight);
            var pRowSize = Math.floor(bodyHeight / bodyTrHeight);
            var getAvailScrollTop = function (rowIndex) {
                var _scrollTop = undefined;
                if (sRowIndex >= rowIndex) {
                    _scrollTop = -rowIndex * bodyTrHeight;
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
            var proc = (_u = {},
                _u[stores_1.PageButtonActions.PAGE_FIRST] = function () {
                    var focusRow = 0;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: (_a = {},
                            _a[focusRow] = true,
                            _a),
                        focusedRow: focusRow,
                    });
                    var _a;
                },
                _u[stores_1.PageButtonActions.PAGE_PREV] = function () {
                    var focusRow = focusedRow - pRowSize < 1 ? 0 : focusedRow - pRowSize;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: (_a = {},
                            _a[focusRow] = true,
                            _a),
                        focusedRow: focusRow,
                    });
                    var _a;
                },
                _u[stores_1.PageButtonActions.PAGE_BACK] = function () {
                    var focusRow = focusedRow < 1 ? 0 : focusedRow - 1;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: (_a = {},
                            _a[focusRow] = true,
                            _a),
                        focusedRow: focusRow,
                    });
                    var _a;
                },
                _u[stores_1.PageButtonActions.PAGE_PLAY] = function () {
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
                    var _a;
                },
                _u[stores_1.PageButtonActions.PAGE_NEXT] = function () {
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
                    var _a;
                },
                _u[stores_1.PageButtonActions.PAGE_LAST] = function () {
                    var focusRow = filteredList.length - 1;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: (_a = {},
                            _a[focusRow] = true,
                            _a),
                        focusedRow: focusRow,
                    });
                    var _a;
                },
                _u);
            if (utils_1.isFunction(userFunction)) {
                userFunction();
            }
            else if (typeof userFunction === 'string' && userFunction in proc) {
                proc[userFunction]();
            }
            var _u;
        };
        return _this;
    }
    DataGridPage.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.options, options = _b === void 0 ? {} : _b, _c = _a.styles, styles = _c === void 0 ? {} : _c;
        var pageButtonsContainerWidth = styles.pageButtonsContainerWidth;
        var _d = options.page, optionPage = _d === void 0 ? {} : _d;
        var _e = optionPage.buttons, pageButtons = _e === void 0 ? [] : _e, _f = optionPage.buttonHeight, pageButtonHeight = _f === void 0 ? 0 : _f;
        return (React.createElement("div", { className: "axui-datagrid-page", style: { height: styles.pageHeight } },
            React.createElement("div", { className: "axui-datagrid-page-buttons", style: { width: pageButtonsContainerWidth } }, pageButtons.map(function (button, bi) {
                return (React.createElement("button", { key: bi, style: {
                        height: pageButtonHeight,
                        width: button.width || pageButtonHeight,
                    }, onClick: function (e) {
                        _this.onClickPageButton(e, button.onClick);
                    } },
                    React.createElement("div", { "data-button-svg": true, className: utils_1.classNames(button.className) })));
            }))));
    };
    return DataGridPage;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridPage);
//# sourceMappingURL=DataGridPage.js.map