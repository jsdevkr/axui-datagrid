"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getScrollPosition_1 = require("./getScrollPosition");
function getScrollPositionByScrollBar(scrollBarLeft, scrollBarTop, _a) {
    var horizontalScrollerWidth = _a.horizontalScrollerWidth, verticalScrollerHeight = _a.verticalScrollerHeight, horizontalScrollBarWidth = _a.horizontalScrollBarWidth, verticalScrollBarHeight = _a.verticalScrollBarHeight, scrollContentWidth = _a.scrollContentWidth, scrollContentHeight = _a.scrollContentHeight, scrollContentContainerWidth = _a.scrollContentContainerWidth, scrollContentContainerHeight = _a.scrollContentContainerHeight, _b = _a.BW, BW = _b === void 0 ? horizontalScrollerWidth - horizontalScrollBarWidth : _b, _c = _a.BH, BH = _c === void 0 ? verticalScrollerHeight - verticalScrollBarHeight : _c, _d = _a.SW, SW = _d === void 0 ? scrollContentWidth - scrollContentContainerWidth : _d, _e = _a.SH, SH = _e === void 0 ? scrollContentHeight - scrollContentContainerHeight : _e;
    var _f = getScrollPosition_1.default(-scrollBarLeft * SW / BW, -scrollBarTop * SH / BH, {
        scrollWidth: scrollContentWidth,
        scrollHeight: scrollContentHeight,
        clientWidth: scrollContentContainerWidth,
        clientHeight: scrollContentContainerHeight,
    }), scrollLeft = _f.scrollLeft, scrollTop = _f.scrollTop, endOfScrollLeft = _f.endOfScrollLeft, endOfScrollTop = _f.endOfScrollTop;
    return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        endOfScrollLeft: endOfScrollLeft,
        endOfScrollTop: endOfScrollTop,
    };
}
exports.getScrollPositionByScrollBar = getScrollPositionByScrollBar;
exports.default = getScrollPositionByScrollBar;
