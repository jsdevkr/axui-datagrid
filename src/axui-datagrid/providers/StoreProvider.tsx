import * as React from 'react';

import {
  calculateDimensions,
  setColGroupWidth,
  getVisibleColGroup,
} from '../utils';
import dataGridFormatter from '../functions/formatter';
import dataGridCollector from '../functions/collector';
import { IDataGrid } from '../common/@types';
import { DataGridEnums } from '../common/@enums';

export interface IDataGridStore extends IDataGrid.IStoreState {
  setStoreState: (store: IDataGrid.IStoreState, callback?: () => void) => void;
  dispatch: (
    dispatchType: DataGridEnums.DispatchTypes,
    param: IDataGrid.DispatchParam,
  ) => void;
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
      nProps.rowSelector === nState.rowSelector &&
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
      nProps.onRightClick === nState.onRightClick
    ) {
      return null;
    } else {
      // console.log(`run StoreProvider`);
      // store state | 현재 state복제
      const { options = {} } = nProps;
      const { frozenColumnIndex = 0, body: optionsBody } = options; // 옵션은 외부에서 받은 값을 사용하고 state에서 값을 수정하면 안됨.
      const storeState: IDataGrid.IStoreState = {
        ...nState,
      };

      storeState.loading = nProps.loading;
      storeState.loadingData = nProps.loadingData;
      storeState.data = nProps.data;
      storeState.width = nProps.width;
      storeState.height = nProps.height;
      storeState.selection = nProps.selection;
      storeState.rowSelector = nProps.rowSelector;
      storeState.options = nProps.options;
      storeState.status = nProps.status;
      storeState.rootNode = nProps.rootNode;
      storeState.clipBoardNode = nProps.clipBoardNode;
      storeState.rootObject = nProps.rootObject;
      storeState.onBeforeEvent = nProps.onBeforeEvent;
      storeState.onScroll = nProps.onScroll;
      storeState.onScrollEnd = nProps.onScrollEnd;
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

      // nProps의 scrollLeft, scrollTop 변경 되는 경우 나중에 고려

      const { frozenColumnIndex: PfrozenColumnIndex = 0 } =
        storeState.options || {};
      const changed = {
        colGroup: false,
        frozenColumnIndex: false,
        styles: false,
        visibleColGroup: false,
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

      // // 데이터가 변경됨.
      // if (nProps.data !== nState.data) {
      //   // 전달받은 data를 filteredList로 치환.
      //   _filteredList = getFilteredList(nProps.data || [], {
      //     colGroup: _colGroup,
      //     sorter: nState.sortInfo,
      //     options: nProps.options,
      //   });
      //   changed.filteredList = true;
      // }

      if (
        changed.colGroup ||
        changed.frozenColumnIndex ||
        !storeState.styles ||
        nProps.width !== nState.width ||
        nProps.height !== nState.height
      ) {
        // 스타일 초기화 안되어 있음.
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
        _scrollLeft = dimensions.scrollLeft;
        _scrollTop = dimensions.scrollTop;

        changed.styles = true;
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
      onScroll,
      onScrollEnd,
    } = this.state;
    const { frozenRowIndex = 0 } = options;
    const { bodyHeight = 0, bodyTrHeight = 0 } = styles;
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

          // console.log('onscroll left');

          if (clientWidth >= scrollWidth + _scrollLeft) {
            endOfScrollLeft = true;
          }
        }
      }

      if (typeof _scrollTop !== 'undefined' && _scrollTop !== scrollTop) {
        if (onScroll) {
          const sRowIndex =
            Math.floor(-_scrollTop / (bodyTrHeight || 1)) + frozenRowIndex;
          const eRowIndex =
            sRowIndex + Math.ceil(bodyHeight / (bodyTrHeight || 1)) + 1;

          onScroll({
            scrollLeft: Number(_scrollLeft),
            scrollTop: Number(_scrollTop),
            sRowIndex,
            eRowIndex,
          });
        }

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

    this.setState(() => newState, callback);
  };

  dispatch = (
    dispatchType: DataGridEnums.DispatchTypes,
    param: IDataGrid.DispatchParam,
  ) => {
    const {
      data = [],
      listSelectedAll = false,
      scrollLeft = 0,
      colGroup = [],
      rootNode,
      focusedRow = 0,
      sortInfo = {},
      options = {},
      rowSelector,
      selectionSRow,
      selectionSCol,
      selectionERow,
      selectionECol,
      selectionRows,
      selectionCols,
      selection,
    } = this.state;
    const onChangeSelected = rowSelector && rowSelector.onChange;
    const { columnKeys: optionColumnKeys = {} } = options;

    const proc = {
      [DataGridEnums.DispatchTypes.FILTER]: () => {
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
      },
      [DataGridEnums.DispatchTypes.SORT]: () => {
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

          if (onChangeSelected) {
            onChangeSelected({
              data: sortedList,
            });
          }
        }
      },
      [DataGridEnums.DispatchTypes.UPDATE]: () => {
        const { row, colIndex, value, eventWhichKey } = param;
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

        this.setStoreState({
          data: [...data],
          isInlineEditing: false,
          inlineEditingCell: {},
          selectionRows: {
            [focusRow]: true,
          },
          focusedRow: focusRow,
        });

        if (onChangeSelected) {
          onChangeSelected({
            data: data,
          });
        }

        if (rootNode && rootNode.current) {
          rootNode.current.focus();
        }
      },
      [DataGridEnums.DispatchTypes.RESIZE_COL]: () => {
        const { col, newWidth } = param;
        const { styles = {}, options = {} } = this.state;
        let _colGroup = [...(this.state.colGroup || [])];
        _colGroup[col.colIndex]._width = _colGroup[
          col.colIndex
        ].width = newWidth;

        this.setStoreState({
          colGroup: _colGroup,
          columnResizing: false,
        });
      },
      [DataGridEnums.DispatchTypes.SELECT]: () => {
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
          selectedRowIndex: rowIndex,
          selectedRowIndexSelected: rowSelected,
          data: [...data],
        });

        if (onChangeSelected) {
          onChangeSelected({
            data: data,
          });
        }
      },
      [DataGridEnums.DispatchTypes.SELECT_ALL]: () => {
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
          onChangeSelected({
            data: data,
          });
        }
      },
      [DataGridEnums.DispatchTypes.CHANGE_SELECTION]: () => {
        const { sRow, sCol, eRow, eCol } = param;

        if (
          selectionSRow !== sRow ||
          selectionSCol !== sCol ||
          selectionERow !== eRow ||
          selectionECol !== eCol
        ) {
          // console.log(sRow, sCol, eRow, eCol);
          if (
            selection &&
            selection.onChange &&
            selectionRows &&
            selectionCols
          ) {
            selection.onChange({
              rows: Object.keys(selectionRows).map(n => Number(n)),
              cols: Object.keys(selectionCols).map(n => Number(n)),
            });
          }

          this.setStoreState({
            selectionSRow: sRow,
            selectionSCol: sCol,
            selectionERow: eRow,
            selectionECol: eCol,
          });
        }
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

  componentDidUpdate(
    pProps: IDataGrid.IStoreProps,
    pState: IDataGrid.IStoreState,
  ) {
    // console.log('store did update');
  }

  componentWillUnmount() {
    // console.log('store unMount');
  }
}

export default { Provider: StoreProvider, Consumer };
