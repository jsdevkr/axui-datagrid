"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param scrollLeft
 * @param scrollTop
 * @param scrollWidth
 * @param scrollHeight
 * @param clientWidth
 * @param clientHeight
 * @return {{scrollLeft: *, scrollTop: *, eventBreak: boolean}}
 */
function getScrollPosition(scrollLeft, scrollTop, _a) {
    var scrollWidth = _a.scrollWidth, scrollHeight = _a.scrollHeight, clientWidth = _a.clientWidth, clientHeight = _a.clientHeight;
    var endScroll = false;
    if (clientHeight > scrollHeight) {
        scrollTop = 0;
    }
    else if (scrollTop > 0) {
        scrollTop = 0;
        endScroll = true;
    }
    else if (clientHeight > scrollHeight + scrollTop) {
        // scrollHeight
        scrollTop = clientHeight - scrollHeight;
        endScroll = true;
    }
    if (clientWidth > scrollWidth) {
        scrollLeft = 0;
    }
    else if (scrollLeft > 0) {
        scrollLeft = 0;
        endScroll = true;
    }
    else if (clientWidth > scrollWidth + scrollLeft) {
        // scrollHeight
        scrollLeft = clientWidth - scrollWidth;
        endScroll = true;
    }
    return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        endScroll: endScroll,
    };
}
exports.getScrollPosition = getScrollPosition;
/**
 *
 * @param {number} scrollBarLeft
 * @param {number} scrollBarTop
 * @param {any} horizontalScrollerWidth
 * @param {any} verticalScrollerHeight
 * @param {any} horizontalScrollBarWidth
 * @param {any} verticalScrollBarHeight
 * @param {any} scrollContentWidth
 * @param {any} scrollContentHeight
 * @param {any} scrollContentContainerWidth
 * @param {any} scrollContentContainerHeight
 * @param {any} BW
 * @param {any} BH
 * @param {any} SW
 * @param {any} SH
 * @return {{scrollLeft: number; scrollTop: number}}
 */
function getScrollPositionByScrollBar(scrollBarLeft, scrollBarTop, _a) {
    var horizontalScrollerWidth = _a.horizontalScrollerWidth, verticalScrollerHeight = _a.verticalScrollerHeight, horizontalScrollBarWidth = _a.horizontalScrollBarWidth, verticalScrollBarHeight = _a.verticalScrollBarHeight, scrollContentWidth = _a.scrollContentWidth, scrollContentHeight = _a.scrollContentHeight, scrollContentContainerWidth = _a.scrollContentContainerWidth, scrollContentContainerHeight = _a.scrollContentContainerHeight, _b = _a.BW, BW = _b === void 0 ? horizontalScrollerWidth - horizontalScrollBarWidth : _b, _c = _a.BH, BH = _c === void 0 ? verticalScrollerHeight - verticalScrollBarHeight : _c, _d = _a.SW, SW = _d === void 0 ? scrollContentWidth - scrollContentContainerWidth : _d, _e = _a.SH, SH = _e === void 0 ? scrollContentHeight - scrollContentContainerHeight : _e;
    var _f = getScrollPosition(-scrollBarLeft * SW / BW, -scrollBarTop * SH / BH, {
        scrollWidth: scrollContentWidth,
        scrollHeight: scrollContentHeight,
        clientWidth: scrollContentContainerWidth,
        clientHeight: scrollContentContainerHeight,
    }), scrollLeft = _f.scrollLeft, scrollTop = _f.scrollTop;
    return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
    };
}
exports.getScrollPositionByScrollBar = getScrollPositionByScrollBar;
//# sourceMappingURL=_scroll.js.map