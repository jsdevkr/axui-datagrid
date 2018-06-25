import { printDate } from 'axui-datagrid/utils';

test('test : printDate by Date', () => {
  let testDate = new Date(2009, 5, 22);
  expect(printDate(testDate, 'yyyy-MM')).toBe('2009-06');
});

test('test : printDate by String', () => {
  expect(printDate('2009-06-22 09:22:22', 'yyyy/MM.dd(hh:mm:ss)')).toBe(
    '2009/06.22(09:22:22)',
  );
});
