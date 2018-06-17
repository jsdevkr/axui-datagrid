import { isFunction } from './common';

/**
 *
 * @param _target
 * @param {(t: any) => boolean} _predicate
 * @return {any}
 */
function findParentNode(_target: any, _predicate: (t: any) => boolean) {
  if (_target) {
    while (
      (function() {
        let result = true;
        if (typeof _predicate === 'undefined') {
          _target = _target.parentNode ? _target.parentNode : false;
        } else if (isFunction(_predicate)) {
          result = _predicate(_target);
        }
        return !result;
      })()
    ) {
      if (_target.parentNode && _target.parentNode.parentNode) {
        _target = _target.parentNode;
      } else {
        _target = false;
        break;
      }
    }
  }
  return _target;
}

export default findParentNode;
