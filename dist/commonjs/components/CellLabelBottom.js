"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../utils");
var CellLabelBottom = /** @class */ (function (_super) {
    __extends(CellLabelBottom, _super);
    function CellLabelBottom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CellLabelBottom.prototype.render = function () {
        var _a = this.props, columnHeight = _a.columnHeight, lineHeight = _a.lineHeight, columnBorderWidth = _a.columnBorderWidth, colAlign = _a.colAlign, col = _a.col, _b = _a.col, key = _b.key, _c = _b.label, label = _c === void 0 ? '' : _c, _d = _b.columnAttr, columnAttr = _d === void 0 ? '' : _d, collector = _b.collector, formatter = _b.formatter, data = _a.data, predefinedFormatter = _a.predefinedFormatter, predefinedCollector = _a.predefinedCollector;
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
    return CellLabelBottom;
}(React.PureComponent));
exports.default = CellLabelBottom;
