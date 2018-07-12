import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { DataGridStore } from '../providers';
import {
  DataGridEvents,
  DataGridHeader,
  DataGridBody,
  DataGridColumnFilter,
  DataGridScroll,
  DataGridPage,
} from '../components';
import { types } from '../stores';
import {
  mergeAll,
  makeHeaderTable,
  makeBodyRowTable,
  makeBodyRowMap,
  divideTableByFrozenColumnIndex,
  calculateDimensions,
  getNode,
  getTableByStartEndColumnIndex,
  getPositionPrintColGroup,
} from '../utils';

interface IProps extends types.DataGrid {}
interface IState extends types.DataGridRootState {}

class DataGrid extends React.Component<IProps, IState> {
  static defaultHeight: number = 400;
  static defaultColumnKeys: types.DataGridColumnKeys = {
    selected: '__selected__',
    modified: '__modified__',
    deleted: '__deleted__',
    disableSelection: '__disable_selection__',
  };
  static defaultHeader: types.DataGridOptionHeader = {
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
  static defaultBody: types.DataGridOptionBody = {
    align: 'left',
    columnHeight: 24,
    columnPadding: 3,
    columnBorderWidth: 1,
    grouping: false,
    mergeCells: false,
  };
  static defaultPageButtons: types.DataGridOptionPageButton[] = [
    { className: 'datagridIcon-first', onClick: 'PAGE_FIRST' },
    { className: 'datagridIcon-prev', onClick: 'PAGE_PREV' },
    { className: 'datagridIcon-back', onClick: 'PAGE_BACK' },
    { className: 'datagridIcon-play', onClick: 'PAGE_PLAY' },
    { className: 'datagridIcon-next', onClick: 'PAGE_NEXT' },
    { className: 'datagridIcon-last', onClick: 'PAGE_LAST' },
  ];
  static defaultPage: types.DataGridOptionPage = {
    buttonsContainerWidth: 150,
    buttons: DataGrid.defaultPageButtons,
    buttonHeight: 16,
    height: 20,
  };
  static defaultScroller: types.DataGridOptionScroller = {
    size: 14,
    arrowSize: 14,
    barMinSize: 12,
    padding: 3,
    disabledVerticalScroll: false,
  };
  static defaultOptions: types.DataGridOptions = {
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
  static defaultStyles: types.DataGridStyles = {
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
  setRootState = (state: types.DataGridRootState) => {
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

  getFilteredList = (data: any[]): any[] => {
    const { options = DataGrid.defaultOptions } = this.props;
    const { columnKeys: optionColumnKeys = {} } = options;

    return data.filter((n: any) => {
      return !n[optionColumnKeys.deleted || '__deleted__'];
    });
  };

  getOptions = (options: types.DataGridOptions): types.DataGridOptions => {
    return mergeAll(true, { ...DataGrid.defaultOptions }, options);
  };

  getProviderProps = (prevState: types.DataGridState) => {
    const { columns = [] } = this.props;
    const { options = {} } = prevState;
    const {
      frozenColumnIndex = DataGrid.defaultOptions.frozenColumnIndex || 0,
      body: optionsBody = DataGrid.defaultBody,
    } = options;
    const { columnHeight = 0 } = optionsBody;

    let newState: types.DataGridState = { ...prevState };
    let newStyle: types.DataGridStyles = {};

    // convert colGroup
    newState.headerTable = makeHeaderTable(columns, options);
    newState.bodyRowTable = makeBodyRowTable(columns, options);
    newState.bodyRowMap = makeBodyRowMap(newState.bodyRowTable, options);

    // header를 위한 divide
    const headerDividedObj = divideTableByFrozenColumnIndex(
      newState.headerTable,
      frozenColumnIndex || 0,
      options,
    );

    // body를 위한 divide
    const bodyDividedObj = divideTableByFrozenColumnIndex(
      newState.bodyRowTable,
      frozenColumnIndex || 0,
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
    newState.headerTable.rows.forEach((row, ridx) => {
      row.cols.forEach((col, cidx) => {
        if (newState.colGroupMap) {
          const currentCol: types.DataGridCol = {
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

    newState.colGroup = Object.values(newState.colGroupMap);

    newState.leftHeaderColGroup = newState.colGroup.slice(0, frozenColumnIndex);
    newState.headerColGroup = newState.colGroup.slice(frozenColumnIndex);

    // styles
    newStyle.asidePanelWidth = headerDividedObj.asidePanelWidth;

    newStyle.bodyTrHeight = newState.bodyRowTable.rows.length * columnHeight;

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
    } = newState.styles;
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

    return newState;
  };

  componentDidMount() {
    this.setState({
      mounted: true,
    });
  }

  public render() {
    const { mounted } = this.state;
    const {
      data = [],
      options = {},
      style = {},
      onBeforeEvent,
      onAfterEvent,
      height = DataGrid.defaultHeight,
    } = this.props;

    let providerProps: types.DataGridState = {};
    let gridRootStyle = mergeAll(
      {
        height: this.state.calculatedHeight || height,
      },
      style,
    );

    if (mounted) {
      providerProps = this.getProviderProps({
        mounted,
        setRootState: this.setRootState,
        getRootState: this.getRootState,
        getRootNode: this.getRootNode,
        getClipBoardNode: this.getClipBoardNode,
        rootObject: this.rootObject,
        data,
        filteredList: this.getFilteredList(data),
        height,
        onBeforeEvent,
        onAfterEvent,
        options: this.getOptions(options),
      });
    }

    return (
      <DataGridStore.Provider {...providerProps}>
        <DataGridEvents ref={this.setRootNode} style={gridRootStyle}>
          <div className={'axui-datagrid-clip-board'}>
            <textarea ref={this.setClipBoardNode} />
          </div>
          {mounted ? (
            <>
              <DataGridHeader />
              <DataGridBody />
              <DataGridPage />
              <DataGridScroll />
              <DataGridColumnFilter />
            </>
          ) : null}
        </DataGridEvents>
      </DataGridStore.Provider>
    );
  }
}

export default DataGrid;
