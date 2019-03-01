"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var DataGridPage = /** @class */ (function (_super) {
    __extends(DataGridPage, _super);
    function DataGridPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        return _this;
    }
    // onClickPageButton = (
    //   e: React.MouseEvent<HTMLElement>,
    //   userFunction: string | IDataGrid.userCallBackFunction,
    // ) => {
    //   const {
    //     data = [],
    //     scrollLeft = 0,
    //     scrollTop = 0,
    //     focusedRow = 0,
    //     options = {},
    //     styles = {},
    //     setStoreState,
    //   } = this.props;
    //   const { frozenRowIndex = 0 } = options;
    //   const {
    //     bodyTrHeight = 0,
    //     bodyHeight = 0,
    //     scrollContentWidth = 0,
    //     scrollContentHeight = 0,
    //     scrollContentContainerWidth = 0,
    //     scrollContentContainerHeight = 0,
    //   } = styles;
    //   const sRowIndex = Math.floor(-scrollTop / bodyTrHeight) + frozenRowIndex;
    //   const eRowIndex =
    //     Math.floor(-scrollTop / bodyTrHeight) +
    //     frozenRowIndex +
    //     Math.floor(bodyHeight / bodyTrHeight);
    //   const pRowSize = Math.floor(bodyHeight / bodyTrHeight);
    //   const getAvailScrollTop = (rowIndex: number): number => {
    //     let _scrollTop: number | undefined = undefined;
    //     if (sRowIndex >= rowIndex) {
    //       _scrollTop = -rowIndex * bodyTrHeight;
    //     } else if (eRowIndex <= rowIndex) {
    //       _scrollTop =
    //         -rowIndex * bodyTrHeight + (pRowSize * bodyTrHeight - bodyTrHeight);
    //     }
    //     if (typeof _scrollTop !== 'undefined') {
    //       _scrollTop = getScrollPosition(scrollLeft, _scrollTop, {
    //         scrollWidth: scrollContentWidth,
    //         scrollHeight: scrollContentHeight,
    //         clientWidth: scrollContentContainerWidth,
    //         clientHeight: scrollContentContainerHeight,
    //       }).scrollTop;
    //     } else {
    //       _scrollTop = scrollTop;
    //     }
    //     return _scrollTop;
    //   };
    //   const proc = {
    //     [DataGridEnums.PageButtonActions.PAGE_FIRST]: () => {
    //       const focusRow = 0;
    //       setStoreState({
    //         scrollTop: getAvailScrollTop(focusRow),
    //         selectionRows: {
    //           [focusRow]: true,
    //         },
    //         focusedRow: focusRow,
    //       });
    //     },
    //     [DataGridEnums.PageButtonActions.PAGE_PREV]: () => {
    //       const focusRow = focusedRow - pRowSize < 1 ? 0 : focusedRow - pRowSize;
    //       setStoreState({
    //         scrollTop: getAvailScrollTop(focusRow),
    //         selectionRows: {
    //           [focusRow]: true,
    //         },
    //         focusedRow: focusRow,
    //       });
    //     },
    //     [DataGridEnums.PageButtonActions.PAGE_BACK]: () => {
    //       let focusRow = focusedRow < 1 ? 0 : focusedRow - 1;
    //       setStoreState({
    //         scrollTop: getAvailScrollTop(focusRow),
    //         selectionRows: {
    //           [focusRow]: true,
    //         },
    //         focusedRow: focusRow,
    //       });
    //     },
    //     [DataGridEnums.PageButtonActions.PAGE_PLAY]: () => {
    //       let focusRow =
    //         focusedRow + 1 >= data.length
    //           ? data.length - 1
    //           : focusedRow + 1;
    //       setStoreState({
    //         scrollTop: getAvailScrollTop(focusRow),
    //         selectionRows: {
    //           [focusRow]: true,
    //         },
    //         focusedRow: focusRow,
    //       });
    //     },
    //     [DataGridEnums.PageButtonActions.PAGE_NEXT]: () => {
    //       let focusRow =
    //         focusedRow + pRowSize >= data.length
    //           ? data.length - 1
    //           : focusedRow + pRowSize;
    //       setStoreState({
    //         scrollTop: getAvailScrollTop(focusRow),
    //         selectionRows: {
    //           [focusRow]: true,
    //         },
    //         focusedRow: focusRow,
    //       });
    //     },
    //     [DataGridEnums.PageButtonActions.PAGE_LAST]: () => {
    //       const focusRow = data.length - 1;
    //       setStoreState({
    //         scrollTop: getAvailScrollTop(focusRow),
    //         selectionRows: {
    //           [focusRow]: true,
    //         },
    //         focusedRow: focusRow,
    //       });
    //     },
    //   };
    //   if (isFunction(userFunction)) {
    //     (userFunction as Function)();
    //   } else if (typeof userFunction === 'string' && userFunction in proc) {
    //     proc[userFunction]();
    //   }
    // };
    DataGridPage.prototype.render = function () {
        var _a = this.props, _b = _a.options, options = _b === void 0 ? {} : _b, _c = _a.styles, styles = _c === void 0 ? {} : _c, status = _a.status, _d = _a.data, data = _d === void 0 ? [] : _d;
        var horizontalScrollerWidth = styles.horizontalScrollerWidth;
        var _e = options.page, optionPage = _e === void 0 ? {} : _e;
        var height = optionPage.height;
        return (React.createElement("div", { className: "axui-datagrid-page", style: { height: styles.pageHeight } },
            React.createElement("div", { className: "axui-datagrid-page-status" }, status ? status : "Total " + utils_1.formatCurrency(data.length) + " Items"),
            React.createElement("div", { style: { width: horizontalScrollerWidth } })));
    };
    return DataGridPage;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridPage);
