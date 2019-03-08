"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const utils_1 = require("../utils");
const CellLabel = ({ columnHeight, lineHeight, columnBorderWidth, colAlign, col, list: data, li, predefinedFormatter, }) => {
    const { key = '', columnAttr = '', formatter } = col;
    const formatterData = {
        data,
        item: data[li],
        index: li,
        key: col.key,
        value: data[li] && data[li][col.key || ''],
    };
    let labelValue = '';
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
