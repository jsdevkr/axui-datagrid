[![npm version](https://badge.fury.io/js/axui-datagrid.svg)](https://badge.fury.io/js/axui-datagrid)
[![](https://img.shields.io/npm/dm/axui-datagrid.svg)](https://www.npmjs.com/package/axui-datagrid)

# axui-datagrid

demo : http://datagrid.jsdev.kr

# Install

```bash
npm install axui-datagrid -S
```

# Run

```bash
git clone https://github.com/axui/datagrid.git
cd datagrid
npm i
npm start
```

# Features

### Large Data

![axui-datagrid example LargeData](https://cdn.rawgit.com/jsdevkr/datagrid/0d332b6c/src/assets/datagrid-feature-01.jpg)

### Frozen row / col

![axui-datagrid example Frozen row,col](https://cdn.rawgit.com/jsdevkr/datagrid/0d332b6c/src/assets/datagrid-feature-02.jpg)

### Multi header

![axui-datagrid example Multi header](https://cdn.rawgit.com/jsdevkr/datagrid/0d332b6c/src/assets/datagrid-feature-03.jpg)

### Loading

![axui-datagrid example Loading](https://cdn.rawgit.com/jsdevkr/datagrid/0d332b6c/src/assets/datagrid-feature-04.jpg)

### Row selector

![axui-datagrid example Row selector](https://cdn.rawgit.com/jsdevkr/datagrid/0d332b6c/src/assets/datagrid-feature-05.jpg)

### Inline edit

![axui-datagrid example Inline edit](https://cdn.rawgit.com/jsdevkr/datagrid/0d332b6c/src/assets/datagrid-feature-06.jpg)

### Foot Summary

![axui-datagrid example Foot Summary](https://cdn.rawgit.com/jsdevkr/datagrid/0d332b6c/src/assets/datagrid-feature-07.jpg)

# Props

## data?: any[] = [];

## columns: DataGridColumn[];

## height?: number = 400;

## style?: any;

## options?: DataGridOptions = defaultOptions;

```typescript jsx
static defaultColumnKeys: types.DataGridColumnKeys = {
    selected: '__selected__',
    modified: '__modified__',
    deleted: '__deleted__',
    disableSelection: '__disable_selection__',
};
static defaultHeader: types.DataGridOptionHeader = {
    display: true,
    align: 'left',
    columnHeight: 24,
    columnPadding: 3,
    columnBorderWidth: 1,
    selector: true,
    sortable: true,
    enableFilter: true,
    clickAction: 'sort',
};
static defaultBody: types.DataGridOptionBody = {
    align: 'left',
    columnHeight: 24,
    columnPadding: 3,
    columnBorderWidth: 1,
    grouping: false,
    mergeCells: false,
};
static defaultPageButtons: types.DataGridOptionPageButton[] = [
    { className: 'datagridIcon-first', onClick: 'PAGE_FIRST' },
    { className: 'datagridIcon-prev', onClick: 'PAGE_PREV' },
    { className: 'datagridIcon-back', onClick: 'PAGE_BACK' },
    { className: 'datagridIcon-play', onClick: 'PAGE_PLAY' },
    { className: 'datagridIcon-next', onClick: 'PAGE_NEXT' },
    { className: 'datagridIcon-last', onClick: 'PAGE_LAST' },
];
static defaultPage: types.DataGridOptionPage = {
    buttonsContainerWidth: 150,
    buttons: DataGrid.defaultPageButtons,
    buttonHeight: 16,
    height: 20,
};
static defaultScroller: types.DataGridOptionScroller = {
    size: 14,
    arrowSize: 14,
    barMinSize: 12,
    padding: 3,
    disabledVerticalScroll: false,
};
static defaultOptions: types.DataGridOptions = {
    frozenColumnIndex: 0,
    frozenRowIndex: 0,
    showLineNumber: true,
    showRowSelector: false,
    multipleSelect: true,
    columnMinWidth: 100,
    lineNumberColumnWidth: 60,
    rowSelectorColumnWidth: 28,
    remoteSort: false,
    asidePanelWidth: 0,
    header: DataGrid.defaultHeader,
    body: DataGrid.defaultBody,
    page: DataGrid.defaultPage,
    scroller: DataGrid.defaultScroller,
    columnKeys: DataGrid.defaultColumnKeys,
    bodyLoaderHeight: 100,
};
```

## onBeforeEvent?: (e: any, eventName: string) => void;

## onAfterEvent?: (e: any, eventName: string) => void;

## onScrollEnd?: (param: onScrollEndFunctionParam) => void;

## onChangeSelected?: (param: onChangeSelectedParam) => void;

## loading?: boolean = false;

## loadingData?: boolean = false;

# Sample

[You can see source code here](https://github.com/axui/datagrid/tree/master/src/examples)

Here is one example code for using a datagrid

```typescript jsx
import * as React from 'react';

import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class Formatter extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const gridData = require('examples/basicData.json');

    this.state = {
      height: 400,
      columns: [
        { key: 'id', width: 60, label: 'ID', align: 'center' },
        {
          key: 'title',
          width: 200,
          label: 'Title',
          formatter: function(args: any) {
            // console.log(args);
            return ' * ' + args.value;
          },
        },
        { key: 'writer', label: 'Writer', align: 'center' },
        { key: 'date', label: 'Date', align: 'center', formatter: 'date' },
        { key: 'money', label: 'Money', align: 'right', formatter: 'money' },
      ],
      data: gridData,
    };
  }

  public render() {
    return (
      <Wrapper>
        <Segment padded>
          <h1>Formatter</h1>
          <p>
            You can use 'date', 'money' predefined in 'columns> col.formatter',
            or you can change the values as desired using a user-defined
            function.
          </p>
          <DataGrid
            height={this.state.height}
            style={{ fontSize: '12px' }}
            columns={this.state.columns}
            data={this.state.data}
            options={this.state.options}
          />
        </Segment>
      </Wrapper>
    );
  }
}

export default Formatter;
```

# Version history

* v0.3.0 - Add a new prop loading, loadingData, and onScrollEnd to the DataGrid.
* v0.3.2 - Add a new props onChangeSelected, refactoring StoreProvider
* v0.3.3 - Changed keyboard event firing to be determined by 'onCompositionUpdate' state. In InlineEdit mode.
* v0.3.5 - Update document and minor bug fix on inline-edit.
* v0.3.6 - bugfix : Wrong scrollPosition error when changed focus position by keyDown
* v0.3.7 - Update document and change columns fix
* v0.3.8 - support footSum props & minor bugfix
* v0.3.9 - filtered state display on header & fixed bug of 'footSum'
* v0.3.10 - Fixed bug : When clicking line Number cell did not working.
* v0.3.11 - Minor bug fix
