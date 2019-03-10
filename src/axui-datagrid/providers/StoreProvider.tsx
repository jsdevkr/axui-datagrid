import * as React from 'react';

import {
  calculateDimensions,
  setColGroupWidth,
  getVisibleColGroup,
  getScrollPosition,
  throttle,
  debounce,
} from '../utils';
import dataGridFormatter from '../functions/formatter';
import dataGridCollector from '../functions/collector';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from '../common/@enums';

export interface IDataGridStore extends IDataGrid.IStoreState {
  setStoreState: IDataGrid.setStoreState;
  dispatch: IDataGrid.dispatch;
}

const store: IDataGridStore = {
  // 데이터 그리드 내부에서 사용하는 상태의 기본형.
  sortInfo: {},
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
  selectionSRow: -1,
  selectionSCol: -1,
  selectionERow: -1,
  selectionECol: -1,
  columnResizing: false,
  columnResizerLeft: 0,

  loading: false,
  loadingData: false,

  width: 0,
  height: 0,
  data: [],
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
  status: '',
  styles: undefined,

  predefinedFormatter: {},
  predefinedCollector: {},
  setStoreState: () => {},
  dispatch: () => {},
};

const { Provider, Consumer } = React.createContext(store);

class StoreProvider extends React.Component<
  IDataGrid.IStoreProps,
  IDataGrid.IStoreState
> {
  state = store;

  static getDerivedStateFromProps(
    nProps: IDataGrid.IStoreProps,
    nState: IDataGrid.IStoreState,
  ) {
    // console.log('getDerivedStateFromProps ~~');

    // console.log('nProps.colGroup === nState.colGroup', nState.colGroup);
    if (
      nProps.loading === nState.loading &&
      nProps.loadingData === nState.loadingData &&
      nProps.data === nState.data &&
      nProps.selection === nState.selection &&
      nProps.selectedRowKeys === nState.selectedRowKeys &&
      nProps.width === nState.width &&
      nProps.height === nState.height &&
      nProps.scrollLeft === nState.scrollLeft &&
      nProps.scrollTop === nState.scrollTop &&
      nProps.columnHeight === nState.columnHeight &&
      nProps.options === nState.options &&
      nProps.status === nState.status &&
      //
      nProps.headerColGroup === nState.headerColGroup &&
      nProps.headerTable === nState.headerTable &&
      nProps.headerData === nState.headerData &&
      nProps.asideHeaderData === nState.asideHeaderData &&
      nProps.leftHeaderData === nState.leftHeaderData &&
      //
      nProps.bodyRowTable === nState.bodyRowTable &&
      nProps.bodyRowData === nState.bodyRowData &&
      nProps.bodyRowMap === nState.bodyRowMap &&
      //
      nProps.asideBodyRowData === nState.asideBodyRowData &&
      nProps.leftBodyRowData === nState.leftBodyRowData &&
      //
      nProps.colGroup === nState.colGroup &&
      nProps.colGroupMap === nState.colGroupMap &&
      nProps.asideColGroup === nState.asideColGroup &&
      nProps.leftHeaderColGroup === nState.leftHeaderColGroup &&
      //
      nProps.rootNode === nState.rootNode &&
      nProps.clipBoardNode === nState.clipBoardNode &&
      //
      nProps.rootObject === nState.rootObject &&
      nProps.onBeforeEvent === nState.onBeforeEvent &&
      nProps.onScroll === nState.onScroll &&
      nProps.onScrollEnd === nState.onScrollEnd &&
      nProps.onChangeScrollSize === nState.onChangeScrollSize &&
      nProps.onChangeSelection === nState.onChangeSelection &&
      nProps.onChangeSelected === nState.onChangeSelected &&
      nProps.onRightClick === nState.onRightClick
    ) {
      return null;
      // } else if (nState.pScrollTop && nProps.scrollTop === nState.pScrollTop) {
      //   console.log('????????');
      //   return null;
    } else {
      // store state | 현재 state복제
      const { options = {} } = nProps;
      const { frozenColumnIndex = 0, body: optionsBody } = options; // 옵션은 외부에서 받은 값을 사용하고 state에서 값을 수정하면 안됨.
      const storeState: IDataGrid.IStoreState = {
        ...nState,
      };

      // scrollTop prop 저장
      storeState.pScrollTop = nProps.scrollTop;
      storeState.pScrollLeft = nProps.scrollLeft;
      storeState.loading = nProps.loading;
      storeState.loadingData = nProps.loadingData;

      storeState.width = nProps.width;
      storeState.height = nProps.height;
      storeState.selection = nProps.selection;
      storeState.selectedRowKeys = nProps.selectedRowKeys;
      storeState.options = nProps.options;
      storeState.status = nProps.status;
      storeState.rootNode = nProps.rootNode;
      storeState.clipBoardNode = nProps.clipBoardNode;
      storeState.rootObject = nProps.rootObject;
      storeState.onBeforeEvent = nProps.onBeforeEvent;
      storeState.onScroll = nProps.onScroll;
      storeState.onScrollEnd = nProps.onScrollEnd;
      storeState.onChangeScrollSize = nProps.onChangeScrollSize;
      storeState.onChangeSelection = nProps.onChangeSelection;
      storeState.onChangeSelected = nProps.onChangeSelected;
      storeState.onRightClick = nProps.onRightClick;
      ///
      storeState.headerTable = nProps.headerTable;
      storeState.bodyRowTable = nProps.bodyRowTable;
      storeState.bodyRowMap = nProps.bodyRowMap;
      storeState.asideHeaderData = nProps.asideHeaderData;
      storeState.leftHeaderData = nProps.leftHeaderData;
      storeState.headerData = nProps.headerData;
      storeState.asideBodyRowData = nProps.asideBodyRowData;
      storeState.leftBodyRowData = nProps.leftBodyRowData;
      storeState.bodyRowData = nProps.bodyRowData;
      storeState.colGroupMap = nProps.colGroupMap;
      storeState.asideColGroup = nProps.asideColGroup;
      storeState.autofitColGroup = nProps.autofitColGroup;
      storeState.colGroup = nProps.colGroup;
      storeState.footSumColumns = nProps.footSumColumns;
      storeState.footSumTable = nProps.footSumTable;
      storeState.leftFootSumData = nProps.leftFootSumData;
      storeState.footSumData = nProps.footSumData;

      const { frozenColumnIndex: PfrozenColumnIndex = 0 } =
        storeState.options || {};
      const changed = {
        colGroup: false,
        frozenColumnIndex: false,
        styles: false,
        visibleColGroup: false,
        data: false,
      };

      // 다른 조건식 안에서 변경하여 처리할 수 있는 변수들 언더바(_)로 시작함.
      let {
        colGroup: _colGroup = [],
        leftHeaderColGroup: _leftHeaderColGroup,
        headerColGroup: _headerColGroup,
        styles: _styles,
        scrollLeft: _scrollLeft = 0,
        scrollTop: _scrollTop = 0,
      } = storeState;

      // colGroup들의 너비합을 모르거나 변경된 경우.
      // colGroup > width 연산
      if (
        nProps.colGroup !== nState.colGroup ||
        nProps.options !== nState.options
      ) {
        _colGroup = setColGroupWidth(
          nProps.colGroup || [],
          { width: nProps.width || 0 },
          nProps.options,
        );
        changed.colGroup = true;
      }

      if (changed.colGroup || frozenColumnIndex !== PfrozenColumnIndex) {
        _leftHeaderColGroup = _colGroup.slice(0, frozenColumnIndex);
        _headerColGroup = _colGroup.slice(frozenColumnIndex);
        changed.frozenColumnIndex = true;
      }

      // case of change datalength
      if (nProps.data !== nState.data) {
        changed.data = true;
        storeState.data = nProps.data;
      }

      if (
        changed.data ||
        changed.colGroup ||
        changed.frozenColumnIndex ||
        !storeState.styles ||
        nProps.width !== nState.width ||
        nProps.height !== nState.height
      ) {
        // 스타일 초기화 안되어 있거나 크기를 다시 결정해야 하는 경우.
        const dimensions = calculateDimensions(storeState, {
          headerTable: nProps.headerTable,
          colGroup: _colGroup,
          headerColGroup: _headerColGroup,
          bodyRowTable: nProps.bodyRowTable,
          footSumColumns: nProps.footSumColumns,
          data: nProps.data,
          options: nProps.options,
        });
        _styles = dimensions.styles;
        _scrollTop = dimensions.scrollTop;
        _scrollLeft = dimensions.scrollLeft;

        changed.styles = true;
      }

      if (changed.styles) {
        const {
          scrollContentWidth = 0,
          scrollContentHeight = 0,
          scrollContentContainerWidth = 0,
          scrollContentContainerHeight = 0,
        } = _styles || {};
        const {
          scrollTop: currScrollTop = 0,
          scrollLeft: currScrollLeft = 0,
        } = getScrollPosition(_scrollLeft || 0, _scrollTop || 0, {
          scrollWidth: scrollContentWidth,
          scrollHeight: scrollContentHeight,
          clientWidth: scrollContentContainerWidth,
          clientHeight: scrollContentContainerHeight,
        });

        _scrollTop = currScrollTop;
        _scrollLeft = currScrollLeft;
      }

      if (
        nProps.scrollTop !== nState.pScrollTop ||
        nProps.scrollLeft !== nState.pScrollLeft
      ) {
        // console.log(
        //   'change scrollTop, left by prop',
        //   nProps.scrollTop,
        //   nState.pScrollTop,
        //   nState.scrollTop,
        // );
        const {
          scrollContentWidth = 0,
          scrollContentHeight = 0,
          scrollContentContainerWidth = 0,
          scrollContentContainerHeight = 0,
        } = _styles || {};
        let {
          scrollLeft: currScrollLeft = 0,
          scrollTop: currScrollTop = 0,
        } = getScrollPosition(nProps.scrollLeft || 0, nProps.scrollTop || 0, {
          scrollWidth: scrollContentWidth,
          scrollHeight: scrollContentHeight,
          clientWidth: scrollContentContainerWidth,
          clientHeight: scrollContentContainerHeight,
        });
        _scrollLeft = currScrollLeft;
        _scrollTop = currScrollTop;

        // _scrollLeft = nProps.scrollLeft || 0;
        // _scrollTop = nProps.scrollTop || 0;
      }

      if (nProps.selection !== nState.selection) {
        storeState.selection = nProps.selection;

        const { rows = [], cols = [], focusedRow = -1, focusedCol = -1 } =
          nProps.selection || {};

        storeState.selectionRows = {};
        storeState.selectionCols = {};
        rows.forEach(n => {
          storeState.selectionRows![n] = true;
        });
        cols.forEach(n => {
          storeState.selectionCols![n] = true;
        });

        storeState.focusedRow = focusedRow;
        storeState.focusedCol = focusedCol;
      }

      // 스타일 정의가 되어 있지 않은 경우 : 그리드가 한번도 그려진 적이 없는 상태.
      if (
        changed.colGroup ||
        changed.frozenColumnIndex ||
        !storeState.styles ||
        nProps.width !== nState.width
      ) {
        const visibleData = getVisibleColGroup(_headerColGroup, {
          scrollLeft: _scrollLeft,
          bodyRowData: storeState.bodyRowData,
          footSumData: storeState.footSumData,
          styles: _styles,
          options: storeState.options,
        });

        storeState.visibleHeaderColGroup = visibleData.visibleHeaderColGroup;
        storeState.visibleBodyRowData = visibleData.visibleBodyRowData;
        storeState.visibleFootSumData = visibleData.visibleFootSumData;
        storeState.printStartColIndex = visibleData.printStartColIndex;
        storeState.printEndColIndex = visibleData.printEndColIndex;

        changed.colGroup = true;
      }

      // 언더바로 시작하는 변수를 상태에 전달하기 위해 주입.
      storeState.colGroup = _colGroup;
      storeState.leftHeaderColGroup = _leftHeaderColGroup;
      storeState.headerColGroup = _headerColGroup;
      storeState.styles = _styles;
      storeState.scrollLeft = _scrollLeft;
      storeState.scrollTop = _scrollTop;

      return storeState;
    }
  }

  // state 가 업데이트 되기 전.
  setStoreState = (newState: IDataGrid.IStoreState, callback?: () => void) => {
    const {
      data = [],
      scrollLeft = 0,
      scrollTop = 0,
      options = {},
      styles = {},
      headerColGroup = [],
      bodyRowData = { rows: [{ cols: [] }] },
      footSumData = { rows: [{ cols: [] }] },
      onScrollEnd,
    } = this.state;
    const { scrollLeft: _scrollLeft, scrollTop: _scrollTop } = newState;

    if (!newState.styles) {
      newState.styles = { ...styles };
    }

    if (
      typeof _scrollLeft !== 'undefined' ||
      typeof _scrollTop !== 'undefined'
    ) {
      const {
        scrollContentWidth: scrollWidth = 0,
        scrollContentHeight: scrollHeight = 0,
        scrollContentContainerWidth: clientWidth = 0,
        scrollContentContainerHeight: clientHeight = 0,
      } = newState.styles;

      let endOfScrollTop: boolean = false;
      let endOfScrollLeft: boolean = false;

      if (typeof _scrollLeft !== 'undefined') {
        if (scrollLeft !== _scrollLeft) {
          const visibleData = getVisibleColGroup(headerColGroup, {
            scrollLeft: _scrollLeft,
            bodyRowData: bodyRowData,
            footSumData: footSumData,
            styles: newState.styles,
            options: options,
          });

          newState.visibleHeaderColGroup = visibleData.visibleHeaderColGroup;
          newState.visibleBodyRowData = visibleData.visibleBodyRowData;
          newState.visibleFootSumData = visibleData.visibleFootSumData;
          newState.printStartColIndex = visibleData.printStartColIndex;
          newState.printEndColIndex = visibleData.printEndColIndex;

          if (clientWidth >= scrollWidth + _scrollLeft) {
            endOfScrollLeft = true;
          }
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

    // if (_filteredList && filteredList.length !== _filteredList.length) {
    //   const dimensions = calculateDimensions(newState, {
    //     headerTable: newState.headerTable || this.state.headerTable,
    //     colGroup: newState.colGroup || this.state.colGroup,
    //     headerColGroup: newState.headerColGroup || this.state.headerColGroup,
    //     bodyRowTable: newState.bodyRowTable || this.state.bodyRowTable,
    //     footSumColumns: newState.footSumColumns || this.state.footSumColumns,
    //     filteredList: _filteredList,
    //     options: newState.options || this.state.options,
    //   });

    //   newState.styles = dimensions.styles;
    //   newState.scrollLeft = dimensions.scrollLeft;
    //   newState.scrollTop = dimensions.scrollTop;
    // }

    this.setState(newState, callback);
  };

  dispatch = (
    dispatchType: DataGridEnums.DispatchTypes,
    param: IDataGrid.DispatchParam,
  ) => {
    const {
      data = [],
      listSelectedAll = false,
      colGroup = [],
      rootNode,
      focusedRow = -1,
      sortInfo = {},
      options = {},
      selectedRowKeys,
      selectionSRow,
      selectionSCol,
      selectionERow,
      selectionECol,
      selectionRows,
      selectionCols,
      selection,
      onChangeSelected,
    } = this.state;

    switch (dispatchType) {
      case DataGridEnums.DispatchTypes.FILTER:
        {
          // const { colIndex, filterInfo } = param;
          // const checkAll =
          //   filterInfo[colIndex] === false
          //     ? true
          //     : filterInfo[colIndex]._check_all_;
          // if (checkAll) {
          //   filteredList =
          //     data &&
          //     data.filter((n: any) => {
          //       return (
          //         typeof n === 'undefined' ||
          //         !n[optionColumnKeys.deleted || '_deleted_']
          //       );
          //     });
          // } else {
          //   filteredList = data.filter((n: any) => {
          //     if (n) {
          //       const value = n && n[colGroup[colIndex].key || ''];
          //       if (
          //         typeof n === 'undefined' ||
          //         n[optionColumnKeys.deleted || '_deleted_']
          //       ) {
          //         return false;
          //       }
          //       if (typeof value === 'undefined') {
          //         if (!filterInfo[colIndex]._UNDEFINED_) {
          //           return false;
          //         }
          //       } else {
          //         if (!filterInfo[colIndex][value]) {
          //           return false;
          //         }
          //       }
          //       return true;
          //     }
          //     return false;
          //   });
          // }
          // this.setStoreState({
          //   filteredList,
          //   filterInfo,
          //   scrollTop: 0,
          // });
          // if (onChangeSelected) {
          //   onChangeSelected({
          //     filteredList,
          //   });
          // }
        }
        break;

      case DataGridEnums.DispatchTypes.SORT:
        {
          const { colIndex } = param;
          if (typeof colIndex === 'undefined') {
            return;
          }
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

          const sortedList = data.sort(
            (a: any, b: any): any => {
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
            },
          );

          this.setStoreState({
            sortInfo: { ...currentSortInfo },
            data: sortedList,
            isInlineEditing: false,
            inlineEditingCell: {},
          });
        }
        break;

      case DataGridEnums.DispatchTypes.UPDATE:
        {
          const {
            row,
            colIndex,
            value,
            eventWhichKey,
            keepEditing = false,
          } = param;
          const key = colGroup[colIndex].key;

          let focusRow: number = focusedRow;

          if (key) {
            data[row][key] = value;
            // update filteredList
          }

          if (eventWhichKey) {
            switch (eventWhichKey) {
              case DataGridEnums.KeyCodes.UP_ARROW:
                focusRow = focusedRow < 1 ? 0 : focusedRow - 1;
                break;
              case DataGridEnums.KeyCodes.DOWN_ARROW:
                focusRow =
                  focusedRow + 1 >= data.length
                    ? data.length - 1
                    : focusedRow + 1;
                break;
              default:
                break;
            }
          }

          if (!keepEditing) {
            this.setStoreState({
              data: [...data],
              isInlineEditing: false,
              inlineEditingCell: {},
              selectionRows: {
                [focusRow]: true,
              },
              focusedRow: focusRow,
            });

            if (rootNode && rootNode.current) {
              rootNode.current.focus();
            }
          } else {
            this.setStoreState({
              data: [...data],
            });
          }
        }
        break;

      case DataGridEnums.DispatchTypes.RESIZE_COL:
        {
          const { col, newWidth } = param;
          let _colGroup = [...(this.state.colGroup || [])];
          _colGroup[col.colIndex]._width = _colGroup[
            col.colIndex
          ].width = newWidth;

          this.setStoreState({
            colGroup: _colGroup,
            columnResizing: false,
          });
        }
        break;

      case DataGridEnums.DispatchTypes.SELECT:
        {
          const { rowIndex, checked } = param;

          let rowSelected: boolean = false;
          let selectedAll: boolean = listSelectedAll;

          if (checked === true) {
            rowSelected = true;
          } else if (checked === false) {
            rowSelected = false;
          } else {
            rowSelected = !data[rowIndex]._selected_;
          }

          if (!rowSelected) {
            selectedAll = false;
          }
          data[rowIndex]._selected_ = rowSelected;

          this.setStoreState({
            listSelectedAll: selectedAll,
            data: [...data],
          });

          if (onChangeSelected) {
            const selectedIndexes: number[] = [];
            const selectedList = data.filter((n, i) => {
              if (n._selected_) {
                selectedIndexes.push(i);
              }
              return n._selected_;
            });

            onChangeSelected({
              selectedList,
              selectedIndexes,
            });
          }
        }
        break;

      case DataGridEnums.DispatchTypes.SELECT_ALL:
        {
          const { checked } = param;
          let selectedAll: boolean = listSelectedAll;
          if (checked === true) {
            selectedAll = true;
          } else if (checked === false) {
            selectedAll = false;
          } else {
            selectedAll = !selectedAll;
          }

          for (let i = 0, l = data.length; i < l; i++) {
            data[i]._selected_ = selectedAll;
          }

          this.setStoreState({
            listSelectedAll: selectedAll,
            data: [...data],
          });

          if (onChangeSelected) {
            const selectedIndexes: number[] = [];
            const selectedList = data.filter((n, i) => {
              if (n._selected_) {
                selectedIndexes.push(i);
              }
              return n._selected_;
            });

            onChangeSelected({
              selectedList,
              selectedIndexes,
            });
          }
        }
        break;

      case DataGridEnums.DispatchTypes.CHANGE_SELECTION:
        {
          const {
            sRow,
            sCol,
            eRow,
            eCol,
            focusedRow: fRow,
            focusedCol: fCol,
          } = param;

          if (
            selectionSRow !== sRow ||
            selectionSCol !== sCol ||
            selectionERow !== eRow ||
            selectionECol !== eCol
          ) {
            // console.log(sRow, sCol, eRow, eCol);
            this.setStoreState({
              selectionSRow: sRow,
              selectionSCol: sCol,
              selectionERow: eRow,
              selectionECol: eCol,
            });
          }
        }
        break;

      case DataGridEnums.DispatchTypes.FOCUS_ROOT:
        if (rootNode && rootNode.current) {
          rootNode.current.focus();
        }
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          ...{
            predefinedFormatter: { ...dataGridFormatter },
            predefinedCollector: { ...dataGridCollector },
            setStoreState: this.setStoreState,
            dispatch: this.dispatch,
          },
        }}
      >
        {this.props.children}
      </Provider>
    );
  }

  componentDidMount() {
    // console.log('store did mount');
  }

  // tslint:disable-next-line: member-ordering
  lazyComponentDidUpdate = throttle((pState: IDataGrid.IStoreState) => {
    const { onScroll } = this.props;
    const {
      scrollLeft = 0,
      scrollTop = 0,
      options: { frozenRowIndex = 0 } = {},
      styles: {
        scrollContentContainerHeight = 0,
        scrollContentHeight = 0,
        scrollContentContainerWidth = 0,
        scrollContentWidth = 0,
        bodyTrHeight = 0,
        bodyHeight = 0,
      } = {},
      onChangeSelection,
    } = this.state;

    // detect change scrollContent
    if (pState.styles) {
      const {
        scrollContentHeight: _scrollContentHeight,
        scrollContentWidth: _scrollContentWidth,
      } = pState.styles;

      if (
        scrollContentHeight !== _scrollContentHeight ||
        scrollContentWidth !== _scrollContentWidth
      ) {
        this.props.onChangeScrollSize &&
          this.props.onChangeScrollSize({
            scrollContentContainerHeight,
            scrollContentHeight,
            scrollContentContainerWidth,
            scrollContentWidth,
            bodyTrHeight,
          });
      }
    }

    // detect change scrollTop
    if (pState.scrollTop !== this.state.scrollTop) {
      if (onScroll) {
        const sRowIndex =
          Math.floor(-scrollTop / (bodyTrHeight || 1)) + frozenRowIndex;
        const eRowIndex =
          sRowIndex + Math.ceil(bodyHeight / (bodyTrHeight || 1)) + 1;

        onScroll({
          scrollLeft: Number(scrollLeft),
          scrollTop: Number(scrollTop),
          sRowIndex,
          eRowIndex,
        });
      }
    }

    // detect change selection
    if (
      onChangeSelection &&
      (pState.focusedRow !== this.state.focusedRow ||
        pState.focusedCol !== this.state.focusedCol ||
        pState.selectionSRow !== this.state.selectionSRow ||
        pState.selectionERow !== this.state.selectionERow ||
        pState.selectionSCol !== this.state.selectionSCol ||
        pState.selectionECol !== this.state.selectionECol)
    ) {
      const {
        selectionRows = [],
        selectionCols = [],
        focusedRow = -1,
        focusedCol = -1,
      } = this.state;
      onChangeSelection({
        rows: Object.keys(selectionRows).map(n => Number(n)),
        cols: Object.keys(selectionCols).map(n => Number(n)),
        focusedRow,
        focusedCol,
      });
    }
  }, 200);

  componentDidUpdate(
    pProps: IDataGrid.IStoreProps,
    pState: IDataGrid.IStoreState,
  ) {
    this.lazyComponentDidUpdate(pState);

    // if (this.lazyTimer) {
    //   clearTimeout(this.lazyTimer);
    // }
    // this.lazyTimer = setTimeout(() => {
    //   this.lazyComponentDidUpdate(pState);
    //   clearTimeout(this.lazyTimer);
    // }, 200);
  }

  componentWillUnmount() {
    // console.log('store unMount');
  }
}

export default { Provider: StoreProvider, Consumer };
