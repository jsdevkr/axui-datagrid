"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hoc_1 = require("../hoc");
var utils_1 = require("../utils");
var CellLabel = function (props) {
    var col = props.col, data = props.list, lineHeight = props.lineHeight, predefinedFormatter = props.predefinedFormatter, predefinedCollector = props.predefinedCollector;
    var key = col.key, _a = col.label, label = _a === void 0 ? '' : _a, _b = col.columnAttr, columnAttr = _b === void 0 ? '' : _b, collector = col.collector, formatter = col.formatter;
    var collectorData = {
        data: data,
        key: key,
    };
    var formatterData = {
        data: data,
        key: key,
        value: '',
    };
    switch (key) {
        case '_line_number_':
            return null;
        case '_row_selector_':
            return (React.createElement("div", { className: "axui-datagrid-check-box", "data-span": columnAttr, "data-checked": false, style: {
                    maxHeight: lineHeight + 'px',
                    minHeight: lineHeight + 'px',
                } }));
        default:
            var labelValue = void 0;
            if (typeof collector === 'string' && collector in predefinedCollector) {
                labelValue = predefinedCollector[collector](collectorData);
            }
            else if (utils_1.isFunction(collector)) {
                labelValue = collector(collectorData);
            }
            else {
                labelValue = label;
            }
            // set formatterData.value by collector value
            formatterData.value = labelValue;
            if (typeof formatter === 'string' && formatter in predefinedFormatter) {
                labelValue = predefinedFormatter[formatter](formatterData);
            }
            else if (utils_1.isFunction(col.formatter)) {
                labelValue = col.formatter(formatterData);
            }
            return React.createElement(React.Fragment, null, labelValue);
    }
};
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
        React.createElement("span", { "data-span": columnAttr, "data-pos": colColIndex, style: {
                height: columnHeight - columnBorderWidth + 'px',
                lineHeight: lineHeight + 'px',
                textAlign: colAlign,
            } },
            React.createElement(CellLabel, { col: col, list: data, lineHeight: lineHeight, predefinedFormatter: predefinedFormatter, predefinedCollector: predefinedCollector }))));
};
exports.default = hoc_1.connectStore(DataGridBodyBottomCell);
