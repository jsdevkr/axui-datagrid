"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeFootSumTable(footSumColumns, colGroup, options) {
    var footSumTable = {
        rows: [],
    };
    var colIndex = 0;
    for (var r = 0, rl = footSumColumns.length; r < rl; r++) {
        var footSumRow = footSumColumns[r] || [], addC = 0;
        footSumTable.rows[r] = { cols: [] };
        for (var c = 0, cl = footSumRow.length; c < cl; c++) {
            if (addC > colGroup.length) {
                break;
            }
            var colSpan = footSumRow[c].colSpan || 1;
            if (footSumRow[c].label || footSumRow[c].key) {
                footSumTable.rows[r].cols.push({
                    colSpan: colSpan,
                    rowSpan: 1,
                    colIndex: addC,
                    columnAttr: 'sum',
                    align: footSumRow[c].align,
                    label: footSumRow[c].label,
                    key: footSumRow[c].key,
                    collector: footSumRow[c].collector,
                    formatter: footSumRow[c].formatter,
                });
            }
            else {
                footSumTable.rows[r].cols.push({
                    colIndex: addC,
                    colSpan: colSpan,
                    rowSpan: 1,
                    label: '',
                });
            }
            addC += colSpan;
            colSpan = null;
        }
        if (addC < colGroup.length) {
            for (var c = addC; c < colGroup.length; c++) {
                footSumTable.rows[r].cols.push({
                    colIndex: c,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '',
                });
            }
        }
        // delete footSumRow;
        addC = 0;
    }
    return footSumTable;
}
exports.default = makeFootSumTable;
//# sourceMappingURL=makeFootSumTable.js.map