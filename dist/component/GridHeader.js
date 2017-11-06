'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../_inc/utils');

var UTIL = _interopRequireWildcard(_utils);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridHeader = function (_React$Component) {
  _inherits(GridHeader, _React$Component);

  function GridHeader(props) {
    _classCallCheck(this, GridHeader);

    var _this = _possibleConstructorReturn(this, (GridHeader.__proto__ || Object.getPrototypeOf(GridHeader)).call(this, props));

    _this.onMouseDownColumnResizer = _this.onMouseDownColumnResizer.bind(_this);
    return _this;
  }

  _createClass(GridHeader, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var sameProps = false;

      if (this.props.mounted !== nextProps.mounted || JSON.stringify(this.props.optionsHeader) !== JSON.stringify(nextProps.optionsHeader) || JSON.stringify(this.props.styles) !== JSON.stringify(nextProps.styles) || JSON.stringify(this.props.headerColGroup) !== JSON.stringify(nextProps.headerColGroup) || this.props.scrollLeft !== nextProps.scrollLeft) {
        sameProps = true;
      }

      return sameProps;
    }
  }, {
    key: 'onMouseDownColumnResizer',
    value: function onMouseDownColumnResizer(e, col) {
      var _this2 = this;

      e.preventDefault();

      var resizer = e.target;
      var prevLeft = Number(resizer.getAttribute("data-prev-left"));
      var currLeft = Number(resizer.getAttribute("data-left"));
      var newWidth = void 0;
      var startMousePosition = UTIL.getMousePosition(e).x;

      var onMouseMove = function onMouseMove(ee) {
        var _UTIL$getMousePositio = UTIL.getMousePosition(ee),
            x = _UTIL$getMousePositio.x,
            y = _UTIL$getMousePositio.y;

        var newLeft = currLeft + x - startMousePosition;
        if (newLeft < prevLeft) {
          newLeft = prevLeft;
        }

        resizer.style.left = newLeft - 2 + 'px';
        newWidth = newLeft - prevLeft;
      };

      var offEvent = function offEvent(e) {
        e.preventDefault();
        startMousePosition = null;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', offEvent);
        document.removeEventListener('mouseleave', offEvent);

        // console.log(newWidth);
        _this2.props.onResizeColumnResizer(e, col, newWidth);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', offEvent);
      document.addEventListener('mouseleave', offEvent);
    }
  }, {
    key: 'render',
    value: function render() {

      var gridCSS = this.props.gridCSS,
          refCallback = this.props.refCallback,
          onResizeColumnResizer = this.props.onResizeColumnResizer,
          mounted = this.props.mounted,
          optionsHeader = this.props.optionsHeader,
          styles = this.props.styles,
          frozenColumnIndex = this.props.frozenColumnIndex,
          colGroup = this.props.colGroup,
          asideColGroup = this.props.asideColGroup,
          leftHeaderColGroup = this.props.leftHeaderColGroup,
          headerColGroup = this.props.headerColGroup,
          asideHeaderData = this.props.asideHeaderData,
          leftHeaderData = this.props.leftHeaderData,
          headerData = this.props.headerData,
          scrollLeft = this.props.scrollLeft;

      if (!mounted) return null;

      var onMouseDownColumnResizer = this.onMouseDownColumnResizer;
      var printHeader = function printHeader(_panelName, _colGroup, _bodyRow, _style) {

        var getFieldSpan = function getFieldSpan(_colGroup, _col) {
          var lineHeight = optionsHeader.columnHeight - optionsHeader.columnPadding * 2 - optionsHeader.columnBorderWidth;
          var colAlign = optionsHeader.align || _col.align;
          var label = void 0,
              sorter = void 0,
              filter = void 0;

          if (_col.key === "__checkbox_header__") {
            if (optionsHeader.selector) {
              label = _react2.default.createElement('div', { 'data-checkbox': true, style: {
                  maxHeight: _col.width - 10 + "px",
                  minHeight: _col.width - 10 + "px"
                } });
            }
          } else {
            label = _col.label;
          }

          if (_col.key && _col.colIndex !== null && typeof _col.colIndex !== "undefined" && (optionsHeader.sortable === true || _col.sortable === true) && _col.sortable !== false) {
            sorter = _react2.default.createElement('span', { 'data-sorter': _col.colIndex, 'data-sorter-order': _colGroup[_col.colIndex].sort });
          }

          if (_col.colIndex !== null && typeof _col.colIndex !== "undefined" && optionsHeader.enableFilter) {
            filter = _react2.default.createElement('span', { 'data-filter': _col.colIndex, 'data-filter-value': '' });
          }

          return _react2.default.createElement(
            'span',
            {
              'data-span': true,
              'data-align': colAlign,
              style: {
                height: optionsHeader.columnHeight - optionsHeader.columnBorderWidth + "px",
                lineHeight: lineHeight + "px"
              } },
            sorter,
            label || ' ',
            filter
          );
        };

        return _react2.default.createElement(
          'div',
          { 'data-panel': _panelName, style: _style, ref: function ref(_ref) {
              return refCallback(_panelName, _ref);
            } },
          _react2.default.createElement(
            'table',
            { style: { height: "100%" } },
            _react2.default.createElement(
              'colgroup',
              null,
              _colGroup.map(function (col, ci) {
                return _react2.default.createElement('col', {
                  key: ci,
                  style: { width: col._width + "px" } });
              }),
              _react2.default.createElement('col', null)
            ),
            _react2.default.createElement(
              'tbody',
              null,
              _bodyRow.rows.map(function (row, ri) {
                return _react2.default.createElement(
                  'tr',
                  {
                    key: ri,
                    className: '' },
                  row.cols.map(function (col, ci) {
                    var cellHeight = optionsHeader.columnHeight * col.rowspan - optionsHeader.columnBorderWidth;
                    var classNameItmes = {};
                    classNameItmes[gridCSS.hasBorder] = true;
                    classNameItmes[gridCSS.headerColumn] = true;
                    if (col.columnAttr === "lineNumber") {
                      classNameItmes[gridCSS.headerCorner] = true;
                    }
                    /*
                    if (row.cols.length == ci + 1) {
                      classNameItmes[gridCSS.isLastColumn] = true;
                    }
                    */

                    return _react2.default.createElement(
                      'td',
                      {
                        key: ci,
                        colSpan: col.colspan,
                        rowSpan: col.rowspan,
                        className: (0, _classnames2.default)(classNameItmes),
                        style: { height: cellHeight, minHeight: "1px" } },
                      getFieldSpan(colGroup, col)
                    );
                  }),
                  _react2.default.createElement(
                    'td',
                    null,
                    '\xA0'
                  )
                );
              })
            )
          ),
          function () {
            var resizerHeight = optionsHeader.columnHeight * _bodyRow.rows.length - optionsHeader.columnBorderWidth;
            var resizer = void 0,
                resizerLeft = 0,
                resizerWidth = 4;
            return _colGroup.map(function (col, ci) {
              if (col.colIndex !== null && typeof col.colIndex !== "undefined") {
                var prevResizerLeft = resizerLeft;
                resizerLeft += col._width;
                resizer = _react2.default.createElement('div', {
                  key: ci,
                  'data-column-resizer': col.colIndex,
                  'data-prev-left': prevResizerLeft,
                  'data-left': resizerLeft,
                  style: { width: resizerWidth, height: resizerHeight + 'px', left: resizerLeft - resizerWidth / 2 + 'px' },
                  onMouseDown: function onMouseDown(e) {
                    return onMouseDownColumnResizer(e, col);
                  }
                });
              }
              return resizer;
            });
          }()
        );
      };

      var asideHeaderPanelStyle = {
        left: 0,
        width: styles.asidePanelWidth,
        height: styles.headerHeight
      };
      var leftHeaderPanelStyle = {
        left: styles.asidePanelWidth,
        width: styles.frozenPanelWidth,
        height: styles.headerHeight
      };
      var headerPanelStyle = {
        left: styles.frozenPanelWidth + styles.asidePanelWidth,
        width: styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth,
        height: styles.headerHeight
      };
      var headerScrollStyle = {
        height: styles.headerHeight,
        left: scrollLeft
      };

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(gridCSS.header), style: { height: styles.headerHeight } },
        styles.asidePanelWidth > 0 ? printHeader("aside-header", asideColGroup, asideHeaderData, asideHeaderPanelStyle) : null,
        frozenColumnIndex > 0 ? printHeader("left-header", leftHeaderColGroup, leftHeaderData, leftHeaderPanelStyle) : null,
        _react2.default.createElement(
          'div',
          { 'data-scroll-container': 'header-scroll-container', style: headerPanelStyle },
          printHeader("header-scroll", headerColGroup, headerData, headerScrollStyle)
        )
      );
    }
  }]);

  return GridHeader;
}(_react2.default.Component);

exports.default = GridHeader;