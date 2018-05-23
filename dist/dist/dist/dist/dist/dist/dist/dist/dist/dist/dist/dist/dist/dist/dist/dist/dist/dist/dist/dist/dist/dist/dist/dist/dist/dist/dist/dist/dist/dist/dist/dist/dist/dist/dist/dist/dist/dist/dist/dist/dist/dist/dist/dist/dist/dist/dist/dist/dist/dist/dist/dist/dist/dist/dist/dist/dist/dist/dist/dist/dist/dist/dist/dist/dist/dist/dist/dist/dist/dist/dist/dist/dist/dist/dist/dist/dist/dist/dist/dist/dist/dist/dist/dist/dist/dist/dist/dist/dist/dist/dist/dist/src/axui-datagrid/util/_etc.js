"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
/**
 * _target의 조상중에 원하는 조건의 엘리먼트가 있는지 검사합니다. 있을 때는 해당 엘리먼트를 반환하고 없으면 false를 반환 합니다
 * Checks the parent of the target for elements of the desired condition. Returns the element if the element with the desired condition exists, otherwise returns false.
 * @param _target
 * @param _predicate
 * @return {boolean|Element}
 * @example
 * ```js
 * let downedElement = UTIL.findParentNodeByAttr(ee.target, (element) => {
 *  return element.getAttribute('data-column-filter') === 'true';
 * });
 * // false | Element
 * ```
 */
function findParentNodeByAttr(_target, _predicate) {
    if (_target) {
        while ((function () {
            var result = true;
            if (typeof _predicate === 'undefined') {
                _target = _target.parentNode ? _target.parentNode : false;
            }
            else if (lodash_1.isFunction(_predicate) && lodash_1.isElement(_target)) {
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
exports.findParentNodeByAttr = findParentNodeByAttr;
/**
 *
 * @param e
 * @return {{clientX, clientY}}
 */
function getMousePosition(e) {
    var mouseObj = 'changedTouches' in e && e.changedTouches ? e.changedTouches[0] : e;
    // clientX, Y 쓰면 스크롤에서 문제 발생
    return {
        x: mouseObj.clientX,
        y: mouseObj.clientY,
    };
}
exports.getMousePosition = getMousePosition;
function cssNumber(val) {
    var re = /\D?(\d+)([a-zA-Z%]*)/i;
    var found = ('' + val).match(re);
    var unit = found[2] || 'px';
    return found[1] + unit;
}
exports.cssNumber = cssNumber;
//# sourceMappingURL=_etc.js.map