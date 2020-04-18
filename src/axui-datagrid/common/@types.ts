import { DataGridEnums } from './@enums';

export namespace IDataGrid {
  export interface IPosition {
    x?: number;
    y?: number;
  }

  export interface IScrollConfig {
    frozenRowIndex?: number;
    sRowIndex?: number;
    eRowIndex?: number;
  }

  export interface IRect extends IPosition {
    width: number;
    height?: number;
  }

  export interface IColPrimitive {
    key?: string;
    label?: string;
    width?: number | string;
    align?: 'left' | 'center' | 'right' | string;
    colSpan?: number;
    rowSpan?: number;
  }

  export interface IonEventParam {
    e: React.MouseEvent<any> | React.KeyboardEvent<any>;
    eventName: string;
  }

  export interface IonRightClickParam {
    e: MouseEvent;
    item: IDataItem;
    value: any;
    focusedRow?: number;
    focusedCol?: number;
  }

  export interface IonClickParam {
    e: React.MouseEvent<any>;
    item: IDataItem;
    value: any;
    rowIndex?: number;
    colIndex?: number;
  }

  export interface IonScrollEndFunctionParam {
    endOfScrollTop?: boolean;
    endOfScrollLeft?: boolean;
  }

  export interface IonScrollFunctionParam {
    scrollTop: number;
    scrollLeft: number;
    sRowIndex: number;
    eRowIndex: number;
    sColIndex?: number;
    eColIndex?: number;
  }

  export interface IonChangeScrollSizeFunctionParam {
    scrollContentContainerHeight?: number;
    scrollContentHeight?: number;
    scrollContentContainerWidth?: number;
    scrollContentWidth?: number;
    bodyTrHeight?: number;
  }

  export interface IonSelectParam {
    li?: number;
    selectedIndexes?: number[];
    selected?: boolean;
    selectedAll?: boolean;
  }

  export interface IonChangeSelectionParam extends ISelection {}

  export interface IonChangeColumnParam {
    colGroup?: ICol[];
  }

  export interface IonError {
    code?: number;
    message?: string;
  }

  export interface IonSortParam {
    sortInfos: ISortInfo[];
  }

  export interface IapplyAutofitParam {
    asideWidth: number;
    colGroup: IAutofitCol[];
  }

  export interface IonEditParam {
    li: number;
    col?: ICol;
    colIndex: number;
    value: any;
    checked?: boolean;
    eventWhichKey?: string;
    keepEditing?: boolean;
  }

  export type formatterFunction = (formatterData: IFormatterData) => any;

  export type collectorFunction = (formatterData: ICollectorData) => any;

  export type userCallBackFunction = (param?: any) => void;

  export type setStoreState = (
    store: IDataGrid.IStoreState,
    callback?: () => void,
  ) => void;

  export type dispatch = (
    dispatchType: DataGridEnums.DispatchTypes,
    param: IDataGrid.DispatchParam,
  ) => void;

  export type CellEditorDataUpdate = (
    value: any,
    options?: {
      keepEditing?: boolean;
      updateItem?: boolean;
      eventWhichKey?: string;
      focus?: boolean;
    },
  ) => void;

  export type CellEditorDataCancel = (options?: {
    keepEditing?: boolean;
    updateItem?: boolean;
    eventWhichKey?: string;
  }) => void;

  export type CellEditorKeyAction = (
    action: 'EDIT_NEXT' | 'EDIT_PREV',
    value: any,
    options?: { e?: React.KeyboardEvent; updateItem?: boolean },
  ) => void;

  export interface ICellEditorData {
    col: ICol;
    li: number;
    colIndex: number;
    item: IDataItem;
    value: any;
    update: CellEditorDataUpdate;
    cancel: CellEditorDataCancel;
    focus: () => void;
    blur: () => void;
    keyAction: CellEditorKeyAction;
  }

  export interface ICellEditorDisableData {
    col: ICol;
    rowIndex: number;
    colIndex: number;
    item: IDataItem;
    value: any;
  }

  export type cellEditorFunction = (
    param: ICellEditorData,
  ) => string | React.ReactNode;

  export type cellEditorDisableFunction = (
    param: ICellEditorDisableData,
  ) => boolean;

  export interface IColEditor {
    type?: string;
    activeType?: 'always' | 'dblclick' | 'click';
    width?: number;
    label?: React.ReactDOM | string;
    render?: cellEditorFunction;
    disable?: cellEditorDisableFunction;
  }

  export interface IEditingCell {
    rowIndex?: number;
    colIndex?: number;
    editor?: string | IColEditor;
  }

  export interface IFormatterData {
    item?: IDataItem;
    index?: number;
    key?: string;
    value?: any;
    options?: any;
  }

  export interface ICollectorData {
    data?: IData;
    dataLength?: number;
    key?: string;
    value?: any;
    options?: any;
  }

  export interface IFormatter {
    [key: string]: formatterFunction;
  }

  export interface ICollector {
    [key: string]: collectorFunction;
  }

  export interface ICol extends IColPrimitive {
    colIndex?: number;
    rowIndex?: number;
    formatter?: formatterFunction | string;
    collector?: collectorFunction | string;
    editor?: string | IColEditor;
    _ex?: number;
    _sx?: number;
    _width?: number;
    columnAttr?: string;
  }

  export interface IColumn extends IColPrimitive {
    colIndex?: number;
    rowIndex?: number;
    formatter?: formatterFunction | string;
    collector?: collectorFunction | string;
    editor?: string | IColEditor;
    hidden?: boolean;
    columns?: IColumn[];
    depth?: number;
    columnAttr?: string;
  }

  export interface IColumnKeys {
    selected?: string;
    modified?: string;
    deleted?: string;
    disableSelection?: string;
  }

  export interface IAutofitCol {
    colIndex: number;
    width: number;
    tdWidth: number;
  }

  export interface IMoving {
    active?: boolean;
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  }

  export interface IColumnTableMapRow {
    cols: IColumn[];
  }

  export interface IColumnTableMap {
    rows: IColumnTableMapRow[];
  }

  export type ColumnDivideTable = {
    asideData: IColumnTableMap;
    asideColGroup: any[];
    leftData: IColumnTableMap;
    rightData: IColumnTableMap;
  };

  export interface IOptionHeader {
    display?: boolean;
    align?: 'left' | 'center' | 'right' | undefined;
    columnHeight?: number;
    columnPadding?: number;
    columnBorderWidth?: number;
    selector?: boolean;
    clickAction?: 'select' | 'sort' | undefined;
  }

  export interface IOptionBody {
    align?: 'left' | 'center' | 'right' | undefined;
    columnHeight?: number;
    columnPadding?: number;
    columnBorderWidth?: number;
    grouping?: boolean;
    mergeCells?: boolean;
  }

  export interface IOptionPageButton {
    className: string;
    onClick: string | userCallBackFunction;
    width?: number;
  }

  export interface IOptionPage {
    height?: number;
  }

  export interface IOptionScroller {
    theme?: string;
    width?: number;
    height?: number;
    arrowSize?: number;
    barMinSize?: number;
    padding?: number;
    horizontalScrollerWidth?: number;
  }

  export interface IOptions {
    frozenColumnIndex?: number;
    frozenRowIndex?: number;
    showLineNumber?: boolean;
    showRowSelector?: boolean;
    multipleSelect?: boolean;
    columnMinWidth?: number;
    lineNumberColumnWidth?: number;
    lineNumberStartAt?: number;
    rowSelectorColumnWidth?: number;
    rowSelectorSize?: number;

    footSum?: boolean;
    bodyLoaderHeight?: number;
    autofitColumnWidthMax?: number;
    autofitColumnWidthMin?: number;
    header?: IOptionHeader;
    body?: IOptionBody;
    page?: IOptionPage;
    scroller?: IOptionScroller;
    columnKeys?: IColumnKeys;
    disableClipboard?: boolean;
  }

  export interface IStyles {
    asidePanelWidth?: number;
    frozenPanelWidth?: number;
    bodyTrHeight?: number;
    elWidth?: number;
    elHeight?: number;
    rightPanelWidth?: number;
    headerHeight?: number;
    bodyHeight?: number;
    frozenPanelHeight?: number;
    footSumHeight?: number;
    pageHeight?: number;
    verticalScrollerWidth?: number;
    horizontalScrollerHeight?: number;
    scrollContentContainerHeight?: number;
    scrollContentHeight?: number;
    scrollContentContainerWidth?: number;
    scrollContentWidth?: number;
    verticalScrollerHeight?: number;
    verticalScrollBarHeight?: number;
    horizontalScrollerWidth?: number;
    horizontalScrollBarWidth?: number;
    scrollerPadding?: number;
    scrollerArrowSize?: number;
  }

  export interface ISelection {
    rows?: number[];
    cols?: number[];
    focusedRow?: number;
    focusedCol?: number;
    isEditing?: boolean;
    scrollLeft?: number;
    scrollTop?: number;
    sRowIndex?: number;
    eRowIndex?: number;
  }

  export interface ISortInfo {
    key?: string;
    seq?: number;
    orderBy: 'asc' | 'desc';
  }

  export interface IDataItem {
    type?: 'C' | 'U' | 'D';
    value: [] | { [key: string]: any };
    changed?: { [key: string]: any };
    selected?: boolean;
  }
  export type IData =
    | Map<number, IDataItem>
    | {
        [key: number]: IDataItem;
      };

  export interface IStoreProps {
    loading?: boolean;
    loadingData?: boolean;
    data?: IData;
    dataLength?: number;

    selection?: ISelection;
    sortInfo?: {};
    width?: number;
    height?: number;
    scrollLeft?: number;
    scrollTop?: number;
    columnHeight?: number;
    options?: IOptions;
    status?: React.ReactNode;

    headerColGroup?: ICol[];
    headerTable?: IColumnTableMap;
    headerData?: IColumnTableMap;
    asideHeaderData?: IColumnTableMap;
    leftHeaderData?: IColumnTableMap;

    bodyRowTable?: IColumnTableMap;
    bodyRowData?: IColumnTableMap;
    bodyRowMap?: {};
    asideBodyRowData?: IColumnTableMap;
    leftBodyRowData?: IColumnTableMap;

    autofitColGroup?: IAutofitCol[];
    colGroup?: ICol[];
    colGroupMap?: {};
    asideColGroup?: ICol[];
    leftHeaderColGroup?: ICol[];

    footSumColumns?: IColumn[][];
    footSumTable?: IColumnTableMap;
    leftFootSumData?: IColumnTableMap;
    footSumData?: IColumnTableMap;

    rootNode?: React.RefObject<HTMLDivElement>;
    clipBoardNode?: React.RefObject<HTMLTextAreaElement>;

    rootObject?: any;

    setScrollLeft?: (scrollLeft: number) => void;
    setScrollTop?: (scrollTop: number) => void;
    onBeforeEvent?: (param: IonEventParam) => void;
    onScroll?: (param: IonScrollFunctionParam) => void;
    onScrollEnd?: (param: IonScrollEndFunctionParam) => void;
    onChangeScrollSize?: (param: IonChangeScrollSizeFunctionParam) => void;
    onChangeSelection?: (param: IonChangeSelectionParam) => void;
    onChangeColumns?: (param: IonChangeColumnParam) => void;
    onSelect?: (param: IonSelectParam) => void;
    onRightClick?: (param: IonRightClickParam) => void;
    onClick?: (param: IonClickParam) => void;
    onDoubleClick?: (param: IonClickParam) => void;
    onError?: (err: IonError, event: Event) => void;
    onSort?: (param: IonSortParam) => void;
    onEdit?: (param: IonEditParam) => void;
  }

  export interface IStoreState {
    loading?: boolean;
    loadingData?: boolean;

    data?: IData;
    dataLength?: number;

    listSelectedAll?: boolean;
    sortInfo?: {
      [key: string]: ISortInfo;
    };
    pSortInfo?: {
      [key: string]: ISortInfo;
    };
    width?: number;
    height?: number;
    columnHeight?: number;

    selection?: ISelection;

    isInlineEditing?: boolean;
    inlineEditingCell?: IEditingCell;

    columnResizing?: boolean;
    columnResizerLeft?: number;

    scrollLeft?: number;
    scrollTop?: number;
    pScrollLeft?: number;
    pScrollTop?: number;

    endOfScrollTop?: boolean;
    endOfScrollLeft?: boolean;
    selectionRows?: {};
    selectionCols?: {};
    focusedRow?: number;
    focusedCol?: number;

    selectionStartOffset?: IPosition;
    selectionEndOffset?: IPosition;
    selectionMinOffset?: IPosition;
    selectionMaxOffset?: IPosition;

    selectionSRow?: number;
    selectionSCol?: number;
    selectionERow?: number;
    selectionECol?: number;

    printStartColIndex?: number;
    printEndColIndex?: number;

    autofitColGroup?: IAutofitCol[];
    colGroup?: ICol[];
    colGroupMap?: {};
    asideColGroup?: ICol[];
    leftHeaderColGroup?: ICol[];
    headerColGroup?: ICol[];
    bodyGrouping?: ICol[];
    headerTable?: IColumnTableMap;
    asideHeaderData?: IColumnTableMap;
    leftHeaderData?: IColumnTableMap;
    headerData?: IColumnTableMap;
    bodyRowTable?: IColumnTableMap;
    asideBodyRowData?: IColumnTableMap;
    leftBodyRowData?: IColumnTableMap;
    bodyRowData?: IColumnTableMap;
    bodyRowMap?: {};
    bodyGroupingTable?: IColumnTableMap;
    asideBodyGroupingData?: IColumnTableMap;
    leftBodyGroupingData?: IColumnTableMap;
    bodyGroupingData?: IColumnTableMap;
    bodyGroupingMap?: {};
    footSumColumns?: IColumn[][];
    footSumTable?: IColumnTableMap;
    leftFootSumData?: IColumnTableMap;
    footSumData?: IColumnTableMap;
    styles?: IStyles;
    options?: IOptions;
    status?: React.ReactNode;

    visibleHeaderColGroup?: ICol[];
    visibleBodyRowData?: IColumnTableMap;
    visibleBodyGroupingData?: IColumnTableMap;
    visibleFootSumData?: IColumnTableMap;

    propColumns?: string;
    propOptions?: string;

    predefinedFormatter?: IFormatter;
    predefinedCollector?: ICollector;
    rootObject?: any;

    rootNode?: React.RefObject<HTMLDivElement>;
    clipBoardNode?: React.RefObject<HTMLTextAreaElement>;

    onBeforeEvent?: (param: IonEventParam) => void;
    onScroll?: (param: IonScrollFunctionParam) => void;
    onScrollEnd?: (param: IonScrollEndFunctionParam) => void;
    onChangeScrollSize?: (param: IonChangeScrollSizeFunctionParam) => void;
    onChangeSelection?: (param: IonChangeSelectionParam) => void;
    onChangeColumns?: (param: IonChangeColumnParam) => void;
    onSelect?: (param: IonSelectParam) => void;
    onRightClick?: (param: IonRightClickParam) => void;
    onClick?: (param: IonClickParam) => void;
    onDoubleClick?: (param: IonClickParam) => void;
    onError?: (err: IonError, event: Event) => void;
    onSort?: (param: IonSortParam) => void;
    onEdit?: (param: IonEditParam) => void;
  } // footSum의 출력레이아웃 // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 왼쪽 // frozenColumnIndex 를 기준으로 나누어진 출력 레이아웃 오른쪽

  export interface IRootProps {
    data?: IData;
    dataLength?: number;
    columns: IColumn[];
    footSum?: IColumn[][];
    width: number;
    height: number;
    style?: React.CSSProperties;
    options?: IOptions;
    status?: React.ReactNode;
    loading?: boolean;
    loadingData?: boolean;
    selection?: ISelection;
    scrollLeft?: number;
    scrollTop?: number;
    sortInfos?: ISortInfo[];

    onBeforeEvent?: (param: IonEventParam) => void;
    onScroll?: (param: IonScrollFunctionParam) => void;
    onScrollEnd?: (param: IonScrollEndFunctionParam) => void;
    onChangeScrollSize?: (param: IonChangeScrollSizeFunctionParam) => void;
    onChangeSelection?: (param: IonChangeSelectionParam) => void;
    onChangeColumns?: (param: IonChangeColumnParam) => void;
    onSelect?: (param: IonSelectParam) => void;
    onRightClick?: (param: IonRightClickParam) => void;
    onClick?: (param: IonClickParam) => void;
    onDoubleClick?: (param: IonClickParam) => void;
    onError?: (err: IonError, event: Event) => void;
    onSort?: (param: IonSortParam) => void;
    onEdit?: (param: IonEditParam) => void;
  }

  export interface IRootState {
    mounted?: boolean;
    autofitAsideWidth?: number;
    autofitColGroup?: IAutofitCol[];

    headerTable?: IColumnTableMap;
    bodyRowTable?: IColumnTableMap;
    bodyRowMap?: {};
    asideHeaderData?: IColumnTableMap;
    leftHeaderData?: IColumnTableMap;
    headerData?: IColumnTableMap;
    asideBodyRowData?: IColumnTableMap;
    leftBodyRowData?: IColumnTableMap;
    bodyRowData?: IColumnTableMap;
    colGroupMap?: {};
    asideColGroup?: ICol[];
    colGroup?: ICol[];
    footSumColumns?: IColumn[][];
    footSumTable?: IColumnTableMap;
    leftFootSumData?: IColumnTableMap;
    footSumData?: IColumnTableMap;

    options?: IOptions;
    sortInfo?: {
      [key: string]: ISortInfo;
    };
  }

  export type DispatchParam = { [key: string]: any };
}
