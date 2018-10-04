"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNode(getNodeFn) {
    return getNodeFn && getNodeFn();
}
exports.default = getNode;
