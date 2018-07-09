"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const stores_1 = require("../stores");
const containers_1 = require("../containers");
const utils_1 = require("../utils");
const formatter_1 = require("../functions/formatter");
const store = {
    mounted: false,
    dragging: false,
    data: [],
    filteredList: [],
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
    static getDerivedStateFromProps(props, prevState) {
        // 만일 속성별 컨트롤을 하겠다면 여기에서.
        if (props.mounted === prevState.mounted &&
            props.setRootState === prevState.setRootState &&
            props.getRootState === prevState.getRootState &&
            props.getRootNode === prevState.getRootNode &&
            props.rootObject === prevState.rootObject &&
            props.data === prevState.data &&
            props.height === prevState.height &&
            props.columns === prevState.propColumns &&
            props.options === prevState.propOptions &&
            props.onBeforeEvent === prevState.onBeforeEvent &&
            props.onAfterEvent === prevState.onAfterEvent &&
            prevState.calculatedStyles === true) {
            return null;
        }
        // 불필요한 렌더를 막으려면 렌더링이 필요한 상활을 잘 파악 해서 처리 헤야합니다.
        // console.log('run getDerivedStateFromProps');
        const { options = containers_1.DataGrid.defaultOptions, styles = containers_1.DataGrid.defaultStyles, } = prevState;
        const { columnKeys: optionColumnKeys = {} } = options;
        let changeState = false;
        let newState = Object.assign({}, prevState);
        let currentOptions = Object.assign({}, options);
        let currentStyles = Object.assign({}, styles);
        newState.mounted = true;
        if (props.setRootState && props.setRootState !== prevState.setRootState) {
            newState.setRootState = props.setRootState;
        }
        if (props.getRootState && props.getRootState !== prevState.getRootState) {
            newState.getRootState = props.getRootState;
        }
        if (props.getRootNode && props.getRootNode !== prevState.getRootNode) {
            newState.getRootNode = props.getRootNode;
        }
        if (props.data !== prevState.data) {
            changeState = true;
            newState.data = props.data || [];
            newState.filteredList =
                newState.data &&
                    newState.data.filter((n) => {
                        return !n[optionColumnKeys.deleted || '__deleted__'];
                    });
        }
        if (props.height !== prevState.height) {
            changeState = true;
            newState.height = props.height;
        }
        if (props.options !== prevState.propOptions) {
            changeState = true;
            newState.propOptions = props.options;
            newState.options = currentOptions = utils_1.mergeAll(true, Object.assign({}, containers_1.DataGrid.defaultOptions), props.options);
        }
        if (props.rootObject !== prevState.rootObject) {
            changeState = true;
            newState.rootObject = props.rootObject;
        }
        if (props.columns !== prevState.propColumns ||
            props.options !== prevState.propOptions) {
            changeState = true;
            const { frozenColumnIndex = containers_1.DataGrid.defaultOptions.frozenColumnIndex, body: optionsBody = containers_1.DataGrid.defaultBody, } = currentOptions;
            const { columnHeight = 0 } = optionsBody;
            let headerDividedObj, bodyDividedObj;
            // convert colGroup
            newState.headerTable = utils_1.makeHeaderTable(props.columns, currentOptions);
            newState.bodyRowTable = utils_1.makeBodyRowTable(props.columns, currentOptions);
            newState.bodyRowMap = utils_1.makeBodyRowMap(newState.bodyRowTable, currentOptions);
            // header를 위한 divide
            headerDividedObj = utils_1.divideTableByFrozenColumnIndex(newState.headerTable, frozenColumnIndex || 0, currentOptions);
            // body를 위한 divide
            bodyDividedObj = utils_1.divideTableByFrozenColumnIndex(newState.bodyRowTable, frozenColumnIndex || 0, currentOptions);
            newState.asideHeaderData = headerDividedObj.asideData;
            newState.leftHeaderData = headerDividedObj.leftData;
            newState.headerData = headerDividedObj.rightData;
            newState.asideColGroup = headerDividedObj.asideColGroup;
            newState.asideBodyRowData = bodyDividedObj.asideData;
            newState.leftBodyRowData = bodyDividedObj.leftData;
            newState.bodyRowData = bodyDividedObj.rightData;
            // colGroupMap, colGroup을 만들고 틀고정 값을 기준으로 나누어 left와 나머지에 저장
            newState.colGroup = [];
            newState.colGroupMap = {};
            newState.headerTable.rows.forEach((row, ridx) => {
                row.cols.forEach((col, cidx) => {
                    if (newState.colGroupMap && newState.colGroup) {
                        const currentCol = {
                            key: col.key,
                            label: col.label,
                            width: col.width,
                            align: col.align,
                            colSpan: col.colSpan,
                            rowSpan: col.rowSpan,
                            colIndex: col.colIndex,
                            rowIndex: col.rowIndex,
                            formatter: col.formatter,
                            editor: col.editor,
                        };
                        newState.colGroupMap[col.colIndex || 0] = currentCol;
                        // todo : colGroupMap에 colGroup의 참조가 있는데. 문제가 없는지 확인 필요.
                        newState.colGroup.push(currentCol);
                    }
                });
            });
            newState.leftHeaderColGroup = newState.colGroup.slice(0, frozenColumnIndex);
            newState.headerColGroup = newState.colGroup.slice(frozenColumnIndex);
            // grouping과 footsum 나중에 구현.
            /*
            newState.bodyGrouping = [];
            newState.bodyGroupingTable = {};
            newState.asideBodyGroupingData = {};
            newState.leftBodyGroupingData = {};
            newState.bodyGroupingData = {};
            newState.bodyGroupingMap = {};
      
            newState.footSumColumns = [];
            newState.footSumTable = {};
            newState.leftFootSumData = {};
            newState.footSumData = {};
            */
            // styles
            currentStyles.asidePanelWidth = headerDividedObj.asidePanelWidth;
            currentStyles.bodyTrHeight =
                newState.bodyRowTable.rows.length * columnHeight;
            newState.propColumns = props.columns;
            newState.styles = currentStyles;
            newState.calculatedStyles = false;
        }
        if (props.mounted && !newState.calculatedStyles) {
            changeState = true;
            newState.calculatedStyles = true;
            const calculatedObject = utils_1.calculateDimensions(utils_1.getNode(newState.getRootNode), newState);
            newState.styles = calculatedObject.styles;
            newState.colGroup = calculatedObject.colGroup;
            newState.leftHeaderColGroup = calculatedObject.leftHeaderColGroup;
            newState.headerColGroup = calculatedObject.headerColGroup;
            const { CTInnerWidth: _CTInnerWidth = 0, frozenPanelWidth: _frozenPanelWidth = 0, asidePanelWidth: _asidePanelWidth = 0, rightPanelWidth: _rightPanelWidth = 0, } = newState.styles;
            const { printStartColIndex, printEndColIndex } = utils_1.getPositionPrintColGroup(newState.headerColGroup, Math.abs(newState.scrollLeft || 0) + _frozenPanelWidth, Math.abs(newState.scrollLeft || 0) +
                _frozenPanelWidth +
                (_CTInnerWidth -
                    _asidePanelWidth -
                    _frozenPanelWidth -
                    _rightPanelWidth));
            const { frozenColumnIndex = 0 } = newState.options || {};
            newState.printStartColIndex = printStartColIndex;
            newState.printEndColIndex = printEndColIndex;
            newState.visibleHeaderColGroup = newState.headerColGroup.slice(printStartColIndex, printEndColIndex + 1);
            newState.visibleBodyRowData = utils_1.getTableByStartEndColumnIndex(newState.bodyRowData || { rows: [{ cols: [] }] }, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
            newState.visibleBodyGroupingData = utils_1.getTableByStartEndColumnIndex(newState.bodyGroupingData || { rows: [{ cols: [] }] }, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
        }
        return changeState ? newState : null;
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
            styles,
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