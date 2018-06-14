// https://github.com/lodash/lodash/blob/master/.internal/baseGetTag.js
const objectProto = Object.prototype;
const getProto = Object.getPrototypeOf;
const hasOwnProperty = objectProto.hasOwnProperty;
const toString = objectProto.toString;
const symToStringTag =
  typeof Symbol !== 'undefined' ? Symbol.toStringTag : undefined;
const fnToString = hasOwnProperty.toString;
const ObjectFunctionString = fnToString.call(Object);

function baseGetTag(value: any) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  if (!(symToStringTag && symToStringTag in Object(value))) {
    return toString.call(value);
  }
  const isOwn = hasOwnProperty.call(value, symToStringTag);
  const tag = value[symToStringTag];
  let unmasked = false;
  try {
    value[symToStringTag] = undefined;
    unmasked = true;
  } catch (e) {}

  const result = toString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

// https://github.com/lodash/lodash/blob/master/isObjectLike.js
export function isObjectLike(value: any) {
  return typeof value === 'object' && value !== null;
}

// https://github.com/lodash/lodash/blob/master/isObject.js
export function isObject(value: any) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

// jquery
export function isPlainObject(obj: any): boolean {
  let proto;
  let Ctor;

  // Detect obvious negatives
  // Use toString instead of jQuery.type to catch host objects
  if (!obj || toString.call(obj) !== '[object Object]') {
    return false;
  }

  proto = getProto(obj);

  // Objects with no prototype (e.g., `Object.create( null )`) are plain
  if (!proto) {
    return true;
  }

  // Objects with prototype are plain iff they were constructed by a global Object function
  Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (
    typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString
  );
}

// https://github.com/lodash/lodash/blob/master/isFunction.js
export function isFunction(value: any) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  const tag = baseGetTag(value);
  return (
    tag === '[object Function]' ||
    tag === '[object AsyncFunction]' ||
    tag === '[object GeneratorFunction]' ||
    tag === '[object Proxy]'
  );
}

// https://github.com/lodash/lodash/blob/master/isNumber.js
export function isNumber(value: any) {
  return (
    typeof value === 'number' ||
    (isObjectLike(value) && baseGetTag(value) === '[object Number]')
  );
}

/**
 *
 * @param _target
 * @param {(t: any) => boolean} _predicate
 * @return {any}
 */
export function findParentNode(_target: any, _predicate: (t: any) => boolean) {
  if (_target) {
    while (
      (function() {
        let result = true;
        if (typeof _predicate === 'undefined') {
          _target = _target.parentNode ? _target.parentNode : false;
        } else if (isFunction(_predicate)) {
          result = _predicate(_target);
        }
        return !result;
      })()
    ) {
      if (_target.parentNode && _target.parentNode.parentNode) {
        _target = _target.parentNode;
      } else {
        _target = false;
        break;
      }
    }
  }
  return _target;
}

/**
 *
 * @param e
 * @return {{x: any; y: any}}
 */
export function getMousePosition(e: any) {
  let mouseObj =
    'changedTouches' in e && e.changedTouches ? e.changedTouches[0] : e;
  // clientX, Y 쓰면 스크롤에서 문제 발생
  return {
    x: mouseObj.clientX,
    y: mouseObj.clientY,
  };
}

/**
 *
 * @param targetObject
 * @param {any[]} paths
 * @param defaultValue
 * @return {any}
 * @samples
 * ```js
 * const tgObj = { a: 1, b: { c: 2 }, arr: [1, 2, 3, 4] };
 * getPathValue(tgObj, ['b', 'c'])
 * // 2
 * getPathValue(tgObj, ['a', 'c'], 3);
 * // 3
 * ```
 */
export function getPathValue(
  targetObject: any,
  paths: any[],
  defaultValue?: any,
): any {
  let idx = 0;
  while (idx < paths.length) {
    if (targetObject == null) {
      return;
    }
    targetObject = targetObject[paths[idx]];
    idx += 1;
  }
  return typeof targetObject === 'undefined' ? defaultValue : targetObject;
}

/**
 * jQuery.extend 재구성
 * @param {boolean} deep
 * @param target
 * @param options
 * @return {any}
 */
export function mergeAll(deep: boolean, target: any, options: any) {
  let name;
  let src;
  let copy;
  let clone;
  let copyIsArray;

  if (Array.isArray(target) && Array.isArray(options)) {
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
