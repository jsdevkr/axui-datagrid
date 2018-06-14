import * as React from 'react';
import { types } from '../stores';

export interface IDataGridState {
  data?: any[];
  filteredList?: any[];
  height?: number;

  columnsString?: string; // 원본과 비교를 위한 JSON.stringify 값
  styleString?: string;
  optionsString?: string;
  onBeforeEvent?: () => void;
  onAfterEvent?: () => void;

  scrollLeft?: number;
  scrollTop?: number;
  focusedRow?: number;
  focusedCol?: number;
  colGroup?: types.DataGridColumn[];
  colGroupMap?: {};
  asideColGroup?: types.DataGridColumn[];
  leftHeaderColGroup?: types.DataGridColumn[];
  headerColGroup?: types.DataGridColumn[];
  bodyGrouping?: types.DataGridColumn[];
  headerTable?: types.DataGridColumnTableMap;
  asideHeaderData?: {};
  leftHeaderData?: {};
  headerData?: {};
  bodyRowTable?: types.DataGridColumnTableMap;
  asideBodyRowData?: {};
  leftBodyRowData?: {};
  bodyRowData?: {};
  bodyRowMap?: {};
  bodyGroupingTable?: types.DataGridColumnTableMap;
  asideBodyGroupingData?: {};
  leftBodyGroupingData?: {};
  bodyGroupingData?: {};
  bodyGroupingMap?: {};
  footSumColumns?: types.DataGridColumn[];
  footSumTable?: {}; // footSum의 출력레이아웃
  leftFootSumData?: {}; // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 왼쪽
  footSumData?: {}; // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 오른쪽
  styles?: types.DataGridStyles;
  options?: types.DataGridOptions;
}

export interface IDataGridStore extends IDataGridState {
  dispatch: (store: IDataGridState) => void;
}

const store: IDataGridStore = {
  data: [],
  dispatch: () => {},
};

const { Provider, Consumer } = React.createContext(store);

class StoreProvider extends React.Component<{}, IDataGridState> {
  state = {
    data: [],
  };

  static getDerivedStateFromProps(
    props: IDataGridStore,
    state: IDataGridState,
  ) {
    if (props.data !== state.data) {
      return {
        data: props.data,
      };
    }

    return null;
  }

  render() {
    // console.log(this.props, this.state.data);

    return (
      <Provider
        value={{
          data: this.state.data,
          dispatch: state => this.setState(state),
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default { Provider: StoreProvider, Consumer };
