"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../utils");
var CellLabelBottom = function (_a) {
    var columnHeight = _a.columnHeight, lineHeight = _a.lineHeight, columnBorderWidth = _a.columnBorderWidth, colAlign = _a.colAlign, col = _a.col, data = _a.list, predefinedFormatter = _a.predefinedFormatter, predefinedCollector = _a.predefinedCollector;
    var key = col.key, _b = col.label, label = _b === void 0 ? '' : _b, _c = col.columnAttr, columnAttr = _c === void 0 ? '' : _c, collector = col.collector, formatter = col.formatter;
    var collectorData = {
        data: data,
        key: key,
    };
    var formatterData = {
        data: data,
        key: key,
        value: '',
    };
    var labelValue = '';
    switch (key) {
        case '_line_number_':
            labelValue = '';
            break;
        case '_row_selector_':
            labelValue = (React.createElement("div", { className: "axui-datagrid-check-box", "data-span": columnAttr, "data-checked": false, style: {
                    maxHeight: lineHeight + 'px',
                    minHeight: lineHeight + 'px',
                } }));
            break;
        default:
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
    }
    return (React.createElement("span", { "data-span": columnAttr, 
        // data-pos={colColIndex}
        style: {
            height: columnHeight - columnBorderWidth + 'px',
            lineHeight: lineHeight + 'px',
            textAlign: colAlign,
        } }, labelValue));
};
exports.default = CellLabelBottom;
