"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {DataGridOptions} options
 * @return {{[p: string]: any}}
 */
function makeBodyRowMap(rowTable, options) {
    let map = {};
    rowTable.rows.forEach(row => {
        if (row.cols) {
            row.cols.forEach(col => {
                map[col.rowIndex + '_' + col.colIndex] = Object.assign({}, col);
            });
        }
    });
    return map;
}
exports.default = makeBodyRowMap;
