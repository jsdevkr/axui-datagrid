"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const utils_1 = require("../utils");
class CellLabel extends React.PureComponent {
    render() {
        const { columnHeight, lineHeight, columnBorderWidth, rowSelectorSize, colAlign, col, col: { key = '', columnAttr = '', formatter }, li, item, selected = false, predefinedFormatter, } = this.props;
        const formatterData = {
            item,
            index: li,
            key: col.key,
            value: item[col.key || ''],
        };
        let labelValue = '';
        switch (key) {
            case '_line_number_':
                labelValue = li + 1 + '';
                break;
            case '_row_selector_':
                labelValue = (React.createElement("div", { "data-span": columnAttr, className: "axui-datagrid-check-box", "data-checked": selected, style: {
                        width: rowSelectorSize + 'px',
                        height: rowSelectorSize + 'px',
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
                    labelValue = item[key];
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
