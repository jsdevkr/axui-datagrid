'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridBody = function (_React$Component) {
  _inherits(GridBody, _React$Component);

  function GridBody(props) {
    _classCallCheck(this, GridBody);

    return _possibleConstructorReturn(this, (GridBody.__proto__ || Object.getPrototypeOf(GridBody)).call(this, props));
  }

  _createClass(GridBody, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var sameProps = false;

      if (this.props.mounted !== nextProps.mounted || JSON.stringify(this.props.options) !== JSON.stringify(nextProps.options) || this.props.CTInnerWidth !== nextProps.CTInnerWidth || this.props.CTInnerHeight !== nextProps.CTInnerHeight || JSON.stringify(this.props.colGroup) !== JSON.stringify(nextProps.colGroup) || this.props.list !== nextProps.list || this.props.scrollLeft !== nextProps.scrollLeft || this.props.scrollTop !== nextProps.scrollTop) {
        sameProps = true;
      }

      return sameProps;
    }
  }, {
    key: 'render',
    value: function render() {

      var gridCSS = this.props.gridCSS,
          refCallback = this.props.refCallback,
          mounted = this.props.mounted,
          options = this.props.options,
          styles = this.props.styles,
          frozenColumnIndex = this.props.frozenColumnIndex,
          colGroup = this.props.colGroup,
          asideColGroup = this.props.asideColGroup,
          leftHeaderColGroup = this.props.leftHeaderColGroup,
          headerColGroup = this.props.headerColGroup,
          bodyTable = this.props.bodyTable,
          asideBodyRowData = this.props.asideBodyRowData,
          asideBodyGroupingData = this.props.asideBodyGroupingData,
          leftBodyRowData = this.props.leftBodyRowData,
          leftBodyGroupingData = this.props.leftBodyGroupingData,
          bodyRowData = this.props.bodyRowData,
          bodyGroupingData = this.props.bodyGroupingData,
          list = this.props.list,
          scrollLeft = this.props.scrollLeft,
          scrollTop = this.props.scrollTop,
          CTInnerWidth = this.props.CTInnerWidth,
          CTInnerHeight = this.props.CTInnerHeight;

      if (!mounted) return null;

      var scrollPaddingLeft = headerColGroup[0] ? headerColGroup[0]._sx : 0;

      var _paintBody = function _paintBody(_panelName, _style) {
        return _react2.default.createElement(
          'div',
          { 'data-panel': _panelName, style: _style },
          _react2.default.createElement('table', null)
        );
      };

      var paintBody = function paintBody(_panelName, _colGroup, _bodyRow, _groupRow, _list, _scrollConfig, _style) {

        var getFieldSpan = function getFieldSpan(_colGroup, _col, _item, _itemIdx) {
          var lineHeight = options.body.columnHeight - options.body.columnPadding * 2 - options.body.columnBorderWidth;
          var colAlign = options.body.align || _col.align;
          var label = void 0;

          if (_col.key === "__line_number__") {
            label = _itemIdx + 1;
          } else if (_col.key === "__row_selector__") {
            label = _react2.default.createElement('div', { className: (0, _classnames2.default)(gridCSS.checkBox), style: { maxHeight: _col.width - 10 + 'px', minHeight: _col.width - 10 + 'px' } });
          } else {
            label = _item[_col.key];
          }

          return _react2.default.createElement(
            'span',
            {
              'data-span': true,
              'data-align': colAlign,
              style: {
                height: options.body.columnHeight - options.body.columnBorderWidth + "px",
                lineHeight: lineHeight + "px"
              } },
            label || ' '
          );
        };

        _style.paddingTop = _scrollConfig.sRowIndex * styles.bodyTrHeight;
        if (_scrollConfig.paddingLeft) {
          _style.paddingLeft = _scrollConfig.paddingLeft;
        }

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
              (0, _immutable.Range)(_scrollConfig.sRowIndex, _scrollConfig.eRowIndex).map(function (li) {
                var item = _list.get(li);
                if (item) {

                  //className={classNames(gridCSS["tr-" + (li % 4)])}
                  return _bodyRow.rows.map(function (row, ri) {
                    return _react2.default.createElement(
                      'tr',
                      {
                        key: ri
                      },
                      row.cols.map(function (col, ci) {
                        var cellHeight = options.body.columnHeight * col.rowspan - options.body.columnBorderWidth;
                        var classNameItmes = {};
                        classNameItmes[gridCSS.hasBorder] = true;

                        /*
                        if (row.cols.length == ci + 1) {
                          classNameItmes[gridCSS.isLastColumn] = true;
                        }
                        */
                        if (col.columnAttr === "lineNumber") {
                          classNameItmes[gridCSS.lineNumber] = true;
                        } else if (col.columnAttr === "rowSelector") {
                          classNameItmes[gridCSS.rowSelector] = true;
                        } else {}

                        return _react2.default.createElement(
                          'td',
                          {
                            key: ci,
                            'data-pos': li + ',' + col.rowIndex + ',' + col.colIndex,
                            colSpan: col.colspan,
                            rowSpan: col.rowspan,
                            className: (0, _classnames2.default)(classNameItmes),
                            style: { height: cellHeight, minHeight: "1px" } },
                          getFieldSpan(colGroup, col, item, li)
                        );
                      }),
                      _react2.default.createElement(
                        'td',
                        null,
                        '\xA0'
                      )
                    );
                  });
                }
              })
            )
          )
        );
      };

      var topBodyScrollConfig = {
        sRowIndex: 0,
        eRowIndex: options.frozenRowIndex
      };
      var bodyScrollConfig = {
        sRowIndex: Math.floor(-scrollTop / styles.bodyTrHeight) + options.frozenRowIndex
      };
      bodyScrollConfig.eRowIndex = bodyScrollConfig.sRowIndex + Math.ceil(styles.bodyHeight / styles.bodyTrHeight) + 1;

      var topAsideBodyPanelStyle = {
        left: 0,
        width: styles.asidePanelWidth,
        top: 0,
        height: styles.frozenRowHeight
      };
      var bottomAsideBodyPanelStyle = {
        left: 0,
        width: styles.asidePanelWidth,
        top: styles.bodyHeight - styles.footSumHeight,
        height: styles.footSumHeight
      };
      var asideBodyPanelStyle = {
        left: 0,
        width: styles.asidePanelWidth,
        top: styles.frozenRowHeight,
        height: styles.bodyHeight - styles.frozenRowHeight - styles.footSumHeight
      };

      var topLeftBodyPanelStyle = {
        left: styles.asidePanelWidth,
        width: styles.frozenPanelWidth,
        top: 0,
        height: styles.frozenRowHeight
      };
      var bottomLeftBodyPanelStyle = {
        left: styles.asidePanelWidth,
        width: styles.frozenPanelWidth,
        top: styles.bodyHeight - styles.footSumHeight,
        height: styles.footSumHeight
      };
      var leftBodyPanelStyle = {
        left: styles.asidePanelWidth,
        width: styles.frozenPanelWidth,
        top: styles.frozenRowHeight,
        height: styles.bodyHeight - styles.frozenRowHeight - styles.footSumHeight
      };

      var topBodyPanelStyle = {
        left: styles.frozenPanelWidth + styles.asidePanelWidth,
        width: styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth,
        top: 0,
        height: styles.frozenRowHeight
      };
      var bottomBodyPanelStyle = {
        left: styles.frozenPanelWidth + styles.asidePanelWidth,
        width: styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth,
        top: styles.bodyHeight - styles.footSumHeight,
        height: styles.footSumHeight
      };

      var bodyPanelStyle = {
        left: styles.frozenPanelWidth + styles.asidePanelWidth,
        width: styles.CTInnerWidth - styles.asidePanelWidth - styles.frozenPanelWidth - styles.rightPanelWidth,
        top: styles.frozenRowHeight,
        height: styles.bodyHeight - styles.frozenRowHeight - styles.footSumHeight
      };

      var topBodyScrollStyle = {
        left: scrollLeft
      };
      var asideBodyScrollStyle = {
        top: scrollTop
      };
      var leftBodyScrollStyle = {
        top: scrollTop
      };
      var bodyScrollStyle = {
        left: scrollLeft,
        top: scrollTop
      };
      var bottomBodyScrollStyle = {
        left: scrollLeft
      };

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(gridCSS.body), style: { height: styles.bodyHeight } },
        styles.asidePanelWidth > 0 && styles.frozenRowHeight > 0 ? _paintBody("top-aside-body", topAsideBodyPanelStyle) : null,
        styles.frozenPanelWidth > 0 && styles.frozenRowHeight > 0 ? _paintBody("top-left-body", topLeftBodyPanelStyle) : null,
        styles.frozenRowHeight > 0 ? _react2.default.createElement(
          'div',
          { 'data-scroll-container': 'top-body-scroll-container', style: topBodyPanelStyle },
          _paintBody("top-body-scroll", topBodyScrollStyle)
        ) : null,
        styles.asidePanelWidth > 0 ? _react2.default.createElement(
          'div',
          { 'data-scroll-container': 'aside-body-scroll-container', style: asideBodyPanelStyle },
          paintBody("aside-body-scroll", asideColGroup, asideBodyRowData, asideBodyGroupingData, list, bodyScrollConfig, asideBodyScrollStyle)
        ) : null,
        styles.frozenPanelWidth > 0 ? _react2.default.createElement(
          'div',
          { 'data-scroll-container': 'left-body-scroll-container', style: leftBodyPanelStyle },
          paintBody("left-body-scroll", leftHeaderColGroup, leftBodyRowData, leftBodyGroupingData, list, bodyScrollConfig, leftBodyScrollStyle)
        ) : null,
        _react2.default.createElement(
          'div',
          { 'data-scroll-container': 'body-scroll-container', style: bodyPanelStyle, ref: function ref(_ref2) {
              return refCallback("body-scroll-container", _ref2);
            } },
          paintBody("body-scroll", headerColGroup, bodyRowData, bodyGroupingData, list, Object.assign({}, bodyScrollConfig, { paddingLeft: scrollPaddingLeft }), bodyScrollStyle)
        ),
        styles.asidePanelWidth > 0 && styles.footSumHeight > 0 ? _paintBody("bottom-aside-body", bottomAsideBodyPanelStyle) : null,
        styles.frozenPanelWidth > 0 && styles.footSumHeight > 0 ? _paintBody("bottom-left-body", bottomLeftBodyPanelStyle) : null,
        styles.footSumHeight > 0 ? _react2.default.createElement(
          'div',
          { 'data-scroll-container': 'bottom-body-scroll-container', style: bottomBodyPanelStyle },
          _paintBody("bottom-body-scroll", bottomBodyScrollStyle)
        ) : null
      );
    }
  }]);

  return GridBody;
}(_react2.default.Component);

exports.default = GridBody;