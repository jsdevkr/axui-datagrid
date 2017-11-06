'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridPage = function (_React$Component) {
  _inherits(GridPage, _React$Component);

  function GridPage(props) {
    _classCallCheck(this, GridPage);

    return _possibleConstructorReturn(this, (GridPage.__proto__ || Object.getPrototypeOf(GridPage)).call(this, props));
  }

  _createClass(GridPage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var sameProps = false;

      if (this.props.mounted !== nextProps.mounted || this.props.pageButtons !== nextProps.pageButtons || JSON.stringify(this.props.styles) !== JSON.stringify(nextProps.styles)) {

        sameProps = true;
      }

      return sameProps;
    }
  }, {
    key: 'render',
    value: function render() {
      var mounted = this.props.mounted,
          gridCSS = this.props.gridCSS,
          styles = this.props.styles,
          pageButtonsContainerWidth = this.props.pageButtonsContainerWidth,
          pageButtons = this.props.pageButtons,
          pageButtonHeight = this.props.pageButtonHeight,
          onClickPageButton = this.props.onClickPageButton;

      if (!mounted) return null;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(gridCSS.page), style: { height: styles.pageHeight } },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(gridCSS.pageButtons), style: { width: pageButtonsContainerWidth, paddingTop: (styles.pageHeight - pageButtonHeight) / 2 - 1 } },
          pageButtons.map(function (button, bi) {
            return _react2.default.createElement(
              'button',
              { key: bi, style: { height: pageButtonHeight, width: button.width || pageButtonHeight }, onClick: function onClick(e) {
                  return onClickPageButton(e, button.onClick);
                } },
              _react2.default.createElement('div', { 'data-button-svg': true, className: (0, _classnames2.default)(gridCSS[button.className]) })
            );
          })
        )
      );
    }
  }]);

  return GridPage;
}(_react2.default.Component);

exports.default = GridPage;