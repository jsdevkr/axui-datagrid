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
var hoc_1 = require("../hoc");
var CellLabel_1 = require("./CellLabel");
var DataGridAutofitHelper = /** @class */ (function (_super) {
    __extends(DataGridAutofitHelper, _super);
    function DataGridAutofitHelper(props) {
        var _this = _super.call(this, props) || this;
        _this.getColumnsWidth = function () {
            var _a = _this.props.options, options = _a === void 0 ? {} : _a;
            var _b = options.autofitColumnWidthMin, autofitColumnWidthMin = _b === void 0 ? 0 : _b, _c = options.autofitColumnWidthMax, autofitColumnWidthMax = _c === void 0 ? 0 : _c;
            if (_this.tableRef.current) {
                var colGroup = [];
                var tds = _this.tableRef.current.querySelectorAll('[data-autofit-table-head-row] > td');
                if (tds && tds.length) {
                    for (var i = 0, l = tds.length; i < l; i++) {
                        var tdWidth = tds[i].getBoundingClientRect().width + 10;
                        var colWidth = tdWidth;
                        if (autofitColumnWidthMin > colWidth) {
                            colWidth = autofitColumnWidthMin;
                        }
                        else if (autofitColumnWidthMax < colWidth) {
                            colWidth = autofitColumnWidthMax;
                        }
                        colGroup[i] = {
                            colIndex: i,
                            width: i === 0 ? tdWidth + 10 : colWidth,
                            tdWidth: Math.min(tdWidth + 10, autofitColumnWidthMax + 100),
                        };
                    }
                }
                if (colGroup.length) {
                    _this.props.applyAutofit({
                        asideWidth: colGroup[0].width,
                        colGroup: colGroup.slice(1),
                    });
                }
            }
        };
        _this.tableRef = React.createRef();
        return _this;
    }
    DataGridAutofitHelper.prototype.render = function () {
        var _a = this.props, _b = _a.colGroup, colGroup = _b === void 0 ? [] : _b, _c = _a.data, data = _c === void 0 ? [] : _c, _d = _a.predefinedFormatter, predefinedFormatter = _d === void 0 ? {} : _d, _e = _a.styles, styles = _e === void 0 ? {} : _e;
        var _f = styles.bodyHeight, bodyHeight = _f === void 0 ? 0 : _f, _g = styles.bodyTrHeight, bodyTrHeight = _g === void 0 ? 1 : _g;
        return (React.createElement("div", { className: 'axui-datagrid-autofit-helper' },
            React.createElement("table", { ref: this.tableRef },
                React.createElement("thead", null,
                    React.createElement("tr", { "data-autofit-table-head-row": true },
                        React.createElement("td", null, data.length + ''),
                        colGroup.map(function (col, ci) { return (React.createElement("td", { key: ci }, col.label)); }))),
                React.createElement("tbody", null, data
                    .slice(0, Math.ceil(bodyHeight / (bodyTrHeight || 1)) + 1)
                    .map(function (row, li) {
                    return (React.createElement("tr", { key: li },
                        React.createElement("td", null, li),
                        colGroup.map(function (col, ci) {
                            var colEditor = col.editor === 'string'
                                ? { type: '' + col.editor }
                                : col.editor;
                            var inlineEditingActiveAlways = colEditor && colEditor.activeType === 'always';
                            return inlineEditingActiveAlways && colEditor.width ? (React.createElement("td", { key: ci },
                                React.createElement("div", { style: { width: colEditor.width } }))) : (React.createElement("td", { key: ci },
                                React.createElement(CellLabel_1.default, { columnHeight: 12, lineHeight: 12, columnBorderWidth: 0, rowSelectorSize: 17, colAlign: 'left', col: col, li: li, item: data[li], predefinedFormatter: predefinedFormatter })));
                        })));
                })))));
    };
    DataGridAutofitHelper.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            _this.getColumnsWidth();
        });
    };
    return DataGridAutofitHelper;
}(React.Component));
exports.default = hoc_1.connectStore(DataGridAutofitHelper);
