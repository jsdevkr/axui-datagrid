const supportTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

export const mouseEventNames = {
  "mousedown": (supportTouch) ? "touchstart" : "mousedown",
  "mousemove": (supportTouch) ? "touchmove" : "mousemove",
  "mouseup": (supportTouch) ? "touchend" : "mouseup"
};