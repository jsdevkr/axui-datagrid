"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sum(collectorData) {
    var _a = collectorData.key, key = _a === void 0 ? '' : _a, data = collectorData.data;
    return data.reduce(function (accumulator, currentValue) { return accumulator + currentValue[key]; }, 0);
}
function avg(collectorData) {
    return parseFloat((sum(collectorData) / collectorData.data.length).toFixed(4));
}
exports.default = { sum: sum, avg: avg };
//# sourceMappingURL=collector.js.map