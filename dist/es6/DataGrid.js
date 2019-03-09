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
        this.state = {
            mounted: false,
            autofit: false,
            doneAutofit: false,
            autofitAsideWidth: 100,
            autofitColGroup: [],
            headerTable: { rows: [] },
            bodyRowTable: { rows: [] },
            bodyRowMap: {},
            asideHeaderData: { rows: [] },
            leftHeaderData: { rows: [] },
            headerData: { rows: [] },
            asideBodyRowData: { rows: [] },
            leftBodyRowData: { rows: [] },
            bodyRowData: { rows: [] },
            colGroupMap: {},
            asideColGroup: [],
            colGroup: [],
            footSumColumns: [],
            footSumTable: { rows: [] },
            leftFootSumData: { rows: [] },
            footSumData: { rows: [] },
        };
        this.getOptions = (options) => {
            // todo
            // options.lineNumberColumnWidth = autofitAsideWidth;
            return Object.assign({}, DataGrid.defaultOptions, options, { header: Object.assign({}, DataGrid.defaultOptions.header, options.header), body: Object.assign({}, DataGrid.defaultOptions.body, options.body), page: Object.assign({}, DataGrid.defaultOptions.page, options.page), scroller: Object.assign({}, DataGrid.defaultOptions.scroller, options.scroller), columnKeys: Object.assign({}, DataGrid.defaultOptions.columnKeys, options.columnKeys) });
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
        this.getColumnData = (columns, footSum, options) => {
            const { frozenColumnIndex = 0 } = options;
            const { autofit, doneAutofit, autofitColGroup } = this.state;
            const data = {};
            data.headerTable = utils_1.makeHeaderTable(columns, options);
            data.bodyRowTable = utils_1.makeBodyRowTable(columns, options);
            data.bodyRowMap = utils_1.makeBodyRowMap(data.bodyRowTable || { rows: [] }, options);
            // header를 위한 divide
            const headerDividedObj = utils_1.divideTableByFrozenColumnIndex(data.headerTable || { rows: [] }, frozenColumnIndex, options);
            // body를 위한 divide
            const bodyDividedObj = utils_1.divideTableByFrozenColumnIndex(data.bodyRowTable || { rows: [] }, frozenColumnIndex, options);
            data.asideHeaderData = headerDividedObj.asideData;
            data.leftHeaderData = headerDividedObj.leftData;
            data.headerData = headerDividedObj.rightData;
            data.asideBodyRowData = bodyDividedObj.asideData;
            data.leftBodyRowData = bodyDividedObj.leftData;
            data.bodyRowData = bodyDividedObj.rightData;
            // colGroupMap, colGroup을 만들고 틀고정 값을 기준으로 나누어 left와 나머지에 저장
            data.colGroupMap = {};
            if (data.headerTable) {
                data.headerTable.rows.forEach((row, ridx) => {
                    row.cols.forEach((col, cidx) => {
                        if (data.colGroupMap) {
                            let colWidth = col.width; // columns로부터 전달받은 너비값.
                            if (autofit && doneAutofit && autofitColGroup) {
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
                            data.colGroupMap[col.colIndex || 0] = currentCol;
                        }
                    });
                });
            }
            data.asideColGroup = headerDividedObj.asideColGroup;
            data.colGroup = Object.values(data.colGroupMap);
            // colGroup이 정의되면 footSum
            data.footSumColumns = [...footSum];
            data.footSumTable = utils_1.makeFootSumTable(footSum, data.colGroup, options);
            const footSumDividedObj = utils_1.divideTableByFrozenColumnIndex(data.footSumTable || { rows: [] }, frozenColumnIndex, options);
            data.leftFootSumData = footSumDividedObj.leftData;
            data.footSumData = footSumDividedObj.rightData;
            return data;
        };
        this.rootNode = React.createRef();
        this.clipBoardNode = React.createRef();
        // console.log(
        //   `${new Date().toLocaleTimeString()}:${new Date().getMilliseconds()}`,
        //   'datagrid constructor',
        // );
    }
    componentDidMount() {
        const { columns, footSum = [], options = {} } = this.props;
        const newOptions = this.getOptions(options);
        const columnData = this.getColumnData(columns, footSum, newOptions);
        this.setState(Object.assign({ mounted: true }, columnData, { options: newOptions }));
    }
    componentDidUpdate(prevProps) {
        const { columns: _columns, footSum: _footSum, options: _options, } = prevProps;
        const { columns, footSum, options } = this.props;
        if (_columns !== columns || _footSum !== footSum || _options !== options) {
            const newOptions = this.getOptions(options || {});
            const columnData = this.getColumnData(columns, footSum || [], newOptions);
            this.setState(Object.assign({}, columnData, { options: newOptions, doneAutofit: false }));
        }
    }
    shouldComponentUpdate(prevProps) {
        if (prevProps.data === this.props.data &&
            prevProps.columns === this.props.columns &&
            prevProps.footSum === this.props.footSum &&
            prevProps.width === this.props.width &&
            prevProps.height === this.props.height &&
            prevProps.style === this.props.style &&
            prevProps.options === this.props.options &&
            prevProps.status === this.props.status &&
            prevProps.loading === this.props.loading &&
            prevProps.loadingData === this.props.loadingData &&
            prevProps.selectedRowKeys === this.props.selectedRowKeys &&
            prevProps.selection === this.props.selection &&
            prevProps.scrollLeft === this.props.scrollLeft &&
            prevProps.scrollTop === this.props.scrollTop &&
            prevProps.onBeforeEvent === this.props.onBeforeEvent &&
            prevProps.onScroll === this.props.onScroll &&
            prevProps.onScrollEnd === this.props.onScrollEnd &&
            prevProps.onChangeScrollSize === this.props.onChangeScrollSize &&
            prevProps.onChangeSelection === this.props.onChangeSelection &&
            prevProps.onRightClick === this.props.onRightClick) {
            return false;
        }
        return true;
    }
    render() {
        const { mounted, doneAutofit, autofitAsideWidth, autofitColGroup, headerTable, bodyRowTable, bodyRowMap, asideHeaderData, leftHeaderData, headerData, asideBodyRowData, leftBodyRowData, bodyRowData, colGroupMap, asideColGroup, colGroup, footSumColumns, footSumTable, leftFootSumData, footSumData, options, } = this.state;
        const { loading = false, loadingData = false, data = [], width, height = DataGrid.defaultHeight, selectedRowKeys, selection, status, scrollLeft, scrollTop, onBeforeEvent, onScroll, onScrollEnd, onChangeScrollSize, onChangeSelection, onChangeSelected, onRightClick, style = {}, } = this.props;
        const gridRootStyle = Object.assign({
            height: height,
            width: width,
        }, style);
        const providerProps = {
            loading,
            loadingData,
            data,
            width,
            height,
            selectedRowKeys,
            selection,
            status,
            scrollLeft,
            scrollTop,
            autofitColGroup,
            headerTable,
            bodyRowTable,
            bodyRowMap,
            asideHeaderData,
            leftHeaderData,
            headerData,
            asideBodyRowData,
            leftBodyRowData,
            bodyRowData,
            colGroupMap,
            asideColGroup,
            colGroup,
            footSumColumns,
            footSumTable,
            leftFootSumData,
            footSumData,
            rootNode: this.rootNode,
            clipBoardNode: this.clipBoardNode,
            rootObject: this.rootObject,
            onBeforeEvent,
            onScroll,
            onScrollEnd,
            onChangeScrollSize,
            onChangeSelection,
            onChangeSelected,
            onRightClick,
            options,
        };
        // console.log('datagrid render');
        return (React.createElement(providers_1.DataGridStore.Provider, Object.assign({}, providerProps),
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
