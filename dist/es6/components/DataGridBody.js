"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const stores_1 = require("../stores");
const hoc_1 = require("../hoc");
const utils_1 = require("../utils");
const DataGridBodyPanel_1 = require("./DataGridBodyPanel");
const DataGridBodyBottomPanel_1 = require("./DataGridBodyBottomPanel");
const DataGridBodyLoader_1 = require("./DataGridBodyLoader");
class DataGridBody extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.onMouseDownBody = (e) => {
            const { filteredList = [], colGroup = [], headerColGroup = [], scrollLeft = 0, scrollTop = 0, focusedRow = 0, focusedCol = 0, isInlineEditing, inlineEditingCell = {}, styles = {}, setStoreState, dispatch, getRootNode, rootObject = {}, loading, loadingData, } = this.props;
            if (loading || loadingData) {
                return false;
            }
            const { frozenPanelWidth = 0, frozenPanelHeight = 0, headerHeight = 0, bodyHeight = 0, CTInnerWidth = 0, verticalScrollerWidth = 0, bodyTrHeight = 0, asidePanelWidth = 0, scrollContentWidth = 0, scrollContentHeight = 0, scrollContentContainerWidth = 0, scrollContentContainerHeight = 0, } = styles;
            const startMousePosition = utils_1.getMousePosition(e);
            const spanType = e.target['getAttribute']('data-span');
            const rootNode = utils_1.getNode(getRootNode);
            const { x: leftPadding = 0, y: topPadding = 0 } = rootNode && rootNode.getBoundingClientRect();
            const startScrollLeft = scrollLeft;
            const startScrollTop = scrollTop;
            const startX = startMousePosition.x - leftPadding;
            const startY = startMousePosition.y - topPadding;
            const getRowIndex = (y, _scrollTop) => {
                const i = Math.floor((y -
                    headerHeight -
                    (y - headerHeight < frozenPanelHeight ? 0 : _scrollTop)) /
                    bodyTrHeight);
                return i < 0
                    ? 0
                    : i >= filteredList.length - 1 ? filteredList.length - 1 : i;
            };
            const getColIndex = (x, _scrollLeft) => {
                const p = x -
                    asidePanelWidth -
                    (x - asidePanelWidth < frozenPanelWidth ? 0 : _scrollLeft);
                let cl = colGroup.length;
                let i = -1;
                while (cl--) {
                    const col = colGroup[cl];
                    if (col && (col._sx || 0) <= p && (col._ex || 0) >= p) {
                        i = col.colIndex;
                        break;
                    }
                }
                return i;
            };
            const procBodySelect = () => {
                if (selectStartedCol < 0) {
                    return;
                }
                const onMouseMove = (ee) => {
                    const currMousePosition = utils_1.getMousePosition(ee);
                    // 인터벌 무빙 함수 아래 구문에서 연속 스크롤이 필요하면 사용
                    const setStateCall = (currState, _moving) => {
                        const { selectionEndOffset: currSelectionEndOffset = {}, scrollLeft: currScrollLeft = 0, scrollTop: currScrollTop = 0, } = currState;
                        const { x: selectionEndOffsetX = 0, y: selectionEndOffsetY = 0, } = currSelectionEndOffset;
                        const selectEndedRow = getRowIndex(selectionEndOffsetY, currScrollTop);
                        let selectEndedCol = getColIndex(selectionEndOffsetX, currScrollLeft);
                        // 컬럼인덱스를 찾지 못했다면
                        if (selectEndedCol === -1) {
                            const p = selectionEndOffsetX - asidePanelWidth - scrollLeft;
                            const lastCol = headerColGroup[headerColGroup.length - 1] || {};
                            if (p < 0) {
                                selectEndedCol = 0;
                            }
                            else if (typeof lastCol._ex !== 'undefined' && lastCol._ex <= p) {
                                selectEndedCol = lastCol.colIndex || 0;
                            }
                            else {
                                selectEndedCol = 0;
                            }
                        }
                        let sRow = Math.min(selectStartedRow, selectEndedRow);
                        let eRow = Math.max(selectStartedRow, selectEndedRow);
                        let sCol = Math.min(selectStartedCol, selectEndedCol);
                        let eCol = Math.max(selectStartedCol, selectEndedCol);
                        if (sRow !== -1 && eRow !== -1 && sCol !== -1 && eCol !== -1) {
                            currState.selectionRows = {};
                            currState.selectionCols = {};
                            for (let i = sRow; i < eRow + 1; i++) {
                                currState.selectionRows[i] = true;
                            }
                            for (let i = sCol; i < eCol + 1; i++) {
                                currState.selectionCols[i] = true;
                            }
                        }
                        else {
                            console.log('get selection fail', sRow, eRow, sCol, eCol);
                        }
                        setStoreState(currState);
                    };
                    const scrollMoving = (_moving) => {
                        const { scrollTop: propsScrollTop = 0, scrollLeft: propsScrollLeft = 0, selectionEndOffset: propsSelectionEndOffset, } = this.props;
                        let _scrollTop = propsScrollTop;
                        let _scrollLeft = propsScrollLeft;
                        if (_moving.top) {
                            _scrollTop = propsScrollTop + bodyTrHeight;
                        }
                        else if (_moving.bottom) {
                            _scrollTop = propsScrollTop - bodyTrHeight;
                        }
                        if (_moving.left) {
                            _scrollLeft = propsScrollLeft + 100;
                        }
                        else if (_moving.right) {
                            _scrollLeft = propsScrollLeft - 100;
                        }
                        const { scrollLeft: newScrollLeft, scrollTop: newScrollTop, endOfScrollTop, endOfScrollLeft, } = utils_1.getScrollPosition(_scrollLeft, _scrollTop, {
                            scrollWidth: scrollContentWidth,
                            scrollHeight: scrollContentHeight,
                            clientWidth: scrollContentContainerWidth,
                            clientHeight: scrollContentContainerHeight,
                        });
                        setStateCall({
                            scrollTop: newScrollTop,
                            scrollLeft: newScrollLeft,
                            selectionEndOffset: propsSelectionEndOffset,
                        }, _moving);
                        return !endOfScrollTop && !endOfScrollLeft;
                    };
                    let x1 = startMousePosition.x - leftPadding;
                    let y1 = startMousePosition.y - topPadding;
                    let x2 = currMousePosition.x - leftPadding;
                    let y2 = currMousePosition.y - topPadding;
                    let p1X = Math.min(x1, x2);
                    let p2X = Math.max(x1, x2);
                    let p1Y = Math.min(y1, y2);
                    let p2Y = Math.max(y1, y2);
                    let moving = {
                        active: false,
                        top: false,
                        left: false,
                        bottom: false,
                        right: false,
                    };
                    if (p1Y < headerHeight) {
                        moving.active = true;
                        moving.top = true;
                    }
                    else if (p2Y > headerHeight + bodyHeight) {
                        moving.active = true;
                        moving.bottom = true;
                    }
                    if (p1X < asidePanelWidth) {
                        moving.active = true;
                        moving.left = true;
                    }
                    else if (p2X > CTInnerWidth - verticalScrollerWidth) {
                        moving.active = true;
                        moving.right = true;
                    }
                    // moving.active 이면 타임 인터벌 시작
                    if (rootObject.timer) {
                        clearInterval(rootObject.timer);
                    }
                    if (moving.active) {
                        rootObject.timer = setInterval(() => {
                            if (!scrollMoving(moving)) {
                                // clearInterval(this.scrollMovingTimer);
                            }
                        }, 60);
                    }
                    else {
                        setStateCall({
                            scrollTop: scrollTop,
                            scrollLeft: scrollLeft,
                            selectionStartOffset: {
                                x: x1,
                                y: y1,
                            },
                            selectionEndOffset: {
                                x: x2,
                                y: y2,
                            },
                            selectionMinOffset: {
                                x: p1X,
                                y: p1Y,
                            },
                            selectionMaxOffset: {
                                x: p2X,
                                y: p2Y,
                            },
                        }, moving);
                    }
                };
                const offEvent = (ee) => {
                    ee.preventDefault();
                    if (rootObject.timer) {
                        clearInterval(rootObject.timer);
                    }
                    setStoreState({
                        selectionStartOffset: undefined,
                        selectionEndOffset: undefined,
                        selectionMinOffset: undefined,
                        selectionMaxOffset: undefined,
                    });
                    document.removeEventListener('mousemove', throttledOnMouseMove);
                    document.removeEventListener('mouseup', offEvent);
                    document.removeEventListener('mouseleave', offEvent);
                };
                const throttledOnMouseMove = utils_1.throttle(onMouseMove, 10);
                if (e.metaKey || (e.shiftKey && focusedRow > -1 && focusedCol > -1)) {
                    if (e.shiftKey) {
                        let state = {
                            dragging: false,
                            selectionRows: {},
                            selectionCols: {},
                        };
                        let sRow = Math.min(focusedRow, selectStartedRow);
                        let sCol = Math.min(focusedCol, selectStartedCol);
                        let eRow = Math.max(focusedRow, selectStartedRow);
                        let eCol = Math.max(focusedCol, selectStartedCol);
                        for (let i = sRow; i < eRow + 1; i++) {
                            state.selectionRows[i] = true;
                        }
                        for (let i = sCol; i < eCol + 1; i++) {
                            state.selectionCols[i] = true;
                        }
                        setStoreState(state);
                        selectStartedRow = focusedRow;
                        selectStartedCol = focusedCol;
                        document.addEventListener('mousemove', throttledOnMouseMove);
                        document.addEventListener('mouseup', offEvent);
                        document.addEventListener('mouseleave', offEvent);
                    }
                }
                else {
                    // 셀렉션 저장정보 초기화
                    setStoreState({
                        selectionStartOffset: undefined,
                        selectionEndOffset: undefined,
                        selectionMinOffset: undefined,
                        selectionMaxOffset: undefined,
                        selectionRows: { [selectStartedRow]: true },
                        selectionCols: { [selectStartedCol]: true },
                        focusedRow: selectStartedRow,
                        focusedCol: selectStartedCol,
                    });
                    document.addEventListener('mousemove', throttledOnMouseMove);
                    document.addEventListener('mouseup', offEvent);
                    document.addEventListener('mouseleave', offEvent);
                }
            };
            const procClickLineNumber = () => {
                let state = {
                    dragging: false,
                    selectionRows: {},
                    selectionCols: (() => {
                        let cols = {};
                        colGroup.forEach((col) => {
                            cols[col.colIndex || 0] = true;
                        });
                        return cols;
                    })(),
                    focusedRow: focusedRow,
                    focusedCol: 0,
                };
                if (e.shiftKey) {
                    state.selectionRows = (() => {
                        let rows = {};
                        utils_1.arrayFromRange(Math.min(focusedRow, selectStartedRow), Math.max(focusedRow, selectStartedRow) + 1).forEach(i => {
                            rows[i] = true;
                        });
                        return rows;
                    })();
                }
                else {
                    state.selectionRows = {
                        [selectStartedRow]: true,
                    };
                    state.focusedRow = selectStartedRow;
                }
                setStoreState(state);
            };
            const procClickRowSelector = () => {
                dispatch(stores_1.DispatchTypes.SELECT, {
                    rowIndex: selectStartedRow,
                });
            };
            // 선택이 시작된 row / col
            let selectStartedRow = getRowIndex(startY, startScrollTop);
            let selectStartedCol = getColIndex(startX, startScrollLeft);
            if (isInlineEditing &&
                inlineEditingCell.rowIndex === selectStartedRow &&
                inlineEditingCell.colIndex === selectStartedCol) {
                // 선택된 셀이 에디팅중인 셀이라면 함수 실행 중지
                return false;
            }
            switch (spanType) {
                case 'lineNumber':
                    procClickLineNumber();
                    break;
                case 'rowSelector':
                    procClickRowSelector();
                    break;
                default:
                    procBodySelect();
                    break;
            }
            return true;
        };
    }
    render() {
        const { scrollLeft = 0, scrollTop = 0, options = {}, styles = {}, loadingData = false, } = this.props;
        const { frozenRowIndex = 0, bodyLoaderHeight = 0 } = options;
        const { CTInnerWidth = 0, bodyHeight = 0, bodyTrHeight = 0, asidePanelWidth = 0, frozenPanelWidth = 0, frozenPanelHeight = 0, rightPanelWidth = 0, verticalScrollerWidth = 0, footSumHeight = 0, } = styles;
        const sRowIndex = Math.floor(-scrollTop / (bodyTrHeight || 0)) + frozenRowIndex;
        const loadingDataHeight = loadingData ? bodyLoaderHeight : 0;
        const topBodyScrollConfig = {
            frozenRowIndex: 0,
            sRowIndex: 0,
            eRowIndex: frozenRowIndex - 1,
        };
        const bodyScrollConfig = {
            frozenRowIndex: frozenRowIndex,
            sRowIndex: sRowIndex,
            eRowIndex: sRowIndex + Math.ceil(bodyHeight / bodyTrHeight) + 1,
        };
        const topAsideBodyPanelStyle = {
            left: 0,
            width: asidePanelWidth,
            top: 0,
            height: frozenPanelHeight,
        };
        const topLeftBodyPanelStyle = {
            left: asidePanelWidth,
            width: frozenPanelWidth,
            top: 0,
            height: frozenPanelHeight,
        };
        const topBodyPanelStyle = {
            left: frozenPanelWidth + asidePanelWidth,
            width: CTInnerWidth -
                asidePanelWidth -
                frozenPanelWidth -
                rightPanelWidth -
                verticalScrollerWidth,
            top: 0,
            height: frozenPanelHeight,
        };
        const asideBodyPanelStyle = {
            left: 0,
            width: asidePanelWidth,
            top: frozenPanelHeight - loadingDataHeight,
            height: bodyHeight - frozenPanelHeight - footSumHeight,
        };
        const leftBodyPanelStyle = {
            left: asidePanelWidth,
            width: frozenPanelWidth,
            top: frozenPanelHeight - loadingDataHeight,
            height: bodyHeight - frozenPanelHeight - footSumHeight,
        };
        const bodyPanelStyle = {
            left: frozenPanelWidth + asidePanelWidth,
            width: CTInnerWidth -
                asidePanelWidth -
                frozenPanelWidth -
                rightPanelWidth -
                verticalScrollerWidth,
            top: frozenPanelHeight - loadingDataHeight,
            height: bodyHeight - frozenPanelHeight - footSumHeight,
        };
        const bottomAsideBodyPanelStyle = {
            left: 0,
            width: asidePanelWidth,
            top: bodyHeight - footSumHeight - 1,
            height: footSumHeight,
        };
        const bottomLeftBodyPanelStyle = {
            left: asidePanelWidth,
            width: frozenPanelWidth,
            top: bodyHeight - footSumHeight - 1,
            height: footSumHeight,
        };
        const bottomBodyPanelStyle = {
            left: frozenPanelWidth + asidePanelWidth,
            width: CTInnerWidth -
                asidePanelWidth -
                frozenPanelWidth -
                rightPanelWidth -
                verticalScrollerWidth,
            top: bodyHeight - footSumHeight - 1,
            height: footSumHeight,
        };
        return (React.createElement("div", { className: 'axui-datagrid-body', style: { height: styles.bodyHeight }, onMouseDown: this.onMouseDownBody },
            React.createElement(DataGridBodyPanel_1.default, { panelName: "top-aside-body-scroll", containerStyle: topAsideBodyPanelStyle, panelScrollConfig: topBodyScrollConfig }),
            React.createElement(DataGridBodyPanel_1.default, { panelName: "top-left-body-scroll", containerStyle: topLeftBodyPanelStyle, panelScrollConfig: topBodyScrollConfig }),
            React.createElement(DataGridBodyPanel_1.default, { panelName: "top-body-scroll", containerStyle: topBodyPanelStyle, panelScrollConfig: topBodyScrollConfig, panelLeft: scrollLeft }),
            React.createElement(DataGridBodyPanel_1.default, { panelName: "aside-body-scroll", containerStyle: asideBodyPanelStyle, panelScrollConfig: bodyScrollConfig, panelTop: scrollTop }),
            React.createElement(DataGridBodyPanel_1.default, { panelName: "left-body-scroll", containerStyle: leftBodyPanelStyle, panelScrollConfig: bodyScrollConfig, panelTop: scrollTop }),
            React.createElement(DataGridBodyPanel_1.default, { panelName: "body-scroll", containerStyle: bodyPanelStyle, panelScrollConfig: bodyScrollConfig, panelLeft: scrollLeft, panelTop: scrollTop }),
            React.createElement(DataGridBodyBottomPanel_1.default, { panelName: "bottom-aside-body-scroll", containerStyle: bottomAsideBodyPanelStyle }),
            React.createElement(DataGridBodyBottomPanel_1.default, { panelName: "bottom-left-body-scroll", containerStyle: bottomLeftBodyPanelStyle }),
            React.createElement(DataGridBodyBottomPanel_1.default, { panelName: "bottom-body-scroll", containerStyle: bottomBodyPanelStyle, panelLeft: scrollLeft }),
            React.createElement(DataGridBodyLoader_1.default, { loadingData: loadingData, bodyLoaderHeight: bodyLoaderHeight })));
    }
}
exports.default = hoc_1.connectStore(DataGridBody);
//# sourceMappingURL=DataGridBody.js.map