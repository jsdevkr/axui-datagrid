"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
const _enums_1 = require("../common/@enums");
class DataGridEvents extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.onWheel = (e) => {
            const { scrollLeft = 0, scrollTop = 0, styles = {}, setStoreState, isColumnFilter = false, } = this.props;
            const { scrollContentWidth = 0, scrollContentContainerWidth = 0, scrollContentHeight = 0, scrollContentContainerHeight = 0, } = styles;
            let delta = { x: 0, y: 0 };
            // 컬럼필터 활성화 상태라면 구문 실행 안함.
            if (isColumnFilter) {
                return true;
            }
            if (e.detail) {
                delta.y = e.detail * 10;
            }
            else {
                if (typeof e.deltaY === 'undefined') {
                    delta.y = -e.wheelDelta;
                    delta.x = 0;
                }
                else {
                    delta.y = e.deltaY;
                    delta.x = e.deltaX;
                }
            }
            let { scrollLeft: currScrollLeft = 0, scrollTop: currScrollTop = 0, } = utils_1.getScrollPosition(scrollLeft - delta.x, scrollTop - delta.y, {
                scrollWidth: scrollContentWidth,
                scrollHeight: scrollContentHeight,
                clientWidth: scrollContentContainerWidth,
                clientHeight: scrollContentContainerHeight,
            });
            setStoreState({
                scrollLeft: currScrollLeft,
                scrollTop: currScrollTop,
            });
            e.preventDefault();
            e.stopPropagation();
            /* 휠 이벤트에서 이벤트 중지 예외처리 사용안함.
            if (!endScroll) {
        
            }
            */
            return true;
        };
        this.onKeyUp = (e) => {
            const { colGroup = [], focusedRow = 0, focusedCol = 0, setStoreState, isInlineEditing, } = this.props;
            const proc = {
                [_enums_1.KeyCodes.ENTER]: () => {
                    const col = colGroup[focusedCol];
                    if (col.editor) {
                        setStoreState({
                            isInlineEditing: true,
                            inlineEditingCell: {
                                rowIndex: focusedRow,
                                colIndex: col.colIndex,
                                editor: col.editor,
                            },
                        });
                    }
                },
            };
            if (!isInlineEditing && e.which in proc) {
                proc[e.which]();
            }
        };
        this.onKeyDown = (e) => {
            const { filteredList = [], rootNode, clipBoardNode, colGroup = [], headerColGroup = [], selectionRows = {}, selectionCols = {}, focusedCol = 0, setStoreState, scrollLeft = 0, scrollTop = 0, focusedRow = 0, options = {}, styles = {}, } = this.props;
            const { printStartColIndex = 0, printEndColIndex = colGroup.length, } = this.props;
            const { frozenRowIndex = 0, frozenColumnIndex = 0 } = options;
            const { bodyTrHeight = 0, scrollContentWidth = 0, scrollContentHeight = 0, scrollContentContainerWidth = 0, scrollContentContainerHeight = 0, frozenPanelWidth = 0, rightPanelWidth = 0, verticalScrollerWidth = 0, } = styles;
            // const rootNode = getNode(getRootNode);
            // const clipBoardNode = getNode(getClipBoardNode);
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
            const metaProc = {
                [_enums_1.KeyCodes.C]: () => {
                    e.preventDefault();
                    e.stopPropagation();
                    let copySuccess = false;
                    let copiedString = '';
                    for (let rk in selectionRows) {
                        if (selectionRows[rk]) {
                            const item = filteredList[rk];
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
                    return copySuccess;
                },
                [_enums_1.KeyCodes.A]: () => {
                    e.preventDefault();
                    e.stopPropagation();
                    let state = {
                        dragging: false,
                        selectionRows: {},
                        selectionCols: {},
                        focusedRow: 0,
                        focusedCol: focusedCol,
                    };
                    state.selectionRows = (() => {
                        let rows = {};
                        filteredList.forEach((item, i) => {
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
                    setStoreState(state);
                },
            };
            const proc = {
                [_enums_1.KeyCodes.ESC]: () => {
                    setStoreState({
                        selectionRows: {
                            [focusedRow]: true,
                        },
                        selectionCols: {
                            [focusedCol]: true,
                        },
                    });
                },
                [_enums_1.KeyCodes.HOME]: () => {
                    e.preventDefault();
                    e.stopPropagation();
                    const focusRow = 0;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: {
                            [focusRow]: true,
                        },
                        focusedRow: focusRow,
                    });
                },
                [_enums_1.KeyCodes.END]: () => {
                    e.preventDefault();
                    e.stopPropagation();
                    const focusRow = filteredList.length - 1;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: {
                            [focusRow]: true,
                        },
                        focusedRow: focusRow,
                    });
                },
                [_enums_1.KeyCodes.PAGE_UP]: () => {
                    e.preventDefault();
                    e.stopPropagation();
                    const focusRow = focusedRow - pRowSize < 1 ? 0 : focusedRow - pRowSize;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: {
                            [focusRow]: true,
                        },
                        focusedRow: focusRow,
                    });
                },
                [_enums_1.KeyCodes.PAGE_DOWN]: () => {
                    e.preventDefault();
                    e.stopPropagation();
                    let focusRow = focusedRow + pRowSize >= filteredList.length
                        ? filteredList.length - 1
                        : focusedRow + pRowSize;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: {
                            [focusRow]: true,
                        },
                        focusedRow: focusRow,
                    });
                },
                [_enums_1.KeyCodes.UP_ARROW]: () => {
                    e.preventDefault();
                    e.stopPropagation();
                    let focusRow = focusedRow < 1 ? 0 : focusedRow - 1;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: {
                            [focusRow]: true,
                        },
                        focusedRow: focusRow,
                    });
                },
                [_enums_1.KeyCodes.DOWN_ARROW]: () => {
                    e.preventDefault();
                    e.stopPropagation();
                    let focusRow = focusedRow + 1 >= filteredList.length
                        ? filteredList.length - 1
                        : focusedRow + 1;
                    setStoreState({
                        scrollTop: getAvailScrollTop(focusRow),
                        selectionRows: {
                            [focusRow]: true,
                        },
                        focusedRow: focusRow,
                    });
                },
                [_enums_1.KeyCodes.LEFT_ARROW]: () => {
                    e.preventDefault();
                    e.stopPropagation();
                    let focusCol = focusedCol < 1 ? 0 : focusedCol - 1;
                    setStoreState({
                        scrollLeft: getAvailScrollLeft(focusCol),
                        selectionCols: {
                            [focusCol]: true,
                        },
                        focusedCol: focusCol,
                    });
                },
                [_enums_1.KeyCodes.RIGHT_ARROW]: () => {
                    e.preventDefault();
                    e.stopPropagation();
                    let focusCol = focusedCol + 1 >= colGroup.length
                        ? colGroup.length - 1
                        : focusedCol + 1;
                    setStoreState({
                        scrollLeft: getAvailScrollLeft(focusCol),
                        selectionCols: {
                            [focusCol]: true,
                        },
                        focusedCol: focusCol,
                    });
                },
            };
            if (e.metaKey) {
                if (e.which in metaProc) {
                    metaProc[e.which]();
                }
            }
            else {
                proc[e.which] && proc[e.which]();
            }
        };
        this.onFireEvent = (e, eventName) => {
            const { loading, loadingData, isInlineEditing = false } = this.props;
            const proc = {
                [_enums_1.EventNames.WHEEL]: () => {
                    if (!loadingData) {
                        this.onWheel(e);
                    }
                    else {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                },
                [_enums_1.EventNames.KEYDOWN]: () => {
                    if (!loadingData && !isInlineEditing) {
                        this.onKeyDown(e);
                    }
                },
                [_enums_1.EventNames.KEYUP]: () => {
                    if (!loadingData && !isInlineEditing) {
                        this.onKeyUp(e);
                    }
                },
                [_enums_1.EventNames.MOUSEDOWN]: () => { },
                [_enums_1.EventNames.MOUSEUP]: () => { },
                [_enums_1.EventNames.CLICK]: () => { },
            };
            if (eventName in proc && !loading) {
                if (this.props.onBeforeEvent && !loadingData) {
                    this.props.onBeforeEvent(e, eventName);
                }
                proc[eventName]();
                if (this.props.onAfterEvent && !loadingData) {
                    this.props.onAfterEvent(e, eventName);
                }
            }
        };
    }
    render() {
        return (React.createElement("div", { onWheel: e => {
                this.onFireEvent(e, _enums_1.EventNames.WHEEL);
            }, onKeyDown: e => {
                this.onFireEvent(e, _enums_1.EventNames.KEYDOWN);
            }, onKeyUp: e => {
                this.onFireEvent(e, _enums_1.EventNames.KEYUP);
            }, onMouseDown: e => {
                this.onFireEvent(e, _enums_1.EventNames.MOUSEDOWN);
            }, onMouseUp: e => {
                this.onFireEvent(e, _enums_1.EventNames.MOUSEUP);
            }, onClick: e => {
                this.onFireEvent(e, _enums_1.EventNames.CLICK);
            }, onTouchStartCapture: e => {
                // this.onFireEvent(e, EventNames.TOUCHSTART);
            } }, this.props.children));
    }
}
exports.default = hoc_1.connectStore(DataGridEvents);
