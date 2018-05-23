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
var classnames_1 = require("classnames");
var GridScroll = /** @class */ (function (_super) {
    __extends(GridScroll, _super);
    function GridScroll(props) {
        var _this = _super.call(this, props) || this;
        _this.onClickScrollTrack = _this.onClickScrollTrack.bind(_this);
        return _this;
    }
    GridScroll.prototype.onClickScrollTrack = function (e, barName) {
        e.preventDefault();
        if (e.target.getAttribute('data-scroll')) {
            this.props.onClickScrollTrack(e, barName);
        }
    };
    GridScroll.prototype.render = function () {
        var _this = this;
        var _a = this.props, mounted = _a.mounted, bodyHeight = _a.bodyHeight, pageHeight = _a.pageHeight, verticalScrollerHeight = _a.verticalScrollerHeight, verticalScrollerWidth = _a.verticalScrollerWidth, horizontalScrollerWidth = _a.horizontalScrollerWidth, horizontalScrollerHeight = _a.horizontalScrollerHeight, verticalScrollBarHeight = _a.verticalScrollBarHeight, horizontalScrollBarWidth = _a.horizontalScrollBarWidth, scrollerArrowSize = _a.scrollerArrowSize, scrollerPadding = _a.scrollerPadding, scrollBarLeft = _a.scrollBarLeft, scrollBarTop = _a.scrollBarTop, onMouseDownScrollBar = _a.onMouseDownScrollBar, onClickScrollArrow = _a.onClickScrollArrow;
        if (!mounted)
            return null;
        if (verticalScrollerWidth === 0 && horizontalScrollerHeight === 0)
            return null;
        var arrowWidth = (scrollerArrowSize - scrollerPadding * 2) / 2;
        var verticalArrowStyles = {
            width: verticalScrollerWidth,
            height: scrollerArrowSize / 2 + scrollerPadding,
        };
        var verticalTopArrowStyles = {
            left: scrollerPadding,
            top: (verticalArrowStyles.height - arrowWidth) / 2,
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
        return (React.createElement("div", { className: classnames_1.default('axd-scroller') },
            verticalScrollerWidth ? (React.createElement("div", { "data-scroll-track": "vertical", style: verticalStyles },
                React.createElement("div", { "data-scroll-arrow": "up", style: verticalArrowStyles },
                    React.createElement("div", { "data-arrow": true, style: verticalTopArrowStyles, onClick: function (e) { return onClickScrollArrow(e, 'up'); } })),
                React.createElement("div", { "data-scroll": "vertical", onClick: function (e) { return _this.onClickScrollTrack(e, 'vertical'); } },
                    React.createElement("div", { className: classnames_1.default('axd-scroll-bar'), style: verticalBarStyles, onMouseDown: function (e) { return onMouseDownScrollBar(e, 'vertical'); } })),
                React.createElement("div", { "data-scroll-arrow": "down", style: verticalArrowStyles },
                    React.createElement("div", { "data-arrow": true, style: verticalBottomArrowStyles, onClick: function (e) { return onClickScrollArrow(e, 'down'); } })))) : null,
            horizontalScrollerHeight ? (React.createElement("div", { "data-scroll-track": "horizontal", style: horizontalStyles },
                React.createElement("div", { "data-scroll-arrow": "left", style: horizontalArrowStyles },
                    React.createElement("div", { "data-arrow": true, style: horizontalLeftArrowStyles, onClick: function (e) { return onClickScrollArrow(e, 'left'); } })),
                React.createElement("div", { "data-scroll": "horizontal", onClick: function (e) { return _this.onClickScrollTrack(e, 'horizontal'); } },
                    React.createElement("div", { className: classnames_1.default('axd-scroll-bar'), style: horizontalBarStyles, onMouseDown: function (e) { return onMouseDownScrollBar(e, 'horizontal'); } })),
                React.createElement("div", { "data-scroll-arrow": "right", style: horizontalArrowStyles },
                    React.createElement("div", { "data-arrow": true, style: horizontalRightArrowStyles, onClick: function (e) { return onClickScrollArrow(e, 'right'); } })))) : null));
    };
    return GridScroll;
}(React.Component));
exports.GridScroll = GridScroll;
//# sourceMappingURL=GridScroll.js.map