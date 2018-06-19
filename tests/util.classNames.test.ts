import { types } from 'axui-datagrid/stores';
import { classNames } from 'axui-datagrid/utils';

test('test : classNames', () => {
  let myClassNames = {
    class1: false,
    class2: true,
    class3: true,
  };

  expect(classNames(myClassNames)).toBe('class2 class3');
});

test('test : classNames ordered name', () => {
  let myClassNames = {
    class3: true,
    class1: false,
    class2: true,
  };

  expect(classNames(myClassNames)).toBe('class3 class2');
});
