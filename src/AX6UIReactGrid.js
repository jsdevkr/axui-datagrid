import React from 'react';
import UTIL from './AX6UIReactGrid-util';

//~~~~~


//~~~~~
class AX6UIReactGrid extends React.Component {
  constructor(props) {
    super(props);


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
      <div data-ax6ui-grid>
        <div data-ax6grid-container="root" style={{height: this.props.height}}>
          <div data-ax6grid-container="hidden" ref={ref => this.dom.container_hidden = ref}>
            <textarea data-ax6grid-form="clipboard" ref={ref => this.dom.clipboard = ref} />
          </div>
          <div data-ax6grid-container="header" ref={ref => this.dom.container_header = ref}>
            <div data-ax6grid-panel="aside-header"></div>
            <div data-ax6grid-panel="left-header"></div>
            <div data-ax6grid-panel="header">
              <div data-ax6grid-panel-scroll="header"></div>
            </div>
            <div data-ax6grid-panel="right-header"></div>
          </div>
          <div data-ax6grid-container="body" ref={ref => this.dom.container_body = ref}>
            <div data-ax6grid-panel="top-aside-body"></div>
            <div data-ax6grid-panel="top-left-body"></div>
            <div data-ax6grid-panel="top-body">
              <div data-ax6grid-panel-scroll="top-body"></div>
            </div>
            <div data-ax6grid-panel="top-right-body"></div>
            <div data-ax6grid-panel="aside-body">
              <div data-ax6grid-panel-scroll="aside-body"></div>
            </div>
            <div data-ax6grid-panel="left-body">
              <div data-ax6grid-panel-scroll="left-body"></div>
            </div>
            <div data-ax6grid-panel="body">
              <div data-ax6grid-panel-scroll="body">

                {this.state.dataOfList.length}

              </div>
            </div>
            <div data-ax6grid-panel="right-body">
              <div data-ax6grid-panel-scroll="right-body"></div>
            </div>
            <div data-ax6grid-panel="bottom-aside-body"></div>
            <div data-ax6grid-panel="bottom-left-body"></div>
            <div data-ax6grid-panel="bottom-body">
              <div data-ax6grid-panel-scroll="bottom-body"></div>
            </div>
            <div data-ax6grid-panel="bottom-right-body"></div>
          </div>
          <div data-ax6grid-container="page" ref={ref => this.dom.container_page = ref}>
            <div data-ax6grid-page="holder">
              <div data-ax6grid-page="navigation"></div>
              <div data-ax6grid-page="status"></div>
            </div>
          </div>
          <div data-ax6grid-container="scroller">
            <div data-ax6grid-scroller="vertical">
              <div data-ax6grid-scroller="vertical-bar"></div>
            </div>
            <div data-ax6grid-scroller="horizontal">
              <div data-ax6grid-scroller="horizontal-bar"></div>
            </div>
            <div data-ax6grid-scroller="corner"></div>
          </div>
          <div data-ax6grid-resizer="vertical"></div>
          <div data-ax6grid-resizer="horizontal"></div>
        </div>
      </div>
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

export default AX6UIReactGrid