"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
/**
 *
 * @param _target
 * @param {(t: any) => boolean} _predicate
 * @return {any}
 */
function findParentNode(_target, _predicate) {
    if (_target) {
        while ((function () {
            let result = true;
            if (typeof _predicate === 'undefined') {
                _target = _target.parentNode ? _target.parentNode : false;
            }
            else if (common_1.isFunction(_predicate)) {
                result = _predicate(_target);
            }
            return !result;
        })()) {
            if (_target.parentNode && _target.parentNode.parentNode) {
                _target = _target.parentNode;
            }
            else {
                _target = false;
                break;
            }
        }
    }
    return _target;
}
exports.default = findParentNode;
