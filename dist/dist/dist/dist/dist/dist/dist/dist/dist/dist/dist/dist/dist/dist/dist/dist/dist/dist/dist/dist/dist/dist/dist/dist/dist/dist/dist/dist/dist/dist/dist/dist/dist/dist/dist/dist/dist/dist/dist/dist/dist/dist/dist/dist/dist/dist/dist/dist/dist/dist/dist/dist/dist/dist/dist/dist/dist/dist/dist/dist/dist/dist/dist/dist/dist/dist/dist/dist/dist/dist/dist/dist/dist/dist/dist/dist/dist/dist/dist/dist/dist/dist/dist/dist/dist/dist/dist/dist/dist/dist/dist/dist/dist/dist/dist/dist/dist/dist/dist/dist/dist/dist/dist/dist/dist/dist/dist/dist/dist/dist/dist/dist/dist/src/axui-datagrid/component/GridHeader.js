"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var UTIL = require("../util");
var classnames_1 = require("classnames");
var GridHeaderPanel_1 = require("./GridHeaderPanel");
var GridHeader = /** @class */ (function (_super) {
    __extends(GridHeader, _super);
    function GridHeader(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            columnResizing: false,
            columnResizerLeft: 0,
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
                columnResizerLeft: x - rootX + 1,
            });
        };
        var offEvent = function (ee) {
            ee.preventDefault();
            startMousePosition = null;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', offEvent);
            document.removeEventListener('mouseleave', offEvent);
            _this.setState({
                columnResizing: false,
            });
            if (typeof newWidth !== 'undefined')
                _this.props.onResizeColumnResizer(e, col, newWidth);
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', offEvent);
        document.addEventListener('mouseleave', offEvent);
    };
    GridHeader.prototype.render = function () {
        var _a = this.props, mounted = _a.mounted, optionsHeader = _a.optionsHeader, styles = _a.styles, frozenColumnIndex = _a.frozenColumnIndex, colGroup = _a.colGroup, asideColGroup = _a.asideColGroup, leftHeaderColGroup = _a.leftHeaderColGroup, headerColGroup = _a.headerColGroup, asideHeaderData = _a.asideHeaderData, leftHeaderData = _a.leftHeaderData, headerData = _a.headerData, scrollLeft = _a.scrollLeft;
        if (!mounted)
            return null;
        var asideHeaderPanelStyle = {
            left: 0,
            width: styles.asidePanelWidth,
            height: styles.headerHeight,
        };
        var leftHeaderPanelStyle = {
            left: styles.asidePanelWidth,
            width: styles.frozenPanelWidth,
            height: styles.headerHeight,
        };
        var headerPanelStyle = {
            left: styles.frozenPanelWidth + styles.asidePanelWidth,
            width: styles.CTInnerWidth -
                styles.asidePanelWidth -
                styles.frozenPanelWidth -
                styles.rightPanelWidth,
            height: styles.headerHeight,
        };
        var headerScrollStyle = {
            height: styles.headerHeight,
            left: scrollLeft,
        };
        return (React.createElement("div", { className: classnames_1.default('axd-header'), style: { height: styles.headerHeight } }, styles.asidePanelWidth > 0 ? (React.createElement(GridHeaderPanel_1.GridHeaderPanel, { panelName: "aside-header", colGroup: asideColGroup, bodyRow: asideHeaderData, style: asideHeaderPanelStyle, optionsHeader: this.props.optionsHeader, focusedCol: this.props.focusedCol, selectionCols: this.props.selectionCols, onClickHeader: this.props.onClickHeader, sortInfo: this.props.sortInfo, onMouseDownColumnResizer: this.onMouseDownColumnResizer })) : null, frozenColumnIndex > 0 ? (React.createElement(GridHeaderPanel_1.GridHeaderPanel, { panelName: "left-header", colGroup: leftHeaderColGroup, bodyRow: leftHeaderData, style: leftHeaderPanelStyle, optionsHeader: this.props.optionsHeader, focusedCol: this.props.focusedCol, selectionCols: this.props.selectionCols, onClickHeader: this.props.onClickHeader, sortInfo: this.props.sortInfo, onMouseDownColumnResizer: this.onMouseDownColumnResizer })) : null, React.createElement("div", { "data-scroll-container": "header-scroll-container", style: headerPanelStyle }, React.createElement(GridHeaderPanel_1.GridHeaderPanel, { panelName: "header-scroll", colGroup: headerColGroup, bodyRow: headerData, style: headerScrollStyle, optionsHeader: this.props.optionsHeader, focusedCol: this.props.focusedCol, selectionCols: this.props.selectionCols, onClickHeader: this.props.onClickHeader, sortInfo: this.props.sortInfo, onMouseDownColumnResizer: this.onMouseDownColumnResizer })), this.state.columnResizing ? (React.createElement("div", { "data-column-resizing": true, style: { left: this.state.columnResizerLeft } })) : null));
    };
    return GridHeader;
}(React.Component));
exports.GridHeader = GridHeader;
//# sourceMappingURL=GridHeader.js.map