interface iAXDataGridRootProps {
  store_receivedList: any;
  store_deletedList: any;
  store_list: any;
  store_page: any;
  store_sortInfo: any;
  store_filterInfo: any;
  height: string;
  style: any;
  columns: iAXDataGridColumns[];
  data: any;
  options: iAXDataGridOption;
  init: Function;
  setData: Function;
  sort: Function;
  filter: Function;
  update: Function;
  onBeforeEvent?: Function;
  onAfterEvent?: Function;
}

interface iAXDataGridRootState {
  mounted: boolean;
  scrollLeft: number;
  scrollTop: number;
  dragging: boolean; // 사용자가 드래깅 중인 경우 (style.userSelect=none 처리)

  selectionStartOffset: iAXDataGridSelection;
  selectionEndOffset: iAXDataGridSelection;
  selectionMinOffset: iAXDataGridSelection;
  selectionMaxOffset: iAXDataGridSelection;
  selectionRows: object;
  selectionCols: object;
  focusedRow: number;
  focusedCol: number;
  isInlineEditing: boolean;
  inlineEditingCell: iAXDataGridEditingCell;
  isColumnFilter: number | boolean;
  colGroup: any;
  colGroupMap: object;
  asideColGroup: any;
  leftHeaderColGroup: any;
  headerColGroup: any;
  bodyGrouping: any;
  headerTable: object;
  asideHeaderData: object;
  leftHeaderData: object;
  headerData: object;
  bodyRowTable: object;
  asideBodyRowData: object;
  leftBodyRowData: object;
  bodyRowData: object;
  bodyRowMap: object;
  bodyGroupingTable: object;
  asideBodyGroupingData: object;
  leftBodyGroupingData: object;
  bodyGroupingData: object;
  bodyGroupingMap: object;
  footSumColumns: any;
  footSumTable: object; // footSum의 출력레이아웃
  leftFootSumData: object; // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 왼쪽
  footSumData: object; // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 오른쪽
  styles: iAXDataGridStyle;
  options: iAXDataGridOption;
}

interface iAXDataGridRootMoving {
  active: boolean;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}
