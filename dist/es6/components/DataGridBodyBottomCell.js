"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
const CellLabel = props => {
    const { col, list: data, lineHeight, predefinedFormatter, predefinedCollector, } = props;
    const { key, label = '', columnAttr = '', collector, formatter } = col;
    let collectorData = {
        data,
        key,
    };
    let formatterData = {
        data,
        key,
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
            let labelValue;
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
const DataGridBodyBottomCell = props => {
    const { filteredList = [], col = {}, ci, options = {}, predefinedFormatter = {}, predefinedCollector = {}, } = props;
    const { body: optionsBody = {} } = options;
    const { columnHeight = 0, columnPadding = 0, columnBorderWidth = 0, align: bodyAlign = 'left', } = optionsBody;
    const { rowSpan: colRowSpan = 0, colIndex: colColIndex = 0, align: colAlign = bodyAlign || '', columnAttr = '', colSpan = 1, rowSpan = 1, } = col;
    const tdClassNames = {
        ['axui-datagrid-line-number']: columnAttr === 'lineNumber',
        ['axui-datagrid-row-selector']: columnAttr === 'rowSelector',
    };
    const lineHeight = columnHeight - columnPadding * 2 - columnBorderWidth;
    return (React.createElement("td", { key: ci, colSpan: colSpan, rowSpan: rowSpan, className: utils_1.classNames(tdClassNames), style: { height: columnHeight * colRowSpan, minHeight: '1px' } },
        React.createElement("span", { "data-span": columnAttr, "data-pos": colColIndex, style: {
                height: columnHeight - columnBorderWidth + 'px',
                lineHeight: lineHeight + 'px',
                textAlign: colAlign,
            } },
            React.createElement(CellLabel, { col: col, list: filteredList, lineHeight: lineHeight, predefinedFormatter: predefinedFormatter, predefinedCollector: predefinedCollector }))));
};
exports.default = hoc_1.connectStore(DataGridBodyBottomCell);
