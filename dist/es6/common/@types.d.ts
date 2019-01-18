/// <reference types="react" />
export declare namespace IDataGrid {
    interface IPosition {
        x?: number;
        y?: number;
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
    interface IonChangeSelectedParam {
        filteredList?: any[];
    }
    interface IonChangeSelectionParam {
        rows?: number[];
        cols?: number[];
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
        asidePanelWidth: number;
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
        enableFilter?: boolean;
        clickAction?: 'select' | 'sort' | undefined;
        filterIconClassName?: string;
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
        buttonsContainerWidth?: number;
        buttons?: IOptionPageButton[];
        buttonHeight?: number;
        height?: number;
    }
    interface IOptionScroller {
        size?: number;
        arrowSize?: number;
        barMinSize?: number;
        padding?: number;
        disabledVerticalScroll?: boolean;
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
        asidePanelWidth?: number;
        header?: IOptionHeader;
        body?: IOptionBody;
        page?: IOptionPage;
        scroller?: IOptionScroller;
        columnKeys?: IColumnKeys;
        footSum?: boolean;
        bodyLoaderHeight?: number;
    }
    interface IStyles {
        calculatedHeight?: number | null;
        asidePanelWidth?: number;
        frozenPanelWidth?: number;
        bodyTrHeight?: number;
        elWidth?: number;
        elHeight?: number;
        CTInnerWidth?: number;
        CTInnerHeight?: number;
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
        pageButtonsContainerWidth?: number;
    }
    interface IStoreState {
        mounted?: boolean;
        loading?: boolean;
        loadingData?: boolean;
        calculatedStyles?: boolean;
        data?: any[];
        filteredList?: any[];
        listSelectedAll?: boolean;
        selectedRowIndex?: number;
        selectedRowIndexSelected?: boolean;
        sortInfo?: {};
        filterInfo?: {};
        width?: number;
        height?: number;
        onBeforeEvent?: (param: IonEventParam) => void;
        onAfterEvent?: (param: IonEventParam) => void;
        onScrollEnd?: (param: IonScrollEndFunctionParam) => void;
        onRightClick?: (param: IonRightClickParam) => void;
        selection?: ISelection;
        rowSelector?: IRowSelector;
        isInlineEditing?: boolean;
        inlineEditingCell?: IEditingCell;
        columnResizing?: boolean;
        columnResizerLeft?: number;
        isColumnFilter?: boolean | number;
        scrollLeft?: number;
        scrollTop?: number;
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
        visibleHeaderColGroup?: ICol[];
        visibleBodyRowData?: IColumnTableMap;
        visibleBodyGroupingData?: IColumnTableMap;
        visibleFootSumData?: IColumnTableMap;
        propColumns?: string;
        propOptions?: string;
        predefinedFormatter?: IFormatter;
        predefinedCollector?: ICollector;
        rootObject?: any;
        setRootState?: (state: IRootState) => void;
        getRootState?: () => any;
        setScrollLeft?: (scrollLeft: number) => void;
        setScrollTop?: (scrollTop: number) => void;
        rootNode?: React.RefObject<HTMLDivElement>;
        clipBoardNode?: React.RefObject<HTMLTextAreaElement>;
    }
    interface IRowSelector {
        show: boolean;
        rowKey: string;
        selectedRowKeys?: string[];
        onChange?: (param: IonChangeSelectedParam) => void;
    }
    interface ISelection {
        rows?: number[];
        cols?: number[];
        onChange?: (param: IonChangeSelectionParam) => void;
    }
    interface IProps {
        data?: any[];
        columns: IColumn[];
        footSum?: IColumn[][];
        width: number;
        height: number;
        style?: any;
        options?: IOptions;
        onBeforeEvent?: (param: IonEventParam) => void;
        onAfterEvent?: (param: IonEventParam) => void;
        onScrollEnd?: (param: IonScrollEndFunctionParam) => void;
        loading?: boolean;
        loadingData?: boolean;
        rowSelector?: IRowSelector;
        selection?: ISelection;
        onRightClick?: (param: IonRightClickParam) => void;
    }
    interface IRootState {
        mounted?: boolean;
        calculatedHeight?: number;
    }
    type DispatchParam = {
        [key: string]: any;
    };
}
