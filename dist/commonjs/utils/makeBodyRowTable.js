"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
 * @param {DataGridColumn[]} bodyColumns
 * @param {DataGridOptions} options
 * @return {DataGridColumnTableMap}
 */
function makeBodyRowTable(bodyColumns, options) {
    var bodyTable = {
        rows: [],
    };
    var colIndex = 0;
    var makeBodyRows = function (rowsColumns, depth, parentField) {
        var row = { cols: [] };
        var i = 0;
        var l = rowsColumns.length;
        var colSpan = 1;
        var selfMakeBodyRow = function (selfRowsColumns, selfRowsDepth) {
            var si = 0;
            var sl = selfRowsColumns.length;
            for (; si < sl; si++) {
                var field = __assign({}, selfRowsColumns[si]);
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
                            selfColSpan = makeBodyRows(field.columns, selfRowsDepth + 1, field);
                        }
                        field.colSpan = selfColSpan;
                    }
                    else {
                        if ('columns' in field && field.columns) {
                            selfMakeBodyRow(field.columns, selfRowsDepth);
                        }
                    }
                }
            }
        };
        for (; i < l; i++) {
            var field = __assign({}, rowsColumns[i]);
            colSpan = 1;
            if (!field.hidden) {
                if ('key' in field) {
                    field.colSpan = 1;
                    // field.rowSpan = 1;
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
                        colSpan = makeBodyRows(field.columns, depth + 1, field);
                    }
                    field.colSpan = colSpan;
                }
                else {
                    if ('columns' in field && field.columns) {
                        selfMakeBodyRow(field.columns, depth);
                    }
                }
            }
        }
        if (row.cols && row.cols.length > 0) {
            if (!bodyTable.rows[depth]) {
                bodyTable.rows[depth] = { cols: [] };
            }
            bodyTable.rows[depth].cols = __spread(bodyTable.rows[depth].cols, row.cols);
            return row.cols.length - 1 + colSpan;
        }
        else {
            return colSpan;
        }
    };
    makeBodyRows(bodyColumns, 0);
    // set rowspan
    bodyTable.rows.forEach(function (row, ri) {
        if (row.cols) {
            row.cols.forEach(function (col) {
                if ('columns' in col) {
                    // col.rowSpan = 1;
                }
                else {
                    col.rowSpan = bodyTable.rows.length - ri;
                }
            });
        }
    });
    return bodyTable;
}
exports.default = makeBodyRowTable;
