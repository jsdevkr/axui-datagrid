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
declare function getPathValue(targetObject: any, paths: any[], defaultValue?: any): any;
export default getPathValue;
