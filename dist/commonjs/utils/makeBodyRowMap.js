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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {DataGridOptions} options
 * @return {{[p: string]: any}}
 */
function makeBodyRowMap(rowTable, options) {
    var map = {};
    rowTable.rows.forEach(function (row) {
        if (row.cols) {
            row.cols.forEach(function (col) {
                map[col.rowIndex + '_' + col.colIndex] = __assign({}, col);
            });
        }
    });
    return map;
}
exports.default = makeBodyRowMap;
//# sourceMappingURL=makeBodyRowMap.js.map