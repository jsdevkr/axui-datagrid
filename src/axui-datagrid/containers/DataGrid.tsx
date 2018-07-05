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
import { mergeAll, getInnerWidth, getInnerHeight } from '../utils';

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
    dimensionsRootNode: {},
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

  componentDidMount() {
    this.setState({
      mounted: true,
      dimensionsRootNode: {
        width: getInnerWidth(this.rootNode),
        height: getInnerHeight(this.rootNode),
      },
    });
  }

  public render() {
    const { mounted, dimensionsRootNode } = this.state;
    const {
      data,
      columns,
      height,
      options,
      style,
      onBeforeEvent,
      onAfterEvent,
    } = this.props;

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

    let gridRootStyle = mergeAll(
      {
        height: this.state.calculatedHeight || height || DataGrid.defaultHeight,
      },
      style,
    );

    return (
      <DataGridStore.Provider {...providerProps}>
        <DataGridEvents
          ref={this.setRootNode}
          onFireEvent={this.onFireEvent}
          style={gridRootStyle}
        >
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
