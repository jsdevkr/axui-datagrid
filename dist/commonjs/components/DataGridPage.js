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
var PageButtons = function (_a) {
    var pageButtons = _a.pageButtons, pageButtonHeight = _a.pageButtonHeight, onClickPageButton = _a.onClickPageButton;
    return (React.createElement(React.Fragment, null, pageButtons.map(function (button, bi) {
        return (React.createElement("button", { key: bi, style: {
                height: pageButtonHeight,
                width: button.width || pageButtonHeight,
            }, onClick: function (e) {
                onClickPageButton(e, button.onClick);
            } },
            React.createElement("div", { "data-button-svg": true, className: utils_1.classNames(button.className) })));
    })));
};
var DataGridPage = /** @class */ (function (_super) {
    __extends(DataGridPage, _super);
    function DataGridPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.onClickPageButton = function (e, userFunction) {
            var _a;
            var _b = _this.props, _c = _b.filteredList, filteredList = _c === void 0 ? [] : _c, _d = _b.scrollLeft, scrollLeft = _d === void 0 ? 0 : _d, _e = _b.scrollTop, scrollTop = _e === void 0 ? 0 : _e, _f = _b.focusedRow, focusedRow = _f === void 0 ? 0 : _f, _g = _b.options, options = _g === void 0 ? {} : _g, _h = _b.styles, styles = _h === void 0 ? {} : _h, setStoreState = _b.setStoreState;
            var _j = options.frozenRowIndex, frozenRowIndex = _j === void 0 ? 0 : _j;
            var _k = styles.bodyTrHeight, bodyTrHeight = _k === void 0 ? 0 : _k, _l = styles.bodyHeight, bodyHeight = _l === void 0 ? 0 : _l, _m = styles.scrollContentWidth, scrollContentWidth = _m === void 0 ? 0 : _m, _o = styles.scrollContentHeight, scrollContentHeight = _o === void 0 ? 0 : _o, _p = styles.scrollContentContainerWidth, scrollContentContainerWidth = _p === void 0 ? 0 : _p, _q = styles.scrollContentContainerHeight, scrollContentContainerHeight = _q === void 0 ? 0 : _q;
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
            var proc = (_a = {},
                _a[stores_1.PageButtonActions.PAGE_FIRST] = function () {
                    var _a;
                    var focusRow = 0;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: (_a = {},
                            _a[focusRow] = true,
                            _a),
                        focusedRow: focusRow,
                    });
                },
                _a[stores_1.PageButtonActions.PAGE_PREV] = function () {
                    var _a;
                    var focusRow = focusedRow - pRowSize < 1 ? 0 : focusedRow - pRowSize;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: (_a = {},
                            _a[focusRow] = true,
                            _a),
                        focusedRow: focusRow,
                    });
                },
                _a[stores_1.PageButtonActions.PAGE_BACK] = function () {
                    var _a;
                    var focusRow = focusedRow < 1 ? 0 : focusedRow - 1;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: (_a = {},
                            _a[focusRow] = true,
                            _a),
                        focusedRow: focusRow,
                    });
                },
                _a[stores_1.PageButtonActions.PAGE_PLAY] = function () {
                    var _a;
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
                _a[stores_1.PageButtonActions.PAGE_NEXT] = function () {
                    var _a;
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
                _a[stores_1.PageButtonActions.PAGE_LAST] = function () {
                    var _a;
                    var focusRow = filteredList.length - 1;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: (_a = {},
                            _a[focusRow] = true,
                            _a),
                        focusedRow: focusRow,
                    });
                },
                _a);
            if (utils_1.isFunction(userFunction)) {
                userFunction();
            }
            else if (typeof userFunction === 'string' && userFunction in proc) {
                proc[userFunction]();
            }
        };
        return _this;
    }
    DataGridPage.prototype.render = function () {
        var _a = this.props, _b = _a.options, options = _b === void 0 ? {} : _b, _c = _a.styles, styles = _c === void 0 ? {} : _c;
        var pageButtonsContainerWidth = styles.pageButtonsContainerWidth;
        var _d = options.page, optionPage = _d === void 0 ? {} : _d;
        var _e = optionPage.buttons, pageButtons = _e === void 0 ? [] : _e, _f = optionPage.buttonHeight, pageButtonHeight = _f === void 0 ? 0 : _f;
        return (React.createElement("div", { className: "axui-datagrid-page", style: { height: styles.pageHeight } },
            React.createElement("div", { className: "axui-datagrid-page-buttons", style: { width: pageButtonsContainerWidth } },
                React.createElement(PageButtons, { pageButtons: pageButtons, pageButtonHeight: pageButtonHeight, onClickPageButton: this.onClickPageButton }))));
    };
    return DataGridPage;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridPage);
//# sourceMappingURL=DataGridPage.js.map