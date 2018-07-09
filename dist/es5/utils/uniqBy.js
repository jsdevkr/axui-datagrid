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
Object.defineProperty(exports, "__esModule", { value: true });
var uniqBy = function (arr, predicate) {
    var cb = typeof predicate === 'function' ? predicate : function (o) { return o[predicate]; };
    return __spread(arr
        .reduce(function (map, item) {
        var key = cb(item);
        map.has(key) || map.set(key, item);
        return map;
    }, new Map())
        .values());
};
exports.default = uniqBy;
//# sourceMappingURL=uniqBy.js.map