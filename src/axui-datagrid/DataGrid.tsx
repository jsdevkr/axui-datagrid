import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { DataGridStore } from './providers';
import {
  DataGridEvents,
  DataGridHeader,
  DataGridBody,
  DataGridColumnFilter,
  DataGridScroll,
  DataGridPage,
  DataGridLoader,
} from './components';

import {
  mergeAll,
  makeHeaderTable,
  makeBodyRowTable,
  makeBodyRowMap,
  makeFootSumTable,
  divideTableByFrozenColumnIndex,
  calculateDimensions,
  getNode,
  getTableByStartEndColumnIndex,
  getPositionPrintColGroup,
} from './utils';
import {
  IDataGrid,
  IDataGridRootState,
  IDataGridOptionHeader,
  IDataGridOptionBody,
  IDataGridOptionPageButton,
  IDataGridOptionPage,
  IDataGridOptionScroller,
  IDataGridOptions,
  IDataGridStyles,
  IDataGridState,
  IDataGridColumnKeys,
  IDataGridCol,
} from './common/@types';

interface IProps extends IDataGrid {}
interface IState extends IDataGridRootState {}

class DataGrid extends React.Component<IProps, IState> {
  static defaultHeight: number = 400;
  static defaultColumnKeys: IDataGridColumnKeys = {
    selected: '_selected_',
    modified: '_modified_',
    deleted: '_deleted_',
    disableSelection: '_disable_selection_',
  };
  static defaultHeader: IDataGridOptionHeader = {
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
  static defaultBody: IDataGridOptionBody = {
    align: 'left',
    columnHeight: 24,
    columnPadding: 3,
    columnBorderWidth: 1,
    grouping: false,
    mergeCells: false,
  };
  static defaultPageButtons: IDataGridOptionPageButton[] = [
    { className: 'datagridIcon-first', onClick: 'PAGE_FIRST' },
    { className: 'datagridIcon-prev', onClick: 'PAGE_PREV' },
    { className: 'datagridIcon-back', onClick: 'PAGE_BACK' },
    { className: 'datagridIcon-play', onClick: 'PAGE_PLAY' },
    { className: 'datagridIcon-next', onClick: 'PAGE_NEXT' },
    { className: 'datagridIcon-last', onClick: 'PAGE_LAST' },
  ];
  static defaultPage: IDataGridOptionPage = {
    buttonsContainerWidth: 150,
    buttons: DataGrid.defaultPageButtons,
    buttonHeight: 16,
    height: 20,
  };
  static defaultScroller: IDataGridOptionScroller = {
    size: 14,
    arrowSize: 14,
    barMinSize: 12,
    padding: 3,
    disabledVerticalScroll: false,
  };
  static defaultOptions: IDataGridOptions = {
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
  static defaultStyles: IDataGridStyles = {
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
  static defaultThrottleWait = 100;

  rootObject: any = {};
  rootNode: any = null;
  clipBoardNode: any = null;

  state = {
    mounted: false, // 루트 엘리먼트 준비여부
    calculatedHeight: undefined,
  };

  setRootNode = (element: any) => {
    this.rootNode = ReactDOM.findDOMNode(element);
  };

  setClipBoardNode = (element: any) => {
    this.clipBoardNode = ReactDOM.findDOMNode(element);
  };

  /**
   * You must execute setRootState only once in the child component.
   * otherwise you will fall into a trap.
   * @param {DataGridRootState} state
   */
  setRootState = (state: IDataGridRootState) => {
    this.setState(state);
  };

  getRootState = () => {
    return this.state;
  };

  getRootNode = () => {
    return this.rootNode;
  };

  getClipBoardNode = () => {
    return this.clipBoardNode;
  };

  onFireEvent = () => {};

  getOptions = (options: IDataGridOptions): IDataGridOptions => {
    return mergeAll(true, { ...DataGrid.defaultOptions }, options);
  };

  getProviderProps = (prevState: IDataGridState) => {
    const { columns = [], footSum } = this.props;
    const { options = {} } = prevState;
    const {
      frozenColumnIndex = DataGrid.defaultOptions.frozenColumnIndex || 0,
      body: optionsBody = DataGrid.defaultBody,
    } = options;
    const { columnHeight = 0 } = optionsBody;

    // StoreProvider에 전달해야 하는 상태를 newState에 담는 작업을 시작합니다.
    let newState: IDataGridState = { ...prevState };
    let newStyle: IDataGridStyles = {};

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
    newState.headerTable = makeHeaderTable(columns, options);
    newState.bodyRowTable = makeBodyRowTable(columns, options);
    newState.bodyRowMap = makeBodyRowMap(
      newState.bodyRowTable || { rows: [] },
      options,
    );

    // header를 위한 divide
    const headerDividedObj = divideTableByFrozenColumnIndex(
      newState.headerTable || { rows: [] },
      frozenColumnIndex,
      options,
    );

    // body를 위한 divide
    const bodyDividedObj = divideTableByFrozenColumnIndex(
      newState.bodyRowTable || { rows: [] },
      frozenColumnIndex,
      options,
    );

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
            const currentCol: IDataGridCol = {
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
      newState.footSumTable = makeFootSumTable(
        footSum,
        newState.colGroup,
        options,
      );
      const footSumDividedObj = divideTableByFrozenColumnIndex(
        newState.footSumTable || { rows: [] },
        frozenColumnIndex,
        options,
      );
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
    const calculatedObject = calculateDimensions(
      getNode(newState.getRootNode),
      newState,
    );

    newState.styles = calculatedObject.styles;
    newState.colGroup = calculatedObject.colGroup;
    newState.leftHeaderColGroup = calculatedObject.leftHeaderColGroup;
    newState.headerColGroup = calculatedObject.headerColGroup;

    const {
      CTInnerWidth: _CTInnerWidth = 0,
      frozenPanelWidth: _frozenPanelWidth = 0,
      asidePanelWidth: _asidePanelWidth = 0,
      rightPanelWidth: _rightPanelWidth = 0,
    } = newState.styles!;
    const { printStartColIndex, printEndColIndex } = getPositionPrintColGroup(
      newState.headerColGroup,
      Math.abs(newState.scrollLeft || 0) + _frozenPanelWidth,
      Math.abs(newState.scrollLeft || 0) +
        _frozenPanelWidth +
        (_CTInnerWidth -
          _asidePanelWidth -
          _frozenPanelWidth -
          _rightPanelWidth),
    );

    newState.printStartColIndex = printStartColIndex;
    newState.printEndColIndex = printEndColIndex;

    newState.visibleHeaderColGroup = newState.headerColGroup.slice(
      printStartColIndex,
      printEndColIndex + 1,
    );

    newState.visibleBodyRowData = getTableByStartEndColumnIndex(
      newState.bodyRowData || { rows: [{ cols: [] }] },
      printStartColIndex + frozenColumnIndex,
      printEndColIndex + frozenColumnIndex,
    );
    newState.visibleBodyGroupingData = getTableByStartEndColumnIndex(
      newState.bodyGroupingData || { rows: [{ cols: [] }] },
      printStartColIndex + frozenColumnIndex,
      printEndColIndex + frozenColumnIndex,
    );

    if (footSum) {
      newState.visibleFootSumData = getTableByStartEndColumnIndex(
        newState.footSumData || { rows: [{ cols: [] }] },
        printStartColIndex + frozenColumnIndex,
        printEndColIndex + frozenColumnIndex,
      );
    }

    return newState;
  };

  constructor(props: IProps) {
    super(props);

    this.rootNode = React.createRef();
  }

  public render() {
    const { mounted } = this.state;
    const {
      data = [],
      options = {},
      style = {},
      onBeforeEvent,
      onAfterEvent,
      onScrollEnd,
      onChangeSelected,
      height = DataGrid.defaultHeight,
      loading = false,
      loadingData = false,
      selection,
      rowSelector,
    } = this.props;

    let providerProps: IDataGridState = {};
    let gridRootStyle = mergeAll(
      {
        height: this.state.calculatedHeight || height,
      },
      style,
    );

    if (mounted) {
      providerProps = this.getProviderProps({
        mounted,
        loading,
        loadingData,
        setRootState: this.setRootState,
        getRootState: this.getRootState,
        getRootNode: this.getRootNode,
        getClipBoardNode: this.getClipBoardNode,
        rootObject: this.rootObject,
        data,
        height,
        onBeforeEvent,
        onAfterEvent,
        onScrollEnd,
        onChangeSelected,
        selection,
        rowSelector,
        options: this.getOptions(options),
      });
    }

    console.log(providerProps);

    return (
      <DataGridStore.Provider {...providerProps}>
        <DataGridEvents ref={this.setRootNode} style={gridRootStyle}>
          <div className="axui-datagrid-clip-board">
            <textarea ref={this.setClipBoardNode} />
          </div>
          {mounted ? (
            <>
              <DataGridHeader />
              <DataGridBody />
              <DataGridPage />
              <DataGridScroll />
              <DataGridColumnFilter />
              <DataGridLoader loading={loading} />
            </>
          ) : null}
        </DataGridEvents>
      </DataGridStore.Provider>
    );
  }

  componentDidMount() {
    this.setState({
      mounted: true,
    });
  }
}

export default DataGrid;
