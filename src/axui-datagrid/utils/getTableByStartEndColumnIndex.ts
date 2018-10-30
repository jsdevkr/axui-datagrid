import { IDataGridColumnTableMap } from '../common/@types';

function getTableByStartEndColumnIndex(
  rowTable: IDataGridColumnTableMap,
  startColumnIndex: number,
  endColumnIndex: number,
): IDataGridColumnTableMap {
  let tempTable: IDataGridColumnTableMap = { rows: [] };

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
