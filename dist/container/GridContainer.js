'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var act = _interopRequireWildcard(_actions);

var _GridRoot = require('../component/GridRoot');

var _GridRoot2 = _interopRequireDefault(_GridRoot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var mapStateToProps = function mapStateToProps(state) {
  return {
    store_receivedList: state.get("receivedList"),
    store_deletedList: state.get("deletedList"),
    store_list: state.get("list"),
    store_page: state.get("page"),
    store_sortInfo: state.get("sortInfo")
  };
};

// 액션함수 준비
var mapToDispatch = function mapToDispatch(dispatch) {
  return {
    init: function init(props, options) {
      return dispatch(act.init(props, options));
    },
    setData: function setData(data, options) {
      return dispatch(act.setData(data, options));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapToDispatch)(_GridRoot2.default);