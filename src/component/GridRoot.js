import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import sass from '../scss/index.scss';

import Header from './GridHeader';

//~~~~~

class GridRoot extends React.Component {
  constructor(props) {
    super(props);
    // props에 추가된 액션만 호출 가능
    props.init(props);
  }

  componentDidMount() {
    this.props.didMount(this.props, ReactDOM.findDOMNode(this.refs.gridRoot));
  }

  render() {
    let style = {
      height: this.props.height
    };

    let header = null;
    if (this.props.mounted) {
      header = <Header
        optionsHeader={this.props.options.header}
        asidePanelWidth={this.props.options.asidePanelWidth}
        frozenColumnIndex={this.props.options.frozenColumnIndex}

        colGroup={this.props.colGroup}
        headerTable={this.props.headerTable}

        asideColGroup={this.props.asideColGroup}
        leftHeaderColGroup={this.props.leftHeaderColGroup}
        headerColGroup={this.props.headerColGroup}

        asideHeaderData={this.props.asideHeaderData}
        leftHeaderData={this.props.leftHeaderData}
        headerData={this.props.headerData}
      />;
    }

    return (
      <div ref="gridRoot" className={classNames(sass.gridRoot)} style={style}>
        <div className={classNames(sass.gridClipBoard)}>
          <textarea ref="gridClipboard"></textarea>
        </div>
        <div ref="gridHeder">
          {header}
        </div>
        <div ref="gridBody"></div>
        <div ref="gridPage"></div>
        <div ref="gridScroller"></div>
        <div ref="gridVerticalResizer"></div>
        <div ref="gridHorizontalResizer"></div>
      </div>
    );

  }
}

GridRoot.defaultProps = {
  height: "300px",
  columns: [],
  options: {
    frozenColumnIndex: 0,
    frozenRowIndex: 0,
    showLineNumber: false,
    showRowSelector: false,
    multipleSelect: true,
    virtualScrollY: true,
    virtualScrollX: true,

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
  }
};

export default GridRoot;
