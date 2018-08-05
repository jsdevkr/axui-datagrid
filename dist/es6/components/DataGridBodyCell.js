"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const stores_1 = require("../stores");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
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
                                    value: e.target.value,
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
    componentDidUpdate(prevProps, prevState) {
        if (this.editInput) {
            this.activeComposition = false;
            this.editInput.select();
        }
    }
    render() {
        const { filteredList = [], focusedRow, focusedCol, selectionRows = [], selectionCols = [], li, col = {}, ci, value, options = {}, isInlineEditing = false, inlineEditingCell = {}, predefinedFormatter = {}, } = this.props;
        const { body: optionsBody = {} } = options;
        const { columnHeight = 0, columnPadding = 0, columnBorderWidth = 0, align: bodyAlign = 'left', } = optionsBody;
        const { rowSpan: colRowSpan = 0, colIndex: colColIndex = 0 } = col;
        let cellHeight = columnHeight * colRowSpan;
        let tdClassNames = {
            ['axui-datagrid-line-number']: col.columnAttr === 'lineNumber',
            ['axui-datagrid-row-selector']: col.columnAttr === 'rowSelector',
        };
        if (col.columnAttr === 'lineNumber') {
            if (focusedRow === li) {
                tdClassNames.focused = true;
            }
            if (selectionRows[li]) {
                tdClassNames.selected = true;
            }
        }
        else if (col.columnAttr === 'rowSelector') {
        }
        else {
            if (selectionRows[li] && selectionCols[colColIndex]) {
                tdClassNames.selected = true;
            }
            if (focusedRow === li && focusedCol === colColIndex) {
                tdClassNames.focused = true;
            }
        }
        if (isInlineEditing &&
            inlineEditingCell.rowIndex === li &&
            inlineEditingCell.colIndex === col.colIndex) {
            return (React.createElement("td", { key: ci, colSpan: col.colSpan, rowSpan: col.rowSpan, className: utils_1.classNames(tdClassNames), style: { height: cellHeight, minHeight: '1px' } },
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
            const colAlign = col.align || bodyAlign || '';
            let label;
            const getLabel = function (_item, _itemIdx) {
                let formatterData = {
                    data: filteredList,
                    item: _item,
                    index: _itemIdx,
                    key: col.key,
                    value: _item[col.key || ''],
                };
                let labelValue;
                if (typeof col.formatter === 'string' &&
                    col.formatter in predefinedFormatter) {
                    labelValue = predefinedFormatter[col.formatter](formatterData);
                }
                else if (utils_1.isFunction(col.formatter)) {
                    labelValue = col.formatter(formatterData);
                }
                else {
                    labelValue = _item[col.key || ''];
                }
                return labelValue;
            };
            if (col.key === '_line_number_') {
                label = li + 1;
            }
            else if (col.key === '_row_selector_') {
                label = (React.createElement("div", { className: "axui-datagrid-check-box", "data-span": col.columnAttr || '', "data-checked": filteredList[li]._selected_, style: {
                        maxHeight: lineHeight + 'px',
                        minHeight: lineHeight + 'px',
                    } }));
            }
            else {
                label = getLabel(filteredList[li], li);
            }
            return (React.createElement("td", { key: ci, colSpan: col.colSpan, rowSpan: col.rowSpan, className: utils_1.classNames(tdClassNames), style: { height: cellHeight, minHeight: '1px' }, onDoubleClick: (e) => {
                    this.onDoubleClickCell(e, col, li);
                } },
                React.createElement("span", { "data-span": col.columnAttr || '', "data-pos": col.colIndex + ',' + col.rowIndex + ',' + li, style: {
                        height: columnHeight - columnBorderWidth + 'px',
                        lineHeight: lineHeight + 'px',
                        textAlign: colAlign,
                    } }, label || ' ')));
        }
    }
}
exports.default = hoc_1.connectStore(DataGridBodyCell);
//# sourceMappingURL=DataGridBodyCell.js.map