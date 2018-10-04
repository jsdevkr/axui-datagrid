"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
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
    let name;
    let src;
    let copy;
    let clone;
    let copyIsArray;
    if (!options) {
    }
    else if (Array.isArray(target) && Array.isArray(options)) {
        return [...target, ...options];
    }
    else {
        for (name of Object.keys(options)) {
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
    // Return the modified object
    return target;
}
exports.default = mergeAll;
