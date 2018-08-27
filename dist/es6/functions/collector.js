"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sum(collectorData) {
    const { key = '', data } = collectorData;
    return data.reduce((accumulator, currentValue) => accumulator + currentValue[key], 0);
}
function avg(collectorData) {
    return parseFloat((sum(collectorData) / collectorData.data.length).toFixed(4));
}
exports.default = { sum, avg };
//# sourceMappingURL=collector.js.map