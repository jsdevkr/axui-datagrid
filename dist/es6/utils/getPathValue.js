"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function getPathValue(targetObject, paths, defaultValue) {
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
exports.default = getPathValue;
