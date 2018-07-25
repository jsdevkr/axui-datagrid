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
var DatagridScroll = /** @class */ (function (_super) {
    __extends(DatagridScroll, _super);
    function DatagridScroll() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.onClickScrollArrow = function (e, direction) {
            var _a = _this.props, _b = _a.scrollLeft, scrollLeft = _b === void 0 ? 0 : _b, _c = _a.scrollTop, scrollTop = _c === void 0 ? 0 : _c, _d = _a.styles, styles = _d === void 0 ? {} : _d, setStoreState = _a.setStoreState, loading = _a.loading, loadingData = _a.loadingData;
            if (loading || loadingData) {
                return false;
            }
            var _e = styles.scrollContentWidth, scrollContentWidth = _e === void 0 ? 0 : _e, _f = styles.scrollContentContainerWidth, scrollContentContainerWidth = _f === void 0 ? 0 : _f, _g = styles.scrollContentHeight, scrollContentHeight = _g === void 0 ? 0 : _g, _h = styles.scrollContentContainerHeight, scrollContentContainerHeight = _h === void 0 ? 0 : _h;
            var processor = (_j = {},
                _j[stores_1.DirectionTypes.UP] = function () {
                    var scrollAmount = scrollContentContainerHeight;
                    setStoreState({
                        scrollTop: scrollTop + scrollAmount < 0 ? scrollTop + scrollAmount : 0,
                    });
                },
                _j[stores_1.DirectionTypes.DOWN] = function () {
                    var scrollAmount = scrollContentContainerHeight;
                    setStoreState({
                        scrollTop: scrollContentContainerHeight <
                            scrollContentHeight + (scrollTop - scrollAmount)
                            ? scrollTop - scrollAmount
                            : scrollContentContainerHeight - scrollContentHeight,
                    });
                },
                _j[stores_1.DirectionTypes.LEFT] = function () {
                    var scrollAmount = scrollContentContainerWidth;
                    setStoreState({
                        scrollLeft: scrollLeft + scrollAmount < 0 ? scrollLeft + scrollAmount : 0,
                    });
                },
                _j[stores_1.DirectionTypes.RIGHT] = function () {
                    var scrollAmount = scrollContentContainerWidth;
                    setStoreState({
                        scrollLeft: scrollContentContainerWidth <
                            scrollContentWidth + (scrollLeft - scrollAmount)
                            ? scrollLeft - scrollAmount
                            : scrollContentContainerWidth - scrollContentWidth,
                    });
                },
                _j);
            processor[direction]();
            return true;
            var _j;
        };
        _this.onClickScrollTrack = function (e, barName) {
            var _a = _this.props, getRootNode = _a.getRootNode, _b = _a.scrollLeft, scrollLeft = _b === void 0 ? 0 : _b, _c = _a.scrollTop, scrollTop = _c === void 0 ? 0 : _c, _d = _a.styles, styles = _d === void 0 ? {} : _d, setStoreState = _a.setStoreState, loading = _a.loading, loadingData = _a.loadingData;
            if (loading || loadingData) {
                return false;
            }
            e.preventDefault();
            var _e = styles.horizontalScrollerWidth, horizontalScrollerWidth = _e === void 0 ? 0 : _e, _f = styles.horizontalScrollBarWidth, horizontalScrollBarWidth = _f === void 0 ? 0 : _f, _g = styles.scrollContentWidth, scrollContentWidth = _g === void 0 ? 0 : _g, _h = styles.scrollContentContainerWidth, scrollContentContainerWidth = _h === void 0 ? 0 : _h, _j = styles.verticalScrollerHeight, verticalScrollerHeight = _j === void 0 ? 0 : _j, _k = styles.verticalScrollBarHeight, verticalScrollBarHeight = _k === void 0 ? 0 : _k, _l = styles.scrollContentHeight, scrollContentHeight = _l === void 0 ? 0 : _l, _m = styles.scrollContentContainerHeight, scrollContentContainerHeight = _m === void 0 ? 0 : _m, _o = styles.pageButtonsContainerWidth, pageButtonsContainerWidth = _o === void 0 ? 0 : _o;
            var currScrollBarLeft = -scrollLeft *
                (horizontalScrollerWidth - horizontalScrollBarWidth) /
                (scrollContentWidth - scrollContentContainerWidth);
            var currScrollBarTop = -scrollTop *
                (verticalScrollerHeight - verticalScrollBarHeight) /
                (scrollContentHeight - scrollContentContainerHeight);
            var _p = utils_1.getMousePosition(e), mouseX = _p.x, mouseY = _p.y;
            var rootNode = utils_1.getNode(getRootNode);
            var _q = rootNode
                ? rootNode.getBoundingClientRect()
                : {}, _r = _q.x, grx = _r === void 0 ? 0 : _r, _s = _q.y, gry = _s === void 0 ? 0 : _s;
            var processor = (_t = {},
                _t[stores_1.ScrollTypes.VERTICAL] = function () {
                    var _a = utils_1.getScrollPositionByScrollBar(currScrollBarLeft, mouseY - gry - verticalScrollBarHeight / 2, styles), _b = _a.scrollLeft, currScrollLeft = _b === void 0 ? 0 : _b, _c = _a.scrollTop, currScrollTop = _c === void 0 ? 0 : _c;
                    setStoreState({
                        scrollLeft: currScrollLeft,
                        scrollTop: currScrollTop,
                    });
                },
                _t[stores_1.ScrollTypes.HORIZONTAL] = function () {
                    var _a = utils_1.getScrollPositionByScrollBar(mouseX -
                        grx -
                        pageButtonsContainerWidth -
                        horizontalScrollBarWidth / 2, currScrollBarTop, styles), _b = _a.scrollLeft, currScrollLeft = _b === void 0 ? 0 : _b, _c = _a.scrollTop, currScrollTop = _c === void 0 ? 0 : _c;
                    setStoreState({
                        scrollLeft: currScrollLeft,
                        scrollTop: currScrollTop,
                    });
                },
                _t);
            if (e.target.getAttribute('data-scroll')) {
                processor[barName]();
            }
            return true;
            var _t;
        };
        _this.onMouseDownScrollBar = function (e, barName) {
            var _a = _this.props, _b = _a.scrollLeft, scrollLeft = _b === void 0 ? 0 : _b, _c = _a.scrollTop, scrollTop = _c === void 0 ? 0 : _c, _d = _a.styles, styles = _d === void 0 ? {} : _d, setStoreState = _a.setStoreState, loading = _a.loading, loadingData = _a.loadingData;
            if (loading || loadingData) {
                return false;
            }
            var _e = styles.horizontalScrollerWidth, horizontalScrollerWidth = _e === void 0 ? 0 : _e, _f = styles.horizontalScrollBarWidth, horizontalScrollBarWidth = _f === void 0 ? 0 : _f, _g = styles.scrollContentWidth, scrollContentWidth = _g === void 0 ? 0 : _g, _h = styles.scrollContentContainerWidth, scrollContentContainerWidth = _h === void 0 ? 0 : _h, _j = styles.verticalScrollerHeight, verticalScrollerHeight = _j === void 0 ? 0 : _j, _k = styles.verticalScrollBarHeight, verticalScrollBarHeight = _k === void 0 ? 0 : _k, _l = styles.scrollContentHeight, scrollContentHeight = _l === void 0 ? 0 : _l, _m = styles.scrollContentContainerHeight, scrollContentContainerHeight = _m === void 0 ? 0 : _m;
            e.preventDefault();
            var currScrollBarLeft = -scrollLeft *
                (horizontalScrollerWidth - horizontalScrollBarWidth) /
                (scrollContentWidth - scrollContentContainerWidth);
            var currScrollBarTop = -scrollTop *
                (verticalScrollerHeight - verticalScrollBarHeight) /
                (scrollContentHeight - scrollContentContainerHeight);
            var startMousePosition = utils_1.getMousePosition(e);
            var onMouseMove = function (ee) {
                var _a = utils_1.getMousePosition(ee), x = _a.x, y = _a.y;
                var processor = (_b = {},
                    _b[stores_1.ScrollTypes.VERTICAL] = function () {
                        var _a = utils_1.getScrollPositionByScrollBar(currScrollBarLeft, currScrollBarTop + (y - startMousePosition.y), styles), _b = _a.scrollLeft, currScrollLeft = _b === void 0 ? 0 : _b, _c = _a.scrollTop, currScrollTop = _c === void 0 ? 0 : _c;
                        setStoreState({
                            scrollLeft: currScrollLeft,
                            scrollTop: currScrollTop,
                        });
                    },
                    _b[stores_1.ScrollTypes.HORIZONTAL] = function () {
                        var _a = utils_1.getScrollPositionByScrollBar(currScrollBarLeft + (x - startMousePosition.x), currScrollBarTop, styles), _b = _a.scrollLeft, currScrollLeft = _b === void 0 ? 0 : _b, _c = _a.scrollTop, currScrollTop = _c === void 0 ? 0 : _c;
                        setStoreState({
                            scrollLeft: currScrollLeft,
                            scrollTop: currScrollTop,
                        });
                    },
                    _b);
                processor[barName]();
                var _b;
            };
            var offEvent = function (ee) {
                ee.preventDefault();
                // console.log('off');
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', offEvent);
                document.removeEventListener('mouseleave', offEvent);
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', offEvent);
            document.addEventListener('mouseleave', offEvent);
            return true;
        };
        return _this;
    }
    DatagridScroll.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.scrollLeft, scrollLeft = _b === void 0 ? 0 : _b, _c = _a.scrollTop, scrollTop = _c === void 0 ? 0 : _c, _d = _a.styles, styles = _d === void 0 ? {} : _d;
        var _e = styles.pageHeight, pageHeight = _e === void 0 ? 0 : _e, _f = styles.verticalScrollerWidth, verticalScrollerWidth = _f === void 0 ? 0 : _f, _g = styles.verticalScrollerHeight, verticalScrollerHeight = _g === void 0 ? 0 : _g, _h = styles.horizontalScrollerWidth, horizontalScrollerWidth = _h === void 0 ? 0 : _h, _j = styles.horizontalScrollerHeight, horizontalScrollerHeight = _j === void 0 ? 0 : _j, _k = styles.verticalScrollBarHeight, verticalScrollBarHeight = _k === void 0 ? 0 : _k, _l = styles.horizontalScrollBarWidth, horizontalScrollBarWidth = _l === void 0 ? 0 : _l, _m = styles.scrollerArrowSize, scrollerArrowSize = _m === void 0 ? 0 : _m, _o = styles.scrollerPadding, scrollerPadding = _o === void 0 ? 0 : _o, _p = styles.scrollContentContainerWidth, scrollContentContainerWidth = _p === void 0 ? 1 : _p, _q = styles.scrollContentContainerHeight, scrollContentContainerHeight = _q === void 0 ? 1 : _q, _r = styles.scrollContentWidth, scrollContentWidth = _r === void 0 ? 0 : _r, _s = styles.scrollContentHeight, scrollContentHeight = _s === void 0 ? 0 : _s;
        var scrollBarLeft = -scrollLeft *
            (horizontalScrollerWidth - horizontalScrollBarWidth) /
            (scrollContentWidth - scrollContentContainerWidth);
        var scrollBarTop = -scrollTop *
            (verticalScrollerHeight - verticalScrollBarHeight) /
            (scrollContentHeight - scrollContentContainerHeight);
        if (verticalScrollerWidth === 0 && horizontalScrollerHeight === 0) {
            return null;
        }
        var arrowWidth = (scrollerArrowSize - scrollerPadding * 2) / 2;
        var verticalArrowStyles = {
            width: verticalScrollerWidth,
            height: scrollerArrowSize / 2 + scrollerPadding,
        };
        var verticalTopArrowStyles = {
            left: scrollerPadding,
            top: (verticalArrowStyles.height - arrowWidth) / 2 + 1,
            borderTop: '0 none',
            borderRight: 'solid ' + arrowWidth + 'px transparent',
            borderBottomWidth: arrowWidth + 'px',
            borderLeft: 'solid ' + arrowWidth + 'px transparent',
        };
        var verticalBottomArrowStyles = {
            left: scrollerPadding,
            top: (verticalArrowStyles.height - arrowWidth) / 2,
            borderTopWidth: arrowWidth + 'px',
            borderRight: 'solid ' + arrowWidth + 'px transparent',
            borderBottom: '0 none',
            borderLeft: 'solid ' + arrowWidth + 'px transparent',
        };
        var verticalStyles = {
            width: verticalScrollerWidth,
            height: verticalScrollerHeight + scrollerPadding * 2 + scrollerArrowSize,
            bottom: pageHeight,
            padding: scrollerPadding,
            paddingTop: scrollerArrowSize / 2 + scrollerPadding,
        };
        var verticalBarStyles = {
            height: verticalScrollBarHeight,
            top: scrollBarTop,
        };
        var horizontalArrowStyles = {
            width: scrollerArrowSize / 2 + scrollerPadding,
            height: horizontalScrollerHeight,
        };
        var horizontalLeftArrowStyles = {
            left: (horizontalArrowStyles.width - arrowWidth) / 2,
            top: scrollerPadding,
            borderTop: 'solid ' + arrowWidth + 'px transparent',
            borderRightWidth: arrowWidth + 'px',
            borderBottom: 'solid ' + arrowWidth + 'px transparent',
            borderLeft: '0 none',
        };
        var horizontalRightArrowStyles = {
            left: (horizontalArrowStyles.width - arrowWidth) / 2,
            top: scrollerPadding,
            borderTop: 'solid ' + arrowWidth + 'px transparent',
            borderRight: '0 none',
            borderBottom: 'solid ' + arrowWidth + 'px transparent',
            borderLeftWidth: arrowWidth + 'px',
        };
        var horizontalStyles = {
            width: horizontalScrollerWidth + scrollerPadding * 2 + scrollerArrowSize,
            height: horizontalScrollerHeight,
            bottom: (pageHeight - 1 - horizontalScrollerHeight) / 2,
            right: (pageHeight - 1 - horizontalScrollerHeight) / 2,
            padding: scrollerPadding,
            paddingLeft: scrollerArrowSize / 2 + scrollerPadding,
        };
        var horizontalBarStyles = {
            width: horizontalScrollBarWidth,
            left: scrollBarLeft,
        };
        return (React.createElement("div", { className: "axui-datagrid-scroller" },
            verticalScrollerWidth ? (React.createElement("div", { "data-scroll-track": "vertical", style: verticalStyles },
                React.createElement("div", { "data-scroll-arrow": "up", style: verticalArrowStyles },
                    React.createElement("div", { "data-arrow": true, style: verticalTopArrowStyles, onClick: function (e) { return _this.onClickScrollArrow(e, stores_1.DirectionTypes.UP); } })),
                React.createElement("div", { "data-scroll": "vertical", onClick: function (e) { return _this.onClickScrollTrack(e, stores_1.ScrollTypes.VERTICAL); } },
                    React.createElement("div", { className: "axui-datagrid-scroll-bar", style: verticalBarStyles, onMouseDown: function (e) {
                            return _this.onMouseDownScrollBar(e, stores_1.ScrollTypes.VERTICAL);
                        } })),
                React.createElement("div", { "data-scroll-arrow": "down", style: verticalArrowStyles },
                    React.createElement("div", { "data-arrow": true, style: verticalBottomArrowStyles, onClick: function (e) { return _this.onClickScrollArrow(e, stores_1.DirectionTypes.DOWN); } })))) : null,
            horizontalScrollerHeight ? (React.createElement("div", { "data-scroll-track": "horizontal", style: horizontalStyles },
                React.createElement("div", { "data-scroll-arrow": "left", style: horizontalArrowStyles },
                    React.createElement("div", { "data-arrow": true, style: horizontalLeftArrowStyles, onClick: function (e) { return _this.onClickScrollArrow(e, stores_1.DirectionTypes.LEFT); } })),
                React.createElement("div", { "data-scroll": "horizontal", onClick: function (e) { return _this.onClickScrollTrack(e, stores_1.ScrollTypes.HORIZONTAL); } },
                    React.createElement("div", { className: "axui-datagrid-scroll-bar", style: horizontalBarStyles, onMouseDown: function (e) {
                            return _this.onMouseDownScrollBar(e, stores_1.ScrollTypes.HORIZONTAL);
                        } })),
                React.createElement("div", { "data-scroll-arrow": "right", style: horizontalArrowStyles },
                    React.createElement("div", { "data-arrow": true, style: horizontalRightArrowStyles, onClick: function (e) { return _this.onClickScrollArrow(e, stores_1.DirectionTypes.RIGHT); } })))) : null));
    };
    return DatagridScroll;
}(React.Component));
exports.default = hoc_1.connectStore(DatagridScroll);
//# sourceMappingURL=DataGridScroll.js.map