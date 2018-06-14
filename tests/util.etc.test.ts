import { types } from 'axui-datagrid/stores';
import { getPathValue } from 'axui-datagrid/utils';

test('test : getPathValue - 1depth', () => {
  const tgObj = { a: 1, b: { c: 2 } };

  expect(getPathValue(tgObj, ['a'])).toBe(1);
  expect(getPathValue(tgObj, ['b', 'c'])).toBe(2);
  expect(getPathValue(tgObj, ['a', 'c'], 3)).toBe(3);
});
