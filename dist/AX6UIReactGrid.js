import React from 'react';


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

  height: 0,
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

export default class AX6UIReactGrid extends React.Component {
  constructor(props) {
    super(props);

    console.log(pro);
  }

  render() {
    return React.createElement('div', null);
  }
}