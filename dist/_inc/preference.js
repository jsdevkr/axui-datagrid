"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var supportTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

var mouseEventNames = exports.mouseEventNames = {
  "mousedown": supportTouch ? "touchstart" : "mousedown",
  "mousemove": supportTouch ? "touchmove" : "mousemove",
  "mouseup": supportTouch ? "touchend" : "mouseup"
};