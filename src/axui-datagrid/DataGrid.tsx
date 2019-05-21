import * as React from 'react';

import { DataGridStore } from './providers';
import {
  DataGridEvents,
  DataGridHeader,
  DataGridBody,
  DataGridScroll,
  DataGridPage,
  DataGridLoader,
} from './components';

import {
  makeHeaderTable,
  makeBodyRowTable,
  makeBodyRowMap,
  makeFootSumTable,
  divideTableByFrozenColumnIndex,
  isNumber,
} from './utils';
import { IDataGrid } from './common/@types';
import DataGridAutofitHelper from './components/DataGridAutofitHelper';

interface IProps extends IDataGrid.IRootProps {}
interface IState extends IDataGrid.IRootState {}

class DataGrid extends React.Component<IProps, IState> {
  static defaultHeight: number = 400;
  static defaultColumnKeys: IDataGrid.IColumnKeys = {
    selected: '_selected_',
    modified: '_modified_',
    deleted: '_deleted_',
    disableSelection: '_disable_selection_',
  };
  static defaultHeader: IDataGrid.IOptionHeader = {
    display: true,
    align: 'left',
    columnHeight: 24,
    columnPadding: 3,
    columnBorderWidth: 1,
    selector: true,
    sortable: true,
    clickAction: 'sort',
  };
  static defaultBody: IDataGrid.IOptionBody = {
    align: 'left',
    columnHeight: 24,
    columnPadding: 3,
    columnBorderWidth: 1,
    grouping: false,
    mergeCells: false,
  };
  static defaultPage: IDataGrid.IOptionPage = {
    height: 20,
  };
  static defaultScroller: IDataGrid.IOptionScroller = {
    theme: 'default',
    width: 14,
    height: 14,
    arrowSize: 14,
    barMinSize: 12,
    padding: 3,
    horizontalScrollerWidth: 30, // 30%
  };
  static defaultOptions: IDataGrid.IOptions = {
    frozenColumnIndex: 0,
    frozenRowIndex: 0,
    showLineNumber: true,
    multipleSelect: true,
    columnMinWidth: 100,

    lineNumberColumnWidth: 60,
    lineNumberStartAt: 1,
    rowSelectorColumnWidth: 28,
    rowSelectorSize: 16,
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
    disableClipboard: false,
  };
  static defaultStyles: IDataGrid.IStyles = {
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
  static defaultThrottleWait = 100;

  rootObject: any = {};
  rootNode: React.RefObject<HTMLDivElement>;
  clipBoardNode: React.RefObject<HTMLTextAreaElement>;

  state: IState = {
    mounted: false,
    autofiting: false,
    autofitAsideWidth: DataGrid.defaultOptions.lineNumberColumnWidth,
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

  constructor(props: IProps) {
    super(props);

    this.rootNode = React.createRef();
    this.clipBoardNode = React.createRef();

    // console.log(
    //   `${new Date().toLocaleTimeString()}:${new Date().getMilliseconds()}`,
    //   'datagrid constructor',
    // );
  }

  getOptions = (options: IDataGrid.IOptions): IDataGrid.IOptions => {
    return {
      ...DataGrid.defaultOptions,
      ...options,
      header: { ...DataGrid.defaultOptions.header, ...options.header },
      body: { ...DataGrid.defaultOptions.body, ...options.body },
      page: { ...DataGrid.defaultOptions.page, ...options.page },
      scroller: { ...DataGrid.defaultOptions.scroller, ...options.scroller },
      columnKeys: {
        ...DataGrid.defaultOptions.columnKeys,
        ...options.columnKeys,
      },
    };
  };

  applyAutofit = (params: IDataGrid.IapplyAutofitParam) => {
    const newState: IState = {};
    const { columns, footSum } = this.props;
    const { options } = this.state;

    // console.log('applyAutofit');

    newState.options = this.getOptions(options || {});
    newState.options.lineNumberColumnWidth = params.asideWidth;

    const columnData = this.getColumnData(
      columns,
      footSum || [],
      newState.options,
      params.colGroup,
    );

    this.setState({
      autofiting: false,
      autofitAsideWidth: params.asideWidth,
      autofitColGroup: params.colGroup,
      options: newState.options,
      ...columnData,
    });
    // render가 다시되고 > getProviderProps이 다시 실행됨 (getProviderProps에서 doneAutofit인지 판단하여 autofitColGroup의 width값을 colGroup에 넣어주면 됨.)
  };

  getColumnData = (
    columns: IDataGrid.IColumn[],
    footSum: IDataGrid.IColumn[][],
    options: IDataGrid.IOptions,
    autofitColGroup?: IDataGrid.IColumn[],
  ): IState => {
    const { frozenColumnIndex = 0 } = options;

    const data: IState = {};
    data.headerTable = makeHeaderTable(columns, options);
    data.bodyRowTable = makeBodyRowTable(columns, options);
    data.bodyRowMap = makeBodyRowMap(
      data.bodyRowTable || { rows: [] },
      options,
    );

    // header를 위한 divide
    const headerDividedObj = divideTableByFrozenColumnIndex(
      data.headerTable || { rows: [] },
      frozenColumnIndex,
      options,
    );

    // body를 위한 divide
    const bodyDividedObj = divideTableByFrozenColumnIndex(
      data.bodyRowTable || { rows: [] },
      frozenColumnIndex,
      options,
    );

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

            if (autofitColGroup) {
              if (
                isNumber(col.colIndex) &&
                autofitColGroup[Number(col.colIndex)]
              ) {
                colWidth = autofitColGroup[Number(col.colIndex)].width;
              }
            }

            const currentCol: IDataGrid.ICol = {
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
    data.footSumTable = makeFootSumTable(footSum, data.colGroup, options);
    const footSumDividedObj = divideTableByFrozenColumnIndex(
      data.footSumTable || { rows: [] },
      frozenColumnIndex,
      options,
    );
    data.leftFootSumData = footSumDividedObj.leftData;
    data.footSumData = footSumDividedObj.rightData;

    return data;
  };

  componentDidMount() {
    const { columns, footSum = [], options = {}, autofitColumns } = this.props;
    const newOptions = this.getOptions(options);
    const columnData = this.getColumnData(columns, footSum, newOptions);

    console.log('componentDidMount, autofitColumns:', !!autofitColumns);
    this.setState({
      mounted: true,
      autofiting: !!autofitColumns,
      ...columnData,
      options: newOptions,
    });
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    const {
      columns: _columns,
      footSum: _footSum,
      options: _options,
      autofitColumns: _autofitColumns,
    } = prevProps;
    const { columns, footSum, options, autofitColumns } = this.props;
    const newState: any = {
      autofiting: this.state.autofiting,
    };
    let changeState = false;

    if (_autofitColumns !== autofitColumns || _columns !== columns) {
      // newState.autofiting = true;
    }
    if (_columns !== columns || _footSum !== footSum || _options !== options) {
      newState.newOptions = this.getOptions(options || {});
      newState.columnData = this.getColumnData(
        columns,
        footSum || [],
        newState.newOptions,
        this.state.autofitColGroup,
      );
      changeState = true;
    }

    if (changeState) {
      this.setState({
        ...newState.columnData,
        options: newState.newOptions,
        autofiting: newState.autofiting,
      });
    }
  }

  public render() {
    const {
      mounted,
      autofiting,
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
      options,
    } = this.state;

    const {
      loading = false,
      loadingData = false,
      data = [],
      width,
      height = DataGrid.defaultHeight,
      selectedIndexes,
      selection,
      status,
      scrollLeft,
      scrollTop,

      onBeforeEvent,
      onScroll,
      onScrollEnd,
      onChangeScrollSize,
      onChangeSelection,
      onChangeSelected,
      onRightClick,
      onClick,
      onError,
      style = {},
    } = this.props;

    const gridRootStyle = {
      ...{
        height: height,
        width: width,
      },
      ...style,
    };

    const providerProps = {
      loading,
      loadingData,
      data,
      width,
      height,
      selectedIndexes,
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
      onClick,
      onError,

      options,
    };

    // console.log('datagrid render');
    // console.log(`autofiting ${autofiting}`);
    // debugger;

    return (
      <DataGridStore.Provider {...providerProps}>
        <div
          tabIndex={-1}
          ref={this.rootNode}
          className="axui-datagrid"
          style={gridRootStyle}
        >
          <div className="axui-datagrid-clip-board">
            <textarea ref={this.clipBoardNode} />
          </div>
          {mounted && (
            <DataGridEvents>
              <DataGridHeader />
              <DataGridBody />
              <DataGridPage />
              <DataGridScroll />
              <DataGridLoader loading={loading} />
            </DataGridEvents>
          )}
          {autofiting && (
            <DataGridAutofitHelper applyAutofit={this.applyAutofit} />
          )}
        </div>
      </DataGridStore.Provider>
    );
  }
}

export default DataGrid;
