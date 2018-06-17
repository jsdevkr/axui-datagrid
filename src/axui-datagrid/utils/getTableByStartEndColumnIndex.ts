import { types } from '../stores';

/**
 *
 * @param {DataGridColumnTableMap} rowTable
 * @param {number} startColumnIndex
 * @param {number} endColumnIndex
 * @return {DataGridColumnTableMap}
 */
function getTableByStartEndColumnIndex(
  rowTable: types.DataGridColumnTableMap,
  startColumnIndex: number,
  endColumnIndex: number,
): types.DataGridColumnTableMap {
  let tempTable: types.DataGridColumnTableMap = { rows: [] };

  if ('rows' in rowTable) {
    rowTable.rows.forEach((row, r) => {
      tempTable.rows[r] = { cols: [] };
      for (let c = 0, cl = row.cols.length; c < cl; c++) {
        let col = { ...row.cols[c] };
        let colStartIndex: number = col.colIndex || 0;
        let colEndIndex: number = (col.colIndex || 0) + (col.colSpan || 0);

        if (
          startColumnIndex <= colStartIndex ||
          colEndIndex <= endColumnIndex
        ) {
          if (
            startColumnIndex <= colStartIndex &&
            colEndIndex <= endColumnIndex
          ) {
            // 변형없이 추가
            tempTable.rows[r].cols.push(col);
          } else if (
            startColumnIndex > colStartIndex &&
            colEndIndex > startColumnIndex
          ) {
            // 앞에서 걸친경우
            col.colSpan = colEndIndex - startColumnIndex;
            tempTable.rows[r].cols.push(col);
          } else if (
            colEndIndex > endColumnIndex &&
            colStartIndex <= endColumnIndex
          ) {
            tempTable.rows[r].cols.push(col);
          }
        }
      }
    });
  }
  return tempTable;
}

export default getTableByStartEndColumnIndex;
