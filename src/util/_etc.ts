import isElement from 'lodash-es/isElement';
import isFunction from 'lodash-es/isFunction';

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
export function findParentNodeByAttr( _target, _predicate ) {
  if ( _target ) {
    while ( (function () {
      let result = true;
      if ( typeof _predicate === 'undefined' ) {
        _target = (_target.parentNode) ? _target.parentNode : false;
      }
      else if ( isFunction( _predicate ) && isElement( _target ) ) {
        result = _predicate( _target );
      }
      return !result;
    })() ) {
      if ( _target.parentNode && _target.parentNode.parentNode ) {
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

/**
 *
 * @param e
 * @return {{clientX, clientY}}
 */
export function getMousePosition( e ) {
  let mouseObj = ('changedTouches' in e && e.changedTouches) ? e.changedTouches[ 0 ] : e;
  // clientX, Y 쓰면 스크롤에서 문제 발생
  return {
    x: mouseObj.clientX,
    y: mouseObj.clientY
  }
}

export function cssNumber( val ) {
  const re = /\D?(\d+)([a-zA-Z%]*)/i;
  const found = ('' + val).match( re );
  const unit = found[ 2 ] || 'px';

  return found[ 1 ] + unit;
}