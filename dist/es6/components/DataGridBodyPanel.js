"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
const _enums_1 = require("../common/@enums");
const DataGridBodyCell_1 = require("./DataGridBodyCell");
const DataGridTableColGroup_1 = require("./DataGridTableColGroup");
class TableBody extends React.PureComponent {
    render() {
        const { sRowIndex, eRowIndex, data, bodyRow, setStoreState, dispatch, focusedRow, focusedCol, selectionRows, selectionCols, options, isInlineEditing, inlineEditingCell, predefinedFormatter, } = this.props;
        return (React.createElement("tbody", null, utils_1.arrayFromRange(sRowIndex, eRowIndex).map(li => {
            if (data[li]) {
                return bodyRow.rows.map((row, ri) => (React.createElement("tr", { key: ri, className: `${li % 2 !== 0 ? 'odded-line' : ''}` },
                    row.cols.map((col, ci) => (React.createElement(DataGridBodyCell_1.default, { key: ci, li: li, ci: ci, col: col, data: data, selected: data[li]._selected_, setStoreState: setStoreState, dispatch: dispatch, focusedRow: focusedRow, focusedCol: focusedCol, selectionRows: selectionRows, selectionCols: selectionCols, options: options, isInlineEditing: isInlineEditing, inlineEditingCell: inlineEditingCell, predefinedFormatter: predefinedFormatter }))),
                    React.createElement("td", null))));
            }
            return null;
        })));
    }
}
class DataGridBodyPanel extends React.Component {
    render() {
        const { data = [], asideColGroup = [], leftHeaderColGroup = [], visibleHeaderColGroup = [], asideBodyRowData = { rows: [{ cols: [] }] }, leftBodyRowData = { rows: [{ cols: [] }] }, visibleBodyRowData = { rows: [{ cols: [] }] }, panelName, containerStyle = {}, panelScrollConfig: { sRowIndex = 0, eRowIndex = 0, frozenRowIndex = 0, } = {}, panelLeft = 0, panelTop = 0, styles: { frozenPanelWidth = 0, bodyTrHeight = 0 } = {}, focusedRow, focusedCol, selectionRows, selectionCols, options, isInlineEditing, inlineEditingCell, predefinedFormatter, setStoreState, dispatch, } = this.props;
        let panelColGroup;
        let panelBodyRow;
        let panelPaddingLeft = 0;
        switch (panelName) {
            case _enums_1.DataGridEnums.PanelNames.TOP_ASIDE_BODY_SCROLL:
            case _enums_1.DataGridEnums.PanelNames.ASIDE_BODY_SCROLL:
                panelColGroup = asideColGroup;
                panelBodyRow = asideBodyRowData;
                break;
            case _enums_1.DataGridEnums.PanelNames.TOP_LEFT_BODY_SCROLL:
            case _enums_1.DataGridEnums.PanelNames.LEFT_BODY_SCROLL:
                panelColGroup = leftHeaderColGroup;
                panelBodyRow = leftBodyRowData;
                break;
            case _enums_1.DataGridEnums.PanelNames.TOP_BODY_SCROLL:
            case _enums_1.DataGridEnums.PanelNames.BODY_SCROLL:
            default:
                panelColGroup = visibleHeaderColGroup;
                // headerColGroup;
                panelBodyRow = visibleBodyRowData;
                panelPaddingLeft = panelColGroup[0]
                    ? (panelColGroup[0]._sx || 0) - frozenPanelWidth
                    : 0;
        }
        const panelStyle = {
            left: panelLeft,
            top: panelTop,
            paddingTop: (sRowIndex - frozenRowIndex) * bodyTrHeight,
            paddingLeft: panelPaddingLeft,
        };
        return (React.createElement("div", { "data-scroll-container": `${panelName}-container`, style: containerStyle },
            React.createElement("div", { "data-panel": panelName, style: panelStyle },
                React.createElement("table", { style: { height: '100%' } },
                    React.createElement(DataGridTableColGroup_1.default, { panelColGroup: panelColGroup }),
                    React.createElement(TableBody, { sRowIndex: sRowIndex, eRowIndex: eRowIndex, data: data, bodyRow: panelBodyRow, setStoreState: setStoreState, dispatch: dispatch, focusedRow: focusedRow || 0, focusedCol: focusedCol || 0, selectionRows: selectionRows || {}, selectionCols: selectionCols || {}, options: options || {}, isInlineEditing: !!isInlineEditing, inlineEditingCell: inlineEditingCell || {}, predefinedFormatter: predefinedFormatter })))));
    }
}
exports.default = hoc_1.connectStore(DataGridBodyPanel);
