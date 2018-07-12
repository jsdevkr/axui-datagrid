"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param {DataGridColumn[]} bodyColumns
 * @param {DataGridOptions} options
 * @return {DataGridColumnTableMap}
 */
function makeBodyRowTable(bodyColumns, options) {
    let bodyTable = {
        rows: [],
    };
    let colIndex = 0;
    const makeBodyRows = function (rowsColumns, depth, parentField) {
        let row = { cols: [] };
        let i = 0;
        let l = rowsColumns.length;
        let colSpan = 1;
        const selfMakeBodyRow = function (selfRowsColumns, selfRowsDepth) {
            let si = 0;
            let sl = selfRowsColumns.length;
            for (; si < sl; si++) {
                let field = Object.assign({}, selfRowsColumns[si]);
                let selfColSpan = 1;
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
            let field = Object.assign({}, rowsColumns[i]);
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
            bodyTable.rows[depth].cols = [...bodyTable.rows[depth].cols, ...row.cols];
            return row.cols.length - 1 + colSpan;
        }
        else {
            return colSpan;
        }
    };
    makeBodyRows(bodyColumns, 0);
    // set rowspan
    bodyTable.rows.forEach((row, ri) => {
        if (row.cols) {
            row.cols.forEach(col => {
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
//# sourceMappingURL=makeBodyRowTable.js.map