import { isPlainObject } from './common';

/**
 * jQuery.extend 재구성
 * @param {boolean} deep
 * @param target
 * @param options
 * @return {any}
 */
function mergeAll(deep: boolean, target: any, options: any) {
  let name;
  let src;
  let copy;
  let clone;
  let copyIsArray;

  if (!options) {
  } else if (Array.isArray(target) && Array.isArray(options)) {
    return [...target, ...options];
  } else {
    for (name of Object.keys(options)) {
      src = target[name];
      copy = options[name];

      // Prevent never-ending loop
      if (target === copy) {
        continue;
      }

      // Recurse if we're merging plain objects or arrays
      if (
        deep &&
        copy &&
        (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
      ) {
        if (copyIsArray) {
          copyIsArray = false;
          clone = src && Array.isArray(src) ? src : [];
        } else {
          clone = src && isPlainObject(src) ? src : {};
        }

        // Never move original objects, clone them
        target[name] = mergeAll(deep, clone, copy);

        // Don't bring in undefined values
      } else if (copy !== undefined) {
        target[name] = copy;
      }
    }
  }

  // Return the modified object
  return target;
}

export default mergeAll;
