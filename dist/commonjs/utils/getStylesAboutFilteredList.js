"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStylesAboutFilteredList(_list, options, styles) {
    var _a = styles.elHeight, elHeight = _a === void 0 ? 0 : _a, _b = styles.headerHeight, headerHeight = _b === void 0 ? 0 : _b, _c = styles.footSumHeight, footSumHeight = _c === void 0 ? 0 : _c, _d = styles.bodyTrHeight, bodyTrHeight = _d === void 0 ? 0 : _d, _e = styles.horizontalScrollerHeight, horizontalScrollerHeight = _e === void 0 ? 0 : _e, _f = styles.pageHeight, pageHeight = _f === void 0 ? 0 : _f, _g = styles.scrollContentContainerHeight, scrollContentContainerHeight = _g === void 0 ? 0 : _g, _h = styles.verticalScrollerHeight, verticalScrollerHeight = _h === void 0 ? 0 : _h, _j = styles.CTInnerWidth, CTInnerWidth = _j === void 0 ? 0 : _j, _k = styles.asidePanelWidth, asidePanelWidth = _k === void 0 ? 0 : _k, _l = styles.frozenPanelWidth, frozenPanelWidth = _l === void 0 ? 0 : _l, _m = styles.rightPanelWidth, rightPanelWidth = _m === void 0 ? 0 : _m;
    var _o = options.scroller, optionsScroller = _o === void 0 ? {} : _o, _p = options.page, optionsPage = _p === void 0 ? {} : _p, _q = options.frozenRowIndex, frozenRowIndex = _q === void 0 ? 0 : _q;
    var _r = optionsPage.height, optionsPageHeight = _r === void 0 ? 0 : _r;
    var _s = optionsScroller.size, optionsScrollerSize = _s === void 0 ? 0 : _s, _t = optionsScroller.barMinSize, optionsScrollerBarMinSize = _t === void 0 ? 0 : _t;
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
    currentStyles.scrollContentContainerWidth =
        CTInnerWidth -
            asidePanelWidth -
            frozenPanelWidth -
            rightPanelWidth -
            currentStyles.verticalScrollerWidth;
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
