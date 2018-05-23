"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var GridHeaderCell = /** @class */ (function (_super) {
    __extends(GridHeaderCell, _super);
    function GridHeaderCell(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    GridHeaderCell.prototype.render = function () {
        var _a = this.props, bodyRow = _a.bodyRow, optionsHeader = _a.optionsHeader, focusedCol = _a.focusedCol, selectionCols = _a.selectionCols, sortInfo = _a.sortInfo, ri = _a.ri, col = _a.col, onClickHeader = _a.onClickHeader;
        var lineHeight = optionsHeader.columnHeight -
            optionsHeader.columnPadding * 2 -
            optionsHeader.columnBorderWidth;
        var colAlign = optionsHeader.align || col.align;
        var label, sorter, filter;
        if (col.key === '__checkbox_header__') {
            if (optionsHeader.selector) {
                label = (React.createElement("div", { "data-checkbox": true, style: {
                        maxHeight: col.width - 10 + 'px',
                        minHeight: col.width - 10 + 'px',
                    } }));
            }
        }
        else {
            label = col.label;
        }
        if (col.key &&
            col.colIndex !== null &&
            typeof col.colIndex !== 'undefined' &&
            sortInfo[col.key]) {
            sorter = (React.createElement("span", { "data-sorter": col.colIndex, "data-sorter-order": sortInfo[col.key].orderBy }));
        }
        var cellHeight = optionsHeader.columnHeight * col.rowspan -
            optionsHeader.columnBorderWidth;
        var tdClassNames = (_b = {},
            _b['axd-header-column'] = true,
            _b['axd-header-corner'] = col.columnAttr === 'lineNumber',
            _b['focused'] = focusedCol > -1 &&
                col.colIndex === focusedCol &&
                bodyRow.rows.length - 1 === ri + col.rowspan - 1,
            _b['selected'] = selectionCols[col.colIndex] &&
                bodyRow.rows.length - 1 === ri + col.rowspan - 1,
            _b);
        return (React.createElement("td", { colSpan: col.colspan, rowSpan: col.rowspan, className: classnames_1.default(tdClassNames), onClick: function (e) { return onClickHeader(e, col.colIndex, col.columnAttr); }, style: { height: cellHeight, minHeight: '1px' }, "data-axui-tooltip": col.key === '__line_number__' ? 'SELECT ALL' : 'false' }, React.createElement("span", { "data-span": true, "data-align": colAlign, style: {
                height: optionsHeader.columnHeight -
                    optionsHeader.columnBorderWidth +
                    'px',
                lineHeight: lineHeight + 'px',
            } }, sorter, label || ' '), optionsHeader.enableFilter && col.key && col.colIndex > -1 ? (React.createElement("span", { "data-filter": "true", "data-filter-index": col.colIndex })) : null));
        var _b;
    };
    return GridHeaderCell;
}(React.Component));
exports.GridHeaderCell = GridHeaderCell;
//# sourceMappingURL=GridHeaderCell.js.map