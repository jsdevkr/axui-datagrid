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
var TableBody = /** @class */ (function (_super) {
    __extends(TableBody, _super);
    function TableBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableBody.prototype.render = function () {
        var _a = this.props, bodyRow = _a.bodyRow, listSelectedAll = _a.listSelectedAll, options = _a.options, focusedCol = _a.focusedCol, selectionCols = _a.selectionCols, sortInfo = _a.sortInfo, onClick = _a.onClick;
        return (React.createElement("tbody", null, bodyRow.rows.map(function (row, ri) { return (React.createElement("tr", { key: ri },
            row.cols.map(function (col, ci) { return (React.createElement(DataGridHeaderCell_1.default, { key: ci, listSelectedAll: listSelectedAll, options: options, focusedCol: focusedCol, selectionCols: selectionCols, sortInfo: sortInfo, bodyRow: bodyRow, ri: ri, col: col, onClick: onClick })); }),
            React.createElement("td", null))); })));
    };
    return TableBody;
}(React.PureComponent));
var ColumnResizer = /** @class */ (function (_super) {
    __extends(ColumnResizer, _super);
    function ColumnResizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnResizer.prototype.render = function () {
        var _a = this.props, colGroup = _a.colGroup, resizerHeight = _a.resizerHeight, onMouseDownColumnResizer = _a.onMouseDownColumnResizer, onDoubleClickColumnResizer = _a.onDoubleClickColumnResizer;
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
    return ColumnResizer;
}(React.PureComponent));
var DataGridHeaderPanel = /** @class */ (function (_super) {
    __extends(DataGridHeaderPanel, _super);
    function DataGridHeaderPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.onHandleClick = function (e, col) {
            var _a;
            var _b = _this.props, _c = _b.data, data = _c === void 0 ? [] : _c, _d = _b.colGroup, colGroup = _d === void 0 ? [] : _d, _e = _b.focusedCol, focusedCol = _e === void 0 ? 0 : _e, _f = _b.options, options = _f === void 0 ? {} : _f, _g = _b.styles, styles = _g === void 0 ? {} : _g, setStoreState = _b.setStoreState, dispatch = _b.dispatch;
            var _h = options.header, optionsHeader = _h === void 0 ? {} : _h;
            var key = col.key, _j = col.colIndex, colIndex = _j === void 0 ? 0 : _j;
            var _k = styles.asidePanelWidth, asidePanelWidth = _k === void 0 ? 0 : _k;
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
                            data.forEach(function (item, i) {
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
                                data.forEach(function (item, i) {
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
            var _a = _this.props, dispatch = _a.dispatch, autofitColGroup = _a.autofitColGroup;
            if (autofitColGroup && autofitColGroup[Number(col.colIndex)]) {
                var newWidth = autofitColGroup[Number(col.colIndex)].tdWidth;
                dispatch(_enums_1.DataGridEnums.DispatchTypes.RESIZE_COL, {
                    col: col,
                    newWidth: newWidth,
                });
            }
        };
        return _this;
    }
    DataGridHeaderPanel.prototype.render = function () {
        var _a = this.props, panelName = _a.panelName, style = _a.style, _b = _a.asideColGroup, asideColGroup = _b === void 0 ? [] : _b, _c = _a.asideHeaderData, asideHeaderData = _c === void 0 ? { rows: [{ cols: [] }] } : _c, _d = _a.leftHeaderColGroup, leftHeaderColGroup = _d === void 0 ? [] : _d, _e = _a.leftHeaderData, leftHeaderData = _e === void 0 ? { rows: [{ cols: [] }] } : _e, _f = _a.headerColGroup, headerColGroup = _f === void 0 ? [] : _f, _g = _a.headerData, headerData = _g === void 0 ? { rows: [{ cols: [] }] } : _g, _h = _a.options, options = _h === void 0 ? {} : _h, _j = _a.styles, styles = _j === void 0 ? {} : _j, _k = _a.listSelectedAll, listSelectedAll = _k === void 0 ? false : _k, _l = _a.focusedCol, focusedCol = _l === void 0 ? -1 : _l, _m = _a.selectionCols, selectionCols = _m === void 0 ? {} : _m, _o = _a.sortInfo, sortInfo = _o === void 0 ? {} : _o;
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
        var _p = options.header, optionsHeader = _p === void 0 ? {} : _p;
        var _q = optionsHeader.columnHeight, optionsHeaderColumnHeight = _q === void 0 ? 0 : _q, _r = optionsHeader.columnBorderWidth, optionsHeaderColumnBorderWidth = _r === void 0 ? 0 : _r;
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
                React.createElement(TableBody, { listSelectedAll: listSelectedAll, options: options, focusedCol: focusedCol, selectionCols: selectionCols, sortInfo: sortInfo, bodyRow: bodyRow, onClick: this.onHandleClick })),
            panelName === 'aside-header' ? null : (React.createElement(ColumnResizer, { colGroup: colGroup, resizerHeight: resizerHeight, onMouseDownColumnResizer: this.onMouseDownColumnResizer, onDoubleClickColumnResizer: this.onDoubleClickColumnResizer }))));
    };
    return DataGridHeaderPanel;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridHeaderPanel);
