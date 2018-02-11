export const gridOptions = {
    frozenColumnIndex: 0,
    frozenRowIndex: 0,
    showLineNumber: true,
    showRowSelector: false,
    multipleSelect: true,
    columnMinWidth: 100,
    lineNumberColumnWidth: 40,
    rowSelectorColumnWidth: 28,
    remoteSort: false,
    asidePanelWidth: 0,
    header: {
        display: true,
        align: false,
        columnHeight: 24,
        columnPadding: 3,
        columnBorderWidth: 1,
        selector: true,
        sortable: true,
        enableFilter: true,
        clickAction: 'sort' // sort or select
    },
    body: {
        align: false,
        columnHeight: 24,
        columnPadding: 3,
        columnBorderWidth: 1,
        grouping: false,
        mergeCells: false
    },
    page: {
        buttonsContainerWidth: 150,
        buttons: [
            { className: 'datagridIcon-first', onClick: 'PAGE_FIRST' },
            { className: 'datagridIcon-prev', onClick: 'PAGE_PREV' },
            { className: 'datagridIcon-back', onClick: 'PAGE_BACK' },
            { className: 'datagridIcon-play', onClick: 'PAGE_PLAY' },
            { className: 'datagridIcon-next', onClick: 'PAGE_NEXT' },
            { className: 'datagridIcon-last', onClick: 'PAGE_LAST' }
        ],
        buttonHeight: 16,
        height: 20
    },
    scroller: {
        size: 14,
        arrowSize: 14,
        barMinSize: 12,
        padding: 3,
        disabledVerticalScroll: false
    },
    columnKeys: {
        selected: '__selected__',
        modified: '__modified__',
        deleted: '__deleted__',
        disableSelection: '__disable_selection__'
    },
    footSum: false
};
