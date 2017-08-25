import React from 'react';

import merge from 'lodash/merge';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';

import DATA from './AX6UIReactGrid-data';
import UTIL from './AX6UIReactGrid-util';

//~~~~~
let defaultConfig = {
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

const setData = function () {
  // 그리드 데이터 준비 : dataOfList, dataOfPage를 미리 준비
  if (isArray(this.state.data)) {
    this.state["dataOfList"] = this.state.data;
    this.state["dataOfPage"] = {};
  }
  else if (isPlainObject(this.state.data) && 'list' in this.state.data) {
    this.state["dataOfList"] = this.state.data.list;
    this.state["dataOfPage"] = this.state.data.page || {};
  }
  else {
    this.state["dataOfList"] = [];
    this.state["dataOfPage"] = {};
  }
};

//~~~~~
export default class AX6UIReactGrid extends React.Component {
  constructor(props) {
    super(props);

    // 그리드 설정값 준비
    this.state = merge({config: defaultConfig}, props);
  }

  componentDidMount() {
    setData.call(this); //

    console.log(this.state);
  }

  componentWillUnmount() {

  }

  componentWillUpdate() {
    // 업데이트 전
    setData.call(this);
  }

  componentDidUpdate() {
    // 업데이트 후
    console.log("componentDidUpdate");
    // console.log(this.state);
  }

  render() {
    return (
      <div data-ax6ui-grid>
        <div data-ax6grid-container="root" style={{height: this.state.height}}>
          <div data-ax6grid-container="hidden">
            <textarea data-ax6grid-form="clipboard"></textarea>
          </div>
          <div data-ax6grid-container="header">
            <div data-ax6grid-panel="aside-header"></div>
            <div data-ax6grid-panel="left-header"></div>
            <div data-ax6grid-panel="header">
              <div data-ax6grid-panel-scroll="header"></div>
            </div>
            <div data-ax6grid-panel="right-header"></div>
          </div>
          <div data-ax6grid-container="body">
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
              <div data-ax6grid-panel-scroll="body"></div>
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
          <div data-ax6grid-container="page">
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