export declare function isObjectLike(value: any): boolean;
export declare function isObject(value: any): boolean;
export declare function isPlainObject(obj: any): boolean;
export declare function isFunction(value: any): boolean;
export declare function isNumber(value: any): boolean;
export declare function debounce(func: any, wait: any, options?: any): any;
export declare function throttle(func: any, wait: any, options?: any): any;
export declare const isDate: (value: any) => boolean;
/**
 *
 * @param e
 * @return {{x: any; y: any}}
 */
export declare function getMousePosition(e: any): {
    x: any;
    y: any;
};
export declare function padLeft(s: any, l?: number, padder?: string): string;
export declare function padRight(s: any, l?: number, padder?: string): string;
