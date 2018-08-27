"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
class DataGridBodyBottomCell extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
    }
    render() {
        const { filteredList = [], focusedRow, focusedCol, selectionRows = [], selectionCols = [], col = {}, ci, value, options = {}, predefinedFormatter = {}, predefinedCollector = {}, } = this.props;
        const { body: optionsBody = {} } = options;
        const { columnHeight = 0, columnPadding = 0, columnBorderWidth = 0, align: bodyAlign = 'left', } = optionsBody;
        const { rowSpan: colRowSpan = 0, colIndex: colColIndex = 0 } = col;
        let cellHeight = columnHeight * colRowSpan;
        let tdClassNames = {
            ['axui-datagrid-line-number']: col.columnAttr === 'lineNumber',
            ['axui-datagrid-row-selector']: col.columnAttr === 'rowSelector',
        };
        const lineHeight = columnHeight - columnPadding * 2 - columnBorderWidth;
        const colAlign = col.align || bodyAlign || '';
        let label;
        const getLabel = function () {
            let collectorData = {
                data: filteredList,
                key: col.key,
            };
            let formatterData = {
                data: filteredList,
                key: col.key,
                value: '',
            };
            let labelValue;
            if (typeof col.collector === 'string' &&
                col.collector in predefinedCollector) {
                labelValue = predefinedCollector[col.collector](collectorData);
            }
            else if (utils_1.isFunction(col.collector)) {
                labelValue = col.collector(collectorData);
            }
            else {
                labelValue = col.label || '';
            }
            // collector로 구한 값을 formatter의 value로 사용
            formatterData.value = labelValue;
            if (typeof col.formatter === 'string' &&
                col.formatter in predefinedFormatter) {
                labelValue = predefinedFormatter[col.formatter](formatterData);
            }
            else if (utils_1.isFunction(col.formatter)) {
                labelValue = col.formatter(formatterData);
            }
            return labelValue;
        };
        if (col.key === '_line_number_') {
            label = '';
        }
        else if (col.key === '_row_selector_') {
            label = (React.createElement("div", { className: "axui-datagrid-check-box", "data-span": col.columnAttr || '', "data-checked": false, style: {
                    maxHeight: lineHeight + 'px',
                    minHeight: lineHeight + 'px',
                } }));
        }
        else {
            label = getLabel();
        }
        return (React.createElement("td", { key: ci, colSpan: col.colSpan, rowSpan: col.rowSpan, className: utils_1.classNames(tdClassNames), style: { height: cellHeight, minHeight: '1px' } },
            React.createElement("span", { "data-span": col.columnAttr || '', "data-pos": col.colIndex, style: {
                    height: columnHeight - columnBorderWidth + 'px',
                    lineHeight: lineHeight + 'px',
                    textAlign: colAlign,
                } }, label || '')));
    }
}
exports.default = hoc_1.connectStore(DataGridBodyBottomCell);
//# sourceMappingURL=DataGridBodyBottomCell.js.map