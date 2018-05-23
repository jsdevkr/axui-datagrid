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
var classnames_1 = require("classnames");
var GridBodyPanel_1 = require("./GridBodyPanel");
var GridBody = /** @class */ (function (_super) {
    __extends(GridBody, _super);
    function GridBody(props) {
        return _super.call(this, props) || this;
    }
    GridBody.prototype.render = function () {
        var _a = this.props, mounted = _a.mounted, styles = _a.styles, options = _a.options, frozenColumnIndex = _a.frozenColumnIndex, colGroup = _a.colGroup, asideColGroup = _a.asideColGroup, leftHeaderColGroup = _a.leftHeaderColGroup, headerColGroup = _a.headerColGroup, bodyTable = _a.bodyTable, asideBodyRowData = _a.asideBodyRowData, asideBodyGroupingData = _a.asideBodyGroupingData, leftBodyRowData = _a.leftBodyRowData, leftBodyGroupingData = _a.leftBodyGroupingData, bodyRowData = _a.bodyRowData, bodyGroupingData = _a.bodyGroupingData, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop, CTInnerWidth = _a.CTInnerWidth, CTInnerHeight = _a.CTInnerHeight, list = _a.list, onMouseDownBody = _a.onMouseDownBody;
        if (!mounted)
            return null;
        var bodyHeight = styles.bodyHeight, bodyTrHeight = styles.bodyTrHeight, asidePanelWidth = styles.asidePanelWidth, frozenPanelWidth = styles.frozenPanelWidth, frozenPanelHeight = styles.frozenPanelHeight, rightPanelWidth = styles.rightPanelWidth, footSumHeight = styles.footSumHeight;
        var frozenRowIndex = options.frozenRowIndex;
        var sRowIndex = Math.floor(-scrollTop / bodyTrHeight) + frozenRowIndex;
        var scrollPaddingLeft = headerColGroup[0]
            ? headerColGroup[0]._sx - styles.frozenPanelWidth
            : 0;
        var topBodyScrollConfig = {
            frozenRowIndex: 0,
            sRowIndex: 0,
            eRowIndex: frozenRowIndex,
        };
        var bodyScrollConfig = {
            frozenRowIndex: frozenRowIndex,
            sRowIndex: sRowIndex,
            eRowIndex: sRowIndex + Math.ceil(bodyHeight / bodyTrHeight) + 1,
        };
        var topAsideBodyPanelStyle = {
            left: 0,
            width: asidePanelWidth,
            top: 0,
            height: frozenPanelHeight,
        };
        var topLeftBodyPanelStyle = {
            left: asidePanelWidth,
            width: frozenPanelWidth,
            top: 0,
            height: frozenPanelHeight,
        };
        var topBodyPanelStyle = {
            left: frozenPanelWidth + asidePanelWidth,
            width: CTInnerWidth - asidePanelWidth - frozenPanelWidth - rightPanelWidth,
            top: 0,
            height: frozenPanelHeight,
        };
        var asideBodyPanelStyle = {
            left: 0,
            width: asidePanelWidth,
            top: frozenPanelHeight,
            height: bodyHeight - frozenPanelHeight - footSumHeight,
        };
        var leftBodyPanelStyle = {
            left: asidePanelWidth,
            width: frozenPanelWidth,
            top: frozenPanelHeight,
            height: bodyHeight - frozenPanelHeight - footSumHeight,
        };
        var bodyPanelStyle = {
            left: frozenPanelWidth + asidePanelWidth,
            width: CTInnerWidth - asidePanelWidth - frozenPanelWidth - rightPanelWidth,
            top: frozenPanelHeight,
            height: bodyHeight - frozenPanelHeight - footSumHeight,
        };
        return (React.createElement("div", { className: classnames_1.default('axd-body'), style: { height: styles.bodyHeight }, onMouseDown: function (e) { return onMouseDownBody(e); } }, styles.asidePanelWidth > 0 && styles.frozenPanelHeight > 0 ? (React.createElement("div", { "data-scroll-container": "top-aside-body-scroll-container", style: topAsideBodyPanelStyle }, React.createElement(GridBodyPanel_1.GridBodyPanel, { styles: this.props.styles, options: this.props.options, colGroup: this.props.colGroup, selectionRows: this.props.selectionRows, selectionCols: this.props.selectionCols, focusedRow: this.props.focusedRow, focusedCol: this.props.focusedCol, columnFormatter: this.props.columnFormatter, onDoubleClickCell: this.props.onDoubleClickCell, updateEditInput: this.props.updateEditInput, isInlineEditing: this.props.isInlineEditing, inlineEditingCell: this.props.inlineEditingCell, panelName: "top-aside-body-scroll", panelColGroup: asideColGroup, panelBodyRow: asideBodyRowData, panelGroupRow: asideBodyGroupingData, list: list, panelScrollConfig: topBodyScrollConfig }))) : null, styles.frozenPanelWidth > 0 && styles.frozenPanelHeight > 0 ? (React.createElement("div", { "data-scroll-container": "top-left-body-scroll-container", style: topLeftBodyPanelStyle }, React.createElement(GridBodyPanel_1.GridBodyPanel, { styles: this.props.styles, options: this.props.options, colGroup: this.props.colGroup, selectionRows: this.props.selectionRows, selectionCols: this.props.selectionCols, focusedRow: this.props.focusedRow, focusedCol: this.props.focusedCol, columnFormatter: this.props.columnFormatter, onDoubleClickCell: this.props.onDoubleClickCell, updateEditInput: this.props.updateEditInput, isInlineEditing: this.props.isInlineEditing, inlineEditingCell: this.props.inlineEditingCell, panelName: "top-left-body-scroll", panelColGroup: leftHeaderColGroup, panelBodyRow: leftBodyRowData, panelGroupRow: leftBodyGroupingData, list: list, panelScrollConfig: topBodyScrollConfig }))) : null, styles.frozenPanelHeight > 0 ? (React.createElement("div", { "data-scroll-container": "top-body-scroll-container", style: topBodyPanelStyle }, React.createElement(GridBodyPanel_1.GridBodyPanel, { styles: this.props.styles, options: this.props.options, colGroup: this.props.colGroup, selectionRows: this.props.selectionRows, selectionCols: this.props.selectionCols, focusedRow: this.props.focusedRow, focusedCol: this.props.focusedCol, columnFormatter: this.props.columnFormatter, onDoubleClickCell: this.props.onDoubleClickCell, updateEditInput: this.props.updateEditInput, isInlineEditing: this.props.isInlineEditing, inlineEditingCell: this.props.inlineEditingCell, panelName: "top-body-scroll", panelColGroup: headerColGroup, panelBodyRow: bodyRowData, panelGroupRow: bodyGroupingData, list: list, panelScrollConfig: topBodyScrollConfig, panelLeft: scrollLeft, panelPaddingLeft: scrollPaddingLeft }))) : null, styles.asidePanelWidth > 0 ? (React.createElement("div", { "data-scroll-container": "aside-body-scroll-container", style: asideBodyPanelStyle }, React.createElement(GridBodyPanel_1.GridBodyPanel, { styles: this.props.styles, options: this.props.options, colGroup: this.props.colGroup, selectionRows: this.props.selectionRows, selectionCols: this.props.selectionCols, focusedRow: this.props.focusedRow, focusedCol: this.props.focusedCol, columnFormatter: this.props.columnFormatter, onDoubleClickCell: this.props.onDoubleClickCell, updateEditInput: this.props.updateEditInput, isInlineEditing: this.props.isInlineEditing, inlineEditingCell: this.props.inlineEditingCell, panelName: "aside-body-scroll", panelColGroup: asideColGroup, panelBodyRow: asideBodyRowData, panelGroupRow: asideBodyGroupingData, list: list, panelScrollConfig: bodyScrollConfig, panelTop: scrollTop }))) : null, styles.frozenPanelWidth > 0 ? (React.createElement("div", { "data-scroll-container": "left-body-scroll-container", style: leftBodyPanelStyle }, React.createElement(GridBodyPanel_1.GridBodyPanel, { styles: this.props.styles, options: this.props.options, colGroup: this.props.colGroup, selectionRows: this.props.selectionRows, selectionCols: this.props.selectionCols, focusedRow: this.props.focusedRow, focusedCol: this.props.focusedCol, columnFormatter: this.props.columnFormatter, onDoubleClickCell: this.props.onDoubleClickCell, updateEditInput: this.props.updateEditInput, isInlineEditing: this.props.isInlineEditing, inlineEditingCell: this.props.inlineEditingCell, panelName: "left-body-scroll", panelColGroup: leftHeaderColGroup, panelBodyRow: leftBodyRowData, panelGroupRow: leftBodyGroupingData, list: list, panelScrollConfig: bodyScrollConfig, panelTop: scrollTop }))) : null, React.createElement("div", { "data-scroll-container": "body-scroll-container", style: bodyPanelStyle }, React.createElement(GridBodyPanel_1.GridBodyPanel, { styles: this.props.styles, options: this.props.options, colGroup: this.props.colGroup, selectionRows: this.props.selectionRows, selectionCols: this.props.selectionCols, focusedRow: this.props.focusedRow, focusedCol: this.props.focusedCol, columnFormatter: this.props.columnFormatter, onDoubleClickCell: this.props.onDoubleClickCell, isInlineEditing: this.props.isInlineEditing, inlineEditingCell: this.props.inlineEditingCell, updateEditInput: this.props.updateEditInput, panelName: "body-scroll", panelColGroup: headerColGroup, panelBodyRow: bodyRowData, panelGroupRow: bodyGroupingData, list: list, panelScrollConfig: bodyScrollConfig, panelLeft: scrollLeft, panelTop: scrollTop, panelPaddingLeft: scrollPaddingLeft }))));
    };
    return GridBody;
}(React.Component));
exports.GridBody = GridBody;
//# sourceMappingURL=GridBody.js.map