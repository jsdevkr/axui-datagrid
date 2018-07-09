"use strict";
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
 * @param {DataGridColumn[]} bodyColumns
 * @param {DataGridOptions} options
 * @return {DataGridColumnTableMap}
 */
function makeBodyRowTable(bodyColumns, options) {
    var columns = __spread(bodyColumns);
    var table = {
        rows: [],
    };
    var colIndex = 0;
    var makeRows = function (rowsColumns, depth, parentField) {
        var row = { cols: [] };
        var i = 0;
        var l = rowsColumns.length;
        var colSpan = 1;
        var selfMakeRow = function (selfRowsColumns, selfRowsDepth) {
            var si = 0;
            var sl = selfRowsColumns.length;
            for (; si < sl; si++) {
                var field = selfRowsColumns[si];
                var selfColSpan = 1;
                if (!field.hidden) {
                    if ('key' in field) {
                        field.colSpan = 1;
                        field.rowSpan = 1;
                        field.depth = selfRowsDepth;
                        field.rowIndex = selfRowsDepth;
                        field.colIndex = (function () {
                            if (!parentField) {
                                return colIndex++;
                            }
                            else {
                                colIndex = parentField.colIndex + si + 1;
                                return parentField.colIndex + si;
                            }
                        })();
                        row.cols.push(field);
                        if ('columns' in field && field.columns) {
                            selfColSpan = makeRows(field.columns, selfRowsDepth + 1, field);
                        }
                        field.colSpan = selfColSpan;
                    }
                    else {
                        if ('columns' in field && field.columns) {
                            selfMakeRow(field.columns, selfRowsDepth);
                        }
                    }
                }
            }
        };
        for (; i < l; i++) {
            var field = rowsColumns[i];
            colSpan = 1;
            if (!field.hidden) {
                if ('key' in field) {
                    field.colSpan = 1;
                    field.rowSpan = 1;
                    field.depth = depth;
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
                    row.cols.push(field);
                    if ('columns' in field && field.columns) {
                        colSpan = makeRows(field.columns, depth + 1, field);
                    }
                    field.colSpan = colSpan;
                }
                else {
                    if ('columns' in field && field.columns) {
                        selfMakeRow(field.columns, depth);
                    }
                }
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
    };
    makeRows(columns, 0);
    // set rowspan
    table.rows.forEach(function (row, ri) {
        if (row.cols) {
            row.cols.forEach(function (col) {
                if (!('columns' in col)) {
                    col.rowSpan = table.rows.length - ri;
                }
            });
        }
    });
    return table;
}
exports.default = makeBodyRowTable;
//# sourceMappingURL=makeBodyRowTable.js.map