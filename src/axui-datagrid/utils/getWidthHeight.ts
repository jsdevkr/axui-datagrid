
/**
 *
 * @param element
 * @return {number}
 */
export function getInnerWidth(element: any): number {
  const cs: any = window.getComputedStyle(element);
  return (
    element.offsetWidth -
    (parseFloat(cs.paddingLeft) +
      parseFloat(cs.paddingRight) +
      parseFloat(cs.borderLeftWidth) +
      parseFloat(cs.borderRightWidth))
  );
}

/**
 *
 * @param element
 * @return {number}
 */
export function getInnerHeight(element: any): number {
  const cs: any = window.getComputedStyle(element);
  return (
    element.offsetHeight -
    (parseFloat(cs.paddingTop) +
      parseFloat(cs.paddingBottom) +
      parseFloat(cs.borderTopWidth) +
      parseFloat(cs.borderBottomWidth))
  );
}

/**
 *
 * @param element
 * @return {number}
 */
export function getOuterWidth(element: HTMLElement): number {
  return element.offsetWidth;
}

/**
 *
 * @param element
 * @return {number}
 */
export function getOuterHeight(element: HTMLElement): number {
  return element.offsetHeight;
}
