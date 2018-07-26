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
            var _a = _this.props, _b = _a.filteredList, filteredList = _b === void 0 ? [] : _b, _c = _a.scrollLeft, scrollLeft = _c === void 0 ? 0 : _c, _d = _a.scrollTop, scrollTop = _d === void 0 ? 0 : _d, _e = _a.focusedRow, focusedRow = _e === void 0 ? 0 : _e, _f = _a.options, options = _f === void 0 ? {} : _f, _g = _a.styles, styles = _g === void 0 ? {} : _g, setStoreState = _a.setStoreState;
            var _h = options.frozenRowIndex, frozenRowIndex = _h === void 0 ? 0 : _h;
            var _j = styles.bodyTrHeight, bodyTrHeight = _j === void 0 ? 0 : _j, _k = styles.bodyHeight, bodyHeight = _k === void 0 ? 0 : _k, _l = styles.scrollContentWidth, scrollContentWidth = _l === void 0 ? 0 : _l, _m = styles.scrollContentHeight, scrollContentHeight = _m === void 0 ? 0 : _m, _o = styles.scrollContentContainerWidth, scrollContentContainerWidth = _o === void 0 ? 0 : _o, _p = styles.scrollContentContainerHeight, scrollContentContainerHeight = _p === void 0 ? 0 : _p;
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
            var proc = (_q = {},
                _q[stores_1.PageButtonActions.PAGE_FIRST] = function () {
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
                _q[stores_1.PageButtonActions.PAGE_PREV] = function () {
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
                _q[stores_1.PageButtonActions.PAGE_BACK] = function () {
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
                _q[stores_1.PageButtonActions.PAGE_PLAY] = function () {
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
                _q[stores_1.PageButtonActions.PAGE_NEXT] = function () {
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
                _q[stores_1.PageButtonActions.PAGE_LAST] = function () {
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
                _q);
            if (utils_1.isFunction(userFunction)) {
                userFunction();
            }
            else if (typeof userFunction === 'string' && userFunction in proc) {
                proc[userFunction]();
            }
            var _q;
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