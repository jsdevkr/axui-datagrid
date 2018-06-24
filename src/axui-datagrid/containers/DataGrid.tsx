import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { DataGridStore } from '../providers';
import {
  DataGridHeader,
  DataGridBody,
  DataGridColumnFilter,
  DataGridScroll,
  DataGridPage,
} from '../components';
import { types } from '../stores';
import {
  makeHeaderTable,
  makeBodyRowTable,
  makeBodyRowMap,
  divideTableByFrozenColumnIndex,
  calculateDimensions,
  getPathValue,
  mergeAll,
  throttle,
  getScrollPosition,
} from '../utils';

interface IProps extends types.DataGrid {}
interface IState extends types.DataGridState {
  rootNode?: HTMLDivElement;
  clipBoardNode?: HTMLTextAreaElement;
}

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

  throttledUpdateDimensions: any;

  state = {
    rootNode: undefined,
    mounted: false, // 루트 엘리먼트 준비여부
    calculatedStyles: false, // 루트 엘리먼트 준비가 되면 다음 렌더링전에 getDerivedStateFromProps에서 styles계산이 필요하진 판단하고 calculatedStyles=false이면 기본 스타일 계산
    dragging: false,
    scrollLeft: 0,
    scrollTop: 0,
    focusedRow: -1,
    focusedCol: -1,
    options: DataGrid.defaultOptions,
    styles: DataGrid.defaultStyles,
  };

  static getDerivedStateFromProps(props: IProps, state: IState) {
    const { options, styles, mounted, calculatedStyles } = state;

    const optionColumnKeys =
      (options && options.columnKeys) || DataGrid.defaultColumnKeys;

    let currentOptions: types.DataGridOptions = {
      ...(options || DataGrid.defaultOptions),
    };
    let currentStyles: types.DataGridStyles = {
      ...(styles || DataGrid.defaultStyles),
    };
    let changeState = false; // 상태 변경이 필요한지 여부
    let newState: IState = { ...state }; // 새 상태 변수 상태값을 복제해 가지로 변경된 상태를 담고 있음.

    if (props.data !== state.data) {
      changeState = true;
      newState.data = props.data || [];
      newState.filteredList = newState.data.filter(n => {
        return !n[optionColumnKeys.deleted || '__deleted__'];
      });
    }

    if (props.height !== state.height) {
      changeState = true;
      newState.height = props.height;
    }

    if (JSON.stringify(props.options) !== state.optionsString) {
      changeState = true;
      newState.options = currentOptions = mergeAll(
        true,
        { ...DataGrid.defaultOptions },
        props.options,
      );
      newState.optionsString = JSON.stringify(props.options);
    }

    if (
      JSON.stringify(props.columns) !== state.columnsString ||
      JSON.stringify(props.options) !== state.optionsString
    ) {
      changeState = true;

      const frozenColumnIndex: number = getPathValue(
        currentOptions,
        ['frozenColumnIndex'],
        DataGrid.defaultOptions.frozenColumnIndex,
      );
      const columnHeight: number = getPathValue(
        currentOptions,
        ['body', 'columnHeight'],
        DataGrid.defaultBody.columnHeight,
      );

      let headerDividedObj, bodyDividedObj;

      // convert colGroup
      newState.headerTable = makeHeaderTable(props.columns, currentOptions);
      newState.bodyRowTable = makeBodyRowTable(props.columns, currentOptions);
      newState.bodyRowMap = makeBodyRowMap(
        newState.bodyRowTable,
        currentOptions,
      );

      // header를 위한 divide
      headerDividedObj = divideTableByFrozenColumnIndex(
        newState.headerTable,
        frozenColumnIndex || 0,
        currentOptions,
      );
      // body를 위한 divide
      bodyDividedObj = divideTableByFrozenColumnIndex(
        newState.bodyRowTable,
        frozenColumnIndex || 0,
        currentOptions,
      );

      newState.asideHeaderData = headerDividedObj.asideData;
      newState.leftHeaderData = headerDividedObj.leftData;
      newState.headerData = headerDividedObj.rightData;
      newState.asideColGroup = headerDividedObj.asideColGroup;

      newState.asideBodyRowData = bodyDividedObj.asideData;
      newState.leftBodyRowData = bodyDividedObj.leftData;
      newState.bodyRowData = bodyDividedObj.rightData;

      // colGroupMap, colGroup을 만들고 틀고정 값을 기준으로 나누어 left와 나머지에 저장
      newState.colGroup = [];
      newState.colGroupMap = {};
      newState.headerTable.rows.forEach((row, ridx) => {
        row.cols.forEach((col, cidx) => {
          if (newState.colGroupMap && newState.colGroup) {
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
            };
            newState.colGroupMap[col.colIndex || 0] = currentCol;
            // todo : colGroupMap에 colGroup의 참조가 있는데. 문제가 없는지 확인 필요.
            newState.colGroup.push(currentCol);
          }
        });
      });
      newState.leftHeaderColGroup = newState.colGroup.slice(
        0,
        frozenColumnIndex,
      );
      newState.headerColGroup = newState.colGroup.slice(frozenColumnIndex);

      // grouping과 footsum 나중에 구현.
      /*
      newState.bodyGrouping = [];
      newState.bodyGroupingTable = {};
      newState.asideBodyGroupingData = {};
      newState.leftBodyGroupingData = {};
      newState.bodyGroupingData = {};
      newState.bodyGroupingMap = {};
      */

      /*
      newState.footSumColumns = [];
      newState.footSumTable = {};
      newState.leftFootSumData = {};
      newState.footSumData = {};
      */

      // styles
      currentStyles.asidePanelWidth = headerDividedObj.asidePanelWidth;

      currentStyles.bodyTrHeight =
        newState.bodyRowTable.rows.length * columnHeight;

      newState.columnsString = JSON.stringify(props.columns);
      newState.styles = currentStyles;
    }

    if (mounted && !calculatedStyles) {
      // 스타일 계산이 필요한 상황
      changeState = true;
      if (state.rootNode) {
        const calculatedObject = calculateDimensions(state.rootNode, newState);
        newState.styles = calculatedObject.styles;
        newState.colGroup = calculatedObject.colGroup;
        newState.leftHeaderColGroup = calculatedObject.leftHeaderColGroup;
        newState.headerColGroup = calculatedObject.headerColGroup;
        // 새롭게 계산된 _width 값은 위 3개의 오브젝트에만 저장.
      }
    }

    return changeState ? newState : null;
  }

  componentDidMount() {
    const rootNode = ReactDOM.findDOMNode(
      this.refs['datagrid-ref'],
    ) as HTMLDivElement;
    const clipBoardNode = ReactDOM.findDOMNode(
      this.refs['datagrid-clipboard'],
    ) as HTMLTextAreaElement;

    this.throttledUpdateDimensions = throttle(
      this.updateDimensions.bind(this),
      DataGrid.defaultThrottleWait,
    );
    window.addEventListener('resize', this.throttledUpdateDimensions);

    this.setState({
      mounted: true,
      rootNode,
      clipBoardNode,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledUpdateDimensions);

    this.setState({
      mounted: false,
    });
  }

  updateDimensions() {
    const { rootNode, scrollLeft = 0, scrollTop = 0 } = this.state;

    if (rootNode) {
      const { styles: newStyles } = calculateDimensions(rootNode, this.state);
      const {
        scrollLeft: newScrollLeft,
        scrollTop: newScrollTop,
      } = getScrollPosition(scrollLeft, scrollTop, {
        scrollWidth: newStyles.scrollContentWidth,
        scrollHeight: newStyles.scrollContentHeight,
        clientWidth: newStyles.scrollContentContainerWidth,
        clientHeight: newStyles.scrollContentContainerHeight,
      });

      this.setState({
        scrollLeft: newScrollLeft,
        scrollTop: newScrollTop,
        styles: newStyles,
      });
    }
  }

  public render() {
    // const { data: receiveData, options, columns, style, height } = this.props;
    const { mounted, styles } = this.state;
    const param = { ...this.state };
    let gridRootStyle = mergeAll(
      { height: this.props.height || DataGrid.defaultHeight },
      this.props.style,
    );
    if (styles.calculatedHeight !== null) {
      gridRootStyle.height = styles.calculatedHeight;
    }

    return (
      <DataGridStore.Provider {...param}>
        <div
          ref="datagrid-ref"
          className={'axui-datagrid'}
          style={gridRootStyle}
        >
          <div className={'axui-datagrid-clip-board'}>
            <textarea ref="datagrid-clipboard" />
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
        </div>
      </DataGridStore.Provider>
    );
  }
}

export default DataGrid;
