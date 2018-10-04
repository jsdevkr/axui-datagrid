"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayFromRange(start, end, step) {
    var range = [];
    if (typeof step === 'undefined') {
        step = 1;
    }
    if (end < start) {
        step = -step;
    }
    while (step > 0 ? end >= start : end <= start) {
        range.push(start);
        start += step;
    }
    return range;
}
exports.default = arrayFromRange;
