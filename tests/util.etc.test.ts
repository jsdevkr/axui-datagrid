import { types } from 'axui-datagrid/stores';
import { getPathValue } from 'axui-datagrid/utils';

test('test : getPathValue', () => {
  const tgObj = { a: 1, b: { c: 2 }, arr: [1, 2, 3, 4] };

  expect(getPathValue(tgObj, ['a'])).toBe(1);
  expect(getPathValue(tgObj, ['b', 'c'])).toBe(2);
  expect(getPathValue(tgObj, ['arr', 3])).toBe(4);
  expect(getPathValue(tgObj, ['a', 'c'], 3)).toBe(3);
});
