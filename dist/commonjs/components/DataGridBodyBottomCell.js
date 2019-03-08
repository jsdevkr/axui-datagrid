"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var CellLabelBottom_1 = require("./CellLabelBottom");
var DataGridBodyBottomCell = function (props) {
    var _a;
    var _b = props.data, data = _b === void 0 ? [] : _b, _c = props.col, col = _c === void 0 ? {} : _c, ci = props.ci, _d = props.options, options = _d === void 0 ? {} : _d, _e = props.predefinedFormatter, predefinedFormatter = _e === void 0 ? {} : _e, _f = props.predefinedCollector, predefinedCollector = _f === void 0 ? {} : _f;
    var _g = options.body, optionsBody = _g === void 0 ? {} : _g;
    var _h = optionsBody.columnHeight, columnHeight = _h === void 0 ? 0 : _h, _j = optionsBody.columnPadding, columnPadding = _j === void 0 ? 0 : _j, _k = optionsBody.columnBorderWidth, columnBorderWidth = _k === void 0 ? 0 : _k, _l = optionsBody.align, bodyAlign = _l === void 0 ? 'left' : _l;
    var _m = col.rowSpan, colRowSpan = _m === void 0 ? 0 : _m, _o = col.colIndex, colColIndex = _o === void 0 ? 0 : _o, _p = col.align, colAlign = _p === void 0 ? bodyAlign || '' : _p, _q = col.columnAttr, columnAttr = _q === void 0 ? '' : _q, _r = col.colSpan, colSpan = _r === void 0 ? 1 : _r, _s = col.rowSpan, rowSpan = _s === void 0 ? 1 : _s;
    var tdClassNames = (_a = {},
        _a['axui-datagrid-line-number'] = columnAttr === 'lineNumber',
        _a['axui-datagrid-row-selector'] = columnAttr === 'rowSelector',
        _a);
    var lineHeight = columnHeight - columnPadding * 2 - columnBorderWidth;
    return (React.createElement("td", { key: ci, colSpan: colSpan, rowSpan: rowSpan, className: utils_1.classNames(tdClassNames), style: { height: columnHeight * colRowSpan, minHeight: '1px' } },
        React.createElement(CellLabelBottom_1.default, { columnHeight: columnHeight, lineHeight: lineHeight, columnBorderWidth: columnBorderWidth, colAlign: colAlign, col: col, list: data, predefinedFormatter: predefinedFormatter, predefinedCollector: predefinedCollector })));
};
exports.default = hoc_1.connectStore(DataGridBodyBottomCell);
