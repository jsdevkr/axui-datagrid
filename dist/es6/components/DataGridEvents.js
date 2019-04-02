"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
const _enums_1 = require("../common/@enums");
class DataGridEvents extends React.Component {
    constructor() {
        super(...arguments);
        this.busy = false;
        this.state = {};
        this.onKeyUp = (e) => {
            const { colGroup = [], focusedRow = 0, focusedCol = 0, setStoreState, } = this.props;
            switch (e.which) {
                case _enums_1.DataGridEnums.KeyCodes.ENTER:
                    const col = colGroup[focusedCol];
                    if (!col.editor) {
                        return;
                    }
                    setStoreState({
                        isInlineEditing: true,
                        inlineEditingCell: {
                            rowIndex: focusedRow,
                            colIndex: col.colIndex,
                            editor: col.editor,
                        },
                    });
                    return;
                default:
                    return;
            }
        };
        this.onKeyDown = (e) => {
            return new Promise((resolve, reject) => {
                const { data = [], rootNode, clipBoardNode, colGroup = [], headerColGroup = [], selectionRows = {}, selectionCols = {}, focusedCol = 0, setStoreState, scrollLeft = 0, scrollTop = 0, focusedRow = 0, options = {}, styles = {}, } = this.props;
                const { printStartColIndex = 0, printEndColIndex = colGroup.length - 1, } = this.props;
                const { frozenRowIndex = 0, frozenColumnIndex = 0 } = options;
                const { bodyTrHeight = 0, scrollContentWidth = 0, scrollContentHeight = 0, scrollContentContainerWidth = 0, scrollContentContainerHeight = 0, frozenPanelWidth = 0, rightPanelWidth = 0, verticalScrollerWidth = 0, } = styles;
                const sRowIndex = Math.floor(-scrollTop / bodyTrHeight) + frozenRowIndex;
                const eRowIndex = Math.floor(-scrollTop / bodyTrHeight) +
                    // frozenRowIndex +
                    Math.floor(scrollContentContainerHeight / bodyTrHeight);
                const sColIndex = printStartColIndex;
                const eColIndex = printEndColIndex;
                const pRowSize = Math.floor(scrollContentContainerHeight / bodyTrHeight);
                const getAvailScrollTop = (rowIndex) => {
                    let _scrollTop = undefined;
                    if (frozenRowIndex >= rowIndex) {
                        return;
                    }
                    if (sRowIndex >= rowIndex) {
                        _scrollTop = -(rowIndex - frozenRowIndex) * bodyTrHeight;
                    }
                    else if (eRowIndex <= rowIndex) {
                        _scrollTop =
                            -rowIndex * bodyTrHeight + (pRowSize * bodyTrHeight - bodyTrHeight);
                    }
                    if (typeof _scrollTop !== 'undefined') {
                        _scrollTop = utils_1.getScrollPosition(scrollLeft, _scrollTop, {
                            scrollWidth: scrollContentWidth,
                            scrollHeight: scrollContentHeight,
                            clientWidth: scrollContentContainerWidth,
                            clientHeight: scrollContentContainerHeight,
                        }).scrollTop;
                    }
                    else {
                        _scrollTop = scrollTop;
                    }
                    return _scrollTop;
                };
                const getAvailScrollLeft = (colIndex) => {
                    let _scrollLeft = undefined;
                    if (frozenColumnIndex > colIndex) {
                        return;
                    }
                    if (sColIndex >= colIndex - frozenColumnIndex) {
                        _scrollLeft = -colGroup[colIndex]._sx + frozenPanelWidth;
                    }
                    else if (eColIndex <= colIndex - frozenColumnIndex) {
                        // 끝점 계산
                        _scrollLeft =
                            scrollContentContainerWidth -
                                colGroup[colIndex]._ex +
                                frozenPanelWidth -
                                verticalScrollerWidth -
                                rightPanelWidth;
                    }
                    if (typeof _scrollLeft !== 'undefined') {
                        _scrollLeft = utils_1.getScrollPosition(_scrollLeft, scrollTop, {
                            scrollWidth: scrollContentWidth,
                            scrollHeight: scrollContentHeight,
                            clientWidth: scrollContentContainerWidth,
                            clientHeight: scrollContentContainerHeight,
                        }).scrollLeft;
                    }
                    else {
                        _scrollLeft = scrollLeft;
                    }
                    return _scrollLeft;
                };
                if (e.metaKey) {
                    switch (e.which) {
                        case _enums_1.DataGridEnums.MetaKeycodes.C:
                            e.preventDefault();
                            let copySuccess = false;
                            let copiedString = '';
                            for (let rk in selectionRows) {
                                if (selectionRows[rk]) {
                                    const item = data[rk];
                                    for (let ck in selectionCols) {
                                        if (selectionCols[ck]) {
                                            copiedString += (item[headerColGroup[ck].key] || '') + '\t';
                                        }
                                    }
                                    copiedString += '\n';
                                }
                            }
                            if (clipBoardNode && clipBoardNode.current) {
                                clipBoardNode.current.value = copiedString;
                                clipBoardNode.current.select();
                            }
                            try {
                                copySuccess = document.execCommand('copy');
                            }
                            catch (e) { }
                            rootNode && rootNode.current && rootNode.current.focus();
                            if (copySuccess) {
                                resolve();
                            }
                            else {
                                reject();
                            }
                            break;
                        case _enums_1.DataGridEnums.MetaKeycodes.A:
                            e.preventDefault();
                            let state = {
                                dragging: false,
                                selectionRows: {},
                                selectionCols: {},
                                focusedRow: 0,
                                focusedCol: focusedCol,
                            };
                            state.selectionRows = (() => {
                                let rows = {};
                                data.forEach((item, i) => {
                                    rows[i] = true;
                                });
                                return rows;
                            })();
                            state.selectionCols = (() => {
                                let cols = {};
                                colGroup.forEach(col => {
                                    cols[col.colIndex || 0] = true;
                                });
                                return cols;
                            })();
                            state.focusedCol = 0;
                            setStoreState(state, () => {
                                resolve();
                            });
                            break;
                        default:
                            resolve();
                            break;
                    }
                }
                else {
                    let focusRow;
                    let focusCol;
                    switch (e.which) {
                        case _enums_1.DataGridEnums.KeyCodes.ESC:
                            setStoreState({
                                selectionRows: {
                                    [focusedRow]: true,
                                },
                                selectionCols: {
                                    [focusedCol]: true,
                                },
                            }, () => {
                                resolve();
                            });
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.HOME:
                            focusRow = 0;
                            setStoreState({
                                scrollTop: getAvailScrollTop(focusRow),
                                selectionRows: {
                                    [focusRow]: true,
                                },
                                focusedRow: focusRow,
                            }, () => {
                                resolve();
                            });
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.END:
                            focusRow = data.length - 1;
                            setStoreState({
                                scrollTop: getAvailScrollTop(focusRow),
                                selectionRows: {
                                    [focusRow]: true,
                                },
                                focusedRow: focusRow,
                            }, () => {
                                resolve();
                            });
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.PAGE_UP:
                            e.preventDefault();
                            focusRow = focusedRow - pRowSize < 1 ? 0 : focusedRow - pRowSize;
                            setStoreState({
                                scrollTop: getAvailScrollTop(focusRow),
                                selectionRows: {
                                    [focusRow]: true,
                                },
                                focusedRow: focusRow,
                            }, () => {
                                resolve();
                            });
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.PAGE_DOWN:
                            e.preventDefault();
                            focusRow =
                                focusedRow + pRowSize >= data.length
                                    ? data.length - 1
                                    : focusedRow + pRowSize;
                            setStoreState({
                                scrollTop: getAvailScrollTop(focusRow),
                                selectionRows: {
                                    [focusRow]: true,
                                },
                                focusedRow: focusRow,
                            }, () => {
                                resolve();
                            });
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.UP_ARROW:
                            e.preventDefault();
                            focusRow = focusedRow < 1 ? 0 : focusedRow - 1;
                            setStoreState({
                                scrollTop: getAvailScrollTop(focusRow),
                                selectionRows: {
                                    [focusRow]: true,
                                },
                                focusedRow: focusRow,
                            }, () => {
                                setTimeout(() => {
                                    resolve();
                                });
                            });
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.DOWN_ARROW:
                            e.preventDefault();
                            focusRow =
                                focusedRow + 1 >= data.length ? data.length - 1 : focusedRow + 1;
                            setStoreState({
                                scrollTop: getAvailScrollTop(focusRow),
                                selectionRows: {
                                    [focusRow]: true,
                                },
                                focusedRow: focusRow,
                            }, () => {
                                setTimeout(() => {
                                    resolve();
                                });
                            });
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.LEFT_ARROW:
                            e.preventDefault();
                            focusCol = focusedCol < 1 ? 0 : focusedCol - 1;
                            setStoreState({
                                scrollLeft: getAvailScrollLeft(focusCol),
                                selectionCols: {
                                    [focusCol]: true,
                                },
                                focusedCol: focusCol,
                            }, () => {
                                setTimeout(() => {
                                    resolve();
                                });
                            });
                            break;
                        case _enums_1.DataGridEnums.KeyCodes.RIGHT_ARROW:
                            e.preventDefault();
                            focusCol =
                                focusedCol + 1 >= colGroup.length
                                    ? colGroup.length - 1
                                    : focusedCol + 1;
                            setStoreState({
                                scrollLeft: getAvailScrollLeft(focusCol),
                                selectionCols: {
                                    [focusCol]: true,
                                },
                                focusedCol: focusCol,
                            }, () => {
                                setTimeout(() => {
                                    resolve();
                                });
                            });
                            break;
                        default:
                            resolve();
                            break;
                    }
                }
            });
        };
        this.onContextmenu = (e) => {
            const { onRightClick, focusedRow, focusedCol, data, colGroup } = this.props;
            if (onRightClick &&
                data &&
                typeof focusedRow !== 'undefined' &&
                typeof focusedCol !== 'undefined' &&
                colGroup) {
                const { key: itemKey = '' } = colGroup[focusedCol];
                onRightClick({
                    e,
                    item: data[focusedRow],
                    value: data[focusedRow][itemKey],
                    focusedRow,
                    focusedCol,
                });
            }
        };
        this.onFireEvent = (e) => __awaiter(this, void 0, void 0, function* () {
            const { loading, loadingData, isInlineEditing = false } = this.props;
            if (this.busy || loadingData || loading) {
                e.preventDefault();
                return;
            }
            if (isInlineEditing) {
                return;
            }
            if (this.props.onBeforeEvent) {
                this.props.onBeforeEvent({ e, eventName: e.type });
            }
            switch (e.type) {
                case _enums_1.DataGridEnums.EventNames.KEYDOWN:
                    this.busy = true;
                    try {
                        yield this.onKeyDown(e);
                    }
                    catch (err) {
                        console.log(err);
                    }
                    this.busy = false;
                    break;
                case _enums_1.DataGridEnums.EventNames.KEYUP:
                    this.onKeyUp(e);
                    break;
                case _enums_1.DataGridEnums.EventNames.CONTEXTMENU:
                    this.onContextmenu(e);
                    break;
                default:
                    break;
            }
        });
    }
    render() {
        return React.createElement("div", null, this.props.children);
    }
    componentDidMount() {
        const { rootNode } = this.props;
        if (rootNode && rootNode.current) {
            rootNode.current.addEventListener('keydown', this.onFireEvent, false);
            rootNode.current.addEventListener('keyup', this.onFireEvent, false);
            rootNode.current.addEventListener('contextmenu', this.onFireEvent, false);
        }
    }
    componentWillUnmount() {
        const { rootNode } = this.props;
        if (rootNode && rootNode.current) {
            rootNode.current.removeEventListener('keydown', this.onFireEvent);
            rootNode.current.removeEventListener('keyup', this.onFireEvent);
            rootNode.current.removeEventListener('contextmenu', this.onFireEvent);
        }
    }
}
exports.default = hoc_1.connectStore(DataGridEvents);
