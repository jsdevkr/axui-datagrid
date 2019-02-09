"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const utils_1 = require("../utils");
const formatter_1 = require("../functions/formatter");
const collector_1 = require("../functions/collector");
const _enums_1 = require("../common/@enums");
const store = {
    // 데이터 그리드 내부에서 사용하는 상태의 기본형.
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
    selectionSRow: -1,
    selectionSCol: -1,
    selectionERow: -1,
    selectionECol: -1,
    columnResizing: false,
    columnResizerLeft: 0,
    loading: false,
    loadingData: false,
    width: 0,
    height: 0,
    data: [],
    filteredList: [],
    listSelectedAll: false,
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
    status: '',
    styles: undefined,
    predefinedFormatter: {},
    predefinedCollector: {},
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
            const { filteredList = [], scrollLeft = 0, scrollTop = 0, options = {}, styles = {}, headerColGroup = [], bodyRowData = { rows: [{ cols: [] }] }, footSumData = { rows: [{ cols: [] }] }, onScrollEnd, } = this.state;
            const { scrollLeft: _scrollLeft, scrollTop: _scrollTop, filteredList: _filteredList, } = newState;
            if (!newState.styles) {
                newState.styles = Object.assign({}, styles);
            }
            if (typeof _scrollLeft !== 'undefined' ||
                typeof _scrollTop !== 'undefined') {
                const { scrollContentWidth: scrollWidth = 0, scrollContentHeight: scrollHeight = 0, scrollContentContainerWidth: clientWidth = 0, scrollContentContainerHeight: clientHeight = 0, } = newState.styles;
                let endOfScrollTop = false;
                let endOfScrollLeft = false;
                if (typeof _scrollLeft !== 'undefined') {
                    if (scrollLeft !== _scrollLeft) {
                        const visibleData = utils_1.getVisibleColGroup(headerColGroup, {
                            scrollLeft: _scrollLeft,
                            bodyRowData: bodyRowData,
                            footSumData: footSumData,
                            styles: newState.styles,
                            options: options,
                        });
                        newState.visibleHeaderColGroup = visibleData.visibleHeaderColGroup;
                        newState.visibleBodyRowData = visibleData.visibleBodyRowData;
                        newState.visibleFootSumData = visibleData.visibleFootSumData;
                        newState.printStartColIndex = visibleData.printStartColIndex;
                        newState.printEndColIndex = visibleData.printEndColIndex;
                    }
                    if (_scrollLeft !== scrollLeft &&
                        clientWidth >= scrollWidth + _scrollLeft) {
                        endOfScrollLeft = true;
                    }
                }
                if (typeof _scrollTop !== 'undefined' && _scrollTop !== scrollTop) {
                    if (clientHeight >= scrollHeight + _scrollTop) {
                        endOfScrollTop = true;
                    }
                }
                if ((endOfScrollTop || endOfScrollLeft) && onScrollEnd) {
                    onScrollEnd({
                        endOfScrollTop,
                        endOfScrollLeft,
                    });
                }
            }
            if (_filteredList && filteredList.length !== _filteredList.length) {
                const dimensions = utils_1.calculateDimensions(newState, {
                    headerTable: newState.headerTable || this.state.headerTable,
                    colGroup: newState.colGroup || this.state.colGroup,
                    headerColGroup: newState.headerColGroup || this.state.headerColGroup,
                    bodyRowTable: newState.bodyRowTable || this.state.bodyRowTable,
                    footSumColumns: newState.footSumColumns || this.state.footSumColumns,
                    filteredList: _filteredList,
                    options: newState.options || this.state.options,
                });
                newState.styles = dimensions.styles;
                newState.scrollLeft = dimensions.scrollLeft;
                newState.scrollTop = dimensions.scrollTop;
            }
            this.setState(newState);
        };
        this.dispatch = (dispatchType, param) => {
            const { data = [], listSelectedAll = false, scrollLeft = 0, colGroup = [], rootNode, focusedRow = 0, sortInfo = {}, options = {}, rowSelector, selectionSRow, selectionSCol, selectionERow, selectionECol, selectionRows, selectionCols, selection, } = this.state;
            const onChangeSelected = rowSelector && rowSelector.onChange;
            const { columnKeys: optionColumnKeys = {} } = options;
            let { filteredList = [] } = this.state;
            const proc = {
                [_enums_1.DataGridEnums.DispatchTypes.FILTER]: () => {
                    const { colIndex, filterInfo } = param;
                    const checkAll = filterInfo[colIndex] === false
                        ? true
                        : filterInfo[colIndex]._check_all_;
                    if (checkAll) {
                        filteredList =
                            data &&
                                data.filter((n) => {
                                    return !n[optionColumnKeys.deleted || '_deleted_'];
                                });
                    }
                    else {
                        filteredList = data.filter((n) => {
                            if (n) {
                                const value = n[colGroup[colIndex].key || ''];
                                if (n[optionColumnKeys.deleted || '_deleted_']) {
                                    return false;
                                }
                                if (typeof value === 'undefined') {
                                    if (!filterInfo[colIndex]._UNDEFINED_) {
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
                        scrollTop: 0,
                    });
                    if (onChangeSelected) {
                        onChangeSelected({
                            filteredList,
                        });
                    }
                },
                [_enums_1.DataGridEnums.DispatchTypes.SORT]: () => {
                    const { colIndex } = param;
                    if (typeof colIndex !== 'undefined') {
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
                            sortInfo: Object.assign({}, currentSortInfo),
                            filteredList: sortedList,
                            isInlineEditing: false,
                            inlineEditingCell: {},
                        });
                        if (onChangeSelected) {
                            onChangeSelected({
                                filteredList: filteredList,
                            });
                        }
                    }
                },
                [_enums_1.DataGridEnums.DispatchTypes.UPDATE]: () => {
                    const { row, colIndex, value, eventWhichKey } = param;
                    const key = colGroup[colIndex].key;
                    let focusRow = focusedRow;
                    if (key) {
                        filteredList[row][key] = value;
                        // update filteredList
                    }
                    if (eventWhichKey) {
                        switch (eventWhichKey) {
                            case _enums_1.DataGridEnums.KeyCodes.UP_ARROW:
                                focusRow = focusedRow < 1 ? 0 : focusedRow - 1;
                                break;
                            case _enums_1.DataGridEnums.KeyCodes.DOWN_ARROW:
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
                        filteredList: [...filteredList],
                        isInlineEditing: false,
                        inlineEditingCell: {},
                        selectionRows: {
                            [focusRow]: true,
                        },
                        focusedRow: focusRow,
                    });
                    if (onChangeSelected) {
                        onChangeSelected({
                            filteredList: filteredList,
                        });
                    }
                    if (rootNode && rootNode.current) {
                        rootNode.current.focus();
                    }
                },
                [_enums_1.DataGridEnums.DispatchTypes.RESIZE_COL]: () => {
                    const { col, newWidth } = param;
                    const { styles = {}, options = {} } = this.state;
                    let _colGroup = [...(this.state.colGroup || [])];
                    _colGroup[col.colIndex]._width = _colGroup[col.colIndex].width = newWidth;
                    this.setStoreState({
                        colGroup: _colGroup,
                        columnResizing: false,
                    });
                },
                [_enums_1.DataGridEnums.DispatchTypes.SELECT]: () => {
                    const { rowIndex, checked } = param;
                    let rowSelected = false;
                    let selectedAll = listSelectedAll;
                    if (checked === true) {
                        rowSelected = true;
                    }
                    else if (checked === false) {
                        rowSelected = false;
                    }
                    else {
                        rowSelected = !filteredList[rowIndex]._selected_;
                    }
                    if (!rowSelected) {
                        selectedAll = false;
                    }
                    filteredList[rowIndex]._selected_ = rowSelected;
                    this.setStoreState({
                        listSelectedAll: selectedAll,
                        selectedRowIndex: rowIndex,
                        selectedRowIndexSelected: rowSelected,
                        filteredList: [...filteredList],
                    });
                    if (onChangeSelected) {
                        onChangeSelected({
                            filteredList: filteredList,
                        });
                    }
                },
                [_enums_1.DataGridEnums.DispatchTypes.SELECT_ALL]: () => {
                    const { checked } = param;
                    let selectedAll = listSelectedAll;
                    if (checked === true) {
                        selectedAll = true;
                    }
                    else if (checked === false) {
                        selectedAll = false;
                    }
                    else {
                        selectedAll = !selectedAll;
                    }
                    for (let i = 0, l = filteredList.length; i < l; i++) {
                        filteredList[i]._selected_ = selectedAll;
                    }
                    this.setStoreState({
                        listSelectedAll: selectedAll,
                        filteredList: [...filteredList],
                    });
                    if (onChangeSelected) {
                        onChangeSelected({
                            filteredList: filteredList,
                        });
                    }
                },
                [_enums_1.DataGridEnums.DispatchTypes.CHANGE_SELECTION]: () => {
                    const { sRow, sCol, eRow, eCol } = param;
                    if (selectionSRow !== sRow ||
                        selectionSCol !== sCol ||
                        selectionERow !== eRow ||
                        selectionECol !== eCol) {
                        // console.log(sRow, sCol, eRow, eCol);
                        if (selection &&
                            selection.onChange &&
                            selectionRows &&
                            selectionCols) {
                            selection.onChange({
                                rows: Object.keys(selectionRows).map(n => Number(n)),
                                cols: Object.keys(selectionCols).map(n => Number(n)),
                            });
                        }
                        this.setStoreState({
                            selectionSRow: sRow,
                            selectionSCol: sCol,
                            selectionERow: eRow,
                            selectionECol: eCol,
                        });
                    }
                },
            };
            proc[dispatchType]();
        };
    }
    static getDerivedStateFromProps(nProps, nState) {
        // console.log('getDerivedStateFromProps ~~');
        if (nProps.loading === nState.loading &&
            nProps.loadingData === nState.loadingData &&
            nProps.data === nState.data &&
            nProps.selection === nState.selection &&
            nProps.rowSelector === nState.rowSelector &&
            nProps.width === nState.width &&
            nProps.height === nState.height &&
            nProps.scrollLeft === nState.scrollLeft &&
            nProps.scrollTop === nState.scrollTop &&
            nProps.columnHeight === nState.columnHeight &&
            nProps.options === nState.options &&
            nProps.status === nState.status &&
            //
            nProps.headerColGroup === nState.headerColGroup &&
            nProps.headerTable === nState.headerTable &&
            nProps.headerData === nState.headerData &&
            nProps.asideHeaderData === nState.asideHeaderData &&
            nProps.leftHeaderData === nState.leftHeaderData &&
            //
            nProps.bodyRowTable === nState.bodyRowTable &&
            nProps.bodyRowData === nState.bodyRowData &&
            nProps.bodyRowMap === nState.bodyRowMap &&
            //
            nProps.asideBodyRowData === nState.asideBodyRowData &&
            nProps.leftBodyRowData === nState.leftBodyRowData &&
            //
            nProps.colGroup === nState.colGroup &&
            nProps.colGroupMap === nState.colGroupMap &&
            nProps.asideColGroup === nState.asideColGroup &&
            nProps.leftHeaderColGroup === nState.leftHeaderColGroup &&
            //
            nProps.rootNode === nState.rootNode &&
            nProps.clipBoardNode === nState.clipBoardNode &&
            //
            nProps.rootObject === nState.rootObject &&
            nProps.onBeforeEvent === nState.onBeforeEvent &&
            nProps.onAfterEvent === nState.onAfterEvent &&
            nProps.onScrollEnd === nState.onScrollEnd &&
            nProps.onRightClick === nState.onRightClick) {
            return null;
        }
        else {
            // console.log(`run StoreProvider`);
            // store state | 현재 state복제
            const { options = {} } = nProps;
            const { frozenColumnIndex = 0, body: optionsBody } = options; // 옵션은 외부에서 받은 값을 사용하고 state에서 값을 수정하면 안됨.
            const storeState = Object.assign({}, nState);
            storeState.loading = nProps.loading;
            storeState.loadingData = nProps.loadingData;
            storeState.data = nProps.data;
            storeState.width = nProps.width;
            storeState.height = nProps.height;
            storeState.selection = nProps.selection;
            storeState.rowSelector = nProps.rowSelector;
            storeState.options = nProps.options;
            storeState.status = nProps.status;
            storeState.rootNode = nProps.rootNode;
            storeState.clipBoardNode = nProps.clipBoardNode;
            storeState.rootObject = nProps.rootObject;
            storeState.onBeforeEvent = nProps.onBeforeEvent;
            storeState.onAfterEvent = nProps.onAfterEvent;
            storeState.onScrollEnd = nProps.onScrollEnd;
            storeState.onRightClick = nProps.onRightClick;
            ///
            storeState.headerTable = nProps.headerTable;
            storeState.bodyRowTable = nProps.bodyRowTable;
            storeState.bodyRowMap = nProps.bodyRowMap;
            storeState.asideHeaderData = nProps.asideHeaderData;
            storeState.leftHeaderData = nProps.leftHeaderData;
            storeState.headerData = nProps.headerData;
            storeState.asideBodyRowData = nProps.asideBodyRowData;
            storeState.leftBodyRowData = nProps.leftBodyRowData;
            storeState.bodyRowData = nProps.bodyRowData;
            storeState.colGroupMap = nProps.colGroupMap;
            storeState.asideColGroup = nProps.asideColGroup;
            storeState.colGroup = nProps.colGroup;
            storeState.footSumColumns = nProps.footSumColumns;
            storeState.footSumTable = nProps.footSumTable;
            storeState.leftFootSumData = nProps.leftFootSumData;
            storeState.footSumData = nProps.footSumData;
            // nProps의 scrollLeft, scrollTop 변경 되는 경우 나중에 고려
            const { frozenColumnIndex: PfrozenColumnIndex = 0 } = storeState.options || {};
            const changed = {
                colGroup: false,
                frozenColumnIndex: false,
                filteredList: false,
                styles: false,
                visibleColGroup: false,
            };
            // 다른 조건식 안에서 변경하여 처리할 수 있는 변수들 언더바(_)로 시작함.
            let { colGroup: _colGroup = [], leftHeaderColGroup: _leftHeaderColGroup, headerColGroup: _headerColGroup, filteredList: _filteredList, styles: _styles, scrollLeft: _scrollLeft = 0, scrollTop: _scrollTop = 0, } = storeState;
            // colGroup들의 너비합을 모르거나 변경된 경우.
            // colGroup > width 연산
            if (nProps.colGroup !== nState.colGroup ||
                nProps.options !== nState.options) {
                _colGroup = utils_1.setColGroupWidth(nProps.colGroup || [], { width: nProps.width || 0 }, nProps.options);
                changed.colGroup = true;
            }
            if (changed.colGroup || frozenColumnIndex !== PfrozenColumnIndex) {
                _leftHeaderColGroup = _colGroup.slice(0, frozenColumnIndex);
                _headerColGroup = _colGroup.slice(frozenColumnIndex);
                changed.frozenColumnIndex = true;
            }
            // 데이터가 변경됨.
            if (nProps.data !== nState.data) {
                // 전달받은 data를 filteredList로 치환.
                _filteredList = utils_1.getFilteredList(nProps.data || [], {
                    colGroup: _colGroup,
                    sorter: nState.sortInfo,
                    options: nProps.options,
                });
                changed.filteredList = true;
            }
            if (changed.colGroup ||
                changed.frozenColumnIndex ||
                changed.filteredList ||
                !storeState.styles ||
                nProps.width !== nState.width ||
                nProps.height !== nState.height) {
                // 스타일 초기화 안되어 있음.
                const dimensions = utils_1.calculateDimensions(storeState, {
                    headerTable: nProps.headerTable,
                    colGroup: _colGroup,
                    headerColGroup: _headerColGroup,
                    bodyRowTable: nProps.bodyRowTable,
                    footSumColumns: nProps.footSumColumns,
                    filteredList: _filteredList,
                    options: nProps.options,
                });
                _styles = dimensions.styles;
                _scrollLeft = dimensions.scrollLeft;
                _scrollTop = dimensions.scrollTop;
                changed.styles = true;
            }
            // 스타일 정의가 되어 있지 않은 경우 : 그리드가 한번도 그려진 적이 없는 상태.
            if (changed.colGroup ||
                changed.frozenColumnIndex ||
                !storeState.styles ||
                nProps.width !== nState.width) {
                const visibleData = utils_1.getVisibleColGroup(_headerColGroup, {
                    scrollLeft: _scrollLeft,
                    bodyRowData: storeState.bodyRowData,
                    footSumData: storeState.footSumData,
                    styles: _styles,
                    options: storeState.options,
                });
                storeState.visibleHeaderColGroup = visibleData.visibleHeaderColGroup;
                storeState.visibleBodyRowData = visibleData.visibleBodyRowData;
                storeState.visibleFootSumData = visibleData.visibleFootSumData;
                storeState.printStartColIndex = visibleData.printStartColIndex;
                storeState.printEndColIndex = visibleData.printEndColIndex;
                changed.colGroup = true;
            }
            // 언더바로 시작하는 변수를 상태에 전달하기 위해 주입.
            storeState.colGroup = _colGroup;
            storeState.leftHeaderColGroup = _leftHeaderColGroup;
            storeState.headerColGroup = _headerColGroup;
            storeState.filteredList = _filteredList;
            storeState.styles = _styles;
            storeState.scrollLeft = _scrollLeft;
            storeState.scrollTop = _scrollTop;
            return storeState;
        }
    }
    render() {
        return (React.createElement(Provider, { value: Object.assign({}, this.state, {
                predefinedFormatter: Object.assign({}, formatter_1.default),
                predefinedCollector: Object.assign({}, collector_1.default),
                setStoreState: this.setStoreState,
                dispatch: this.dispatch,
            }) }, this.props.children));
    }
    componentDidMount() {
        // console.log('store did mount');
    }
    componentDidUpdate(pProps, pState) {
        // console.log('store did update');
    }
    componentWillUnmount() {
        // console.log('store unMount');
    }
}
exports.default = { Provider: StoreProvider, Consumer };
