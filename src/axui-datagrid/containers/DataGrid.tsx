import * as React from 'react';
import { DataGridStore, IDataGridState, IDataGrid } from '../providers';
import { DataGridHeader } from '../components';
import { types } from '../stores';

interface IProps extends IDataGrid {}
interface IState extends IDataGridState {}

class DataGrid extends React.Component<IProps, IState> {
  static defaultColumnKeys: types.DataGridColumnKeys = {
    selected: '__selected__',
    modified: '__modified__',
    deleted: '__deleted__',
    disableSelection: '__disable_selection__',
  };
  static defaultHeader: types.DataGridOptionHeader = {};
  static defaultBody: types.DataGridOptionBody = {};
  static defaultPage: types.DataGridOptionPage = {};
  static defaultScroller: types.DataGridOptionScroller = {};
  static defaultOptions: types.DataGridOptions = {
    frozenColumnIndex: 0,
    frozenRowIndex: 0,
    showLineNumber: true,
    showRowSelector: false,
    multipleSelect: true,
    columnMinWidth: 100,
    lineNumberColumnWidth: 40,
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
    calculatedHeight: -1,
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

  state = {
    data: [],
    filteredList: [],
    scrollLeft: 0,
    scrollTop: 0,
    selectionRows: {},
    selectionCols: {},
    focusedRow: -1,
    focusedCol: -1,

    colGroup: [],
    colGroupMap: {},
    asideColGroup: [],
    leftHeaderColGroup: [],
    headerColGroup: [],
    headerTable: {},
    asideHeaderData: {},
    leftHeaderData: {},
    headerData: {},
    bodyRowTable: {},
    asideBodyRowData: {},
    leftBodyRowData: {},
    bodyRowData: {},
    bodyRowMap: {},
    bodyGroupingTable: {},
    asideBodyGroupingData: {},
    leftBodyGroupingData: {},
    bodyGroupingData: {},
    bodyGroupingMap: {},
    options: DataGrid.defaultOptions,
    styles: DataGrid.defaultStyles,
  };

  static getDerivedStateFromProps(props: IProps, state: IState) {
    const { options } = state;

    const optionHeader = (options && options.header) || DataGrid.defaultHeader;
    const optionBody = (options && options.body) || DataGrid.defaultBody;
    const optionPage = (options && options.page) || DataGrid.defaultPage;
    const optionScroll =
      (options && options.scroller) || DataGrid.defaultScroller;
    const optionColumnKeys =
      (options && options.columnKeys) || DataGrid.defaultColumnKeys;

    let changeState = false;
    let newState: IState = { ...state };

    if (props.data !== state.data) {
      changeState = true;
      newState.data = props.data || [];
      newState.filteredList = newState.data.filter(n => {
        return !n[optionColumnKeys.deleted];
      });
    }

    if (JSON.stringify(props.columns) !== state.columnsString) {
    }

    if (props.height !== state.height) {
      changeState = true;
      newState.height = props.height;
    }

    if (JSON.stringify(props.style) !== state.styleString) {
    }

    if (JSON.stringify(props.options) !== state.optionsString) {
    }

    return changeState ? newState : null;
  }

  public render() {
    // const { data: receiveData, options, columns, style, height } = this.props;
    const param = {
      data: this.state.data,
    };

    return (
      <DataGridStore.Provider {...param}>
        <DataGridHeader />
        <div>DATAGRID</div>
      </DataGridStore.Provider>
    );
  }
}

export default DataGrid;
