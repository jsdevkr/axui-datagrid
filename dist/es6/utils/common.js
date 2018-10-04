"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/lodash/lodash/blob/master/.internal/baseGetTag.js
const objectProto = Object.prototype;
const getProto = Object.getPrototypeOf;
const hasOwnProperty = objectProto.hasOwnProperty;
const toString = objectProto.toString;
const symToStringTag = typeof Symbol !== 'undefined' ? Symbol.toStringTag : undefined;
const fnToString = hasOwnProperty.toString;
const ObjectFunctionString = fnToString.call(Object);
const freeGlobal = typeof global === 'object' &&
    global !== null &&
    global.Object === Object &&
    global;
const freeSelf = typeof self === 'object' &&
    self !== null &&
    self.Object === Object &&
    self;
/** Used as a reference to the global object. */
const root = freeGlobal || freeSelf || Function('return this')();
function baseGetTag(value) {
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
    }
    catch (e) { }
    const result = toString.call(value);
    if (unmasked) {
        if (isOwn) {
            value[symToStringTag] = tag;
        }
        else {
            delete value[symToStringTag];
        }
    }
    return result;
}
// https://github.com/lodash/lodash/blob/master/isObjectLike.js
function isObjectLike(value) {
    return typeof value === 'object' && value !== null;
}
exports.isObjectLike = isObjectLike;
// https://github.com/lodash/lodash/blob/master/isObject.js
function isObject(value) {
    const type = typeof value;
    return value != null && (type === 'object' || type === 'function');
}
exports.isObject = isObject;
// jquery
function isPlainObject(obj) {
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
    return (typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString);
}
exports.isPlainObject = isPlainObject;
// https://github.com/lodash/lodash/blob/master/isFunction.js
function isFunction(value) {
    if (!isObject(value)) {
        return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    const tag = baseGetTag(value);
    return (tag === '[object Function]' ||
        tag === '[object AsyncFunction]' ||
        tag === '[object GeneratorFunction]' ||
        tag === '[object Proxy]');
}
exports.isFunction = isFunction;
// https://github.com/lodash/lodash/blob/master/isNumber.js
function isNumber(value) {
    return (typeof value === 'number' ||
        (isObjectLike(value) && baseGetTag(value) === '[object Number]'));
}
exports.isNumber = isNumber;
function debounce(func, wait, options) {
    let lastArgs, lastThis, maxWait, result, timerId, lastCallTime;
    let lastInvokeTime = 0;
    let leading = false;
    let maxing = false;
    let trailing = true;
    // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
    const useRAF = !wait && wait !== 0 && typeof root.requestAnimationFrame === 'function';
    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }
    wait = +wait || 0;
    if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
        const args = lastArgs;
        const thisArg = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }
    function startTimer(pendingFunc, startTimerWait) {
        if (useRAF) {
            return root.requestAnimationFrame(pendingFunc);
        }
        return setTimeout(pendingFunc, startTimerWait);
    }
    function cancelTimer(id) {
        if (useRAF) {
            return root.cancelAnimationFrame(id);
        }
        clearTimeout(id);
    }
    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = startTimer(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;
        const timeWaiting = wait - timeSinceLastCall;
        return maxing
            ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
            : timeWaiting;
    }
    function shouldInvoke(time) {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;
        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined ||
            timeSinceLastCall >= wait ||
            timeSinceLastCall < 0 ||
            (maxing && timeSinceLastInvoke >= maxWait));
    }
    function timerExpired() {
        const time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        // Restart the timer.
        timerId = startTimer(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
        timerId = undefined;
        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
    }
    function cancel() {
        if (timerId !== undefined) {
            cancelTimer(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
    }
    function flush() {
        return timerId === undefined ? result : trailingEdge(Date.now());
    }
    function pending() {
        return timerId !== undefined;
    }
    let debounced = function (...args) {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);
        lastArgs = args;
        lastThis = Function('return this')();
        lastCallTime = time;
        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxing) {
                // Handle invocations in a tight loop.
                timerId = startTimer(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) {
            timerId = startTimer(timerExpired, wait);
        }
        return result;
    };
    debounced.cancel = cancel;
    debounced.flush = flush;
    debounced.pending = pending;
    return debounced;
}
exports.debounce = debounce;
function throttle(func, wait, options) {
    let leading = true;
    let trailing = true;
    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }
    if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    return debounce(func, wait, {
        leading: leading,
        maxWait: wait,
        trailing: trailing,
    });
}
exports.throttle = throttle;
exports.isDate = (value) => isObjectLike(value) && baseGetTag(value) === '[object Date]';
/**
 *
 * @param e
 * @return {{x: any; y: any}}
 */
function getMousePosition(e) {
    let mouseObj = 'changedTouches' in e && e.changedTouches ? e.changedTouches[0] : e;
    // clientX, Y 쓰면 스크롤에서 문제 발생
    return {
        x: mouseObj.clientX,
        y: mouseObj.clientY,
    };
}
exports.getMousePosition = getMousePosition;
function times(s, count) {
    return count < 1 ? '' : new Array(count + 1).join(s);
}
function padLeft(s, l = 2, padder = '0') {
    s = s.toString();
    return times(padder || '0', l - s.length) + s;
}
exports.padLeft = padLeft;
function padRight(s, l = 2, padder = '0') {
    return s.toString() + times(padder || '0', l - s.length);
}
exports.padRight = padRight;
