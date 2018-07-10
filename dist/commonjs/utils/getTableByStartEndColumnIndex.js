"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function getTableByStartEndColumnIndex(rowTable, startColumnIndex, endColumnIndex) {
    var tempTable = { rows: [] };
    if ('rows' in rowTable) {
        rowTable.rows.forEach(function (row, r) {
            tempTable.rows[r] = { cols: [] };
            for (var c = 0, cl = row.cols.length; c < cl; c++) {
                var col = __assign({}, row.cols[c]);
                var colStartIndex = col.colIndex || 0;
                var colEndIndex = (col.colIndex || 0) + (col.colSpan || 0);
                if (startColumnIndex <= colStartIndex ||
                    colEndIndex <= endColumnIndex) {
                    if (startColumnIndex <= colStartIndex &&
                        colEndIndex <= endColumnIndex) {
                        // 변형없이 추가
                        tempTable.rows[r].cols.push(col);
                    }
                    else if (startColumnIndex > colStartIndex &&
                        colEndIndex > startColumnIndex) {
                        // 앞에서 걸친경우
                        col.colSpan = colEndIndex - startColumnIndex;
                        tempTable.rows[r].cols.push(col);
                    }
                    else if (colEndIndex > endColumnIndex &&
                        colStartIndex <= endColumnIndex) {
                        tempTable.rows[r].cols.push(col);
                    }
                }
            }
        });
    }
    return tempTable;
}
exports.default = getTableByStartEndColumnIndex;
//# sourceMappingURL=getTableByStartEndColumnIndex.js.map