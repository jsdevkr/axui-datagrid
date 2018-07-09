"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getScrollPosition(scrollLeft, scrollTop, { scrollWidth, scrollHeight, clientWidth, clientHeight, }) {
    let endScroll = false;
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
        scrollLeft,
        scrollTop,
        endScroll,
    };
}
exports.getScrollPosition = getScrollPosition;
exports.default = getScrollPosition;
//# sourceMappingURL=getScrollPosition.js.map