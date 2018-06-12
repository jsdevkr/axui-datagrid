import { typeStore } from 'axui-datagrid/stores';
import { makeHeaderTable } from 'axui-datagrid/utils/columns';

test('test : makeHeaderTable', () => {
  const options: any = { columnMinWidth: 100 };
  const columns: any[] = [{ key: 'id', label: 'ID' }];
  const tableMap: any = {
    rows: [
      {
        cols: [
          {
            colIndex: 0,
            colSpan: 1,
            key: 'id',
            label: 'ID',
            rowIndex: 0,
            rowSpan: 1,
            width: 100,
          },
        ],
      },
    ],
  };
  const result: any = makeHeaderTable(columns, options);

  expect(result.rows[0].cols.colIndex).toBe(tableMap.rows[0].cols.colIndex);
});
