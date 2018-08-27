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
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var DataGridBodyBottomCell = /** @class */ (function (_super) {
    __extends(DataGridBodyBottomCell, _super);
    function DataGridBodyBottomCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        return _this;
    }
    DataGridBodyBottomCell.prototype.render = function () {
        var _a;
        var _b = this.props, _c = _b.filteredList, filteredList = _c === void 0 ? [] : _c, focusedRow = _b.focusedRow, focusedCol = _b.focusedCol, _d = _b.selectionRows, selectionRows = _d === void 0 ? [] : _d, _e = _b.selectionCols, selectionCols = _e === void 0 ? [] : _e, _f = _b.col, col = _f === void 0 ? {} : _f, ci = _b.ci, value = _b.value, _g = _b.options, options = _g === void 0 ? {} : _g, _h = _b.predefinedFormatter, predefinedFormatter = _h === void 0 ? {} : _h, _j = _b.predefinedCollector, predefinedCollector = _j === void 0 ? {} : _j;
        var _k = options.body, optionsBody = _k === void 0 ? {} : _k;
        var _l = optionsBody.columnHeight, columnHeight = _l === void 0 ? 0 : _l, _m = optionsBody.columnPadding, columnPadding = _m === void 0 ? 0 : _m, _o = optionsBody.columnBorderWidth, columnBorderWidth = _o === void 0 ? 0 : _o, _p = optionsBody.align, bodyAlign = _p === void 0 ? 'left' : _p;
        var _q = col.rowSpan, colRowSpan = _q === void 0 ? 0 : _q, _r = col.colIndex, colColIndex = _r === void 0 ? 0 : _r;
        var cellHeight = columnHeight * colRowSpan;
        var tdClassNames = (_a = {},
            _a['axui-datagrid-line-number'] = col.columnAttr === 'lineNumber',
            _a['axui-datagrid-row-selector'] = col.columnAttr === 'rowSelector',
            _a);
        var lineHeight = columnHeight - columnPadding * 2 - columnBorderWidth;
        var colAlign = col.align || bodyAlign || '';
        var label;
        var getLabel = function () {
            var collectorData = {
                data: filteredList,
                key: col.key,
            };
            var formatterData = {
                data: filteredList,
                key: col.key,
                value: '',
            };
            var labelValue;
            if (typeof col.collector === 'string' &&
                col.collector in predefinedCollector) {
                labelValue = predefinedCollector[col.collector](collectorData);
            }
            else if (utils_1.isFunction(col.collector)) {
                labelValue = col.collector(collectorData);
            }
            else {
                labelValue = col.label || '';
            }
            // collector로 구한 값을 formatter의 value로 사용
            formatterData.value = labelValue;
            if (typeof col.formatter === 'string' &&
                col.formatter in predefinedFormatter) {
                labelValue = predefinedFormatter[col.formatter](formatterData);
            }
            else if (utils_1.isFunction(col.formatter)) {
                labelValue = col.formatter(formatterData);
            }
            return labelValue;
        };
        if (col.key === '_line_number_') {
            label = '';
        }
        else if (col.key === '_row_selector_') {
            label = (React.createElement("div", { className: "axui-datagrid-check-box", "data-span": col.columnAttr || '', "data-checked": false, style: {
                    maxHeight: lineHeight + 'px',
                    minHeight: lineHeight + 'px',
                } }));
        }
        else {
            label = getLabel();
        }
        return (React.createElement("td", { key: ci, colSpan: col.colSpan, rowSpan: col.rowSpan, className: utils_1.classNames(tdClassNames), style: { height: cellHeight, minHeight: '1px' } },
            React.createElement("span", { "data-span": col.columnAttr || '', "data-pos": col.colIndex, style: {
                    height: columnHeight - columnBorderWidth + 'px',
                    lineHeight: lineHeight + 'px',
                    textAlign: colAlign,
                } }, label || '')));
    };
    return DataGridBodyBottomCell;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridBodyBottomCell);
//# sourceMappingURL=DataGridBodyBottomCell.js.map