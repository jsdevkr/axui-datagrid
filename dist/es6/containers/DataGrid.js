"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const providers_1 = require("../providers");
const components_1 = require("../components");
const utils_1 = require("../utils");
class DataGrid extends React.Component {
    constructor() {
        super(...arguments);
        this.rootObject = {};
        this.rootNode = null;
        this.clipBoardNode = null;
        this.state = {
            mounted: false,
            dimensionsRootNode: {},
            calculatedHeight: undefined,
        };
        this.setRootNode = (element) => {
            this.rootNode = ReactDOM.findDOMNode(element);
        };
        this.setClipBoardNode = (element) => {
            this.clipBoardNode = ReactDOM.findDOMNode(element);
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
        this.getRootNode = () => {
            return this.rootNode;
        };
        this.getClipBoardNode = () => {
            return this.clipBoardNode;
        };
        this.onFireEvent = () => { };
    }
    componentDidMount() {
        this.setState({
            mounted: true,
            dimensionsRootNode: {
                width: utils_1.getInnerWidth(this.rootNode),
                height: utils_1.getInnerHeight(this.rootNode),
            },
        });
    }
    render() {
        const { mounted, dimensionsRootNode } = this.state;
        const { data, columns, height, options, style, onBeforeEvent, onAfterEvent, } = this.props;
        const providerProps = {
            mounted,
            dimensionsRootNode,
            setRootState: this.setRootState,
            getRootState: this.getRootState,
            getRootNode: this.getRootNode,
            getClipBoardNode: this.getClipBoardNode,
            rootObject: this.rootObject,
            data,
            columns,
            height,
            options,
            onBeforeEvent,
            onAfterEvent,
        };
        let gridRootStyle = utils_1.mergeAll({
            height: this.state.calculatedHeight || height || DataGrid.defaultHeight,
        }, style);
        return (React.createElement(providers_1.DataGridStore.Provider, Object.assign({}, providerProps),
            React.createElement(components_1.DataGridEvents, { ref: this.setRootNode, onFireEvent: this.onFireEvent, style: gridRootStyle },
                React.createElement("div", { className: 'axui-datagrid-clip-board' },
                    React.createElement("textarea", { ref: this.setClipBoardNode })),
                mounted ? (React.createElement(React.Fragment, null,
                    React.createElement(components_1.DataGridHeader, null),
                    React.createElement(components_1.DataGridBody, null),
                    React.createElement(components_1.DataGridPage, null),
                    React.createElement(components_1.DataGridScroll, null),
                    React.createElement(components_1.DataGridColumnFilter, null))) : null)));
    }
}
DataGrid.defaultHeight = 400;
DataGrid.defaultColumnKeys = {
    selected: '__selected__',
    modified: '__modified__',
    deleted: '__deleted__',
    disableSelection: '__disable_selection__',
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
    showRowSelector: false,
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
//# sourceMappingURL=DataGrid.js.map