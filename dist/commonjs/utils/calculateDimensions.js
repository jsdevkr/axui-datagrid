"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var setColGroupWidth_1 = require("./setColGroupWidth");
function calculateDimensions(containerDOM, state, toBeFilteredList) {
    var _a = state.filteredList, filteredList = _a === void 0 ? [] : _a, _b = state.colGroup, colGroup = _b === void 0 ? [] : _b, headerTable = state.headerTable, footSumColumns = state.footSumColumns, _c = state.options, options = _c === void 0 ? {} : _c, _d = state.styles, styles = _d === void 0 ? {} : _d, _e = state.height, height = _e === void 0 ? 0 : _e, _f = state.width, width = _f === void 0 ? 0 : _f;
    var _g = state.scrollLeft, scrollLeft = _g === void 0 ? 0 : _g, _h = state.scrollTop, scrollTop = _h === void 0 ? 0 : _h;
    var list = toBeFilteredList || filteredList;
    var _j = options.header, optionsHeader = _j === void 0 ? {} : _j, _k = options.scroller, optionsScroller = _k === void 0 ? {} : _k, _l = options.page, optionsPage = _l === void 0 ? {} : _l, _m = options.frozenColumnIndex, frozenColumnIndex = _m === void 0 ? 0 : _m, _o = options.frozenRowIndex, frozenRowIndex = _o === void 0 ? 0 : _o;
    var _p = optionsHeader.display, optionsHeaderDisplay = _p === void 0 ? true : _p, _q = optionsHeader.columnHeight, optionsHeaderColumnHeight = _q === void 0 ? 0 : _q;
    var _r = optionsPage.height, optionsPageHeight = _r === void 0 ? 0 : _r, _s = optionsPage.buttonsContainerWidth, optionsPageButtonsContainerWidth = _s === void 0 ? 0 : _s;
    var _t = optionsScroller.size, optionsScrollerSize = _t === void 0 ? 0 : _t, optionsScrollerDisabledVerticalScroll = optionsScroller.disabledVerticalScroll, _u = optionsScroller.padding, optionsScrollerPadding = _u === void 0 ? 0 : _u, _v = optionsScroller.arrowSize, optionsScrollerArrowSize = _v === void 0 ? 0 : _v, _w = optionsScroller.barMinSize, optionsScrollerBarMinSize = _w === void 0 ? 0 : _w;
    var headerTableRowsLength = headerTable ? headerTable.rows.length || 0 : 0;
    var dataLength = list ? list.length : 0;
    var currentStyles = __assign({}, styles);
    var currentColGroup = [];
    var currentHeaderColGroup = [];
    currentStyles.calculatedHeight = null; // props에의해 정해진 height가 아닌 내부에서 계산된 높이를 사용하고 싶은 경우 숫자로 값 지정
    currentStyles.CTInnerWidth = currentStyles.elWidth = width;
    currentStyles.CTInnerHeight = currentStyles.elHeight = height;
    currentStyles.rightPanelWidth = 0;
    currentStyles.pageHeight = 0;
    currentStyles.asidePanelWidth = currentStyles.asidePanelWidth || 0;
    currentStyles.bodyTrHeight = currentStyles.bodyTrHeight || 0;
    currentStyles.horizontalScrollerHeight =
        currentStyles.horizontalScrollerHeight || 0;
    currentStyles.pageButtonsContainerWidth =
        currentStyles.pageButtonsContainerWidth || 0;
    currentColGroup = setColGroupWidth_1.default(colGroup, {
        width: currentStyles.elWidth -
            currentStyles.asidePanelWidth +
            optionsScrollerSize,
    }, options);
    currentHeaderColGroup = currentColGroup.slice(frozenColumnIndex);
    currentStyles.frozenPanelWidth = (function (_colGroup, endIndex) {
        var width = 0;
        for (var i = 0, l = endIndex; i < l; i++) {
            if (_colGroup[i]) {
                width += _colGroup[i]._width || 0;
            }
        }
        return width;
    })(currentColGroup, frozenColumnIndex);
    currentStyles.headerHeight = optionsHeaderDisplay
        ? headerTableRowsLength * optionsHeaderColumnHeight
        : 0;
    currentStyles.frozenPanelHeight = frozenRowIndex * currentStyles.bodyTrHeight;
    currentStyles.footSumHeight =
        (footSumColumns ? footSumColumns.length : 0) * currentStyles.bodyTrHeight;
    currentStyles.pageHeight = optionsPageHeight;
    currentStyles.pageButtonsContainerWidth = optionsPageButtonsContainerWidth;
    currentStyles.verticalScrollerWidth = 0;
    if (currentStyles.elHeight -
        currentStyles.headerHeight -
        optionsPageHeight -
        currentStyles.footSumHeight <
        dataLength * currentStyles.bodyTrHeight) {
        currentStyles.verticalScrollerWidth = optionsScrollerSize;
    }
    currentStyles.horizontalScrollerHeight = (function () {
        if (currentColGroup) {
            var totalColGroupWidth = currentColGroup.reduce(function (prev, curr) {
                return prev + (curr._width || 0);
            }, 0);
            // aside 빼고, 수직 스크롤이 있으면 또 빼고 비교
            var bodyWidth = currentStyles.elWidth -
                currentStyles.asidePanelWidth -
                currentStyles.verticalScrollerWidth;
            return totalColGroupWidth > bodyWidth ? optionsScrollerSize : 0;
        }
        else {
            return 0;
        }
    })();
    // scroll content width
    currentStyles.scrollContentWidth = currentHeaderColGroup.reduce(function (prev, curr) {
        return prev + (curr._width || 0);
    }, 0);
    currentStyles.scrollContentContainerWidth =
        currentStyles.CTInnerWidth -
            currentStyles.asidePanelWidth -
            currentStyles.frozenPanelWidth -
            currentStyles.rightPanelWidth -
            currentStyles.verticalScrollerWidth;
    if (currentStyles.horizontalScrollerHeight > 0 &&
        currentStyles.elHeight -
            currentStyles.headerHeight -
            currentStyles.pageHeight -
            currentStyles.footSumHeight -
            currentStyles.horizontalScrollerHeight <
            dataLength * currentStyles.bodyTrHeight) {
        currentStyles.verticalScrollerWidth = optionsScrollerSize;
    }
    currentStyles.CTInnerHeight =
        currentStyles.elHeight - currentStyles.pageHeight;
    // get bodyHeight
    currentStyles.bodyHeight =
        currentStyles.CTInnerHeight - currentStyles.headerHeight;
    // 스크롤컨텐츠의 컨테이너 높이.
    currentStyles.scrollContentContainerHeight =
        currentStyles.bodyHeight -
            currentStyles.frozenPanelHeight -
            currentStyles.footSumHeight;
    currentStyles.scrollContentHeight =
        currentStyles.bodyTrHeight *
            (dataLength > frozenRowIndex ? dataLength - frozenRowIndex : 0);
    if (optionsScrollerDisabledVerticalScroll) {
        currentStyles.calculatedHeight =
            dataLength * currentStyles.bodyTrHeight +
                currentStyles.headerHeight +
                currentStyles.pageHeight;
        currentStyles.bodyHeight =
            currentStyles.calculatedHeight -
                currentStyles.headerHeight -
                currentStyles.pageHeight;
        currentStyles.verticalScrollerWidth = 0;
        currentStyles.CTInnerWidth = currentStyles.elWidth;
        currentStyles.scrollContentContainerWidth =
            currentStyles.CTInnerWidth -
                currentStyles.asidePanelWidth -
                currentStyles.frozenPanelWidth -
                currentStyles.rightPanelWidth;
        currentStyles.scrollContentContainerHeight =
            currentStyles.scrollContentHeight;
    }
    currentStyles.verticalScrollerHeight =
        currentStyles.elHeight -
            currentStyles.pageHeight -
            optionsScrollerPadding * 2 -
            optionsScrollerArrowSize;
    currentStyles.horizontalScrollerWidth =
        currentStyles.elWidth -
            currentStyles.verticalScrollerWidth -
            currentStyles.pageButtonsContainerWidth -
            optionsScrollerPadding * 2 -
            optionsScrollerArrowSize;
    currentStyles.scrollerPadding = optionsScrollerPadding;
    currentStyles.scrollerArrowSize = optionsScrollerArrowSize;
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
        colGroup: currentColGroup,
        leftHeaderColGroup: currentColGroup.slice(0, frozenColumnIndex),
        headerColGroup: currentHeaderColGroup,
    };
}
exports.default = calculateDimensions;
