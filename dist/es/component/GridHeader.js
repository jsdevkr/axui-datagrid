"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var UTIL = require("../_inc/utils");
var classnames_1 = require("classnames");
var GridHeader = /** @class */ (function (_super) {
    __extends(GridHeader, _super);
    function GridHeader(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            columnResizing: false,
            columnResizerLeft: 0
        };
        _this.onMouseDownColumnResizer = _this.onMouseDownColumnResizer.bind(_this);
        return _this;
    }
    GridHeader.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var sameProps = false;
        if (this.props.mounted !== nextProps.mounted ||
            this.props.optionsHeader !== nextProps.optionsHeader ||
            this.props.styles !== nextProps.styles ||
            this.props.headerColGroup !== nextProps.headerColGroup ||
            this.props.scrollLeft !== nextProps.scrollLeft ||
            this.props.selectionCols !== nextProps.selectionCols ||
            this.props.focusedCol !== nextProps.focusedCol ||
            this.state.columnResizing !== nextState.columnResizing ||
            this.state.columnResizerLeft !== nextState.columnResizerLeft ||
            this.props.sortInfo !== nextProps.sortInfo) {
            sameProps = true;
        }
        return sameProps;
    };
    GridHeader.prototype.onMouseDownColumnResizer = function (e, col) {
        var _this = this;
        e.preventDefault();
        var resizer = e.target;
        var prevLeft = Number(resizer.getAttribute('data-prev-left'));
        var currLeft = Number(resizer.getAttribute('data-left'));
        var rootX = this.props.getRootBounding().x;
        var newWidth;
        var startMousePosition = UTIL.getMousePosition(e).x;
        var onMouseMove = function (ee) {
            var _a = UTIL.getMousePosition(ee), x = _a.x, y = _a.y;
            var newLeft = currLeft + x - startMousePosition;
            if (newLeft < prevLeft) {
                newLeft = prevLeft;
            }
            newWidth = newLeft - prevLeft;
            _this.setState({
                columnResizing: true,
                columnResizerLeft: x - rootX + 1
            });
        };
        var offEvent = function (ee) {
            ee.preventDefault();
            startMousePosition = null;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', offEvent);
            document.removeEventListener('mouseleave', offEvent);
            _this.setState({
                columnResizing: false
            });
            if (typeof newWidth !== 'undefined')
                _this.props.onResizeColumnResizer(e, col, newWidth);
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', offEvent);
        document.addEventListener('mouseleave', offEvent);
    };
    GridHeader.prototype.printHeader = function (_panelName, _colGroup, _bodyRow, _style) {
        var onMouseDownColumnResizer = this.onMouseDownColumnResizer;
        var _a = this.props, optionsHeader = _a.optionsHeader, focusedCol = _a.focusedCol, selectionCols = _a.selectionCols, onClickHeader = _a.onClickHeader, sortInfo = _a.sortInfo;
        var getFieldSpan = function (_colGroup, _col) {
            var lineHeight = (optionsHeader.columnHeight - optionsHeader.columnPadding * 2 - optionsHeader.columnBorderWidth);
            var colAlign = optionsHeader.align || _col.align;
            var label, sorter, filter;
            if (_col.key === '__checkbox_header__') {
                if (optionsHeader.selector) {
                    label = <div data-checkbox style={{
                        maxHeight: (_col.width - 10) + 'px',
                        minHeight: (_col.width - 10) + 'px'
                    }}/>;
                }
            }
            else {
                label = _col.label;
            }
            if (_col.key && _col.colIndex !== null && typeof _col.colIndex !== 'undefined' && sortInfo[_col.key]) {
                sorter = <span data-sorter={_col.colIndex} data-sorter-order={sortInfo[_col.key].orderBy}/>;
            }
            return (<span data-span data-align={colAlign} style={{
                height: (optionsHeader.columnHeight - optionsHeader.columnBorderWidth) + 'px',
                lineHeight: lineHeight + 'px'
            }}>
          {sorter}
          {label || ' '}
        </span>);
        };
        return (<div data-panel={_panelName} style={_style}>
        <table style={{ height: '100%' }}>
          <colgroup>
            {_colGroup.map(function (col, ci) { return (<col key={ci} style={{ width: col._width + 'px' }}/>); })}
            <col />
          </colgroup>
          <tbody>
          {_bodyRow.rows.map(function (row, ri) {
            return (<tr key={ri} className=''>
                  {row.cols.map(function (col, ci) {
                var cellHeight = optionsHeader.columnHeight * col.rowspan - optionsHeader.columnBorderWidth;
                var classNameItems = (_a = {},
                    _a['axd-header-column'] = true,
                    _a['axd-header-corner'] = (col.columnAttr === 'lineNumber'),
                    _a['focused'] = (focusedCol > -1 && col.colIndex === focusedCol),
                    _a['selected'] = (selectionCols[col.colIndex]),
                    _a);
                return (<td key={ci} colSpan={col.colspan} rowSpan={col.rowspan} className={classnames_1["default"](classNameItems)} onClick={function (e) { return onClickHeader(e, col.colIndex, col.columnAttr); }} style={{ height: cellHeight, minHeight: '1px' }}>
                        {getFieldSpan(_colGroup, col)}
                        {(optionsHeader.enableFilter && col.key && col.colIndex > -1) ? <span data-filter='true' data-filter-index={col.colIndex}/> : null}
                      </td>);
                var _a;
            })}
                  <td>&nbsp;</td>
                </tr>);
        })}
          </tbody>
        </table>

        {(function () {
            if (_panelName === 'aside-header')
                return null;
            var resizerHeight = optionsHeader.columnHeight * _bodyRow.rows.length - optionsHeader.columnBorderWidth;
            var resizer, resizerLeft = 0, resizerWidth = 4;
            return _colGroup.map(function (col, ci) {
                if (col.colIndex !== null && typeof col.colIndex !== 'undefined') {
                    var prevResizerLeft = resizerLeft;
                    resizerLeft += col._width;
                    resizer = <div key={ci} data-column-resizer={col.colIndex} data-prev-left={prevResizerLeft} data-left={resizerLeft} style={{ width: resizerWidth, height: resizerHeight + 'px', left: (resizerLeft - resizerWidth / 2) + 'px' }} onMouseDown={function (e) { return onMouseDownColumnResizer(e, col); }}/>;
                }
                return (resizer);
            });
        })()}
      </div>);
    };
    GridHeader.prototype.render = function () {
        var _a = this.props, mounted = _a.mounted, optionsHeader = _a.optionsHeader, styles = _a.styles, frozenColumnIndex = _a.frozenColumnIndex, colGroup = _a.colGroup, asideColGroup = _a.asideColGroup, leftHeaderColGroup = _a.leftHeaderColGroup, headerColGroup = _a.headerColGroup, asideHeaderData = _a.asideHeaderData, leftHeaderData = _a.leftHeaderData, headerData = _a.headerData, scrollLeft = _a.scrollLeft;
        if (!mounted)
            return null;
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
        return (<div className={classnames_1["default"]('axd-header')} style={{ height: styles.headerHeight }}>
        {(styles.asidePanelWidth > 0) ? this.printHeader('aside-header', asideColGroup, asideHeaderData, asideHeaderPanelStyle) : null}
        {(frozenColumnIndex > 0) ? this.printHeader('left-header', leftHeaderColGroup, leftHeaderData, leftHeaderPanelStyle) : null}
        <div data-scroll-container='header-scroll-container' style={headerPanelStyle}>
          {this.printHeader('header-scroll', headerColGroup, headerData, headerScrollStyle)}
        </div>

        {this.state.columnResizing ? <div data-column-resizing style={{ left: this.state.columnResizerLeft }}/> : null}
      </div>);
    };
    return GridHeader;
}(React.Component));
exports.GridHeader = GridHeader;
