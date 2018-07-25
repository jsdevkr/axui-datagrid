"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getScrollPosition_1 = require("./getScrollPosition");
function getScrollPositionByScrollBar(scrollBarLeft, scrollBarTop, { horizontalScrollerWidth, verticalScrollerHeight, horizontalScrollBarWidth, verticalScrollBarHeight, scrollContentWidth, scrollContentHeight, scrollContentContainerWidth, scrollContentContainerHeight, BW = horizontalScrollerWidth - horizontalScrollBarWidth, BH = verticalScrollerHeight - verticalScrollBarHeight, SW = scrollContentWidth - scrollContentContainerWidth, SH = scrollContentHeight - scrollContentContainerHeight, }) {
    let { scrollLeft, scrollTop, endOfScrollLeft, endOfScrollTop, } = getScrollPosition_1.default(-scrollBarLeft * SW / BW, -scrollBarTop * SH / BH, {
        scrollWidth: scrollContentWidth,
        scrollHeight: scrollContentHeight,
        clientWidth: scrollContentContainerWidth,
        clientHeight: scrollContentContainerHeight,
    });
    return {
        scrollLeft,
        scrollTop,
        endOfScrollLeft,
        endOfScrollTop,
    };
}
exports.getScrollPositionByScrollBar = getScrollPositionByScrollBar;
exports.default = getScrollPositionByScrollBar;
//# sourceMappingURL=getScrollPositionByScrollBar.js.map