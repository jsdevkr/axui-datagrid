"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function classNames(classNameObject) {
    var cx = [];
    if (typeof classNameObject === 'string') {
        cx.push(classNameObject);
    }
    else {
        for (var key in classNameObject) {
            if (classNameObject[key]) {
                cx.push(key);
            }
        }
    }
    return cx.join(' ');
}
exports.default = classNames;
