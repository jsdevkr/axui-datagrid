"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../utils");
var CellLabel = function (props) {
    var col = props.col, data = props.list, li = props.li, lineHeight = props.lineHeight, predefinedFormatter = props.predefinedFormatter;
    var _a = col.key, key = _a === void 0 ? '' : _a, _b = col.columnAttr, columnAttr = _b === void 0 ? '' : _b, formatter = col.formatter;
    var formatterData = {
        data: data,
        item: data[li],
        index: li,
        key: col.key,
        value: data[li] && data[li][col.key || ''],
    };
    switch (key) {
        case '_line_number_':
            return React.createElement(React.Fragment, null, li + 1);
        case '_row_selector_':
            return (React.createElement("div", { className: "axui-datagrid-check-box", "data-span": columnAttr, "data-checked": data[li] && data[li]._selected_, style: {
                    maxHeight: lineHeight + 'px',
                    minHeight: lineHeight + 'px',
                } }));
        default:
            var labelValue = void 0;
            if (typeof formatter === 'string' && formatter in predefinedFormatter) {
                labelValue = predefinedFormatter[formatter](formatterData);
            }
            else if (utils_1.isFunction(formatter)) {
                labelValue = formatter(formatterData);
            }
            else {
                labelValue = data[li] && data[li][key];
            }
            return React.createElement(React.Fragment, null, labelValue);
    }
};
exports.default = CellLabel;
