"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uniqBy = (arr, predicate) => {
    const cb = typeof predicate === 'function' ? predicate : (o) => o[predicate];
    return [
        ...arr
            .reduce((map, item) => {
            const key = cb(item);
            map.has(key) || map.set(key, item);
            return map;
        }, new Map())
            .values(),
    ];
};
exports.default = uniqBy;
