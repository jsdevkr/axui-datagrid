import * as React from 'react';
import { types, EventNames } from '../stores';
import { DataGrid } from '../containers';
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
  getMousePosition,
  arrayFromRange,
} from '../utils';
import dataGridFormatter from '../functions/formatter';

export interface IDataGridStore extends types.DataGridState {
  setStoreState: (store: types.DataGridState) => void;
}

function getValueNotUndefined(value1: any, value2: any, value3: any) {
  if (typeof value1 !== 'undefined' && value1 !== null) {
    return value1;
  } else if (typeof value2 !== 'undefined' && value2 !== null) {
    return value2;
  } else {
    return value3;
  }
}

const store: IDataGridStore = {
  mounted: false,
  dragging: false,
  data: [],
  filteredList: [],

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
  setRootState: () => {},
  getRootState: () => {},
  getRootNode: () => {
    return undefined;
  },
};

const { Provider, Consumer } = React.createContext(store);

class StoreProvider extends React.Component<any, types.DataGridState> {
  state = {
    calculatedStyles: false,
    rootObject: undefined,
  };

  static getDerivedStateFromProps(props: any, prevState: types.DataGridState) {
    // 만일 속성별 컨트롤을 하겠다면 여기에서.
    const {
      options = DataGrid.defaultOptions,
      styles = DataGrid.defaultStyles,
    } = prevState;
    const {
      columnKeys: optionColumnKeys = DataGrid.defaultColumnKeys,
    } = options;

    let changeState = false;
    let newState: types.DataGridState = { ...prevState };

    /*
      mounted: props.mounted,
      calculatedStyles: getValueNotUndefined(
        props.calculatedStyles,
        prevState.calculatedStyles,
        false,
      ),
      options: options,
      styles: styles,
      setRootState: props.setRootState,
      getRootState: props.getRootState,
      getRootNode: props.getRootNode,
    
     */

    let currentOptions: types.DataGridOptions = {
      ...options,
    };
    let currentStyles: types.DataGridStyles = {
      ...styles,
    };

    if (props.setRootState) {
      newState.setRootState = props.setRootState;
    }
    if (props.getRootState) {
      newState.getRootState = props.getRootState;
    }
    if (props.getRootNode) {
      newState.getRootNode = props.getRootNode;
    }

    if (props.data !== prevState.data) {
      changeState = true;
      newState.data = props.data || [];
      newState.filteredList =
        newState.data &&
        newState.data.filter((n: any) => {
          return !n[optionColumnKeys.deleted || '__deleted__'];
        });
    }

    if (props.height !== prevState.height) {
      changeState = true;
      newState.height = props.height;
    }

    if (JSON.stringify(props.options) !== prevState.optionsString) {
      changeState = true;
      newState.options = currentOptions = mergeAll(
        true,
        { ...DataGrid.defaultOptions },
        props.options,
      );
      newState.optionsString = JSON.stringify(props.options);
    }

    if (props.rootObject !== prevState.rootObject) {
      changeState = true;
      newState.rootObject = props.rootObject;
    }

    if (
      JSON.stringify(props.columns) !== prevState.columnsString ||
      JSON.stringify(props.options) !== prevState.optionsString
    ) {
      changeState = true;

      const {
        frozenColumnIndex = DataGrid.defaultOptions.frozenColumnIndex,
        body: optionsBody = DataGrid.defaultBody,
      } = currentOptions;
      const { columnHeight = 0 } = optionsBody;

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

    if (props.mounted && !newState.calculatedStyles) {
      changeState = true;
      newState.calculatedStyles = true;

      console.log(newState);

      const calculatedObject = calculateDimensions(
        newState.getRootNode && newState.getRootNode(),
        newState,
      );
      newState.styles = calculatedObject.styles;
      newState.colGroup = calculatedObject.colGroup;
      newState.leftHeaderColGroup = calculatedObject.leftHeaderColGroup;
      newState.headerColGroup = calculatedObject.headerColGroup;
    }

    if (changeState) {
      // console.table(newState);
    }

    return changeState ? newState : null;
  }

  render() {
    const { rootObject } = this.state;

    return (
      <Provider
        value={{
          ...this.state,
          ...{
            predefinedFormatter: { ...dataGridFormatter },
            setStoreState: state => this.setState(state),
          },
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default { Provider: StoreProvider, Consumer };
