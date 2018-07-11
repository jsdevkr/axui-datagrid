"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var getWidthHeight_1 = require("./getWidthHeight");
var setColGroupWidth_1 = require("./setColGroupWidth");
function calculateDimensions(containerDOM, state, toBeFilteredList) {
    var _a = state.filteredList, filteredList = _a === void 0 ? [] : _a, _b = state.colGroup, colGroup = _b === void 0 ? [] : _b, headerTable = state.headerTable, footSumColumns = state.footSumColumns, _c = state.options, options = _c === void 0 ? {} : _c, _d = state.styles, styles = _d === void 0 ? {} : _d, _e = state.height, height = _e === void 0 ? 0 : _e;
    var list = toBeFilteredList || filteredList;
    var _f = options.header, optionsHeader = _f === void 0 ? {} : _f, _g = options.scroller, optionsScroller = _g === void 0 ? {} : _g, _h = options.page, optionsPage = _h === void 0 ? {} : _h;
    var _j = options || {}, _k = _j.frozenColumnIndex, frozenColumnIndex = _k === void 0 ? 0 : _k, _l = _j.frozenRowIndex, frozenRowIndex = _l === void 0 ? 0 : _l;
    var _m = optionsHeader.display, optionsHeaderDisplay = _m === void 0 ? true : _m, _o = optionsHeader.columnHeight, optionsHeaderColumnHeight = _o === void 0 ? 0 : _o;
    var _p = optionsPage.height, optionsPageHeight = _p === void 0 ? 0 : _p, _q = optionsPage.buttonsContainerWidth, optionsPageButtonsContainerWidth = _q === void 0 ? 0 : _q;
    var _r = optionsScroller.size, optionsScrollerSize = _r === void 0 ? 0 : _r, optionsScrollerDisabledVerticalScroll = optionsScroller.disabledVerticalScroll, _s = optionsScroller.padding, optionsScrollerPadding = _s === void 0 ? 0 : _s, _t = optionsScroller.arrowSize, optionsScrollerArrowSize = _t === void 0 ? 0 : _t, _u = optionsScroller.barMinSize, optionsScrollerBarMinSize = _u === void 0 ? 0 : _u;
    var headerTableRowsLength = headerTable ? headerTable.rows.length || 0 : 0;
    var dataLength = list ? list.length : 0;
    var currentStyles = __assign({}, styles);
    var currentColGroup = [];
    var currentHeaderColGroup = [];
    currentStyles.calculatedHeight = null; // props에의해 정해진 height가 아닌 내부에서 계산된 높이를 사용하고 싶은 경우 숫자로 값 지정
    currentStyles.CTInnerWidth = currentStyles.elWidth = getWidthHeight_1.getOuterWidth(containerDOM);
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
        ? currentStyles.scrollContentContainerHeight *
            currentStyles.verticalScrollerHeight /
            currentStyles.scrollContentHeight
        : 0;
    if (optionsScrollerBarMinSize > currentStyles.verticalScrollBarHeight) {
        currentStyles.verticalScrollBarHeight = optionsScrollerBarMinSize;
    }
    currentStyles.horizontalScrollBarWidth = currentStyles.scrollContentWidth
        ? currentStyles.scrollContentContainerWidth *
            currentStyles.horizontalScrollerWidth /
            currentStyles.scrollContentWidth
        : 0;
    if (optionsScrollerBarMinSize > currentStyles.horizontalScrollBarWidth) {
        currentStyles.horizontalScrollBarWidth = optionsScrollerBarMinSize;
    }
    return {
        styles: currentStyles,
        colGroup: currentColGroup,
        leftHeaderColGroup: currentColGroup.slice(0, frozenColumnIndex),
        headerColGroup: currentHeaderColGroup,
    };
}
exports.default = calculateDimensions;
//# sourceMappingURL=calculateDimensions.js.map