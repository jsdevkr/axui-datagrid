// https://github.com/lodash/lodash/blob/master/.internal/baseGetTag.js
const objectProto = Object.prototype;
const hasOwnProperty = objectProto.hasOwnProperty;
const toString = objectProto.toString;
const symToStringTag =
  typeof Symbol !== 'undefined' ? Symbol.toStringTag : undefined;

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

export function getMousePosition(e: any) {
  let mouseObj =
    'changedTouches' in e && e.changedTouches ? e.changedTouches[0] : e;
  // clientX, Y 쓰면 스크롤에서 문제 발생
  return {
    x: mouseObj.clientX,
    y: mouseObj.clientY,
  };
}
