"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStylesAboutFilteredList(_list, options, styles) {
    var _a = styles.elHeight, elHeight = _a === void 0 ? 0 : _a, _b = styles.headerHeight, headerHeight = _b === void 0 ? 0 : _b, _c = styles.footSumHeight, footSumHeight = _c === void 0 ? 0 : _c, _d = styles.bodyTrHeight, bodyTrHeight = _d === void 0 ? 0 : _d, _e = styles.horizontalScrollerHeight, horizontalScrollerHeight = _e === void 0 ? 0 : _e, _f = styles.pageHeight, pageHeight = _f === void 0 ? 0 : _f, _g = styles.scrollContentContainerHeight, scrollContentContainerHeight = _g === void 0 ? 0 : _g, _h = styles.verticalScrollerHeight, verticalScrollerHeight = _h === void 0 ? 0 : _h;
    var _j = options.scroller, optionsScroller = _j === void 0 ? {} : _j, _k = options.page, optionsPage = _k === void 0 ? {} : _k, _l = options.frozenRowIndex, frozenRowIndex = _l === void 0 ? 0 : _l;
    var _m = optionsPage.height, optionsPageHeight = _m === void 0 ? 0 : _m;
    var _o = optionsScroller.size, optionsScrollerSize = _o === void 0 ? 0 : _o, _p = optionsScroller.barMinSize, optionsScrollerBarMinSize = _p === void 0 ? 0 : _p;
    var dataLength = _list ? _list.length : 0;
    var currentStyles = {};
    currentStyles.frozenPanelHeight = frozenRowIndex * bodyTrHeight;
    currentStyles.scrollContentHeight =
        bodyTrHeight *
            (dataLength > frozenRowIndex ? dataLength - frozenRowIndex : 0);
    currentStyles.verticalScrollerWidth = 0;
    if (elHeight - headerHeight - optionsPageHeight - footSumHeight <
        dataLength * bodyTrHeight) {
        currentStyles.verticalScrollerWidth = optionsScrollerSize;
    }
    currentStyles.verticalScrollBarHeight = currentStyles.scrollContentHeight
        ? scrollContentContainerHeight *
            verticalScrollerHeight /
            currentStyles.scrollContentHeight
        : 0;
    if (optionsScrollerBarMinSize > currentStyles.verticalScrollBarHeight) {
        currentStyles.verticalScrollBarHeight = optionsScrollerBarMinSize;
    }
    if (horizontalScrollerHeight > 0 &&
        elHeight -
            headerHeight -
            pageHeight -
            footSumHeight -
            horizontalScrollerHeight <
            dataLength * bodyTrHeight) {
        currentStyles.verticalScrollerWidth = optionsScrollerSize;
    }
    currentStyles.scrollContentHeight =
        bodyTrHeight *
            (dataLength > frozenRowIndex ? dataLength - frozenRowIndex : 0);
    return currentStyles;
}
exports.default = getStylesAboutFilteredList;
//# sourceMappingURL=getStylesAboutFilteredList.js.map