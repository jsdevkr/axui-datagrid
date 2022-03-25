import { IDataGrid } from '../common/@types';

function makeFootSumTable(
  footSumColumns: IDataGrid.IColumn[][],
  colGroup: IDataGrid.ICol[],
  options: IDataGrid.IOptions,
): IDataGrid.IColumnTableMap {
  let footSumTable: IDataGrid.IColumnTableMap = {
    rows: [],
  };

  for (let r = 0, rl = footSumColumns.length; r < rl; r++) {
    let footSumRow = footSumColumns[r] || [],
      addC = 0;

    footSumTable.rows[r] = { cols: [] };

    for (let c = 0, cl = footSumRow.length; c < cl; c++) {
      if (addC > colGroup.length) {
        break;
      }
      let colSpan: number | null = footSumRow[c].colSpan || 1;
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
      } else {
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
      for (let c = addC; c < colGroup.length; c++) {
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

export default makeFootSumTable;
