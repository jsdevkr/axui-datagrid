"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const immutable_1 = require("immutable");
const constant_1 = require("../_inc/constant");
const GridBodyCell_1 = require("./GridBodyCell");
const classnames_1 = __importDefault(require("classnames"));
class GridBodyPanel extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onEditInput = this.onEditInput.bind(this);
    }
    onEditInput(E_TYPE, e) {
        const { updateEditInput, inlineEditingCell } = this.props;
        const proc = {
            [constant_1.E_NAME.BLUR]: () => {
                updateEditInput('cancel');
            },
            [constant_1.E_NAME.KEY_DOWN]: () => {
                if (e.which === constant_1.KEY_CODE.ESC) {
                    updateEditInput('cancel');
                }
                else if (e.which === constant_1.KEY_CODE.RETURN) {
                    updateEditInput('update', inlineEditingCell.row, inlineEditingCell.col, e.target.value);
                }
            }
        };
        proc[E_TYPE]();
    }
    render() {
        const { styles, options, colGroup, selectionRows, selectionCols, focusedRow, focusedCol, columnFormatter, onDoubleClickCell, isInlineEditing, inlineEditingCell, list, panelBodyRow, panelColGroup, panelGroupRow, panelName, panelScrollConfig, panelLeft = 0, panelTop = 0, panelPaddingLeft = 0 } = this.props;
        const { sRowIndex, eRowIndex, frozenRowIndex } = panelScrollConfig;
        const panelStyle = {
            left: panelLeft,
            top: panelTop,
            paddingTop: (sRowIndex - frozenRowIndex) * styles.bodyTrHeight,
            paddingLeft: (panelPaddingLeft) ? panelPaddingLeft : 0
        };
        return (react_1.default.createElement("div", { "data-panel": panelName, style: panelStyle },
            react_1.default.createElement("table", { style: { height: '100%' } },
                react_1.default.createElement("colgroup", null,
                    panelColGroup.map((col, ci) => (react_1.default.createElement("col", { key: ci, style: { width: col._width + 'px' } }))),
                    react_1.default.createElement("col", null)),
                react_1.default.createElement("tbody", null, immutable_1.Range(sRowIndex, eRowIndex).map((li) => {
                    const item = list.get(li);
                    const trClassNames = {
                        ['odded-line']: li % 2
                    };
                    if (item) {
                        return (panelBodyRow.rows.map((row, ri) => {
                            return (react_1.default.createElement("tr", { key: ri, className: classnames_1.default(trClassNames) },
                                row.cols.map((col, ci) => {
                                    return react_1.default.createElement(GridBodyCell_1.GridBodyCell, { key: ci, columnHeight: options.body.columnHeight, columnPadding: options.body.columnPadding, columnBorderWidth: options.body.columnBorderWidth, bodyAlign: options.body.align, focusedRow: focusedRow, focusedCol: focusedCol, selectionRows: selectionRows, selectionCols: selectionCols, columnFormatter: columnFormatter, isInlineEditing: isInlineEditing, inlineEditingCell: inlineEditingCell, list: list, li: li, colGroup: colGroup, col: col, ci: ci, value: item[col.key], onEditInput: this.onEditInput, onDoubleClickCell: onDoubleClickCell });
                                }),
                                react_1.default.createElement("td", null, "\u00A0")));
                        }));
                    }
                })))));
    }
}
exports.GridBodyPanel = GridBodyPanel;
//# sourceMappingURL=GridBodyPanel.js.map