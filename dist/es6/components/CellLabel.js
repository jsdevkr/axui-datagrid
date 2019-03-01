"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const utils_1 = require("../utils");
const CellLabel = props => {
    const { col, list: data, li, lineHeight, predefinedFormatter } = props;
    const { key = '', columnAttr = '', formatter } = col;
    const formatterData = {
        data,
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
            let labelValue;
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
