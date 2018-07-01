import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { types, EventNames, DispatchTypes } from '../stores';
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
  dispatch: (
    dispatchType: DispatchTypes,
    param: types.DataGridDispatchParam,
  ) => void;
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
  dispatch: () => {},
  setRootState: () => {},
  getRootState: () => {},
  getRootNode: () => {
    return undefined;
  },
};

const { Provider, Consumer } = React.createContext(store);

class StoreProvider extends React.Component<any, types.DataGridState> {
  state = store;

  throttledUpdateDimensions: any;

  static getDerivedStateFromProps(props: any, prevState: types.DataGridState) {
    // 만일 속성별 컨트롤을 하겠다면 여기에서.

    if (
      props.mounted === prevState.mounted &&
      props.setRootState === prevState.setRootState &&
      props.getRootState === prevState.getRootState &&
      props.getRootNode === prevState.getRootNode &&
      props.rootObject === prevState.rootObject &&
      props.data === prevState.data &&
      props.height === prevState.height &&
      props.columns === prevState.propColumns &&
      props.options === prevState.propOptions &&
      props.onBeforeEvent === prevState.onBeforeEvent &&
      props.onAfterEvent === prevState.onAfterEvent &&
      prevState.calculatedStyles === true
    ) {
      return null;
    }
    // 불필요한 렌더를 막으려면 렌더링이 필요한 상활을 잘 파악 해서 처리 헤야합니다.
    // console.log('run getDerivedStateFromProps');

    const {
      options = DataGrid.defaultOptions,
      styles = DataGrid.defaultStyles,
    } = prevState;
    const {
      columnKeys: optionColumnKeys = DataGrid.defaultColumnKeys,
    } = options;

    let changeState = false;
    let newState: types.DataGridState = { ...prevState };
    let currentOptions: types.DataGridOptions = {
      ...options,
    };
    let currentStyles: types.DataGridStyles = {
      ...styles,
    };

    newState.mounted = true;

    if (props.setRootState && props.setRootState !== prevState.setRootState) {
      newState.setRootState = props.setRootState;
    }
    if (props.getRootState && props.getRootState !== prevState.getRootState) {
      newState.getRootState = props.getRootState;
    }
    if (props.getRootNode && props.getRootNode !== prevState.getRootNode) {
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

    if (props.options !== prevState.propOptions) {
      changeState = true;
      newState.propOptions = props.options;
      newState.options = currentOptions = mergeAll(
        true,
        { ...DataGrid.defaultOptions },
        props.options,
      );
    }

    if (props.rootObject !== prevState.rootObject) {
      changeState = true;
      newState.rootObject = props.rootObject;
    }

    if (
      props.columns !== prevState.propColumns ||
      props.options !== prevState.propOptions
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

      newState.propColumns = props.columns;
      newState.styles = currentStyles;
    }

    if (props.mounted && !newState.calculatedStyles) {
      changeState = true;
      newState.calculatedStyles = true;

      const calculatedObject = calculateDimensions(
        newState.getRootNode && newState.getRootNode(),
        newState,
      );
      newState.styles = calculatedObject.styles;
      newState.colGroup = calculatedObject.colGroup;
      newState.leftHeaderColGroup = calculatedObject.leftHeaderColGroup;
      newState.headerColGroup = calculatedObject.headerColGroup;
    }

    return changeState ? newState : null;
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
    const styles = calculateDimensions(
      this.state.getRootNode && this.state.getRootNode(),
      this.state,
    ).styles;

    this.setState({ styles });
  }

  dispatch = (
    dispatchType: DispatchTypes,
    param: types.DataGridDispatchParam,
  ) => {
    const { filteredList } = this.state;

    const proc = {
      [DispatchTypes.SET_DATA]: () => {},
      [DispatchTypes.FILTER]: () => {},
      [DispatchTypes.SORT]: () => {},
      [DispatchTypes.UPDATE]: () => {},
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
            setStoreState: state => this.setState(state),
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
