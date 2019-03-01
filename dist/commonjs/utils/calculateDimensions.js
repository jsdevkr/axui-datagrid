"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateDimensions(storeState, _a) {
    var _b = _a.headerTable, headerTable = _b === void 0 ? { rows: [] } : _b, _c = _a.colGroup, colGroup = _c === void 0 ? [] : _c, _d = _a.headerColGroup, headerColGroup = _d === void 0 ? [] : _d, _e = _a.bodyRowTable, bodyRowTable = _e === void 0 ? { rows: [] } : _e, footSumColumns = _a.footSumColumns, _f = _a.data, data = _f === void 0 ? [] : _f, _g = _a.options, options = _g === void 0 ? {} : _g;
    var _h = storeState.width, width = _h === void 0 ? 0 : _h, _j = storeState.height, height = _j === void 0 ? 0 : _j;
    var _k = storeState.scrollLeft, scrollLeft = _k === void 0 ? 0 : _k, _l = storeState.scrollTop, scrollTop = _l === void 0 ? 0 : _l;
    var _m = options.header, optionsHeader = _m === void 0 ? {} : _m, _o = options.body, optionsBody = _o === void 0 ? {} : _o, _p = options.scroller, optionsScroller = _p === void 0 ? {} : _p, _q = options.page, optionsPage = _q === void 0 ? {} : _q, _r = options.frozenColumnIndex, frozenColumnIndex = _r === void 0 ? 0 : _r, _s = options.frozenRowIndex, frozenRowIndex = _s === void 0 ? 0 : _s, _t = options.lineNumberColumnWidth, lineNumberColumnWidth = _t === void 0 ? 0 : _t, _u = options.rowSelectorColumnWidth, rowSelectorColumnWidth = _u === void 0 ? 0 : _u, showLineNumber = options.showLineNumber, showRowSelector = options.showRowSelector;
    var _v = optionsHeader.display, optionsHeaderDisplay = _v === void 0 ? true : _v, _w = optionsHeader.columnHeight, optionsHeaderColumnHeight = _w === void 0 ? 0 : _w;
    var _x = optionsBody.columnHeight, optionsBodyColumnHeight = _x === void 0 ? 0 : _x;
    var _y = optionsPage.height, optionsPageHeight = _y === void 0 ? 0 : _y;
    var headerTableRowsLength = headerTable.rows.length;
    var bodyTablsRowsLength = bodyRowTable.rows.length;
    var dataLength = data.length;
    var _z = optionsScroller.theme, optionsScrollerTheme = _z === void 0 ? 'default' : _z, _0 = optionsScroller.width, optionsScrollerWidth = _0 === void 0 ? 0 : _0, _1 = optionsScroller.height, optionsScrollerHeight = _1 === void 0 ? 0 : _1, _2 = optionsScroller.padding, optionsScrollerPadding = _2 === void 0 ? 0 : _2, _3 = optionsScroller.arrowSize, optionsScrollerArrowSize = _3 === void 0 ? 0 : _3, _4 = optionsScroller.barMinSize, optionsScrollerBarMinSize = _4 === void 0 ? 0 : _4, _5 = optionsScroller.horizontalScrollerWidth, horizontalScrollerWidth = _5 === void 0 ? 0 : _5;
    if (optionsScrollerTheme === 'solid') {
        optionsScrollerArrowSize = 0;
    }
    var currentStyles = {};
    currentStyles.elWidth = width;
    currentStyles.elHeight = height;
    currentStyles.rightPanelWidth = 0;
    currentStyles.pageHeight = 0;
    currentStyles.asidePanelWidth =
        (showLineNumber ? lineNumberColumnWidth : 0) +
            (showRowSelector ? rowSelectorColumnWidth : 0);
    currentStyles.bodyTrHeight = bodyTablsRowsLength * optionsBodyColumnHeight;
    currentStyles.horizontalScrollerHeight = 0;
    currentStyles.frozenPanelWidth = (function (_colGroup, endIndex) {
        var width = 0;
        for (var i = 0, l = endIndex; i < l; i++) {
            if (_colGroup[i]) {
                width += _colGroup[i]._width || 0;
            }
        }
        return width;
    })(colGroup, frozenColumnIndex);
    currentStyles.headerHeight = optionsHeaderDisplay
        ? headerTableRowsLength * optionsHeaderColumnHeight
        : 0;
    currentStyles.frozenPanelHeight = frozenRowIndex * currentStyles.bodyTrHeight;
    currentStyles.footSumHeight =
        (footSumColumns ? footSumColumns.length : 0) * currentStyles.bodyTrHeight;
    currentStyles.pageHeight = optionsPageHeight;
    // currentStyles.pageButtonsContainerWidth = optionsPageButtonsContainerWidth;
    currentStyles.verticalScrollerWidth = 0;
    if (currentStyles.elHeight -
        currentStyles.headerHeight -
        optionsPageHeight -
        currentStyles.footSumHeight <
        dataLength * currentStyles.bodyTrHeight) {
        currentStyles.verticalScrollerWidth = optionsScrollerWidth;
    }
    currentStyles.horizontalScrollerHeight = (function () {
        if (colGroup) {
            var totalColGroupWidth = colGroup.reduce(function (prev, curr) {
                return prev + (curr._width || 0);
            }, 0);
            // aside 빼고, 수직 스크롤이 있으면 또 빼고 비교
            var bodyWidth = currentStyles.elWidth -
                currentStyles.asidePanelWidth -
                currentStyles.verticalScrollerWidth;
            return totalColGroupWidth > bodyWidth ? optionsScrollerHeight : 0;
        }
        else {
            return 0;
        }
    })();
    // scroll content width
    currentStyles.scrollContentWidth = headerColGroup.reduce(function (prev, curr) {
        return prev + (curr._width || 0);
    }, 0);
    currentStyles.scrollContentContainerWidth =
        currentStyles.elWidth -
            currentStyles.asidePanelWidth -
            currentStyles.frozenPanelWidth -
            currentStyles.rightPanelWidth;
    if (currentStyles.horizontalScrollerHeight > 0 &&
        currentStyles.elHeight -
            currentStyles.headerHeight -
            currentStyles.pageHeight -
            currentStyles.footSumHeight -
            currentStyles.horizontalScrollerHeight <
            dataLength * currentStyles.bodyTrHeight) {
        currentStyles.verticalScrollerWidth = optionsScrollerWidth;
    }
    // get bodyHeight
    currentStyles.bodyHeight =
        currentStyles.elHeight -
            currentStyles.headerHeight -
            currentStyles.pageHeight;
    // 스크롤컨텐츠의 컨테이너 높이.
    currentStyles.scrollContentContainerHeight =
        currentStyles.bodyHeight -
            currentStyles.frozenPanelHeight -
            currentStyles.footSumHeight;
    currentStyles.scrollContentHeight =
        currentStyles.bodyTrHeight *
            (dataLength > frozenRowIndex ? dataLength - frozenRowIndex : 0);
    currentStyles.verticalScrollerHeight =
        currentStyles.elHeight -
            currentStyles.headerHeight -
            currentStyles.pageHeight -
            optionsScrollerPadding * 2 -
            optionsScrollerArrowSize;
    currentStyles.horizontalScrollerWidth =
        (horizontalScrollerWidth / 100) * currentStyles.elWidth;
    currentStyles.scrollerPadding = optionsScrollerPadding;
    currentStyles.scrollerArrowSize = optionsScrollerArrowSize;
    // console.log(
    //   `optionsScrollerPadding : ${optionsScrollerPadding}, optionsScrollerArrowSize: ${optionsScrollerArrowSize}`,
    // );
    currentStyles.verticalScrollBarHeight = currentStyles.scrollContentHeight
        ? (currentStyles.scrollContentContainerHeight *
            currentStyles.verticalScrollerHeight) /
            currentStyles.scrollContentHeight
        : 0;
    if (optionsScrollerBarMinSize > currentStyles.verticalScrollBarHeight) {
        currentStyles.verticalScrollBarHeight = optionsScrollerBarMinSize;
    }
    currentStyles.horizontalScrollBarWidth = currentStyles.scrollContentWidth
        ? (currentStyles.scrollContentContainerWidth *
            currentStyles.horizontalScrollerWidth) /
            currentStyles.scrollContentWidth
        : 0;
    if (optionsScrollerBarMinSize > currentStyles.horizontalScrollBarWidth) {
        currentStyles.horizontalScrollBarWidth = optionsScrollerBarMinSize;
    }
    // scrollLeft, scrollTop의 위치가 맞지 않으면 조정.
    if (scrollLeft !== 0 &&
        currentStyles.scrollContentWidth +
            scrollLeft +
            currentStyles.scrollerArrowSize <
            currentStyles.scrollContentContainerWidth) {
        scrollLeft =
            currentStyles.scrollContentContainerWidth -
                currentStyles.scrollContentWidth -
                currentStyles.scrollerArrowSize;
        if (scrollLeft > 0) {
            scrollLeft = 0;
        }
    }
    if (scrollTop !== 0 &&
        currentStyles.scrollContentHeight +
            scrollTop +
            currentStyles.scrollerArrowSize <
            currentStyles.scrollContentContainerHeight) {
        scrollTop =
            currentStyles.scrollContentContainerHeight -
                currentStyles.scrollContentHeight -
                currentStyles.scrollerArrowSize;
        if (scrollTop > 0) {
            scrollTop = 0;
        }
    }
    return {
        scrollLeft: scrollLeft,
        scrollTop: scrollTop,
        styles: currentStyles,
    };
}
exports.default = calculateDimensions;
