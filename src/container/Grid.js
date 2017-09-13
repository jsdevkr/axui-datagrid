import React from 'react';
import {connect} from 'react-redux';
import * as act from '../actions';

//~~~~~
class AX6UIReactGrid extends React.Component {
  constructor(props) {
    super(props);

    //console.log(props);
    this.props.initData();
    
    /*
    let stateForData = UTIL.getStateForData(this.props.data);
    // todo getStateForData 에서 컨버팅 할 데이터들 다시 확인

    // state init
    this.state = {
      dataOfList: stateForData.dataOfList,
      dataOfPage: stateForData.dataOfPage,
      proxyList: stateForData.proxyList,
      deletedList: [],

      bodyTrHeight: 0, // 한줄의 높이
      scrollContentWidth: 0, // 스크롤 될 내용물의 너비 (스크롤 될 내용물 : panel['body-scroll'] 안에 컬럼이 있는)
      scrollContentHeight: 0, // 스크롤 된 내용물의 높이
      scrollTimer: null,
      columns: [],
      colGroup: [],
      footSumColumns: [],
      bodyGrouping: [],
      sortInfo: {},
      focused: false,
      focusedColumn: {}, // 그리드 바디의 포커스된 셀 정보
      selectedColumn: {}, // 그리드 바디의 선택된 셀 정보
      isInlineEditing: false,
      inlineEditing: {},
      listIndexMap: {}, // tree데이터 사용시 데이터 인덱싱 맵
      headerTable: {},
      leftHeaderData: {},
      headerData: {},
      rightHeaderData: {},
      bodyRowTable: {},
      leftBodyRowData: {},
      bodyRowData: {},
      rightBodyRowData: {},
      bodyRowMap: {},
      bodyGroupingTable: {},
      leftBodyGroupingData: {},
      bodyGroupingData: {},
      rightBodyGroupingData: {},
      bodyGroupingMap: {},
      footSumTable: {}, // footSum의 출력레이아웃
      leftFootSumData: {}, // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 왼쪽
      footSumData: {}, // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 오른쪽
      needToPaintSum: true, // 데이터 셋이 변경되어 summary 변경 필요여부
    };
    this.dom = {
      container_hidden: null,
      container_header: null,
      container_body: null,
      container_page: null
    };
    */
  }

  componentDidMount() {
    // setData.call(this);

    // this.dom.container_hidden.style.display = "block";
  }

  componentWillUnmount() {

  }

  componentWillReceiveProps(newProps) {

    // 새로운 array가 속성값으로 왔을경우
    // console.log("this.props.data === newProps.data", this.props.data === newProps.data);
    if (this.props.data !== newProps.data) {
      // 데이터가 변경된 경우
      let stateForData = UTIL.getStateForData(newProps.data);
      this.setState({
        dataOfList: stateForData.dataOfList,
        dataOfPage: stateForData.dataOfPage,
        proxyList: stateForData.proxyList,
        deletedList: []
      });
    }
  }

  render() {

    return (
        <div></div>
    );
  }
}

AX6UIReactGrid.defaultProps = {
  data: [],
  height: "300px",
  theme: 'default',
  animateTime: 250,
  debounceTime: 250,
  appendDebouncer: null,
  appendDebounceTimes: 0,
  appendProgressIcon: '...',
  appendProgress: false,

  // 틀고정 속성
  frozenColumnIndex: 0,
  frozenRowIndex: 0,
  showLineNumber: false,
  showRowSelector: false,
  multipleSelect: true,
  virtualScrollY: true,
  virtualScrollX: true,

  // 스크롤될 때 body 페인팅 딜레이를 주어 성능이 좋은 않은 브라우저에서 반응을 빠르게 할 때 사용하는 옵션들
  virtualScrollYCountMargin: 0,
  virtualScrollAccelerated: true,
  virtualScrollAcceleratedDelayTime: 10,

  columnMinWidth: 100,
  lineNumberColumnWidth: 30,
  rowSelectorColumnWidth: 26,
  sortable: undefined,
  remoteSort: false,

  header: {
    display: true,
    align: false,
    columnHeight: 26,
    columnPadding: 3,
    columnBorderWidth: 1,
    selector: true
  },
  body: {
    align: false,
    columnHeight: 26,
    columnPadding: 3,
    columnBorderWidth: 1,
    grouping: false,
    mergeCells: false
  },
  rightSum: false,
  footSum: false,
  page: {
    height: 25,
    display: true,
    statusDisplay: true,
    navigationItemCount: 5
  },
  scroller: {
    size: 15,
    barMinSize: 15,
    trackPadding: 4
  },
  columnKeys: {
    selected: '__selected__',
    modified: '__modified__',
    deleted: '__deleted__',
    disableSelection: '__disable_selection__'
  },
  tree: {
    use: false,
    hashDigit: 8,
    indentWidth: 10,
    arrowWidth: 15,
    iconWidth: 18,
    icons: {
      openedArrow: '▾',
      collapsedArrow: '▸',
      groupIcon: '⊚',
      collapsedGroupIcon: '⊚',
      itemIcon: '⊙'
    },
    columnKeys: {
      parentKey: "pid",
      selfKey: "id",
      collapse: "collapse",
      hidden: "hidden",
      parentHash: "__hp__",
      selfHash: "__hs__",
      children: "__children__",
      depth: "__depth__",
    }
  }
};


const mapStateToProps = (state) => {
  return {}
};

// 액션함수 준비
const mapToDispatch = (dispatch) => ({
  initData: () => dispatch(act.initData())
});

export default connect(mapStateToProps, mapToDispatch)(AX6UIReactGrid);