import { uniqBy } from 'axui-datagrid/utils';

test('test : uniqBy', () => {
  const uniqArray = uniqBy([{ x: 1 }, { x: 2 }, { x: 1 }, { x: 4 }], 'x');

  console.log(uniqArray);

  expect(uniqArray.length).toBe(3);
});
