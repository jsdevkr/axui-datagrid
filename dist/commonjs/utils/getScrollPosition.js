"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getScrollPosition(scrollLeft, scrollTop, _a) {
    var scrollWidth = _a.scrollWidth, scrollHeight = _a.scrollHeight, clientWidth = _a.clientWidth, clientHeight = _a.clientHeight;
    var endOfScrollTop = false;
    var endOfScrollLeft = false;
    if (clientHeight > scrollHeight) {
        scrollTop = 0;
    }
    else if (scrollTop > 0) {
        scrollTop = 0;
        endOfScrollTop = true;
    }
    else if (clientHeight > scrollHeight + scrollTop) {
        // scrollHeight
        scrollTop = clientHeight - scrollHeight;
        endOfScrollTop = true;
    }
    if (clientWidth > scrollWidth) {
        scrollLeft = 0;
    }
    else if (scrollLeft > 0) {
        scrollLeft = 0;
        endOfScrollLeft = true;
    }
    else if (clientWidth > scrollWidth + scrollLeft) {
        // scrollHeight
        scrollLeft = clientWidth - scrollWidth;
        endOfScrollLeft = true;
    }
    return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        endOfScrollTop: endOfScrollTop,
        endOfScrollLeft: endOfScrollLeft,
    };
}
exports.getScrollPosition = getScrollPosition;
exports.default = getScrollPosition;
