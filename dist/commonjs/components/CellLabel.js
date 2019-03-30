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
var CellLabel = /** @class */ (function (_super) {
    __extends(CellLabel, _super);
    function CellLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CellLabel.prototype.render = function () {
        var _a = this.props, columnHeight = _a.columnHeight, lineHeight = _a.lineHeight, columnBorderWidth = _a.columnBorderWidth, rowSelectorSize = _a.rowSelectorSize, colAlign = _a.colAlign, col = _a.col, _b = _a.col, _c = _b.key, key = _c === void 0 ? '' : _c, _d = _b.columnAttr, columnAttr = _d === void 0 ? '' : _d, formatter = _b.formatter, li = _a.li, item = _a.item, _e = _a.selected, selected = _e === void 0 ? false : _e, predefinedFormatter = _a.predefinedFormatter;
        var formatterData = {
            item: item,
            index: li,
            key: col.key,
            value: item[col.key || ''],
        };
        var labelValue = '';
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
    };
    return CellLabel;
}(React.PureComponent));
exports.default = CellLabel;
