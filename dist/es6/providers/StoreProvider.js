"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const stores_1 = require("../stores");
const utils_1 = require("../utils");
const formatter_1 = require("../functions/formatter");
const store = {
    dragging: false,
    sortInfo: {},
    isColumnFilter: false,
    scrollLeft: 0,
    scrollTop: 0,
    selectionRows: {},
    selectionCols: {},
    focusedRow: -1,
    focusedCol: -1,
    selectionStartOffset: {},
    selectionEndOffset: {},
    selectionMinOffset: {},
    selectionMaxOffset: {},
    columnResizing: false,
    columnResizerLeft: 0,
    mounted: false,
    data: [],
    filteredList: [],
    colGroup: [],
    asideColGroup: [],
    leftHeaderColGroup: [],
    headerColGroup: [],
    asideHeaderData: { rows: [{ cols: [] }] },
    leftHeaderData: { rows: [{ cols: [] }] },
    headerData: { rows: [{ cols: [] }] },
    asideBodyRowData: { rows: [{ cols: [] }] },
    leftBodyRowData: { rows: [{ cols: [] }] },
    bodyRowData: { rows: [{ cols: [] }] },
    asideBodyGroupingData: { rows: [{ cols: [] }] },
    leftBodyGroupingData: { rows: [{ cols: [] }] },
    bodyGroupingData: { rows: [{ cols: [] }] },
    colGroupMap: {},
    bodyRowMap: {},
    bodyGroupingMap: {},
    options: {},
    styles: {},
    predefinedFormatter: {},
    setStoreState: () => { },
    dispatch: () => { },
};
const { Provider, Consumer } = React.createContext(store);
class StoreProvider extends React.Component {
    constructor() {
        super(...arguments);
        this.state = store;
        // state 가 업데이트 되기 전.
        this.setStoreState = (newState) => {
            const { filteredList = [], scrollLeft = 0, options = {}, styles = {}, headerColGroup = [], bodyRowData = { rows: [{ cols: [] }] }, bodyGroupingData = { rows: [{ cols: [] }] }, } = this.state;
            const { frozenColumnIndex = 0 } = options;
            const { CTInnerWidth } = styles;
            const { scrollLeft: _scrollLeft, styles: _styles = {}, filteredList: _filteredList, } = newState;
            if (typeof _scrollLeft !== 'undefined') {
                const { CTInnerWidth: _CTInnerWidth = 0, frozenPanelWidth: _frozenPanelWidth = 0, asidePanelWidth: _asidePanelWidth = 0, rightPanelWidth: _rightPanelWidth = 0, } = Object.assign({}, styles, _styles);
                if (CTInnerWidth !== _CTInnerWidth || scrollLeft !== _scrollLeft) {
                    const { printStartColIndex, printEndColIndex, } = utils_1.getPositionPrintColGroup(headerColGroup, Math.abs(_scrollLeft) + _frozenPanelWidth, Math.abs(_scrollLeft) +
                        _frozenPanelWidth +
                        (_CTInnerWidth -
                            _asidePanelWidth -
                            _frozenPanelWidth -
                            _rightPanelWidth));
                    newState.printStartColIndex = printStartColIndex;
                    newState.printEndColIndex = printEndColIndex;
                    newState.visibleHeaderColGroup = headerColGroup.slice(printStartColIndex, printEndColIndex + 1);
                    newState.visibleBodyRowData = utils_1.getTableByStartEndColumnIndex(bodyRowData, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
                    newState.visibleBodyGroupingData = utils_1.getTableByStartEndColumnIndex(bodyGroupingData, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
                }
            }
            if (_filteredList && filteredList.length !== _filteredList.length) {
                newState.styles = utils_1.calculateDimensions(utils_1.getNode(this.state.getRootNode), this.state, _filteredList).styles;
            }
            this.setState(newState);
        };
        this.dispatch = (dispatchType, param) => {
            const { data = [], scrollLeft = 0, colGroup = [], getRootNode, focusedRow = 0, sortInfo = {}, options = {}, } = this.state;
            const { columnKeys: optionColumnKeys = {} } = options;
            const rootNode = utils_1.getNode(getRootNode);
            let { filteredList = [] } = this.state;
            const proc = {
                [stores_1.DispatchTypes.FILTER]: () => {
                    const { colIndex, filterInfo } = param;
                    const checkAll = filterInfo[colIndex] === false
                        ? true
                        : filterInfo[colIndex].__check_all__;
                    if (checkAll) {
                        filteredList =
                            data &&
                                data.filter((n) => {
                                    return !n[optionColumnKeys.deleted || '__deleted__'];
                                });
                    }
                    else {
                        filteredList = data.filter((n) => {
                            if (n) {
                                const value = n[colGroup[colIndex].key || ''];
                                if (n[optionColumnKeys.deleted || '__deleted__']) {
                                    return false;
                                }
                                if (typeof value === 'undefined') {
                                    if (!filterInfo[colIndex].__UNDEFINED__) {
                                        return false;
                                    }
                                }
                                else {
                                    if (!filterInfo[colIndex][value]) {
                                        return false;
                                    }
                                }
                                return true;
                            }
                            return false;
                        });
                    }
                    this.setStoreState({
                        filteredList,
                        filterInfo,
                    });
                },
                [stores_1.DispatchTypes.SORT]: () => {
                    const { colIndex } = param;
                    const { key: colKey = '' } = colGroup[colIndex];
                    let currentSortInfo = {};
                    let seq = 0;
                    let sortInfoArray = [];
                    const getValueByKey = function (_item, _key) {
                        return _item[_key] || '';
                    };
                    for (let k in sortInfo) {
                        if (sortInfo[k]) {
                            currentSortInfo[k] = sortInfo[k];
                            seq++;
                        }
                    }
                    if (currentSortInfo[colKey]) {
                        if (currentSortInfo[colKey].orderBy === 'desc') {
                            currentSortInfo[colKey].orderBy = 'asc';
                        }
                        else if (currentSortInfo[colKey].orderBy === 'asc') {
                            delete currentSortInfo[colKey];
                        }
                    }
                    else {
                        currentSortInfo[colKey] = {
                            seq: seq++,
                            orderBy: 'desc',
                        };
                    }
                    for (let k in currentSortInfo) {
                        if (currentSortInfo[k]) {
                            sortInfoArray[currentSortInfo[k].seq] = {
                                key: k,
                                order: currentSortInfo[k].orderBy,
                            };
                        }
                    }
                    sortInfoArray = sortInfoArray.filter(o => typeof o !== 'undefined');
                    let i = 0, l = sortInfoArray.length, aValue, bValue;
                    const sortedList = filteredList.sort((a, b) => {
                        for (i = 0; i < l; i++) {
                            aValue = getValueByKey(a, sortInfoArray[i].key);
                            bValue = getValueByKey(b, sortInfoArray[i].key);
                            if (typeof aValue !== typeof bValue) {
                                aValue = '' + aValue;
                                bValue = '' + bValue;
                            }
                            if (aValue < bValue) {
                                return sortInfoArray[i].order === 'asc' ? -1 : 1;
                            }
                            else if (aValue > bValue) {
                                return sortInfoArray[i].order === 'asc' ? 1 : -1;
                            }
                        }
                    });
                    this.setStoreState({
                        sortInfo: currentSortInfo,
                        filteredList: sortedList,
                        isInlineEditing: false,
                        inlineEditingCell: {},
                    });
                },
                [stores_1.DispatchTypes.UPDATE]: () => {
                    const { row, colIndex, value, eventWhichKey } = param;
                    const key = colGroup[colIndex].key;
                    let focusRow = focusedRow;
                    if (key) {
                        filteredList[row][key] = value;
                        // update filteredList
                    }
                    if (eventWhichKey) {
                        switch (eventWhichKey) {
                            case stores_1.KeyCodes.UP_ARROW:
                                focusRow = focusedRow < 1 ? 0 : focusedRow - 1;
                                break;
                            case stores_1.KeyCodes.DOWN_ARROW:
                                focusRow =
                                    focusedRow + 1 >= filteredList.length
                                        ? filteredList.length - 1
                                        : focusedRow + 1;
                                break;
                            default:
                                break;
                        }
                    }
                    this.setStoreState({
                        isInlineEditing: false,
                        inlineEditingCell: {},
                        selectionRows: {
                            [focusRow]: true,
                        },
                        focusedRow: focusRow,
                    });
                    if (rootNode) {
                        rootNode.focus();
                    }
                },
                [stores_1.DispatchTypes.RESIZE_COL]: () => {
                    const { col, newWidth } = param;
                    let newState = Object.assign({}, this.state);
                    if (newState.colGroup) {
                        newState.colGroup[col.colIndex]._width = newState.colGroup[col.colIndex].width = newWidth;
                    }
                    const { styles, leftHeaderColGroup, headerColGroup, } = utils_1.calculateDimensions(rootNode, newState);
                    this.setStoreState({
                        scrollLeft,
                        colGroup: colGroup,
                        leftHeaderColGroup: leftHeaderColGroup,
                        headerColGroup: headerColGroup,
                        styles: styles,
                        columnResizing: false,
                    });
                },
            };
            proc[dispatchType]();
        };
    }
    static getDerivedStateFromProps(newProps, prevState) {
        if (newProps.mounted === prevState.mounted &&
            newProps.setRootState === prevState.setRootState &&
            newProps.getRootState === prevState.getRootState &&
            newProps.getRootNode === prevState.getRootNode &&
            newProps.getClipBoardNode === prevState.getClipBoardNode &&
            newProps.rootObject === prevState.rootObject &&
            newProps.data === prevState.data &&
            newProps.filteredList === prevState.filteredList &&
            newProps.options === prevState.options &&
            newProps.height === prevState.height &&
            newProps.onBeforeEvent === prevState.onBeforeEvent &&
            newProps.onAfterEvent === prevState.onAfterEvent &&
            newProps.headerTable === prevState.headerTable &&
            newProps.bodyRowTable === prevState.bodyRowTable &&
            newProps.bodyRowMap === prevState.bodyRowMap &&
            newProps.asideHeaderData === prevState.asideHeaderData &&
            newProps.leftHeaderData === prevState.leftHeaderData &&
            newProps.headerData === prevState.headerData &&
            newProps.asideColGroup === prevState.asideColGroup &&
            newProps.asideBodyRowData === prevState.asideBodyRowData &&
            newProps.leftBodyRowData === prevState.leftBodyRowData &&
            newProps.bodyRowData === prevState.bodyRowData &&
            newProps.colGroup === prevState.colGroup &&
            newProps.colGroupMap === prevState.colGroupMap &&
            newProps.leftHeaderColGroup === prevState.leftHeaderColGroup &&
            newProps.headerColGroup === prevState.headerColGroup &&
            newProps.styles === prevState.styles &&
            newProps.printStartColIndex === prevState.printStartColIndex &&
            newProps.printEndColIndex === prevState.printEndColIndex &&
            newProps.visibleHeaderColGroup === prevState.visibleHeaderColGroup &&
            newProps.visibleBodyRowData === prevState.visibleBodyRowData &&
            newProps.visibleBodyGroupingData === prevState.visibleBodyGroupingData) {
            return null;
        }
        else {
            return Object.assign({}, prevState, {
                mounted: newProps.mounted,
                setRootState: newProps.setRootState,
                getRootState: newProps.getRootState,
                getRootNode: newProps.getRootNode,
                getClipBoardNode: newProps.getClipBoardNode,
                rootObject: newProps.rootObject,
                data: newProps.data,
                filteredList: newProps.filteredList,
                options: newProps.options,
                height: newProps.height,
                onBeforeEvent: newProps.onBeforeEvent,
                onAfterEvent: newProps.onAfterEvent,
                headerTable: newProps.headerTable,
                bodyRowTable: newProps.bodyRowTable,
                bodyRowMap: newProps.bodyRowMap,
                asideHeaderData: newProps.asideHeaderData,
                leftHeaderData: newProps.leftHeaderData,
                headerData: newProps.headerData,
                asideColGroup: newProps.asideColGroup,
                asideBodyRowData: newProps.asideBodyRowData,
                leftBodyRowData: newProps.leftBodyRowData,
                bodyRowData: newProps.bodyRowData,
                colGroup: newProps.colGroup,
                colGroupMap: newProps.colGroupMap,
                leftHeaderColGroup: newProps.leftHeaderColGroup,
                headerColGroup: newProps.headerColGroup,
                styles: newProps.styles,
                printStartColIndex: newProps.printStartColIndex,
                printEndColIndex: newProps.printEndColIndex,
                visibleHeaderColGroup: newProps.visibleHeaderColGroup,
                visibleBodyRowData: newProps.visibleBodyRowData,
                visibleBodyGroupingData: newProps.visibleBodyGroupingData,
            });
        }
    }
    componentDidMount() {
        this.throttledUpdateDimensions = utils_1.throttle(this.updateDimensions.bind(this), 100);
        window.addEventListener('resize', this.throttledUpdateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.throttledUpdateDimensions);
    }
    updateDimensions() {
        const { scrollLeft = 0, scrollTop = 0 } = this.state;
        const styles = utils_1.calculateDimensions(utils_1.getNode(this.state.getRootNode), this.state).styles;
        const { scrollContentWidth = 0, scrollContentHeight = 0, scrollContentContainerWidth = 0, scrollContentContainerHeight = 0, } = styles;
        let { scrollLeft: newScrollLeft = 0, scrollTop: newScrollTop = 0, } = utils_1.getScrollPosition(scrollLeft, scrollTop, {
            scrollWidth: scrollContentWidth,
            scrollHeight: scrollContentHeight,
            clientWidth: scrollContentContainerWidth,
            clientHeight: scrollContentContainerHeight,
        });
        this.setStoreState({
            styles: styles,
            scrollLeft: newScrollLeft,
            scrollTop: newScrollTop,
        });
    }
    render() {
        return (React.createElement(Provider, { value: Object.assign({}, this.state, {
                predefinedFormatter: Object.assign({}, formatter_1.default),
                setStoreState: this.setStoreState,
                dispatch: this.dispatch,
            }) }, this.props.children));
    }
}
exports.default = { Provider: StoreProvider, Consumer };
//# sourceMappingURL=StoreProvider.js.map