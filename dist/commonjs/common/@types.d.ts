/// <reference types="react" />
export declare namespace IDataGrid {
    interface IPosition {
        x?: number;
        y?: number;
    }
    interface IScrollConfig {
        frozenRowIndex?: number;
        sRowIndex?: number;
        eRowIndex?: number;
    }
    interface IRect extends IPosition {
        width: number;
        height?: number;
    }
    interface IColPrimitive {
        key?: string;
        label?: string;
        width?: number | string;
        align?: 'left' | 'center' | 'right' | string;
        colSpan?: number;
        rowSpan?: number;
    }
    interface IonEventParam {
        e: React.MouseEvent<any> | React.KeyboardEvent<any>;
        eventName: string;
    }
    interface IonRightClickParam {
        e: React.MouseEvent<any>;
        item: any;
        value: any;
        focusedRow?: number;
        focusedCol?: number;
    }
    interface IonScrollEndFunctionParam {
        endOfScrollTop?: boolean;
        endOfScrollLeft?: boolean;
    }
    interface IonScrollFunctionParam {
        scrollTop: number;
        scrollLeft: number;
        sRowIndex: number;
        eRowIndex: number;
        sColIndex?: number;
        eColIndex?: number;
    }
    interface IonChangeScrollSizeFunctionParam {
        scrollContentContainerHeight?: number;
        scrollContentHeight?: number;
        scrollContentContainerWidth?: number;
        scrollContentWidth?: number;
        bodyTrHeight?: number;
    }
    interface IonChangeSelectedRowParam {
        data?: any[];
    }
    interface IonChangeSelectionParam {
        rows?: number[];
        cols?: number[];
    }
    interface IapplyAutofitParam {
        asideWidth: number;
        colGroup: IAutofitCol[];
    }
    type formatterFunction = (formatterData: IFormatterData) => any;
    type collectorFunction = (formatterData: ICollectorData) => any;
    type editorFunction = (editorData: IFormatterData) => void;
    type userCallBackFunction = (param?: any) => void;
    interface IEditingCell {
        rowIndex?: number;
        colIndex?: number;
        editor?: any;
    }
    interface IFormatterData {
        data?: any;
        item?: any;
        index?: number;
        key?: string;
        value?: any;
        options?: any;
    }
    interface ICollectorData {
        data?: any;
        key?: string;
        value?: any;
        options?: any;
    }
    interface IFormatter {
        [key: string]: formatterFunction;
    }
    interface ICollector {
        [key: string]: collectorFunction;
    }
    interface ICol extends IColPrimitive {
        colIndex?: number;
        rowIndex?: number;
        formatter?: formatterFunction | string;
        collector?: collectorFunction | string;
        editor?: editorFunction | string | {
            type?: string;
        };
        _ex?: number;
        _sx?: number;
        _width?: number;
        columnAttr?: string;
    }
    interface IColumn extends IColPrimitive {
        colIndex?: number;
        rowIndex?: number;
        formatter?: formatterFunction | string;
        collector?: collectorFunction | string;
        editor?: editorFunction | string | {
            type?: string;
        };
        hidden?: boolean;
        columns?: IColumn[];
        depth?: number;
        columnAttr?: string;
    }
    interface IColumnKeys {
        selected?: string;
        modified?: string;
        deleted?: string;
        disableSelection?: string;
    }
    interface IAutofitCol {
        colIndex: number;
        width: number;
        tdWidth: number;
    }
    interface IMoving {
        active?: boolean;
        top?: boolean;
        bottom?: boolean;
        left?: boolean;
        right?: boolean;
    }
    interface IColumnTableMapRow {
        cols: IColumn[];
    }
    interface IColumnTableMap {
        rows: IColumnTableMapRow[];
    }
    type ColumnDivideTable = {
        asideData: IColumnTableMap;
        asideColGroup: any[];
        leftData: IColumnTableMap;
        rightData: IColumnTableMap;
    };
    interface IOptionHeader {
        display?: boolean;
        align?: 'left' | 'center' | 'right' | undefined;
        columnHeight?: number;
        columnPadding?: number;
        columnBorderWidth?: number;
        selector?: boolean;
        sortable?: boolean;
        clickAction?: 'select' | 'sort' | undefined;
    }
    interface IOptionBody {
        align?: 'left' | 'center' | 'right' | undefined;
        columnHeight?: number;
        columnPadding?: number;
        columnBorderWidth?: number;
        grouping?: boolean;
        mergeCells?: boolean;
    }
    interface IOptionPageButton {
        className: string;
        onClick: string | userCallBackFunction;
        width?: number;
    }
    interface IOptionPage {
        height?: number;
    }
    interface IOptionScroller {
        theme?: string;
        width?: number;
        height?: number;
        arrowSize?: number;
        barMinSize?: number;
        padding?: number;
        horizontalScrollerWidth?: number;
    }
    interface IOptions {
        frozenColumnIndex?: number;
        frozenRowIndex?: number;
        showLineNumber?: boolean;
        showRowSelector?: boolean;
        multipleSelect?: boolean;
        columnMinWidth?: number;
        lineNumberColumnWidth?: number;
        rowSelectorColumnWidth?: number;
        remoteSort?: boolean;
        footSum?: boolean;
        bodyLoaderHeight?: number;
        autofitColumns?: boolean;
        autofitColumnWidthMax?: number;
        autofitColumnWidthMin?: number;
        header?: IOptionHeader;
        body?: IOptionBody;
        page?: IOptionPage;
        scroller?: IOptionScroller;
        columnKeys?: IColumnKeys;
    }
    interface IStyles {
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
    interface IStoreProps {
        loading?: boolean;
        loadingData?: boolean;
        data?: any[];
        selection?: ISelection;
        rowSelector?: IRowSelector;
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
        onChangeSelection?: (param: ISelection) => void;
        onChangeSelectedRow?: (param: IonChangeSelectedRowParam) => void;
        onRightClick?: (param: IonRightClickParam) => void;
    }
    interface IStoreState {
        loading?: boolean;
        loadingData?: boolean;
        data?: any[];
        listSelectedAll?: boolean;
        selectedRowIndex?: number;
        selectedRowIndexSelected?: boolean;
        sortInfo?: {};
        width?: number;
        height?: number;
        columnHeight?: number;
        selection?: ISelection;
        rowSelector?: IRowSelector;
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
        onChangeSelection?: (param: ISelection) => void;
        onChangeSelectedRow?: (param: IonChangeSelectedRowParam) => void;
        onRightClick?: (param: IonRightClickParam) => void;
    }
    interface IRowSelector {
        show: boolean;
        rowKey: string;
        selectedRowKeys?: string[];
    }
    interface ISelection {
        rows?: number[];
        cols?: number[];
        focusedRow?: number;
        focusedCol?: number;
    }
    interface IProps {
        data?: any[];
        columns: IColumn[];
        footSum?: IColumn[][];
        width: number;
        height: number;
        style?: any;
        options?: IOptions;
        status?: React.ReactNode;
        loading?: boolean;
        loadingData?: boolean;
        rowSelector?: IRowSelector;
        selection?: ISelection;
        scrollLeft?: number;
        scrollTop?: number;
        onBeforeEvent?: (param: IonEventParam) => void;
        onScroll?: (param: IonScrollFunctionParam) => void;
        onScrollEnd?: (param: IonScrollEndFunctionParam) => void;
        onChangeScrollSize?: (param: IonChangeScrollSizeFunctionParam) => void;
        onChangeSelection?: (param: ISelection) => void;
        onChangeSelectedRow?: (param: IonChangeSelectedRowParam) => void;
        onRightClick?: (param: IonRightClickParam) => void;
    }
    interface IRootState {
        mounted: boolean;
        autofit: boolean;
        doneAutofit: boolean;
        autofitAsideWidth: number;
        autofitColGroup: IAutofitCol[];
    }
    type DispatchParam = {
        [key: string]: any;
    };
}
