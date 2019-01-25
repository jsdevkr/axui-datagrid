"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTableByStartEndColumnIndex(rowTable = { rows: [{ cols: [] }] }, startColumnIndex, endColumnIndex) {
    let tempTable = { rows: [] };
    if ('rows' in rowTable) {
        rowTable.rows.forEach((row, r) => {
            tempTable.rows[r] = { cols: [] };
            for (let c = 0, cl = row.cols.length; c < cl; c++) {
                let col = Object.assign({}, row.cols[c]);
                let colStartIndex = col.colIndex || 0;
                let colEndIndex = (col.colIndex || 0) + (col.colSpan || 0);
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
