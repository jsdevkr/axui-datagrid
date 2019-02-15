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
var DataGridHeaderCell_1 = require("./DataGridHeaderCell");
var DataGridTableColGroup_1 = require("./DataGridTableColGroup");
var _enums_1 = require("../common/@enums");
var TableBody = function (_a) {
    var bodyRow = _a.bodyRow, onClick = _a.onClick;
    return (React.createElement("tbody", null, bodyRow.rows.map(function (row, ri) { return (React.createElement("tr", { key: ri },
        row.cols.map(function (col, ci) { return (React.createElement(DataGridHeaderCell_1.default, { key: ci, bodyRow: bodyRow, ri: ri, col: col, onClick: onClick })); }),
        React.createElement("td", null))); })));
};
var ColumnResizer = function (_a) {
    var colGroup = _a.colGroup, resizerHeight = _a.resizerHeight, onMouseDownColumnResizer = _a.onMouseDownColumnResizer, onDoubleClickColumnResizer = _a.onDoubleClickColumnResizer;
    var resizerLeft = 0;
    var resizerWidth = 4;
    return (React.createElement(React.Fragment, null, colGroup.map(function (col, ci) {
        if (col.colIndex !== null && typeof col.colIndex !== 'undefined') {
            var prevResizerLeft = resizerLeft;
            resizerLeft += col._width || 0;
            return (React.createElement("div", { key: ci, "data-column-resizer": col.colIndex, "data-prev-left": prevResizerLeft, "data-left": resizerLeft, style: {
                    width: resizerWidth,
                    height: resizerHeight + 'px',
                    left: resizerLeft - resizerWidth / 2 + 'px',
                }, onMouseDown: function (e) { return onMouseDownColumnResizer(e, col); }, onDoubleClick: function (e) { return onDoubleClickColumnResizer(e, col); } }));
        }
        else {
            return null;
        }
    })));
};
var DataGridHeaderPanel = /** @class */ (function (_super) {
    __extends(DataGridHeaderPanel, _super);
    function DataGridHeaderPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.onHandleClick = function (e, col) {
            var _a;
            var _b = _this.props, _c = _b.filteredList, filteredList = _c === void 0 ? [] : _c, _d = _b.colGroup, colGroup = _d === void 0 ? [] : _d, _e = _b.scrollLeft, scrollLeft = _e === void 0 ? 0 : _e, _f = _b.focusedCol, focusedCol = _f === void 0 ? 0 : _f, _g = _b.isColumnFilter, isColumnFilter = _g === void 0 ? false : _g, _h = _b.options, options = _h === void 0 ? {} : _h, _j = _b.styles, styles = _j === void 0 ? {} : _j, setStoreState = _b.setStoreState, dispatch = _b.dispatch;
            var _k = options.header, optionsHeader = _k === void 0 ? {} : _k;
            var key = col.key, _l = col.colIndex, colIndex = _l === void 0 ? 0 : _l;
            var _m = styles.asidePanelWidth, asidePanelWidth = _m === void 0 ? 0 : _m;
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
                        dispatch(_enums_1.DataGridEnums.DispatchTypes.SELECT_ALL, {});
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
                                    state.selectionCols = (_a = {},
                                        _a[colIndex] = true,
                                        _a);
                                    state.focusedCol = colIndex;
                                }
                                setStoreState(state);
                            }
                            else if (optionsHeader.clickAction === 'sort' &&
                                optionsHeader.sortable) {
                                dispatch(_enums_1.DataGridEnums.DispatchTypes.SORT, { colIndex: colIndex });
                            }
                        }
                        break;
                }
                if (key === '_line_number_') {
                }
                else {
                }
            }
        };
        _this.onMouseDownColumnResizer = function (e, col) {
            e.preventDefault();
            var _a = _this.props, setStoreState = _a.setStoreState, rootNode = _a.rootNode, dispatch = _a.dispatch;
            var _b = (rootNode &&
                rootNode.current &&
                rootNode.current.getBoundingClientRect()).x, rootX = _b === void 0 ? 0 : _b;
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
                // 움직이지 않고 클릭만 했음에도, newWidth=0 으로 설정되어
                // 컬럼의 크기가 0으로 줄어들어 안보이는 경우가 있어
                // newWidth !== 0 을 추가
                if (typeof newWidth !== 'undefined' && newWidth !== 0) {
                    dispatch(_enums_1.DataGridEnums.DispatchTypes.RESIZE_COL, {
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
        _this.onDoubleClickColumnResizer = function (e, col) {
            e.preventDefault();
            var _a = _this.props, dispatch = _a.dispatch, _b = _a.filteredList, filteredList = _b === void 0 ? [] : _b, _c = _a.colGroup, colGroup = _c === void 0 ? [] : _c;
            if (_this.props.autofitColGroup) {
                var newWidth = _this.props.autofitColGroup[Number(col.colIndex)].tdWidth;
                dispatch(_enums_1.DataGridEnums.DispatchTypes.RESIZE_COL, {
                    col: col,
                    newWidth: newWidth,
                });
            }
        };
        return _this;
    }
    DataGridHeaderPanel.prototype.render = function () {
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
        var resizerHeight = optionsHeaderColumnHeight * bodyRow.rows.length -
            optionsHeaderColumnBorderWidth;
        return (React.createElement("div", { "data-panel": panelName, style: style },
            React.createElement("table", { style: { height: '100%' } },
                React.createElement(DataGridTableColGroup_1.default, { panelColGroup: colGroup }),
                React.createElement(TableBody, { bodyRow: bodyRow, onClick: this.onHandleClick })),
            panelName === 'aside-header' ? null : (React.createElement(ColumnResizer, { colGroup: colGroup, resizerHeight: resizerHeight, onMouseDownColumnResizer: this.onMouseDownColumnResizer, onDoubleClickColumnResizer: this.onDoubleClickColumnResizer }))));
    };
    return DataGridHeaderPanel;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridHeaderPanel);
