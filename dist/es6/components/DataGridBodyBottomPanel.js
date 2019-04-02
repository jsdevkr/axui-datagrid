"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const DataGridBodyBottomCell_1 = require("./DataGridBodyBottomCell");
const DataGridTableColGroup_1 = require("./DataGridTableColGroup");
const _enums_1 = require("../common/@enums");
class TableBody extends React.PureComponent {
    render() {
        const { data, options, predefinedFormatter, predefinedCollector, } = this.props;
        return (React.createElement("tbody", null, this.props.bodyRow.rows.map((row, ri) => {
            return (React.createElement("tr", { key: ri },
                row.cols.map((col, ci) => {
                    return (React.createElement(DataGridBodyBottomCell_1.default, { key: ci, ci: ci, col: col, data: data, options: options, predefinedFormatter: predefinedFormatter, predefinedCollector: predefinedCollector }));
                }),
                React.createElement("td", null)));
        })));
    }
}
class DataGridBodyBottomPanel extends React.Component {
    render() {
        const { asideColGroup = [], leftHeaderColGroup = [], visibleHeaderColGroup = [], asideBodyRowData = { rows: [{ cols: [] }] }, leftFootSumData = { rows: [{ cols: [] }] }, visibleFootSumData = { rows: [{ cols: [] }] }, panelName, containerStyle = {}, panelLeft = 0, panelTop = 0, styles: { frozenPanelWidth = 0 } = {}, data, options, predefinedFormatter, predefinedCollector, } = this.props;
        let panelColGroup = [];
        let panelBodyRow = { rows: [{ cols: [] }] };
        let panelPaddingLeft = 0;
        switch (panelName) {
            case _enums_1.DataGridEnums.PanelNames.BOTTOM_ASIDE_BODY_SCROLL:
                panelColGroup = asideColGroup;
                panelBodyRow = asideBodyRowData;
                break;
            case _enums_1.DataGridEnums.PanelNames.BOTTOM_LEFT_BODY_SCROLL:
                panelColGroup = leftHeaderColGroup;
                panelBodyRow = leftFootSumData;
                break;
            case _enums_1.DataGridEnums.PanelNames.BOTTOM_BODY_SCROLL:
            default:
                panelColGroup = visibleHeaderColGroup;
                panelBodyRow = visibleFootSumData;
                panelPaddingLeft = panelColGroup[0]
                    ? (panelColGroup[0]._sx || 0) - frozenPanelWidth
                    : 0;
        }
        const panelStyle = {
            left: panelLeft,
            top: panelTop,
            paddingTop: 0,
            paddingLeft: panelPaddingLeft,
        };
        return (React.createElement("div", { "data-scroll-container": `${panelName}-container`, style: containerStyle },
            React.createElement("div", { "data-panel": panelName, style: panelStyle },
                React.createElement("table", { style: { height: '100%' } },
                    React.createElement(DataGridTableColGroup_1.default, { panelColGroup: panelColGroup }),
                    React.createElement(TableBody, { bodyRow: panelBodyRow, data: data || [], options: options || {}, predefinedFormatter: predefinedFormatter, predefinedCollector: predefinedCollector })))));
    }
}
exports.default = hoc_1.connectStore(DataGridBodyBottomPanel);
