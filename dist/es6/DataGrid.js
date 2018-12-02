"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const providers_1 = require("./providers");
const components_1 = require("./components");
const utils_1 = require("./utils");
class DataGrid extends React.Component {
    constructor() {
        super(...arguments);
        this.rootObject = {};
        this.rootNode = React.createRef();
        this.clipBoardNode = React.createRef();
        this.state = {
            mounted: false,
            calculatedHeight: undefined,
        };
        /**
         * You must execute setRootState only once in the child component.
         * otherwise you will fall into a trap.
         * @param {DataGridRootState} state
         */
        this.setRootState = (state) => {
            this.setState(state);
        };
        this.getRootState = () => {
            return this.state;
        };
        this.getOptions = (options) => {
            return utils_1.mergeAll(true, Object.assign({}, DataGrid.defaultOptions), options);
        };
        this.getProviderProps = (prevState) => {
            const { columns = [], footSum } = this.props;
            const { options = {} } = prevState;
            const { frozenColumnIndex = DataGrid.defaultOptions.frozenColumnIndex || 0, body: optionsBody = DataGrid.defaultBody, } = options;
            const { columnHeight = 0 } = optionsBody;
            // StoreProvider에 전달해야 하는 상태를 newState에 담는 작업을 시작합니다.
            let newState = Object.assign({}, prevState);
            let newStyle = {};
            // options.showRowSelector 체크
            if (newState.rowSelector) {
                if (typeof newState.rowSelector.show === 'undefined') {
                    newState.rowSelector.show = true;
                }
                if (newState.options && newState.rowSelector.show) {
                    newState.options.showRowSelector = true;
                }
            }
            // convert colGroup
            newState.headerTable = utils_1.makeHeaderTable(columns, options);
            newState.bodyRowTable = utils_1.makeBodyRowTable(columns, options);
            newState.bodyRowMap = utils_1.makeBodyRowMap(newState.bodyRowTable || { rows: [] }, options);
            // header를 위한 divide
            const headerDividedObj = utils_1.divideTableByFrozenColumnIndex(newState.headerTable || { rows: [] }, frozenColumnIndex, options);
            // body를 위한 divide
            const bodyDividedObj = utils_1.divideTableByFrozenColumnIndex(newState.bodyRowTable || { rows: [] }, frozenColumnIndex, options);
            newState.asideHeaderData = headerDividedObj.asideData;
            newState.leftHeaderData = headerDividedObj.leftData;
            newState.headerData = headerDividedObj.rightData;
            newState.asideColGroup = headerDividedObj.asideColGroup;
            newState.asideBodyRowData = bodyDividedObj.asideData;
            newState.leftBodyRowData = bodyDividedObj.leftData;
            newState.bodyRowData = bodyDividedObj.rightData;
            // colGroupMap, colGroup을 만들고 틀고정 값을 기준으로 나누어 left와 나머지에 저장
            newState.colGroupMap = {};
            if (newState.headerTable) {
                newState.headerTable.rows.forEach((row, ridx) => {
                    row.cols.forEach((col, cidx) => {
                        if (newState.colGroupMap) {
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
                        }
                    });
                });
            }
            newState.colGroup = Object.values(newState.colGroupMap);
            newState.leftHeaderColGroup = newState.colGroup.slice(0, frozenColumnIndex);
            newState.headerColGroup = newState.colGroup.slice(frozenColumnIndex);
            // colGroup이 정의되면 footSum
            if (footSum) {
                newState.footSumColumns = [...footSum];
                newState.footSumTable = utils_1.makeFootSumTable(footSum, newState.colGroup, options);
                const footSumDividedObj = utils_1.divideTableByFrozenColumnIndex(newState.footSumTable || { rows: [] }, frozenColumnIndex, options);
                newState.leftFootSumData = footSumDividedObj.leftData;
                newState.footSumData = footSumDividedObj.rightData;
            }
            // styles
            newStyle.asidePanelWidth = headerDividedObj.asidePanelWidth;
            newStyle.bodyTrHeight = newState.bodyRowTable
                ? newState.bodyRowTable.rows.length * columnHeight
                : 20;
            newState.styles = newStyle;
            // 초기 스타일 생성.
            const calculatedObject = utils_1.calculateDimensions(newState.rootNode && newState.rootNode.current, newState);
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
            newState.printStartColIndex = printStartColIndex;
            newState.printEndColIndex = printEndColIndex;
            newState.visibleHeaderColGroup = newState.headerColGroup.slice(printStartColIndex, printEndColIndex + 1);
            newState.visibleBodyRowData = utils_1.getTableByStartEndColumnIndex(newState.bodyRowData || { rows: [{ cols: [] }] }, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
            newState.visibleBodyGroupingData = utils_1.getTableByStartEndColumnIndex(newState.bodyGroupingData || { rows: [{ cols: [] }] }, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
            if (footSum) {
                newState.visibleFootSumData = utils_1.getTableByStartEndColumnIndex(newState.footSumData || { rows: [{ cols: [] }] }, printStartColIndex + frozenColumnIndex, printEndColIndex + frozenColumnIndex);
            }
            return newState;
        };
    }
    render() {
        const { mounted } = this.state;
        const { data = [], options = {}, style = {}, onBeforeEvent, onAfterEvent, onScrollEnd, onRightClick, height = DataGrid.defaultHeight, loading = false, loadingData = false, selection, rowSelector, } = this.props;
        let providerProps = {};
        let gridRootStyle = utils_1.mergeAll({
            height: this.state.calculatedHeight || height,
        }, style);
        if (mounted) {
            providerProps = this.getProviderProps({
                mounted,
                loading,
                loadingData,
                setRootState: this.setRootState,
                getRootState: this.getRootState,
                rootNode: this.rootNode,
                clipBoardNode: this.clipBoardNode,
                rootObject: this.rootObject,
                data,
                height,
                onBeforeEvent,
                onAfterEvent,
                onScrollEnd,
                onRightClick,
                selection,
                rowSelector,
                options: this.getOptions(options),
            });
        }
        return (React.createElement(providers_1.DataGridStore.Provider, Object.assign({}, providerProps),
            React.createElement("div", { tabIndex: -1, ref: this.rootNode, className: "axui-datagrid", style: gridRootStyle },
                React.createElement("div", { className: "axui-datagrid-clip-board" },
                    React.createElement("textarea", { ref: this.clipBoardNode })),
                mounted ? (React.createElement(components_1.DataGridEvents, null,
                    React.createElement(components_1.DataGridHeader, null),
                    React.createElement(components_1.DataGridBody, null),
                    React.createElement(components_1.DataGridPage, null),
                    React.createElement(components_1.DataGridScroll, null),
                    React.createElement(components_1.DataGridColumnFilter, null),
                    React.createElement(components_1.DataGridLoader, { loading: loading }))) : null)));
    }
    componentDidMount() {
        this.setState({
            mounted: true,
        });
    }
}
DataGrid.defaultHeight = 400;
DataGrid.defaultColumnKeys = {
    selected: '_selected_',
    modified: '_modified_',
    deleted: '_deleted_',
    disableSelection: '_disable_selection_',
};
DataGrid.defaultHeader = {
    display: true,
    align: 'left',
    columnHeight: 24,
    columnPadding: 3,
    columnBorderWidth: 1,
    selector: true,
    sortable: true,
    enableFilter: true,
    clickAction: 'sort',
    filterIconClassName: 'datagridIcon-filter',
};
DataGrid.defaultBody = {
    align: 'left',
    columnHeight: 24,
    columnPadding: 3,
    columnBorderWidth: 1,
    grouping: false,
    mergeCells: false,
};
DataGrid.defaultPageButtons = [
    { className: 'datagridIcon-first', onClick: 'PAGE_FIRST' },
    { className: 'datagridIcon-prev', onClick: 'PAGE_PREV' },
    { className: 'datagridIcon-back', onClick: 'PAGE_BACK' },
    { className: 'datagridIcon-play', onClick: 'PAGE_PLAY' },
    { className: 'datagridIcon-next', onClick: 'PAGE_NEXT' },
    { className: 'datagridIcon-last', onClick: 'PAGE_LAST' },
];
DataGrid.defaultPage = {
    buttonsContainerWidth: 150,
    buttons: DataGrid.defaultPageButtons,
    buttonHeight: 16,
    height: 20,
};
DataGrid.defaultScroller = {
    size: 14,
    arrowSize: 14,
    barMinSize: 12,
    padding: 3,
    disabledVerticalScroll: false,
};
DataGrid.defaultOptions = {
    frozenColumnIndex: 0,
    frozenRowIndex: 0,
    showLineNumber: true,
    multipleSelect: true,
    columnMinWidth: 100,
    lineNumberColumnWidth: 60,
    rowSelectorColumnWidth: 28,
    remoteSort: false,
    asidePanelWidth: 0,
    header: DataGrid.defaultHeader,
    body: DataGrid.defaultBody,
    page: DataGrid.defaultPage,
    scroller: DataGrid.defaultScroller,
    columnKeys: DataGrid.defaultColumnKeys,
    bodyLoaderHeight: 100,
};
DataGrid.defaultStyles = {
    calculatedHeight: null,
    asidePanelWidth: 0,
    frozenPanelWidth: 0,
    bodyTrHeight: 0,
    elWidth: 0,
    elHeight: 0,
    CTInnerWidth: 0,
    CTInnerHeight: 0,
    rightPanelWidth: 0,
    headerHeight: 0,
    bodyHeight: 0,
    frozenPanelHeight: 0,
    footSumHeight: 0,
    pageHeight: 0,
    verticalScrollerWidth: 0,
    horizontalScrollerHeight: 0,
    scrollContentContainerHeight: 0,
    scrollContentHeight: 0,
    scrollContentContainerWidth: 0,
    scrollContentWidth: 0,
    verticalScrollerHeight: 0,
    verticalScrollBarHeight: 0,
    horizontalScrollerWidth: 0,
    horizontalScrollBarWidth: 0,
    scrollerPadding: 0,
    scrollerArrowSize: 0,
    pageButtonsContainerWidth: 0,
};
DataGrid.defaultThrottleWait = 100;
exports.default = DataGrid;
