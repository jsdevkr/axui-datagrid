"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var stores_1 = require("../stores");
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var DataGridHeaderCell_1 = require("./DataGridHeaderCell");
var DataGridHeaderPanel = /** @class */ (function (_super) {
    __extends(DataGridHeaderPanel, _super);
    function DataGridHeaderPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.onClick = function (e, col) {
            var _a = _this.props, _b = _a.filteredList, filteredList = _b === void 0 ? [] : _b, _c = _a.colGroup, colGroup = _c === void 0 ? [] : _c, _d = _a.scrollLeft, scrollLeft = _d === void 0 ? 0 : _d, _e = _a.focusedCol, focusedCol = _e === void 0 ? 0 : _e, _f = _a.isColumnFilter, isColumnFilter = _f === void 0 ? false : _f, _g = _a.options, options = _g === void 0 ? {} : _g, _h = _a.styles, styles = _h === void 0 ? {} : _h, setStoreState = _a.setStoreState, dispatch = _a.dispatch;
            var _j = options.header, optionsHeader = _j === void 0 ? {} : _j;
            var key = col.key, _k = col.colIndex, colIndex = _k === void 0 ? 0 : _k;
            var _l = styles.asidePanelWidth, asidePanelWidth = _l === void 0 ? 0 : _l;
            if (e.target.getAttribute('data-filter')) {
                var closeEvent_1 = function (ee) {
                    var _isColumnFilter = _this.props.isColumnFilter;
                    if (ee.target &&
                        ee.target.getAttribute &&
                        '' + _isColumnFilter === ee.target.getAttribute('data-filter-index')) {
                        return false;
                    }
                    var downedElement = false;
                    if (ee.target) {
                        downedElement = utils_1.findParentNode(ee.target, function (element) {
                            return element && element.getAttribute
                                ? element.getAttribute('data-column-filter') === 'true'
                                : false;
                        });
                    }
                    if (downedElement === false) {
                        ee.preventDefault();
                        setStoreState({
                            isColumnFilter: false,
                        });
                        document.removeEventListener('mouseup', closeEvent_1);
                        document.removeEventListener('mouseleave', closeEvent_1);
                        document.removeEventListener('keydown', keyDown_1);
                    }
                    return;
                };
                var keyDown_1 = function (ee) {
                    if (ee.which === 27) {
                        closeEvent_1(ee);
                    }
                };
                if (isColumnFilter === colIndex) {
                    setStoreState({
                        isColumnFilter: false,
                    });
                    document.removeEventListener('mouseup', closeEvent_1);
                    document.removeEventListener('mouseleave', closeEvent_1);
                    document.removeEventListener('keydown', keyDown_1);
                }
                else {
                    var columnFilterLeft = asidePanelWidth + (colGroup[colIndex]._sx || 0) - 2 + scrollLeft;
                    setStoreState({
                        scrollLeft: columnFilterLeft < 0 ? scrollLeft - columnFilterLeft : scrollLeft,
                        isColumnFilter: colIndex,
                    });
                    document.removeEventListener('mouseup', closeEvent_1);
                    document.removeEventListener('mouseleave', closeEvent_1);
                    document.removeEventListener('keydown', keyDown_1);
                    document.addEventListener('mouseup', closeEvent_1);
                    document.addEventListener('mouseleave', closeEvent_1);
                    document.addEventListener('keydown', keyDown_1);
                }
            }
            else {
                var state = {
                    dragging: false,
                    selectionRows: {},
                    selectionCols: {},
                    focusedRow: 0,
                    focusedCol: focusedCol,
                };
                switch (key) {
                    case '_line_number_':
                        {
                            state.selectionRows = (function () {
                                var rows = {};
                                filteredList.forEach(function (item, i) {
                                    rows[i] = true;
                                });
                                return rows;
                            })();
                            state.selectionCols = (function () {
                                var cols = {};
                                colGroup.forEach(function (_col) {
                                    cols[_col.colIndex || 0] = true;
                                });
                                return cols;
                            })();
                            state.focusedCol = 0;
                            setStoreState(state);
                        }
                        break;
                    case '_row_selector_':
                        dispatch(stores_1.DispatchTypes.SELECT_ALL, {});
                        break;
                    default:
                        {
                            if (optionsHeader.clickAction === 'select') {
                                state.selectionRows = (function () {
                                    var rows = {};
                                    filteredList.forEach(function (item, i) {
                                        rows[i] = true;
                                    });
                                    return rows;
                                })();
                                if (e.shiftKey) {
                                    state.selectionCols = (function () {
                                        var cols = {};
                                        utils_1.arrayFromRange(Math.min(focusedCol, colIndex), Math.max(focusedCol, colIndex) + 1).forEach(function (i) {
                                            cols[i] = true;
                                        });
                                        return cols;
                                    })();
                                }
                                else {
                                    state.selectionCols = (_m = {},
                                        _m[colIndex] = true,
                                        _m);
                                    state.focusedCol = colIndex;
                                }
                                setStoreState(state);
                            }
                            else if (optionsHeader.clickAction === 'sort' &&
                                optionsHeader.sortable) {
                                dispatch(stores_1.DispatchTypes.SORT, { colIndex: colIndex });
                            }
                        }
                        break;
                }
                if (key === '_line_number_') {
                }
                else {
                }
            }
            var _m;
        };
        _this.onMouseDownColumnResizer = function (e, col) {
            e.preventDefault();
            var _a = _this.props, setStoreState = _a.setStoreState, getRootNode = _a.getRootNode, dispatch = _a.dispatch;
            var rootNode = utils_1.getNode(getRootNode);
            var _b = (rootNode && rootNode.getBoundingClientRect()).x, rootX = _b === void 0 ? 0 : _b;
            var resizer = e.target;
            var prevLeft = Number(resizer.getAttribute('data-prev-left'));
            var currLeft = Number(resizer.getAttribute('data-left'));
            var newWidth = 0;
            var startMousePosition = utils_1.getMousePosition(e).x;
            var onMouseMove = function (ee) {
                var x = utils_1.getMousePosition(ee).x;
                var newLeft = currLeft + x - startMousePosition;
                if (newLeft < prevLeft) {
                    newLeft = prevLeft;
                }
                newWidth = newLeft - prevLeft;
                setStoreState({
                    columnResizing: true,
                    columnResizerLeft: x - rootX + 1,
                });
            };
            var offEvent = function (ee) {
                ee.preventDefault();
                startMousePosition = null;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', offEvent);
                document.removeEventListener('mouseleave', offEvent);
                if (typeof newWidth !== 'undefined') {
                    dispatch(stores_1.DispatchTypes.RESIZE_COL, {
                        col: col,
                        newWidth: newWidth,
                    });
                }
                else {
                    setStoreState({
                        columnResizing: false,
                    });
                }
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', offEvent);
            document.addEventListener('mouseleave', offEvent);
        };
        return _this;
    }
    DataGridHeaderPanel.prototype.render = function () {
        var _this = this;
        var _a = this.props, panelName = _a.panelName, style = _a.style, _b = _a.asideColGroup, asideColGroup = _b === void 0 ? [] : _b, _c = _a.asideHeaderData, asideHeaderData = _c === void 0 ? { rows: [{ cols: [] }] } : _c, _d = _a.leftHeaderColGroup, leftHeaderColGroup = _d === void 0 ? [] : _d, _e = _a.leftHeaderData, leftHeaderData = _e === void 0 ? { rows: [{ cols: [] }] } : _e, _f = _a.headerColGroup, headerColGroup = _f === void 0 ? [] : _f, _g = _a.headerData, headerData = _g === void 0 ? { rows: [{ cols: [] }] } : _g, _h = _a.options, options = _h === void 0 ? {} : _h, _j = _a.styles, styles = _j === void 0 ? {} : _j;
        // aside-header가 필요하지 않은지 확인
        if (panelName === 'aside-header' &&
            styles &&
            styles.asidePanelWidth === 0) {
            return null;
        }
        // left-header가 필요하지 않은지 확인
        if (panelName === 'left-header' &&
            options &&
            options.frozenColumnIndex === 0) {
            return null;
        }
        var _k = options.header, optionsHeader = _k === void 0 ? {} : _k;
        var _l = optionsHeader.columnHeight, optionsHeaderColumnHeight = _l === void 0 ? 0 : _l, _m = optionsHeader.columnBorderWidth, optionsHeaderColumnBorderWidth = _m === void 0 ? 0 : _m;
        var colGroup = (function () {
            switch (panelName) {
                case 'aside-header':
                    return asideColGroup;
                case 'left-header':
                    return leftHeaderColGroup;
                default:
                    return headerColGroup;
            }
        })();
        var bodyRow = (function () {
            switch (panelName) {
                case 'aside-header':
                    return asideHeaderData;
                case 'left-header':
                    return leftHeaderData;
                default:
                    return headerData;
            }
        })();
        return (React.createElement("div", { "data-panel": panelName, style: style },
            React.createElement("table", { style: { height: '100%' } },
                React.createElement("colgroup", null,
                    colGroup.map(function (col, ci) { return (React.createElement("col", { key: ci, style: { width: col._width + 'px' } })); }),
                    React.createElement("col", null)),
                React.createElement("tbody", null, bodyRow.rows.map(function (row, ri) { return (React.createElement("tr", { key: ri, className: "" },
                    row.cols.map(function (col, ci) { return (React.createElement(DataGridHeaderCell_1.default, { key: ci, bodyRow: bodyRow, ri: ri, col: col, onClick: _this.onClick })); }),
                    React.createElement("td", null))); }))),
            (function () {
                if (panelName === 'aside-header') {
                    return null;
                }
                var resizerHeight = optionsHeaderColumnHeight * bodyRow.rows.length -
                    optionsHeaderColumnBorderWidth;
                var resizer, resizerLeft = 0, resizerWidth = 4;
                return colGroup.map(function (col, ci) {
                    if (col.colIndex !== null && typeof col.colIndex !== 'undefined') {
                        var prevResizerLeft = resizerLeft;
                        resizerLeft += col._width || 0;
                        resizer = (React.createElement("div", { key: ci, "data-column-resizer": col.colIndex, "data-prev-left": prevResizerLeft, "data-left": resizerLeft, style: {
                                width: resizerWidth,
                                height: resizerHeight + 'px',
                                left: resizerLeft - resizerWidth / 2 + 'px',
                            }, onMouseDown: function (e) { return _this.onMouseDownColumnResizer(e, col); } }));
                    }
                    return resizer;
                });
            })()));
    };
    return DataGridHeaderPanel;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridHeaderPanel);
//# sourceMappingURL=DataGridHeaderPanel.js.map