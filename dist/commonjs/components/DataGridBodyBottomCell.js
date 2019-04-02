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
var CellLabelBottom_1 = require("./CellLabelBottom");
var DataGridBodyBottomCell = /** @class */ (function (_super) {
    __extends(DataGridBodyBottomCell, _super);
    function DataGridBodyBottomCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataGridBodyBottomCell.prototype.render = function () {
        var _a = this.props, _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.col, col = _c === void 0 ? {} : _c, _d = _a.col, _e = _d === void 0 ? {} : _d, _f = _e.rowSpan, colRowSpan = _f === void 0 ? 0 : _f, _g = _e.align, colAlign = _g === void 0 ? '' : _g, _h = _e.columnAttr, columnAttr = _h === void 0 ? '' : _h, _j = _e.colSpan, colSpan = _j === void 0 ? 1 : _j, _k = _e.rowSpan, rowSpan = _k === void 0 ? 1 : _k, ci = _a.ci, _l = _a.options, _m = (_l === void 0 ? {} : _l).body, _o = _m === void 0 ? {} : _m, _p = _o.columnHeight, columnHeight = _p === void 0 ? 0 : _p, _q = _o.columnPadding, columnPadding = _q === void 0 ? 0 : _q, _r = _o.columnBorderWidth, columnBorderWidth = _r === void 0 ? 0 : _r, _s = _o.align, bodyAlign = _s === void 0 ? 'left' : _s, _t = _a.predefinedFormatter, predefinedFormatter = _t === void 0 ? {} : _t, _u = _a.predefinedCollector, predefinedCollector = _u === void 0 ? {} : _u;
        var lineHeight = columnHeight - columnPadding * 2 - columnBorderWidth;
        return (React.createElement("td", { key: ci, colSpan: colSpan, rowSpan: rowSpan, className: (columnAttr === 'lineNumber' ? 'axui-datagrid-line-number' : '') + " " + (columnAttr === 'rowSelector' ? 'axui-datagrid-row-selector' : ''), style: { height: columnHeight * colRowSpan, minHeight: '1px' } },
            React.createElement(CellLabelBottom_1.default, { columnHeight: columnHeight, lineHeight: lineHeight, columnBorderWidth: columnBorderWidth, colAlign: colAlign || bodyAlign, col: col, data: data, predefinedFormatter: predefinedFormatter, predefinedCollector: predefinedCollector })));
    };
    return DataGridBodyBottomCell;
}(React.PureComponent));
exports.default = DataGridBodyBottomCell;
