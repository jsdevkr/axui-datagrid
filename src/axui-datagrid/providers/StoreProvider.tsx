import * as React from 'react';

import { types, KeyCodes, DispatchTypes } from '../stores';
import { DataGrid } from '../containers';
import {
  makeHeaderTable,
  makeBodyRowTable,
  makeBodyRowMap,
  divideTableByFrozenColumnIndex,
  calculateDimensions,
  mergeAll,
  throttle,
  getScrollPosition,
  getPositionPrintColGroup,
  getTableByStartEndColumnIndex,
  getNode,
  getOuterHeight,
} from '../utils';
import dataGridFormatter from '../functions/formatter';

export interface IDataGridStore extends types.DataGridState {
  setStoreState: (store: types.DataGridState) => void;
  dispatch: (
    dispatchType: DispatchTypes,
    param: types.DataGridDispatchParam,
  ) => void;
}

const store: IDataGridStore = {
  sortInfo: {},
  isColumnFilter: false,
  scrollLeft: 0,
  scrollTop: 0,
  selectionRows: {},
  selectionCols: {},
  focusedRow: -1,
  focusedCol: -1,
  selectionStartOffset: {},
  selectionEndOffset: {},
  selectionMinOffset: {},
  selectionMaxOffset: {},
  columnResizing: false,
  columnResizerLeft: 0,

  mounted: false,
  loading: false,
  loadingData: false,

  data: [],
  filteredList: [],
  listSelectedAll: false,
  colGroup: [],
  asideColGroup: [],
  leftHeaderColGroup: [],
  headerColGroup: [],
  asideHeaderData: { rows: [{ cols: [] }] },
  leftHeaderData: { rows: [{ cols: [] }] },
  headerData: { rows: [{ cols: [] }] },
  asideBodyRowData: { rows: [{ cols: [] }] },
  leftBodyRowData: { rows: [{ cols: [] }] },
  bodyRowData: { rows: [{ cols: [] }] },
  asideBodyGroupingData: { rows: [{ cols: [] }] },
  leftBodyGroupingData: { rows: [{ cols: [] }] },
  bodyGroupingData: { rows: [{ cols: [] }] },
  colGroupMap: {},
  bodyRowMap: {},
  bodyGroupingMap: {},
  options: {},
  styles: {},

  predefinedFormatter: {},
  setStoreState: () => {},
  dispatch: () => {},
};

const { Provider, Consumer } = React.createContext(store);

class StoreProvider extends React.Component<any, types.DataGridState> {
  state = store;

  throttledUpdateDimensions: any;

  static getDerivedStateFromProps(
    newProps: any,
    prevState: types.DataGridState,
  ) {
    /*
      초기에만 값을 수신하여 랜더링 하고, 그 후엔 setState로 제어 되는 항목.
      newProps.styles === prevState.styles &&
      newProps.printStartColIndex === prevState.printStartColIndex &&
      newProps.printEndColIndex === prevState.printEndColIndex &&
      newProps.visibleHeaderColGroup === prevState.visibleHeaderColGroup &&
      newProps.visibleBodyRowData === prevState.visibleBodyRowData &&
      newProps.visibleBodyGroupingData === prevState.visibleBodyGroupingData
     */

    if (
      newProps.mounted === prevState.mounted &&
      newProps.loading === prevState.loading &&
      newProps.loadingData === prevState.loadingData &&
      newProps.setRootState === prevState.setRootState &&
      newProps.getRootState === prevState.getRootState &&
      newProps.getRootNode === prevState.getRootNode &&
      newProps.getClipBoardNode === prevState.getClipBoardNode &&
      newProps.rootObject === prevState.rootObject &&
      newProps.data === prevState.data &&
      newProps.filteredList === prevState.filteredList &&
      newProps.options === prevState.options &&
      newProps.height === prevState.height &&
      newProps.onBeforeEvent === prevState.onBeforeEvent &&
      newProps.onAfterEvent === prevState.onAfterEvent &&
      newProps.headerTable === prevState.headerTable &&
      newProps.bodyRowTable === prevState.bodyRowTable &&
      newProps.bodyRowMap === prevState.bodyRowMap &&
      newProps.asideHeaderData === prevState.asideHeaderData &&
      newProps.leftHeaderData === prevState.leftHeaderData &&
      newProps.headerData === prevState.headerData &&
      newProps.asideColGroup === prevState.asideColGroup &&
      newProps.asideBodyRowData === prevState.asideBodyRowData &&
      newProps.leftBodyRowData === prevState.leftBodyRowData &&
      newProps.bodyRowData === prevState.bodyRowData &&
      newProps.colGroup === prevState.colGroup &&
      newProps.colGroupMap === prevState.colGroupMap &&
      newProps.leftHeaderColGroup === prevState.leftHeaderColGroup &&
      newProps.headerColGroup === prevState.headerColGroup
    ) {
      return null;
    } else {
      let scrollTop = prevState.scrollTop;

      if (
        newProps.loadingData &&
        newProps.loadingData !== prevState.loadingData
      ) {
        const { filteredList, styles = {} } = newProps;
        const focusRow = filteredList.length - 1;
        const {
          bodyTrHeight = 0,
          scrollContentWidth = 0,
          scrollContentHeight = 0,
          scrollContentContainerWidth = 0,
          scrollContentContainerHeight = 0,
        } = styles;

        scrollTop = getScrollPosition(0, -focusRow * bodyTrHeight, {
          scrollWidth: scrollContentWidth,
          scrollHeight: scrollContentHeight,
          clientWidth: scrollContentContainerWidth,
          clientHeight: scrollContentContainerHeight,
        }).scrollTop;
      }

      return {
        ...prevState,
        ...{
          scrollTop: scrollTop,
          mounted: newProps.mounted,
          loading: newProps.loading,
          loadingData: newProps.loadingData,
          setRootState: newProps.setRootState,
          getRootState: newProps.getRootState,
          getRootNode: newProps.getRootNode,
          getClipBoardNode: newProps.getClipBoardNode,
          rootObject: newProps.rootObject,
          data: newProps.data,
          filteredList: newProps.filteredList,
          options: newProps.options,
          height: newProps.height,
          onBeforeEvent: newProps.onBeforeEvent,
          onAfterEvent: newProps.onAfterEvent,
          onScrollEnd: newProps.onScrollEnd,
          headerTable: newProps.headerTable,
          bodyRowTable: newProps.bodyRowTable,
          bodyRowMap: newProps.bodyRowMap,
          asideHeaderData: newProps.asideHeaderData,
          leftHeaderData: newProps.leftHeaderData,
          headerData: newProps.headerData,
          asideColGroup: newProps.asideColGroup,
          asideBodyRowData: newProps.asideBodyRowData,
          leftBodyRowData: newProps.leftBodyRowData,
          bodyRowData: newProps.bodyRowData,
          colGroup: newProps.colGroup,
          colGroupMap: newProps.colGroupMap,
          leftHeaderColGroup: newProps.leftHeaderColGroup,
          headerColGroup: newProps.headerColGroup,
          styles: newProps.styles,
          printStartColIndex: newProps.printStartColIndex,
          printEndColIndex: newProps.printEndColIndex,
          visibleHeaderColGroup: newProps.visibleHeaderColGroup,
          visibleBodyRowData: newProps.visibleBodyRowData,
          visibleBodyGroupingData: newProps.visibleBodyGroupingData,
        },
      };
    }
  }

  componentDidMount() {
    this.throttledUpdateDimensions = throttle(
      this.updateDimensions.bind(this),
      100,
    );
    window.addEventListener('resize', this.throttledUpdateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledUpdateDimensions);
  }

  updateDimensions() {
    const { scrollLeft = 0, scrollTop = 0 } = this.state;

    const styles = calculateDimensions(
      getNode(this.state.getRootNode),
      this.state,
    ).styles;

    const {
      scrollContentWidth = 0,
      scrollContentHeight = 0,
      scrollContentContainerWidth = 0,
      scrollContentContainerHeight = 0,
    } = styles;

    let {
      scrollLeft: newScrollLeft = 0,
      scrollTop: newScrollTop = 0,
    } = getScrollPosition(scrollLeft, scrollTop, {
      scrollWidth: scrollContentWidth,
      scrollHeight: scrollContentHeight,
      clientWidth: scrollContentContainerWidth,
      clientHeight: scrollContentContainerHeight,
    });

    this.setStoreState({
      styles: styles,
      scrollLeft: newScrollLeft,
      scrollTop: newScrollTop,
    });
  }

  // state 가 업데이트 되기 전.
  setStoreState = (newState: types.DataGridState) => {
    const {
      filteredList = [],
      scrollLeft = 0,
      scrollTop = 0,
      options = {},
      styles = {},
      headerColGroup = [],
      bodyRowData = { rows: [{ cols: [] }] },
      bodyGroupingData = { rows: [{ cols: [] }] },
      onScrollEnd,
    } = this.state;
    const { styles: propStyles } = this.props;
    const { frozenColumnIndex = 0 } = options;
    const { CTInnerWidth } = styles;
    const {
      scrollLeft: _scrollLeft,
      scrollTop: _scrollTop,
      styles: _styles = {},
      filteredList: _filteredList,
    } = newState;

    if (
      typeof _scrollLeft !== 'undefined' ||
      typeof _scrollTop !== 'undefined'
    ) {
      const {
        CTInnerWidth: _CTInnerWidth = 0,
        frozenPanelWidth: _frozenPanelWidth = 0,
        asidePanelWidth: _asidePanelWidth = 0,
        rightPanelWidth: _rightPanelWidth = 0,
        scrollContentWidth: scrollWidth = 0,
        scrollContentHeight: scrollHeight = 0,
        scrollContentContainerWidth: clientWidth = 0,
        scrollContentContainerHeight: clientHeight = 0,
      } = { ...styles, ..._styles };

      let endOfScrollTop: boolean = false;
      let endOfScrollLeft: boolean = false;

      if (typeof _scrollLeft !== 'undefined' && _scrollLeft !== scrollLeft) {
        if (CTInnerWidth !== _CTInnerWidth || scrollLeft !== _scrollLeft) {
          const {
            printStartColIndex,
            printEndColIndex,
          } = getPositionPrintColGroup(
            headerColGroup,
            Math.abs(_scrollLeft) + _frozenPanelWidth,
            Math.abs(_scrollLeft) +
              _frozenPanelWidth +
              (_CTInnerWidth -
                _asidePanelWidth -
                _frozenPanelWidth -
                _rightPanelWidth),
          );

          newState.printStartColIndex = printStartColIndex;
          newState.printEndColIndex = printEndColIndex;

          newState.visibleHeaderColGroup = headerColGroup.slice(
            printStartColIndex,
            printEndColIndex + 1,
          );
          newState.visibleBodyRowData = getTableByStartEndColumnIndex(
            bodyRowData,
            printStartColIndex + frozenColumnIndex,
            printEndColIndex + frozenColumnIndex,
          );
          newState.visibleBodyGroupingData = getTableByStartEndColumnIndex(
            bodyGroupingData,
            printStartColIndex + frozenColumnIndex,
            printEndColIndex + frozenColumnIndex,
          );
        }
        if (clientWidth >= scrollWidth + _scrollLeft) {
          endOfScrollLeft = true;
        }
      }

      if (typeof _scrollTop !== 'undefined' && _scrollTop !== scrollTop) {
        if (clientHeight >= scrollHeight + _scrollTop) {
          endOfScrollTop = true;
        }
      }

      if ((endOfScrollTop || endOfScrollLeft) && onScrollEnd) {
        onScrollEnd({
          endOfScrollTop,
          endOfScrollLeft,
        });
      }
    }

    if (_filteredList && filteredList.length !== _filteredList.length) {
      newState.styles = calculateDimensions(
        getNode(this.state.getRootNode),
        this.state,
        _filteredList,
      ).styles;
    }

    this.setState(newState);
  };

  dispatch = (
    dispatchType: DispatchTypes,
    param: types.DataGridDispatchParam,
  ) => {
    const {
      data = [],
      listSelectedAll = false,
      scrollLeft = 0,
      colGroup = [],
      getRootNode,
      focusedRow = 0,
      sortInfo = {},
      options = {},
    } = this.state;
    const { columnKeys: optionColumnKeys = {} } = options;
    const rootNode = getNode(getRootNode);
    let { filteredList = [] } = this.state;

    const proc = {
      [DispatchTypes.FILTER]: () => {
        const { colIndex, filterInfo } = param;
        const checkAll =
          filterInfo[colIndex] === false
            ? true
            : filterInfo[colIndex].__check_all__;

        if (checkAll) {
          filteredList =
            data &&
            data.filter((n: any) => {
              return !n[optionColumnKeys.deleted || '__deleted__'];
            });
        } else {
          filteredList = data.filter((n: any) => {
            if (n) {
              const value = n[colGroup[colIndex].key || ''];

              if (n[optionColumnKeys.deleted || '__deleted__']) {
                return false;
              }

              if (typeof value === 'undefined') {
                if (!filterInfo[colIndex].__UNDEFINED__) {
                  return false;
                }
              } else {
                if (!filterInfo[colIndex][value]) {
                  return false;
                }
              }

              return true;
            }
            return false;
          });
        }

        this.setStoreState({
          filteredList,
          filterInfo,
        });
      },
      [DispatchTypes.SORT]: () => {
        const { colIndex } = param;
        if (typeof colIndex !== 'undefined') {
          const { key: colKey = '' } = colGroup[colIndex];

          let currentSortInfo: { [key: string]: any } = {};
          let seq: number = 0;
          let sortInfoArray: any[] = [];

          const getValueByKey = function(_item: any, _key: string) {
            return _item[_key] || '';
          };

          for (let k in sortInfo) {
            if (sortInfo[k]) {
              currentSortInfo[k] = sortInfo[k];
              seq++;
            }
          }

          if (currentSortInfo[colKey]) {
            if (currentSortInfo[colKey].orderBy === 'desc') {
              currentSortInfo[colKey].orderBy = 'asc';
            } else if (currentSortInfo[colKey].orderBy === 'asc') {
              delete currentSortInfo[colKey];
            }
          } else {
            currentSortInfo[colKey] = {
              seq: seq++,
              orderBy: 'desc',
            };
          }

          for (let k in currentSortInfo) {
            if (currentSortInfo[k]) {
              sortInfoArray[currentSortInfo[k].seq] = {
                key: k,
                order: currentSortInfo[k].orderBy,
              };
            }
          }
          sortInfoArray = sortInfoArray.filter(o => typeof o !== 'undefined');

          let i = 0,
            l = sortInfoArray.length,
            aValue: any,
            bValue: any;

          const sortedList = filteredList.sort((a: any, b: any): any => {
            for (i = 0; i < l; i++) {
              aValue = getValueByKey(a, sortInfoArray[i].key);
              bValue = getValueByKey(b, sortInfoArray[i].key);

              if (typeof aValue !== typeof bValue) {
                aValue = '' + aValue;
                bValue = '' + bValue;
              }
              if (aValue < bValue) {
                return sortInfoArray[i].order === 'asc' ? -1 : 1;
              } else if (aValue > bValue) {
                return sortInfoArray[i].order === 'asc' ? 1 : -1;
              }
            }
          });

          this.setStoreState({
            sortInfo: currentSortInfo,
            filteredList: sortedList,
            isInlineEditing: false,
            inlineEditingCell: {},
          });
        }
      },
      [DispatchTypes.UPDATE]: () => {
        const { row, colIndex, value, eventWhichKey } = param;
        const key = colGroup[colIndex].key;

        let focusRow: number = focusedRow;

        if (key) {
          filteredList[row][key] = value;
          // update filteredList
        }

        if (eventWhichKey) {
          switch (eventWhichKey) {
            case KeyCodes.UP_ARROW:
              focusRow = focusedRow < 1 ? 0 : focusedRow - 1;
              break;
            case KeyCodes.DOWN_ARROW:
              focusRow =
                focusedRow + 1 >= filteredList.length
                  ? filteredList.length - 1
                  : focusedRow + 1;
              break;
            default:
              break;
          }
        }

        this.setStoreState({
          isInlineEditing: false,
          inlineEditingCell: {},
          selectionRows: {
            [focusRow]: true,
          },
          focusedRow: focusRow,
        });

        if (rootNode) {
          rootNode.focus();
        }
      },
      [DispatchTypes.RESIZE_COL]: () => {
        const { col, newWidth } = param;

        let newState: IDataGridStore = { ...this.state };
        if (newState.colGroup) {
          newState.colGroup[col.colIndex]._width = newState.colGroup[
            col.colIndex
          ].width = newWidth;
        }

        const {
          styles,
          leftHeaderColGroup,
          headerColGroup,
        } = calculateDimensions(rootNode, newState);

        this.setStoreState({
          scrollLeft,
          colGroup: colGroup,
          leftHeaderColGroup: leftHeaderColGroup,
          headerColGroup: headerColGroup,
          styles: styles,
          columnResizing: false,
        });
      },
      [DispatchTypes.SELECT]: () => {
        const { rowIndex, checked } = param;

        let rowSelected: boolean = false;
        let selectedAll: boolean = listSelectedAll;

        if (checked === true) {
          rowSelected = true;
        } else if (checked === false) {
          rowSelected = false;
        } else {
          rowSelected = !filteredList[rowIndex].__selected__;
        }

        if (!rowSelected) {
          selectedAll = false;
        }
        filteredList[rowIndex].__selected__ = rowSelected;

        this.setStoreState({
          listSelectedAll: selectedAll,
          selectedRowIndex: rowIndex,
          selectedRowIndexSelected: rowSelected,
        });
      },
      [DispatchTypes.SELECT_ALL]: () => {
        const { checked } = param;
        let selectedAll: boolean = listSelectedAll;
        if (checked === true) {
          selectedAll = true;
        } else if (checked === false) {
          selectedAll = false;
        } else {
          selectedAll = !selectedAll;
        }

        for (let i = 0, l = filteredList.length; i < l; i++) {
          filteredList[i].__selected__ = selectedAll;
        }

        this.setStoreState({
          listSelectedAll: selectedAll,
        });
      },
    };

    proc[dispatchType]();
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          ...{
            predefinedFormatter: { ...dataGridFormatter },
            setStoreState: this.setStoreState,
            dispatch: this.dispatch,
          },
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default { Provider: StoreProvider, Consumer };
