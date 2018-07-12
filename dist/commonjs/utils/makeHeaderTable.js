"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param {DataGridColumn[]} headerColumns
 * @param {DataGridOptions} options
 * @return {DataGridColumnTableMap}
 */
function makeHeaderTable(headerColumns, options) {
    var table = {
        rows: [],
    };
    var colIndex = 0;
    function makeRows(rowsColumns, depth, parentField) {
        var row = { cols: [] };
        var i = 0;
        var l = rowsColumns.length;
        var colSpan = 1;
        for (; i < l; i++) {
            var field = __assign({}, rowsColumns[i]);
            colSpan = 1;
            if (!field.hidden) {
                field.colSpan = 1;
                field.rowSpan = 1;
                field.rowIndex = depth;
                field.colIndex = (function () {
                    if (!parentField) {
                        return colIndex++;
                    }
                    else {
                        colIndex = parentField.colIndex + i + 1;
                        return parentField.colIndex + i;
                    }
                })();
                if ('columns' in field && field.columns) {
                    colSpan = makeRows(field.columns, depth + 1, field);
                }
                else {
                    field.width = 'width' in field ? field.width : options.columnMinWidth;
                }
                field.colSpan = colSpan;
                row.cols.push(field);
            }
        }
        if (row.cols && row.cols.length > 0) {
            if (!table.rows[depth]) {
                table.rows[depth] = { cols: [] };
            }
            table.rows[depth].cols = __spread(table.rows[depth].cols, row.cols);
            return row.cols.length - 1 + colSpan;
        }
        else {
            return colSpan;
        }
    }
    makeRows(headerColumns, 0);
    // set rowspan
    table.rows.forEach(function (row, ri) {
        if (row.cols) {
            row.cols.forEach(function (col, ci) {
                if ('columns' in col) {
                    // col.rowSpan = 1;
                }
                else {
                    table.rows[ri].cols[ci].rowSpan = table.rows.length - ri;
                }
            });
        }
    });
    return table;
}
exports.default = makeHeaderTable;
//# sourceMappingURL=makeHeaderTable.js.map