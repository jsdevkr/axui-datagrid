"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const GridHeaderCell_1 = require("./GridHeaderCell");
class GridHeaderPanel extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { panelName, colGroup, bodyRow, style, optionsHeader, focusedCol, selectionCols, onClickHeader, sortInfo, onMouseDownColumnResizer } = this.props;
        return (react_1.default.createElement("div", { "data-panel": panelName, style: style },
            react_1.default.createElement("table", { style: { height: '100%' } },
                react_1.default.createElement("colgroup", null,
                    colGroup.map((col, ci) => react_1.default.createElement("col", { key: ci, style: { width: col._width + 'px' } })),
                    react_1.default.createElement("col", null)),
                react_1.default.createElement("tbody", null, bodyRow.rows.map((row, ri) => react_1.default.createElement("tr", { key: ri, className: '' },
                    row.cols.map((col, ci) => react_1.default.createElement(GridHeaderCell_1.GridHeaderCell, { key: ci, bodyRow: bodyRow, optionsHeader: optionsHeader, focusedCol: focusedCol, selectionCols: selectionCols, onClickHeader: onClickHeader, sortInfo: sortInfo, ri: ri, col: col })),
                    react_1.default.createElement("td", null, "\u00A0"))))),
            (() => {
                if (panelName === 'aside-header')
                    return null;
                let resizerHeight = optionsHeader.columnHeight * bodyRow.rows.length - optionsHeader.columnBorderWidth;
                let resizer, resizerLeft = 0, resizerWidth = 4;
                return colGroup.map((col, ci) => {
                    if (col.colIndex !== null && typeof col.colIndex !== 'undefined') {
                        let prevResizerLeft = resizerLeft;
                        resizerLeft += col._width;
                        resizer = react_1.default.createElement("div", { key: ci, "data-column-resizer": col.colIndex, "data-prev-left": prevResizerLeft, "data-left": resizerLeft, style: { width: resizerWidth, height: resizerHeight + 'px', left: (resizerLeft - resizerWidth / 2) + 'px' }, onMouseDown: e => onMouseDownColumnResizer(e, col) });
                    }
                    return (resizer);
                });
            })()));
    }
}
exports.GridHeaderPanel = GridHeaderPanel;
//# sourceMappingURL=GridHeaderPanel.js.map