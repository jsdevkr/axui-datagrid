"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../utils");
var CellLabel = function (_a) {
    var columnHeight = _a.columnHeight, lineHeight = _a.lineHeight, columnBorderWidth = _a.columnBorderWidth, colAlign = _a.colAlign, col = _a.col, data = _a.list, li = _a.li, predefinedFormatter = _a.predefinedFormatter;
    var _b = col.key, key = _b === void 0 ? '' : _b, _c = col.columnAttr, columnAttr = _c === void 0 ? '' : _c, formatter = col.formatter;
    var formatterData = {
        data: data,
        item: data[li],
        index: li,
        key: col.key,
        value: data[li] && data[li][col.key || ''],
    };
    var labelValue = '';
    switch (key) {
        case '_line_number_':
            labelValue = li + 1 + '';
            break;
        case '_row_selector_':
            labelValue = (React.createElement("div", { className: "axui-datagrid-check-box", "data-span": columnAttr, "data-checked": data[li] && data[li]._selected_, style: {
                    maxHeight: lineHeight + 'px',
                    minHeight: lineHeight + 'px',
                } }));
            break;
        default:
            if (typeof formatter === 'string' && formatter in predefinedFormatter) {
                labelValue = predefinedFormatter[formatter](formatterData);
            }
            else if (utils_1.isFunction(formatter)) {
                labelValue = formatter(formatterData);
            }
            else {
                labelValue = data[li] && data[li][key];
            }
    }
    return (React.createElement("span", { "data-span": columnAttr, 
        // data-pos={colIndex + ',' + rowIndex + ',' + li}
        style: {
            height: columnHeight - columnBorderWidth + 'px',
            lineHeight: lineHeight + 'px',
            textAlign: colAlign,
        } }, labelValue));
};
exports.default = CellLabel;
