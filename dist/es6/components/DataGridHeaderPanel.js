"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const stores_1 = require("../stores");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
const DataGridHeaderCell_1 = require("./DataGridHeaderCell");
const DataGridTableColGroup_1 = require("./DataGridTableColGroup");
const TableBody = ({ bodyRow, onClick }) => (React.createElement("tbody", null, bodyRow.rows.map((row, ri) => (React.createElement("tr", { key: ri },
    row.cols.map((col, ci) => (React.createElement(DataGridHeaderCell_1.default, { key: ci, bodyRow: bodyRow, ri: ri, col: col, onClick: onClick }))),
    React.createElement("td", null))))));
const ColumnResizer = ({ colGroup, resizerHeight, onMouseDownColumnResizer }) => {
    let resizerLeft = 0;
    let resizerWidth = 4;
    return (React.createElement(React.Fragment, null, colGroup.map((col, ci) => {
        if (col.colIndex !== null && typeof col.colIndex !== 'undefined') {
            let prevResizerLeft = resizerLeft;
            resizerLeft += col._width || 0;
            return (React.createElement("div", { key: ci, "data-column-resizer": col.colIndex, "data-prev-left": prevResizerLeft, "data-left": resizerLeft, style: {
                    width: resizerWidth,
                    height: resizerHeight + 'px',
                    left: resizerLeft - resizerWidth / 2 + 'px',
                }, onMouseDown: e => onMouseDownColumnResizer(e, col) }));
        }
        else {
            return null;
        }
    })));
};
class DataGridHeaderPanel extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.onHandleClick = (e, col) => {
            const { filteredList = [], colGroup = [], scrollLeft = 0, focusedCol = 0, isColumnFilter = false, options = {}, styles = {}, setStoreState, dispatch, } = this.props;
            const { header: optionsHeader = {} } = options;
            const { key, colIndex = 0 } = col;
            const { asidePanelWidth = 0 } = styles;
            if (e.target.getAttribute('data-filter')) {
                const closeEvent = (ee) => {
                    const { isColumnFilter: _isColumnFilter } = this.props;
                    if (ee.target &&
                        ee.target.getAttribute &&
                        '' + _isColumnFilter === ee.target.getAttribute('data-filter-index')) {
                        return false;
                    }
                    let downedElement = false;
                    if (ee.target) {
                        downedElement = utils_1.findParentNode(ee.target, element => {
                            return element && element.getAttribute
                                ? element.getAttribute('data-column-filter') === 'true'
                                : false;
                        });
                    }
                    if (downedElement === false) {
                        ee.preventDefault();
                        setStoreState({
                            isColumnFilter: false,
                        });
                        document.removeEventListener('mouseup', closeEvent);
                        document.removeEventListener('mouseleave', closeEvent);
                        document.removeEventListener('keydown', keyDown);
                    }
                    return;
                };
                const keyDown = (ee) => {
                    if (ee.which === 27) {
                        closeEvent(ee);
                    }
                };
                if (isColumnFilter === colIndex) {
                    setStoreState({
                        isColumnFilter: false,
                    });
                    document.removeEventListener('mouseup', closeEvent);
                    document.removeEventListener('mouseleave', closeEvent);
                    document.removeEventListener('keydown', keyDown);
                }
                else {
                    let columnFilterLeft = asidePanelWidth + (colGroup[colIndex]._sx || 0) - 2 + scrollLeft;
                    setStoreState({
                        scrollLeft: columnFilterLeft < 0 ? scrollLeft - columnFilterLeft : scrollLeft,
                        isColumnFilter: colIndex,
                    });
                    document.removeEventListener('mouseup', closeEvent);
                    document.removeEventListener('mouseleave', closeEvent);
                    document.removeEventListener('keydown', keyDown);
                    document.addEventListener('mouseup', closeEvent);
                    document.addEventListener('mouseleave', closeEvent);
                    document.addEventListener('keydown', keyDown);
                }
            }
            else {
                let state = {
                    dragging: false,
                    selectionRows: {},
                    selectionCols: {},
                    focusedRow: 0,
                    focusedCol: focusedCol,
                };
                switch (key) {
                    case '_line_number_':
                        {
                            state.selectionRows = (() => {
                                let rows = {};
                                filteredList.forEach((item, i) => {
                                    rows[i] = true;
                                });
                                return rows;
                            })();
                            state.selectionCols = (() => {
                                let cols = {};
                                colGroup.forEach(_col => {
                                    cols[_col.colIndex || 0] = true;
                                });
                                return cols;
                            })();
                            state.focusedCol = 0;
                            setStoreState(state);
                        }
                        break;
                    case '_row_selector_':
                        dispatch(stores_1.DispatchTypes.SELECT_ALL, {});
                        break;
                    default:
                        {
                            if (optionsHeader.clickAction === 'select') {
                                state.selectionRows = (() => {
                                    let rows = {};
                                    filteredList.forEach((item, i) => {
                                        rows[i] = true;
                                    });
                                    return rows;
                                })();
                                if (e.shiftKey) {
                                    state.selectionCols = (() => {
                                        let cols = {};
                                        utils_1.arrayFromRange(Math.min(focusedCol, colIndex), Math.max(focusedCol, colIndex) + 1).forEach(i => {
                                            cols[i] = true;
                                        });
                                        return cols;
                                    })();
                                }
                                else {
                                    state.selectionCols = {
                                        [colIndex]: true,
                                    };
                                    state.focusedCol = colIndex;
                                }
                                setStoreState(state);
                            }
                            else if (optionsHeader.clickAction === 'sort' &&
                                optionsHeader.sortable) {
                                dispatch(stores_1.DispatchTypes.SORT, { colIndex });
                            }
                        }
                        break;
                }
                if (key === '_line_number_') {
                }
                else {
                }
            }
        };
        this.onMouseDownColumnResizer = (e, col) => {
            e.preventDefault();
            const { setStoreState, getRootNode, dispatch } = this.props;
            const rootNode = utils_1.getNode(getRootNode);
            const { x: rootX = 0 } = rootNode && rootNode.getBoundingClientRect();
            const resizer = e.target;
            const prevLeft = Number(resizer.getAttribute('data-prev-left'));
            const currLeft = Number(resizer.getAttribute('data-left'));
            let newWidth = 0;
            let startMousePosition = utils_1.getMousePosition(e).x;
            const onMouseMove = (ee) => {
                const { x } = utils_1.getMousePosition(ee);
                let newLeft = currLeft + x - startMousePosition;
                if (newLeft < prevLeft) {
                    newLeft = prevLeft;
                }
                newWidth = newLeft - prevLeft;
                setStoreState({
                    columnResizing: true,
                    columnResizerLeft: x - rootX + 1,
                });
            };
            const offEvent = (ee) => {
                ee.preventDefault();
                startMousePosition = null;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', offEvent);
                document.removeEventListener('mouseleave', offEvent);
                if (typeof newWidth !== 'undefined') {
                    dispatch(stores_1.DispatchTypes.RESIZE_COL, {
                        col,
                        newWidth,
                    });
                }
                else {
                    setStoreState({
                        columnResizing: false,
                    });
                }
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', offEvent);
            document.addEventListener('mouseleave', offEvent);
        };
    }
    render() {
        const { panelName, style, asideColGroup = [], asideHeaderData = { rows: [{ cols: [] }] }, leftHeaderColGroup = [], leftHeaderData = { rows: [{ cols: [] }] }, headerColGroup = [], headerData = { rows: [{ cols: [] }] }, options = {}, styles = {}, } = this.props;
        // aside-header가 필요하지 않은지 확인
        if (panelName === 'aside-header' &&
            styles &&
            styles.asidePanelWidth === 0) {
            return null;
        }
        // left-header가 필요하지 않은지 확인
        if (panelName === 'left-header' &&
            options &&
            options.frozenColumnIndex === 0) {
            return null;
        }
        const { header: optionsHeader = {} } = options;
        const { columnHeight: optionsHeaderColumnHeight = 0, columnBorderWidth: optionsHeaderColumnBorderWidth = 0, } = optionsHeader;
        const colGroup = (() => {
            switch (panelName) {
                case 'aside-header':
                    return asideColGroup;
                case 'left-header':
                    return leftHeaderColGroup;
                default:
                    return headerColGroup;
            }
        })();
        const bodyRow = (() => {
            switch (panelName) {
                case 'aside-header':
                    return asideHeaderData;
                case 'left-header':
                    return leftHeaderData;
                default:
                    return headerData;
            }
        })();
        const resizerHeight = optionsHeaderColumnHeight * bodyRow.rows.length -
            optionsHeaderColumnBorderWidth;
        return (React.createElement("div", { "data-panel": panelName, style: style },
            React.createElement("table", { style: { height: '100%' } },
                React.createElement(DataGridTableColGroup_1.default, { panelColGroup: colGroup }),
                React.createElement(TableBody, { bodyRow: bodyRow, onClick: this.onHandleClick })),
            panelName === 'aside-header' ? null : (React.createElement(ColumnResizer, { colGroup: colGroup, resizerHeight: resizerHeight, onMouseDownColumnResizer: this.onMouseDownColumnResizer }))));
    }
}
exports.default = hoc_1.connectStore(DataGridHeaderPanel);
