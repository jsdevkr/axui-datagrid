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

var GridScroll = function (_React$Component) {
  _inherits(GridScroll, _React$Component);

  function GridScroll(props) {
    _classCallCheck(this, GridScroll);

    var _this = _possibleConstructorReturn(this, (GridScroll.__proto__ || Object.getPrototypeOf(GridScroll)).call(this, props));

    _this.onClickScrollTrack = _this.onClickScrollTrack.bind(_this);
    return _this;
  }

  /*
  // 사실상 항상 리랜더 해야 하는 컴포넌트라서 제어하지 않을 작정
    shouldComponentUpdate(nextProps, nextState) {
      let sameProps = false;
       for(const k in this.props){
        if(typeof nextProps[k] === "undefined" || nextProps[k] !== this.props[k]){
          sameProps = true;
        }
      }
       return sameProps;
    }
  */

  _createClass(GridScroll, [{
    key: 'onClickScrollTrack',
    value: function onClickScrollTrack(e, barName) {
      e.preventDefault();
      if (e.target.getAttribute("data-scroll")) {
        this.props.onClickScrollTrack(e, barName);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var gridCSS = this.props.gridCSS,
          refCallback = this.props.refCallback,
          onMouseDownScrollBar = this.props.onMouseDownScrollBar,
          onClickScrollArrow = this.props.onClickScrollArrow,
          mounted = this.props.mounted,
          bodyHeight = this.props.bodyHeight,
          pageHeight = this.props.pageHeight,
          verticalScrollerHeight = this.props.verticalScrollerHeight,
          verticalScrollerWidth = this.props.verticalScrollerWidth,
          horizontalScrollerWidth = this.props.horizontalScrollerWidth,
          horizontalScrollerHeight = this.props.horizontalScrollerHeight,
          verticalScrollBarHeight = this.props.verticalScrollBarHeight,
          horizontalScrollBarWidth = this.props.horizontalScrollBarWidth,
          scrollerArrowSize = this.props.scrollerArrowSize,
          scrollerPadding = this.props.scrollerPadding,
          scrollBarLeft = this.props.scrollBarLeft,
          scrollBarTop = this.props.scrollBarTop;

      if (!mounted) return null;

      if (verticalScrollerWidth === 0 && horizontalScrollerHeight === 0) return null;

      var verticalArrowStyles = {
        width: verticalScrollerWidth,
        height: scrollerArrowSize / 2 + scrollerPadding
      };

      var arrowWidth = (verticalScrollerWidth - scrollerPadding * 2) / 2;
      var verticalTopArrowStyles = {
        left: scrollerPadding,
        top: (verticalArrowStyles.height - arrowWidth) / 2,
        borderTop: "0 none",
        borderRight: "solid " + arrowWidth + "px transparent",
        borderBottomWidth: arrowWidth + "px",
        borderLeft: "solid " + arrowWidth + "px transparent"
      };
      var verticalBottomArrowStyles = {
        left: scrollerPadding,
        top: (verticalArrowStyles.height - arrowWidth) / 2,
        borderTopWidth: arrowWidth + "px",
        borderRight: "solid " + arrowWidth + "px transparent",
        borderBottom: "0 none",
        borderLeft: "solid " + arrowWidth + "px transparent"
      };
      var verticalStyles = {
        width: verticalScrollerWidth,
        height: verticalScrollerHeight + scrollerPadding * 2 + scrollerArrowSize,
        bottom: pageHeight,
        padding: scrollerPadding,
        paddingTop: scrollerArrowSize / 2 + scrollerPadding
      };
      var verticalBarStyles = {
        height: verticalScrollBarHeight,
        top: scrollBarTop
      };

      var horizontalArrowStyles = {
        width: scrollerArrowSize / 2 + scrollerPadding,
        height: horizontalScrollerHeight
      };

      var horizontalLeftArrowStyles = {
        left: (horizontalArrowStyles.width - arrowWidth) / 2,
        top: scrollerPadding,
        borderTop: "solid " + arrowWidth + "px transparent",
        borderRightWidth: arrowWidth + "px",
        borderBottom: "solid " + arrowWidth + "px transparent",
        borderLeft: "0 none"
      };
      var horizontalRightArrowStyles = {
        left: (horizontalArrowStyles.width - arrowWidth) / 2,
        top: scrollerPadding,
        borderTop: "solid " + arrowWidth + "px transparent",
        borderRight: "0 none",
        borderBottom: "solid " + arrowWidth + "px transparent",
        borderLeftWidth: arrowWidth + "px"
      };
      var horizontalStyles = {
        width: horizontalScrollerWidth + scrollerPadding * 2 + scrollerArrowSize,
        height: horizontalScrollerHeight,
        bottom: (pageHeight - 1 - horizontalScrollerHeight) / 2,
        right: (pageHeight - 1 - horizontalScrollerHeight) / 2,
        padding: scrollerPadding,
        paddingLeft: scrollerArrowSize / 2 + scrollerPadding
      };
      var horizontalBarStyles = {
        width: horizontalScrollBarWidth,
        left: scrollBarLeft
      };

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(gridCSS.scroller) },
        verticalScrollerWidth ? _react2.default.createElement(
          'div',
          { 'data-scroll-track': 'vertical', style: verticalStyles },
          _react2.default.createElement(
            'div',
            { 'data-scroll-arrow': 'up', style: verticalArrowStyles },
            _react2.default.createElement('div', { 'data-arrow': true, style: verticalTopArrowStyles, onClick: function onClick(e) {
                return onClickScrollArrow(e, "up");
              } })
          ),
          _react2.default.createElement(
            'div',
            { 'data-scroll': 'vertical',
              ref: function ref(_ref) {
                return refCallback("vertical-scroll-track", _ref);
              },
              onClick: function onClick(e) {
                return _this2.onClickScrollTrack(e, "vertical");
              } },
            _react2.default.createElement('div', { className: (0, _classnames2.default)(gridCSS.scrollBar),
              style: verticalBarStyles,
              onMouseDown: function onMouseDown(e) {
                return onMouseDownScrollBar(e, "vertical");
              } })
          ),
          _react2.default.createElement(
            'div',
            { 'data-scroll-arrow': 'down', style: verticalArrowStyles },
            _react2.default.createElement('div', { 'data-arrow': true, style: verticalBottomArrowStyles, onClick: function onClick(e) {
                return onClickScrollArrow(e, "down");
              } })
          )
        ) : null,
        horizontalScrollerHeight ? _react2.default.createElement(
          'div',
          { 'data-scroll-track': 'horizontal', style: horizontalStyles },
          _react2.default.createElement(
            'div',
            { 'data-scroll-arrow': 'left', style: horizontalArrowStyles },
            _react2.default.createElement('div', { 'data-arrow': true, style: horizontalLeftArrowStyles, onClick: function onClick(e) {
                return onClickScrollArrow(e, "left");
              } })
          ),
          _react2.default.createElement(
            'div',
            { 'data-scroll': 'horizontal',
              ref: function ref(_ref2) {
                return refCallback("horizontal-scroll-track", _ref2);
              },
              onClick: function onClick(e) {
                return _this2.onClickScrollTrack(e, "horizontal");
              } },
            _react2.default.createElement('div', { className: (0, _classnames2.default)(gridCSS.scrollBar),
              style: horizontalBarStyles,
              onMouseDown: function onMouseDown(e) {
                return onMouseDownScrollBar(e, "horizontal");
              } })
          ),
          _react2.default.createElement(
            'div',
            { 'data-scroll-arrow': 'right', style: horizontalArrowStyles },
            _react2.default.createElement('div', { 'data-arrow': true, style: horizontalRightArrowStyles, onClick: function onClick(e) {
                return onClickScrollArrow(e, "right");
              } })
          )
        ) : null
      );
    }
  }]);

  return GridScroll;
}(_react2.default.Component);

exports.default = GridScroll;