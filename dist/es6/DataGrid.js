"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const providers_1 = require("./providers");
const components_1 = require("./components");
const utils_1 = require("./utils");
const DataGridAutofitHelper_1 = require("./components/DataGridAutofitHelper");
class DataGrid extends React.Component {
    constructor(props) {
        super(props);
        this.rootObject = {};
        this.scrollLeft = 0;
        this.scrollTop = 0;
        this.state = {
            mounted: false,
            autofit: false,
            doneAutofit: false,
            autofitAsideWidth: 100,
            autofitColGroup: [],
        };
        this.getOptions = (options) => {
            return utils_1.mergeAll(true, Object.assign({}, DataGrid.defaultOptions), options);
        };
        this.getProviderProps = (storeProps) => {
            const { autofit, doneAutofit, autofitAsideWidth, autofitColGroup, } = this.state;
            const { columns = [], footSum } = this.props;
            const { options = {} } = storeProps;
            const { frozenColumnIndex = DataGrid.defaultOptions.frozenColumnIndex || 0, body: optionsBody = DataGrid.defaultBody, } = options;
            const { columnHeight = 0 } = optionsBody;
            if (autofit && doneAutofit) {
                options.lineNumberColumnWidth = autofitAsideWidth;
            }
            // StoreProvider에 전달해야 하는 상태를 newState에 담는 작업을 시작합니다.
            let newStoreProps = Object.assign({}, storeProps);
            // options.showRowSelector 체크
            if (newStoreProps.rowSelector) {
                if (typeof newStoreProps.rowSelector.show === 'undefined') {
                    newStoreProps.rowSelector.show = true;
                }
                if (newStoreProps.options && newStoreProps.rowSelector.show) {
                    newStoreProps.options.showRowSelector = true;
                }
            }
            if (doneAutofit) {
                newStoreProps.autofitColGroup = autofitColGroup;
            }
            // convert colGroup
            newStoreProps.headerTable = utils_1.makeHeaderTable(columns, options);
            newStoreProps.bodyRowTable = utils_1.makeBodyRowTable(columns, options);
            newStoreProps.bodyRowMap = utils_1.makeBodyRowMap(newStoreProps.bodyRowTable || { rows: [] }, options);
            // header를 위한 divide
            const headerDividedObj = utils_1.divideTableByFrozenColumnIndex(newStoreProps.headerTable || { rows: [] }, frozenColumnIndex, options);
            // body를 위한 divide
            const bodyDividedObj = utils_1.divideTableByFrozenColumnIndex(newStoreProps.bodyRowTable || { rows: [] }, frozenColumnIndex, options);
            newStoreProps.asideHeaderData = headerDividedObj.asideData;
            newStoreProps.leftHeaderData = headerDividedObj.leftData;
            newStoreProps.headerData = headerDividedObj.rightData;
            newStoreProps.asideBodyRowData = bodyDividedObj.asideData;
            newStoreProps.leftBodyRowData = bodyDividedObj.leftData;
            newStoreProps.bodyRowData = bodyDividedObj.rightData;
            // colGroupMap, colGroup을 만들고 틀고정 값을 기준으로 나누어 left와 나머지에 저장
            newStoreProps.colGroupMap = {};
            if (newStoreProps.headerTable) {
                newStoreProps.headerTable.rows.forEach((row, ridx) => {
                    row.cols.forEach((col, cidx) => {
                        if (newStoreProps.colGroupMap) {
                            let colWidth = col.width; // columns로부터 전달받은 너비값.
                            if (autofit && doneAutofit) {
                                if (utils_1.isNumber(col.colIndex) &&
                                    autofitColGroup[Number(col.colIndex)]) {
                                    colWidth = autofitColGroup[Number(col.colIndex)].width;
                                }
                            }
                            const currentCol = {
                                key: col.key,
                                label: col.label,
                                width: colWidth,
                                align: col.align,
                                colSpan: col.colSpan,
                                rowSpan: col.rowSpan,
                                colIndex: col.colIndex,
                                rowIndex: col.rowIndex,
                                formatter: col.formatter,
                                editor: col.editor,
                            };
                            newStoreProps.colGroupMap[col.colIndex || 0] = currentCol;
                        }
                    });
                });
            }
            newStoreProps.asideColGroup = headerDividedObj.asideColGroup;
            newStoreProps.colGroup = Object.values(newStoreProps.colGroupMap);
            // console.log(autofitColGroup, newStoreProps.colGroup);
            // colGroup이 정의되면 footSum
            if (footSum) {
                newStoreProps.footSumColumns = [...footSum];
                newStoreProps.footSumTable = utils_1.makeFootSumTable(footSum, newStoreProps.colGroup, options);
                const footSumDividedObj = utils_1.divideTableByFrozenColumnIndex(newStoreProps.footSumTable || { rows: [] }, frozenColumnIndex, options);
                newStoreProps.leftFootSumData = footSumDividedObj.leftData;
                newStoreProps.footSumData = footSumDividedObj.rightData;
            }
            // provider props에서 styles 속성 제외 styles는 내부 state에 의해 관리 되도록 변경
            return newStoreProps;
        };
        this.applyAutofit = (params) => {
            const autofit = !!(this.props.options && this.props.options.autofitColumns);
            this.setState({
                autofit,
                doneAutofit: true,
                autofitAsideWidth: params.asideWidth,
                autofitColGroup: params.colGroup,
            });
            // render가 다시되고 > getProviderProps이 다시 실행됨 (getProviderProps에서 doneAutofit인지 판단하여 autofitColGroup의 width값을 colGroup에 넣어주면 됨.)
        };
        this.rootNode = React.createRef();
        this.clipBoardNode = React.createRef();
    }
    render() {
        const { mounted, doneAutofit } = this.state;
        const { data = [], status, options = {}, style = {}, onBeforeEvent, onAfterEvent, onScrollEnd, onRightClick, height = DataGrid.defaultHeight, width, loading = false, loadingData = false, selection, rowSelector, scrollLeft, scrollTop, } = this.props;
        let gridRootStyle = Object.assign({
            height: height,
            width: width,
        }, style);
        return (React.createElement(providers_1.DataGridStore.Provider, Object.assign({}, this.getProviderProps({
            loading,
            loadingData,
            data,
            width,
            height,
            selection,
            rowSelector,
            status,
            options: this.getOptions(options),
            scrollLeft,
            scrollTop,
            rootNode: this.rootNode,
            clipBoardNode: this.clipBoardNode,
            rootObject: this.rootObject,
            onBeforeEvent,
            onAfterEvent,
            onScrollEnd,
            onRightClick,
        })),
            React.createElement("div", { tabIndex: -1, ref: this.rootNode, className: "axui-datagrid", style: gridRootStyle },
                React.createElement("div", { className: "axui-datagrid-clip-board" },
                    React.createElement("textarea", { ref: this.clipBoardNode })),
                mounted && (React.createElement(components_1.DataGridEvents, null,
                    React.createElement(components_1.DataGridHeader, null),
                    React.createElement(components_1.DataGridBody, null),
                    React.createElement(components_1.DataGridPage, null),
                    React.createElement(components_1.DataGridScroll, null),
                    React.createElement(components_1.DataGridLoader, { loading: loading }))),
                !doneAutofit && (React.createElement(DataGridAutofitHelper_1.default, { applyAutofit: this.applyAutofit })))));
    }
    componentDidMount() {
        this.setState({
            mounted: true,
        });
    }
    componentDidUpdate(prevProps) {
        const autofitColumns = prevProps.options && prevProps.options.autofitColumns;
        const _autofitColumns = this.props.options && this.props.options.autofitColumns;
        const columnChanged = prevProps.columns !== this.props.columns;
        if (autofitColumns !== _autofitColumns || columnChanged) {
            this.setState({ doneAutofit: false });
        }
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
    clickAction: 'sort',
};
DataGrid.defaultBody = {
    align: 'left',
    columnHeight: 24,
    columnPadding: 3,
    columnBorderWidth: 1,
    grouping: false,
    mergeCells: false,
};
// static defaultPageButtons: IDataGrid.IOptionPageButton[] = [
//   { className: 'datagridIcon-first', onClick: 'PAGE_FIRST' },
//   { className: 'datagridIcon-prev', onClick: 'PAGE_PREV' },
//   { className: 'datagridIcon-back', onClick: 'PAGE_BACK' },
//   { className: 'datagridIcon-play', onClick: 'PAGE_PLAY' },
//   { className: 'datagridIcon-next', onClick: 'PAGE_NEXT' },
//   { className: 'datagridIcon-last', onClick: 'PAGE_LAST' },
// ];
DataGrid.defaultPage = {
    height: 20,
};
DataGrid.defaultScroller = {
    theme: 'default',
    width: 14,
    height: 14,
    arrowSize: 14,
    barMinSize: 12,
    padding: 3,
    horizontalScrollerWidth: 30,
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
    header: DataGrid.defaultHeader,
    body: DataGrid.defaultBody,
    page: DataGrid.defaultPage,
    scroller: DataGrid.defaultScroller,
    columnKeys: DataGrid.defaultColumnKeys,
    bodyLoaderHeight: 100,
    autofitColumns: false,
    autofitColumnWidthMin: 50,
    autofitColumnWidthMax: 300,
};
DataGrid.defaultStyles = {
    asidePanelWidth: 0,
    frozenPanelWidth: 0,
    bodyTrHeight: 0,
    elWidth: 0,
    elHeight: 0,
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
};
DataGrid.defaultThrottleWait = 100;
exports.default = DataGrid;
