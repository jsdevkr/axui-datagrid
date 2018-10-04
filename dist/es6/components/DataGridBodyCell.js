"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const stores_1 = require("../stores");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
const CellLabel = props => {
    const { col, list: data, li, lineHeight, predefinedFormatter } = props;
    const { key = '', columnAttr = '', formatter } = col;
    const formatterData = {
        data,
        item: data[li],
        index: li,
        key: col.key,
        value: data[li][col.key || ''],
    };
    switch (key) {
        case '_line_number_':
            return React.createElement(React.Fragment, null, li + 1);
        case '_row_selector_':
            return (React.createElement("div", { className: "axui-datagrid-check-box", "data-span": columnAttr, "data-checked": data[li]._selected_, style: {
                    maxHeight: lineHeight + 'px',
                    minHeight: lineHeight + 'px',
                } }));
        default:
            let labelValue;
            if (typeof formatter === 'string' && formatter in predefinedFormatter) {
                labelValue = predefinedFormatter[formatter](formatterData);
            }
            else if (utils_1.isFunction(formatter)) {
                labelValue = formatter(formatterData);
            }
            else {
                labelValue = data[li][key];
            }
            return React.createElement(React.Fragment, null, labelValue);
    }
};
class DataGridBodyCell extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.activeComposition = false;
        this.setEditInputNode = (element) => {
            this.editInput = element;
        };
        this.onDoubleClickCell = (e, col, li) => {
            const { setStoreState } = this.props;
            if (col.editor) {
                setStoreState({
                    isInlineEditing: true,
                    inlineEditingCell: {
                        rowIndex: li,
                        colIndex: col.colIndex,
                        editor: col.editor,
                    },
                });
            }
        };
        this.onKeyUp = (e, col, li) => {
            const { setStoreState } = this.props;
            const proc = {
                [stores_1.KeyCodes.ENTER]: () => {
                    if (col.editor) {
                        setStoreState({
                            isInlineEditing: true,
                            inlineEditingCell: {
                                rowIndex: li,
                                colIndex: col.colIndex,
                                editor: col.editor,
                            },
                        });
                    }
                },
            };
            proc[e.which] && proc[e.which]();
        };
        this.onEventInput = (eventName, e) => {
            const { getRootNode, setStoreState, dispatch, inlineEditingCell = {}, } = this.props;
            const rootNode = utils_1.getNode(getRootNode);
            const proc = {
                [stores_1.EventNames.BLUR]: () => {
                    setStoreState({
                        isInlineEditing: false,
                        inlineEditingCell: {},
                    });
                    if (rootNode) {
                        rootNode.focus();
                    }
                },
                [stores_1.EventNames.KEYUP]: () => {
                    switch (e.which) {
                        case stores_1.KeyCodes.ESC:
                            setStoreState({
                                isInlineEditing: false,
                                inlineEditingCell: {},
                            });
                            if (rootNode) {
                                rootNode.focus();
                            }
                            break;
                        case stores_1.KeyCodes.UP_ARROW:
                        case stores_1.KeyCodes.DOWN_ARROW:
                        case stores_1.KeyCodes.ENTER:
                            if (!this.activeComposition) {
                                dispatch(stores_1.DispatchTypes.UPDATE, {
                                    row: inlineEditingCell.rowIndex,
                                    colIndex: inlineEditingCell.colIndex,
                                    value: e.currentTarget.value,
                                    eventWhichKey: e.which,
                                });
                            }
                            break;
                        default:
                            break;
                    }
                },
            };
            proc[eventName] && proc[eventName]();
        };
    }
    componentDidUpdate(prevProps) {
        if (this.editInput) {
            this.activeComposition = false;
            this.editInput.select();
        }
    }
    render() {
        const { filteredList = [], focusedRow, focusedCol, selectionRows = [], selectionCols = [], li, col = {}, ci, value, options = {}, isInlineEditing = false, inlineEditingCell = {}, predefinedFormatter = {}, } = this.props;
        const { body: optionsBody = {} } = options;
        const { columnHeight = 0, columnPadding = 0, columnBorderWidth = 0, align: bodyAlign = 'left', } = optionsBody;
        const { rowSpan = 0, colSpan = 0, colIndex = 0, rowIndex = 0, align: colAlign = bodyAlign, columnAttr = '', } = col;
        let cellHeight = columnHeight * rowSpan;
        let tdClassNames = {
            ['axui-datagrid-line-number']: columnAttr === 'lineNumber',
            ['axui-datagrid-row-selector']: columnAttr === 'rowSelector',
        };
        if (columnAttr === 'lineNumber') {
            if (focusedRow === li) {
                tdClassNames.focused = true;
            }
            if (selectionRows[li]) {
                tdClassNames.selected = true;
            }
        }
        else if (columnAttr === 'rowSelector') {
        }
        else {
            if (selectionRows[li] && selectionCols[colIndex]) {
                tdClassNames.selected = true;
            }
            if (focusedRow === li && focusedCol === colIndex) {
                tdClassNames.focused = true;
            }
        }
        if (isInlineEditing &&
            inlineEditingCell.rowIndex === li &&
            inlineEditingCell.colIndex === colIndex) {
            return (React.createElement("td", { key: ci, colSpan: colSpan, rowSpan: rowSpan, className: utils_1.classNames(tdClassNames), style: { height: cellHeight, minHeight: '1px' } },
                React.createElement("input", { type: "text", ref: this.setEditInputNode, onCompositionUpdate: (e) => {
                        this.activeComposition = true;
                    }, onCompositionEnd: (e) => {
                        setTimeout(() => {
                            this.activeComposition = false;
                        });
                    }, onBlur: (e) => {
                        this.onEventInput(stores_1.EventNames.BLUR, e);
                    }, onKeyUp: (e) => {
                        this.onEventInput(stores_1.EventNames.KEYUP, e);
                    }, "data-inline-edit": true, defaultValue: value })));
        }
        else {
            const lineHeight = columnHeight - columnPadding * 2 - columnBorderWidth;
            return (React.createElement("td", { key: ci, colSpan: colSpan, rowSpan: rowSpan, className: utils_1.classNames(tdClassNames), style: { height: cellHeight, minHeight: '1px' }, onDoubleClick: (e) => {
                    this.onDoubleClickCell(e, col, li);
                } },
                React.createElement("span", { "data-span": columnAttr, "data-pos": colIndex + ',' + rowIndex + ',' + li, style: {
                        height: columnHeight - columnBorderWidth + 'px',
                        lineHeight: lineHeight + 'px',
                        textAlign: colAlign,
                    } },
                    React.createElement(CellLabel, { lineHeight: lineHeight, col: col, list: filteredList, li: li, predefinedFormatter: predefinedFormatter }))));
        }
    }
}
exports.default = hoc_1.connectStore(DataGridBodyCell);
