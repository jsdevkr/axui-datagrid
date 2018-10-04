"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param element
 * @return {number}
 */
function getInnerWidth(element) {
    const cs = window.getComputedStyle(element);
    return (element.offsetWidth -
        (parseFloat(cs.paddingLeft) +
            parseFloat(cs.paddingRight) +
            parseFloat(cs.borderLeftWidth) +
            parseFloat(cs.borderRightWidth)));
}
exports.getInnerWidth = getInnerWidth;
/**
 *
 * @param element
 * @return {number}
 */
function getInnerHeight(element) {
    const cs = window.getComputedStyle(element);
    return (element.offsetHeight -
        (parseFloat(cs.paddingTop) +
            parseFloat(cs.paddingBottom) +
            parseFloat(cs.borderTopWidth) +
            parseFloat(cs.borderBottomWidth)));
}
exports.getInnerHeight = getInnerHeight;
/**
 *
 * @param element
 * @return {number}
 */
function getOuterWidth(element) {
    return element ? element.offsetWidth : 0;
}
exports.getOuterWidth = getOuterWidth;
/**
 *
 * @param element
 * @return {number}
 */
function getOuterHeight(element) {
    return element ? element.offsetHeight : 0;
}
exports.getOuterHeight = getOuterHeight;
