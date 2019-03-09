"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const utils_1 = require("../utils");
class CellLabel extends React.PureComponent {
    render() {
        const { columnHeight, lineHeight, columnBorderWidth, colAlign, col, col: { key = '', columnAttr = '', formatter }, li, data, selected = false, predefinedFormatter, } = this.props;
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
                labelValue = (React.createElement("div", { className: "axui-datagrid-check-box", "data-span": columnAttr, "data-checked": selected, style: {
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
        return (React.createElement("span", { "data-span": columnAttr, style: {
                height: columnHeight - columnBorderWidth + 'px',
                lineHeight: lineHeight + 'px',
                textAlign: colAlign,
            } }, labelValue));
    }
}
exports.default = CellLabel;
