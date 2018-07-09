"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function classNames(classNameObject) {
    let cx = [];
    if (typeof classNameObject === 'string') {
        cx.push(classNameObject);
    }
    else {
        for (let key in classNameObject) {
            if (classNameObject[key]) {
                cx.push(key);
            }
        }
    }
    return cx.join(' ');
}
exports.default = classNames;
//# sourceMappingURL=classNames.js.map