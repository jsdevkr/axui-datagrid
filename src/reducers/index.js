import * as act from '../actions';
import {List, Map, fromJS} from 'immutable';
import {each, extend, extendOwn, isArray, isNumber, isObject, isString} from "underscore";
// import {mouseEventNames} from '../_inc/preference';
import * as UTIL from '../_inc/utils';

// 초기 상태
const initialState = Map({
  mounted: false,
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
  //rightHeaderData: Map({}),
  bodyRowTable: Map({}),
  asideBodyRowData: Map({}),
  leftBodyRowData: Map({}),
  bodyRowData: Map({}),
  //rightBodyRowData: Map({}),
  bodyRowMap: Map({}),
  bodyGroupingTable: Map({}),
  asideBodyGroupingData: Map({}),
  leftBodyGroupingData: Map({}),
  bodyGroupingData: Map({}),
  //rightBodyGroupingData: Map({}),
  bodyGroupingMap: Map({}),
  footSumTable: Map({}), // footSum의 출력레이아웃
  leftFootSumData: Map({}), // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 왼쪽
  footSumData: Map({}), // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 오른쪽
  options: Map({
    header: {},
    body: {},
    page: {},
    scroller: {},
    columnKeys: {},
    tree: {}
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
    // scrollTack 의 크기 (너비, 높이)
    verticalScrollerWidth: null,
    horizontalScrollerHeight: null,

    bodyHeight: null,
    scrollContentHeight: null,
    scrollContentWidth: null
  })
});


// 리듀서 함수 정의
const grid = (state = initialState, action) => {
  const processor = {
    [act.INIT]: () => { // 그리드 데이터 초기화
      let headerTable, bodyRowTable, bodyRowMap, colGroupMap, footSumColumns, footSumTable, bodyGrouping, bodyGroupingTable, sortInfo;
      let colGroup, asideColGroup, leftHeaderColGroup, headerColGroup;
      let dividedObj;
      let asideHeaderData, leftHeaderData, headerData;
      let asideBodyRowData, leftBodyRowData, bodyRowData;
      let leftFootSumData, footSumData;
      let asideBodyGroupingData, leftBodyGroupingData, bodyGroupingData, bodyGroupingMap;
      let list; // 그리드에 표현할 목록
      let options = action.options;
      let styles = state.get('styles').toJS();

      headerTable = UTIL.makeHeaderTable(action.columns, options);
      bodyRowTable = UTIL.makeBodyRowTable(action.columns, options);
      bodyRowMap = UTIL.makeBodyRowMap(bodyRowTable, options);

      options.frozenColumnIndex = options.frozenColumnIndex || 0;

      // header 데이터 수집
      dividedObj = UTIL.divideTableByFrozenColumnIndex(headerTable, options.frozenColumnIndex, options);
      asideHeaderData = dividedObj.asideData;
      asideColGroup = dividedObj.asideColGroup; // asideColGroup은 header, bodyRow 에서 공통으로 사용 한번만 구하면 그만이지만 편의상 header에서 처리하기로 한다.
      leftHeaderData = dividedObj.leftData;
      headerData = dividedObj.rightData;
      styles.asidePanelWidth = dividedObj.asidePanelWidth;

      // body 데이터 수집
      dividedObj = UTIL.divideTableByFrozenColumnIndex(bodyRowTable, options.frozenColumnIndex, options);
      asideBodyRowData = dividedObj.asideData;
      leftBodyRowData = dividedObj.leftData;
      bodyRowData = dividedObj.rightData;

      // 한줄의 높이 계산 (한줄이 여러줄로 구성되었다면 높이를 늘려야 하니까);
      styles.bodyTrHeight = bodyRowTable.rows.length * options.body.columnHeight;

      // colGroupMap
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

      leftHeaderColGroup = colGroup.slice(0, options.frozenColumnIndex);
      headerColGroup = colGroup.slice(options.frozenColumnIndex);

      // footSum
      footSumColumns = [];
      footSumTable = {};

      if (isArray(options.footSum)) {
        footSumColumns = options.footSum;
        footSumTable = UTIL.makeFootSumTable(footSumColumns, colGroup, options);
        dividedObj = UTIL.divideTableByFrozenColumnIndex(footSumTable, options.frozenColumnIndex, options);
        leftFootSumData = dividedObj.leftData;
        footSumData = dividedObj.rightData;
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

          dividedObj = UTIL.divideTableByFrozenColumnIndex(bodyGroupingTable, options.frozenColumnIndex, options);
          asideBodyGroupingData = dividedObj.asideData;
          leftBodyGroupingData = dividedObj.leftData;
          bodyGroupingData = dividedObj.rightData;
          bodyGroupingMap = UTIL.makeBodyRowMap(bodyGroupingTable, options);
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
        .set('colGroup', List(colGroup))
        .set('colGroupMap', Map(colGroupMap))
        .set('asideColGroup', List(asideColGroup))
        .set('leftHeaderColGroup', List(leftHeaderColGroup))
        .set('headerColGroup', List(headerColGroup))

        .set('headerTable', Map(headerTable))
        .set('asideHeaderData', Map(asideHeaderData))
        .set('leftHeaderData', Map(leftHeaderData))
        .set('headerData', Map(headerData))

        .set('bodyRowTable', Map(bodyRowTable))
        .set('bodyRowMap', Map(bodyRowMap))
        .set('asideBodyRowData', Map(asideBodyRowData))
        .set('leftBodyRowData', Map(leftBodyRowData))
        .set('bodyRowData', Map(bodyRowData))

        .set('footSumColumns', List(footSumColumns))
        .set('footSumTable', Map(footSumTable))

        .set('leftFootSumData', Map(leftFootSumData))
        .set('footSumData', Map(footSumData))

        .set('bodyGrouping', Map(bodyGrouping))
        .set('bodyGroupingTable', Map(bodyGroupingTable))

        .set('asideBodyGroupingData', Map(asideBodyGroupingData))
        .set('leftBodyGroupingData', Map(leftBodyGroupingData))
        .set('bodyGroupingData', Map(bodyGroupingData))
        .set('bodyGroupingMap', Map(bodyGroupingMap))

        .set('sortInfo', Map(sortInfo))
        .set('receivedList', List(action.receivedList))
        .set('list', List(list))
        .set('page', isObject(action.page) ? Map(action.page) : false)
        .set('options', fromJS(options))
        .set('styles', Map(styles));
    },

    // 필요 액션들
    // alignGrid
    [act.DID_MOUNT]: () => {
      const {styles} = UTIL.calculateDimensions(state, action);
      return state
        .set('mounted', true)
        .set('styles', Map(styles));
    },

    [act.SET_DATA]: () => {
      let options = state.get('options').toJS();

      // 전달받은 리스트 중에 출력할 리스트를 필터링
      let list = action.receivedList.filter(function (item) {
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
        .set('receivedList', List(action.receivedList))
        .set('list', List(list))
        .set('page', isObject(action.page) ? Map(action.page) : false)
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
      const {styles} = UTIL.calculateDimensions(state, action);
      return state
        .set('styles', Map(styles));
    },

    [act.CHANGE_OPTIONS]: () => {



      return state
        .set('options', fromJS(action.options))
    }
  };

  if (action.type in processor) {
    return processor[action.type]();
  } else {
    return state;
  }
};

export default grid;