"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
/**
 * jQuery.extend 재구성
 * @param {boolean} deep
 * @param target
 * @param options
 * @return {any}
 */
function mergeAll(deep, target, options) {
    if (arguments.length === 2) {
        target = arguments[0];
        options = arguments[1];
    }
    var name;
    var src;
    var copy;
    var clone;
    var copyIsArray;
    if (!options) {
    }
    else if (Array.isArray(target) && Array.isArray(options)) {
        return __spread(target, options);
    }
    else {
        try {
            for (var _a = __values(Object.keys(options)), _b = _a.next(); !_b.done; _b = _a.next()) {
                name = _b.value;
                src = target[name];
                copy = options[name];
                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }
                // Recurse if we're merging plain objects or arrays
                if (deep &&
                    copy &&
                    (common_1.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    }
                    else {
                        clone = src && common_1.isPlainObject(src) ? src : {};
                    }
                    // Never move original objects, clone them
                    target[name] = mergeAll(deep, clone, copy);
                    // Don't bring in undefined values
                }
                else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    // Return the modified object
    return target;
    var e_1, _c;
}
exports.default = mergeAll;
//# sourceMappingURL=mergeAll.js.map