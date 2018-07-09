"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
const DataGridBodyCell_1 = require("./DataGridBodyCell");
class DataGridBodyPanel extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
    }
    render() {
        const { filteredList = [], asideColGroup = [], leftHeaderColGroup = [], headerColGroup = [], visibleHeaderColGroup = [], asideBodyRowData = { rows: [{ cols: [] }] }, leftBodyRowData = { rows: [{ cols: [] }] }, bodyRowData = { rows: [{ cols: [] }] }, visibleBodyRowData = { rows: [{ cols: [] }] }, visibleBodyGroupingData = { rows: [{ cols: [] }] }, panelName, containerStyle = {}, panelScrollConfig = {}, panelLeft = 0, panelTop = 0, printStartColIndex = 0, printEndColIndex = 0, styles = {}, } = this.props;
        const { frozenPanelWidth = 0, asidePanelWidth = 0, frozenPanelHeight = 0, bodyTrHeight = 0, } = styles;
        const { sRowIndex, eRowIndex, frozenRowIndex } = panelScrollConfig;
        // aside-header가 필요하지 않은지 확인
        if ((panelName === 'top-aside-body-scroll' &&
            (asidePanelWidth === 0 || frozenPanelHeight === 0)) ||
            (panelName === 'top-left-body-scroll' &&
                (frozenPanelWidth === 0 || frozenPanelHeight === 0)) ||
            (panelName === 'top-body-scroll' && frozenPanelHeight === 0) ||
            (panelName === 'aside-body-scroll' && asidePanelWidth === 0) ||
            (panelName === 'left-body-scroll' && frozenPanelWidth === 0)) {
            return null;
        }
        let panelColGroup = [];
        let panelBodyRow = { rows: [{ cols: [] }] };
        let panelPaddingLeft = 0;
        switch (panelName) {
            case 'top-aside-body-scroll':
            case 'aside-body-scroll':
                panelColGroup = asideColGroup;
                panelBodyRow = asideBodyRowData;
                break;
            case 'top-left-body-scroll':
            case 'left-body-scroll':
                panelColGroup = leftHeaderColGroup;
                panelBodyRow = leftBodyRowData;
                break;
            case 'top-body-scroll':
            case 'body-scroll':
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
        if (panelName === 'aside-body-scroll-container') {
            // console.log(panelName);
        }
        return (React.createElement("div", { "data-scroll-container": `${panelName}-container`, style: containerStyle },
            React.createElement("div", { "data-panel": panelName, style: panelStyle },
                React.createElement("table", { style: { height: '100%' } },
                    React.createElement("colgroup", null,
                        panelColGroup.map((col, ci) => (React.createElement("col", { key: ci, style: { width: col._width + 'px' } }))),
                        React.createElement("col", null)),
                    React.createElement("tbody", null, utils_1.arrayFromRange(sRowIndex, eRowIndex).map(li => {
                        const item = filteredList[li];
                        const trClassNames = {
                            ['odded-line']: li % 2 !== 0,
                        };
                        if (item) {
                            return panelBodyRow.rows.map((row, ri) => {
                                return (React.createElement("tr", { key: ri, className: utils_1.classNames(trClassNames) },
                                    row.cols.map((col, ci) => {
                                        return (React.createElement(DataGridBodyCell_1.default, { key: ci, li: li, ci: ci, col: col, value: filteredList[li][col.key || ''] }));
                                    }),
                                    React.createElement("td", null, "\u00A0")));
                            });
                        }
                        return null;
                    }))))));
    }
}
exports.default = hoc_1.connectStore(DataGridBodyPanel);
//# sourceMappingURL=DataGridBodyPanel.js.map