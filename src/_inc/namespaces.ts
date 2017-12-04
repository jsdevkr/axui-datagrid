
export interface iSelection {
  x?: number;
  y?: number;
}

export interface iColumns {
  key?: string;
  width?: number;
  label?: string;
  align?: string;
  formatter?: Function | string;
  columns?: iColumns[];
}

export namespace iGridRoot {
  export interface Props {
    store_receivedList: any;
    store_deletedList: any;
    store_list: any;
    store_page: any;
    store_sortInfo: any;
    gridCSS: any;
    height: string;
    style: any;
    columns: iColumns[];
    data: any;
    options: any;
    thisCallback: Function;
    init: Function;
    setData: Function;
  }

  export interface State {
    mounted: boolean;
    scrollLeft: number;
    scrollTop: number;
    dragging: boolean; // 사용자가 드래깅 중인 경우 (style.userSelect=none 처리)
    selecting: boolean;
    selectionStartOffset: iSelection;
    selectionEndOffset: iSelection;
    selectionMinOffset: iSelection;
    selectionMaxOffset: iSelection;
    selectionRows: any;
    selectionCols: any;
    deSelections: any;
    focusedRow: number;
    focusedCol: number;
    isInlineEditing: boolean;
    focusedColumn: object;
    selectedColumn: object;
    inlineEditingColumn: object;
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
    styles: {
      calculatedHeight: number;
      asidePanelWidth: number;
      frozenPanelWidth: number;
      bodyTrHeight: number;
      elWidth: number;
      elHeight: number;
      CTInnerWidth: number;
      CTInnerHeight: number;
      rightPanelWidth: number;
      headerHeight: number;
      bodyHeight: number;
      frozenRowHeight: number;
      footSumHeight: number;
      pageHeight: number;
      verticalScrollerWidth: number;
      horizontalScrollerHeight: number;
      scrollContentContainerHeight: number;
      scrollContentHeight: number;
      scrollContentContainerWidth: number;
      scrollContentWidth: number;
      verticalScrollerHeight: number;
      verticalScrollBarHeight: number;
      horizontalScrollerWidth: number;
      horizontalScrollBarWidth: number;
      scrollerPadding: number;
      scrollerArrowSize: number;
      pageButtonsContainerWidth: number;
    };
    options: any;
  }

  export interface Moving {
    active: boolean;
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  }

}


export namespace iGridHeader {
  export interface Props {
    getRootBounding: Function;
    gridCSS: any;
    mounted: boolean;
    optionsHeader: any;
    styles: any;
    frozenColumnIndex: number;
    colGroup: any;
    asideColGroup: any;
    leftHeaderColGroup: any;
    headerColGroup: any;
    asideHeaderData: any;
    leftHeaderData: any;
    headerData: any;
    scrollLeft: number;
    focusedCol: number;
    selectionCols: any;
    onResizeColumnResizer: Function;
    onClickHeader: Function;
  }

  export interface State {
    columnResizing: boolean;
    columnResizerLeft: number;
  }
}


export namespace iGridBody {
  export interface Props {
    mounted: boolean;
    gridCSS: any;
    options: any;
    styles: any;
    CTInnerWidth: number;
    CTInnerHeight: number;
    frozenColumnIndex: number;
    colGroup: any;
    asideColGroup: any;
    leftHeaderColGroup: any;
    headerColGroup: any;
    bodyTable: any;
    asideBodyRowData: any;
    asideBodyGroupingData: any;
    leftBodyRowData: any;
    leftBodyGroupingData: any;
    bodyRowData: any;
    bodyGroupingData: any;
    list: any;
    scrollLeft: number;
    scrollTop: number;
    selectionRows: any;
    selectionCols: any;
    deSelections: any;
    focusedRow: number;
    focusedCol: number;
    onMouseDownBody: Function;
  }

  export interface State {
    /* empty */
  }

  export interface PanelStyle {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
  }
}

export namespace iGridPage {
  export interface Props {
    mounted: boolean;
    gridCSS: any;
    styles: any;
    pageButtonsContainerWidth: number;
    pageButtons: any;
    pageButtonHeight: number;
    onClickPageButton: Function
  }

  export interface State {
    /* empty */
  }
}

export namespace iGridScroll {
  export interface Props {
    mounted: boolean;
    gridCSS: any;
    bodyHeight: number;
    pageHeight: number;
    verticalScrollerHeight: number;
    verticalScrollerWidth: number;
    horizontalScrollerWidth: number;
    horizontalScrollerHeight: number;
    verticalScrollBarHeight: number;
    horizontalScrollBarWidth: number;
    scrollerArrowSize: number;
    scrollerPadding: number;
    scrollBarLeft: number;
    scrollBarTop: number;
    onMouseDownScrollBar: Function;
    onClickScrollTrack: Function;
    onClickScrollArrow: Function;
  }

  export interface State {
    /* empty */
  }
}

export namespace iGridSelector {
  export interface Props {
    selecting: boolean;
    gridCSS: any;
    selectionMinOffset: iSelection;
    selectionMaxOffset: iSelection;
  }

  export interface State {
    /* empty */
  }
}
