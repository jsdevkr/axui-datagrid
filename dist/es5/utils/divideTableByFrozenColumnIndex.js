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
/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {number} frozenColumnIndex
 * @param {DataGridOptions} options
 * @return {DataGridColumnDivideTable}
 */
function divideTableByFrozenColumnIndex(rowTable, frozenColumnIndex, options) {
    var asideTable = { rows: [] };
    var asideColGroup = [];
    var asidePanelWidth = 0;
    var tempTableLeft = { rows: [] };
    var tempTableRight = { rows: [] };
    // make asideTable
    for (var i = 0, l = rowTable.rows.length; i < l; i++) {
        asideTable.rows[i] = { cols: [] };
        if (i === 0) {
            var col = {
                label: '',
                colSpan: 1,
                rowSpan: rowTable.rows.length,
                rowIndex: 0,
                colIndex: -1,
            }, _col = {};
            if (options.showLineNumber) {
                _col = __assign({}, col, {
                    width: options.lineNumberColumnWidth,
                    _width: options.lineNumberColumnWidth,
                    align: 'center',
                    columnAttr: 'lineNumber',
                    key: '__line_number__',
                    label: '',
                });
                asideColGroup.push(_col);
                asideTable.rows[i].cols.push(_col);
                asidePanelWidth += options.lineNumberColumnWidth || 0;
            }
            if (options.showRowSelector) {
                _col = __assign({}, col, {
                    width: options.rowSelectorColumnWidth,
                    _width: options.rowSelectorColumnWidth,
                    align: 'center',
                    columnAttr: 'rowSelector',
                    key: '__row_selector__',
                    label: '',
                });
                asideColGroup.push(_col);
                asideTable.rows[i].cols.push(_col);
                asidePanelWidth += options.rowSelectorColumnWidth || 0;
            }
        }
    }
    for (var r = 0, rl = rowTable.rows.length; r < rl; r++) {
        var row = rowTable.rows[r];
        tempTableLeft.rows[r] = { cols: [] };
        tempTableRight.rows[r] = { cols: [] };
        for (var c = 0, cl = row.cols.length; c < cl; c++) {
            var col = row.cols[c], colStartIndex = col.colIndex || 0, colEndIndex = colStartIndex + (col.colSpan || 0);
            if (colStartIndex < frozenColumnIndex) {
                if (colEndIndex <= frozenColumnIndex) {
                    // 좌측편에 변형없이 추가
                    tempTableLeft.rows[r].cols.push(col);
                }
                else {
                    var leftCol = __assign({}, col);
                    var rightCol = __assign({}, leftCol);
                    leftCol.colSpan = frozenColumnIndex - (leftCol.colIndex || 0);
                    rightCol.colSpan = (col.colSpan || 0) - leftCol.colSpan;
                    tempTableLeft.rows[r].cols.push(leftCol);
                    if (rightCol.colSpan) {
                        tempTableRight.rows[r].cols.push(rightCol);
                    }
                }
            }
            else {
                // 오른편
                tempTableRight.rows[r].cols.push(__assign({}, col));
            }
        }
    }
    // frozenPanelWidth는 컬럼의 너비 _width가 결정된 후에 구해야 함으로 여기서 처리 하지 않는다
    // _width는 컬럼의 너비가 '*' 또는 '%'일 때에 컨테이너의 너비에 따라 상대적으로 결정된다.
    return {
        asideData: asideTable,
        asideColGroup: asideColGroup,
        asidePanelWidth: asidePanelWidth,
        leftData: tempTableLeft,
        rightData: tempTableRight,
    };
}
exports.default = divideTableByFrozenColumnIndex;
//# sourceMappingURL=divideTableByFrozenColumnIndex.js.map