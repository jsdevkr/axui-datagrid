import * as act from '../actions';
import {List, Map} from 'immutable';
import {each, extend, extendOwn, isArray, isNumber, isObject, isString} from "underscore";
// import {mouseEventNames} from '../_inc/preference';
import * as UTIL from '../_inc/utils';

// 초기 상태
const initialState = Map({
  mounted: false,
  scrollLeft: 0,
  scrollTop: 0,
  receivedList: List([]),
  deletedList: List([]),
  list: List([]),
  page: Map({}),
  sortInfo: Map({}),
  columns: List([]),
  colGroup: List([]),
  asideColGroup: List([]),
  leftHeaderColGroup: List([]),
  headerColGroup: List([]),
  footSumColumns: List([]),
  bodyGrouping: List([]),
  focusedColumn: Map({}), // 그리드 바디의 포커스된 셀 정보
  selectedColumn: Map({}), // 그리드 바디의 선택된 셀 정보
  isInlineEditing: false,
  inlineEditing: Map({}),
  listIndexMap: Map({}), // tree데이터 사용시 데이터 인덱싱 맵
  headerTable: Map({}),
  asideHeaderData: Map({}),
  leftHeaderData: Map({}),
  headerData: Map({}),
  rightHeaderData: Map({}),
  bodyRowTable: Map({}),
  asideBodyRowData: Map({}),
  leftBodyRowData: Map({}),
  bodyRowData: Map({}),
  rightBodyRowData: Map({}),
  bodyRowMap: Map({}),
  bodyGroupingTable: Map({}),
  asideBodyGroupingData: Map({}),
  leftBodyGroupingData: Map({}),
  bodyGroupingData: Map({}),
  rightBodyGroupingData: Map({}),
  bodyGroupingMap: Map({}),
  footSumTable: Map({}), // footSum의 출력레이아웃
  leftFootSumData: Map({}), // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 왼쪽
  footSumData: Map({}), // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 오른쪽
  options: Map({
    frozenColumnIndex: 0,
    frozenRowIndex: 0,
    showLineNumber: true,
    showRowSelector: false,
    multipleSelect: true,
    columnMinWidth: 100,
    lineNumberColumnWidth: 30,
    rowSelectorColumnWidth: 26,
    sortable: true,
    remoteSort: false,
    asidePanelWidth: 0,
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
    },
    footSum: false
  }),
  styles: Map({
    // 줄번호 + 줄셀렉터의 너비
    asidePanelWidth: null,
    // 틀고정된 컬럼들의 너비
    frozenPanelWidth: null,
    // 한줄의 높이
    bodyTrHeight: null,
    // 컨테이너의 크기
    elWidth: null,
    elHeight: null,
    CTInnerWidth: null,
    CTInnerHeight: null,
    rightPanelWidth: null,
    // 헤더의 높이
    headerHeight: null,
    // 틀고정된 로우들의 높이
    frozenRowHeight: null,
    // 풋섬의 높이
    footSumHeight: null,
    // 페이징 영역의 높이
    pageHeight: null,
    scrollContentWidth: null,
    // scrollTack 의 크기 (너비, 높이)
    verticalScrollerWidth: null,
    horizontalScrollerHeight: null,

    bodyHeight: null
  })
});

/*
this.xvar = {
  bodyTrHeight: 0, // 한줄의 높이
  scrollContentWidth: 0, // 스크롤 될 내용물의 너비 (스크롤 될 내용물 : panel['body-scroll'] 안에 컬럼이 있는)
  scrollContentHeight: 0, // 스크롤 된 내용물의 높이
  scrollTimer: null
};
*/

// 리듀서 함수 정의
const grid = (state = initialState, action) => {
  const processor = {
    [act.INIT]: () => { // 그리드 데이터 초기화
      let headerTable, bodyRowTable, bodyRowMap, colGroupMap, footSumColumns, footSumTable, bodyGrouping, bodyGroupingTable, sortInfo;
      let colGroup, asideColGroup, leftHeaderColGroup, headerColGroup;
      let dividedHeaderObj, asideHeaderData, leftHeaderData, headerData;
      let dividedBodyObj, asideBodyRowData, leftBodyRowData, bodyRowData;
      let leftFootSumData, footSumData;
      let asideBodyGroupingData, leftBodyGroupingData, bodyGroupingData, bodyGroupingMap;
      let list; // 그리드에 표현할 목록
      let options = state.get('options').toJS();
      let styles = state.get('styles').toJS();

      each(action.options, function (v, k) {
        options[k] = (isObject(v)) ? extendOwn(options[k], v) : v;
      });

      headerTable = UTIL.makeHeaderTable(action.columns, options);
      bodyRowTable = UTIL.makeBodyRowTable(action.columns, options);
      bodyRowMap = UTIL.makeBodyRowMap(bodyRowTable, options);

      options.frozenColumnIndex = options.frozenColumnIndex || 0;

      // header 데이터 수집
      dividedHeaderObj = UTIL.divideTableByFrozenColumnIndex(headerTable, options.frozenColumnIndex, options);
      asideHeaderData = dividedHeaderObj.asideHeaderData;
      asideColGroup = dividedHeaderObj.asideColGroup;
      leftHeaderData = dividedHeaderObj.leftData;
      headerData = dividedHeaderObj.rightData;

      // body 데이터 수집
      dividedBodyObj = UTIL.divideTableByFrozenColumnIndex(bodyRowTable, options.frozenColumnIndex, options);
      asideBodyRowData = dividedHeaderObj.asideHeaderData;
      leftBodyRowData = dividedHeaderObj.leftData;
      bodyRowData = dividedHeaderObj.rightData;

      styles.asidePanelWidth = dividedHeaderObj.asidePanelWidth;

      // 한줄의 높이 계산 (한줄이 여러줄로 구성되었다면 높이를 늘려야 하니까);
      styles.bodyTrHeight = bodyRowTable.rows.length * options.body.columnHeight;

      // colGroupMap
      {
        colGroupMap = {};
        for (let r = 0, rl = headerTable.rows.length; r < rl; r++) {
          let row = headerTable.rows[r];
          for (let c = 0, cl = row.cols.length; c < cl; c++) {
            colGroupMap[row.cols[c].colIndex] = extend({}, row.cols[c]);
          }
        }

        colGroup = [];
        each(colGroupMap, function (v, k) {
          colGroup.push(v);
        });
      }

      leftHeaderColGroup = colGroup.slice(0, options.frozenColumnIndex);
      headerColGroup = colGroup.slice(options.frozenColumnIndex);


      // footSum
      {
        footSumColumns = [];
        footSumTable = {};

        if (isArray(options.footSum)) {
          // todo : leftFootSumData, footSumData
          footSumColumns = options.footSum;
          footSumTable = UTIL.makeFootSumTable(footSumColumns, colGroup, options);
        }
      }

      // grouping info
      if (options.body.grouping) {
        if ("by" in options.body.grouping && "columns" in options.body.grouping) {
          bodyGrouping = {
            by: options.body.grouping.by,
            columns: options.body.grouping.columns
          };
          bodyGroupingTable = UTIL.makeBodyGroupingTable(bodyGrouping.columns, colGroup, options);
          sortInfo = (() => {
            let sortInfo = {};
            for (let k = 0, kl = bodyGrouping.by.length; k < kl; k++) {
              sortInfo[bodyGrouping.by[k]] = {
                orderBy: "asc",
                seq: k,
                fixed: true
              };
              for (let c = 0, cl = colGroup.length; c < cl; c++) {
                if (colGroup[c].key === bodyGrouping.by[k]) {
                  colGroup[c].sort = "asc";
                  colGroup[c].sortFixed = true;
                }
              }
            }
            return sortInfo;
          })();

          // todo : asideBodyGroupingData, leftBodyGroupingData, bodyGroupingData, bodyGroupingMap

        } else {
          options.body.grouping = false;
        }
      }


      // 전달받은 리스트 중에 출력할 리스트를 필터링
      list = action.receivedList.filter(function (item) {
        if (item) {
          if (item[options.columnKeys.deleted]) {
            return false;
          } else {
            return true;
          }
        }
        return false;
      });

      return state
        .set('columns', List(action.columns))
        .set('headerTable', Map(headerTable))
        .set('asideHeaderData', Map(asideHeaderData))
        .set('leftHeaderData', Map(leftHeaderData))
        .set('headerData', Map(headerData))
        .set('bodyRowTable', Map(bodyRowTable))
        .set('bodyRowMap', Map(bodyRowMap))
        .set('asideBodyRowData', Map(asideBodyRowData))
        .set('leftBodyRowData', Map(leftBodyRowData))
        .set('bodyRowData', Map(bodyRowData))
        .set('colGroup', List(colGroup))
        .set('colGroupMap', Map(colGroupMap))
        .set('asideColGroup', List(asideColGroup))
        .set('leftHeaderColGroup', List(leftHeaderColGroup))
        .set('headerColGroup', List(headerColGroup))
        .set('footSumColumns', List(footSumColumns))
        .set('footSumTable', Map(footSumTable))
        .set('bodyGrouping', Map(bodyGrouping))
        .set('bodyGroupingTable', Map(bodyGroupingTable))
        .set('sortInfo', Map(sortInfo))
        .set('receivedList', List(action.receivedList))
        .set('list', List(list))
        .set('page', isObject(action.page) ? Map(action.page) : false)
        .set('options', Map(options))
        .set('styles', Map(styles));
    },

    // 필요 액션들
    // alignGrid
    [act.DID_MOUNT]: () => {
      let footSumColumns = state.get('footSumColumns');
      let headerTable = state.get('headerTable');
      let options = state.get('options').toJS();
      let styles = state.get('styles').toJS();
      styles.elWidth = action.containerDOM.getBoundingClientRect().width;
      styles.elHeight = action.containerDOM.getBoundingClientRect().height;
      styles.CTInnerWidth = styles.elWidth;
      styles.CTInnerHeight = styles.elHeight;
      styles.rightPanelWidth = 0;
      styles.headerHeight = 0;
      styles.frozenRowHeight = 0;
      styles.headerHeight = 0;
      styles.footSumHeight = 0;
      styles.pageHeight = 0;
      styles.scrollContentWidth = 0;
      styles.verticalScrollerWidth = 0;
      styles.horizontalScrollerHeight = 0;
      styles.bodyHeight = 0;

      let list = state.get('list');
      let colGroup = UTIL.setColGroupWidth(state.get("colGroup"), {width: styles.elWidth - (styles.asidePanelWidth + options.scroller.size)}, options);

      styles.frozenPanelWidth = ((colGroup, endIndex) => {
        let width = 0;
        for (let i = 0, l = endIndex; i < l; i++) {
          width += colGroup.get(i)._width;
        }
        return width;
      })(colGroup, options.frozenColumnIndex);
      styles.headerHeight = (options.header.display) ? headerTable.get('rows').length * options.header.columnHeight : 0;

      styles.frozenRowHeight = options.frozenRowIndex * styles.bodyTrHeight;
      styles.footSumHeight = footSumColumns.size * styles.bodyTrHeight;
      styles.pageHeight = (options.page.display) ? options.page.height : 0;
      styles.scrollContentWidth = state.get('headerColGroup').reduce((prev, curr) => {
        return (prev._width || prev) + curr._width
      });

      styles.verticalScrollerWidth = ((styles.elHeight - styles.headerHeight - styles.pageHeight - styles.footSumHeight) < list.size * styles.bodyTrHeight) ? options.scroller.size : 0;
      styles.horizontalScrollerHeight = (() => {
        let totalColGroupWidth = colGroup.reduce((prev, curr) => {
          return (prev._width || prev) + curr._width
        });

        // aside 빼고, 수직 스크롤이 있으면 또 빼고 비교
        let bodyWidth = styles.elWidth - styles.asidePanelWidth - styles.verticalScrollerWidth;

        return (totalColGroupWidth > bodyWidth) ? options.scroller.size : 0;
      })();
      if (styles.horizontalScrollerHeight > 0) {
        styles.verticalScrollerWidth = ((styles.elHeight - styles.headerHeight - styles.pageHeight - styles.footSumHeight - styles.horizontalScrollerHeight) < list.size * styles.bodyTrHeight) ? options.scroller.size : 0;
      }

      // 수평 너비 결정
      styles.CTInnerWidth = styles.elWidth - styles.verticalScrollerWidth;
      // 수직 스크롤러의 높이 결정.
      styles.CTInnerHeight = styles.elHeight - styles.pageHeight - styles.horizontalScrollerHeight;
      // get bodyHeight
      styles.bodyHeight = styles.CTInnerHeight - styles.headerHeight;

      return state
        .set('mounted', true)
        .set('options', Map(options))
        .set('styles', Map(styles));
    },

    [act.SET_DATA]: () => {
      return state
        .set('receivedList', List(action.receivedList))
        .set('page', Map(action.page));
    },

    [act.SET_COLUMNS]: () => {
      // todo : SET_COLUMNS 마저 정리하기
      return state
        .set('columns', List(action.columns));
    },

    [act.UPDATE_SCROLL]: () => {
      if (isNumber(action.scrollLeft) || isString(action.scrollLeft)) {
        state = state.set('scrollLeft', action.scrollLeft);
      }
      if (isNumber(action.scrollTop) || isString(action.scrollTop)) {
        state = state.set('scrollTop', action.scrollTop);
      }

      return state;
    },

    [act.ALIGN]: () => {

      return state;
    }
  };

  if (action.type in processor) {
    return processor[action.type]();
  } else {
    return state;
  }
};

export default grid;