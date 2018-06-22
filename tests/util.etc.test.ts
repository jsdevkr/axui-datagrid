import { types } from 'axui-datagrid/stores';
import { getPathValue, mergeAll, arrayFromRange } from 'axui-datagrid/utils';

test('getPathValue', () => {
  const tgObj = { a: 1, b: { c: 2 }, arr: [1, 2, 3, 4] };

  expect(getPathValue(tgObj, ['a'])).toBe(1);
  expect(getPathValue(tgObj, ['b', 'c'])).toBe(2);
  expect(getPathValue(tgObj, ['arr', 3])).toBe(4);
  expect(getPathValue(tgObj, ['a', 'c'], 3)).toBe(3);
});

test('mergeAll', () => {
  const mData1: any = mergeAll({ a: 1 }, { b: 2 });
  expect(mData1.b).toBe(2);

  const mData2: any = mergeAll(
    { a: 1, b: { tom: '99' } },
    { b: { sol: 'la' } },
  );
  expect(mData2.b).toEqual({ tom: '99', sol: 'la' });

  const mData3: any = mergeAll(
    true,
    { id: 'X', values: [1, 2, 3], styles: { width: 100 } },
    { name: 'Thomas', values: [9, 10], styles: { width: 200, height: 100 } },
  );

  expect(mData3.styles.width * mData3.styles.height).toBe(200 * 100);
  expect(mData3.values.length).toBe(5);
});

test('arrayFromRange', () => {
  expect(arrayFromRange(3, 5)).toEqual([3, 4, 5]);
});
